import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from '../scripts/catalog.mjs';
import {axisPoints,createWorkspace,groupRows} from '../web/workspace-data.js';

const dataset=JSON.parse(readFileSync(new URL('../data/devices.json',import.meta.url)));
const atlas=createWorkspace(load(),dataset);
const lens=atlas.domains.find(domain=>domain.id==='metalens');
const li=lens.rows.filter(row=>row.study_id==='li2021');
const row=(rows,id)=>rows.find(item=>item.id===id);

test('Li target and near-eye records remain grouped with the RGB optical bench and reference the published PDF',()=>{
 assert.equal(li.length,17);
 assert.equal(new Set(li.map(item=>item.specimen_id)).size,8);
 assert.deepEqual(groupRows(li).map(group=>group.paper),['device-li_rgb_vr_2021']);
 for(const wave of [488,532,658]){
  const values=row(li,'li2021_target_na07_target_'+wave).values;
  assert.equal(values.resolved_test_line_width_um.value,2.2);
  assert.equal(values.resolved_test_line_width_um.target_element,6);
  assert.equal(values.resolved_test_line_width_um.source,'device-li_rgb_vr_pdf_2021');
 }
 assert.deepEqual(row(li,'li2021_target_na03_target_white').values.illumination.sample_wavelengths_nm,[470,548,647]);
 const passive=row(li,'li2021_system_vr_passive').values;
 assert.equal(passive.wavelength_nm.value,548);
 assert.equal(passive.chromatic.resolved_test_dot_diameter_um,1.3);
 const scan=row(li,'li2021_system_vr_scan').values;
 assert.equal(scan.fov_deg.value,null);
 assert.deepEqual(scan.fov_deg.bound,{operator:'<',value:10});
 assert.equal(axisPoints(li,'wavelength_nm','resolved_test_line_width_um').length,3);
 assert.equal(axisPoints(li,'wavelength_nm','measured_focal_um').length,0);
});
