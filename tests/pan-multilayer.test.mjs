import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data),lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='pan2023'),get=id=>rows.find(r=>r.id==='pan2023_'+id).values,waves=[442,509,560,600,623,646];

test('Pan 2023 is one original publication across two measured MAMs, model comparisons and imaging controls',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,22);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,7);assert.equal(groupRows(rows).length,1);assert.ok(rows.every(r=>r.paper==='device-pan_multilayer_2023'&&hasVisibleLight(lens,r)));
 for(const id of ['pan_multilayer_xml_2023','pan_multilayer_arxiv_2023'])assert.equal(atlas.sources.get('device-'+id).publication_source,'device-pan_multilayer_2023');assert.equal(atlas.sources.get('device-pan_multilayer_2023').bibliography.locator,'eadj9262');
 for(const r of rows)for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
});

test('a continuous design band never becomes continuous experimental sampling or twelve invented exact focal lengths',()=>{
 for(const [spec,na]of [['na05',.5],['na07',.7]]){
  const spectral=rows.filter(r=>r.specimen_id===spec&&r.values.wavelength_nm.value!==null);assert.deepEqual(spectral.map(r=>r.values.wavelength_nm.value),waves);
  for(const r of spectral){const v=r.values;assert.equal(v.diameter_um.value,20);assert.equal(v.na.value,na);assert.equal(v.lambda_min_nm.value,400);assert.equal(v.lambda_max_nm.value,800);assert.equal(v.lambda_min_nm.basis,'model');assert.equal(v.measured_focal_um.value,null);assert.equal(v.fwhm_x_um.value,null);assert.equal(v.efficiency_at_lambda_pct.value,null);assert.equal(v.strehl,undefined);assert.equal(v.axial_focus_offset_um,undefined);assert.match(v.psf_protocol.value,/20nm（0.02μm）/);assert.match(v.psf_protocol.note,/不是横向像素/);}
  const v=get(spec+'_summary');assert.equal(v.focus_variation_um.value,null);assert.deepEqual(v.focus_variation_um.bound,{operator:'<',value:3,unit:'μm'});assert.deepEqual(v.focus_variation_um.sample_wavelengths_nm,waves);assert.match(v.measured_focal_um.note,/正式版增加Fig.3C.*v1没有/);assert.equal(v.height_nm.value,null);
 }
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);assert.equal(axisPoints(rows,'$model','focus_variation_um').length,0);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,46);
});

test('geometric design focal lengths are explicitly atlas model calculations with dimensional inputs and rounded outputs',()=>{
 for(const [spec,na,expected]of [['na05',.5,17.32],['na07',.7,10.20]]){const v=get(spec+'_summary'),f=v.design_focal_um;assert.equal(f.value,expected);assert.equal(f.basis,'model');assert.equal(f.calculation_origin,'atlas');assert.equal(f.inputs.diameter_um,20);assert.equal(f.inputs.na,na);assert.ok(Math.abs(expected-10*Math.sqrt(1-na*na)/na)<.005);assert.match(f.display,/本库按作者设计式计算/);assert.match(f.note,/不作残余焦移相减/);}
 assert.equal(axisPoints(rows,'na','design_focal_um').length,14);
 for(const change of [r=>r.values.design_focal_um.basis='measured',r=>r.values.design_focal_um.value=25,r=>delete r.values.diameter_um,r=>r.values.na.value=1,r=>r.values.design_focal_um.inputs.na=.7]){const d=structuredClone(data);change(d.domains.metalens.rows.find(r=>r.id==='pan2023_na05_summary'));assert.throws(()=>validateDevices(d,catalog),/atlas design focal input\/formula/);}
});

test('experimental efficiency ranges remain ranges while contradictory aggregate claims never become measured band means',()=>{
 for(const [spec,min,max]of [['na05',22.5,42.7],['na07',13.3,22.1]]){const v=get(spec+'_summary');assert.deepEqual(v.mtf_curve.efficiency_range_pct,{min,max});assert.equal(v.efficiency_band_mean_pct.value,null);assert.equal(v.efficiency_band_mean_pct.basis,'unresolved');assert.match(v.efficiency_protocol.value,/直径3×FWHM/);assert.match(v.efficiency_protocol.note,/移除MAM.*aperture匹配MAM像面积/);assert.match(v.efficiency_protocol.note,/不改成半径/);}
 assert.equal(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,0);assert.equal(axisPoints(rows,'na','efficiency_band_mean_pct').length,0);assert.equal(axisPoints(lens.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,145);
});

test('the 560 nm original and rounded simulation MTFs preserve manuscript axes without becoming experimental S/T or a cutoff',()=>{
 for(const id of ['sim_original','sim_level1']){const v=get(id);assert.equal(v.wavelength_nm.value,560);assert.equal(v.wavelength_nm.basis,'model');assert.equal(v.na.value,null);assert.equal(v.mtf_curve.basis,'model');assert.equal(v.mtf_curve.frequency_unit,'author_stated_mm_inverse');assert.equal(v.mtf_curve.frequency_axis_label,'fx (mm⁻¹)');assert.equal(v.mtf_curve.direction,'fx');assert.equal(v.mtf_curve.raw_psf,null);assert.equal(v.mtf_curve.author_numeric_mtf,null);assert.equal(v.mtf_curve.atlas_recomputed_mtf,null);assert.match(v.mtf_curve.note,/不把横轴终点800当截止频率/);assert.equal(v.measured_focal_um,undefined);}
});

test('RGB imaging labels and Fresnel defocus planes cannot be misfiled as spectral PSF measurements or chromatic shifts',()=>{
 const b=get('imaging_blue');assert.equal(b.wavelength_nm.value,null);assert.equal(b.wavelength_nm.basis,'unresolved');assert.match(b.wavelength_nm.display,/450nm.*458nm/);assert.equal(get('imaging_green').wavelength_nm.value,532);assert.equal(get('imaging_red').wavelength_nm.value,633);
 for(const id of ['imaging_white','imaging_blue','imaging_green','imaging_red','fresnel_control','spherical_control']){const v=get(id);assert.equal(v.measured_focal_um,undefined);assert.equal(v.efficiency_at_lambda_pct,undefined);assert.equal(v.fwhm_x_um,undefined);}
 assert.match(get('fresnel_control').chromatic.note,/−5\/0\/\+5μm.*不是逐波长焦移/);assert.match(get('fresnel_control').na.note,/不复制MAM/);
});
