import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { axisPoints, createWorkspace, filteredRows, groupRows } from '../web/workspace-data.js';
import { load } from '../scripts/catalog.mjs';

const devices = JSON.parse(fs.readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), devices);
const lenses = atlas.domains.find(domain => domain.id === 'metalens');
const rows = lenses.rows.filter(row => row.study_id === 'shen2020lcthz');

test('Shen groups both optical states under one paper and retains fixed focal slices without inferring peak positions', () => {
  assert.equal(rows.length, 16);
  assert.equal(groupRows(rows).length, 1);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 4);
  for (const [state, plane] of [['off', 12000], ['saturated', 13000]]) {
    const spectral = rows.filter(row => row.specimen_id === state && row.values.wavelength_nm);
    assert.deepEqual(spectral.map(row => row.values.frequency_thz.value),
      [0.9, 1, 1.1, 1.2, 1.3, 1.4]);
    for (const { values } of spectral) {
      assert.equal(values.psf_protocol.evaluation_plane_um, plane);
      assert.equal(values.fwhm_um.evaluation_plane_um, plane);
      assert.equal(values.measured_focal_um.value, null);
      assert.equal(values.fwhm_um.value, null);
      assert.equal(values.efficiency_at_lambda_pct.value, null);
    }
    assert.equal(rows.find(row => row.id.endsWith('imaging_' + state)).values.psf_protocol.image_distance_um, 24000);
  }
  assert.equal(rows.find(row => row.id.endsWith('off_summary')).values.design_focal_um.value, 15000);
  assert.deepEqual(axisPoints(rows, 'diameter_um', 'efficiency_band_mean_pct').map(point => [point.x, point.y]),
    [[6480, 26.1], [6480, 33.9]]);
  assert.ok(!filteredRows(lenses, { visible: true, models: null }).some(row => row.study_id === 'shen2020lcthz'));
});
