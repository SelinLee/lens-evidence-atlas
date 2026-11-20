import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { axisPoints, createWorkspace, filteredRows, groupRows } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), data);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const study = 'jiang2026lapiam';
const rows = lens.rows.filter(row => row.study_id === study);
const byId = suffix => rows.find(row => row.id === `${study}_${suffix}`).values;
const xy = (x, y) => axisPoints(rows, x, y).map(point => [point.x, point.y]);
const frequencies = [.8,.85,.9,.95,1,1.05,1.1,1.15,1.2];

test('Jiang keeps two polarization summaries on one fabricated lens and no invented measured peaks', () => {
  const groups = groupRows(rows);
  assert.equal(groups.length, 1);
  assert.equal(rows.length, 46);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 2);
  assert.equal(atlas.sources.get('device-jiang_lapiam_si_2026').publication_source, groups[0].paper);
  assert.equal(filteredRows(lens, {query:'Jiang 2026', visible:true, models:null}).length, 0);
  assert.deepEqual(xy('diameter_um','focus_variation_pct'), [[22100,2.86],[22100,2.84]]);
  assert.deepEqual(xy('diameter_um','measured_focal_band_mean_um'), [[22100,81700],[22100,81700]]);
  assert.deepEqual(xy('diameter_um','efficiency_band_mean_pct'), [[22100,46.97],[22100,46.14]]);
  assert.deepEqual(xy('frequency_thz','measured_focal_um'), []);
  assert.deepEqual(xy('frequency_thz','efficiency_at_lambda_pct'), []);
  for (const polarization of ['x','y']) {
    const summary = byId(`${polarization}_summary`);
    assert.deepEqual(summary.focus_variation_pct.sample_frequencies_thz, frequencies);
    assert.equal(summary.focus_variation_pct.ddof, 0);
    assert.equal(summary.focus_variation_pct.reference_focal_um, 81700);
    assert.equal(summary.focus_variation_um.value, null);
    assert.equal(summary.efficiency_protocol.integration_diameter_fwhm_factor, 3);
    assert.equal(summary.efficiency_protocol.denominator, 'incident_power_on_metalens');
  }
  assert.equal(byId('y_080thz').psf_protocol.transverse_section_direction, 'unresolved');
  assert.equal(byId('x_110thz').psf_protocol.secondary_focus_reported, true);
});

test('Jiang puts published simulated widths on the model axis and preserves observed target visibility', () => {
  assert.deepEqual(xy('frequency_thz','simulated_fwhm_um'),
    frequencies.map((frequency,index) => [frequency,[1130,1070,1040,1000,960,930,900,860,810][index]]));
  assert.deepEqual(xy('frequency_thz','simulated_focusing_efficiency_pct'), [[.8,46.95],[1,58.73],[.8,46.02],[1,57.57]]);
  assert.deepEqual(xy('frequency_thz','fwhm_um'), []);
  assert.equal(byId('x_model_115thz').simulated_fwhm_um.basis, 'model');
  assert.equal(byId('imaging_1800_100').psf_protocol.target_identifiable, true);
  assert.equal(byId('imaging_1800_110').psf_protocol.target_identifiable, false);
  assert.equal(byId('imaging_3000_120').psf_protocol.target_identifiable, true);
  assert.equal(byId('imaging_3000_120').psf_protocol.image_distance_um, 163400);
});
