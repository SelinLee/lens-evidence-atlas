import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {axisPoints, createWorkspace, groupRows, hasVisibleLight} from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), data);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'sawant2021hybrid');
const cells = id => rows.find(row => row.id === 'sawant2021hybrid_' + id).values;

test('Sawant LCAM and its bare reference retain the same scan wavelengths without synthetic focus positions', () => {
  assert.equal(rows.length, 33);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 3);
  assert.deepEqual(groupRows(rows).map(group => group.paper), ['device-sawant_hybrid_pdf_2021']);
  assert.equal(rows.filter(row => hasVisibleLight(lens, row)).length, 31);
  const wavelengths = [550, 575, 600, 625, 650, 675, 700, 725, 750, 775, 800];
  for (const specimen of ['lcam', 'bare']) {
    const scans = rows.filter(row => row.id.includes('_' + specimen + '_z_'));
    assert.deepEqual(scans.map(row => row.values.wavelength_nm.value), wavelengths);
    assert.ok(scans.every(row => row.values.measured_focal_um.value === null));
  }
  const lcam = cells('lcam_summary');
  assert.equal(lcam.diameter_um.value, 10000);
  assert.equal(lcam.na.value, 0.1);
  assert.equal(lcam.design_focal_um.value, null);
  assert.equal(cells('bare_summary').design_focal_um.value, 50000);
  assert.deepEqual(lcam.chromatic.sample_wavelengths_nm, [600, 800]);
  assert.deepEqual(lcam.chromatic.bound, {operator: 'gte', value: 80, unit: '%'});
  assert.equal(axisPoints(rows, 'wavelength_nm', 'measured_focal_um').length, 0);
});

test('Sawant MTF and 650 nm efficiency belong to the spherical-aberration experiment', () => {
  const lcam = cells('lcam_summary');
  const lsam = cells('lsam_spherical_650');
  assert.equal(lcam.efficiency_band_mean_pct.value, null);
  assert.equal(lcam.efficiency_band_mean_pct.reported_approximate_value_pct, 8.5);
  assert.equal(lcam.mtf_curve.basis, 'unresolved');
  assert.equal(lsam.mtf_curve.basis, 'derived_from_measurement');
  assert.equal(lsam.mtf_curve.data_availability.status, 'supplement_figure_cited_not_retrieved');
  assert.equal(lsam.mtf_curve.frequency_unit, null);
  assert.equal(lsam.mtf_curve.data_availability.raw_psf, null);
  assert.equal(cells('bare_spherical_650').mtf_curve.value, lsam.mtf_curve.value);
  assert.equal(lsam.efficiency_at_lambda_pct.value, 20);
  assert.equal(lsam.efficiency_protocol.denominator, null);
  assert.equal(cells('lsam_wavefront_617').psf_protocol.pupil_diameter_um, 7500);
  assert.equal(axisPoints(rows, 'efficiency_lambda_nm', 'efficiency_at_lambda_pct').length, 1);
  assert.equal(atlas.sources.get('device-sawant_hybrid_si_2021').publication_source, 'device-sawant_hybrid_pdf_2021');
});
