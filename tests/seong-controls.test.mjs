import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const dataset=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const atlas=createWorkspace(load(),dataset);
const lens=atlas.domains.find(domain=>domain.id==='metalens');
const seong=lens.rows.filter(row=>row.study_id==='seong2026');
const li=lens.rows.filter(row=>row.study_id==='li2021');
const row=(rows,id)=>rows.find(item=>item.id===id);

test('Seong geometric focal values, measured PSFs and uncalibrated MTF retain their own fields',()=>{
 assert.equal(seong.length,14);
 assert.equal(new Set(seong.map(item=>item.specimen_id)).size,8);
 assert.deepEqual(groupRows(seong).map(group=>group.paper),['device-seong_modal_2026']);
 const bench=[
  [320,'ZrO₂',20400,.12,1.482,.88,69.9],
  [450,'TiO₂',14500,.17,1.516,.85,70.9],
  [532,'TiO₂',12250,.20,1.455,.88,74.9],
  [635,'TiO₂',10200,.24,1.813,.70,68.8],
 ];
 for(const [wave,coat,f,na,width,sr,eta] of bench){
  const item=row(seong,'seong2026_bench_'+wave),v=item.values;
  assert.ok(v.material.value.includes(coat));
  assert.deepEqual([v.diameter_um.value,v.na.value,v.design_focal_um.value],[5000,.2,12250]);
  assert.deepEqual([v.reported_effective_focal_um.value,v.reported_effective_na.value],[f,na]);
  assert.equal(v.measured_focal_um.value,null);
  assert.equal(v.fwhm_x_um.value,width);
  assert.equal(v.fwhm_x_um.basis,'measured');
  assert.equal(v.strehl.value,sr);
  assert.equal(v.efficiency_at_lambda_pct.value,eta);
  assert.equal(v.efficiency_protocol.denominator,'incident_optical_power');
  assert.equal(v.efficiency_protocol.integration_radius_um,null);
  assert.equal(v.author_reported_mtf_cutoff_lpmm.value,752);
  assert.equal(v.mtf_curve.frequency_unit,'normalized_spatial_frequency');
  assert.equal(v.mtf_curve.normalization_frequency_cycles_mm,null);
  assert.equal(v.mtf_curve.direction_aggregation,'unspecified');
  assert.equal(v.mtf_curve.data_availability.raw_psf,null);
 }
 const visible=seong.filter(item=>hasVisibleLight(lens,item));
 assert.equal(visible.length,11);
 assert.equal(axisPoints(visible,'wavelength_nm','fwhm_x_um').length,3);
 assert.equal(axisPoints(seong,'wavelength_nm','measured_focal_um').length,0);
 assert.equal(axisPoints(seong,'wavelength_nm','reported_effective_focal_um').length,4);
});

test('Seong unit-cell simulation and per-color OLED refocusing retain their conditions',()=>{
 for(const [key,lo,hi,mean] of [['uv',250,400,69],['vis',400,700,75]]){
  const values=row(seong,'seong2026_cpt_'+key).values;
  assert.deepEqual([values.lambda_min_nm.value,values.lambda_max_nm.value],[lo,hi]);
  const cpt=values.simulated_cpt_mean_pct;
  assert.equal(cpt.value,mean);
  assert.equal(cpt.basis,'model');
  assert.equal(cpt.denominator,'transmitted_optical_power_per_author_response');
  assert.equal(values.efficiency_at_lambda_pct,undefined);
 }
 for(const color of ['blue','green','red']){
  const values=row(seong,'seong2026_vr_'+color).values;
  assert.equal(values.wavelength_nm.value,null);
  assert.equal(values.chromatic.capture_plane_selection,'refocused_per_color');
  assert.ok(values.chromatic.sourceIds.includes('device-seong_review_2026'));
 }
});

test('Li target and near-eye records remain grouped with the RGB optical bench and reference the published PDF',()=>{
 assert.equal(li.length,17);
 assert.equal(new Set(li.map(item=>item.specimen_id)).size,8);
 assert.deepEqual(groupRows(li).map(group=>group.paper),['device-li_rgb_vr_2021']);
 for(const wave of [488,532,658]){
  const values=row(li,'li2021_target_na07_target_'+wave).values;
  assert.equal(values.resolved_test_line_width_um.value,2.2);
  assert.equal(values.resolved_test_line_width_um.target_element,6);
  assert.equal(values.resolved_test_line_width_um.source,'device-li_rgb_vr_pdf_2021');
 }
 assert.deepEqual(row(li,'li2021_target_na03_target_white').values.illumination.sample_wavelengths_nm,[470,548,647]);
 const passive=row(li,'li2021_system_vr_passive').values;
 assert.equal(passive.wavelength_nm.value,548);
 assert.equal(passive.chromatic.resolved_test_dot_diameter_um,1.3);
 const scan=row(li,'li2021_system_vr_scan').values;
 assert.equal(scan.fov_deg.value,null);
 assert.deepEqual(scan.fov_deg.bound,{operator:'<',value:10});
 assert.equal(axisPoints(li,'wavelength_nm','resolved_test_line_width_um').length,3);
 assert.equal(axisPoints(li,'wavelength_nm','measured_focal_um').length,0);
});
