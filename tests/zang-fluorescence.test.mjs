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
const rows = lens.rows.filter(row => row.study_id === 'zang2026nv');
const cell = suffix => rows.find(row => row.id === `zang2026nv_${suffix}`).values;

test('Zang and Xia retain two physical lenses, swapped pupil zones and the distinct imaging configuration', () => {
 assert.equal(rows.length, 7);
 assert.equal(new Set(rows.map(row => row.specimen_id)).size, 3);
 assert.equal(groupRows(rows)[0].paper, 'device-zang_xia_nv_2026');
 assert.equal(atlas.sources.get('device-zang_xia_nv_vor_2026').publication_source, groupRows(rows)[0].paper);
 assert.ok(rows.every(row => hasVisibleLight(lens, row) && row.values.diameter_um.value === 1000));
 assert.deepEqual(rows.map(row => row.values.wavelength_nm.value).filter(wave => wave !== null), [532]);
 const inner = [cell('lens1_excitation'), cell('lens2_collection')];
 const outer = [cell('lens2_excitation'), cell('lens1_collection')];
 assert.ok(inner.every(values => values.na.value === .7 && values.na.active_zone_diameter_um === 474));
 assert.ok(outer.every(values => values.na.value === null && values.na.reported_na_range.min === .7 && values.na.reported_na_range.max === .9));
 assert.equal(cell('lens2_excitation').wavelength_nm.design_wavelength_nm, 532);
});

test('the PL ratios and bandwidths retain their reference and do not yield invented spectral focus points', () => {
 for (const [id, ratio, width] of [['lens1',16,30],['lens2',34,50]]) {
  const values = cell(`${id}_collection`);
  assert.equal(values.wavelength_nm.value, null);
  assert.equal(values.design_focal_um.value, 242);
  assert.equal(values.design_focal_um.reference_wavelength_nm, 700);
  assert.equal(values.focus_variation_protocol.reference_focal_um, 242);
  assert.deepEqual(values.focus_variation_protocol.defocus_axis_markers_um, [40,0,-40]);
  assert.equal(values.measured_focal_um.value, null);
  assert.equal(values.relative_fluorescence_collection_pct.value, ratio);
  assert.equal(values.relative_fluorescence_collection_pct.denominator, values.efficiency_protocol.denominator);
  assert.equal(values.efficiency_protocol.reference_objective_na, .7);
  assert.equal(values.efficiency_protocol.spectral_integration_nm, null);
  assert.equal(values.fluorescence_collection_spectral_width_nm.value, width);
  assert.equal(values.fluorescence_collection_spectral_width_nm.spectral_width_criterion, null);
 }
 assert.deepEqual(axisPoints(rows, 'wavelength_nm', 'measured_focal_um'), []);
 assert.deepEqual(axisPoints(rows, 'wavelength_nm', 'efficiency_at_lambda_pct'), []);
 const ratios = axisPoints(rows, 'fluorescence_collection_spectral_width_nm', 'relative_fluorescence_collection_pct');
 assert.deepEqual(ratios.map(point => [point.x, point.y]), [[30,16],[50,34]]);
});

test('both fitted widths remain broadband fluorescence system metrics with no laser-wavelength PSF or MTF point', () => {
 const values = cell('metalens1_imaging');
 assert.equal(values.psf_protocol.excitation_wavelength_nm, 532);
 assert.equal(values.psf_protocol.collection_longpass_nm, 650);
 assert.deepEqual(axisPoints(rows, 'system_lateral_psf_fwhm_um', 'system_axial_psf_fwhm_um').map(point => [point.x, point.y]), [[.405,1.8]]);
 assert.deepEqual(axisPoints(rows, 'wavelength_nm', 'fwhm_x_um'), []);
 assert.equal(values.mtf_curve.raw_psf, null);
 const broken = structuredClone(data);
 broken.domains.metalens.rows.find(row => row.id === 'zang2026nv_metalens1_imaging').values.wavelength_nm.value = 532;
 assert.throws(() => validateDevices(broken, catalog), /broadband fluorescence system PSF context/);
});
