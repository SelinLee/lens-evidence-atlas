import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {validateDevices} from '../scripts/devices.mjs';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const rows = data.domains.metalens.rows.filter(row => row.study_id === 'hasegawa2026');
const configuration = id => rows.filter(row => row.specimen_id === id).map(row => row.values);
const measurements = id => configuration(id).filter(values => Number.isFinite(values.wavelength_nm?.value));

test('Hasegawa axial findings keep two conjugates and the unprinted peaks distinct', () => {
 const laser = measurements('laser');
 const halogen = measurements('halogen');
 const camera = configuration('camera');
 assert.deepEqual(laser.map(v => v.wavelength_nm.value), [450, 532, 633]);
 assert.deepEqual(halogen.map(v => v.wavelength_nm.value), [400, 450, 490, 532, 580, 633, 680]);
 assert.deepEqual(laser.map(v => v.measured_focal_um.value), [5070, 5030, 4980]);
 assert.deepEqual(halogen.map(v => v.measured_image_distance_um.value), [null, 5080, null, 5100, null, 5110, null]);
 assert.ok(halogen.every(v => v.measured_focal_um === undefined && v.design_image_distance_um === undefined));
 assert.ok(halogen.every(v => v.measured_image_distance_um.reference_plane === v.psf_protocol.reference_plane));
 assert.ok(halogen.filter(v => v.axial_focus_offset_um).every(v => v.axial_focus_offset_um.reference_metric === 'design_focal_um' &&
   v.axial_focus_offset_um.reference_plane_um === 5050));
 assert.deepEqual(laser.map(v => v.axial_focus_offset_um.value), [20, -20, -70]);
 assert.deepEqual(halogen.map(v => v.axial_focus_offset_um?.value ?? null), [null, 30, null, 50, null, 60, null]);
 assert.ok(halogen.every(v => v.psf_protocol.object_distance_m === 0.5 && !v.mtf_curve));
 assert.ok([...laser, ...halogen, ...camera].every(v => v.diameter_um.value === 1000 && v.na.value === 0.1 && !v.lambda_min_nm && !v.lambda_max_nm));
 assert.equal(camera.length, 5);
 assert.ok(camera.every(v => !v.wavelength_nm && !v.psf_protocol && !v.mtf_curve));
});

test('Hasegawa spans bind the reported input positions to the same conjugate', () => {
 const summaries = rows.filter(row => row.id.endsWith('_rgb_span'));
 assert.deepEqual(summaries.map(r => [r.specimen_id, r.values.focus_variation_um.value]), [['laser', 90], ['halogen', 30]]);
 assert.deepEqual(summaries.map(r => r.values.focus_variation_um.input_metric), ['measured_focal_um', 'measured_image_distance_um']);
 assert.ok(summaries.every(r => r.values.wavelength_nm.value === null && r.values.focus_variation_um.calculation_origin === 'atlas'));
 const domain = data.domains.metalens;
 const check = selected => validateDevices({...data, domains: {metalens: {...domain, rows: selected}}});
 assert.equal(check(rows), true);
 const mixed = structuredClone(rows);
 const span = mixed.find(r => r.id === 'hasegawa2026_halogen_rgb_span').values.focus_variation_um;
 span.measurement_record_ids[0] = 'hasegawa2026_laser_450';
 assert.throws(() => check(mixed), /focal variation context/);
 const reference = structuredClone(rows);
 reference.find(r => r.id === 'hasegawa2026_halogen_450').values.axial_focus_offset_um.reference_metric = 'measured_image_distance_um';
 assert.throws(() => check(reference), /atlas axial offset reference\/input/);
});

test('Hasegawa power ratios use distinct denominators and the x-direction MTF remains a curve', () => {
 const laser = measurements('laser');
 assert.deepEqual(laser.map(v => v.fwhm_x_um.value), [2.75, 2.65, 3.39]);
 assert.deepEqual(laser.map(v => v.strehl.display), ['0.80', '0.97', '0.95']);
 assert.deepEqual(laser.map(v => v.optical_transmittance_pct.value), [55, 80, 82]);
 assert.deepEqual(laser.map(v => v.focusing_efficiency_transmitted_pct.value), [8, 26, 23]);
 for (const values of laser) {
  assert.equal(values.optical_transmittance_pct.denominator, 'incident_through_aperture');
  assert.equal(values.focusing_efficiency_transmitted_pct.denominator, 'transmitted_power');
  assert.equal(values.efficiency_at_lambda_pct, undefined);
  assert.equal(values.efficiency_protocol.focus_region_geometry, null);
  assert.equal(values.mtf_curve.direction, 'x');
  assert.equal(values.mtf_curve.data_availability, 'curves_only');
  assert.equal(values.mtf_curve.frequency_unit, 'cycles/mm');
 }
 const invalidRow = structuredClone(rows[0]);
 invalidRow.values.focusing_efficiency_transmitted_pct.denominator = 'incident_through_aperture';
 const {metrics} = data.domains.metalens;
 assert.throws(() => validateDevices({...data, domains: {metalens: {metrics, rows: [invalidRow]}}}), /optical power ratio context/);
});

test('Hasegawa records optimization and PSF metrics only on their original models', () => {
 const before = configuration('cylindrical1000_before');
 const after = configuration('cylindrical1000_after');
 const [small] = configuration('model30_optimized');
 assert.equal(rows.length, 25);
 assert.ok(small && small.diameter_um.value === 30 && small.diameter_um.basis === 'model');
 assert.equal(small.simulated_focal_um.value, null);
 assert.deepEqual([small.simulated_focal_um.reported_center_um, small.simulated_focal_um.reported_spread_um], [150, 6]);
 assert.equal(small.simulated_focal_um.spread_definition, null);
 assert.equal(small.wavelength_nm, undefined);
 assert.equal(small.simulated_focusing_efficiency_pct, undefined);
 const [polarizationModel] = configuration('model30_polarization');
 assert.equal(polarizationModel.simulated_focal_um, undefined);
 assert.equal(polarizationModel.simulated_focusing_efficiency_pct.value, null);
 assert.deepEqual(polarizationModel.simulated_focusing_efficiency_pct.bound, {operator:'gt', value:80});
 assert.deepEqual(before.map(v => v.simulated_phase_strehl.value), [.74, .53, .33]);
 assert.deepEqual(after.map(v => v.simulated_phase_strehl.value), [.78, .61, .54]);
 assert.deepEqual(after.map(v => v.simulated_psf_strehl.value), [.98, .97, .95]);
 assert.ok(before.every(v => !v.simulated_psf_strehl && !v.psf_protocol.dc_bias_optimized));
 assert.ok(after.every(v => v.simulated_psf_strehl.power_normalization_window_um === 50 && v.psf_protocol.dc_bias_optimized));
 for (const stage of [before, after]) {
  assert.deepEqual(stage.map(v => v.wavelength_nm.value), [450, 532, 633]);
  assert.ok(stage.every(v => v.cylindrical_aperture_width_um.value === 1000 && v.wavelength_nm.basis === 'model'));
  assert.ok(stage.every(v => !v.diameter_um && !v.strehl && !v.measured_focal_um));
 }
 const laser = measurements('laser');
 assert.deepEqual(laser.map(v => v.fwhm_x_um.theoretical_reference_fwhm_um), [2.25, 2.64, 3.05]);
 assert.ok(laser.every(v => !v.simulated_psf_strehl && !v.simulated_phase_strehl));
 const bad = structuredClone(rows.find(row => row.id === 'hasegawa2026_cyl1000_after_450'));
 bad.values.wavelength_nm.basis = 'measured';
 const {metrics} = data.domains.metalens;
 assert.throws(() => validateDevices({...data, domains:{metalens:{metrics,rows:[bad]}}}), /simulated Strehl context/);
});
