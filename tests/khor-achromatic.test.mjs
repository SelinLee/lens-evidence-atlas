import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data);
const lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='khor2017'),get=id=>rows.find(r=>r.id==='khor2017_'+id).values;

test('Khorasaninejad 2017 keeps one publication across a measured AML, measured GML and simulated reverse design',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,13);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,3);assert.equal(groupRows(rows).length,1);
 assert.ok(rows.every(r=>r.paper==='device-khor_achromatic_2017'&&hasVisibleLight(lens,r)));
 for(const id of ['khor_achromatic_arxiv_2017','khor_achromatic_si_2017'])assert.equal(atlas.sources.get('device-'+id).publication_source,'device-khor_achromatic_2017');
 assert.equal(atlas.sources.get('device-khor_achromatic_2017').bibliography.locator,'1819–1824');
 assert.match(atlas.sources.get('device-khor_achromatic_si_2017').scope,/未取得或读取SI内容/);
 for(const r of rows)for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
});

test('only three explicitly printed author-manuscript focal lengths and six captioned directional widths become measured numbers',()=>{
 const spectral=rows.filter(r=>/^khor2017_aml_\d+$/.test(r.id));assert.deepEqual(spectral.map(r=>r.values.wavelength_nm.value),[490,500,510,520,530,540,550]);
 for(const [w,f,x,y,panel]of [[490,491,1.29,1.27,'d'],[520,483,1.45,1.52,'e'],[550,485,1.59,1.68,'f']]){
  const v=get('aml_'+w);assert.equal(v.measured_focal_um.value,f);assert.equal(v.measured_focal_um.basis,'measured');assert.equal(v.measured_focal_um.reading_version,'arXiv:1701.06696v1');assert.match(v.measured_focal_um.location,new RegExp('Fig.5'+panel));assert.match(v.measured_focal_um.display,/arXiv v1印字/);assert.equal(v.fwhm_x_um.value,x);assert.equal(v.fwhm_y_um.value,y);assert.equal(v.design_focal_um.value,485);
 }
 for(const w of [500,510,530,540]){assert.equal(get('aml_'+w).measured_focal_um.value,null);assert.equal(get('aml_'+w).fwhm_x_um.value,null);assert.equal(get('aml_'+w).axial_focus_offset_um,undefined);}
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,3);assert.equal(axisPoints(rows,'wavelength_nm','fwhm_x_um').length,3);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,18);
});

test('fixed evaluation planes do not duplicate best-focus measurements or transfer their widths',()=>{
 for(const w of [490,520,550]){const v=get('fixed_'+w);assert.equal(v.measured_focal_um.value,null);assert.equal(v.fwhm_x_um.value,null);assert.equal(v.fwhm_y_um.value,null);assert.equal(v.axial_focus_offset_um,undefined);assert.match(v.psf_protocol.value,/固定z485/);}
 assert.match(get('aml_490').psf_protocol.note,/100nm不是本次扫描步长/);assert.match(get('aml_490').psf_protocol.value,/步长2μm/);
});

test('spectral SD and fractional variation remain separate author statistics without an invented mean or physical repeat count',()=>{
 const v=get('aml_summary');assert.equal(v.focus_variation_pct.value,1.5);assert.match(v.focus_variation_pct.denominator,/mean\(f\).*语境关联/);assert.equal(v.focus_variation_pct.reference_focal_um,null);assert.equal(v.focus_variation_um,undefined);
 const sd=v.focal_spectral_sd_um;assert.equal(sd.value,2.7);assert.equal(sd.sample_unit,'wavelength');assert.equal(sd.ddof,null);assert.equal(sd.measurement_repeat_count,null);assert.equal(sd.uncertainty,undefined);assert.equal(sd.reported_error,undefined);assert.equal(v.measured_focal_band_mean_um,undefined);
 for(const r of rows.filter(r=>r.id!=='khor2017_aml_summary'))assert.equal(r.values.focal_spectral_sd_um,undefined);
});

test('signed axial offsets are atlas calculations against the documented fixed plane and retain a real zero',()=>{
 for(const [w,offset]of [[490,6],[520,-2],[550,0]]){const v=get('aml_'+w),a=v.axial_focus_offset_um;assert.equal(a.value,offset);assert.equal(a.calculation_origin,'atlas');assert.equal(a.reference_plane_um,485);assert.equal(a.reference_wavelength_nm,null);assert.equal(a.value,v.measured_focal_um.value-a.reference_plane_um);assert.match(a.display,/本库计算/);}
 assert.equal(axisPoints(rows,'wavelength_nm','axial_focus_offset_um').length,3);assert.equal(lens.metrics.find(m=>m.id==='axial_focus_offset_um').axis_bounds,undefined);
});

test('control geometry and inaccessible efficiency evidence never become AML measurement values or raw data',()=>{
 const g=get('gml_summary'),r=get('reverse_summary');assert.equal(g.chromatic.basis,'measured');assert.equal(r.chromatic.basis,'model');assert.equal(r.measured_focal_um.value,null);assert.match(r.chromatic.value,/局部非单调/);assert.match(r.chromatic.note,/500→510nm.*550→560nm/);
 for(const v of [g,r])for(const key of ['diameter_um','na','design_focal_um','fwhm_x_um','focal_spectral_sd_um','focus_variation_pct'])assert.equal(v[key],undefined);
 for(const r of rows)assert.equal(r.values.efficiency_at_lambda_pct,undefined);assert.equal(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,0);assert.equal(axisPoints(lens.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,95);assert.equal(axisPoints(lens.rows,'na','efficiency_band_mean_pct').length,6);
 assert.match(get('aml_summary').efficiency_protocol.note,/功率分母/);assert.match(get('aml_summary').mtf_curve.value,/SI内容仍待取得/);
});

test('spectral SD validation rejects single wavelengths, repeat statistics and missing normalization context',()=>{
 for(const change of [r=>r.values.wavelength_nm.value=490,r=>r.values.focal_spectral_sd_um.sample_unit='specimen',r=>r.values.focal_spectral_sd_um.sample_wavelengths_nm=[490],r=>r.values.focal_spectral_sd_um.statistic='mean',r=>delete r.values.focal_spectral_sd_um.ddof,r=>delete r.values.focal_spectral_sd_um.measurement_repeat_count,r=>r.values.focal_spectral_sd_um.basis='measured',r=>delete r.values.focus_variation_protocol]){
  const d=structuredClone(data);change(d.domains.metalens.rows.find(r=>r.id==='khor2017_aml_summary'));assert.throws(()=>validateDevices(d,catalog),/spectral focal SD context/);
 }
});

test('atlas offset validation rejects wrong signs, invented inputs, author attribution and missing reference planes',()=>{
 for(const change of [r=>r.values.axial_focus_offset_um.value=-6,r=>r.values.measured_focal_um.value=null,r=>r.values.measured_focal_um.basis='model',r=>r.values.axial_focus_offset_um.calculation_origin='authors',r=>delete r.values.axial_focus_offset_um.reference_plane_um,r=>r.values.axial_focus_offset_um.reference_wavelength_nm=530,r=>delete r.values.psf_protocol]){
  const d=structuredClone(data);change(d.domains.metalens.rows.find(r=>r.id==='khor2017_aml_490'));assert.throws(()=>validateDevices(d,catalog),/atlas axial offset reference\/input/);
 }
});
