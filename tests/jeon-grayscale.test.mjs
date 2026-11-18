import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const dataset=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const catalog=load();
const lens=createWorkspace(catalog,dataset).domains.find(item=>item.id==='metalens');
const rows=lens.rows.filter(row=>row.study_id==='jeon2026grayscale');
const cell=id=>rows.find(row=>row.id==='jeon2026grayscale_'+id).values;

test('Jeon grayscale separates the new 1.2 mm experiment from the earlier RGB work and from design bounds',()=>{
 assert.equal(rows.length,30);
 assert.equal(new Set(rows.map(row=>row.specimen_id)).size,12);
 assert.deepEqual(groupRows(rows).map(group=>group.paper),['device-jeon_grayscale_2026']);
 assert.ok(rows.every(row=>hasVisibleLight(lens,row)));
 const v=cell('summary');
 assert.deepEqual([v.diameter_um.value,v.na.value,v.design_focal_um.value],[1200,.31,1800]);
 assert.equal(v.effective_na_from_psf.value,.29);
 assert.equal(v.effective_na_from_psf.calculation_origin,'authors');
 assert.equal(v.focus_error_um.value,null);
 assert.equal(v.focus_error_um.bound.value,7);
 assert.strictEqual(v.psf_protocol.evaluation_plane_um,null);
 assert.equal(cell('bench_450').focus_error_pct.value,.27);
 assert.equal(cell('bench_450').focus_error_pct.reference_plane_um,1800);
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);
 assert.equal(axisPoints(rows,'wavelength_nm','axial_focus_offset_um').length,0);
});

test('The three exact PSF widths, MTF-derived Strehl and power columns retain the author values',()=>{
 for(const [wave,width,strehl,incident,focused,eta] of [
  [450,.794,.83,62.8,9.4,14.8],[532,.956,.86,81.1,9.2,11.3],[635,1.170,.85,78.8,9.7,12.3],
 ]){
  const v=cell('bench_'+wave);
  assert.equal(v.fwhm_x_um.value,width);
  assert.equal(v.strehl.value,strehl);
  assert.equal(v.strehl.statistic,'ratio_of_2d_mtf_integrals');
  assert.equal(v.incident_power_uw.value,incident);
  assert.equal(v.focused_power_uw.value,focused);
  assert.equal(v.efficiency_at_lambda_pct.value,eta);
  assert.equal(v.efficiency_protocol.integration_radius_um,null);
  assert.equal(v.mtf_curve.frequency_unit,'normalized_spatial_frequency');
  assert.equal(v.mtf_curve.normalization_frequency_cycles_mm,null);
  assert.equal(v.mtf_curve.direction_aggregation,'unspecified');
  assert.equal(v.mtf_curve.data_availability.raw_psf,null);
 }
 assert.equal(cell('bench_532').wavelength_nm.conflicting_label_nm,635);
 assert.equal(cell('bench_450').efficiency_at_lambda_pct.ratio_from_printed_power_pct,14.97);
 assert.equal(axisPoints(rows,'wavelength_nm','fwhm_x_um').length,3);
 assert.equal(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,3);
});

test('Model comparisons preserve the actual NA labels, focal energy definitions and no experimental leakage',()=>{
 for(const [key,na,etas] of [
  ['nominal',.31,[25.4,18.9,20.2]],['1200_na3',.3,[25.44,18.92,20.19]],
  ['1200_na5',.5,[20.05,16.18,18.58]],['1200_na7',.7,[8.18,9.29,14.86]],
  ['2400_na3',.3,[23.54,18.38,20.29]],
 ]){
  for(const [index,wave] of [450,532,635].entries()){
   const v=cell('model_'+key+'_'+wave);
   assert.equal(v.na.value,na);
   assert.equal(v.simulated_focusing_efficiency_pct.value,etas[index]);
   assert.equal(v.simulated_focusing_efficiency_pct.basis,'model');
   assert.equal(v.efficiency_at_lambda_pct,undefined);
  }
 }
 assert.equal(cell('model_nominal_450').efficiency_protocol.integration_radius_multiple_of_fwhm,3);
 assert.equal(cell('model_1200_na3_450').efficiency_protocol.integration_radius_multiple_of_fwhm,undefined);
});

test('Verification preserves normalization uncertainty and a matching single-wavelength focus reference',()=>{
 assert.equal(validateDevices(dataset,catalog),true);
 const changed=structuredClone(dataset);
 const values=id=>changed.domains.metalens.rows.find(row=>row.id==='jeon2026grayscale_'+id).values;
 values('bench_450').mtf_curve.normalization_frequency_cycles_mm=1377;
 assert.throws(()=>validateDevices(changed,catalog),/uncalibrated PSF MTF context/);
 values('bench_450').mtf_curve.normalization_frequency_cycles_mm=null;
 values('bench_450').focus_error_pct.sample_wavelengths_nm=[532];
 assert.throws(()=>validateDevices(changed,catalog),/focal error context/);
});
