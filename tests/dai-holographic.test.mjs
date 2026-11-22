import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { axisPoints, createWorkspace, filteredRows, groupRows } from '../web/workspace-data.js';
import { load } from '../scripts/catalog.mjs';

test('Dai retains five tested wavelengths and leaves numerical spot widths and source-unverified focal positions empty', () => {
  const devices = JSON.parse(fs.readFileSync(new URL('../data/devices.json', import.meta.url)));
  const atlas = createWorkspace(load(), devices);
  const metalens = atlas.domains.find(domain => domain.id === 'metalens');
  const rows = filteredRows(metalens, { visible: true, models: null }).filter(row => row.study_id === 'dai2021holographic');
  const wavelengths = [520, 555, 632.8, 660, 690];

  assert.equal(rows.length, 6);
  assert.equal(groupRows(rows).length, 1);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 1);
  assert.deepEqual(axisPoints(rows, 'wavelength_nm', 'na').map(point => [point.x, point.y]),
    wavelengths.map(wavelength => [wavelength, 0.95]));
  assert.deepEqual(axisPoints(rows, 'wavelength_nm', 'measured_focal_um'), []);
  assert.deepEqual(axisPoints(rows, 'wavelength_nm', 'fwhm_um'), []);

  const { values } = rows.find(row => row.id.endsWith('_summary'));
  assert.equal(values.fwhm_um.value, null);
  assert.match(values.fwhm_um.display, /0\.40–0\.47λ/);
  assert.equal(values.focus_variation_um.value, null);
  assert.equal(values.lambda_min_nm, undefined);
  assert.equal(values.lambda_max_nm, undefined);
  assert.deepEqual(values.chromatic.separately_reported_simulation_bands_nm, [[510, 590], [620, 700]]);
});
