import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const catalog = load();
const lens = createWorkspace(catalog,data).domains.find(domain => domain.id==='metalens');
const rows = lens.rows.filter(row => row.study_id==='zhang2025folded');
const sample = id => rows.find(row => row.id==='zhang2025folded_'+id).values;
const frequencies = [195,200,205,210,215,220,225];
const wavelength = frequency => Math.round(29979245.8/frequency)/100;

test('Zhang preserves the experimental frequency labels and converted vacuum wavelengths',()=>{
  assert.equal(rows.length,16);
  assert.deepEqual([...new Set(rows.map(row=>row.specimen_id))],['lens_exp','lens_model']);
  assert.deepEqual(groupRows(rows).map(group=>group.paper),['device-zhang_folded_2025']);
  assert.ok(rows.every(row=>!hasVisibleLight(lens,row)));
  for(const frequency of frequencies){
    const v=sample('exp_'+frequency);
    assert.equal(v.frequency_thz.value,frequency);
    assert.equal(v.wavelength_nm.value,wavelength(frequency));
    assert.equal(v.wavelength_nm.calculation_origin,'atlas');
    assert.equal(v.wavelength_nm.original_unit,'THz');
    assert.equal(v.measured_focal_um.value,null);
    assert.equal(v.measured_focal_um.position_definition,'axial_fwhm_interval_midpoint');
    assert.equal(v.depth_of_focus_um.value,null);
    assert.equal(v.depth_of_focus_um.dof_criterion,'axial_intensity_fwhm');
    assert.equal(v.fwhm_um.value,null);
    assert.equal(v.fwhm_um.evaluation_plane,'maximum_intensity_xy_plane');
    assert.equal(v.psf_protocol.illumination_conjugate,'focused_incident_beam');
  }
  const values=sample('summary');
  assert.equal(values.height_nm.value,450);
  assert.deepEqual([values.height_nm.mgf2_spacer_nm,values.height_nm.ag_layer_lower_bound_nm],[250,150]);
  assert.equal(values.psf_protocol.collection_objective_na,.7);
  assert.equal(values.na.value,null);
  assert.equal(values.design_focal_um.value,null);
  assert.equal(values.mtf_curve.data_availability.raw_psf,null);
  assert.equal(axisPoints(rows,'frequency_thz','measured_focal_um').length,0);
  assert.equal(axisPoints(rows,'frequency_thz','fwhm_um').length,0);
});

test('Zhang model focal and efficiency curves retain the simulated protocol and no invented sample values',()=>{
  assert.equal(validateDevices(data,catalog),true);
  for(const frequency of frequencies){
    const v=sample('model_'+frequency);
    assert.equal(v.frequency_thz.value,frequency);
    assert.equal(v.frequency_thz.basis,'model');
    assert.equal(v.wavelength_nm.value,wavelength(frequency));
    assert.equal(v.psf_protocol.propagation_method,'vector_angular_spectrum');
    assert.equal(v.psf_protocol.simulation_field_plane_um,1);
    assert.equal(v.efficiency_protocol.basis,'model');
    assert.equal(v.efficiency_protocol.integration_radius_multiple_of_fwhm,3);
    assert.equal(v.simulated_focal_um.value,null);
    assert.equal(v.simulated_focusing_efficiency_pct.value,null);
    assert.equal(v.efficiency_at_lambda_pct,undefined);
  }
  assert.equal(axisPoints(rows,'frequency_thz','wavelength_nm').length,14);
  assert.equal(axisPoints(rows,'frequency_thz','simulated_focusing_efficiency_pct').length,0);
});
