import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {validateDevices} from '../scripts/devices.mjs';

const dataset = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const {metrics, rows} = dataset.domains.metalens;
const bayati = rows.filter(row => row.study_id === 'bayati2022');
const matching = key => bayati.filter(row => row.id.endsWith(key));

test('Bayati keeps axial interval widths, fitted PSF minima and the efficiency protocol distinct', () => {
 for (const [index, [dof, width]] of [[83, 3.35], [10, 3], [400, 24.9], [100, 20.6]].entries()) {
  const axial = matching('_dof')[index].values;
  const transverse = matching('_width')[index].values;
  assert.equal(axial.depth_of_focus_um.value, dof);
  assert.equal(axial.wavelength_nm.value, 625);
  assert.equal(axial.measured_focal_um.value, null);
  assert.equal(transverse.minimum_psf_fwhm_x_um.value, width);
  assert.equal(transverse.wavelength_nm.value, null);
  assert.equal(transverse.fwhm_x_um, undefined);
 }
 const efficiencies = matching('_efficiency');
 assert.deepEqual(efficiencies.map(row => row.values.reported_axial_scan_focusing_efficiency_pct.value), [47, 51]);
 for (const {values} of efficiencies) {
  assert.equal(values.efficiency_protocol.evaluation_plane_um, null);
  assert.equal(values.efficiency_protocol.axial_unit_status, 'unresolved');
  assert.equal(values.efficiency_protocol.integration_radius_multiple_of_min_fwhm, 3);
  assert.equal(values.efficiency_at_lambda_pct, undefined);
  assert.equal(values.efficiency_band_mean_pct, undefined);
 }
});

test('Bayati keeps measured MTF candidates and simulated image metrics tied to the right evidence', () => {
 const curves = bayati.filter(row => row.values.mtf_curve);
 assert.equal(curves.length, 6);
 for (const kind of ['edof', 'traditional']) {
  const series = curves.filter(row => row.specimen_id === kind+'_mtf_unassigned');
  assert.deepEqual(series.map(row => row.values.wavelength_nm.value), [455, 530, 625]);
  for (const row of series) {
   assert.deepEqual(row.candidate_specimen_ids, [kind+'_100', kind+'_1000']);
   assert.equal(row.values.diameter_um.value, null);
   assert.equal(row.values.mtf_curve.normalization_frequency_cycles_mm, 560);
   assert.equal(row.values.mtf_curve.data_availability, 'curves_only');
  }
 }
 const widths = matching('_band');
 assert.deepEqual(widths.map(row => row.values.simulated_psf_correlation_bandwidth_nm.value), [290, 15, 95, 130]);
 const broken = structuredClone(bayati);
 broken.find(row => row.id.endsWith('_band')).values.simulated_psf_correlation_bandwidth_nm.basis = 'measured';
 assert.throws(() => validateDevices({...dataset, domains: {metalens:{metrics, rows:broken}}}), /simulated correlation bandwidth context/);
 const edofBlue = bayati.find(row => row.id.endsWith('model_edof_ssim_blue')).values.ssim;
 const logBlue = bayati.find(row => row.id.endsWith('model_log_ssim_blue')).values.ssim;
 assert.equal(edofBlue.basis, 'model');
 assert.equal(edofBlue.value, 0.4863);
 assert.equal(logBlue.value, 0.5718);
 assert.ok(bayati.filter(row => row.specimen_id === 'edof_imaging' && row.values.ssim).every(row => row.values.ssim.processing_stage === 'not_reported'));
});
