import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateDevices} from '../scripts/devices.mjs';
import {load} from '../scripts/catalog.mjs';
import {createWorkspace,groupRows,hasVisibleLight,axisPoints,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url)));
const rows=data.domains.metalens.rows;
const get=id=>rows.find(r=>r.id===id);

test('Chen 2019 keeps focal variation, fixed-plane PSFs and a separate imaging specimen distinct',()=>{
 const ach=get('chen2019_achromatic_na02'),control=get('chen2019_chromatic_control_na02'),image=get('chen2019_imaging120');
 assert.equal(new Set([ach,control,image].map(r=>r.specimen_id)).size,3);
 for(const [r,variation]of [[ach,6],[control,30]]){
  const v=r.values;assert.equal(v.diameter_um.value,26.4);assert.equal(v.na.value,.2);assert.equal(v.design_focal_um.value,67);
  assert.equal(v.focus_variation_um.value,variation);assert.equal(v.focus_variation_um.statistic,'author_reported_band_variation');
  assert.deepEqual(v.focus_variation_um.sample_wavelengths_nm,[460,490,520,550,580,610,640,670,700]);
  assert.equal(v.wavelength_nm.value,null);assert.equal(v.measured_focal_um,undefined);
  assert.match(v.focus_variation_protocol.value,/460nm焦面/);
 }
 assert.equal(ach.values.focus_variation_um.approximate,true);assert.match(ach.values.focus_variation_um.display,/约6/);
 assert.equal(image.values.diameter_um.value,120);assert.equal(image.values.na.value,.05);
 for(const k of ['design_focal_um','focus_variation_um','lambda_min_nm','lambda_max_nm','fwhm_um','strehl','efficiency_at_lambda_pct'])assert.equal(image.values[k],undefined);
 assert.equal(image.values.wavelength_nm.value,null);assert.match(image.values.wavelength_nm.display,/40nm/);
 assert.match(ach.values.efficiency_protocol.value,/圆孔透过功率/);
 assert.match(ach.values.strehl.note,/第二瓣/);assert.equal(ach.values.strehl.value,null);
 assert.ok(rows.filter(r=>r.study_id==='chen2019').every(r=>!r.values.efficiency_at_lambda_pct));
});

test('Li RGB measurements preserve printed directional widths and keep aggregate shift off spectral rows',()=>{
 const summary=get('li2021_na07_summary'),low=get('li2021_na03_summary');
 assert.equal(summary.values.focus_variation_um.value,1);assert.equal(summary.values.focus_variation_um.statistic,'maximum_pairwise_difference');
 assert.deepEqual(summary.values.focus_variation_um.sample_wavelengths_nm,[488,532,658]);
 assert.equal(summary.values.wavelength_nm.value,null);assert.equal(low.values.focus_variation_um,undefined);
 assert.match(low.values.wavelength_nm.display,/470\/548\/647/);
 for(const [wave,width,sr,panel]of [[488,.351,1,'F'],[532,.391,.98,'G'],[658,.485,.97,'H']]){
  const r=get('li2021_na07_'+wave),v=r.values;
  assert.equal(r.specimen_id,summary.specimen_id);assert.equal(v.fwhm_x_um.value,width);assert.equal(v.strehl.value,sr);
  assert.match(v.fwhm_x_um.location,new RegExp('Fig.2'+panel));assert.equal(v.fwhm_x_um.basis,'measured');
  assert.equal(v.strehl.basis,'derived_from_measurement');assert.equal(v.strehl.approximate,true);
  for(const k of ['fwhm_y_um','fwhm_um','measured_focal_um','design_focal_um','focus_variation_um','lambda_min_nm','lambda_max_nm'])assert.equal(v[k],undefined);
 }
 assert.ok(rows.filter(r=>r.study_id==='li2021').every(r=>r.values.height_nm.value===600&&r.values.diameter_um.value===2000&&!r.values.efficiency_at_lambda_pct));
});

test('bandwise focus variation requires wavelengths and a method rather than masquerading as signed focal shift',()=>{
 assert.equal(validateDevices(data),true);
 for(const change of [
  r=>delete r.values.focus_variation_protocol,
  r=>r.values.focus_variation_um.value=-1,
  r=>r.values.focus_variation_um.sample_wavelengths_nm=[488,488],
  r=>r.values.focus_variation_um.sample_wavelengths_nm=[488],
  r=>r.values.wavelength_nm.value=488,
  r=>r.values.focus_variation_um.statistic='signed_shift',
  r=>r.values.focus_variation_um.calculation_origin='atlas',
  r=>r.values.focus_variation_um.basis='model'
 ]){
  const copy=structuredClone(data);change(copy.domains.metalens.rows.find(r=>r.id==='li2021_na07_summary'));
  assert.throws(()=>validateDevices(copy),/focal variation context/);
 }
});

test('visible-only summary records retain one publication while known infrared wavelengths still take precedence',()=>{
 const atlas=createWorkspace(load(),data),domain=atlas.domains.find(d=>d.id==='metalens');
 for(const study of ['chen2019','li2021']){
  const selected=domain.rows.filter(r=>r.study_id===study);assert.equal(groupRows(selected).length,1);
  assert.ok(selected.every(r=>hasVisibleLight(domain,r)));
  for(const r of selected)for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
 }
 assert.equal(hasVisibleLight(domain,{visible_light_use:true,values:{}}),true);
 assert.equal(hasVisibleLight(domain,{visible_light_use:true,values:{wavelength_nm:{value:1000}}}),false);
 assert.equal(axisPoints(domain.rows,'na','focus_variation_um').length,6);
 assert.equal(axisPoints(domain.rows,'wavelength_nm','measured_focal_um').length,18);
 assert.equal(axisPoints(domain.rows.filter(r=>r.study_id==='li2021'),'wavelength_nm','fwhm_x_um').length,3);
});
