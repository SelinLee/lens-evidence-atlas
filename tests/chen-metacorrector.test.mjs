import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints, createWorkspace, groupRows, hasVisibleLight} from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const catalog = load();
const lens = createWorkspace(catalog, data).domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'chen2018metacorrector');

test('Chen 2018 preserves direct axial scans, fixed-plane spots and the two imaging reference wavelengths', () => {
  assert.equal(rows.length, 43);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 7);
  assert.deepEqual(groupRows(rows).map(group => group.paper), ['device-chen_metacorrector_pdf_2018']);
  assert.ok(rows.every(row => hasVisibleLight(lens, row)));
  for (const id of ['hybrid', 'bare']) {
    const axial = rows.filter(row => row.specimen_id === id && row.id.includes('_axial_'));
    assert.deepEqual(axial.map(row => row.values.wavelength_nm.value), [460, 490, 530, 570, 590, 640, 700]);
    assert.ok(axial.every(row => row.values.psf_protocol.axial_scan_step_um === 5 && row.values.measured_focal_um.value === null));
    const spots = rows.filter(row => row.specimen_id === id && row.id.includes('_spot_'));
    assert.deepEqual(spots.map(row => row.values.wavelength_nm.value), [460, 490, 530, 570, 630, 700]);
    assert.ok(spots.every(row => row.values.psf_protocol.focal_plane_reference_wavelength_nm === 460));
  }
  const imaging = rows.find(row => row.id === 'chen2018metacorrector_hybrid_imaging_458');
  assert.deepEqual(imaging.values.illumination.reported_reference_wavelengths_nm, [458, 460]);
  assert.equal(axisPoints(rows, 'wavelength_nm', 'measured_focal_um').length, 0);
  assert.equal(axisPoints(rows, 'na', 'focus_variation_um').length, 0);
});

test('Chen 2018 reports one spectral peak relative to the bare lens with parallel polarizers', () => {
  const peak = rows.find(row => row.id === 'chen2018metacorrector_hybrid_efficiency_peak').values;
  assert.equal(peak.reference_lens_efficiency_peak_pct.value, 35);
  assert.equal(peak.reference_lens_efficiency_peak_pct.peak_wavelength_nm, null);
  assert.equal(peak.efficiency_protocol.reference_polarizers, 'parallel');
  assert.equal(peak.efficiency_protocol.integration_aperture_diameter_um, null);
  assert.equal(peak.reported_effective_focal_um.value, 9960);
  const polar = rows.find(row => row.id === 'chen2018metacorrector_hybrid_efficiency_pol').values;
  assert.equal(polar.wavelength_nm.value, 500);
  assert.equal(polar.efficiency_protocol.analyzer, false);
  assert.notEqual(polar.efficiency_protocol.denominator, peak.efficiency_protocol.denominator);
  assert.equal(axisPoints(rows, 'na', 'reference_lens_efficiency_peak_pct').length, 1);
  assert.equal(axisPoints(rows, 'wavelength_nm', 'efficiency_at_lambda_pct').length, 0);
  const invalid = structuredClone(data);
  const stored = invalid.domains.metalens.rows.find(row => row.id === 'chen2018metacorrector_hybrid_efficiency_peak');
  stored.values.efficiency_protocol.reference_polarizers = 'crossed';
  assert.throws(() => validateDevices(invalid, catalog), /reference-lens efficiency peak context/);
});
