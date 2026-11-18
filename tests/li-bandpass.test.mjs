import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {axisPoints, createWorkspace, groupRows, hasVisibleLight} from '../web/workspace-data.js';

test('Li 2021 exposes directly measured RGB spot widths while the design focus stays off measured axes', () => {
  const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
  const lens = createWorkspace(load(), data).domains.find(domain => domain.id === 'metalens');
  const rows = lens.rows.filter(row => row.study_id === 'li2021bandpass');
  assert.equal(rows.length, 8);
  assert.deepEqual([...new Set(rows.map(row => row.specimen_id))], ['filter_integrated', 'bare_silica']);
  assert.deepEqual(groupRows(rows).map(group => group.paper), ['device-li_bandpass_pdf_2021']);
  assert.ok(rows.every(row => hasVisibleLight(lens, row)));
  assert.equal(axisPoints(rows, 'wavelength_nm', 'measured_focal_um').length, 0);
  for (const [wave, width, strehl, efficiency] of [[490, 1.42, 0.78, 47], [540, 1.60, 0.91, 48], [610, 1.81, 0.89, 50]]) {
    const values = rows.find(row => row.id === 'li2021bandpass_focus_' + wave).values;
    assert.equal(values.psf_protocol.evaluation_plane_um, 735);
    assert.equal(values.wavelength_nm.illumination_bandwidth_nm, 10);
    assert.equal(values.measured_focal_um.value, null);
    assert.equal(values.fwhm_x_um.value, width);
    assert.equal(values.strehl.value, strehl);
    assert.equal(values.efficiency_at_lambda_pct.value, efficiency);
    assert.equal(values.efficiency_at_lambda_pct.experiment_denominator, null);
  }
});
