import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const data=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const catalog=load();
const lens=createWorkspace(catalog,data).domains.find(item=>item.id==='metalens');
const rows=lens.rows.filter(row=>row.study_id==='aiello2019');
const sample=id=>rows.find(row=>row.id==='aiello2019_'+id).values;

test('Aiello shares one fabricated aperture across two separately documented scans',()=>{
 assert.equal(rows.length,25);
 assert.equal(new Set(rows.map(row=>row.specimen_id)).size,8);
 assert.deepEqual(groupRows(rows).map(group=>group.paper),['device-aiello_varifocal_2019']);
 assert.ok(rows.every(row=>hasVisibleLight(lens,row)&&row.values.diameter_um.value===40));
 for(const [id,lo,hi,delta] of [['fixed140',260,326,66],['corrected_a',265,278,13]]){
  const v=sample(id);
  assert.deepEqual([v.lambda_min_nm.value,v.lambda_max_nm.value],[483,620]);
  assert.deepEqual(v.focus_variation_um.author_reported_focal_bounds_um,[lo,hi]);
  assert.equal(v.focus_variation_um.value,delta);
  assert.equal(v.focus_variation_um.calculation_origin,'atlas');
  assert.equal(v.focus_variation_um.sample_wavelengths_nm,null);
  assert.equal(v.focus_variation_protocol.reference_plane_um,0);
  for(const wave of [483,505,533,562,591,620]){
   const spectral=sample(id+'_'+wave);
   assert.equal(spectral.wavelength_nm.value,wave);
   assert.equal(spectral.measured_focal_um.value,null);
  }
 }
 assert.equal(sample('corrected_a').polarization.nominal_focus_setting_um,278);
 assert.equal(sample('fixed140').psf_protocol.axial_scan_step_um,10);
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);
 assert.equal(axisPoints(rows,'diameter_um','focus_variation_um').length,2);
});

test('Aiello fixed angle widths, analysis-polarizer efficiency and imaging states keep their measurement conditions',()=>{
 for(const [wave,width] of [[483,3.5],[533,3.3],[581,3.5],[630,4.2]]){
  const v=sample('width_'+wave);
  assert.equal(v.fwhm_um.value,width);
  assert.equal(v.fwhm_um.direction,'radial_symmetric_gaussian_fit');
  assert.equal(v.polarization.angle_deg,120);
  assert.equal(v.fwhm_um.source,'device-aiello_varifocal_arxiv_2019');
 }
 const v=sample('eff_45');
 assert.equal(v.efficiency_at_lambda_pct.value,50);
 assert.deepEqual(v.efficiency_at_lambda_pct.reported_error,{type:'SD',value:2,sample_size:null});
 assert.equal(v.efficiency_protocol.source,'device-aiello_varifocal_original_si_2019');
 assert.match(v.efficiency_protocol.location,/S20/);
 assert.equal(v.efficiency_protocol.denominator,'incident_through_aperture');
 assert.equal(v.efficiency_protocol.integration_radius_um,null);
 assert.equal(sample('eff_135').efficiency_at_lambda_pct.value,null);
 assert.equal(sample('eff_135').efficiency_at_lambda_pct.bound.value,5);
 assert.equal(sample('chart_b').chromatic.author_reported_half_pitch_um,11);
 assert.equal(sample('switch_a').chromatic.basis,'measured');
 assert.equal(sample('switch_b').chromatic.basis,'reconstruction');
 assert.equal(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,1);
 assert.equal(sample('summary').mtf_curve.data_availability.raw_psf,null);
});

test('Aiello range validation requires the published endpoints and their consistent subtraction',()=>{
 assert.equal(validateDevices(data,catalog),true);
 for(const change of [
  variation=>{variation.value=14;},
  variation=>{variation.calculation_origin='authors';},
  variation=>{variation.author_reported_focal_bounds_um=[278,265];},
  variation=>{variation.author_reported_focal_bounds_um=265;},
  variation=>{variation.sample_wavelengths_nm=[483,620];},
 ]){
  const changed=structuredClone(data);
  const v=changed.domains.metalens.rows.find(row=>row.id==='aiello2019_corrected_a').values;
  change(v.focus_variation_um);
  assert.throws(()=>validateDevices(changed,catalog),/focal variation context/);
 }
});
