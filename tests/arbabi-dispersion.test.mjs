import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const data=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const lens=createWorkspace(load(),data).domains.find(domain=>domain.id==='metalens');
const rows=lens.rows.filter(row=>row.study_id==='arbabi2017dispersion');
const row=id=>rows.find(item=>item.id==='arbabi2017dispersion_'+id);
const sweep=Array.from({length:15},(_,i)=>1450+10*i);

test('Arbabi 2017 preserves seven measured spectra and separates the model libraries',()=>{
 assert.equal(rows.length,123);
 assert.equal(new Set(rows.map(item=>item.specimen_id)).size,18);
 assert.deepEqual(groupRows(rows).map(group=>group.paper),['device-arbabi_dispersion_2017']);
 assert.ok(rows.every(item=>!hasVisibleLight(lens,item)));
 const specimens=['small_hyper','small_ordinary','small_zero','small_positive','large_ordinary','large_sigma300','large_sigma50'];
 for(const specimen of specimens){
  const measured=rows.filter(item=>item.specimen_id===specimen&&item.values.wavelength_nm);
  assert.deepEqual(measured.map(item=>item.values.wavelength_nm.value),sweep);
  assert.ok(measured.every(item=>item.values.wavelength_nm.basis==='measured'));
  const values=row(specimen+'_summary').values;
  assert.deepEqual([values.diameter_um.value,values.design_focal_um.value],specimen.startsWith('small')?[240,650]:[500,850]);
 }
 assert.equal(row('ideal_zero').values.diameter_um.basis,'model');
 assert.match(row('ideal_zero').values.diameter_um.location,/Fig\. 2/);
 assert.equal(row('ideal_zero').values.na,undefined);
 const model=row('large_sigma300_model').values.psf_protocol;
 assert.deepEqual(model.model_sample_wavelengths_nm,sweep);
 assert.deepEqual(model.design_wavelengths_nm,[1450,1470,1490,1510,1530,1550,1570,1590]);
 assert.equal(model.meta_atom_library,'physical_reflection_library');
 for(const key of ['measured_focal_um','axial_focus_offset_um','fwhm_um','strehl','efficiency_at_lambda_pct']){
  assert.equal(axisPoints(rows,'wavelength_nm',key).length,0);
 }
});

test('Arbabi 500 μm methods retain fixed-plane image evidence and the reference-power denominator',()=>{
 const sigma50=row('large_sigma50_1520').values;
 assert.equal(sigma50.psf_protocol.axial_plane_figure_available,false);
 assert.equal(sigma50.psf_protocol.evaluation_plane_um,850);
 assert.equal(sigma50.wavelength_nm.wavelength_alignment,'shared_row_labels_from_S13ab');
 assert.equal(sigma50.axial_focus_offset_um.reference_plane_um,850);
 assert.equal(sigma50.axial_focus_offset_um.location,'补件 p18 Fig. S14b');
 assert.equal(sigma50.strehl.method,'volume_integral_of_normalized_2d_mtf');
 assert.equal(sigma50.strehl.evaluation_plane_um,null);
 assert.equal(row('large_sigma300_1520').values.psf_protocol.axial_plane_figure_available,true);
 const group=row('large_efficiency');
 assert.equal(group.configuration_role,'unassigned_measurement_set');
 assert.deepEqual(group.candidate_specimen_ids,['large_sigma300','large_sigma50']);
 const efficiency=group.values.efficiency_protocol;
 assert.equal(efficiency.denominator,'regular_metasurface_mirror_iris_power_1520nm');
 assert.equal(efficiency.object_plane_iris_diameter_um,40);
 assert.equal(efficiency.normalization_reference_wavelength_nm,1520);
 assert.deepEqual(efficiency.relative_efficiency_band_range_pct,[50,60]);
 for(const id of ['large_sigma300_summary','large_sigma50_summary'])assert.equal(row(id).values.efficiency_protocol,undefined);
});
