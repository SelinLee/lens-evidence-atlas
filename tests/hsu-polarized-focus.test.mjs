import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { axisPoints, createWorkspace, groupRows, hasVisibleLight } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const workspace = createWorkspace(load(),data);
const lens = workspace.domains.find(domain => domain.id === 'metalens');
const hsu = lens.rows.filter(row => row.study_id === 'hsu2022polar');
const byId = suffix => hsu.find(row => row.id === 'hsu2022polar_'+suffix).values;

test('Hsu preserves fitted NA, a shared measurement plane and unresolved multiplexed values', () => {
 assert.equal(groupRows(hsu).length,1);
 assert.equal(hsu.length,7);
 assert.equal(new Set(hsu.map(row => row.specimen_id)).size,3);
 assert.equal(hsu.filter(row => hasVisibleLight(lens,row)).length,5);
 assert.equal(workspace.sources.get('device-hsu_polar_thesis_2025').publication_source,groupRows(hsu)[0].paper);
 const x = byId('multiplexed_780_x');
 const y = byId('multiplexed_850_852_y');
 assert.equal(x.wavelength_nm.value,780);
 assert.equal(y.wavelength_nm.value,null);
 assert.deepEqual([y.wavelength_nm.reported_wavelength_nm,y.wavelength_nm.figure_caption_wavelength_nm],[850,852]);
 for (const [values,na,articleEfficiency] of [[x,.8,42],[y,.82,45]]) {
  assert.equal(values.design_focal_um.value,500);
  assert.equal(values.na.value,.8);
  assert.equal(values.effective_na_from_psf.value,na);
  assert.equal(values.effective_na_from_psf.fit_standard_error,.01);
  assert.equal(values.psf_protocol.distance_setting,'common_fixed_pinhole_distance');
  assert.equal(values.efficiency_at_lambda_pct.value,null);
  assert.equal(values.efficiency_at_lambda_pct.reported_article_pct,articleEfficiency);
  assert.equal(values.efficiency_at_lambda_pct.thesis_reported_bound_pct.value,20);
  assert.equal(values.measured_focal_um.value,null);
 }
});

test('Hsu keeps the control-lens chromatic shift and measured efficiency on the reported protocol', () => {
 const control=byId('singlet_control_summary');
 assert.equal(control.diameter_um.value,4000);
 assert.equal(control.focus_variation_um.value,300);
 assert.equal(control.focus_variation_um.reference_wavelength_nm,852);
 assert.equal(control.focus_variation_um.target_wavelength_nm,780);
 const points=axisPoints(hsu,'efficiency_lambda_nm','efficiency_at_lambda_pct');
 assert.deepEqual(points.map(p => [p.x,p.y]),[[780,56],[852,58]]);
 assert.ok(points.every(p => p.row.specimen_id === 'singlet_control'));
 assert.ok(points.every(p => p.row.values.efficiency_protocol.pinhole_diameter_um === 300));
 assert.ok(points.every(p => p.row.values.efficiency_protocol.denominator === 'total_input_power_to_substrate'));
 assert.equal(byId('compensated_detection_780').psf_protocol.reference_wavelength_nm,852);
 assert.equal(axisPoints(hsu,'wavelength_nm','fwhm_um').length,0);
});
