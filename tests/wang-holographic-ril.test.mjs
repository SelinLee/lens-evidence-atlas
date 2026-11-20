import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { axisPoints, createWorkspace, filteredRows, groupRows } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), data);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'wang2024holographic');
const sample = suffix => rows.find(row => row.id === 'wang2024holographic_' + suffix).values;
const wavelengths = [470, 510, 550, 590, 632, 660, 690];

test('Wang groups the measured RIL, Fresnel control, imaging path and array in one visible research paper', () => {
  const [group] = groupRows(rows);
  assert.equal(groupRows(rows).length, 1);
  assert.equal(group.paper, 'device-wang_holographic_2024');
  assert.equal(rows.length, 11);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 4);
  for (const source of ['device-wang_holographic_ustc_2024', 'device-wang_holographic_si_2024']) {
    assert.equal(atlas.sources.get(source).publication_source, group.paper);
  }
  assert.equal(filteredRows(lens, { query: 'Wang 2024', visible: true, models: null }).filter(row => rows.includes(row)).length, 11);
  assert.equal(sample('ril_summary').na.calculation_origin, 'atlas');
  assert.equal(sample('ril_summary').design_focal_um.value, 60);
  assert.equal(sample('fresnel_summary').na.value, null);
  assert.equal(sample('ril_imaging').resolved_test_line_width_um.value, 0.92);
  assert.equal(sample('ril_array').diameter_um.value, null);
});

test('Wang preserves the seven reported efficiency values, numerator and power reference', () => {
  const efficiencyPoints = axisPoints(rows, 'efficiency_lambda_nm', 'efficiency_at_lambda_pct');
  assert.deepEqual(efficiencyPoints.map(point => [point.x, point.y]), [
    [470, 54.7], [510, 46.9], [550, 52.9], [590, 63.7], [632, 52.6], [660, 50], [690, 48]
  ]);
  for (const {row} of efficiencyPoints) {
    const protocol = row.values.efficiency_protocol;
    assert.equal(protocol.aperture_radius_fwhm_multiple, 1.5);
    assert.equal(protocol.reference_plane, '样片面 z=0');
    assert.equal(protocol.denominator, 'incident_through_aperture');
  }
  const summary = sample('ril_summary').efficiency_band_mean_pct;
  assert.equal(summary.value, null);
  assert.equal(summary.reported_approximate_pct, 55);
  assert.equal(summary.atlas_equal_weight_mean_pct, 52.69);
});

test('Wang retains relative error summaries and keeps common focus and curve-only points outside measured axes', () => {
  const ril = sample('ril_summary');
  const control = sample('fresnel_summary');
  assert.deepEqual([ril.focus_error_pct.value, control.focus_error_pct.value], [5.26, 15]);
  assert.deepEqual(ril.focus_error_pct.sample_wavelengths_nm, wavelengths);
  assert.equal(ril.focus_error_pct.reference_focal_um, null);
  assert.equal(ril.psf_protocol.scan_step_um, 1);
  assert.equal(ril.psf_protocol.reported_common_focal_region_um, 57);
  assert.equal(ril.mtf_curve.data_availability.raw_psf, null);
  for (const axis of ['measured_focal_um', 'fwhm_um', 'signed_normalized_focal_error_pct']) {
    assert.deepEqual(axisPoints(rows, 'wavelength_nm', axis), [], axis);
  }
});
