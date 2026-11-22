import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data),lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='javed2026'),get=id=>rows.find(r=>r.id==='javed2026_'+id).values;
const waves=[488,510,532,555,576,598,610,633];

test('2026 original text belongs to one publication and separates the fabricated pupil configurations, imaging system and three models',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,47);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,6);assert.equal(groupRows(rows).length,1);assert.ok(rows.every(r=>hasVisibleLight(lens,r)&&r.paper==='device-javed_twinlever_2026'));
 assert.equal(rows.filter(r=>r.specimen_id==='full_pupil').length,17);assert.equal(rows.filter(r=>r.specimen_id==='quarter_pupil').length,9);assert.equal(atlas.sources.get('device-javed_twinlever_pmc_2026').publication_source,'device-javed_twinlever_2026');assert.equal(atlas.sources.get('device-javed_twinlever_2026').bibliography.locator,'e77477');assert.equal(atlas.sources.get('device-javed_twinlever_2026').bibliography.volume,undefined);
 for(const r of rows)for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
});
test('distributed design limits, axial centroid and maximum-intensity plane never become an ordinary scalar focal length, measured focus or zero chromatic shift',()=>{
 const v=get('full_summary');assert.equal(v.diameter_um.value,1000);assert.equal(v.height_nm.value,400);assert.equal(v.na.value,null);assert.equal(v.design_focal_um.value,null);assert.equal(v.design_focal_um.reported_focal_min_um,250);assert.equal(v.design_focal_um.reported_focal_span_um,1100);assert.match(v.design_focal_um.note,/轴向质心也不等于.*最大强度焦面/);assert.match(v.height_nm.note,/Cr40nm.*移除/);
 for(const r of rows){assert.ok(!Number.isFinite(r.values.measured_focal_um?.value));assert.equal(r.values.axial_focus_offset_um,undefined);assert.equal(r.values.focus_variation_um,undefined);assert.equal(r.values.measured_focal_band_mean_um,undefined);}
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,57);
});
test('eight full-pupil experimental wavelengths in both spin channels remain separate from simulated samples and an unresolved truncated-pupil wavelength',()=>{
 for(const pol of ['rcp','lcp'])assert.deepEqual(rows.filter(r=>r.id.startsWith('javed2026_'+pol+'_')).map(r=>r.values.wavelength_nm.value),waves.map(w=>w===576?null:w));
 const q=get('quarter_wave_conflict').wavelength_nm;assert.equal(q.value,null);assert.equal(q.basis,'unresolved');assert.deepEqual(q.reported_wavelengths_nm,[575,576]);assert.match(q.display,/575nm.*576nm/);
 assert.deepEqual(get('model40').wavelength_nm.simulation_wavelengths_nm,[488,524,596,633]);assert.equal(get('model20_distributed').wavelength_nm.value,560);assert.equal(get('model20_distributed').wavelength_nm.basis,'model');
});
test('only full-pupil RCP at 633 nm receives the directly reported 19 percent efficiency and its incomplete ROI and polarization protocol',()=>{
 const v=get('rcp_633');assert.equal(v.efficiency_at_lambda_pct.value,19);assert.equal(v.efficiency_at_lambda_pct.basis,'measured');assert.equal(v.efficiency_lambda_nm.value,633);assert.match(v.efficiency_at_lambda_pct.reading_version,/正式PMC主PDF及SI/);assert.match(v.efficiency_at_lambda_pct.display,/正文直报.*谱内最大值/);assert.equal(v.efficiency_protocol.integration_geometry,null);assert.equal(v.efficiency_protocol.denominator_measurement_plane,null);assert.match(v.efficiency_protocol.note,/不假定3×FWHM/);
 assert.equal(rows.filter(r=>Number.isFinite(r.values.efficiency_at_lambda_pct?.value)).length,1);assert.equal(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,1);assert.equal(axisPoints(lens.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,184);
 for(const r of rows){assert.equal(r.values.efficiency_band_mean_pct,undefined);assert.equal(r.values.operation_efficiency_at_lambda_pct,undefined);}
 for(const w of waves){const a=get('lcp_'+w);assert.equal(a.efficiency_at_lambda_pct,undefined);assert.equal(a.efficiency_protocol,undefined);assert.equal(a.fwhm_um.value,null);assert.match(a.fwhm_um.note,/不继承RCP/);}
});
test('measured FWHM range and simulated widths cannot become per-wavelength scalar widths or inherited vortex widths',()=>{
 for(const w of waves){const v=get('rcp_'+w);assert.equal(v.fwhm_um.value,null);assert.match(v.fwhm_um.display,/1.24–1.28μm/);assert.match(v.fwhm_um.note,/模拟0.84–0.93μm/);assert.equal(v.fwhm_x_um,undefined);assert.equal(v.fwhm_y_um,undefined);}
 assert.equal(axisPoints(rows,'wavelength_nm','fwhm_um').length,0);
});
test('truncating one millimetre device is a pupil change rather than a fabricated 250 micrometre lens or a known effective NA',()=>{
 const q=get('quarter_633');assert.equal(q.diameter_um.value,1000);assert.equal(q.illumination.aperture_ratio,.25);assert.equal(q.illumination.effective_aperture_um,250);assert.equal(q.illumination.effective_aperture_origin,'atlas');assert.equal(q.illumination.effective_aperture_um,q.diameter_um.value*q.illumination.aperture_ratio);assert.equal(q.na.value,null);assert.match(q.polarization.value,/偏振未.*单列/);assert.equal(q.efficiency_at_lambda_pct,undefined);assert.match(q.fwhm_um.note,/轴向宽度不等横向PSF/);
 for(const id of ['imaging_rcp','imaging_lcp']){const v=get(id);assert.equal(v.wavelength_nm.value,null);assert.match(v.psf_protocol.value,/固定成像面/);assert.match(v.psf_protocol.note,/两模式取不同组元素/);assert.equal(v.measured_focal_um,undefined);assert.equal(v.fov_deg,undefined);}
});
test('small simulated devices and a fixed simulation observation plane stay outside fabricated-lens geometry and measured focal positions',()=>{
 const m=get('model40');assert.equal(m.diameter_um.value,40);assert.equal(m.diameter_um.basis,'model');assert.equal(m.design_focal_um.value,null);assert.match(m.design_focal_um.note,/61.125μm.*不是单一设计焦距/);
 for(const id of ['model20_distributed','model20_conventional']){const v=get(id);assert.equal(v.diameter_um.value,20);assert.equal(v.na.value,.33);assert.equal(v.design_focal_um.value,28.19);assert.equal(v.design_focal_um.basis,'model');assert.equal(v.height_nm,undefined);assert.equal(v.measured_focal_um,undefined);}
 assert.equal(axisPoints(rows,'diameter_um','design_focal_um').length,18);
});
test('readable primary prose, delayed official figure loading and recovered supplements, and the bounded data search keep distinct evidence scopes',()=>{
 const s=atlas.sources.get('device-javed_twinlever_pmc_2026');assert.match(s.scope,/203.*62167字符/);assert.match(s.scope,/等待文章DOM.*43图像元素/);assert.match(s.scope,/已视觉核Fig.2–6/);assert.match(s.scope,/前批未取得\/读取SI.*新云200取得PDF\/SI/);assert.equal(atlas.sources.get('device-javed_twinlever_fig4_2026').publication_source,'device-javed_twinlever_2026');assert.equal(atlas.sources.get('device-javed_twinlever_fig6_2026').publication_source,'device-javed_twinlever_2026');
 const m=get('full_summary').mtf_curve;for(const k of ['raw_psf','author_numeric_mtf','atlas_recomputed_mtf'])assert.equal(m[k],null);assert.match(m.note,/DataCite精确关联0.*GitHub.*0/);assert.match(m.note,/未联系作者.*未估图或复算/);
});
