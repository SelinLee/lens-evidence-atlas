import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { axisPoints, filteredRows } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const domain = data.domains.metalens;
const rows = domain.rows.filter(row => row.study_id === 'zhou2018nir');
const measured = rows.filter(row => row.values.wavelength_nm.value !== null);

test('Zhou separates measured doublet results from design focal distance, secondary focus, and chart imaging', () => {
  assert.equal(rows.length, 4);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 2);
  const [summary, short, long, chart] = rows.map(row => row.values);
  assert.deepEqual(summary.wavelength_nm.sample_wavelengths_nm, [1180, 1680]);
  assert.equal(summary.design_focal_um.value, 540);
  assert.equal(summary.focus_variation_um.value, null);
  assert.equal(short.psf_protocol.secondary_focus_position_um, 400);
  assert.equal(long.psf_protocol.secondary_focus_position_um, undefined);
  assert.equal(chart.chromatic.object_distance_um, 540);
  assert.equal(axisPoints(rows, 'wavelength_nm', 'measured_focal_um').length, 0);
  assert.equal(summary.mtf_curve.raw_psf, null);
  assert.ok(rows.every(row => row.values.lambda_min_nm === undefined && row.values.lambda_max_nm === undefined));
  const visible = filteredRows(domain, { query: 'Zhou 2018', visible: true, models: null });
  assert.equal(visible.length, 0);
});

test('Zhou keeps the two measured x widths and iris power ratios attached to their wavelengths', () => {
  assert.deepEqual(measured.map(({values: v}) => [
    v.wavelength_nm.value, v.fwhm_x_um.value, v.efficiency_at_lambda_pct.value,
  ]), [[1180, 1.74, 38], [1680, 2.57, 52]]);
  for (const {values: v} of measured) {
    assert.equal(v.fwhm_x_um.basis, 'measured');
    assert.equal(v.psf_protocol.axial_step_um, 1.13);
    assert.equal(v.psf_protocol.axial_slices, 267);
    assert.equal(v.efficiency_protocol.aperture_diameter_fwhm_multiple, 8);
    assert.equal(v.efficiency_protocol.denominator, v.efficiency_at_lambda_pct.denominator);
    assert.equal(v.efficiency_at_lambda_pct.basis, 'derived_from_measurement');
  }
  const primary = data.sources.find(source => source.id === 'zhou_nir_doublet_2018');
  const manuscript = data.sources.find(source => source.id === 'zhou_nir_osti_2018');
  assert.equal(primary.doi, '10.1021/acs.nanolett.8b03017');
  assert.equal(manuscript.publication_source, primary.id);
});
