import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { axisPoints, createWorkspace, groupRows, hasVisibleLight } from '../web/workspace-data.js';
const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const workspace = createWorkspace(load(), data);
const lens = workspace.domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'zang2024lwirhybrid');

test('Zang has one infrared optical system with an author-reported achromatic range and field of view', () => {
  assert.equal(rows.length, 1);
  const row = rows[0], v = row.values;
  assert.equal(row.specimen_id, 'hybrid_camera');
  assert.equal(groupRows(rows).length, 1);
  assert.equal(groupRows(rows)[0].paper, 'device-zang_lwir_hybrid_2024');
  assert.equal(hasVisibleLight(lens, row), false);
  assert.equal(v.lambda_min_nm.value, 8000);
  assert.equal(v.lambda_max_nm.value, 14000);
  assert.equal(v.fov_deg.value, 30);
  assert.deepEqual(axisPoints(rows, 'lambda_min_nm', 'fov_deg').map(p => [p.x,p.y]), [[8000,30]]);
  assert.equal(v.material.reported_entrance_pupil_to_sensor_mm, 13.6);
  for (const key of ['diameter_um','na','design_focal_um','measured_focal_um','focus_variation_um','wavelength_nm','fwhm_um','strehl','mtf_curve','efficiency_at_lambda_pct']) {
    assert.equal(v[key].value,null,key);
    assert.equal(v[key].basis,'unresolved',key);
  }
  assert.equal(v.psf_protocol.sample_wavelengths_nm,null);
  assert.equal(v.thickness_um,undefined);
  assert.equal(v.measured_image_distance_um,undefined);
  assert.match(v.mtf_curve.location,/S8/);
  assert.match(v.mtf_curve.note,/不指明实验或模拟/);
  assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);
  for (const id of ['zang_lwir_pubmed_2024','zang_lwir_polyu_2024','zang_lwir_si_index_2024','zang_lwir_figshare_oai_2024','zang_lwir_figshare_file_2024','zang_lwir_cas_2025']) {
    assert.equal(workspace.sources.get('device-'+id).publication_source, 'device-zang_lwir_hybrid_2024');
  }
  assert.match(workspace.sources.get('device-zang_lwir_figshare_file_2024').scope, /50821676.*nn4c12546_si_001\.pdf.*eeea897f2d350fec2454329ad7e84fb1/);
});
