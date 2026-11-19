import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { load } from '../scripts/catalog.mjs';
import { validateDevices } from '../scripts/devices.mjs';
import { axisPoints, createWorkspace, groupRows, hasVisibleLight } from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const workspace = createWorkspace(load(), data);
const lens = workspace.domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'ren2022metafiber');
const specimen = name => rows.filter(row => row.specimen_id === name);
const waves = [1250, 1350, 1450, 1550, 1650];

test('Ren uses one publication for the measured lenses, confocal systems and simulations', () => {
 const [paper, ...extra] = groupRows(rows);
 assert.deepEqual(extra, []);
 assert.equal(paper.paper, 'device-ren_metafiber_pdf_2022');
 assert.equal(workspace.sources.get('device-ren_metafiber_si_2022').publication_source, paper.paper);
 assert.equal(workspace.sources.get('device-ren_metafiber_review_2022').publication_source, paper.paper);
 assert.equal(rows.length, 35);
 assert.equal(new Set(rows.map(row => row.specimen_id)).size, 10);
 assert.ok(rows.every(row => !hasVisibleLight(lens, row)));
});

test('Ren preserves the measured focal conflict and reports three distinct efficiency ratios', () => {
 for (const [type, expectedWidths, totals] of [
  ['glass_achromat', [3.03, 3.83, 3.79, 3.84, 4.24], [14.13, 18.11, 24.58, 30.87, 32.01]],
  ['glass_control', null, [20.11, 24.58, 27, 30.1, 30.96]],
  ['fiber_achromat', [4.97, 5.45, 5.81, 6.27, 6.74], null],
 ]) {
  const measured = specimen(type).filter(row => row.values.wavelength_nm);
  assert.deepEqual(measured.map(row => row.values.wavelength_nm.value), waves);
  assert.equal(measured[0].values.diameter_um.value, 100);
  assert.equal(measured[0].values.na.value, type === 'fiber_achromat' ? 0.12 : 0.2);
  if (expectedWidths) assert.deepEqual(measured.map(row => row.values.fwhm_um.value), expectedWidths);
  if (!totals) {
   assert.ok(measured.every(row => !row.values.efficiency_at_lambda_pct));
   continue;
  }
  assert.deepEqual(measured.map(row => row.values.efficiency_at_lambda_pct.value), totals);
  for (const {values} of measured) {
   assert.equal(values.optical_transmittance_pct.denominator, 'incident_light_total_intensity');
   assert.equal(values.focusing_efficiency_transmitted_pct.denominator, 'transmitted_power');
   assert.equal(values.efficiency_protocol.focus_region_dimension_kind, null);
  }
 }
 const conflicting = specimen('glass_control').filter(row => row.values.measured_focal_um);
 assert.deepEqual(conflicting.map(row => row.values.measured_focal_um.prose_reported_value_um), [306, undefined, undefined, undefined, 225]);
 assert.ok(conflicting.every(row => row.values.measured_focal_um.value === null));
 assert.equal(axisPoints(rows, 'wavelength_nm', 'measured_focal_um').length, 1);
 const reported = specimen('glass_achromat').find(row => row.values.wavelength_nm?.value === 1650).values;
 assert.equal(reported.measured_focal_um.value, 225);
 assert.equal(reported.axial_focus_offset_um.value, -25);
 assert.equal(reported.axial_focus_offset_um.calculation_origin, 'atlas');
 assert.deepEqual(specimen('model_s11_control').map(row => row.values.simulated_focal_um.value), [292, 271, 258, 237, 217]);
 const invalid = structuredClone(data);
 const sample = invalid.domains.metalens.rows.find(row => row.id === 'ren2022metafiber_glass_achromat_1250');
 sample.values.efficiency_protocol.denominator = 'transmitted_power';
 assert.throws(() => validateDevices(invalid), /optical power ratio context/);
});
