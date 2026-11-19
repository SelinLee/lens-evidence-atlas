import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { axisPoints, createWorkspace, groupRows, hasVisibleLight } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const workspace = createWorkspace(load(), data);
const lens = workspace.domains.find(domain => domain.id === 'metalens');
const tang = lens.rows.filter(row => row.study_id === 'tang2026multifocal');
const arbabi = lens.rows.filter(row => row.study_id === 'arbabi2016dichroic');

test('Tang preserves two prototypes, a publication-level bound and the registered supplement', () => {
 assert.equal(groupRows(tang).length, 1);
 assert.equal(tang.length, 3);
 const report = tang.find(row => row.configuration_role === 'unassigned_measurement_set');
 assert.deepEqual(report.candidate_specimen_ids, ['coherent_ryg','incoherent_rgb']);
 assert.deepEqual(report.values.focus_variation_um.reported_bound_um, {operator:'<',value:1,scope:'publication'});
 assert.equal(report.values.material.lattice_period_nm, 650);
 assert.deepEqual(tang.filter(row => row !== report).map(row => row.values.wavelength_nm.color_channels), [
  ['red','yellow','green'], ['red','green','blue'],
 ]);
 assert.ok(tang.every(row => hasVisibleLight(lens,row)));
 assert.equal(axisPoints(tang,'$model','wavelength_nm').length, 0);
 assert.equal(axisPoints(tang,'$model','focus_variation_um').length, 0);
 const supplement = workspace.sources.get('device-tang_multifocal_si_2026');
 assert.equal(supplement.url, 'https://doi.org/10.1021/acsphotonics.6c00399.s001');
 assert.equal(supplement.publication_source, groupRows(tang)[0].paper);
});

test('Arbabi assigns the printed focal distances to the mismatched polarization only', () => {
 assert.equal(groupRows(arbabi).length, 1);
 assert.equal(new Set(arbabi.map(row => row.specimen_id)).size, 5);
 assert.equal(arbabi.length, 25);
 assert.equal(arbabi.filter(row => hasVisibleLight(lens,row)).length, 15);
 const by = (wave, match) => arbabi.filter(row => row.id.endsWith(`_${wave}_${match}`));
 for (const [wave, axis, expected] of [[780,'x',[122,236,460,702,920]],[915,'y',[79,167,338,510,685]]]) {
  const opposite = by(wave,'opposite');
  assert.deepEqual(opposite.map(row => row.values.measured_focal_um.value), expected);
  assert.ok(opposite.every(row => row.values.polarization.input_linear_polarization === axis));
  const matching = by(wave,'matched');
  assert.deepEqual(matching.map(row => row.values.psf_protocol.evaluation_plane_um), [100,200,400,600,784]);
  assert.ok(matching.every(row => row.values.measured_focal_um.value === null));
  assert.deepEqual(matching.map(row => row.values.efficiency_protocol.pinhole_diameter_um), [6,6,10,15,20]);
  assert.ok(matching.every(row => row.values.efficiency_at_lambda_pct.value === null));
 }
 const conflict = by(915,'matched').at(-1).values.design_focal_um;
 assert.equal(conflict.value, null);
 assert.deepEqual(conflict.reported_design_focal_um, {prose:800,fig5b_label:780});
 assert.equal(axisPoints(arbabi,'wavelength_nm','measured_focal_um').length, 10);
});
