import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints, createWorkspace, groupRows} from '../web/workspace-data.js';

const data = JSON.parse(fs.readFileSync(new URL('../data/devices.json', import.meta.url)));
const catalog = load();
const atlas = createWorkspace(catalog, data);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'yoon2026');
const get = id => rows.find(row => row.id === 'yoon2026_' + id).values;
const wavelengths = Array.from({length: 44}, (_, i) => 430 + 5 * i);
const missingPanels = [505, 510, 615];

test('Yoon PSFs share one study with results by physical lens, object distance and real spectral point', () => {
 assert.equal(rows.length, 306);
 assert.equal(groupRows(rows).length, 1);
 assert.equal(new Set(rows.map(row => row.specimen_id)).size, 9);
 for (const lensId of ['hyperbolic', 'broadband', 'ours']) {
  for (const [distance, numericDistance] of [['far', null], ['near', .045]]) {
   const spectra = rows.filter(row => row.id.startsWith('yoon2026_' + lensId + '_' + distance + '_') &&
    Number.isFinite(row.values.wavelength_nm.value));
   assert.deepEqual(spectra.map(row => row.values.wavelength_nm.value), wavelengths);
   assert.deepEqual(spectra.filter(row => row.values.mtf_curve.individual_curve_panel === false)
    .map(row => row.values.wavelength_nm.value), missingPanels);
   const values = get(lensId + '_' + distance + '_summary');
   assert.equal(values.psf_protocol.object_distance_m, numericDistance);
   assert.equal(values.psf_protocol.evaluation_plane_um, 4000);
   assert.equal(values.psf_protocol.object_plane_pixel_size_um, null);
   assert.equal(values.measured_focal_um.value, null);
   assert.equal(values.mtf_curve.sample_wavelengths_nm.length, 41);
   assert.equal(values.mtf_curve.direction_aggregation, 'radial_average');
   assert.equal(values.mtf_curve.data_availability.raw_psf, null);
  }
 }
 assert.equal(axisPoints(rows, 'wavelength_nm', 'measured_focal_um').length, 0);
 assert.equal(get('hyperbolic_far_530').design_focal_um.design_wavelength_nm, 532);
 assert.equal(get('ours_far_530').na.value, .3);
});

test('Yoon reconstructed RGB MTF, registered capture metrics and optical-stack estimates retain their different contexts', () => {
 for (const channel of ['red', 'green', 'blue']) {
  const v = get('ours_edge_' + channel);
  assert.equal(v.mtf_curve.basis, 'reconstruction');
  assert.equal(v.mtf_curve.mtf_kind, 'reconstructed_slanted_edge');
  assert.equal(v.mtf_curve.color_channel, channel);
  assert.equal(v.wavelength_nm, undefined);
 }
 assert.equal(get('ours_dirt_raw_obs').psnr_db.value, 15.15);
 assert.equal(get('ours_dirt_raw_obs').psnr_db.basis, 'derived_from_measurement');
 assert.equal(get('ours_dirt_recon_obs').psnr_db.display, '21.20');
 assert.equal(get('ours_dirt_recon_obs').psnr_db.basis, 'reconstruction');
 assert.equal(get('ours_fence_recon_obs').ssim.value, .7316);
 assert.equal(get('ours_fence_recon_obs').image_lpips.value, .4047);
 const stack = get('ours_optical_stack');
 assert.equal(stack.efficiency_protocol.integration_radius_px, 10);
 assert.equal(stack.estimated_system_focal_efficiency_pct.value, 6.36);
 assert.equal(stack.estimated_detected_throughput_pct.value, 18.45);
 assert.equal(stack.spectrally_weighted_mtf_area_lpmm.value, 13.410);
 assert.equal(stack.spectrally_weighted_mtf_area_lpmm.frequency_limits_lpmm, null);
 assert.equal(axisPoints(rows, 'na', 'efficiency_band_mean_pct').length, 0);
});

test('Yoon MTF and estimate validation rejects loss of the source measurement context', () => {
 const changes = [
  ['ours_near_505', v => v.mtf_curve.individual_curve_panel = true, /radially averaged measured PSF MTF/],
  ['ours_near_530', v => v.psf_protocol.object_distance_m = null, /radially averaged measured PSF MTF/],
  ['ours_edge_blue', v => v.mtf_curve.basis = 'derived_from_measurement', /reconstructed color channel edge MTF/],
  ['ours_optical_stack', v => v.estimated_system_focal_efficiency_pct.basis = 'measured', /optical stack aggregate estimate/]
 ];
 for (const [id, mutate, error] of changes) {
  const copy = structuredClone(data);
  mutate(copy.domains.metalens.rows.find(row => row.id === 'yoon2026_' + id).values);
  assert.throws(() => validateDevices(copy,catalog), error);
 }
});
