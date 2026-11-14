import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data),lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='jeon2026'),get=id=>rows.find(r=>r.id==='jeon2026_'+id).values;

test('Jeon 2026 keeps one publication and unresolved specimen links across measurement, fabrication and system configurations',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,12);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,7);assert.equal(groupRows(rows).length,1);assert.ok(rows.every(r=>r.paper==='device-jeon_rgb_2026'&&hasVisibleLight(lens,r)));
 const measured=rows.filter(r=>r.specimen_id==='characterization');assert.equal(measured.length,4);assert.ok(measured.every(r=>r.configuration_role==='unassigned_measurement_set'&&r.candidate_specimen_ids.join(',')==='tpl_master,nil_replica'));
 for(const id of ['jeon_rgb_si_2026','jeon_rgb_review_2026'])assert.equal(atlas.sources.get('device-'+id).publication_source,'device-jeon_rgb_2026');assert.equal(atlas.sources.get('device-jeon_rgb_2026').bibliography.locator,'6310');
 for(const r of rows)for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
});

test('published optical powers and corrected experimental efficiencies stay separate from simulation and irradiance',()=>{
 for(const [w,pin,pf,eta]of [[450,40.9,11.1,27.1],[532,50.3,14.2,28.2],[635,80.7,23.5,29.1]]){
  const v=get('characterization_'+w);assert.equal(v.incident_power_uw.value,pin);assert.equal(v.focused_power_uw.value,pf);assert.equal(v.efficiency_at_lambda_pct.value,eta);assert.equal(v.efficiency_at_lambda_pct.calculation_origin,'authors');assert.equal(v.efficiency_at_lambda_pct.basis,'derived_from_measurement');assert.equal(v.efficiency_lambda_nm.value,w);assert.ok(Math.abs(100*pf/pin-eta)<.05);
  for(const key of ['incident_power_uw','focused_power_uw']){assert.equal(v[key].quantity,'optical_power');assert.equal(v[key].original_unit,'μW');assert.equal(v[key].basis,'measured');assert.match(v[key].location,/Table2.*μW/);}
  assert.match(v.efficiency_protocol.note,/实验焦圈.*未完整报告/);assert.match(v.efficiency_protocol.note,/3×FWHMideal仅为模拟/);assert.equal(v.efficiency_band_mean_pct,undefined);
 }
 assert.equal(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,3);assert.equal(axisPoints(lens.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,95);assert.equal(axisPoints(lens.rows,'na','efficiency_band_mean_pct').length,6);
});

test('RGB widths and Strehl retain their direction and measurement plane without three invented focal lengths or a continuous band',()=>{
 for(const [w,width,sr]of [[450,1.147,.90],[532,1.376,.89],[635,1.646,.93]]){const v=get('characterization_'+w);assert.equal(v.wavelength_nm.value,w);assert.equal(v.fwhm_x_um.value,width);assert.equal(v.fwhm_y_um.value,null);assert.equal(v.strehl.value,sr);assert.equal(v.measured_focal_um.value,null);assert.equal(v.design_focal_um.value,4500);assert.equal(v.na.value,.21);assert.equal(v.height_nm.value,null);assert.equal(v.lambda_min_nm,undefined);assert.equal(v.lambda_max_nm,undefined);assert.equal(v.axial_focus_offset_um,undefined);assert.match(v.psf_protocol.note,/未逐λ明确固定4500μm或各自寻峰/);}
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,18);assert.equal(axisPoints(rows,'wavelength_nm','fwhm_x_um').length,3);assert.equal(axisPoints(rows,'wavelength_nm','strehl').length,3);
 assert.match(get('characterization_summary').chromatic.note,/S8是模拟/);assert.match(get('characterization_450').na.note,/0.20/);
});

test('PSF-derived MTF curves retain normalized frequency, line-style changes and missing arrays without invented S/T or MTF50',()=>{
 const b=get('characterization_450').mtf_curve,g=get('characterization_532').mtf_curve,r=get('characterization_635').mtf_curve;
 assert.match(b.note,/黑虚线Exp.*蓝实线Sim/);assert.match(g.note,/绿实线Exp.*黑虚线Sim/);assert.match(r.note,/红实线Exp.*黑虚线Sim/);assert.match(b.note,/差异本身不等于图例错误/);
 for(const v of [b,g,r]){assert.equal(v.basis,'derived_from_measurement');assert.equal(v.frequency_unit,'normalized_f_over_fc');assert.equal(v.physical_cutoff_frequency,null);assert.equal(v.direction,null);assert.equal(v.field_point,null);assert.equal(v.raw_psf,null);assert.equal(v.author_numeric_mtf,null);assert.equal(v.atlas_recomputed_mtf,null);assert.match(v.location,/S15b/);}
});

test('fabrication records do not inherit quantitative values from an unassigned measurement set',()=>{
 for(const id of ['tpl_master','nil_replica']){const v=get(id);assert.equal(v.diameter_um.value,1890);assert.equal(v.measured_focal_um.value,null);for(const key of ['fwhm_x_um','strehl','efficiency_at_lambda_pct','incident_power_uw','focused_power_uw'])assert.equal(v[key],undefined);}
 assert.equal(get('nil_replica').na.value,null);assert.equal(get('nil_replica').design_focal_um.value,null);assert.match(get('nil_replica').material.note,/保护层沉积在TPL master/);
});

test('OLED focal-plane comparisons do not become monochromatic measurements or share an unsupported field of view',()=>{
 const main=get('oled_main');assert.equal(main.fov_deg.value,47);assert.match(main.fov_deg.note,/le2mm.*le10mm/);assert.match(main.fov_deg.display,/方向未明/);
 for(const id of ['oled_tpl','oled_nil','oled_control_blue','oled_control_green','oled_control_red']){const v=get(id);assert.equal(v.wavelength_nm.value,null);assert.equal(v.fov_deg,undefined);for(const key of ['diameter_um','design_focal_um','na','fwhm_x_um','efficiency_at_lambda_pct'])assert.equal(v[key],undefined);assert.equal(v.chromatic.basis,'measured');}
 assert.match(get('oled_control_blue').wavelength_nm.note,/全色OLED.*不是单色/);assert.equal(axisPoints(rows,'$model','fov_deg').length,1);
});

test('power measurements and unresolved specimen assignments reject missing units, protocols and invalid links',()=>{
 for(const change of [r=>r.values.incident_power_uw.original_unit='W/m²',r=>r.values.incident_power_uw.quantity='irradiance',r=>r.values.incident_power_uw.basis='model',r=>r.values.incident_power_uw.value=-1,r=>r.values.wavelength_nm.value=null,r=>delete r.values.efficiency_protocol]){const d=structuredClone(data);change(d.domains.metalens.rows.find(r=>r.id==='jeon2026_characterization_450'));assert.throws(()=>validateDevices(d,catalog),/measured optical power context/);}
 for(const candidates of [[],['tpl_master'],['tpl_master','tpl_master'],['characterization','nil_replica'],['tpl_master','other_study']]){const d=structuredClone(data);d.domains.metalens.rows.find(r=>r.id==='jeon2026_characterization_summary').candidate_specimen_ids=candidates;assert.throws(()=>validateDevices(d,catalog),/unassigned specimen candidates/);}
});
