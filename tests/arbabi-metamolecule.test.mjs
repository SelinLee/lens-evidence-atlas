import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const data=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const catalog=load();
const lens=createWorkspace(catalog,data).domains.find(domain=>domain.id==='metalens');
const rows=lens.rows.filter(row=>row.study_id==='arbabi2016metamolecule');
const get=id=>rows.find(row=>row.id==='arbabi2016metamolecule_'+id).values;

test('Arbabi 2016 keeps paraxial focal length apart from finite-conjugate image distance',()=>{
 assert.equal(rows.length,12);
 assert.equal(new Set(rows.map(row=>row.specimen_id)).size,5);
 assert.deepEqual(groupRows(rows).map(group=>group.paper),['device-arbabi_metamolecule_2016']);
 assert.ok(rows.every(row=>!hasVisibleLight(lens,row)));
 for(const [spec,na,f,image]of [['short',.46,286,400],['long',.29,495,1000]]){
  const config=get(spec+'_summary');
  assert.deepEqual([config.diameter_um.value,config.na.value,config.design_focal_um.value,config.design_image_distance_um.value],[300,na,f,image]);
  assert.equal(config.psf_protocol.object_distance_um,1100);
  assert.equal(config.chromatic.phase_map_caption_phi2_nm,950);
  assert.deepEqual(config.chromatic.checked_experimental_wavelengths_nm,[915,1550]);
 }
 const sight=get('long_915');
 assert.equal(sight.measured_image_distance_um.value,980);
 assert.equal(sight.axial_focus_offset_um.value,-20);
 assert.equal(sight.axial_focus_offset_um.input_metric,'measured_image_distance_um');
 assert.equal(sight.axial_focus_offset_um.reference_plane_um,1000);
 assert.equal(sight.measured_focal_um,undefined);
 assert.equal(get('long_1550').measured_image_distance_um.value,null);
 assert.equal(axisPoints(rows,'wavelength_nm','measured_image_distance_um').length,1);
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);
 assert.equal(validateDevices(data,catalog),true);
 const original=data.domains.metalens.rows;
 const index=original.findIndex(row=>row.id==='arbabi2016metamolecule_long_915');
 const altered=structuredClone(original[index]);
 altered.values.axial_focus_offset_um.reference_plane_um=495;
 altered.values.axial_focus_offset_um.value=485;
 const invalid={...data,domains:{...data.domains,metalens:{...data.domains.metalens,rows:original.with(index,altered)}}};
 assert.throws(()=>validateDevices(invalid,catalog),/atlas axial offset reference\/input/);
});

test('Arbabi 2016 separates the two experimental denominators and both kinds of model width',()=>{
 for(const [spec,efficiency]of [['short',[22,65]],['long',[25,72]]]){
  for(const [i,wave]of [915,1550].entries()){
   const values=get(spec+'_'+wave);
   assert.equal(values.wavelength_nm.value,wave);
   assert.equal(values.efficiency_at_lambda_pct.value,efficiency[i]);
   assert.equal(values.efficiency_at_lambda_pct.denominator,values.efficiency_protocol.denominator);
   assert.equal(values.efficiency_protocol.denominator,i===0?'fiber_output_power':'fiber_facet_image_power_with_same_setup_without_iris');
   assert.equal(values.efficiency_protocol.focus_collection_diameter_um,20);
   assert.equal(values.psf_protocol.axial_step_um,4);
   assert.equal(values.psf_protocol.displayed_axial_step_um,2);
  }
 }
 for(const [wave,real,ideal,scaled,eff]of [[915,1.9,1.6,1.9,32],[1550,2.9,2.75,3,73]]){
  assert.equal(get('short_'+wave).fwhm_x_um.value,real);
  assert.equal(get('ideal_'+wave).diffraction_limited_reference_fwhm_um.value,ideal);
  const fdtd=get('short_fdtd_'+wave);
  assert.equal(fdtd.simulated_psf_fwhm_x_um.value,scaled);
  assert.equal(fdtd.simulated_focusing_efficiency_pct.value,eff);
  assert.equal(fdtd.design_image_distance_um.value,100);
  assert.equal(fdtd.efficiency_protocol.denominator,'incident_power_on_metalens');
  assert.equal(get('long_fdtd_'+wave).design_image_distance_um.value,null);
 }
});
