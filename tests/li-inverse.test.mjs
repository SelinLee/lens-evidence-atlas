import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';
import {createWorkspace,groupRows,filteredRows,axisPoints,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url)));
const atlas=createWorkspace(load(),data),domain=atlas.domains.find(d=>d.id==='metalens');
const rows=domain.rows.filter(r=>r.study_id==='li2022'),get=id=>rows.find(r=>r.id==='li2022_'+id);

test('Li 2022 keeps four physical configurations and discrete wavelengths under one publication',()=>{
 assert.equal(rows.length,19);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,4);
 assert.equal(groupRows(rows).length,1);assert.equal(filteredRows(domain,{visible:true,models:null}).filter(r=>r.study_id==='li2022').length,19);
 for(const r of rows){
  for(const k of ['design_focal_um','measured_focal_um','lambda_min_nm','lambda_max_nm'])assert.equal(r.values[k],undefined);
  assert.equal(r.values.height_nm.value,600);
  for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
 }
 assert.equal(atlas.sources.get('device-li_inverse_si_2022').publication_source,'device-li_inverse_2022');
 for(const [spec,diam,na]of [['rgb2_na07',2000,.7],['six2_na03',2000,.3],['six2_na07',2000,.7],['rgb10_na03',10000,.3]]){
  const v=get(spec+'_summary').values;assert.equal(v.diameter_um.value,diam);assert.equal(v.na.value,na);assert.equal(v.wavelength_nm.value,null);
 }
});

test('laser-diode Strehl and supercontinuum PSF widths remain separate measurements of one Li 2022 lens',()=>{
 for(const [wave,sr,fw]of [[488,.97,.450],[532,.96,.468],[658,.94,.520]]){
  const a=get('rgb2_na07_diode_'+wave),b=get('rgb2_na07_scl_'+wave);
  assert.equal(a.specimen_id,b.specimen_id);assert.notEqual(a.illumination_id,b.illumination_id);
  assert.equal(a.values.strehl.value,sr);assert.equal(a.values.strehl.basis,'derived_from_measurement');assert.equal(a.values.fwhm_um,undefined);
  assert.equal(b.values.fwhm_um.value,fw);assert.equal(b.values.fwhm_um.basis,'measured');assert.equal(b.values.strehl,undefined);
  assert.match(a.values.illumination.value,/0.5–1nm/);assert.match(b.values.illumination.value,/4–7nm/);
 }
 assert.match(get('rgb2_na07_summary').values.chromatic.note,/非设计波长/);
});

test('measured efficiencies come from S1 and S2 rather than simulated S3 or another NA',()=>{
 const six=[490,520,540,570,610,650],rgb=[488,532,658];
 for(const [i,w]of six.entries()){
  const v=get('six2_na03_scl_'+w).values;
  assert.equal(v.fwhm_um.value,[.873,.914,.936,.988,1.049,1.074][i]);assert.match(v.fwhm_um.location,new RegExp('Fig.4'+String.fromCharCode(101+i)));
  assert.equal(v.efficiency_at_lambda_pct.value,[8.7,7.8,8.3,8.2,8.1,7.2][i]);assert.match(v.efficiency_at_lambda_pct.location,/Table S1/);
 }
 for(const [i,w]of rgb.entries()){
  const v=get('rgb10_na03_rgb_'+w).values;
  assert.equal(v.strehl.value,[.90,.92,.84][i]);assert.equal(v.efficiency_at_lambda_pct.value,[16.1,13.6,15.8][i]);assert.match(v.efficiency_at_lambda_pct.location,/Table S2/);
 }
 const high=get('six2_na07_summary').values;for(const k of ['fwhm_um','strehl','efficiency_at_lambda_pct','focus_variation_um'])assert.equal(high[k],undefined);
 const eff=rows.filter(r=>r.values.efficiency_at_lambda_pct);assert.equal(eff.length,9);
 for(const r of eff){const v=r.values;assert.equal(v.efficiency_at_lambda_pct.basis,'measured');assert.equal(v.efficiency_lambda_nm.value,v.wavelength_nm.value);assert.match(v.efficiency_protocol.value,/焦斑功率\/入射功率/);assert.match(v.efficiency_protocol.note,/积分|积分区域/);}
 assert.equal(axisPoints(rows,'wavelength_nm','fwhm_um').length,9);assert.equal(axisPoints(rows,'wavelength_nm','strehl').length,6);
});

test('three measured maximum focus differences remain aggregate values with their own wavelength sets',()=>{
 for(const [spec,value,approx,waves]of [['rgb2_na07',1.5,true,[488,532,658]],['six2_na03',.5,false,[490,520,540,570,610,650]],['rgb10_na03',4.5,true,[488,532,658]]]){
  const v=get(spec+'_summary').values,f=v.focus_variation_um;
  assert.equal(f.value,value);assert.equal(f.approximate,approx);assert.equal(f.statistic,'maximum_pairwise_difference');assert.deepEqual(f.sample_wavelengths_nm,waves);assert.equal(f.calculation_origin,'authors');assert.equal(v.wavelength_nm.value,null);
 }
 assert.ok(rows.filter(r=>Number.isFinite(r.values.wavelength_nm.value)).every(r=>!r.values.focus_variation_um));
 assert.equal(axisPoints(rows,'na','focus_variation_um').length,3);
});
