export function validateDevices(d,catalog){
 const errors=[],ids=new Set(d.sources.map(s=>s.id));
 const aliases=new Set();
 for(const s of d.sources)if(s.catalog_source!==undefined){
  const target=catalog?.sources.find(p=>p.id===s.catalog_source);
  if(typeof s.catalog_source!=='string'||!s.catalog_source||typeof s.doi!=='string'||!s.doi||aliases.has(s.catalog_source)||
   (catalog&&(!target||target.publication_source!==(s.publication_source&&(d.sources.find(p=>p.id===s.publication_source)?.catalog_source||'device-'+s.publication_source))||target.doi?.toLowerCase()!==s.doi.toLowerCase())))errors.push('catalog source alias');
  aliases.add(s.catalog_source);
 }

 for(const s of d.sources)if(s.publication_source&&!d.sources.some(p=>p.id===s.publication_source&&p.id!==s.id&&!p.publication_source))errors.push('invalid publication source');
 for(const s of d.sources)if(!s.scope||!/^https:\/\//.test(s.url)||!/^\d{4}-\d{2}-\d{2}$/.test(s.checked_on))errors.push('source metadata');
 for(const c of Object.values(d.domains)){
 const mids=new Set(c.metrics.map(m=>m.id));if(mids.size!==c.metrics.length)errors.push('duplicate metric');
 for(const m of c.metrics){for(const ref of m.definition_refs||[])if(!ids.has(ref.source)||!ref.location)errors.push('metric definition provenance');}
 const rids=new Set();for(const r of c.rows){if(rids.has(r.id))errors.push('duplicate row');rids.add(r.id);
 if(r.evidence_type==='study'&&(!r.study_id||!r.measurement_scope))errors.push('study scope');
 for(const [k,v]of Object.entries(r.values)){
  if(!mids.has(k)||!ids.has(v.source)||!v.location)errors.push('cell provenance');
  if(v.sourceIds&&(!Array.isArray(v.sourceIds)||!v.sourceIds.includes(v.source)||v.sourceIds.some(id=>!ids.has(id))))errors.push('cell multiple sources');
  const m=c.metrics.find(m=>m.id===k);if(v.value!==null&&m?.numeric&&!Number.isFinite(v.value))errors.push('nonfinite numeric');
  if(m?.numeric&&v.basis==='unresolved'&&v.value!==null)errors.push('unresolved value');
  if(m?.numeric&&v.frequency_status==='author_scale_unverified'&&!['mtf50_app_reported','mtf50_imatest_reported'].includes(k))errors.push('unverified frequency axis');
  if(r.evidence_type==='study'&&(!['reported_configuration','measured','model','modeled','derived_from_measurement','reconstruction','unresolved'].includes(v.basis)||!v.note))errors.push('study cell evidence');
  if(v.reported_error&&(!['SD','not_specified'].includes(v.reported_error.type)||!Number.isFinite(v.reported_error.value)||v.reported_error.value<0||
   (v.reported_error.sample_size!==null&&(!Number.isInteger(v.reported_error.sample_size)||v.reported_error.sample_size<2))))errors.push('reported error context');
  if(v.uncertainty&&(!['SD','SEM'].includes(v.uncertainty.type)||!Number.isFinite(v.uncertainty.value)||v.uncertainty.value<0||!Number.isInteger(v.uncertainty.n)||v.uncertainty.n<2||v.statistic!=='mean'))errors.push('reported uncertainty');
  if(['fwhm_um','fwhm_x_um','fwhm_y_um'].includes(k)&&Number.isFinite(v.value)&&!(v.value>0&&r.values.wavelength_nm?.value>0&&v.basis==='measured'))errors.push('measured PSF FWHM context');
 }
 const aoi=r.values.aoi_deg;
 const focalMean=r.values.measured_focal_band_mean_um;
 if(Number.isFinite(focalMean?.value)){
  const waves=focalMean.sample_wavelengths_nm;
  if(!(focalMean.value>0)||focalMean.basis!=='derived_from_measurement'||focalMean.calculation_origin!=='authors'||
   focalMean.statistic!=='author_reported_spectral_mean'||Number.isFinite(r.values.wavelength_nm?.value)||
   !Array.isArray(waves)||waves.length<2||new Set(waves).size!==waves.length||waves.some(w=>!(Number.isFinite(w)&&w>0))||
   !focalMean.reference_plane||!focalMean.aggregation_note||!r.values.psf_protocol?.value)errors.push('spectral focal mean context');
 }
 if(Number.isFinite(aoi?.value)&&(
  Math.abs(aoi.value)>90||!['reported_configuration','measured'].includes(aoi.basis)||
  aoi.angle_reference!=='incident_beam_to_optical_axis'||
  (aoi.azimuth_deg!==null&&!(Number.isFinite(aoi.azimuth_deg)&&aoi.azimuth_deg>=0&&aoi.azimuth_deg<360))||
  !r.values.psf_protocol?.value))errors.push('PSF incidence angle context');
 const contrast=r.values.system_contrast_protocol;
 if(contrast){
  const waves=contrast.sample_wavelengths_nm,lambda=r.values.wavelength_nm?.value;
  if(typeof contrast.value!=='string'||!contrast.value.trim()||contrast.metric_kind!=='usaf_michelson_linepair_contrast'||
   !['horizontal','vertical','mean_of_horizontal_vertical'].includes(contrast.direction_aggregation)||
   contrast.frequency_unit!=='lp/mm'||
   !(contrast.field_point===null||typeof contrast.field_point==='string'&&contrast.field_point.trim())||
   !Array.isArray(waves)||waves.length<1||new Set(waves).size!==waves.length||waves.some(w=>!(Number.isFinite(w)&&w>0))||
   Number.isFinite(lambda)&&(waves.length!==1||waves[0]!==lambda)||
   !((contrast.processing_stage==='captured'&&contrast.basis==='derived_from_measurement')||
     (contrast.processing_stage==='deconvolved'&&contrast.basis==='reconstruction')))errors.push('system line-pair contrast context');
 }
 for(const k of ['focus_error_um','focus_error_pct']){
  const v=r.values[k];if(!Number.isFinite(v?.value))continue;
  const waves=v.sample_wavelengths_nm,ref=v.reference_wavelength_nm;
  if(v.value<0||!r.values.focus_error_protocol?.value||v.statistic!=='author_reported_focal_error'||v.calculation_origin!=='authors'||
   v.basis!=='derived_from_measurement'||Number.isFinite(r.values.wavelength_nm?.value)||!Array.isArray(waves)||waves.length<2||
   new Set(waves).size!==waves.length||waves.some(w=>!(w>0&&Number.isFinite(w)))||
   (ref!==null&&(!Number.isFinite(ref)||!waves.includes(ref))))errors.push('focal error context');
 }
 for(const k of ['operation_efficiency_at_lambda_pct','operation_efficiency_band_mean_pct']){
  const v=r.values[k];if(!Number.isFinite(v?.value))continue;
  const protocol=r.values.operation_efficiency_protocol?.value;
  if(v.value<0||v.value>100||v.basis!=='measured'||typeof protocol!=='string'||!protocol.trim())errors.push('operation efficiency protocol/range');
  if(k==='operation_efficiency_at_lambda_pct'&&!(Number.isFinite(r.values.wavelength_nm?.value)&&r.values.wavelength_nm.value>0))errors.push('operation efficiency wavelength');
  if(k==='operation_efficiency_band_mean_pct'&&!(v.statistic==='band_mean'&&!Number.isFinite(r.values.wavelength_nm?.value)&&r.values.lambda_min_nm?.value>0&&r.values.lambda_max_nm?.value>r.values.lambda_min_nm.value))errors.push('operation efficiency band mean');
 }
 for(const k of ['efficiency_at_lambda_pct','efficiency_band_mean_pct']){
  const v=r.values[k];if(!Number.isFinite(v?.value))continue;
  const protocol=r.values.efficiency_protocol?.value;
  if(v.value<0||v.value>100||typeof protocol!=='string'||!protocol.trim())errors.push('efficiency protocol/range');
  if(k==='efficiency_at_lambda_pct'&&!(r.values.efficiency_lambda_nm?.value>0&&Number.isFinite(r.values.efficiency_lambda_nm.value)))errors.push('efficiency wavelength');
  if(k==='efficiency_band_mean_pct'&&!(v.statistic==='band_mean'&&r.values.lambda_min_nm?.value>0&&r.values.lambda_max_nm?.value>r.values.lambda_min_nm.value))errors.push('efficiency band mean');
 }
 for(const k of ['mtf50_cpp','mtf50_app_reported','mtf50_imatest_reported']){
  const v=r.values[k];if(!Number.isFinite(v?.value))continue;
  const protocol=r.values.mtf_protocol?.value;
  if(v.value<=0||typeof protocol!=='string'||!protocol.trim())errors.push('MTF frequency/protocol');
  if(k==='mtf50_cpp'&&(v.frequency_unit!=='cycles/pixel'||!['author_stated_unit','calibrated'].includes(v.frequency_status)))errors.push('MTF physical frequency unit');
  if(k!=='mtf50_cpp'&&(v.frequency_unit!=='author_scale'||v.frequency_status!=='author_scale_unverified'))errors.push('MTF author scale');
 }
 for(const metric of ['focus_variation_um','focus_variation_pct']){
 const variation=r.values[metric];
 if(Number.isFinite(variation?.value)){
  const waves=variation.sample_wavelengths_nm,protocol=r.values.focus_variation_protocol?.value;
  if(variation.value<0||Number.isFinite(r.values.wavelength_nm?.value)||typeof protocol!=='string'||!protocol.trim()||
   !['author_reported_band_variation','maximum_pairwise_difference'].includes(variation.statistic)||
   !Array.isArray(waves)||waves.length<2||new Set(waves).size!==waves.length||!waves.every(w=>Number.isFinite(w)&&w>0)||
   variation.calculation_origin!=='authors'||variation.basis!=='derived_from_measurement')errors.push('focal variation context');
  if(metric==='focus_variation_pct'&&(!variation.denominator||variation.reference_wavelength_nm!==null&&(!Number.isFinite(variation.reference_wavelength_nm)||!waves.includes(variation.reference_wavelength_nm))||variation.reference_focal_um!==null&&!(variation.reference_focal_um>0)))errors.push('focal variation percent reference');
 }
 }
 }
 }
 if(errors.length)throw new Error(errors.join('\n'));return true;
}
