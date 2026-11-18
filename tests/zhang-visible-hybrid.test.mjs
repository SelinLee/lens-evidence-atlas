import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const data=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const catalog=load();
const lens=createWorkspace(catalog,data).domains.find(domain=>domain.id==='metalens');
const rows=lens.rows.filter(row=>row.study_id==='zhang2025visiblehybrid');
const get=id=>rows.find(row=>row.id==='zhang2025visiblehybrid_'+id).values;
const metric='simulated_geometric_rms_spot_radius_um';

test('Zhang 8 mm study separates measured images and focus-curve evidence from nominal geometry',()=>{
 assert.equal(rows.length,70);
 assert.equal(new Set(rows.map(row=>row.specimen_id)).size,4);
 assert.deepEqual(groupRows(rows).map(group=>group.paper),['device-zhang_visible_hybrid_2025']);
 assert.ok(rows.every(row=>hasVisibleLight(lens,row)));
 const hybrid=get('hybrid_characterization');
 assert.deepEqual([hybrid.diameter_um.value,hybrid.na.value,hybrid.height_nm.value],[8000,.32,800]);
 assert.equal(hybrid.chromatic.author_abstract_chromatic_reduction_pct,83);
 assert.equal(hybrid.chromatic.author_reduction_metric,null);
 assert.equal(get('control_characterization').diameter_um,undefined);
 for(const spec of ['hybrid','control']){
  const optics=get(spec+'_characterization');
  assert.deepEqual(optics.psf_protocol.axial_coverage_nm,[420,680]);
  assert.equal(optics.psf_protocol.axial_sample_wavelengths_nm,null);
  assert.equal(optics.psf_protocol.evaluation_plane,'nominal_design_focus');
  assert.equal(optics.design_focal_um.value,null);
  assert.equal(optics.measured_focal_um.value,null);
  assert.equal(optics.focus_variation_um.value,null);
  assert.equal(optics.mtf_curve.data_availability.raw_psf,null);
  assert.equal(get(spec+'_usaf_white').wavelength_nm,undefined);
  for(const wave of [460,500,550,600,640]){
   const image=get(spec+'_usaf_'+wave);
   assert.equal(image.wavelength_nm.value,wave);
   assert.equal(image.wavelength_nm.basis,'measured');
   assert.equal(image.resolved_test_line_width_um.value,null);
  }
 }
 for(const key of ['measured_focal_um','fwhm_um','strehl','efficiency_at_lambda_pct']) assert.equal(axisPoints(rows,'wavelength_nm',key).length,0);
});

test('reproduced geometric RMS uses valid-ray spot radius in the model fixed plane',()=>{
 const waves=Array.from({length:27},(_,index)=>420+10*index);
 for(const spec of ['hybrid_model','control_model']){
  const points=rows.filter(row=>row.specimen_id===spec&&row.values[metric]);
  assert.deepEqual(points.map(row=>row.values.wavelength_nm.value),waves);
  for(const {values} of points){
   assert.equal(values[metric].basis,'model');
   assert.equal(values[metric].calculation_origin,'atlas');
   assert.equal(values[metric].evaluation_plane_um,16000);
   assert.equal(values.psf_protocol.ray_sampling_radius_mm,3.99);
   assert.equal(values.measured_focal_um,undefined);
  }
 }
 assert.deepEqual([get('hybrid_model_420')[metric].value,get('control_model_420')[metric].value],[13.6655,52.5105]);
 assert.equal(axisPoints(rows,'wavelength_nm',metric).length,54);
 assert.equal(validateDevices(data,catalog),true);
 const original=data.domains.metalens.rows;
 const index=original.findIndex(row=>row.id==='zhang2025visiblehybrid_hybrid_model_420');
 const changed=structuredClone(original[index]);
 changed.values[metric].evaluation_plane_um=15900;
 const invalid={...data,domains:{...data.domains,metalens:{...data.domains.metalens,rows:original.with(index,changed)}}};
 assert.throws(()=>validateDevices(invalid,catalog),/geometric ray spot RMS context/);
});
