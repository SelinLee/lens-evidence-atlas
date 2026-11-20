import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { axisPoints, createWorkspace, filteredRows, groupRows } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), data);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'cheng2019thz');
const values = suffix => rows.find(row => row.id === `cheng2019thz_${suffix}`).values;
const xy = (x, y) => axisPoints(rows, x, y).map(point => [point.x, point.y]);

test('Cheng keeps six experimental frequencies per physical lens and groups the model comparison with the paper', () => {
  assert.equal(rows.length, 15);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 3);
  const [paper] = groupRows(rows);
  assert.equal(groupRows(rows).length, 1);
  assert.equal(atlas.sources.get('device-cheng_thz_2019_si').publication_source, paper.paper);
  assert.equal(filteredRows(lens, {query:'Cheng 2019', visible:true, models:null}).length, 0);

  for (const specimen of ['cshape', 'rectangle']) {
    const samples = rows.filter(row => row.specimen_id === specimen && row.values.frequency_thz);
    assert.deepEqual(samples.map(row => row.values.frequency_thz.value), [.3, .4, .5, .6, .7, .8]);
    assert.equal(samples[5].values.wavelength_nm.original_value, 375);
    assert.equal(values(`${specimen}_summary`).focus_variation_um.value, null);
  }
  assert.deepEqual(values('pb_control_span').chromatic.focal_endpoints_um, [5000, 14500]);
  assert.equal(values('pb_control_span').chromatic.basis, 'model');
});

test('Cheng separates the shared figure plane, reported focal length, and reference-normalized efficiency curve', () => {
  const cShape = values('cshape_summary');
  assert.equal(cShape.design_focal_um.value, 12000);
  assert.equal(cShape.psf_protocol.evaluation_plane_um, 12500);
  assert.equal(cShape.psf_protocol.axial_scan_step_um, null);
  assert.deepEqual(xy('frequency_thz', 'measured_focal_um'), [[.5, 10500]]);
  assert.deepEqual(xy('frequency_thz', 'fwhm_x_um'), [[.3,1300], [.6,660], [.8,510], [.5,1050]]);
  assert.equal(values('rectangle_05thz').measured_focal_um.approximate, true);
  assert.equal(values('rectangle_05thz').psf_protocol.phase_section_plane_um, 12500);
  assert.deepEqual(cShape.efficiency_at_lambda_pct.bound, {operator:'>', value:68});
  assert.equal(cShape.efficiency_protocol.integration_diameter_um, 1500);
  assert.equal(cShape.efficiency_protocol.denominator, 'transmitted_silicon_reference_times_author_n_si');
  assert.deepEqual(xy('frequency_thz', 'efficiency_at_lambda_pct'), []);
});
