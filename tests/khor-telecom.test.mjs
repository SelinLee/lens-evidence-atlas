import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data),lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='khor2015'),get=id=>rows.find(r=>r.id==='khor2015_'+id).values;

test('2015 original author text belongs to one infrared line lens and one publication rather than ten specimens or RGB channels',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,10);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,1);assert.equal(groupRows(rows).length,1);assert.ok(rows.every(r=>r.paper==='device-khor_telecom_2015'&&!hasVisibleLight(lens,r)));
 for(const id of ['khor_telecom_author_2015','khor_telecom_dash_2015'])assert.equal(atlas.sources.get('device-'+id).publication_source,'device-khor_telecom_2015');assert.equal(atlas.sources.get('device-khor_telecom_2015').bibliography.locator,'5358–5362');
 for(const r of rows)for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
});

test('line-lens geometry, bandwidth and axial steps retain their dimensions without a fabricated continuous band or three exact corrected focal lengths',()=>{
 const axial=rows.filter(r=>r.id.startsWith('khor2015_axial_'));assert.deepEqual(axial.map(r=>r.values.wavelength_nm.value),[1300,1410,1550,1690,1800,1940]);
 for(const r of rows){const v=r.values;assert.equal(v.diameter_um.value,600);assert.equal(v.na.value,.04);assert.equal(v.design_focal_um.value,7500);assert.equal(v.height_nm.value,400);assert.equal(v.lambda_min_nm,undefined);assert.equal(v.lambda_max_nm,undefined);assert.equal(v.strehl,undefined);assert.match(v.diameter_um.note,/600×600μm.*线聚焦/);}
 for(const w of [1300,1410,1550,1800,1940]){assert.equal(get('axial_'+w).measured_focal_um.value,null);assert.equal(get('axial_'+w).axial_focus_offset_um,undefined);}
 assert.match(get('axial_1300').illumination.value,/线宽15nm/);assert.match(get('axial_1300').psf_protocol.value,/120μm.*0.12mm/);assert.match(get('axial_1300').psf_protocol.note,/不是横向采样或±不确定度/);assert.match(get('summary').height_nm.note,/Au30nm仅.*SEM/);
});

test('three directly reported x widths and focal-line efficiencies cannot become transverse y widths, simulated efficiencies or circular encircled energy',()=>{
 for(const [w,fw,eta]of [[1300,27.5,15],[1550,29,10],[1800,25,21]]){const v=get('axial_'+w);assert.equal(v.fwhm_x_um.value,fw);assert.equal(v.fwhm_x_um.basis,'measured');assert.equal(v.fwhm_y_um.value,null);assert.equal(v.efficiency_at_lambda_pct.value,eta);assert.equal(v.efficiency_at_lambda_pct.basis,'measured');assert.equal(v.efficiency_lambda_nm.value,w);assert.match(v.fwhm_x_um.display,/作者稿正文直报/);assert.match(v.efficiency_at_lambda_pct.reading_version,/prepublication/);assert.equal(v.efficiency_band_mean_pct,undefined);assert.equal(v.efficiency_protocol.integration_geometry,'focal_line_waist');assert.equal(v.efficiency_protocol.width_definition,'full_width_at_1_over_e_squared');assert.deepEqual(v.efficiency_protocol.denominator_geometry_um,{x:600,y:600});assert.match(v.efficiency_protocol.note,/y向积分长度.*未齐/);}
 assert.equal(axisPoints(rows,'wavelength_nm','fwhm_x_um').length,3);assert.equal(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,3);assert.equal(axisPoints(lens.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,109);
});

test('the uncorrected 1690 nm focus is a direct author-text value while its fixed-plane signed offset is an atlas calculation',()=>{
 const v=get('axial_1690');assert.equal(v.measured_focal_um.value,3830);assert.equal(v.measured_focal_um.basis,'measured');assert.match(v.measured_focal_um.display,/作者稿正文3.83mm/);const a=v.axial_focus_offset_um;assert.equal(a.value,-3670);assert.equal(a.calculation_origin,'atlas');assert.equal(a.reference_plane_um,7500);assert.equal(a.reference_wavelength_nm,null);assert.match(a.reference_plane_description,/Fig.6.*固定z7.5mm/);assert.equal(a.value,v.measured_focal_um.value-a.reference_plane_um);assert.match(a.display,/本库/);
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,1);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,34);assert.equal(axisPoints(rows,'wavelength_nm','axial_focus_offset_um').length,1);
 const d=structuredClone(data);d.domains.metalens.rows.find(r=>r.id==='khor2015_axial_1690').values.axial_focus_offset_um.value=3670;assert.throws(()=>validateDevices(d,catalog),/atlas axial offset reference\/input/);
});

test('angular curves on the fixed 7.5 mm plane never become exact AOI samples, best-focus positions or a ten-degree field of view',()=>{
 for(const w of [1300,1550,1800]){const v=get('angle_'+w);assert.equal(v.aoi_deg.value,null);assert.equal(v.aoi_deg.angle_reference,'incident_beam_to_optical_axis');assert.equal(v.aoi_deg.azimuth_deg,null);assert.equal(v.fwhm_x_um.value,null);assert.equal(v.measured_focal_um.value,null);assert.equal(v.efficiency_at_lambda_pct,undefined);assert.equal(v.fov_deg,undefined);assert.equal(v.axial_focus_offset_um,undefined);assert.match(v.psf_protocol.value,/固定z7.5mm/);assert.match(v.chromatic.note,/S4.*模拟.*未读/);}
});

test('reading and access scopes preserve original text evidence without claiming downloaded PDFs, visually checked figures or public PSF arrays',()=>{
 const a=atlas.sources.get('device-khor_telecom_author_2015'),repo=atlas.sources.get('device-khor_telecom_dash_2015');assert.match(a.scope,/限定读A–D相关正文\/图注/);assert.match(a.scope,/未视觉核图/);assert.match(a.scope,/不填写SHA/);assert.match(repo.scope,/content401.*未取得\/读取文件/);assert.match(repo.scope,/目录MD5不是本库内容校验/);
 const m=get('summary').mtf_curve;for(const key of ['raw_psf','author_numeric_mtf','atlas_recomputed_mtf'])assert.equal(m[key],null);assert.equal(m.basis,'unresolved');assert.match(m.note,/未估图或复算MTF/);
});
