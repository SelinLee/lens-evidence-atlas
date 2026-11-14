export function validateDevices(d){
 const errors=[],ids=new Set(d.sources.map(s=>s.id));
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
  if(v.uncertainty&&(!['SD','SEM'].includes(v.uncertainty.type)||!Number.isFinite(v.uncertainty.value)||v.uncertainty.value<0||!Number.isInteger(v.uncertainty.n)||v.uncertainty.n<2||v.statistic!=='mean'))errors.push('reported uncertainty');
  if(['fwhm_um','fwhm_x_um','fwhm_y_um'].includes(k)&&Number.isFinite(v.value)&&!(v.value>0&&r.values.wavelength_nm?.value>0&&v.basis==='measured'))errors.push('measured PSF FWHM context');
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
 const variation=r.values.focus_variation_um;
 if(Number.isFinite(variation?.value)){
  const waves=variation.sample_wavelengths_nm,protocol=r.values.focus_variation_protocol?.value;
  if(variation.value<0||Number.isFinite(r.values.wavelength_nm?.value)||typeof protocol!=='string'||!protocol.trim()||
   !['author_reported_band_variation','maximum_pairwise_difference'].includes(variation.statistic)||
   !Array.isArray(waves)||waves.length<2||new Set(waves).size!==waves.length||!waves.every(w=>Number.isFinite(w)&&w>0)||
   variation.calculation_origin!=='authors'||variation.basis!=='derived_from_measurement')errors.push('focal variation context');
 }
 }
 }
 if(errors.length)throw new Error(errors.join('\n'));return true;
}
