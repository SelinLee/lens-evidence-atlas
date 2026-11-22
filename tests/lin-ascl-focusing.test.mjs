import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { axisPoints, createWorkspace, filteredRows, groupRows } from '../web/workspace-data.js';
import { load } from '../scripts/catalog.mjs';

const devices = JSON.parse(fs.readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), devices);
const domain = atlas.domains.find(item => item.id === 'metalens');
const rows = filteredRows(domain, { visible: true, models: null }).filter(row => row.study_id === 'lin2025ascl');

test('Lin ASCL locates the seven measured widths and leaves the measured axis peak and efficiency points unresolved', () => {
  assert.equal(rows.length, 9);
  assert.equal(groupRows(rows).length, 1);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 2);
  const spectralRows = rows.filter(row => row.values.wavelength_nm);
  assert.deepEqual(axisPoints(rows, 'wavelength_nm', 'fwhm_um').map(point => [point.x, point.y]),
    [[400, 3.036], [450, 2.754], [500, 2.420], [550, 2.607], [600, 2.814], [650, 3.179], [700, 3.143]]);
  assert.deepEqual(spectralRows.map(row => row.values.fwhm_um.original_value),
    [0.759, 0.612, 0.484, 0.474, 0.469, 0.489, 0.449]);
  for (const { values } of spectralRows) {
    assert.equal(values.na.value, 0.1);
    assert.equal(values.psf_protocol.collection_objective_na, 0.45);
    assert.equal(values.psf_protocol.axial_scan_step_um, 1);
    assert.equal(values.fwhm_um.evaluation_plane_um, null);
    assert.equal(values.measured_focal_um.value, null);
  }
  assert.deepEqual(axisPoints(rows, 'wavelength_nm', 'efficiency_at_lambda_pct'), []);
  const { values } = rows.find(row => row.id.endsWith('_summary'));
  assert.match(values.focus_error_pct.display, /<1%/);
  assert.equal(values.focus_error_pct.value, null);
  assert.equal(values.focus_variation_um.value, null);
  assert.deepEqual(values.efficiency_protocol.reported_joint_range_pct, [1, 5]);
  assert.equal(values.efficiency_protocol.denominator, null);
});
