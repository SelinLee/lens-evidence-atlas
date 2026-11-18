import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {validateDevices} from '../scripts/devices.mjs';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const rows = data.domains.metalens.rows.filter(row => row.study_id === 'hasegawa2026');
const configuration = id => rows.filter(row => row.specimen_id === id).map(row => row.values);

test('Hasegawa axial findings keep two conjugates and the unprinted peaks distinct', () => {
 const laser = configuration('laser');
 const halogen = configuration('halogen');
 const camera = configuration('camera');
 assert.deepEqual(laser.map(v => v.wavelength_nm.value), [450, 532, 633]);
 assert.deepEqual(halogen.map(v => v.wavelength_nm.value), [400, 450, 490, 532, 580, 633, 680]);
 assert.deepEqual(laser.map(v => v.measured_focal_um.value), [5070, 5030, 4980]);
 assert.deepEqual(halogen.map(v => v.measured_focal_um.value), [null, 5080, null, 5100, null, 5110, null]);
 assert.deepEqual(laser.map(v => v.axial_focus_offset_um.value), [20, -20, -70]);
 assert.deepEqual(halogen.map(v => v.axial_focus_offset_um?.value ?? null), [null, 30, null, 50, null, 60, null]);
 assert.ok(halogen.every(v => v.psf_protocol.object_distance_m === 0.5 && !v.mtf_curve));
 assert.ok(rows.every(({values: v}) => v.diameter_um.value === 1000 && v.na.value === 0.1 && !v.lambda_min_nm && !v.lambda_max_nm));
 assert.equal(camera.length, 5);
 assert.ok(camera.every(v => !v.wavelength_nm && !v.psf_protocol && !v.mtf_curve));
});

test('Hasegawa power ratios use distinct denominators and the x-direction MTF remains a curve', () => {
 const laser = configuration('laser');
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
