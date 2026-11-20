import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { validateDevices } from '../scripts/devices.mjs';
import { axisPoints, createWorkspace, groupRows, hasVisibleLight } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const catalog = load();
const atlas = createWorkspace(catalog, data);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'ji2025sted');
const values = suffix => rows.find(row => row.id === `ji2025sted_${suffix}`).values;
const points = metric => axisPoints(rows, 'wavelength_nm', metric).map(({x, y}) => [x, y]);

test('Ji uses one paper, a common optical surface and two measured focal positions without a residual estimate', () => {
 assert.equal(rows.length, 8);
 assert.equal(new Set(rows.map(row => row.specimen_id)).size, 3);
 assert.ok(rows.every(row => hasVisibleLight(lens, row) && row.values.diameter_um.value === 100));
 assert.equal(groupRows(rows)[0].paper, 'device-ji_sted_2025');
 assert.equal(atlas.sources.get('device-ji_sted_si_2025').publication_source, groupRows(rows)[0].paper);
 assert.deepEqual(points('measured_focal_um'), [[635,37.5],[780,37.5]]);
 const coordinateRecords = rows.filter(row => Number.isFinite(row.values.measured_focal_um?.value));
 assert.ok(coordinateRecords.every(({values:{measured_focal_um, psf_protocol}}) =>
  measured_focal_um.reference_plane === psf_protocol.reference_plane && psf_protocol.axial_step_um === null));
 assert.equal(values('lens_summary').design_focal_um.value, null);
 assert.equal(values('lens_summary').focus_variation_um.value, null);
 assert.equal(values('lens_summary').mtf_curve.raw_psf, null);
});

test('the donut inner width and reverse collection have their own scatter axes', () => {
 assert.deepEqual(points('fwhm_x_um'), [[635,.415]]);
 assert.deepEqual(points('vortex_inner_fwhm_um'), [[780,.349]]);
 assert.deepEqual(points('efficiency_at_lambda_pct'), [[635,32],[780,37.8]]);
 assert.deepEqual(points('reverse_collection_efficiency_pct'), [[690,41.6]]);
 for (const suffix of ['lens_635','lens_780']) {
  assert.equal(values(suffix).efficiency_protocol.focal_integration_radius_um, null);
  assert.equal(values(suffix).efficiency_protocol.input_power_reference_plane, null);
 }
 const reverse = values('lens_reverse_690');
 assert.equal(reverse.efficiency_protocol.collection_distance_mm, 50);
 assert.equal(reverse.efficiency_protocol.reference_objective_na, .8);
 assert.equal(reverse.efficiency_protocol.denominator, reverse.reverse_collection_efficiency_pct.denominator);
 const broken = structuredClone(data);
 const donut = broken.domains.metalens.rows.find(row => row.id === 'ji2025sted_lens_780').values;
 donut.fwhm_x_um = {...donut.vortex_inner_fwhm_um, basis:'measured'};
 assert.throws(() => validateDevices(broken, catalog), /vortex inner width context/);
});

test('STED state and sample profile preserve the finite target and scan settings', () => {
 for (const [state, sample, width, criterion, on] of [
  ['off','particle',.436,'fwhm',false], ['off','filament',.45,'author_fit_width',false],
  ['on','particle',.283,'fwhm',true], ['on','filament',.274,'author_fit_width',true],
 ]) {
  const image = values(`imaging_${state}_${sample}`);
  assert.equal(image.wavelength_nm.value, null);
  assert.equal(image.psf_protocol.depletion_enabled, on);
  assert.equal(image.psf_protocol.depletion_wavelength_nm, on ? 780 : null);
  assert.equal(image.psf_protocol.scan_step_nm, 50);
  assert.deepEqual(image.psf_protocol.collection_filter_nm, [640,720]);
  assert.equal(image.imaging_feature_width_um.value, width);
  assert.equal(image.imaging_feature_width_um.width_definition, criterion);
 }
 assert.deepEqual(points('imaging_feature_width_um'), []);
});
