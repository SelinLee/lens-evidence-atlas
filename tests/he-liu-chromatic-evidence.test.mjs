import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { axisPoints, createWorkspace, filteredRows, groupRows } from '../web/workspace-data.js';

const devices = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), devices);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const group = study => groupRows(lens.rows.filter(row => row.study_id === study));

test('He retains the double-helix orientation protocol and component provenance', () => {
  const [he] = group('he2026dhpsf');
  assert.equal(he.paper, 'device-he_dhpsf_2026');
  assert.equal(he.rows.length, 1);
  const {values} = he.rows[0];
  assert.deepEqual([values.lambda_min_nm.value, values.lambda_max_nm.value], [1200, 1400]);
  assert.equal(values.material.period_nm, 500);
  assert.match(values.material.location, /Table S1/);
  assert.equal(values.psf_protocol.chromatic_observable, 'double_helix_psf_orientation_at_fixed_depth');
  assert.equal(values.psf_protocol.reference_angle_deg, null);
  assert.equal(values.psf_protocol.residual_rotation_deg, null);
  assert.equal(values.focus_variation_um.value, null);
  assert.equal(values.efficiency_protocol.reported_factor, 14.39);
  assert.equal(values.efficiency_protocol.denominator, null);
  assert.equal(values.efficiency_at_lambda_pct.value, null);
  assert.equal(atlas.sources.get('device-he_dhpsf_component_2026').publication_source, he.paper);
  assert.equal(atlas.sources.get('device-he_dhpsf_preview_2026').publication_source, he.paper);
});

test('Liu retains a bounded full field and unverified MTF points on its own hybrid specimen', () => {
  const [liu] = group('liu2024thermalhybrid');
  assert.equal(liu.paper, 'device-liu_thermal_doublet_2024');
  assert.equal(liu.rows.length, 1);
  const {values} = liu.rows[0];
  assert.deepEqual([values.lambda_min_nm.value, values.lambda_max_nm.value], [8000, 12000]);
  assert.equal(values.fov_deg.value, null);
  assert.deepEqual(values.fov_deg.bound, {operator:'>',value:20,unit:'°'});
  assert.equal(values.fov_deg.fov_scope, 'full_angle');
  assert.equal(values.mtf_curve.value, null);
  assert.equal(atlas.sources.get('device-liu_thermal_si_index_2024').publication_source, liu.paper);
  assert.deepEqual(axisPoints(liu.rows, 'lambda_max_nm', 'fov_deg'), []);

  for (const query of ['He 2026', 'Liu 2024 · 长波红外消色差折超双片']) {
    assert.equal(filteredRows(lens, {query,visible:true,models:null}).length, 0);
  }
});
