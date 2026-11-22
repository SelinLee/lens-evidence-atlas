import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {axisPoints,createWorkspace,groupRows,hasVisibleLight} from '../web/workspace-data.js';

const devices=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const workspace=createWorkspace(load(),devices);
const lens=workspace.domains.find(domain=>domain.id==='metalens');
const rows=lens.rows.filter(row=>row.study_id==='zhang2022lwirStokes');
const suffix=id=>rows.find(row=>row.id==='zhang2022lwirStokes_'+id);
const waves=[9300,9600,10300,10600];

test('Zhang preserves the fixed-plane polarimeter and four-wavelength sub-lens evidence',()=>{
 const [group]=groupRows(rows);
 assert.equal(group.paper,'device-zhang_lwir_stokes_2022');
 assert.equal(groupRows(rows).length,1);
 assert.equal(rows.length,14);
 assert.equal(new Set(rows.map(row=>row.specimen_id)).size,6);
 assert.ok(rows.every(row=>!hasVisibleLight(lens,row)));
 assert.equal(workspace.sources.get('device-zhang_lwir_stokes_si_2022').publication_source,group.paper);
 assert.equal(suffix('polarimetry').values.psf_protocol.evaluation_plane_um,10000);
 for (const [channel,source] of [['x','device-zhang_lwir_stokes_pdf_2022'],['l','device-zhang_lwir_stokes_si_2022']]){
  const summary=suffix(channel+'_summary').values;
  assert.equal(summary.diameter_um.value,1724.3);
  assert.equal(summary.design_focal_um.value,10000);
  assert.equal(summary.na.value,null);
  assert.equal(summary.focus_variation_um.value,null);
  assert.deepEqual(summary.psf_protocol.sample_wavelengths_nm,waves);
  for(const wave of waves){
   const v=suffix(channel+'_'+wave).values;
   assert.equal(v.wavelength_nm.value,wave);
   assert.equal(v.measured_focal_um.value,null);
   assert.equal(v.fwhm_um.value,null);
   assert.equal(v.fwhm_um.source,source);
  }
 }
 assert.equal(suffix('x_cross').specimen_id,'y_channel');
 assert.equal(suffix('l_cross').specimen_id,'r_channel');
 const points=axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct');
 assert.deepEqual(points.map(point=>[point.x,point.y]),[[9300,31.8],[9600,33.5],[10300,46.2],[10600,46.3]]);
 assert.ok(points.every(point=>{
  const protocol=point.row.values.efficiency_protocol;
  return point.row.specimen_id==='x_channel'&&protocol.denominator==='incident_light_energy'&&protocol.fwhm_multiple===3&&protocol.integration_geometry===null;
 }));
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);
 assert.equal(axisPoints(rows,'wavelength_nm','fwhm_um').length,0);
});
