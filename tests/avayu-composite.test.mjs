import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data),lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='avayu2017'),get=id=>rows.find(r=>r.id==='avayu2017_'+id).values;

test('one 2017 composite publication separates seven optical, system and model configurations rather than seventeen physical samples',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,17);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,7);assert.equal(groupRows(rows).length,1);assert.ok(rows.every(r=>hasVisibleLight(lens,r)&&r.paper==='device-avayu_composite_2017'));
 assert.equal(atlas.sources.get('device-avayu_composite_si_2017').publication_source,'device-avayu_composite_2017');assert.equal(atlas.sources.get('device-avayu_composite_2017').bibliography.authors,'Avayu, O., Almeida, E., Prior, Y. & Ellenbogen, T.');
 for(const r of rows)for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
});
test('disc diameters, relay NA and projected image size cannot become lens aperture or a fabricated continuous achromatic band',()=>{
 for(const r of rows){assert.equal(r.values.lambda_min_nm,undefined);assert.equal(r.values.lambda_max_nm,undefined);assert.ok(!Number.isFinite(r.values.diameter_um?.value));assert.ok(!Number.isFinite(r.values.na?.value));assert.equal(r.values.strehl,undefined);}
 const v=get('rgb_summary');assert.equal(v.design_focal_um.value,1000);assert.equal(v.height_nm.value,null);assert.match(v.na.note,/0.42.*不是超透镜NA/);assert.match(v.diameter_um.note,/500μm.*未独立定义清孔径/);assert.match(v.material.note,/S2实测盘径Au125\/Ag85\/Al120nm/);
 assert.deepEqual([450,550,650].map(w=>get('rgb_'+w).wavelength_nm.value),[450,550,650]);assert.match(v.psf_protocol.value,/20个平面/);assert.match(v.psf_protocol.note,/实际步长\/范围.*像素到物方标定/);
});
test('direct blue and green FWHM values retain micrometres while red main-versus-SI disagreement remains unresolved',()=>{
 for(const [w,fw]of [[450,2.11],[550,2.43]]){const v=get('rgb_'+w);assert.equal(v.fwhm_um.value,fw);assert.equal(v.fwhm_um.basis,'measured');assert.match(v.fwhm_um.note,/视觉核为μm/);assert.equal(v.fwhm_x_um.value,null);assert.equal(v.fwhm_y_um.value,null);}
 const red=get('rgb_650').fwhm_um;assert.equal(red.value,null);assert.equal(red.basis,'unresolved');assert.deepEqual(red.reported_values_um,{main_fig2d:2.6,si_figS4_caption:2.3});assert.deepEqual(red.sourceIds,['device-avayu_composite_2017','device-avayu_composite_si_2017']);assert.match(red.note,/不择一或平均/);
 assert.equal(axisPoints(rows,'wavelength_nm','fwhm_um').length,2);assert.equal(axisPoints(rows,'wavelength_nm','fwhm_x_um').length,0);
});
test('measured RGB efficiency range and incomplete beam-waist ROI never become assigned per-channel efficiencies, a mean or a presumed circular 1/e² aperture',()=>{
 for(const id of ['rgb_summary','rgb_450','rgb_550','rgb_650','rgb_residual']){const v=get(id);assert.equal(v.efficiency_at_lambda_pct.value,null);assert.match(v.efficiency_at_lambda_pct.display,/5.8–8.7%/);assert.equal(v.efficiency_band_mean_pct,undefined);assert.equal(v.efficiency_protocol.integration_geometry,null);assert.equal(v.efficiency_protocol.width_definition,null);assert.equal(v.efficiency_protocol.encircled_fraction_approx,.86);assert.match(v.efficiency_protocol.note,/不因86%而假定1\/e²圆圈/);}
 assert.equal(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,0);assert.equal(axisPoints(lens.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,161);
 const m=get('pfzp_model');assert.equal(m.efficiency_at_lambda_pct.value,null);assert.equal(m.efficiency_at_lambda_pct.basis,'model');assert.match(m.efficiency_at_lambda_pct.note,/40%.*4倍.*模拟/);
});
test('plotted focal positions and image acquisition planes do not become exact measured focal distances or zero residual shifts',()=>{
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,48);
 for(const r of rows){assert.ok(!Number.isFinite(r.values.measured_focal_um?.value));assert.equal(r.values.axial_focus_offset_um,undefined);assert.equal(r.values.focus_variation_um,undefined);}
 assert.match(get('rgb_residual').measured_focal_um.note,/蓝圈|理论曲线/);assert.match(get('rgb_residual').chromatic.note,/<10%.*串扰/);
 for(const f of [300,400,500]){const v=get('anomalous_'+f);assert.equal(v.design_focal_um.value,f);assert.equal(v.wavelength_nm.value,null);assert.match(v.measured_focal_um.note,/实际单色λ也未单列/);}
});
test('STED shape demonstration and direct RGB imaging cannot inherit ordinary-lens widths or claim a measured STED resolution, MTF or reconstruction quality',()=>{
 for(const l of [1,4]){const v=get('sted_l'+l);assert.equal(v.wavelength_nm.value,null);assert.deepEqual(v.wavelength_nm.design_wavelengths_nm,[550,650]);assert.equal(v.design_focal_um.value,1000);assert.equal(v.fwhm_um,undefined);assert.equal(v.efficiency_at_lambda_pct,undefined);assert.match(v.psf_protocol.note,/不是实际荧光STED分辨率/);}
 const v=get('imaging');assert.equal(v.wavelength_nm.value,null);assert.equal(v.system_contrast_protocol,undefined);assert.equal(v.psnr_db,undefined);assert.match(v.psf_protocol.note,/没有PSNR\/SNR/);
});
test('published PDF checks and bounded repository searches preserve available figures without claiming public raw arrays or an MTF recomputation',()=>{
 const a=atlas.sources.get('device-avayu_composite_2017'),s=atlas.sources.get('device-avayu_composite_si_2017');assert.match(a.scope,/1477087字节.*2b4c620/);assert.match(s.scope,/974259字节.*9d30b6/);assert.match(a.scope,/DataCite精确关联1条arXiv预印本非数据/);assert.match(a.scope,/影片未读取/);
 const m=get('rgb_summary').mtf_curve;for(const k of ['raw_psf','author_numeric_mtf','atlas_recomputed_mtf'])assert.equal(m[k],null);assert.match(m.note,/作者合理请求.*未联系作者/);assert.match(m.note,/GitHub.*0/);
});
