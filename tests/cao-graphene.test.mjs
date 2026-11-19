import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { axisPoints, createWorkspace, groupRows, hasVisibleLight } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const workspace = createWorkspace(load(), data);
const lens = workspace.domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'cao2024graphene');
const main = 'device-cao_graphene_2024';
const specimen = name => rows.filter(row => row.specimen_id === name);
const wavelengths = name => specimen(name).flatMap(row => Number.isFinite(row.values.wavelength_nm?.value) ? [row.values.wavelength_nm.value] : []);

test('Cao visible and infrared measurements resolve to the original figure captions', () => {
 assert.equal(rows.length, 15);
 assert.equal(groupRows(rows).length, 1);
 assert.equal(groupRows(rows)[0].paper, main);
 assert.equal(new Set(rows.map(row => row.specimen_id)).size, 4);
 assert.deepEqual(wavelengths('visible_lens'), [450, 550, 650]);
 assert.deepEqual(wavelengths('nir_lens'), [850, 1310, 1550]);
 assert.equal(rows.filter(row => hasVisibleLight(lens, row)).length, 11);
 assert.equal(workspace.sources.get('device-cao_graphene_fig2_2024').publication_source, main);
 assert.equal(workspace.sources.get('device-cao_graphene_fig4_2024').publication_source, main);
 assert.equal(workspace.sources.get(main).bibliography.year, 2025);
});

test('Cao keeps the publication-level bound, models and composited image distinct from measured performance', () => {
 const {focus_error_pct: bound} = specimen('visible_lens')[0].values;
 assert.equal(bound.value, null);
 assert.deepEqual(bound.reported_bound_pct, {operator:'<',value:.15,scope:'publication',reference:'desired_focal_lengths'});
 assert.ok(specimen('nir_lens').every(row => !row.values.focus_error_pct));
 for (const metric of ['diameter_um','na','lambda_min_nm','lambda_max_nm','measured_focal_um','fwhm_um','focus_error_pct','efficiency_at_lambda_pct']) {
  assert.equal(axisPoints(rows, '$model', metric).length, 0);
 }
 assert.ok(specimen('visible_model').every(row => row.values.wavelength_nm.basis === 'model'));
 assert.deepEqual(wavelengths('visible_imaging'), [450, 550, 650]);
 const composite = specimen('visible_imaging').find(row => row.values.wavelength_nm.basis === 'reconstruction').values;
 assert.equal(composite.wavelength_nm.value, null);
 assert.deepEqual(composite.wavelength_nm.sample_wavelengths_nm, [450, 550, 650]);
 assert.equal(composite.illumination.processing_stage, 'channel_composite');
});
