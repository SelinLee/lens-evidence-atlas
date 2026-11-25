import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,filteredRows} from '../web/workspace-data.js';
const data=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const ws=createWorkspace(load(),data),xr=ws.domains.find(d=>d.id==='xr'),lens=ws.domains.find(d=>d.id==='metalens');
const rows=xr.rows.filter(r=>r.study_id==='lee2018ar');
const raw=data.domains.xr.rows.filter(r=>r.study_id==='lee2018ar');
const points=(x,y)=>axisPoints(rows,x,y).map(p=>[p.x,p.y]);

test('Lee 2018 keeps independent chromatic eyepiece and dichroic-compensated AR system outside achromatic lens matrix',()=>{
 assert.equal(rows.length,6);
 assert.deepEqual([...new Set(rows.map(r=>r.specimen_id))],['bare_eyepiece','benchtop_system']);
 assert.equal(groupRows(rows).length,1);
 assert.equal(groupRows(rows)[0].paper,'device-lee_ar_2018');
 assert.ok(!lens.rows.some(r=>r.study_id==='lee2018ar'));
 assert.equal(filteredRows(xr,{query:'Lee 2018',models:null,evidence:'research'}).length,6);
 assert.deepEqual(points('wavelength_nm','fwhm_x_um'),[[660,.78],[532,.533],[473,.507]]);
 assert.deepEqual(points('design_focal_um','fwhm_x_um'),[[12900,.78],[16000,.533],[18000,.507]]);
 assert.deepEqual(points('wavelength_nm','ufov'),[[660,90],[473,76]]);
 for(const r of rows.filter(r=>r.specimen_id==='bare_eyepiece')){
  const v=r.values;
  assert.equal(v.diameter_um.value,20000);
  assert.equal(v.design_focal_um.basis,'reported_configuration');
  assert.equal(v.fwhm_x_um.basis,'measured');
  assert.equal(v.fwhm_x_um.direction,'x');
  assert.equal(v.fwhm_x_um.original_value,v.fwhm_x_um.value*1000);
  assert.equal(v.psf_protocol.incidence_deg,0);
  assert.equal(v.psf_protocol.evaluation_plane,'each_wavelength_focal_plane');
  assert.equal(v.psf_protocol.detector_sampling_um,null);
  assert.equal(v.mtf_curve.frequency_unit,'cycles/mm');
  assert.equal(v.mtf_curve.data_availability.raw_psf,null);
  assert.equal(v.mtf_curve.data_availability.author_numeric_mtf,null);
  assert.equal(v.mtf,undefined);
  assert.equal(v.measured_focal_um,undefined);
  assert.equal(v.focus_variation_um,undefined);
 }
 const sys=rows.find(r=>r.id==='lee2018ar_system_rgb').values;
 assert.equal(sys.ufov.value,76);
 assert.equal(sys.ufov.basis,'derived_from_measurement');
 assert.equal(sys.eyerelief.value,10);
 assert.equal(sys.eyebox.basis,'reported_configuration');
 assert.equal(sys.mtf.value,null);
 assert.equal(sys.wavelength_nm,undefined);
 for(const row of rows.filter(r=>r.specimen_id==='benchtop_system')){
  assert.equal(row.values.fwhm_x_um,undefined);
  assert.equal(row.values.design_focal_um,undefined);
  for(const k of ['hfov','vfov','dfov','cutoff_rb','cutoff_white','ppd'])assert.equal(row.values[k],undefined);
 }
 for(const id of ['vor','si','author','pmc_index','crossref','openalex','datacite','zenodo']){
  assert.equal(ws.sources.get('device-lee_ar_'+id+'_2018').publication_source,'device-lee_ar_2018');
 }
});

test('Lee optical source cannot be mislabeled as display CPD or common-plane PSF',()=>{
 const selected={...data,domains:{xr:{...data.domains.xr,rows:raw}}};
 assert.equal(validateDevices(selected),true);
 for(const mutate of [
  v=>v.mtf_curve.frequency_unit='cycles/degree',
  v=>v.psf_protocol.evaluation_plane='common_rgb_plane',
  v=>v.mtf_curve.data_availability.raw_psf='unverified.zip',
  v=>v.fwhm_x_um.direction='y',
 ]){
  const d=structuredClone(selected);mutate(d.domains.xr.rows[0].values);
  assert.throws(()=>validateDevices(d),/bare eyepiece linear-frequency MTF context/);
 }
});
