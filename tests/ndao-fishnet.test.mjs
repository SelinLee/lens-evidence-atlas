import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data),lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='ndao2020'),get=id=>rows.find(r=>r.id==='ndao2020_'+id).values;
const waves=[640,700,800,900,1000,1100,1200];

test('one classic publication owns three fabricated diameters, separately unassigned figure sets and a square design, not thirty new lenses',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,30);assert.equal(groupRows(rows).length,1);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,8);assert.equal(rows.filter(r=>/^d(10|15|20)$/.test(r.specimen_id)).length,24);
 for(const id of ['pdf','si','cloud','kante','lab'])assert.equal(atlas.sources.get('device-ndao_fishnet_'+id+'_2020').publication_source,'device-ndao_fishnet_2020');assert.equal(atlas.sources.get('device-ndao_fishnet_2020').bibliography.locator,'3205');assert.equal(atlas.sources.get('device-ndao_fishnet_2020').bibliography.authors,'Ndao, A. et al.');
 for(const r of rows)for(const v of Object.values(r.values))for(const s of valueSources(v))assert.ok(atlas.sources.has(s));
});
test('explicit SI NA values remain attached to D15 and D20 while main Figure 3 NA0.12 does not silently become D10',()=>{
 for(const [d,n]of [[10,null],[15,.1],[20,.077]])for(const tag of ['summary',...waves]){const v=get('d'+d+'_'+tag);assert.equal(v.diameter_um.value,d);assert.equal(v.na.value,n);assert.equal(v.height_nm.value,350);assert.match(v.material.value,/BK7.*SiO2/);assert.match(v.na.note,/10μm不凭剩余选项继承/);}
 const r=rows.find(r=>r.id==='ndao2020_main_psf_unassigned');assert.equal(r.configuration_role,'unassigned_measurement_set');assert.deepEqual(r.candidate_specimen_ids,['d10','d15','d20']);assert.equal(r.values.na.value,.12);assert.equal(r.values.diameter_um.value,null);assert.equal(axisPoints(rows,'diameter_um','na').length,16);
});
test('actual 640 and 700 nm spectral rows are visible while 800 through 1200 nm cannot inherit visibility from the broad work band',()=>{
 for(const d of [10,15,20]){const rs=rows.filter(r=>r.specimen_id==='d'+d&&Number.isFinite(r.values.wavelength_nm?.value));assert.deepEqual(rs.map(r=>r.values.wavelength_nm.value),waves);assert.deepEqual(rs.filter(r=>hasVisibleLight(lens,r)).map(r=>r.values.wavelength_nm.value),[640,700]);}
 assert.equal(rows.filter(r=>hasVisibleLight(lens,r)).length,15);
});
test('focal length, scalar residual, width and Strehl curves never turn into guessed points, geometric inversions or zero aberration',()=>{
 for(const d of [10,15,20])for(const tag of ['summary',...waves]){const v=get('d'+d+'_'+tag);assert.equal(v.design_focal_um.value,null);assert.equal(v.measured_focal_um.value,null);assert.equal(v.fwhm_um.value,null);assert.equal(v.strehl.value,null);assert.deepEqual(v.strehl.bound,{relation:'>',value:.8});assert.match(v.strehl.note,/第二暗环.*未知/);assert.equal(v.psf_protocol.axial_step_um,null);assert.equal(v.psf_protocol.measurement_repeat_count,null);assert.equal(v.focus_variation_um,undefined);assert.equal(v.axial_focus_offset_um,undefined);}
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,39);
});
test('about seventy percent is an author publication-level mean with no aperture assignment and cannot create three diameter-specific efficiencies',()=>{
 const v=get('efficiency_aggregate'),e=v.efficiency_band_mean_pct;assert.equal(e.value,70);assert.equal(e.approximate,true);assert.equal(e.aggregation_scope,'publication_unassigned_devices');assert.equal(e.basis,'derived_from_measurement');assert.equal(e.calculation_origin,'authors');assert.equal(e.sampling,'not_reported');assert.equal(e.statistic,'band_mean');assert.equal(v.diameter_um.value,null);assert.equal(v.na.value,null);assert.equal(v.wavelength_nm.value,null);assert.equal(v.efficiency_protocol.device_assignment,'unassigned');assert.match(e.display,/论文级平均.*口径未分派/);assert.match(e.note,/摘要用over70%.*未重算/);
 assert.equal(axisPoints(rows,'lambda_min_nm','efficiency_band_mean_pct').length,1);assert.equal(axisPoints(rows,'na','efficiency_band_mean_pct').length,0);assert.equal(axisPoints(lens.rows,'na','efficiency_band_mean_pct').length,13);
 for(const d of [10,15,20])for(const tag of ['summary',...waves]){const x=get('d'+d+'_'+tag);assert.equal(x.efficiency_band_mean_pct,undefined);assert.equal(x.efficiency_at_lambda_pct.value,null);assert.equal(x.efficiency_protocol.integration_geometry,null);assert.match(x.efficiency_protocol.value,/size=3×FWHM.*半径\/直径未明/);}
 assert.equal(axisPoints(lens.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,120);
});
test('polarization axes, PSF coordinate axes and missing MTF are kept distinct while raw PSF and frequency units stay unknown',()=>{
 for(const p of ['x','y']){const v=get('polarization_'+p);assert.equal(v.diameter_um.value,null);assert.equal(v.na.value,null);assert.deepEqual(v.wavelength_nm.sample_wavelengths_nm,waves);assert.match(v.polarization.note,/不是PSF横纵FWHM或MTF/);assert.equal(v.fwhm_x_um,undefined);assert.equal(v.fwhm_y_um,undefined);}
 const m=get('main_psf_unassigned').mtf_curve,a=m.data_availability;assert.equal(a.status,'no_mtf_in_checked_material');for(const k of ['author_numeric_mtf','raw_psf','independently_recomputed_mtf','spatial_frequency_unit','object_plane_pixel_size_um'])assert.equal(a[k],null);assert.match(m.note,/Data\/Code均合理请求/);assert.match(m.note,/未估曲线或复算/);
});
test('square model and unclassified angular curve do not inherit experimental protocols, circular aperture, absolute efficiency or a ten-degree FOV',()=>{
 const m=get('design_square20');assert.equal(m.diameter_um.value,null);assert.equal(m.diameter_um.reported_square_side_um,20);assert.equal(m.height_nm.basis,'model');assert.equal(m.psf_protocol.basis,'model');assert.equal(m.illumination.basis,'model');assert.equal(m.efficiency_protocol.basis,'model');assert.match(m.material.note,/每元素百次模拟非100片实物/);assert.equal(m.measured_focal_um,undefined);
 const a=get('angle_summary');assert.equal(a.diameter_um.value,null);assert.deepEqual(a.illumination.reported_incident_angles_deg,[0,2,4,6,8,10]);assert.match(a.illumination.note,/不填绝对聚焦效率.*不改成10°FOV/);assert.equal(a.aoi_deg,undefined);assert.equal(a.fov_deg,undefined);assert.equal(a.efficiency_at_lambda_pct,undefined);
});
test('current official files, methods and bounded author-repository searches retain actual access and data-request scopes',()=>{
 const p=atlas.sources.get('device-ndao_fishnet_pdf_2020'),s=atlas.sources.get('device-ndao_fishnet_si_2020'),c=atlas.sources.get('device-ndao_fishnet_cloud_2020');assert.match(p.scope,/1911019.*80166841/);assert.match(s.scope,/953635.*cd067092/);assert.match(s.scope,/0嵌入附件/);assert.match(c.scope,/is_manuscript=false.*is_retracted=false/);assert.match(c.scope,/9对象/);assert.match(atlas.sources.get('device-ndao_fishnet_lab_2020').scope,/DataCite.*total0.*GitHub.*各0/);
});
test('an unassigned publication mean cannot gain a diameter, NA, single wavelength or atlas calculation attribution without failing validation',()=>{
 for(const change of [v=>v.diameter_um.value=15,v=>v.na.value=.1,v=>v.wavelength_nm.value=640,v=>v.efficiency_protocol.device_assignment='d15',v=>v.efficiency_band_mean_pct.calculation_origin='atlas']){const bad=structuredClone(data);change(bad.domains.metalens.rows.find(r=>r.id==='ndao2020_efficiency_aggregate').values);assert.throws(()=>validateDevices(bad,catalog),/publication efficiency assignment/);}
});
