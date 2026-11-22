import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { validateDevices } from '../scripts/devices.mjs';
import { axisPoints, createWorkspace, groupRows, hasVisibleLight } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const catalog = load();
const atlas = createWorkspace(catalog, data);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const balli = lens.rows.filter(row => row.study_id === 'balli2020');
const air100 = balli.filter(row => row.specimen_id === 'air100');
const metric = 'signed_normalized_focal_error_pct';
const series = [
  [1000, 3.09, 15.12, 4.79], [1100, 3.18, 12.9, 2.89], [1200, 3.15, 18.25, .9],
  [1300, 3.03, 17.49, -.29], [1400, 3.27, 19.26, 0], [1500, 3.51, 20, -1.15],
  [1600, 3.63, 20.54, -3.49], [1700, 4, 19.18, -4.14], [1800, 4.48, 21.55, -4.77],
];

test('Balli groups the source workbook and new specimen with the original paper', () => {
  assert.equal(groupRows(balli).length, 1);
  assert.equal(air100.length, 10);
  assert.equal(new Set(balli.map(row => row.specimen_id)).size, 6);
  assert.equal(atlas.sources.get('device-balli_haml_si_2020').publication_source, groupRows(balli)[0].paper);
  assert.equal(atlas.sources.get('device-balli_haml_source_2020').publication_source, groupRows(balli)[0].paper);
  assert.ok(air100.every(row => !hasVisibleLight(lens, row)));
  for (const { values } of air100) {
    assert.deepEqual([values.diameter_um.value, values.na.value, values.material.inter_element_separation_um], [100, .24, 7]);
    assert.equal(values.efficiency_protocol.integration_radius_fwhm_factor, 1.5);
    assert.equal(values.efficiency_protocol.denominator, 'total_incident_power_in_same_aperture_on_fused_silica');
    assert.equal(values.psf_protocol.focus_error_scan_step_um, .5);
    assert.equal(values.measured_focal_um?.value ?? null, null);
  }
  const summary = air100.find(row => row.id.endsWith('_summary')).values;
  assert.equal(summary.focus_error_pct.value, 4.8);
  assert.deepEqual(summary.focus_error_pct.sample_wavelengths_nm, series.map(([wave]) => wave));
  assert.equal(summary.efficiency_band_mean_pct.value, 19);
  assert.equal(summary.efficiency_band_mean_pct.sampling, 'not_reported');
  assert.equal(summary.design_focal_um.value, null);
  assert.equal(summary.mtf_curve.data_availability.raw_psf, null);
});

test('Balli retains exact worksheet provenance and negative and zero scatter readings', () => {
  const measured = air100.filter(row => Number.isFinite(row.values.wavelength_nm.value));
  assert.deepEqual(measured.map(({ values }) => [values.wavelength_nm.value, values.fwhm_um.value, values.efficiency_at_lambda_pct.value, values[metric].value]), series);
  for (const [i, { values }] of measured.entries()) {
    const col = 'DEFGHIJKL'[i];
    assert.match(values.fwhm_um.location, new RegExp('^Supplementary Figure 4-a!' + col + '6'));
    assert.match(values.efficiency_at_lambda_pct.location, new RegExp('^Supplementary Figure 4-b!' + col + '7'));
    assert.match(values[metric].location, new RegExp('^Supplementary Figure 4-c!' + col + '6'));
    assert.equal(values[metric].reference_wavelength_nm, null);
    assert.equal(values.focus_error_protocol.zero_value_wavelength_nm, 1400);
  }
  const primary = balli.filter(row => !row.id.includes('_supp_experiment_'));
  const points = axisPoints(primary, 'wavelength_nm', metric);
  assert.equal(points.length, 45);
  assert.equal(points.filter(p => p.x === 1400 && p.y === 0).length, 5);
  assert.deepEqual(axisPoints(air100, 'wavelength_nm', metric).map(p => [p.x, p.y]), series.map(([wave, , , error]) => [wave, error]));
});

test('signed focus error requires the experimental spectrum, author calculation and explicit reference status', () => {
  for (const invalid of [
    v => v[metric].calculation_origin = 'atlas',
    v => v[metric].reference_wavelength_nm = 1400,
    v => v.wavelength_nm.basis = 'model',
    v => delete v.focus_error_protocol,
  ]) {
    const bad = structuredClone(data);
    const sample = bad.domains.metalens.rows.find(row => row.id === 'balli2020_air100_1400');
    invalid(sample.values);
    assert.throws(() => validateDevices(bad, catalog), /signed normalized focal error context/);
  }
});

test('Balli distinguishes the main-text maxima, workbook spans and supplementary experiments', () => {
  const summaries = balli.filter(row => row.id.endsWith('_band_focus_summary'));
  assert.deepEqual(summaries.map(row => [row.specimen_id, row.values.focus_variation_pct.value,
    row.values.focus_variation_protocol.source_table_percent_point_span.value]), [
    ['merged20', 8.6, 10.2], ['merged40', 8.2, 8.27],
    ['merged80', 5.4, 5.43], ['air40', 8.1, 8.19],
  ]);
  for (const { values } of summaries) {
    assert.equal(values.focus_variation_pct.calculation_origin, 'authors');
    assert.equal(values.focus_variation_protocol.source_table_percent_point_span.calculation_origin, 'atlas');
    assert.equal(values.focus_variation_protocol.normalization_denominator, null);
    assert.equal(values.measured_focal_um, undefined);
  }
  assert.equal(summaries[0].values.psf_protocol.figure_reported_focal_plane_um, 34.5);
  const supplementary = balli.filter(row => row.id.includes('_supp_experiment_'));
  assert.deepEqual(supplementary.map(({ values }) =>
    [values.wavelength_nm.value, values.fwhm_um.value, values.efficiency_at_lambda_pct.value, values[metric].value]), [
    [1000, 2.21, 38.71, 2.85], [1100, 2.54, 52.77, 2.85], [1200, 2.92, 42.03, 2.57],
    [1300, 3.23, 64.31, 1.99], [1400, 3.27, 71.6, 0], [1500, 3.31, 68.29, -2.28],
    [1600, 3.4, 62.61, -4.85], [1700, 3.63, 69.6, -6.01], [1800, 3.67, 78.07, -6.05],
  ]);
  assert.ok(supplementary.every(row => row.specimen_id === 'merged20' && !hasVisibleLight(lens, row)));
  assert.match(supplementary[0].values[metric].location, /Supplementary Figure 2-d!D24/);
  assert.match(supplementary.at(-1).values.efficiency_at_lambda_pct.location, /Supplementary Figure 2-c!L7/);
  assert.equal(axisPoints(balli, 'wavelength_nm', 'measured_focal_um').length, 0);
});
