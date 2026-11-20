import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { validateDevices } from '../scripts/devices.mjs';
import { axisPoints, createWorkspace, groupRows, hasVisibleLight } from '../web/workspace-data.js';

const raw = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), raw);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const study = 'ou2020polarized';
const rows = lens.rows.filter(row => row.study_id === study);
const summary = specimen => rows.find(row => row.id === study + '_' + specimen + '_summary').values;
const wavelengths = [3500, 3750, 4000, 4250, 4500, 4750];

test('Ou links two physical devices and all measured filter/polarization combinations to one infrared paper', () => {
  const [group] = groupRows(rows);
  assert.equal(groupRows(rows).length, 1);
  assert.equal(group.paper, 'device-ou_ir_polar_2020');
  assert.equal(rows.length, 26);
  assert.equal(atlas.sources.get('device-ou_ir_polar_si_2020').publication_source, group.paper);
  assert.ok(rows.every(row => !hasVisibleLight(lens, row)));
  for (const specimen of ['bafov', 'bafs']) {
    const setup = summary(specimen);
    assert.equal(setup.design_focal_um.value, 200);
    assert.equal(setup.lambda_max_nm.value, 5000);
    for (const pol of ['x', 'y']) {
      const samples = rows.filter(row => row.specimen_id === specimen && row.values.polarization?.input_polarization === pol);
      assert.deepEqual(samples.map(row => row.values.wavelength_nm.value), wavelengths);
      for (const {values} of samples) {
        assert.equal(values.psf_protocol.scan_step_um, 2.5);
        assert.equal(values.psf_protocol.reference_plane, '器件面 z=0');
        assert.equal(values.polarization.topological_charge, specimen === 'bafov' && pol === 'y' ? 2 : 0);
        assert.equal(values.polarization.designed_output_angle_deg, specimen === 'bafov' ? 0 : pol === 'x' ? -5.5 : 5.5);
      }
    }
  }
  assert.equal(summary('bafov').diameter_um.value, 200);
  assert.equal(summary('bafs').diameter_um.value, null);
  assert.equal(summary('bafs').na.value, null);
});

test('Ou keeps plotted focus and widths unresolved and separates the shared prose bounds from measured residuals', () => {
  for (const metric of ['measured_focal_um', 'fwhm_um', 'fwhm_x_um', 'fwhm_y_um', 'focus_error_pct', 'efficiency_at_lambda_pct']) {
    assert.deepEqual(axisPoints(rows, 'wavelength_nm', metric), [], metric);
  }
  assert.deepEqual(axisPoints(rows, 'design_focal_um', 'focus_error_pct'), []);
  assert.deepEqual([summary('bafov').focus_error_pct.reported_upper_pct, summary('bafs').focus_error_pct.reported_upper_pct], [5, 6.5]);
  assert.equal(summary('bafs').focus_error_pct.reported_lower_pct, 1);
  assert.equal(summary('bafov').mtf_curve.data_availability.raw_psf, null);
});

test('Ou places the isolation maximum on its own power-ratio axis with both focal regions', () => {
  assert.deepEqual(axisPoints(rows, 'design_focal_um', 'polarization_isolation_ratio').map(point => [point.x, point.y]), [[200, 21]]);
  assert.deepEqual(axisPoints(rows, 'wavelength_nm', 'polarization_isolation_ratio'), []);
  const isolation = summary('bafs').polarization_isolation_ratio;
  assert.equal(isolation.numerator, 'selected_focal_disk_power');
  assert.equal(isolation.denominator, 'mirror_symmetric_focal_disk_power');
  assert.equal(isolation.aperture_diameter_fwhm_multiple, 1);
  const broken = structuredClone(raw);
  const ratio = broken.domains.metalens.rows.find(row => row.id === study + '_bafs_summary').values.polarization_isolation_ratio;
  ratio.unit = 'pct';
  assert.throws(() => validateDevices(broken), /polarization isolation power ratio context/);
});
