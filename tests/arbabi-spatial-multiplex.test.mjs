import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { axisPoints, filteredRows } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const domain = data.domains.metalens;
const rows = domain.rows.filter(row => row.study_id === 'arbabi2016spatial');

test('Arbabi keeps the two finite-conjugate designs and the measured higher-order focus distinct', () => {
  assert.equal(rows.length, 7);
  assert.deepEqual([...new Set(rows.map(row => row.specimen_id))], ['sector', 'interleaved']);
  const summaries = rows.filter(row => row.id.endsWith('_summary'));
  for (const {values} of summaries) {
    assert.equal(values.diameter_um.value, 300);
    assert.equal(values.design_focal_um.value, 286);
    assert.equal(values.design_image_distance_um.value, 400);
    assert.equal(values.focus_variation_um.value, null);
    assert.equal(values.mtf_curve.raw_psf, null);
  }
  const higher = rows.find(row => row.id.endsWith('_higher_order'));
  assert.equal(higher.values.measured_image_distance_um.focus_order, 'higher_order');
  assert.equal(higher.values.measured_image_distance_um.approximate, true);
  assert.equal(higher.values.chromatic.peak_intensity_ratio_to_design_order, 1.8);
  assert.equal(higher.values.efficiency_at_lambda_pct, undefined);
  assert.deepEqual(axisPoints(rows, 'wavelength_nm', 'measured_image_distance_um').map(point => [point.x, point.y]), [[915, 220]]);
  assert.equal(axisPoints(rows, 'wavelength_nm', 'measured_focal_um').length, 0);
  assert.equal(filteredRows(domain, { query: 'Arbabi 2016', visible: true, models: null })
    .some(row => row.study_id === 'arbabi2016spatial'), false);
});

test('Arbabi maps the four measured and reference widths and efficiencies to their table columns', () => {
  const spectra = rows.filter(row => row.values.efficiency_at_lambda_pct);
  assert.deepEqual(spectra.map(({values: v}) => [
    v.wavelength_nm.value, v.efficiency_at_lambda_pct.value,
    v.fwhm_um.value, v.diffraction_limited_reference_fwhm_um.value,
  ]), [[915, 37, 1.85, 1.6], [1550, 30, 3.3, 2.75], [915, 10, 1.85, 1.6], [1550, 58, 3.3, 2.75]]);
  for (const {values: v} of spectra) {
    assert.equal(v.efficiency_protocol.denominator, 'single_mode_fiber_output_power');
    assert.equal(v.efficiency_protocol.denominator, v.efficiency_at_lambda_pct.denominator);
    assert.equal(v.measured_image_distance_um.value, null);
    assert.match(v.efficiency_at_lambda_pct.location, /Table 1.*Measured/);
    assert.match(v.fwhm_um.location, /Table 2.*Measured/);
    assert.equal(v.efficiency_at_lambda_pct.reported_error.type, 'not_specified');
    assert.equal(v.diffraction_limited_reference_fwhm_um.basis, 'model');
  }
  assert.equal(spectra[0].values.efficiency_protocol.focal_aperture_diameter_um, 20);
  assert.equal(spectra[1].values.efficiency_protocol.iris_diameter_um, 2000);
  const primary = data.sources.find(source => source.id === 'arbabi_spatial_2016');
  const paper = data.sources.find(source => source.id === 'arbabi_spatial_pmc_2016');
  assert.equal(primary.doi, '10.1038/srep32803');
  assert.equal(paper.publication_source, primary.id);
});
