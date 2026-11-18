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
 if(r.configuration_role==='unassigned_measurement_set'){
  const candidates=r.candidate_specimen_ids;
  if(!Array.isArray(candidates)||candidates.length<2||new Set(candidates).size!==candidates.length||
   candidates.some(id=>id===r.specimen_id||!c.rows.some(other=>other.study_id===r.study_id&&other.specimen_id===id)))errors.push('unassigned specimen candidates');
 }
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
  if(['incident_power_uw','focused_power_uw'].includes(k)&&Number.isFinite(v.value)&&
   (v.value<0||v.basis!=='measured'||v.quantity!=='optical_power'||v.original_unit!=='μW'||
    !(r.values.wavelength_nm?.value>0)||!r.values.efficiency_protocol?.value))errors.push('measured optical power context');
 }
 const designFocal=r.values.design_focal_um;
 const mtfCurve=r.values.mtf_curve;
 const spectralMtf10=r.values.spectral_mean_mtf10_cycles_mm;
 if(Number.isFinite(spectralMtf10?.value)){
  const waves=spectralMtf10.sample_wavelengths_nm;
  if(spectralMtf10.value<=0||spectralMtf10.basis!=='derived_from_measurement'||spectralMtf10.calculation_origin!=='authors'||
   spectralMtf10.threshold_fraction!==.1||spectralMtf10.frequency_unit!=='cycles/mm'||
   !Array.isArray(waves)||waves.length<2||new Set(waves).size!==waves.length||waves.some(w=>!Number.isFinite(w)||w<=0)||
   Number.isFinite(r.values.wavelength_nm?.value)||mtfCurve?.mtf_kind!=='from_measured_psf_spectral_mean'||
   !(r.values.psf_protocol?.evaluation_plane_um>0))errors.push('spectral mean PSF MTF10 context');
 }
 const diffractionEfficiency=r.values.diffraction_efficiency_mean_pct;
 if(Number.isFinite(diffractionEfficiency?.value)&&(
  diffractionEfficiency.value<0||diffractionEfficiency.value>100||diffractionEfficiency.basis!=='derived_from_measurement'||
  diffractionEfficiency.calculation_origin!=='authors'||diffractionEfficiency.statistic!=='mean_across_wavelengths_and_settings'||
  Number.isFinite(r.values.wavelength_nm?.value)||!diffractionEfficiency.denominator||
  diffractionEfficiency.denominator!==r.values.efficiency_protocol?.denominator||!r.values.efficiency_protocol?.value))errors.push('diffraction efficiency mean context');
 if(mtfCurve?.mtf_kind==='measured_psf_radial_average'){
  const psf=r.values.psf_protocol;
  const waves=mtfCurve.sample_wavelengths_nm;
  const wave=r.values.wavelength_nm?.value;
  if(mtfCurve.basis!=='derived_from_measurement'||mtfCurve.processing_stage!=='optical_psf'||
   mtfCurve.direction_aggregation!=='radial_average'||mtfCurve.frequency_unit!=='lp/mm'||
   !Number.isFinite(psf?.evaluation_plane_um)||
   !(psf.object_conjugate==='infinity'&&psf.object_distance_m===null||
     psf.object_conjugate==='finite_simulated_by_concave_lens'&&psf.object_distance_m>0&&Number.isFinite(psf.object_distance_m))||
   !Array.isArray(waves)||new Set(waves).size!==waves.length||waves.some(w=>!(w>0&&Number.isFinite(w)))||
   (Number.isFinite(wave)?(mtfCurve.individual_curve_panel===true?waves.length!==1||waves[0]!==wave:
     mtfCurve.individual_curve_panel!==false||waves.length!==0):waves.length===0))errors.push('radially averaged measured PSF MTF context');
 }
 if(mtfCurve?.mtf_kind==='reconstructed_slanted_edge'&&(
  mtfCurve.basis!=='reconstruction'||mtfCurve.processing_stage!=='reconstructed'||mtfCurve.frequency_unit!=='lp/mm'||
  !['red','green','blue'].includes(mtfCurve.color_channel)||Number.isFinite(r.values.wavelength_nm?.value)))errors.push('reconstructed color channel edge MTF context');
 if(mtfCurve?.mtf_kind==='measured_psf_frequency_cross_section'&&(
  mtfCurve.basis!=='derived_from_measurement'||mtfCurve.calculation_origin!=='authors'||!(r.values.wavelength_nm?.value>0)||
  mtfCurve.frequency_unit!=='normalized_spatial_frequency'||!(mtfCurve.normalization_frequency_cycles_mm>0)||
  !Number.isFinite(mtfCurve.normalization_frequency_cycles_mm)||!r.values.psf_protocol?.value))errors.push('normalized PSF MTF context');
 if(mtfCurve?.mtf_kind==='measured_psf_fft_normalized'&&(
  mtfCurve.basis!=='derived_from_measurement'||mtfCurve.calculation_origin!=='authors'||!(r.values.wavelength_nm?.value>0)||
  mtfCurve.frequency_unit!=='normalized_spatial_frequency'||mtfCurve.normalization_frequency_cycles_mm!==null||
  mtfCurve.direction_aggregation!=='unspecified'||!r.values.psf_protocol?.value||
  mtfCurve.data_availability?.status!=='curves_only'))errors.push('uncalibrated PSF MTF context');
 const {depth_of_focus_um:focusWidth,minimum_psf_fwhm_x_um:minimumWidth,
  reported_axial_scan_focusing_efficiency_pct:axialEfficiency,simulated_psf_correlation_bandwidth_nm:correlationWidth}=r.values;
 for(const metric of [focusWidth,minimumWidth,axialEfficiency]){
  if(Number.isFinite(metric?.value)&&
   (metric.value<0||(metric!==axialEfficiency&&metric.value===0)||metric.basis!=='derived_from_measurement'||metric.calculation_origin!=='authors'))errors.push('author axial scan measurement context');
 }
 if(Number.isFinite(focusWidth?.value)&&(!(r.values.wavelength_nm?.value>0)||!focusWidth.dof_criterion||!r.values.psf_protocol?.value))errors.push('focal interval context');
 if(Number.isFinite(minimumWidth?.value)&&(minimumWidth.direction!=='x'||!minimumWidth.statistic||!r.values.psf_protocol?.value))errors.push('minimum focal width context');
 const efficiencyProtocol=r.values.efficiency_protocol;
 if(Number.isFinite(axialEfficiency?.value)&&(axialEfficiency.value>100||!axialEfficiency.statistic||
  !efficiencyProtocol?.value||!axialEfficiency.denominator||axialEfficiency.denominator!==efficiencyProtocol.denominator))errors.push('axial efficiency protocol');
 if(Number.isFinite(correlationWidth?.value)&&(!(correlationWidth.value>0)||correlationWidth.basis!=='model'||
  correlationWidth.calculation_origin!=='authors'||!(correlationWidth.reference_wavelength_nm>0)||
  !(correlationWidth.correlation_threshold>=0&&correlationWidth.correlation_threshold<=1)||
  !(correlationWidth.comparison==='greater_than'||correlationWidth.comparison==='greater_than_or_equal')||Number.isFinite(r.values.wavelength_nm?.value)))errors.push('simulated correlation bandwidth context');
 for(const [key,denominator] of [['optical_transmittance_pct','incident_through_aperture'],['focusing_efficiency_transmitted_pct','transmitted_power']]){
  const powerRatio=r.values[key];
  if(Number.isFinite(powerRatio?.value)&&(powerRatio.value<0||powerRatio.value>100||
   powerRatio.basis!=='derived_from_measurement'||powerRatio.calculation_origin!=='authors'||
   powerRatio.denominator!==denominator||!(r.values.wavelength_nm?.value>0)||!r.values.efficiency_protocol?.value))errors.push('optical power ratio context');
 }
 for(const key of ['estimated_system_focal_efficiency_pct','estimated_detected_throughput_pct','spectrally_weighted_mtf_area_lpmm']){
  const value=r.values[key];
  if(!Number.isFinite(value?.value))continue;
  if(value.basis!=='model'||value.calculation_origin!=='authors'||value.value<0||
   (key!=='spectrally_weighted_mtf_area_lpmm'&&value.value>100)||
   (key==='spectrally_weighted_mtf_area_lpmm'&&(value.frequency_unit!=='lp/mm'||value.mtf_aggregation!=='frequency_integral'))||
   r.values.efficiency_protocol?.origin!=='authors_optical_stack_estimate'||
   Number.isFinite(r.values.wavelength_nm?.value)||Number.isFinite(r.values.efficiency_at_lambda_pct?.value)||
   Number.isFinite(r.values.efficiency_band_mean_pct?.value))errors.push('optical stack aggregate estimate context');
 }
 const depth=r.values.author_longest_focal_depth_um;
 if(Number.isFinite(depth?.value)&&(!(depth.value>0)||depth.basis!=='derived_from_measurement'||
  depth.calculation_origin!=='authors'||depth.statistic!=='author_longest_focal_depth'||
  !(depth.threshold_intensity_fraction>0&&depth.threshold_intensity_fraction<=1)||
  !(r.values.wavelength_nm?.value>0)||['model','modeled'].includes(r.values.wavelength_nm?.basis)||!r.values.psf_protocol?.value||
  !(depth.reference_origin===null||typeof depth.reference_origin==='string'&&depth.reference_origin)))errors.push('author focal depth context');
 const processedWidth=r.values.processed_psf_fwhm_um,psf=r.values.psf_protocol;
 if(Number.isFinite(processedWidth?.value)&&(!(processedWidth.value>0)||processedWidth.basis!=='reconstruction'||
  processedWidth.calculation_origin!=='authors'||processedWidth.processing_stage!=='linear_intensity_subtraction'||
  !(processedWidth.subtraction_coefficient>=0&&Number.isFinite(processedWidth.subtraction_coefficient))||
  !psf?.value||psf.processing_stage!=='linear_intensity_subtraction'||psf.subtraction_coefficient!==processedWidth.subtraction_coefficient||
  !Number.isFinite(psf.evaluation_plane_um)||!(r.values.wavelength_nm?.value>0)||
  ['fwhm_um','fwhm_x_um','fwhm_y_um'].some(k=>Number.isFinite(r.values[k]?.value))))errors.push('processed PSF width context');
 const imageSNR=r.values.image_snr_db,snrProtocol=r.values.image_snr_protocol;
 if(Number.isFinite(imageSNR?.value)){
  const stage=snrProtocol?.processing_stage;
  if(imageSNR.calculation_origin!=='authors'||imageSNR.statistic!=='author_reported_image_snr'||
   !snrProtocol?.value||snrProtocol.metric_kind!=='author_image_signal_background_ratio'||!snrProtocol.formula||!snrProtocol.target||
   !(snrProtocol.roi===null||typeof snrProtocol.roi==='string'&&snrProtocol.roi)||
   !(snrProtocol.noise_estimator===null||typeof snrProtocol.noise_estimator==='string'&&snrProtocol.noise_estimator)||
   !(r.values.wavelength_nm?.value>0||r.values.wavelength_nm?.value===null&&r.values.illumination?.value)||
   !((stage==='captured'&&imageSNR.basis==='derived_from_measurement')||
    (stage==='linear_intensity_subtraction'&&imageSNR.basis==='reconstruction'&&
     Number.isFinite(snrProtocol.subtraction_coefficient)&&snrProtocol.subtraction_coefficient>=0)))errors.push('image SNR context');
 }
 const simulatedFocal=r.values.simulated_focal_um;
 if(Number.isFinite(simulatedFocal?.value)){
  const wavelength=r.values.wavelength_nm,protocol=r.values.psf_protocol;
  const fromAxialPeak=simulatedFocal.position_definition==='axial_intensity_maximum'&&wavelength?.value>0&&wavelength.basis==='model';
  const tableWithDesignOnly=simulatedFocal.position_definition==='author_reported_unspecified'&&
   simulatedFocal.model_wavelength_status==='author_nominal_design_only'&&wavelength?.value===null&&
   protocol?.nominal_design_wavelength_nm>0;
  if(!(simulatedFocal.value>0)||simulatedFocal.basis!=='model'||simulatedFocal.calculation_origin!=='authors'||
   !(fromAxialPeak||tableWithDesignOnly)||!protocol?.value||Number.isFinite(r.values.measured_focal_um?.value))errors.push('simulated focal context');
 }
 const measuredFocal=r.values.measured_focal_um;
 if(measuredFocal?.position_definition==='minimum_transverse_fwhm'&&
  (!(measuredFocal.value>0)||measuredFocal.basis!=='derived_from_measurement'||measuredFocal.calculation_origin!=='authors'||
   !(r.values.wavelength_nm?.value>0)||!r.values.psf_protocol?.value))errors.push('minimum width focus context');
 const modelDof=r.values.simulated_depth_of_focus_um,modelWidth=r.values.simulated_psf_fwhm_x_um;
 if(Number.isFinite(modelDof?.value)&&(!(modelDof.value>0)||modelDof.basis!=='model'||modelDof.calculation_origin!=='authors'||
  !modelDof.dof_criterion||!r.values.psf_protocol?.value))errors.push('simulated focal interval context');
 if(Number.isFinite(modelWidth?.value)&&(!(modelWidth.value>0)||modelWidth.basis!=='model'||modelWidth.calculation_origin!=='authors'||
  modelWidth.direction!=='x'||!modelWidth.statistic||!r.values.psf_protocol?.value))errors.push('simulated focal width context');
 for(const [key,denominators] of [['simulated_focusing_efficiency_pct',['incident_power_on_metalens','incident_light_energy','author_denominator_unreported']],
  ['simulated_aperture_power_ratio_pct',['aperture_area_integral_at_lens_plane']]]){
  const ratio=r.values[key];
  if(Number.isFinite(ratio?.value)&&(ratio.value<0||ratio.value>100||ratio.basis!=='model'||ratio.calculation_origin!=='authors'||
   !denominators.includes(ratio.denominator)||efficiencyProtocol?.denominator!==ratio.denominator||!efficiencyProtocol.value||
   (ratio.denominator==='author_denominator_unreported'&&!efficiencyProtocol.denominator_note)))errors.push('simulated power ratio context');
 }
 if(designFocal?.calculation_method==='circular_aperture_na_relation'){
  const diameter=r.values.diameter_um?.value,na=r.values.na?.value,inputs=designFocal.inputs;
  if(designFocal.calculation_origin!=='atlas'||designFocal.basis!=='model'||!designFocal.approximate||!(diameter>0)||!(na>0&&na<1)||
   designFocal.formula!=='diameter_um / (2 * tan(asin(na)))'||inputs?.diameter_um!==diameter||inputs?.na!==na||
   designFocal.rounding_increment_um!==.01||
   designFocal.value!==Math.round(100*diameter/(2*Math.tan(Math.asin(na))))/100)errors.push('atlas design focal input/formula');
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
 const spectralSD=r.values.focal_spectral_sd_um;
 if(Number.isFinite(spectralSD?.value)){
  const waves=spectralSD.sample_wavelengths_nm;
  if(spectralSD.value<0||spectralSD.basis!=='derived_from_measurement'||spectralSD.calculation_origin!=='authors'||
   spectralSD.statistic!=='spectral_standard_deviation'||spectralSD.sample_unit!=='wavelength'||Number.isFinite(r.values.wavelength_nm?.value)||
   !Array.isArray(waves)||waves.length<2||new Set(waves).size!==waves.length||waves.some(w=>!(Number.isFinite(w)&&w>0))||
   !(spectralSD.ddof===null||[0,1].includes(spectralSD.ddof))||
   !(spectralSD.measurement_repeat_count===null||Number.isInteger(spectralSD.measurement_repeat_count)&&spectralSD.measurement_repeat_count>=2)||
   !r.values.focus_variation_protocol?.value)errors.push('spectral focal SD context');
 }
 const axialOffset=r.values.axial_focus_offset_um;
 if(Number.isFinite(axialOffset?.value)){
  const focal=r.values.measured_focal_um,reference=axialOffset.reference_plane_um;
  if(axialOffset.basis!=='derived_from_measurement'||axialOffset.calculation_origin!=='atlas'||
   !(r.values.wavelength_nm?.value>0)||!Number.isFinite(focal?.value)||focal.basis!=='measured'||!Number.isFinite(reference)||
   axialOffset.reference_wavelength_nm!==null||!axialOffset.reference_plane_description||
   axialOffset.formula!=='measured_focal_um - reference_plane_um'||Math.abs(axialOffset.value-(focal.value-reference))>1e-9||
   !r.values.psf_protocol?.value)errors.push('atlas axial offset reference/input');
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
 const systemMtf=r.values.system_slanted_edge_mtf,mtfFrequency=r.values.mtf_spatial_frequency_lpmm;
 if(Number.isFinite(systemMtf?.value)&&(
  systemMtf.value<0||systemMtf.value>1||systemMtf.basis!=='derived_from_measurement'||systemMtf.calculation_origin!=='authors'||
  mtfCurve?.mtf_kind!=='measured_polychromatic_slanted_edge'||mtfCurve.basis!=='derived_from_measurement'||
  mtfCurve.processing_stage!=='captured'||mtfCurve.frequency_unit!=='lp/mm'||
  mtfFrequency?.basis!=='reported_configuration'||!Number.isFinite(mtfFrequency.value)||mtfFrequency.value<=0||
  !['whole_field_mean','maximum_measured_field'].includes(systemMtf.field_statistic)||
  (systemMtf.field_angle_deg!==null&&(!Number.isFinite(systemMtf.field_angle_deg)||Math.abs(systemMtf.field_angle_deg)>90))||
  !['sagittal','tangential','combined','unspecified'].includes(mtfCurve.direction_aggregation)||
  Number.isFinite(r.values.wavelength_nm?.value)))errors.push('measured slanted-edge MTF context');
 for(const k of ['focus_error_um','focus_error_pct']){
  const v=r.values[k];if(!Number.isFinite(v?.value))continue;
  const waves=v.sample_wavelengths_nm,ref=v.reference_wavelength_nm,wave=r.values.wavelength_nm?.value;
  const validWaves=Array.isArray(waves)&&new Set(waves).size===waves.length&&waves.every(w=>w>0&&Number.isFinite(w));
  const aggregate=validWaves&&waves.length>=2&&!Number.isFinite(wave)&&v.statistic==='author_reported_focal_error'&&
   (ref===null||Number.isFinite(ref)&&waves.includes(ref));
  const single=validWaves&&waves.length===1&&waves[0]===wave&&v.statistic==='author_reported_single_wavelength_error'&&
   ref===null&&['design_focal_length','design_focus_plane'].includes(v.reference_kind)&&
   Number.isFinite(v.reference_plane_um)&&v.reference_plane_um>0;
  if(v.value<0||!r.values.focus_error_protocol?.value||v.calculation_origin!=='authors'||
   v.basis!=='derived_from_measurement'||!(aggregate||single))errors.push('focal error context');
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
  if(v.aggregation_scope==='publication_unassigned_devices'&&(
   k!=='efficiency_band_mean_pct'||v.basis!=='derived_from_measurement'||v.calculation_origin!=='authors'||
   r.configuration_role!=='unassigned_measurement_set'||r.values.diameter_um?.value!==null||r.values.na?.value!==null||
   r.values.wavelength_nm?.value!==null||r.values.efficiency_protocol?.device_assignment!=='unassigned'||!v.sampling))errors.push('publication efficiency assignment');
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
  const low=r.values.lambda_min_nm?.value,high=r.values.lambda_max_nm?.value;
  const listedWaves=Array.isArray(waves)&&waves.length>=2&&new Set(waves).size===waves.length&&waves.every(w=>Number.isFinite(w)&&w>0);
  const boundedSample=waves===null&&Number.isFinite(low)&&Number.isFinite(high)&&low>0&&high>low&&
   variation.spectral_sample_scope==='author_reported_range_only';
  const authorCalculation=variation.calculation_origin==='authors'&&(
   variation.statistic==='author_reported_band_variation'&&(listedWaves||boundedSample)||
   variation.statistic==='maximum_pairwise_difference'&&listedWaves);
  const bounds=variation.author_reported_focal_bounds_um;
  const widthFromPublishedBounds=metric==='focus_variation_um'&&variation.calculation_origin==='atlas'&&
   variation.statistic==='range_width_from_reported_bounds'&&boundedSample&&Array.isArray(bounds)&&
   bounds.length===2&&bounds.every(Number.isFinite)&&bounds[0]>0&&bounds[1]>=bounds[0]&&
   variation.value===bounds[1]-bounds[0];
  if(variation.value<0||Number.isFinite(r.values.wavelength_nm?.value)||typeof protocol!=='string'||!protocol.trim()||
   !(authorCalculation||widthFromPublishedBounds)||variation.basis!=='derived_from_measurement')errors.push('focal variation context');
  if(metric==='focus_variation_pct'&&(!variation.denominator||variation.reference_wavelength_nm!==null&&!(listedWaves&&waves.includes(variation.reference_wavelength_nm))||variation.reference_focal_um!==null&&!(variation.reference_focal_um>0)))errors.push('focal variation percent reference');
 }
 }
 }
 }
 if(errors.length)throw new Error(errors.join('\n'));return true;
}
