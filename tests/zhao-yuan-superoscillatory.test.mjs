import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { axisPoints, createWorkspace, filteredRows, groupRows } from '../web/workspace-data.js';
import { load } from '../scripts/catalog.mjs';

const data = JSON.parse(fs.readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), data);
const lenses = atlas.domains.find(domain => domain.id === 'metalens');

test('Zhao keeps the tested QCL wavelength separate from the design band and directional curve-only widths', () => {
  const rows = lenses.rows.filter(row => row.study_id === 'zhao2020amp');
  assert.equal(groupRows(rows).length, 1);
  assert.equal(rows.length, 2);
  const summary = rows.find(row => row.id.endsWith('_summary')).values;
  const measured = rows.find(row => row.id.endsWith('_qcl254')).values;
  assert.deepEqual(summary.chromatic.tested_frequency_range_thz, [2.4, 2.6]);
  assert.equal(summary.lambda_min_nm.basis, 'model');
  assert.equal(summary.lambda_max_nm.basis, 'model');
  assert.equal(measured.frequency_thz.value, 2.54);
  assert.equal(measured.wavelength_nm.value, 118110);
  assert.equal(measured.measured_focal_um.value, null);
  assert.deepEqual([measured.fwhm_x_um.direction, measured.fwhm_y_um.direction], ['x', 'y']);
  assert.equal(measured.fwhm_x_um.value, null);
  assert.equal(measured.fwhm_y_um.value, null);
  assert.ok(!filteredRows(lenses, { visible: true, models: null }).some(row => row.study_id === 'zhao2020amp'));
});

test('Yuan preserves three single-color values and the simultaneous RGB evidence at their shared measured plane', () => {
  const rows = filteredRows(lenses, { visible: true, models: null }).filter(row => row.study_id === 'yuan2017rgbsol');
  assert.equal(rows.length, 5);
  assert.equal(groupRows(rows).length, 1);
  assert.deepEqual(axisPoints(rows, 'wavelength_nm', 'efficiency_at_lambda_pct').map(point => [point.x, point.y]),
    [[405, 1.54], [532, 1.18], [633, 1.35]]);
  const measured = rows.filter(row => row.values.wavelength_nm);
  assert.deepEqual(measured.map(row => row.values.fwhm_um.value), [0.219, 0.237, 0.289]);
  assert.deepEqual(measured.map(row => row.values.fwhm_um.reported_error.value), [0.012, 0.021, 0.006]);
  for (const { values } of measured) {
    assert.equal(values.psf_protocol.evaluation_plane_um, 10);
    assert.equal(values.psf_protocol.collection_objective_na, 0.95);
    assert.equal(values.na.value, 0.894);
    assert.equal(values.na.basis, 'model');
    assert.equal(values.measured_focal_um.value, null);
    assert.equal(values.efficiency_protocol.denominator, 'incident_energy');
    assert.equal(values.efficiency_protocol.integration_radius_um, null);
  }
  const simultaneous = rows.find(row => row.id.endsWith('_simultaneous')).values;
  assert.deepEqual(simultaneous.chromatic.sample_wavelengths_nm, [405, 532, 633]);
  assert.equal(simultaneous.fwhm_um, undefined);
});
