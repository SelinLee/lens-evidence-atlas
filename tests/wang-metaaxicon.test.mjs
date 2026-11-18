import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints, createWorkspace, groupRows, hasVisibleLight} from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const catalog = load();
const lens = createWorkspace(catalog, data).domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'wang2026metaaxicon');
const key = 'wang2026metaaxicon_';
const cells = id => rows.find(row => row.id === key + id).values;

test('Wang 2026 captures RGB width at the working plane and keeps simulated color shifts distinct', () => {
  assert.equal(rows.length, 40);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 6);
  assert.deepEqual(groupRows(rows).map(group => group.paper), ['device-wang_metaaxicon_pdf_2026']);
  assert.ok(rows.every(row => hasVisibleLight(lens, row)));
  for (const [channel, expected] of [['red', 2.89], ['green', 2.87], ['blue', 2.85]]) {
    const value = cells('central_psf_' + channel);
    assert.equal(value.wavelength_nm.value, null);
    assert.equal(value.rgb_radial_psf_fwhm_um.color_channel, channel);
    assert.equal(value.rgb_radial_psf_fwhm_um.value, expected);
    assert.equal(value.design_focal_um.value, 30000);
    assert.equal(value.psf_protocol.evaluation_plane_um, 21000);
  }
  assert.equal(cells('printed_k1_dispersion').aoi_deg.value, 2.5);
  assert.match(cells('printed_k1_dispersion').chromatic.note, /Fig\. 3d.*5°/);
  assert.equal(cells('printed_k2_dispersion').aoi_deg.value, 5);
  assert.equal(cells('k3_dispersion').aoi_deg, undefined);
  assert.equal(cells('k3_dispersion').psf_protocol.field_theta_x_deg, 1.91);
  const modeled = cells('corrected_simulation').chromatic;
  assert.equal(modeled.basis, 'model');
  assert.deepEqual(modeled.bound, {operator: 'lt', value: 0.1, unit: 'μm'});
  assert.equal(cells('central_global_psf').mtf_curve.data_availability.raw_psf, null);
  assert.equal(axisPoints(rows, 'diameter_um', 'rgb_radial_psf_fwhm_um').length, 3);
  assert.equal(axisPoints(rows, 'wavelength_nm', 'rgb_radial_psf_fwhm_um').length, 0);
});

test('Wang 2026 preserves the target angle and restoration stage of the angular limits', () => {
  for (const [key, frequency, targetAngle] of [['t5', 5.13, null], ['t1', 3.76, null], ['t14_on', 6.61, 0.2]]) {
    const restored = cells('restored_' + key);
    assert.equal(restored.restored_angular_resolution_lp_mrad.value, frequency);
    assert.equal(restored.restored_angular_resolution_lp_mrad.basis, 'reconstruction');
    assert.equal(restored.psf_protocol.target_field_extent_deg, targetAngle);
  }
  assert.equal(cells('restored_t5').restored_angular_resolution_lp_mrad.reported_image_equivalent_frequency_lpmm, 244);
  assert.equal(cells('restored_t14_27').restored_angular_resolution_lp_mrad.value, null);
  assert.equal(cells('captured_t5').restored_angular_resolution_lp_mrad.value, null);
  assert.equal(cells('array_restored').fov_deg.value, 10);
  assert.equal(axisPoints(rows, 'aoi_deg', 'restored_angular_resolution_lp_mrad').length, 3);

  const invalid = structuredClone(data);
  const records = invalid.domains.metalens.rows;
  records.find(row => row.id === 'wang2026metaaxicon_central_psf_red').values.wavelength_nm.value = 700;
  records.find(row => row.id === 'wang2026metaaxicon_restored_t5').values.psf_protocol.processing_stage = 'captured';
  assert.throws(() => validateDevices(invalid, catalog), /RGB radial PSF FWHM context\nrestored angular resolution context/);
});
