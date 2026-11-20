import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {axisPoints, createWorkspace, groupRows, hasVisibleLight} from '../web/workspace-data.js';

const raw = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const workspace = createWorkspace(load(), raw);
const lens = workspace.domains.find(domain => domain.id === 'metalens');
const points = (rows, x, y) => axisPoints(rows, x, y).map(point => [point.x, point.y]);

test('Ou keeps the two achromatic voltage states and same-paper dispersive controls under one paper', () => {
  const rows = lens.rows.filter(row => row.study_id === 'ou2022tpam');
  const states = rows.filter(row => row.id.endsWith('v_summary'));
  assert.equal(groupRows(rows).length, 1);
  assert.equal(rows.length, 22);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 6);
  assert.ok(rows.every(row => hasVisibleLight(lens, row)));
  assert.deepEqual(points(states, 'design_focal_um', 'na'), [[50, .371], [100, .196]]);
  for (const specimen of ['tpam_0v', 'tpam_5v']) {
    const members = rows.filter(row => row.specimen_id === specimen && row.values.wavelength_nm);
    assert.deepEqual(members.map(row => row.values.wavelength_nm.value), [450, 500, 532, 550, 635, 650]);
    assert.ok(members.every(row => row.values.efficiency_protocol.denominator === 'total_intensity_at_focal_plane'));
    assert.ok(members.every(row => row.values.efficiency_protocol.integration_geometry === null));
  }
  const opposites = rows.filter(row => row.specimen_id.startsWith('dispersive_'));
  assert.deepEqual(opposites.map(row => row.values.design_focal_um.value), [60, 80, 100, 100, 80, 60]);
  assert.ok(opposites.every(row => row.values.design_focal_um.basis === 'model'));
  assert.equal(points(rows, 'wavelength_nm', 'measured_focal_um').length, 0);
  assert.equal(workspace.sources.get('device-ou_tpam_author_2022').publication_source, groupRows(rows)[0].paper);
});

test('Wang binds measured spectral means and edge widths to the correct voltage state', () => {
  const rows = lens.rows.filter(row => row.study_id === 'wang2025lcvarifocal');
  const summaries = rows.filter(row => row.id.endsWith('_summary'));
  const widths = rows.filter(row => row.values.wavelength_nm);
  assert.equal(groupRows(rows).length, 1);
  assert.equal(rows.length, 8);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 4);
  assert.ok(rows.every(row => !hasVisibleLight(lens, row)));
  assert.deepEqual(points(summaries, 'measured_focal_band_mean_um', 'efficiency_band_mean_pct'),
    [[10200, 23.9], [13760, 26.1]]);
  assert.ok(summaries.every(row => row.values.efficiency_protocol.denominator === 'incident_intensity_as_reported'));
  assert.ok(summaries.every(row => row.values.efficiency_protocol.integration_diameter_fwhm === 2));
  assert.ok(summaries.every(row => !row.values.measured_focal_band_mean_um.sample_wavelengths_complete));
  assert.deepEqual(summaries.map(row => row.values.fwhm_um.original_relative_fwhm),
    [[2.16, 1.98, 2.02, 2.11, 2.34, 2.49, 2.45], [2.73, 3.72, 3.63, 2.82, 2.73, 2.7, 2.44]]);
  assert.deepEqual(widths.map(row => row.values.frequency_thz.value), [1, 1.6, 1, 1.6]);
  for (const {values} of widths) {
    assert.equal(values.fwhm_um.value, Math.round(values.fwhm_um.original_value * 299.792458 / values.frequency_thz.value));
    assert.equal(values.measured_focal_um.value, null);
  }
  assert.equal(points(rows, 'wavelength_nm', 'measured_focal_um').length, 0);
  assert.equal(workspace.sources.get('device-wang_lc_si_listing_2025').publication_source, groupRows(rows)[0].paper);
});
