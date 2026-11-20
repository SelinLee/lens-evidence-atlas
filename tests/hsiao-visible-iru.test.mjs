import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { axisPoints, createWorkspace, filteredRows, groupRows } from '../web/workspace-data.js';

const devices = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), devices);
const metalenses = atlas.domains.find(domain => domain.id === 'metalens');
const rows = metalenses.rows.filter(row => row.study_id === 'hsiao2018iru');

test('Hsiao groups the original efficiency points on the same visible-light specimen', () => {
  const [paper] = groupRows(rows);
  assert.equal(groupRows(rows).length, 1);
  assert.equal(paper.paper, 'device-hsiao_iru_2018');
  assert.equal(new Set(paper.rows.map(row => row.specimen_id)).size, 1);
  assert.equal(filteredRows(metalenses, {query:'Hsiao 2018', visible:true, models:null}).length, 4);

  const plotted = axisPoints(rows, 'efficiency_lambda_nm', 'efficiency_at_lambda_pct');
  assert.deepEqual(plotted.map(point => [point.x, point.y]), [[420, 26.31], [550, 19.71], [650, 20.37]]);
  for (const {values} of rows.slice(1)) {
    assert.equal(values.na.value, 0.124);
    assert.equal(values.efficiency_at_lambda_pct.basis, 'derived_from_measurement');
    assert.equal(values.efficiency_at_lambda_pct.calculation_origin, 'authors');
    assert.match(values.efficiency_at_lambda_pct.location, /Wiley 正式摘要/);
    assert.equal(values.efficiency_protocol.denominator, null);
    assert.equal(values.efficiency_protocol.integration_radius_um, null);
    assert.equal(values.efficiency_protocol.integration_diameter_um, null);
  }
});

test('Hsiao separates the broadband claim and figure-only evidence from unverified geometry and focus values', () => {
  const summary = rows[0].values;
  assert.deepEqual([summary.lambda_min_nm.value, summary.lambda_max_nm.value], [420, 650]);
  assert.equal(summary.wavelength_nm, undefined);
  assert.equal(summary.psf_protocol.figure_lens_assignment, 'unresolved');
  for (const metric of ['diameter_um', 'design_focal_um', 'measured_focal_um', 'focus_variation_um', 'fwhm_um', 'mtf_curve', 'strehl']) {
    assert.equal(summary[metric].value, null, metric);
  }
  for (const material of ['si', 'crossref', 'openalex', 'reprint']) {
    assert.equal(atlas.sources.get(`device-hsiao_iru_${material}_2018`).publication_source, 'device-hsiao_iru_2018');
  }
  assert.equal(atlas.sources.get('device-hsiao_iru_reprint_2018').kind, 'figure_reproduction');
});
