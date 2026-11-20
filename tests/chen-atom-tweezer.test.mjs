import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { axisPoints, createWorkspace, groupRows, hasVisibleLight } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), data);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'chen2024tweezer');
const cell = suffix => rows.find(row => row.id === `chen2024tweezer_${suffix}`).values;

test('Chen links three rows to one published device and applies the visible boundary to measured wavelengths', () => {
 assert.equal(rows.length, 3);
 assert.equal(new Set(rows.map(row => row.specimen_id)).size, 1);
 assert.equal(groupRows(rows)[0].paper, 'device-chen_atom_tweezer_2024');
 assert.equal(atlas.sources.get('device-chen_atom_tweezer_arxiv_2024').publication_source, groupRows(rows)[0].paper);
 assert.deepEqual(rows.filter(row => hasVisibleLight(lens, row)).map(row => row.values.wavelength_nm.value), [null, 780]);
 for (const {values} of rows) {
  assert.equal(values.diameter_um.value, 2000);
  assert.equal(values.na.value, .46);
  assert.equal(values.na.na_definition, 'metalens_design');
 }
});

test('the 780 nm fluorescence focus is plotted with its chip reference, and no unmeasured 852 nm focus is inferred', () => {
 const observed = cell('780').measured_focal_um;
 assert.equal(observed.basis, 'measured');
 assert.equal(observed.approximate, true);
 assert.equal(observed.reference_plane, '芯片表面');
 assert.equal(observed.position_definition, 'side_view_fluorescence_focus');
 assert.deepEqual(axisPoints(rows, 'wavelength_nm', 'measured_focal_um').map(point => [point.x, point.y]), [[780, 2600]]);
 assert.equal(cell('852').measured_focal_um.value, null);
 assert.equal(cell('summary').design_focal_um.value, null);
 assert.equal(cell('summary').focus_variation_um.value, null);
});

test('the common reported efficiency and beam waist are recorded with their protocols without invented spectral metrics', () => {
 const summary = cell('summary');
 assert.equal(summary.psf_protocol.reported_psf_waist_um, 1.33);
 assert.equal(summary.psf_protocol.reported_rayleigh_length_um, 11.68);
 assert.equal(summary.efficiency_protocol.reported_common_efficiency_pct, 22);
 assert.equal(summary.efficiency_protocol.aperture_size_um, 5);
 assert.equal(summary.efficiency_protocol.aperture_size_definition, null);
 assert.equal(summary.efficiency_protocol.denominator, null);
 assert.equal(summary.mtf_curve.raw_psf, null);
 for (const axis of ['fwhm_y_um', 'efficiency_at_lambda_pct', 'strehl']) {
  assert.deepEqual(axisPoints(rows, 'wavelength_nm', axis), []);
 }
});
