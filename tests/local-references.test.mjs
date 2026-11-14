import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateDevices} from '../scripts/devices.mjs';
import {load} from '../scripts/catalog.mjs';
import {createWorkspace,axisPoints,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url)));
const lens=data.domains.metalens,studies=['balli2020','lin2025','chang2024','choi2025'];
const added=lens.rows.filter(r=>studies.includes(r.study_id));
const get=id=>lens.rows.find(r=>r.id===id).values;

test('four supplied studies are deduplicated across versions, supplements and spectral rows',()=>{
 assert.equal(added.length,54);assert.equal(new Set(added.map(r=>r.study_id)).size,4);
 assert.equal(new Set(added.map(r=>r.study_id+'/'+r.specimen_id)).size,12);
 assert.equal(lens.rows.length,189);assert.equal(new Set(lens.rows.map(r=>r.study_id)).size,16);
 assert.ok(!added.some(r=>/arxiv|proxy/i.test(r.study_id)));
 assert.equal(data.sources.length,55);assert.ok(data.sources.filter(s=>/balli_|lin_spdc|chang_dispersion|choi_rgb/.test(s.id)).every(s=>s.checked_on==='2026-11-14'&&s.scope));
});

test('Lin measured x and y PSF widths and complete-device efficiency retain the original ordered sequences',()=>{
 for(const [spec,diam,na,x,y,e]of [['na09',40.2,.9,[401,458,495,524,656],[388,402,441,480,574],[8.43,8.08,13.15,10.07,15.18]],['na07',60,.7,[575,571,820,839,851],[549,524,748,785,848],[7.1,7.8,9.2,11.3,10.4]]]){
  const rows=added.filter(r=>r.study_id==='lin2025'&&r.specimen_id===spec);
  assert.deepEqual(rows.map(r=>r.values.wavelength_nm.value),[650,700,800,900,1000]);
  for(const [i,r]of rows.entries()){
   const v=r.values;assert.equal(v.diameter_um.value,diam);assert.equal(v.na.value,na);assert.equal(v.height_nm.value,500);
   assert.equal(v.fwhm_x_um.value,x[i]/1000);assert.equal(v.fwhm_y_um.value,y[i]/1000);assert.equal(v.efficiency_at_lambda_pct.value,e[i]);
   assert.equal(v.fwhm_um,undefined);assert.equal(v.strehl,undefined);assert.equal(v.measured_focal_um,undefined);assert.equal(v.psnr_db,undefined);
   assert.match(v.efficiency_protocol.value,/r=3/);assert.match(v.material.value,/c-Si/);
   if(spec==='na07')assert.equal(v.design_focal_um,undefined);else assert.equal(v.design_focal_um.value,9.7);
  }
 }
});

test('Balli primary source data retain four measured devices, exact efficiency series and per-cell locators',()=>{
 for(const [spec,eff,fw]of [
  ['merged20',[39,53,42,64,72,68,63,70,78],[2.2,2.6,2.9,3.2,3.3,3.3,3.4,4,4.3]],
  ['merged40',[40,52,60,72,73,72,73,74,83],[4.4,4.9,5.5,5.8,6.1,6.3,6.9,7.3,7.6]],
  ['merged80',[48,51,61,69,70,71,73,72,75],[8.7,9.5,10.2,10.9,12,12.4,13.1,13.5,13.8]],
  ['air40',[23,25,31,34,32,27,26,18,26],[2,1.9,2.2,2.2,2.2,2.8,2.7,2.7,2.9]]]){
  const rows=added.filter(r=>r.study_id==='balli2020'&&r.specimen_id===spec);assert.equal(rows.length,9);
  assert.deepEqual(rows.map(r=>r.values.efficiency_at_lambda_pct.value),eff);assert.deepEqual(rows.map(r=>r.values.fwhm_um.value),fw);
  for(const r of rows){assert.match(r.values.efficiency_at_lambda_pct.location,/Figure 4d![C-K][4-7]/);assert.match(r.values.efficiency_protocol.value,/r=1.5/);assert.equal(r.values.measured_focal_um,undefined);assert.equal(r.values.height_nm.value,null);}
 }
 const conflict=get('balli2020_merged20_1000').efficiency_band_mean_pct;
 assert.equal(conflict.value,null);assert.equal(conflict.basis,'unresolved');assert.match(conflict.display,/61%.*67%/);
 assert.equal(get('balli2020_merged40_1000').efficiency_band_mean_pct.value,67);
 assert.equal(get('balli2020_air40_1000').efficiency_band_mean_pct.value,27);
 assert.equal(get('balli2020_merged40_1100').efficiency_band_mean_pct,undefined);
 assert.equal(get('balli2020_imaging').design_focal_um,undefined);
});

test('Chang only imports an explicitly assigned efficiency point and an explicitly reported focal plane',()=>{
 for(const [diam,na]of [[16,.27],[66,.11],[200,.04],[400,.02]]){
  const v=get('chang2024_d'+diam);assert.equal(v.diameter_um.value,diam);assert.equal(v.na.value,na);assert.equal(v.height_nm.value,600);
  assert.equal(v.strehl.value,null);assert.equal(v.efficiency_band_mean_pct,undefined);assert.match(v.efficiency_protocol.value,/半径\/直径待核/);
  if(diam===66){assert.equal(v.efficiency_at_lambda_pct.value,88);assert.equal(v.efficiency_lambda_nm.value,550);}else assert.equal(v.efficiency_at_lambda_pct,undefined);
  if(diam===400){
   assert.equal(v.design_focal_um.value,12500);assert.match(v.mtf_curve.value,/Fourier/);
   const a=v.mtf_curve.data_availability;
   assert.equal(a.status,'curves_only');
   for(const k of ['author_numeric_mtf','raw_psf','independently_recomputed_mtf','normalization_method','object_plane_pixel_size_um','field_angle_deg'])assert.equal(a[k],null);
   assert.deepEqual(a.wavelengths_nm,[400,450,500,550,600,650,700]);
   assert.equal(a.spatial_frequency_unit,'cycles/mm');
   assert.ok(v.mtf_curve.sourceIds.includes('chang_dispersion_2024'));
   assert.equal(v.mtf_curve.basis,'derived_from_measurement');
  }else assert.equal(v.design_focal_um,undefined);
 }
});

test('Choi lens data preserve RGB-only scope, designed NA and measured rather than simulated PSF values',()=>{
 for(const [wave,fw,sr,e]of [[450,.4821,.71,10.05],[532,.4732,.83,10.64],[635,.5565,.75,9.51]]){
  const v=get('choi2025_rgb_'+wave);assert.equal(v.diameter_um.value,10000);assert.equal(v.na.value,.7);assert.equal(v.height_nm.value,700);
  assert.equal(v.design_focal_um.value,5100);assert.equal(v.design_focal_um.approximate,true);
  assert.equal(v.fwhm_um.value,fw);assert.equal(v.strehl.value,sr);assert.equal(v.efficiency_at_lambda_pct.value,e);
  for(const id of ['lambda_min_nm','lambda_max_nm','fov_deg','psnr_db','measured_focal_um'])assert.equal(v[id],undefined);
  assert.match(v.na.note,/有效NA/);assert.match(v.efficiency_protocol.value,/待补/);
 }
});

test('the near-eye prototype keeps diagonal FOV and author bar contrast separate from CPD, MTF50 and panel refresh',()=>{
 const r=data.domains.xr.rows.find(r=>r.id==='choi2025_holographic_ned'),v=r.values;
 assert.equal(v.dfov.value,60);assert.equal(v.mtf.value,null);assert.match(v.spatial_protocol.note,/Michelson/);assert.match(v.spatial_protocol.value,/cycles\/mm/);
 for(const id of ['hfov','vfov','ufov','hz','latency','width','height','cutoff_white','cutoff_rb','ppd'])assert.equal(v[id],undefined);
 assert.equal(v.eyebox.value,null);assert.match(r.measurement_scope,/450\/520\/638/);
});

test('measured directional widths require a physical wavelength and cannot silently contain simulation or invalid values',()=>{
 assert.equal(validateDevices(data),true);
 for(const edit of [r=>delete r.values.wavelength_nm,r=>r.values.fwhm_x_um.value=-.5,r=>r.values.fwhm_y_um.basis='model']){
  const copy=structuredClone(data);edit(copy.domains.metalens.rows.find(r=>r.id==='lin2025_na09_650'));assert.throws(()=>validateDevices(copy),/PSF FWHM/);
 }
 const conflict=structuredClone(data);conflict.domains.metalens.rows.find(r=>r.id==='balli2020_merged20_1000').values.efficiency_band_mean_pct.value=61;assert.throws(()=>validateDevices(conflict),/unresolved/);
});

test('new measurements and their original references use the existing shared scatter model without altering old spectral focus points',()=>{
 const workspace=createWorkspace(load(),data),domain=workspace.domains.find(d=>d.id==='metalens');
 assert.equal(axisPoints(domain.rows,'wavelength_nm','measured_focal_um').length,15);
 assert.equal(axisPoints(domain.rows.filter(r=>studies.includes(r.study_id)),'wavelength_nm','fwhm_x_um').length,10);
 assert.equal(axisPoints(domain.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,92);
 assert.equal(axisPoints(domain.rows,'na','efficiency_band_mean_pct').length,5);
 for(const r of domain.rows)for(const v of Object.values(r.values))for(const s of valueSources(v))assert.ok(workspace.sources.has(s));
 assert.equal(data.domains.phone.rows.length,37);assert.equal(data.domains.xr.rows.filter(r=>r.evidence_type!=='study').length,8);
});
