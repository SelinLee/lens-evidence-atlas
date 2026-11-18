import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data),lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='du2025'),get=id=>rows.find(r=>r.id==='du2025_'+id).values;

test('the newer Bessel imaging study remains one publication and five physical/processing/system configurations, not thirty-two lenses',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,32);assert.equal(groupRows(rows).length,1);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,5);assert.ok(rows.every(r=>hasVisibleLight(lens,r)&&r.paper==='device-du_quasi_2025'));
 for(const id of ['pdf','lab','metadata','si_metadata'])assert.equal(atlas.sources.get('device-du_quasi_'+id+'_2025').publication_source,'device-du_quasi_2025');assert.equal(atlas.sources.get('device-du_quasi_2025').bibliography.authors,'Du, X. et al.');assert.equal(atlas.sources.get('device-du_quasi_2025').bibliography.locator,'8143–8150');
 for(const r of rows)for(const v of Object.values(r.values))for(const s of valueSources(v))assert.ok(atlas.sources.has(s));
});
test('the circular 350 micrometre lens keeps design NA and nanofin height while Bessel depth and the chosen 300 micrometre plane never become focal length',()=>{
 for(const r of rows){const v=r.values;assert.equal(v.diameter_um.value,350);assert.equal(v.na.value,.2);assert.equal(v.na.basis,'reported_configuration');assert.equal(v.height_nm.value,1200);assert.equal(v.design_focal_um.value,null);assert.ok(!Number.isFinite(v.measured_focal_um?.value));assert.equal(v.axial_focus_offset_um,undefined);assert.equal(v.focus_variation_um,undefined);assert.equal(v.focus_variation_pct,undefined);}
 assert.match(get('summary').design_focal_um.note,/857.32μm为理论无衍射距离.*不是设计f/);assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,31);
});
test('three measured longest-depth reports retain forty-percent threshold and cannot masquerade as focus or half-maximum axial DOF',()=>{
 for(const [w,n]of [[630,781],[530,858],[470,990]]){const v=get('psf0_'+w),x=v.author_longest_focal_depth_um;assert.equal(x.value,n);assert.equal(x.basis,'derived_from_measurement');assert.equal(x.calculation_origin,'authors');assert.equal(x.threshold_intensity_fraction,.4);assert.equal(x.reference_origin,null);assert.match(x.note,/非最佳f.*非轴向50%DOF宽度/);assert.equal(get('psf2_'+w).author_longest_focal_depth_um,undefined);}
 assert.equal(axisPoints(rows,'wavelength_nm','author_longest_focal_depth_um').length,3);assert.equal(Math.round(100*350/(2*Math.tan(Math.asin(.2))))/100,857.32);
});
test('the three raw printed PSF widths and three author-subtracted widths use different metrics and retain the signed sidelobe caveat',()=>{
 for(const [w,n]of [[630,.9742],[530,1.0206],[470,1.0206]]){const raw=get('psf0_'+w),post=get('psf_sub_'+w);assert.equal(raw.fwhm_um.value,1.0669);assert.equal(raw.fwhm_um.basis,'measured');assert.equal(raw.psf_protocol.evaluation_plane_um,300);assert.equal(post.processed_psf_fwhm_um.value,n);assert.equal(post.processed_psf_fwhm_um.basis,'reconstruction');assert.equal(post.processed_psf_fwhm_um.subtraction_coefficient,.3);assert.equal(post.psf_protocol.subtraction_coefficient,.3);assert.match(post.psf_protocol.note,/负值.*原始数组/);assert.equal(post.fwhm_um,undefined);assert.equal(get('psf2_'+w).fwhm_um.value,null);}
 assert.equal(axisPoints(rows,'wavelength_nm','fwhm_um').length,3);assert.equal(axisPoints(rows,'wavelength_nm','processed_psf_fwhm_um').length,3);
});
test('nine monochromatic image SNR values retain wavelength, spin channel and subtraction attribution with the author ten-log definition',()=>{
 const waves=[630,530,470];
 for(const [mode,values,basis]of [['image0',[6.80,7.25,7.16],'derived_from_measurement'],['image2',[5.54,5.86,5.55],'derived_from_measurement'],['image_sub',[9.88,10.34,9.94],'reconstruction']])for(const [i,w]of waves.entries()){
  const v=get(mode+'_'+w),s=v.image_snr_db,p=v.image_snr_protocol;assert.equal(s.value,values[i]);assert.equal(s.basis,basis);assert.equal(s.calculation_origin,'authors');assert.equal(p.formula,'10 log10(Isignal / Inoise)');assert.equal(p.roi,null);assert.equal(p.noise_estimator,null);assert.equal(p.measurement_repeat_count,null);assert.equal(v.psf_protocol.evaluation_plane_um,null);assert.match(p.note,/不改为20log10.*PSNR/);assert.match(p.target,/G3E2\/3/);assert.equal(v.psnr_db,undefined);
 }
 assert.equal(axisPoints(rows,'wavelength_nm','image_snr_db').length,9);
});
test('six white-light SNR values preserve object contrast and channel without making up a monochromatic wavelength or reusing PSF-plane metadata',()=>{
 for(const [tag,values]of [['white_usaf',[7.21,6.35,9.96]],['white_nju',[8.59,7.69,11.14]]])for(const [i,mode]of ['image0','image2','image_sub'].entries()){const v=get(mode+'_'+tag);assert.equal(v.image_snr_db.value,values[i]);assert.equal(v.wavelength_nm.value,null);assert.match(v.illumination.value,/白光/);assert.equal(v.psf_protocol.evaluation_plane_um,null);assert.match(v.image_snr_protocol.target,tag==='white_usaf'?/明物暗背景/:/暗物明背景/);}
 assert.equal(axisPoints(rows,'diameter_um','image_snr_db').length,15);
});
test('MTF curve axes and fixed planes survive without numeric thresholds, unexplained FFT assumptions or transferred processed MTF and simulated unit efficiency',()=>{
 const m=get('summary').mtf_curve,a=m.data_availability;assert.equal(m.basis,'unresolved');assert.equal(a.spatial_frequency_unit,'lp/mm');assert.equal(a.directions,null);assert.equal(a.frequency_reference_plane,null);assert.match(m.note,/不以1.0669μm.*反推/);for(const k of ['author_numeric_mtf','raw_psf','independently_recomputed_mtf','object_plane_pixel_size_um','normalization_method'])assert.equal(a[k],null);assert.match(m.note,/不能复制为2阶或减法后MTF/);
 for(const z of [200,400,500])assert.equal(get('mtf530_z'+z).psf_protocol.evaluation_plane_um,z);for(const z of [200,300,400,500]){const v=get('image_sub_z'+z);assert.equal(v.psf_protocol.evaluation_plane_um,z);assert.equal(v.image_snr_db,undefined);}
 for(const r of rows){assert.equal(r.values.efficiency_at_lambda_pct,undefined);assert.equal(r.values.efficiency_band_mean_pct,undefined);assert.equal(r.values.operation_efficiency_at_lambda_pct,undefined);assert.match(r.values.efficiency_protocol.value,/95%为模拟单元库/);}
});
test('downloaded author PDF and verified SI registration remain different from inaccessible SI contents and raw data',()=>{
 const p=atlas.sources.get('device-du_quasi_pdf_2025'),s=atlas.sources.get('device-du_quasi_si_metadata_2025');assert.match(p.scope,/7899845.*01602926/);assert.match(p.scope,/0嵌入附件.*未取得SI/);assert.match(s.scope,/is-component-of.*nl5c00695_si_001.pdf/);assert.match(s.scope,/未取得\/读取有效SI.*无SI哈希/);assert.match(s.scope,/Figshare.*403.*DataCite.*total0/);
});
test('focal-depth, processed-width and SNR contracts reject dropped thresholds, changed processing stages, mixed raw widths and missing ROI semantics',()=>{
 const cases=[['psf0_530',v=>delete v.author_longest_focal_depth_um.threshold_intensity_fraction,/author focal depth context/],['psf0_530',v=>v.author_longest_focal_depth_um.basis='measured',/author focal depth context/],['psf_sub_530',v=>v.processed_psf_fwhm_um.basis='measured',/processed PSF width context/],['psf_sub_530',v=>v.psf_protocol.subtraction_coefficient=.5,/processed PSF width context/],['psf_sub_530',v=>v.fwhm_um={...get('psf0_530').fwhm_um},/processed PSF width context/],['image_sub_530',v=>v.image_snr_db.basis='derived_from_measurement',/image SNR context/],['image0_530',v=>delete v.image_snr_protocol.roi,/image SNR context/]];
 for(const [id,change,rx]of cases){const bad=structuredClone(data);change(bad.domains.metalens.rows.find(r=>r.id==='du2025_'+id).values);assert.throws(()=>validateDevices(bad,catalog),rx);}
});
