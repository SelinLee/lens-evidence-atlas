import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data),lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='hu2023'),get=id=>rows.find(r=>r.id==='hu2023_'+id).values;
const waves=[420,450,500,550,600,650,700,750,800,850,900,1000];

test('Hu main paper, correction and identical supplements stay one study with distinct fabricated comparisons and models',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,48);assert.equal(groupRows(rows).length,1);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,9);
 for(const id of ['pdf','si','correction','corrected_si','cloud'])assert.equal(atlas.sources.get('device-hu_asymptotic_'+id+'_2023').publication_source,'device-hu_asymptotic_2023');
 assert.equal(atlas.sources.get('device-hu_asymptotic_2023').bibliography.locator,'6649');assert.equal(atlas.sources.get('device-hu_asymptotic_2023').bibliography.authors,'Hu, Y. et al.');
 for(const r of rows)for(const v of Object.values(r.values))for(const s of valueSources(v))assert.ok(atlas.sources.has(s));
});
test('420 nm is the actual short-wave measurement limit; 400 nm declaration and RGB simulations cannot manufacture an experimental row',()=>{
 for(const spec of ['asymptotic','linear','reference']){
  const rs=rows.filter(r=>r.specimen_id===spec&&Number.isFinite(r.values.wavelength_nm.value));assert.deepEqual(rs.map(r=>r.values.wavelength_nm.value),waves);
  assert.deepEqual(rs.filter(r=>hasVisibleLight(lens,r)).map(r=>r.values.wavelength_nm.value),[420,450,500,550,600,650,700,750]);
  assert.equal(get(spec+'_summary').lambda_min_nm.value,400);assert.match(get(spec+'_summary').lambda_min_nm.note,/420nm/);
 }
 assert.equal(rows.filter(r=>hasVisibleLight(lens,r)).length,36);assert.ok(!rows.some(r=>r.values.wavelength_nm.value===400||r.values.wavelength_nm.value===950));
});
test('the fabricated D50 NA0.164 lens has 1000 nm structures, not the removed 230 nm ALD cap or a geometric inversion posing as focal data',()=>{
 for(const spec of ['asymptotic','linear','reference'])for(const tag of ['summary',...waves]){
  const v=get(spec+'_'+tag);assert.equal(v.diameter_um.value,50);assert.equal(v.na.value,.164);assert.equal(v.na.reported_table_na,.1644);assert.equal(v.height_nm.value,1000);assert.match(v.height_nm.note,/230nm.*非成品高度/);assert.equal(v.design_focal_um.value,null);assert.equal(v.measured_focal_um.value,null);assert.equal(v.axial_focus_offset_um,undefined);
 }
 assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,51);
});
test('a 1 um axial scan and nominal 100x objective do not supply an object-plane pixel size, repeat uncertainty or a PSF spectral bandwidth',()=>{
 const v=get('asymptotic_420'),p=v.psf_protocol;assert.equal(p.axial_step_um,1);assert.equal(p.axial_scan_stop_um,800);assert.equal(p.nominal_collection_magnification,100);assert.match(p.reference_origin,/sample surface/);assert.equal(p.object_plane_pixel_size_um,null);assert.equal(p.measurement_repeat_count,null);assert.match(p.note,/步长充当焦距不确定度/);assert.equal(v.illumination.imaging_bandwidth_nm,20);assert.equal(v.illumination.psf_bandwidth_nm,null);
});
test('only the asymptotic experimental group owns efficiency and Strehl curves; theory threshold is not a measured Strehl bound',()=>{
 for(const tag of ['summary',...waves]){const v=get('asymptotic_'+tag);assert.equal(v.efficiency_at_lambda_pct.value,null);assert.equal(v.strehl.value,null);assert.equal(v.strehl.bound,undefined);assert.equal(v.fwhm_um.value,null);assert.match(v.strehl.note,/不能填全带>0.8/);assert.equal(v.efficiency_protocol.integration_geometry,null);assert.equal(v.efficiency_protocol.denominator,'incident_light_within_metalens_range');assert.match(v.efficiency_protocol.note,/不指定r=3FWHM/);assert.equal(v.efficiency_band_mean_pct,undefined);}
 for(const spec of ['linear','reference']){const v=get(spec+'_420');assert.equal(v.efficiency_at_lambda_pct,undefined);assert.equal(v.strehl,undefined);assert.equal(v.fwhm_um,undefined);}
 assert.equal(axisPoints(lens.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,150);
});
test('custom dispersion lenses retain only the author design reference of 320 um at 650 nm and never inherit the achromatic lens NA or measured focus',()=>{
 for(const spec of ['custom_negative','custom_positive','custom_arbitrary']){const v=get(spec+'_summary');assert.equal(v.diameter_um.value,50);assert.equal(v.na.value,null);assert.equal(v.design_focal_um.value,320);assert.equal(v.design_focal_um.reference_wavelength_nm,650);assert.equal(v.design_focal_um.basis,'reported_configuration');assert.equal(v.wavelength_nm.value,null);assert.equal(v.measured_focal_um.value,null);assert.equal(v.efficiency_protocol,undefined);assert.match(v.chromatic.value,/非连续消色差结果/);}
});
test('millimetre aperture and NA0.98 belong to a scalar RGB simulation, and 1500 nm tall continuous models stay separate from the measured device',()=>{
 for(const tag of ['summary',450,531,633]){const v=get('model_rgb_'+tag);assert.equal(v.diameter_um.value,1000);assert.equal(v.na.value,.98);assert.equal(v.design_focal_um.value,100);assert.equal(v.height_nm.value,1000);for(const k of ['diameter_um','na','design_focal_um','wavelength_nm','psf_protocol'])assert.equal(v[k].basis,'model');assert.equal(v.lambda_min_nm,undefined);assert.equal(v.lambda_max_nm,undefined);assert.equal(v.measured_focal_um,undefined);assert.match(v.psf_protocol.value,/MATLAB标量/);assert.equal(v.psf_protocol.axial_step_um,null);}
 for(const [id,na,hi]of [['model_na02425',.2425,1000],['model_1500band',.1644,1500]]){const v=get(id+'_summary');assert.equal(v.diameter_um.value,50);assert.equal(v.na.value,na);assert.equal(v.height_nm.value,1500);assert.equal(v.lambda_max_nm.value,hi);assert.equal(v.height_nm.basis,'model');}
});
test('version correction and bounded data searches retain file identities without turning missing arrays into a recomputed MTF',()=>{
 assert.match(atlas.sources.get('device-hu_asymptotic_correction_2023').scope,/S10原上下排a–c\/d–f/);
 for(const id of ['si','corrected_si'])assert.match(atlas.sources.get('device-hu_asymptotic_'+id+'_2023').scope,/08d1eca8c1294bbc382f1aab8c6d16d572318d3966c824fd2b8c0fe3eec9d707/);
 const a=get('asymptotic_420').mtf_curve.data_availability;assert.equal(a.status,'no_mtf_in_checked_material');for(const k of ['author_numeric_mtf','raw_psf','independently_recomputed_mtf','spatial_frequency_unit','normalization_method','object_plane_pixel_size_um'])assert.equal(a[k],null);
 assert.match(atlas.sources.get('device-hu_asymptotic_cloud_2023').scope,/DataCite.*total0.*GitHub.*各0/);assert.match(atlas.sources.get('device-hu_asymptotic_cloud_2023').scope,/验证页拦截.*不当查无/);
});
