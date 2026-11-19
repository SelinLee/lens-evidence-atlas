import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {axisPoints, createWorkspace, groupRows, hasVisibleLight} from '../web/workspace-data.js';

test('Zhao 2015 retains the nominal plane, measured illumination and scaled model separately', () => {
  const data = JSON.parse(readFileSync(new URL('../data/devices.json', import.meta.url)));
  const lens = createWorkspace(load(),data).domains.find(domain => domain.id === 'metalens');
  const rows = lens.rows.filter(row => row.study_id === 'zhao2015geometricphase');
  const values = suffix => rows.find(row => row.id === 'zhao2015geometricphase_' + suffix).values;
  assert.equal(rows.length,18);
  assert.equal(new Set(rows.map(row=>row.specimen_id)).size,6);
  assert.equal(rows.filter(row=>hasVisibleLight(lens,row)).length,15);
  assert.deepEqual(groupRows(rows).map(group=>group.paper),['device-zhao_geometric_pdf_2015']);
  for(const [index,wave] of [532,632.8,785].entries()){
    const measured=values('multispectral_'+index), scaled=values('large_model_'+index);
    assert.equal(measured.wavelength_nm.value,wave);
    assert.equal(measured.psf_protocol.evaluation_plane_um,9);
    assert.equal(measured.psf_protocol.axial_scan_step_um,0.5);
    assert.equal(measured.measured_focal_um.value,null);
    assert.equal(measured.na.value,0.743);
    assert.equal(measured.na.basis,'model');
    assert.equal(scaled.diameter_um.value,200);
    assert.equal(scaled.simulated_focal_um.value,90);
  }
  assert.equal(values('405_solid').psf_protocol.evaluation_plane_um,10);
  assert.match(values('532_ring').chromatic.note,/x–y/);
  assert.deepEqual(values('532_linear').psf_protocol.observed_annular_feature_positions_um,[-10,10]);
  assert.equal(values('sted_model_secondary').psf_protocol.evaluation_plane_um,14);
  assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);
  assert.equal(axisPoints(rows,'wavelength_nm','simulated_focal_um').length,3);
  assert.equal(axisPoints(rows,'wavelength_nm','efficiency_at_lambda_pct').length,0);
});
