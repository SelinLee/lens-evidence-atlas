import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { validateDevices } from '../scripts/devices.mjs';
import { axisPoints, createWorkspace, filteredRows, groupRows } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const atlas = createWorkspace(load(), data);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'baek2022');
const fabricated = rows.filter(row => /^baek2022_d450_\d+$/.test(row.id));
const modeled = rows.filter(row => row.specimen_id === 'fdtd_d20');
const values = (selected, metric) => selected.map(row => row.values[metric].value);

test('Baek groups its official PDF and two configurations under one classic paper', () => {
  const [paper] = groupRows(rows);
  assert.equal(groupRows(rows).length, 1);
  assert.equal(paper.paper, 'device-baek_sim_rgb_2022');
  assert.equal(atlas.sources.get('device-baek_sim_rgb_pdf_2022').publication_source, paper.paper);
  assert.equal(rows.length, 7);
  assert.deepEqual([...new Set(rows.map(row => row.specimen_id))], ['sim_d450', 'fdtd_d20']);
  assert.equal(filteredRows(lens, { visible: true, query: 'Baek 2022', models: null }).length, 7);
  assert.ok(rows.every(row => !row.values.lambda_min_nm && !row.values.lambda_max_nm));
});

test('Baek measured and ideal widths, measured PSF Strehl, and efficiencies keep their original assignments', () => {
  assert.deepEqual(values(fabricated, 'wavelength_nm'), [450, 532, 700]);
  assert.deepEqual(values(fabricated, 'fwhm_um'), [.2985, .3234, .4571]);
  assert.deepEqual(values(fabricated, 'diffraction_limited_reference_fwhm_um'), [.2646, .3128, .4116]);
  assert.deepEqual(values(fabricated, 'strehl'), [.89, .88, .82]);
  assert.deepEqual(values(fabricated, 'efficiency_at_lambda_pct'), [5.9, 11.3, 13.6]);
  assert.deepEqual(values(modeled, 'simulated_focusing_efficiency_pct'), [25.2, 58.7, 66.4]);
  assert.ok(fabricated.every(({ values: v }) => v.design_focal_um.value === 125
    && v.efficiency_protocol.radius_fwhm_multiple === 4 && v.efficiency_protocol.denominator === 'total_incident_power'
    && v.fwhm_um.basis === 'measured' && v.diffraction_limited_reference_fwhm_um.basis === 'model'));
  assert.ok(modeled.every(({ values: v }) => v.design_focal_um.value === 5.5
    && v.psf_protocol.reported_transverse_section_f_um === 5 && !v.efficiency_at_lambda_pct && !v.simulated_focal_um));
  const polar = rows.find(row => row.id === 'baek2022_d450_polarization_450').values;
  assert.equal(polar.efficiency_at_lambda_pct.value, 5.94);
  assert.deepEqual(polar.efficiency_at_lambda_pct.reported_error, { type: 'SD', value: .07, sample_size: null });
  assert.equal(polar.efficiency_protocol.denominator, undefined);
});

test('Baek MTF curves retain physical units and source limits without new focal points', () => {
  for (const [index, { values: v }] of fabricated.entries()) {
    const mtf = v.mtf_curve;
    assert.match(mtf.location, new RegExp('Fig\\. 4' + 'ghi'[index]));
    assert.equal(mtf.frequency_unit, 'cycles/μm');
    assert.deepEqual(mtf.frequency_axis_extent, [0, 10]);
    assert.equal(mtf.normalization, 'dc_by_integrated_psf');
    assert.equal(mtf.direction_aggregation, 'unspecified');
    assert.equal(v.psf_protocol.axial_step_um, .5);
    for (const key of ['author_numeric_mtf', 'raw_psf', 'independently_recomputed_mtf', 'object_plane_pixel_size_um']) {
      assert.equal(mtf.data_availability[key], null);
    }
  }
  assert.equal(axisPoints(rows, 'wavelength_nm', 'measured_focal_um').length, 0);
  assert.equal(axisPoints(rows, 'wavelength_nm', 'axial_focus_offset_um').length, 0);
  assert.equal(axisPoints(rows, 'wavelength_nm', 'diffraction_limited_reference_fwhm_um').length, 3);
  const invalid = structuredClone(data);
  invalid.domains.metalens.rows.find(row => row.id === 'baek2022_d450_450').values.diffraction_limited_reference_fwhm_um.basis = 'measured';
  assert.throws(() => validateDevices(invalid), /diffraction-limited reference width/);
});
