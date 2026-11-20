import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { validateDevices } from '../scripts/devices.mjs';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const rows = data.domains.metalens.rows.filter(row => row.study_id === 'kang2026');

test('Kang retains per-device axial focus, reported percentages, and checked spectral peak-to-peak results', () => {
  const specimens = [
    ['kang_sinx', 626, 8, [30, -42, 30, -34, -2], 72, 6.7],
    ['kang_zro2', 1400, 30, [-80, -300, -300, -20, 40, 130, -20, 10, -50, -20], 430, 6.9],
  ];
  for (const [id, design, step, offsets, span, percent] of specimens) {
    const summary = rows.find(row => row.id === id + '_residual_summary').values;
    const measured = rows.filter(row => row.specimen_id === id && Number.isFinite(row.values.measured_focal_um?.value));
    assert.equal(summary.wavelength_nm.value, null);
    assert.equal(summary.focus_variation_um.value, span);
    assert.equal(summary.focus_variation_um.calculation_origin, 'atlas');
    assert.deepEqual(summary.focus_variation_um.measurement_record_ids, measured.map(row => row.id));
    assert.equal(summary.focus_variation_pct.value, percent);
    assert.equal(summary.focus_variation_pct.reference_focal_um, design);
    assert.deepEqual(measured.map(row => row.values.axial_focus_offset_um.value), offsets);
    for (const { values: v } of measured) {
      assert.equal(v.axial_focus_offset_um.reference_plane_um, design);
      assert.equal(v.axial_focus_offset_um.reference_wavelength_nm, null);
      assert.equal(v.psf_protocol.evaluation_plane_um, v.measured_focal_um.value);
      assert.equal(v.psf_protocol.axial_step_um, step);
    }
  }
  const control = rows.find(row => row.specimen_id === 'kang_sinx_uncorrected').values;
  assert.equal(control.wavelength_nm.value, 320);
  assert.equal(control.chromatic.nominal_design_wavelength_nm, 385);
  assert.equal(control.measured_focal_um.value, null);
  assert.equal(control.axial_focus_offset_um, undefined);
});

test('Kang modeled widths and curve-only evidence preserve the authority and unavailable conditions', () => {
  const si = rows.filter(row => row.specimen_id === 'kang_sinx' && row.values.simulated_fwhm_um);
  const zr = rows.filter(row => row.specimen_id === 'kang_zro2' && row.values.simulated_fwhm_um);
  assert.deepEqual(si.map(row => row.values.simulated_fwhm_um.value), [2.7269, 3.3295, 3.5653, 3.7483, 3.8913]);
  assert.deepEqual(zr.map(row => row.values.simulated_fwhm_um.value), [6.5, 7.1, 7.5, 8.1, 8.6, 9.1, 9.8, 10.3, 10.8, 11.4]);
  for (const { values: v } of [...si, ...zr]) {
    assert.equal(v.fwhm_um.basis, 'measured');
    assert.equal(v.simulated_fwhm_um.basis, 'model');
    assert.equal(v.simulated_fwhm_um.direction, 'unspecified');
    assert.equal(v.simulated_fwhm_um.evaluation_plane_um, null);
    assert.equal(v.efficiency_at_lambda_pct, undefined);
  }
  for (const { values: v } of si) {
    assert.equal(v.efficiency_protocol.denominator, 'incident_power_on_metalens');
    assert.equal(v.efficiency_protocol.radius_um, null);
    assert.equal(v.mtf_curve.frequency_unit, null);
    assert.equal(v.mtf_curve.data_availability.raw_psf, null);
  }
  assert.ok(zr.every(row => row.values.efficiency_protocol === undefined
    && row.values.mtf_curve.data_availability.status === 'no_mtf_in_checked_material'));
});

test('a spectral peak-to-peak result rejects a wrong value or a different specimen', () => {
  const edited = structuredClone(data);
  const metric = edited.domains.metalens.rows.find(row => row.id === 'kang_sinx_residual_summary').values.focus_variation_um;
  metric.value = 42;
  assert.throws(() => validateDevices(edited), /focal variation context/);
  metric.value = 72;
  metric.measurement_record_ids[1] = 'kang_zro2_375';
  assert.throws(() => validateDevices(edited), /focal variation context/);
});
