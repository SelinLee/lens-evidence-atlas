import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { validateDevices } from '../scripts/devices.mjs';
import { axisPoints, createWorkspace, filteredRows, groupRows } from '../web/workspace-data.js';

const raw = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), raw);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const study = 'shi2018multiwavelength';
const rows = lens.rows.filter(row => row.study_id === study);
const byId = suffix => rows.find(row => row.id === study + '_' + suffix).values;
const xy = points => points.map(point => [point.x, point.y]);

test('Shi plots four published axial foci and their 9 µm span for one specimen', () => {
  const [group] = groupRows(rows);
  assert.equal(groupRows(rows).length, 1);
  assert.equal(group.paper, 'device-shi_multicolor_2018');
  assert.equal(atlas.sources.get('device-shi_multicolor_si_2018').publication_source, group.paper);
  assert.equal(rows.length, 13);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 3);
  assert.equal(filteredRows(lens, {query:'Shi 2018',visible:true,models:null}).filter(row => row.study_id === study).length, 13);
  assert.deepEqual(xy(axisPoints(rows,'wavelength_nm','measured_focal_um')), [[460,979],[540,985],[567,976],[700,982]]);
  assert.deepEqual(xy(axisPoints(rows,'diameter_um','focus_variation_um')), [[400,9]]);
  const mam = byId('mam_summary');
  assert.equal(mam.design_focal_um.value, null);
  assert.deepEqual(mam.focus_variation_um.measurement_record_ids, [460,540,567,700].map(wave => study+'_mam_'+wave));
  assert.equal(mam.focus_variation_um.calculation_origin, 'atlas');
  assert.equal(mam.psf_protocol.scan_step_um, 3);
  assert.equal(mam.psf_protocol.coarse_scan_step_um, 10);
  const changed = structuredClone(raw);
  changed.domains.metalens.rows.find(row => row.id === study+'_mam_540').values.measured_focal_um.value = 984;
  assert.throws(() => validateDevices(changed), /focal variation context/);
});

test('Shi keeps each Strehl and silver-mirror referenced efficiency with its published wavelength', () => {
  assert.deepEqual(xy(axisPoints(rows,'wavelength_nm','strehl')), [[460,.86],[540,.91],[567,.81],[700,.92]]);
  assert.deepEqual(xy(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct')), [[460,17.7],[540,16],[567,21.4],[700,22.6]]);
  for (const wavelength of [460,540,567,700]) {
    const values = byId('mam_'+wavelength);
    assert.equal(values.strehl.normalization, 'same_focused_power_as_diffraction_limited_psf');
    const power = values.efficiency_protocol;
    assert.equal(power.denominator, 'adjusted_same_size_silver_mirror_reflected_power');
    assert.equal(power.iris_diameter_um, 250);
    assert.equal(power.reference_mirror_diameter_um, 400);
    assert.equal(power.calibration_mirror_diameter_um, 200);
  }
});

test('Shi preserves both fixed-plane vortex sets with their distinct charges and author efficiency text', () => {
  for (const [device,spectra] of [
    ['wcbg1',[[455,2,31],[540,1,37],[700,0,33]]],
    ['wcbg2',[[480,1,31],[515,0,32],[690,0,33]]]
  ]) {
    assert.equal(byId(device+'_summary').design_focal_um.value, 980);
    for (const [wavelength,charge,efficiency] of spectra) {
      const values = byId(device+'_'+wavelength);
      assert.equal(values.psf_protocol.evaluation_plane_um, 980);
      assert.equal(values.chromatic.topological_charge, charge);
      assert.equal(values.measured_focal_um.value, null);
      assert.equal(values.efficiency_at_lambda_pct.value, null);
      assert.equal(values.efficiency_at_lambda_pct.reported_author_pct, efficiency);
    }
  }
  assert.deepEqual(xy(axisPoints(rows,'wavelength_nm','fwhm_x_um')), []);
});
