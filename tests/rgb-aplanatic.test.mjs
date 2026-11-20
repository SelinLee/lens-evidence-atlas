import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const catalog = load();
const domain = createWorkspace(catalog,data).domains.find(item=>item.id==='metalens');
const li = domain.rows.filter(row=>row.study_id==='li2024aplanatic');
const feng = domain.rows.filter(row=>row.study_id==='feng2022');
const cells = id => li.find(row=>row.id==='li2024aplanatic_'+id).values;

test('Li 2024 keeps exact RGB foci, atlas offsets and off-design figure labels at their source',()=>{
 const expected = [
  [490,365,0,588,1.52],[530,null,null,942,null],[570,369,4,842,2.70],
  [630,null,null,1292,null],[700,365,0,812,6.54],
 ];
 for (const [index,[wave,focal,offset,width,efficiency]] of expected.entries()) {
  const v = cells('aplanatic_focus_'+wave);
  assert.deepEqual([v.diameter_um.value,v.na.value,v.design_focal_um.value],[600,.635,365]);
  assert.equal(v.psf_protocol.collection_na,.55);
  assert.equal(v.psf_protocol.image_plane_pixel_size_um,null);
  assert.equal(v.measured_focal_um.value,focal);
  assert.equal(v.fwhm_x_um.value,width/1000);
  assert.equal(v.fwhm_x_um.original_value,width);
  assert.equal(v.fwhm_x_um.original_unit,'nm');
  assert.match(v.fwhm_x_um.location,new RegExp('Fig\\.3'+'abcde'[index]));
  if (focal === null) {
   assert.equal(v.axial_focus_offset_um,undefined);
   assert.equal(v.efficiency_at_lambda_pct,undefined);
   continue;
  }
  assert.equal(v.axial_focus_offset_um.value,offset);
  assert.equal(v.axial_focus_offset_um.calculation_origin,'atlas');
  assert.equal(v.axial_focus_offset_um.reference_plane_um,365);
  assert.equal(v.efficiency_at_lambda_pct.value,efficiency);
  assert.equal(v.efficiency_protocol.denominator,'incident_light_energy');
  assert.equal(v.efficiency_protocol.author_area_multiple_of_fwhm_area,3);
  assert.equal(v.efficiency_protocol.integration_shape,null);
 }
 const v = cells('summary');
 assert.deepEqual([v.lambda_min_nm.value,v.lambda_max_nm.value],[490,720]);
 assert.deepEqual(v.focus_error_pct.sample_wavelengths_nm,[490,570,700]);
 assert.equal(v.focus_error_pct.approximate,true);
 assert.equal(v.focus_error_pct.reference_wavelength_nm,null);
 assert.equal(v.mtf_curve.data_availability.status,'no_mtf_in_checked_material');
 assert.equal(v.mtf_curve.data_availability.raw_psf_available,null);
 assert.equal(axisPoints(li,'wavelength_nm','measured_focal_um').length,3);
 assert.equal(axisPoints(li,'wavelength_nm','axial_focus_offset_um').length,3);
});

test('Li 2024 preserves the limits of normal-incidence, object-side chart and simulated comparisons',()=>{
 assert.equal(li.length,40);
 assert.equal(new Set(li.map(row=>row.specimen_id)).size,13);
 const [group]=groupRows(li);
 assert.equal(group.paper,'device-li_aplanatic_2024');
 for (const [wave,normalWidth,mainWidth,controlWidth,modelEfficiency] of [
  [490,.560,.83,1.44,1.58],[570,.669,1.01,1.70,2.99],[700,.840,1.23,2.13,4.66],
 ]) {
  const control=cells('nonaplanatic_focus_'+wave);
  assert.equal(control.fwhm_x_um.value,normalWidth);
  assert.equal(control.diameter_um.value,null);
  assert.equal(control.measured_focal_um.value,null);
  for (const [kind,width] of [['aplanatic',mainWidth],['nonaplanatic',controlWidth]]) {
   const v=cells(kind+'_fresnel_'+wave);
   assert.equal(v.simulated_psf_fwhm_x_um.value,width);
   assert.equal(v.simulated_psf_fwhm_x_um.basis,'model');
   assert.equal(v.psf_protocol.object_distance_um,700);
   assert.equal(v.fwhm_x_um,undefined);
  }
  const chart=cells('aplanatic_usaf_'+wave).resolved_test_line_width_um;
  assert.equal(chart.value,2.19);
  assert.equal(chart.processing_stage,'captured');
  assert.equal(chart.approximate,true);
  assert.equal(cells('nonaplanatic_usaf_'+wave).resolved_test_line_width_um.value,null);
  const fdtd=cells('aplanatic_fdtd_normal_'+wave);
  assert.equal(fdtd.diameter_um.value,20.4);
  assert.equal(fdtd.efficiency_at_lambda_pct,undefined);
  assert.equal(fdtd.simulated_focusing_efficiency_pct.value,modelEfficiency);
 }
 const discrepancy = cells('nonaplanatic_fdtd_finite_490');
 assert.equal(discrepancy.simulated_relative_spherical_aberration_pct.value,44.56);
 assert.equal(discrepancy.simulated_axial_fwhm_um.value,13.77);
 assert.match(discrepancy.simulated_relative_spherical_aberration_pct.note,/不一致/);
 assert.equal(axisPoints(li,'wavelength_nm','fwhm_x_um').length,8);
 assert.equal(axisPoints(li,'wavelength_nm','simulated_psf_fwhm_x_um').length,6);
 assert.equal(axisPoints(li,'wavelength_nm','resolved_test_line_width_um').length,3);
 assert.ok(li.every(row=>hasVisibleLight(domain,row)));
});

test('Feng 2022 links the group photograph and RGB image to the published geometry without creating speculative dots',()=>{
 assert.equal(validateDevices(data,catalog),true);
 assert.equal(feng.length,1);
 assert.equal(groupRows(feng)[0].paper,'device-feng_doublet_2022');
 const [row] = feng;
 assert.ok(hasVisibleLight(domain,row));
 assert.equal(row.values.diameter_um.value,1000);
 assert.equal(row.values.na.value,.8);
 assert.equal(row.values.na.basis,'reported_configuration');
 assert.equal(row.values.na.na_definition,'metalens_design');
 assert.match(row.values.diameter_um.location,/abstractText/);
 assert.equal(row.values.material.source,'device-feng_doublet_sysu_2022');
 assert.equal(row.values.chromatic.source,'device-feng_doublet_sysu_figure_2022');
 assert.equal(row.values.chromatic.basis,'measured');
 assert.match(row.values.chromatic.note,/200μm.*10μm.*比例尺/);
 for (const key of ['design_focal_um','measured_focal_um','wavelength_nm','fwhm_x_um','strehl','efficiency_at_lambda_pct']) {
  assert.equal(row.values[key].value,null);
 }
 assert.equal(row.values.mtf_curve.data_availability.status,'primary_full_text_pending');
 assert.equal(axisPoints(feng,'diameter_um','na').length,1);
 assert.equal(axisPoints(feng,'wavelength_nm','measured_focal_um').length,0);
});
