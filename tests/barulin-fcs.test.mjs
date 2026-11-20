import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {axisPoints, createWorkspace, groupRows, hasVisibleLight} from '../web/workspace-data.js';

const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
const catalog = load();
const atlas = createWorkspace(catalog, data);
const lens = atlas.domains.find(domain => domain.id === 'metalens');
const rows = lens.rows.filter(row => row.study_id === 'barulin2024fcs');
const values = suffix => rows.find(row => row.id === `barulin2024fcs_${suffix}`).values;
const points = (x, y) => axisPoints(rows,x,y).map(point => [point.x, point.y]);

test('the same Barulin metalens has two approximate reported focus positions and one design focal length', () => {
 assert.equal(rows.length, 4);
 assert.ok(rows.every(row => hasVisibleLight(lens, row)));
 const group = groupRows(rows)[0];
 assert.equal(group.paper,'device-barulin_fcs_2024');
 assert.equal(new Set(group.rows.map(row => row.specimen_id)).size,2);
 assert.equal(atlas.sources.get('device-barulin_fcs_si_2024').publication_source,group.paper);
 assert.equal(atlas.sources.get('device-barulin_fcs_peer_review_2024').publication_source,group.paper);
 assert.deepEqual(points('wavelength_nm','measured_focal_um'),[[635,330],[670,330]]);
 assert.deepEqual(points('diameter_um','design_focal_um'),[[500,330]]);
 assert.deepEqual(points('wavelength_nm','fwhm_x_um'),[[635,.77],[670,1.03]]);
 for (const suffix of ['lens_635','lens_670']) {
  assert.equal(values(suffix).measured_focal_um.approximate,true);
  assert.equal(values(suffix).measured_focal_um.display,'约330');
  assert.equal(values(suffix).psf_protocol.axial_step_um,1);
  assert.equal(values(suffix).psf_protocol.transverse_sample_pitch_um,null);
 }
 assert.equal(values('lens_summary').height_nm.value,500);
 assert.equal(values('lens_summary').height_nm.initial_film_thickness_nm,600);
 assert.equal(values('lens_summary').height_nm.measured_final_height_nm,null);
 assert.equal(values('lens_summary').focus_variation_um.value,null);
});

test('the 635 nm efficiency conflict remains traceable and outside numeric scatter axes', () => {
 assert.deepEqual(points('efficiency_lambda_nm','efficiency_at_lambda_pct'),[[670,37.1]]);
 const cell=values('lens_635').efficiency_at_lambda_pct;
 assert.equal(cell.value,null);
 assert.deepEqual(cell.alternative_reports.map(({value})=>value),[14.2,14.1,14.1]);
 assert.ok(cell.alternative_reports.every(({source,location,note,basis})=>
  cell.sourceIds.includes(source)&&location&&note&&basis==='derived_from_measurement'));
 assert.equal(values('lens_670').efficiency_protocol.focal_integration_radius_um,null);
 const broken = structuredClone(data);
 const conflict=broken.domains.metalens.rows.find(row=>row.id==='barulin2024fcs_lens_635').values.efficiency_at_lambda_pct;
 conflict.alternative_reports[1].source='not-a-reference';
 assert.throws(()=>validateDevices(broken,catalog),/conflicting measured reports/);
});

test('the wide fluorescence spectrum and confocal pinhole belong to the installed measurement system', () => {
 const system=values('fcs_system');
 assert.equal(system.wavelength_nm.value,null);
 assert.deepEqual(system.wavelength_nm.fluorescence_collection_band_nm,[655,700]);
 assert.equal(system.psf_protocol.excitation_wavelength_nm,635);
 assert.equal(system.psf_protocol.confocal_pinhole_um,80);
 assert.equal(system.psf_protocol.author_calculated_system_effective_focal_length_mm,6.45);
 assert.equal(system.measured_focal_um,undefined);
 assert.equal(system.efficiency_at_lambda_pct,undefined);
 assert.equal(values('lens_summary').mtf_curve.raw_psf,null);
});
