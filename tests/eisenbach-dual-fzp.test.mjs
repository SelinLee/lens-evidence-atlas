import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints, createWorkspace, groupRows, hasVisibleLight} from '../web/workspace-data.js';

test('Eisenbach 2015 keeps the blue secondary peak outside primary-focus scatter data', () => {
  const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
  const catalog = load();
  const lens = createWorkspace(catalog, data).domains.find(domain => domain.id === 'metalens');
  const rows = lens.rows.filter(row => row.study_id === 'eisenbach2015dualfzp');
  const values = suffix => rows.find(row => row.id === 'eisenbach2015dualfzp_' + suffix).values;
  assert.equal(rows.length, 12);
  assert.equal(new Set(rows.map(row => row.specimen_id)).size, 4);
  assert.deepEqual(groupRows(rows).map(group => group.paper), ['device-eisenbach_dual_fzp_pdf_2015']);
  assert.ok(rows.every(row => hasVisibleLight(lens, row)));
  assert.deepEqual(['blue','red'].map(color => {
    const laser = values('laser_'+color);
    return [laser.wavelength_nm.value, laser.measured_focal_um.value, laser.polarization.linear_axis, laser.psf_protocol.axial_scan_step_um];
  }), [[460,1000,'horizontal',null],[650,1000,'vertical',null]]);
  assert.equal(values('laser_blue').secondary_axial_peak_um.value, 1400);
  assert.equal(values('specimen').focus_variation_um.value, null);
  assert.equal(values('specimen').diameter_um.value, null);
  assert.equal(values('linear_control').aperture_width_um.value, 200);
  assert.equal(values('white_axial_blue').psf_protocol.axial_scan_step_um, 50);
  assert.deepEqual(values('dual_blue').wavelength_nm.reported_wavelengths_nm, [450,460]);
  assert.equal(values('dual_blue').simulated_focal_um.value, null);
  assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length, 2);
  assert.equal(axisPoints(rows,'wavelength_nm','secondary_axial_peak_um').length, 1);
  assert.equal(axisPoints(rows,'wavelength_nm','axial_focus_offset_um').length, 0);

  const invalid = structuredClone(data);
  const blue = invalid.domains.metalens.rows.find(row => row.id === 'eisenbach2015dualfzp_laser_blue').values;
  blue.secondary_axial_peak_um.reference_plane = 'unspecified';
  assert.throws(() => validateDevices(invalid,catalog), /secondary axial focus context/);
});
