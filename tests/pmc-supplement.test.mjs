import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,axisPoints,groupRows,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data),lens=atlas.domains.find(d=>d.id==='metalens');
const get=id=>lens.rows.find(r=>r.id===id).values;

test('Chang new cloud copies retain the same curves-only audit and do not manufacture raw MTF or PSF',()=>{
 const v=get('chang2024_d400').mtf_curve,a=v.data_availability;
 assert.equal(a.checked_on,'2026-11-15');assert.equal(a.status,'curves_only');assert.equal(a.cloud_inventory_objects,10);assert.equal(a.cloud_inventory_truncated,false);assert.equal(a.cloud_copies_identical_to_previously_checked,true);
 for(const k of ['raw_psf','author_numeric_mtf','independently_recomputed_mtf','object_plane_pixel_size_um','normalization_method'])assert.equal(a[k],null);
 assert.equal(atlas.sources.get('device-chang_dispersion_si_2024').checked_on,'2026-11-14');
 for(const id of ['cloud','cloud_si','cloud_review'])assert.ok(valueSources(v).includes('device-chang_dispersion_'+id+'_2024'));
 assert.match(atlas.sources.get('device-chang_dispersion_cloud_si_2024').scope,/ffd9cd70.*逐字节一致.*0嵌入附件/);
});
test('recovered Javed PDF and Word SI belong to the same publication rather than an extra study or physical configuration',()=>{
 const rows=lens.rows.filter(r=>r.study_id==='javed2026');assert.equal(rows.length,47);assert.equal(groupRows(rows).length,1);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,6);
 for(const id of ['pdf','si','docx','cloud'])assert.equal(atlas.sources.get('device-javed_twinlever_'+id+'_2026').publication_source,'device-javed_twinlever_2026');
 assert.match(atlas.sources.get('device-javed_twinlever_si_2026').scope,/44嵌入XML均MathML/);assert.match(atlas.sources.get('device-javed_twinlever_docx_2026').scope,/第5个w:tbl.*无word\/embeddings/);
 assert.equal(validateDevices(data,catalog),true);
});
test('the official PDF corrects the flattened maximum-NA expression without assigning an unverified effective NA',()=>{
 const n=get('javed2026_full_summary').na;assert.equal(n.value,null);assert.match(n.display,/2\/√5≈0.8944/);assert.match(n.note,/误读2\/5=0.4/);assert.match(n.note,/This work≈0.33.*不拿比较表值覆盖/);
 const d=get('javed2026_full_summary').design_focal_um;assert.equal(d.value,null);assert.equal(d.reported_focal_min_um,250);
});
test('SI apparatus wavelength conflict remains unresolved for both full-pupil spin channels',()=>{
 for(const pol of ['rcp','lcp']){const w=get('javed2026_'+pol+'_576').wavelength_nm;assert.equal(w.value,null);assert.equal(w.basis,'unresolved');assert.deepEqual(w.reported_wavelengths_nm,[575,576]);assert.match(w.location,/SI p.10/);}
 assert.equal(get('javed2026_rcp_576').efficiency_lambda_nm.value,null);
 assert.deepEqual(get('javed2026_full_summary').wavelength_nm.sample_wavelengths_nm,[488,510,532,555,598,610,633]);
 assert.equal(get('javed2026_rcp_633').efficiency_at_lambda_pct.value,19);
});
test('Table S3 focal-position sequences use the eight printed model wavelengths and remain outside measured focal fields',()=>{
 const waves=[488,510,532,554,576,598,610,633];
 for(const [kind,values]of [['distributed',[27.61,27.29,27.69,28.50,27.02,25.72,24.49,24.44]],['conventional',[25.39,24.91,24.59,23.57,22.96,22.36,21.96,21.47]]]){
  for(const [i,w]of waves.entries()){const v=get('javed2026_model20_'+kind+'_'+w);assert.equal(v.wavelength_nm.value,w);assert.equal(v.simulated_focal_um.value,values[i]);assert.equal(v.simulated_focal_um.basis,'model');assert.equal(v.simulated_focal_um.calculation_origin,'authors');assert.equal(v.simulated_focal_um.position_definition,'axial_intensity_maximum');assert.match(v.simulated_focal_um.location,new RegExp(w+'nm列'));assert.equal(v.diameter_um.value,20);assert.equal(v.na.value,.33);assert.equal(v.design_focal_um.value,28.19);assert.equal(v.measured_focal_um,undefined);assert.equal(v.efficiency_at_lambda_pct,undefined);}
 }
 const rows=lens.rows.filter(r=>r.study_id==='javed2026');assert.equal(axisPoints(rows,'wavelength_nm','simulated_focal_um').length,16);assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,41);
});
test('author unsigned shift and DoF row cannot silently become signed measured offsets or a calibrated DoF metric',()=>{
 const v=get('javed2026_model20_conventional_488');assert.equal(v.chromatic.reported_focal_shift_um,2.79);assert.equal(v.chromatic.reference_plane_um,null);assert.equal(v.chromatic.reference_wavelength_nm,null);assert.deepEqual(v.chromatic.reported_dof,{value:5.29,unit:null,threshold:null});assert.match(v.chromatic.note,/差0.01μm/);assert.equal(v.axial_focus_offset_um,undefined);assert.equal(v.focus_variation_um,undefined);
});
test('numeric simulated focus requires model wavelength, protocol and author calculation, and rejects a mixed measured value',()=>{
 const id='javed2026_model20_distributed_488';
 for(const change of [v=>v.simulated_focal_um.basis='measured',v=>v.wavelength_nm.basis='measured',v=>delete v.psf_protocol,v=>v.simulated_focal_um.calculation_origin='atlas',v=>v.measured_focal_um={...v.simulated_focal_um,basis:'measured'}]){
  const bad=structuredClone(data);change(bad.domains.metalens.rows.find(r=>r.id===id).values);assert.throws(()=>validateDevices(bad,catalog),/simulated focal context/);
 }
});
