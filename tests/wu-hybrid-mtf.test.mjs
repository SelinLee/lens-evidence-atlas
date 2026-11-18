import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const dataset=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const catalog=load();
const lens=createWorkspace(catalog,dataset).domains.find(domain=>domain.id==='metalens');
const rows=lens.rows.filter(row=>row.study_id==='wu2025hybrid');
const cells=id=>rows.find(row=>row.id==='wu2025hybrid_'+id).values;

test('Wu separates the 5.79 mm corrector and the assembled visible module with its focus range',()=>{
 assert.equal(rows.length,18);
 assert.equal(new Set(rows.map(row=>row.specimen_id)).size,8);
 assert.deepEqual(groupRows(rows).map(group=>group.paper),['device-wu_hybrid_2025']);
 assert.ok(rows.every(row=>hasVisibleLight(lens,row)));
 const corrector=cells('corrector');
 assert.equal(corrector.diameter_um.value,5790);
 assert.equal(corrector.material.phase_polynomial_normalization_radius_mm,1);
 assert.equal(corrector.design_focal_um,undefined);
 const assembly=cells('focus_band');
 assert.equal(assembly.design_focal_um.value,4130);
 assert.equal(assembly.fnumber.value,2);
 assert.equal(assembly.diameter_um,undefined);
 assert.equal(assembly.na,undefined);
 assert.deepEqual([assembly.lambda_min_nm.value,assembly.lambda_max_nm.value],[460,656]);
 assert.deepEqual([assembly.focus_variation_um.value,assembly.focus_variation_pct.value],[50,1.2]);
 assert.equal(assembly.focus_variation_um.approximate,true);
 assert.equal(assembly.focus_variation_pct.denominator,'design_focal_length');
 assert.equal(assembly.focus_variation_pct.reference_focal_um,4130);
 assert.equal(assembly.focus_variation_um.sample_wavelengths_nm,null);
 assert.equal(assembly.measured_focal_um.value,null);
 assert.equal(assembly.psf_protocol.sensor_pixel_pitch_um,3);
 assert.equal(cells('field').fov_deg.fov_type,'diagonal_full_angle');
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);
 assert.equal(axisPoints(rows,'wavelength_nm','axial_focus_offset_um').length,0);
 assert.equal(axisPoints(rows,'diameter_um','design_focal_um').length,0);
});

test('Wu reports four measured polychromatic MTF ordinates outside the ray-traced S/T curves',()=>{
 for(const [field,statistic,values] of [
  ['mean','whole_field_mean',[.63,.24]],['maximum','maximum_measured_field',[.364,.161]],
 ]){
  for(const [index,frequency] of [100,167].entries()){
   const v=cells('mtf_'+field+'_'+frequency);
   assert.equal(v.mtf_spatial_frequency_lpmm.value,frequency);
   assert.equal(v.system_slanted_edge_mtf.value,values[index]);
   assert.equal(v.system_slanted_edge_mtf.field_statistic,statistic);
   assert.equal(v.system_slanted_edge_mtf.field_angle_deg,null);
   assert.equal(v.system_slanted_edge_mtf.calculation_origin,'authors');
   assert.equal(v.mtf_curve.direction_aggregation,'unspecified');
   assert.equal(v.mtf_curve.frequency_reference_plane,null);
   assert.equal(v.mtf_curve.normalization,null);
   assert.equal(v.mtf_curve.data_availability.author_full_mtf_table,null);
   assert.equal(v.mtf_curve.data_availability.raw_slanted_edge_images,null);
   assert.equal(v.wavelength_nm,undefined);
  }
 }
 for(const [key,angles] of [
  ['with_corrector',[0,28,42,56,73,100]],
  ['baseline',[0,14,21,28,36,50]],
  ['removed_refocus',[0,14,21,28,36,50]],
 ]){
  const v=cells('model_'+key);
  assert.equal(v.mtf_curve.basis,'model');
  assert.deepEqual(v.mtf_curve.reported_field_angle_labels_deg,angles);
  assert.deepEqual(v.mtf_curve.directions,['tangential','sagittal']);
  assert.equal(v.mtf_curve.data_availability.author_numeric_mtf,null);
  assert.equal(v.system_slanted_edge_mtf,undefined);
 }
 assert.equal(axisPoints(rows,'mtf_spatial_frequency_lpmm','system_slanted_edge_mtf').length,4);
});

test('validation requires measured MTF context and source-bounded focus aggregates',()=>{
 assert.equal(validateDevices(dataset,catalog),true);
 const changed=structuredClone(dataset);
 const get=id=>changed.domains.metalens.rows.find(row=>row.id==='wu2025hybrid_'+id).values;
 get('mtf_maximum_167').mtf_curve.basis='model';
 assert.throws(()=>validateDevices(changed,catalog),/measured slanted-edge MTF context/);
 get('mtf_maximum_167').mtf_curve.basis='derived_from_measurement';
 get('focus_band').focus_variation_um.spectral_sample_scope=undefined;
 assert.throws(()=>validateDevices(changed,catalog),/focal variation context/);
});
