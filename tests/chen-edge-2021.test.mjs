import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';
const data=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const ws=createWorkspace(load(),data), lens=ws.domains.find(d=>d.id==='metalens');
const rows=lens.rows.filter(r=>r.study_id==='chen2021edge');
const points=(x,y)=>axisPoints(rows,x,y).map(p=>[p.x,p.y]);

test('Chen 2021 distinguishes the actual achromatic array, related Lin 2019 design and reconstruction',()=>{
 assert.equal(rows.length,5);
 assert.deepEqual([...new Set(rows.map(r=>r.specimen_id))],['array','lightfield_system']);
 assert.equal(groupRows(rows).length,1);
 assert.equal(groupRows(rows)[0].paper,'device-chen_edge_2021');
 assert.ok(rows.every(r=>hasVisibleLight(lens,r)));
 assert.ok(lens.rows.some(r=>r.study_id==='lin2019'));
 const v=rows.find(r=>r.specimen_id==='array').values;
 assert.equal(v.diameter_um.value,21.65);
 assert.equal(v.design_focal_um.value,49);
 assert.deepEqual([v.lambda_min_nm.value,v.lambda_max_nm.value],[400,660]);
 assert.equal(v.reported_focal_band_center_um.value,49.01);
 assert.deepEqual(v.reported_focal_band_center_um.reported_error,{type:'not_specified',value:.92,sample_size:null});
 assert.equal(v.reported_focal_band_center_um.sample_wavelengths_nm,null);
 for(const m of ['na','wavelength_nm','measured_focal_band_mean_um','measured_focal_um','focus_variation_um','fwhm_um','mtf_curve','efficiency_at_lambda_pct']){
  assert.equal(v[m].value,null,m);
  assert.equal(v[m].basis,'unresolved',m);
 }
 assert.equal(v.operation_efficiency_band_mean_pct.value,38.9);
 assert.equal(v.operation_efficiency_protocol.denominator,'opposite_circular_polarization_incident_power');
 assert.equal(v.efficiency_band_mean_pct,undefined);
 assert.deepEqual(points('diameter_um','reported_focal_band_center_um'),[[21.65,49.01]]);
 assert.deepEqual(points('diameter_um','operation_efficiency_band_mean_pct'),[[21.65,38.9]]);
 assert.deepEqual(points('wavelength_nm','measured_focal_um'),[]);
 assert.deepEqual(points('reconstruction_depth_cm','reconstructed_edge_peak_background_ratio'),[[20,15],[25,7.8],[47,4.2]]);
 for(const r of rows.filter(r=>r.values.reconstruction_depth_cm)){
  assert.equal(r.values.image_snr_protocol.target_object_depth_cm,20);
  assert.equal(r.values.reconstructed_edge_peak_background_ratio.basis,'reconstruction');
  assert.equal(r.values.image_snr_db,undefined);
 }
 for(const id of ['chen_edge_vor_2021','chen_edge_si_2021','chen_edge_polyu_2021','chen_edge_crossref_2021','chen_edge_openalex_2021','chen_edge_datacite_2021','chen_edge_zenodo_2021']){
  assert.equal(ws.sources.get('device-'+id).publication_source,'device-chen_edge_2021');
 }
});

test('Chen evidence guards reject statistical or reconstructed image conditions that misrepresent source',()=>{
 const selected={...data,domains:{metalens:{...data.domains.metalens,rows:data.domains.metalens.rows.filter(r=>r.study_id==='chen2021edge')}}};
 assert.equal(validateDevices(selected),true);
 for(const change of [
  v=>v.reported_focal_band_center_um.reported_error.type='SD',
  v=>v.wavelength_nm.value=550,
  v=>delete v.reported_focal_band_center_um.sample_wavelengths_nm
 ]){
  const copy=structuredClone(selected);change(copy.domains.metalens.rows[0].values);
  assert.throws(()=>validateDevices(copy),/reported focal band center context/);
 }
 for(const change of [
  v=>v.reconstructed_edge_peak_background_ratio.unit='dB',
  v=>v.reconstructed_edge_peak_background_ratio.rendering_depth_cm=25,
  v=>v.image_snr_protocol.processing_stage='captured'
 ]){
  const copy=structuredClone(selected);change(copy.domains.metalens.rows.find(r=>r.id==='chen2021edge_edge_A_20').values);
  assert.throws(()=>validateDevices(copy),/reconstructed edge ratio context/);
 }
});
