import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {createWorkspace, axisPoints, groupRows, hasVisibleLight} from '../web/workspace-data.js';

const raw = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const workspace = createWorkspace(load(), raw);
const lenses = workspace.domains.find(domain => domain.id === 'metalens');
const rows = lenses.rows.filter(row => row.study_id === 'chen2025grinthz');
const singleLens = rows.filter(row => row.specimen_id === 'grin_single');

test('Chen records the fixed reference plane separately from eight measured-frequency peaks', () => {
  assert.equal(groupRows(rows).length, 1);
  assert.equal(rows.length, 22);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 3);
  const [summary, ...onAndOffAxis] = singleLens;
  assert.deepEqual([summary.values.diameter_um.value, summary.values.design_focal_um.value, summary.values.na.value],
    [6000, 4500, .555]);
  const normal = onAndOffAxis.filter(row => row.values.aoi_deg?.value === 0);
  assert.deepEqual(normal.map(row => row.values.frequency_thz.value), [.2, .3, .4, .5, .6, .7, .8, .9]);
  assert.ok(normal.every(row => row.values.psf_protocol.reference_plane_um === 6000 && row.values.measured_focal_um.value === null));
  assert.ok(normal.every(row => row.values.efficiency_at_lambda_pct.value === null));
  assert.equal(normal.filter(row => /次序冲突/.test(row.values.efficiency_at_lambda_pct.display)).length, 2);
  assert.equal(axisPoints(rows, 'wavelength_nm', 'measured_focal_um').length, 0);
  assert.equal(rows.filter(row => hasVisibleLight(lenses, row)).length, 0);
  const paper = groupRows(rows)[0].paper;
  assert.equal(workspace.sources.get('device-chen_grinthz_si_2025').publication_source, paper);
  assert.equal(workspace.sources.get('device-chen_grinthz_review_2025').publication_source, paper);
});

test('Fig. S12 width direction and normalized values survive the physical-unit conversion', () => {
  const offaxis = singleLens.filter(row => row.values.fwhm_um?.direction === 'u');
  assert.deepEqual(offaxis.map(row => row.values.fwhm_um.original_value),
    [.799, .796, .715, .745, .955, .935, .994, 1.002, .637]);
  for (const {values} of offaxis) {
    const width = values.fwhm_um;
    assert.equal(width.unit_conversion_origin, 'atlas');
    assert.equal(width.value, Math.round(width.original_value * 299.792458 / values.frequency_thz.value));
    assert.equal(values.psf_protocol.direction, 'u');
    assert.equal(values.fwhm_x_um, undefined);
    assert.equal(values.fwhm_y_um, undefined);
  }
  assert.equal(axisPoints(offaxis, 'aoi_deg', 'fwhm_um').length, 9);
  assert.deepEqual(rows.filter(row => row.values.resolved_test_line_width_um).map(row => row.specimen_id), ['confocal_normal']);
});
