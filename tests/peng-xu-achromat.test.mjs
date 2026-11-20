import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {axisPoints, createWorkspace, groupRows, hasVisibleLight} from '../web/workspace-data.js';

const deviceData = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), deviceData);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const xr = atlas.domains.find(domain => domain.id === 'xr');
const points = (rows, x, y) => axisPoints(rows, x, y).map(point => [point.x, point.y]);

test('Peng retains design geometry without assigning 445–620 nm FWHM to a measurement wavelength', () => {
  const rows = lens.rows.filter(row => row.study_id === 'peng2025amphibious');
  assert.equal(rows.length, 1);
  assert.equal(hasVisibleLight(lens, rows[0]), true);
  const v = rows[0].values;
  assert.deepEqual(points(rows, 'diameter_um', 'design_focal_um'), [[5000, 3000]]);
  assert.deepEqual(points(rows, 'lambda_min_nm', 'lambda_max_nm'), [[450, 850]]);
  assert.ok([v.lambda_min_nm, v.lambda_max_nm].every(edge =>
    edge.basis === 'model' && edge.measured_endpoints_available === false));
  assert.equal(v.measured_focal_um.value, null);
  assert.equal(v.fwhm_um.value, null);
  assert.deepEqual(v.fwhm_um.original_range, {min: 445, max: 620, unit: 'nm'});
  assert.equal(points(rows, 'design_focal_um', 'fwhm_um').length, 0);

  const system = xr.rows.find(row => row.id === 'peng2025amphibious_mr_ned');
  assert.equal(system.study_id, rows[0].study_id);
  assert.notEqual(system.specimen_id, rows[0].specimen_id);
  assert.equal(atlas.sources.get(system.values.optics.source).publication_source,
    groupRows(rows)[0].paper);
  assert.ok(['hfov', 'latency', 'mtf'].every(metric => system.values[metric] === undefined));
});

test('Xu keeps the fixed 6.5 mm observation plane and reported mean efficiency on the corrected lens', () => {
  const rows = lens.rows.filter(row => row.study_id === 'xu2023sandwich');
  assert.equal(groupRows(rows).length, 1);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 2);
  assert.ok(rows.every(row => !hasVisibleLight(lens, row)));
  const corrected = rows.find(row => row.specimen_id === 'corrected').values;
  const control = rows.find(row => row.specimen_id === 'chromatic_control').values;
  assert.deepEqual(points(rows, 'lambda_min_nm', 'lambda_max_nm'), [[272539, 599585]]);
  assert.deepEqual(points(rows, 'na', 'efficiency_band_mean_pct'), [[0.47, 43.1]]);
  assert.deepEqual([corrected.lambda_min_nm.original_value, corrected.lambda_max_nm.original_value], [1.1, 0.5]);
  assert.equal(corrected.psf_protocol.evaluation_plane_um, 6500);
  assert.equal(corrected.efficiency_protocol.denominator, null);
  assert.equal(control.efficiency_band_mean_pct, undefined);
  assert.ok(rows.every(row => row.values.measured_focal_um.value === null));
});
