import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {createWorkspace, axisPoints, groupRows, hasVisibleLight} from '../web/workspace-data.js';

const raw = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const workspace = createWorkspace(load(), raw);
const metalenses = workspace.domains.find(domain => domain.id === 'metalens');
const sun = metalenses.rows.filter(row => row.study_id === 'sun2025duv');

test('Sun separates bare interferometry from the LWIR compounds within one publication', () => {
  assert.equal(groupRows(sun).length, 1);
  assert.equal(new Set(sun.map(row => row.specimen_id)).size, 7);
  assert.equal(sun.length, 8);
  assert.equal(sun.filter(row => hasVisibleLight(metalenses, row)).length, 0);
  assert.deepEqual(sun.filter(row => row.values.strehl).map(row => [
    row.specimen_id, row.values.wavelength_nm.value, row.values.strehl.value
  ]), [['v5_bare', 3390, .9024], ['v5_bare', 9240, .93], ['v6_bare', 9240, .97]]);
  assert.equal(axisPoints(sun, 'wavelength_nm', 'measured_focal_um').length, 0);
  assert.equal(axisPoints(sun, 'diameter_um', 'focus_variation_um').length, 0);
  const [equivalentFnumber] = sun.filter(row => row.values.fnumber);
  assert.equal(equivalentFnumber.specimen_id, 'baf2_fnumber');
  assert.equal(equivalentFnumber.values.fnumber.value, 1.5);
  assert.equal(equivalentFnumber.values.fnumber.normalization_aperture_um, 38000);
  assert.equal(equivalentFnumber.values.fnumber.approximate, true);
  assert.equal(workspace.sources.get('device-sun_duv_datacite_2025').publication_source,
    groupRows(sun)[0].paper);
});
