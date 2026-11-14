import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data);
const lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='fan2019'),get=id=>rows.find(r=>r.id==='fan2019_'+id).values;

test('Fan 2019 is one publication with single lens, array characterization and two reconstruction systems',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,34);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,4);assert.equal(groupRows(rows).length,1);
 assert.ok(rows.every(r=>r.paper==='device-fan_array_2019'&&hasVisibleLight(lens,r)));
 assert.equal(atlas.sources.get('device-fan_array_si_2019').publication_source,'device-fan_array_2019');assert.equal(atlas.sources.get('device-fan_array_2019').bibliography.locator,'67');
 for(const r of rows)for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
});

test('the author average focal length never becomes a design value or eight identical measured focal lengths',()=>{
 const summary=get('single_summary');assert.equal(summary.measured_focal_band_mean_um.value,81.5);assert.equal(summary.measured_focal_band_mean_um.approximate,true);assert.equal(summary.measured_focal_band_mean_um.statistic,'author_reported_spectral_mean');assert.equal(summary.design_focal_um.value,null);
 const spectral=rows.filter(r=>r.specimen_id==='single_14'&&Number.isFinite(r.values.wavelength_nm.value));assert.deepEqual(spectral.map(r=>r.values.wavelength_nm.value),[430,480,530,580,630,680,730,780]);
 for(const r of spectral){const v=r.values;assert.equal(v.measured_focal_um.value,null);assert.equal(v.measured_focal_band_mean_um,undefined);assert.equal(v.fwhm_x_um.value,null);assert.equal(v.fwhm_y_um.value,null);assert.equal(v.na.value,.086);assert.equal(v.na.basis,'derived_from_measurement');}
 assert.equal(axisPoints(rows,'diameter_um','measured_focal_band_mean_um').length,1);assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,15);
});

test('DOF overlap and plotting inconsistencies remain evidence conditions instead of statistical errors or chromatic-shift scalars',()=>{
 const v=get('single_summary');assert.deepEqual(v.chromatic.common_focus_region_um,{min:82.5,max:89.4});assert.equal(v.chromatic.dof_relative_intensity,.95);assert.equal(v.chromatic.statistical_uncertainty,null);assert.equal(v.chromatic.error_bar_meaning,'depth_of_focus_interval');
 assert.equal(v.focus_variation_um,undefined);assert.equal(v.focus_error_um,undefined);assert.equal(v.measured_focal_band_mean_um.reported_error,undefined);assert.match(v.measured_focal_um.note,/模拟蓝方块.*实测红三角.*反写/);
 const a=get('array15_summary');assert.equal(a.na.value,null);assert.equal(a.measured_focal_band_mean_um,undefined);assert.equal(a.chromatic.common_focus_region_um,undefined);assert.match(a.measured_focal_um.note,/二级焦点/);assert.match(a.psf_protocol.note,/不把单镜/);
});

test('only the declared efficiency band mean is numeric and the reported peak wavelength does not become an inferred exact efficiency',()=>{
 assert.equal(get('single_summary').efficiency_band_mean_pct.value,47);assert.match(get('single_summary').efficiency_protocol.note,/功率分母/);assert.equal(get('single_730').efficiency_at_lambda_pct.value,null);
 for(const r of rows.filter(r=>r.specimen_id!=='single_14'))assert.equal(r.values.efficiency_band_mean_pct,undefined);
 assert.equal(axisPoints(rows,'na','efficiency_band_mean_pct').length,1);assert.equal(axisPoints(lens.rows,'na','efficiency_band_mean_pct').length,6);assert.equal(axisPoints(lens.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,92);
});

test('optical reconstruction keeps its RGB bandwidths, object depths and unresolved collection magnification',()=>{
 const small=rows.filter(r=>r.specimen_id==='array15_system'),large=rows.filter(r=>r.specimen_id==='array60_system');assert.equal(small.length,4);assert.equal(large.length,12);assert.deepEqual(small.map(r=>r.values.wavelength_nm.value),[488,532,633,null]);
 for(const r of [...small,...large]){assert.equal(r.values.chromatic.basis,'measured');assert.equal(r.values.diameter_um,undefined);assert.equal(r.values.measured_focal_band_mean_um,undefined);assert.equal(r.values.na,undefined);assert.match(r.values.illumination.note,/(?:10×|10X).*(?:20×|×20)/);}
 assert.match(get('array60_focus_D_red').chromatic.value,/focus onD/);assert.match(get('array60_focus_D_red').chromatic.note,/不是.*色散焦移/);
});

test('spectral focal means require author calculation, actual samples, protocol, aggregation and a reference plane',()=>{
 for(const change of [r=>r.values.wavelength_nm.value=530,r=>r.values.measured_focal_band_mean_um.sample_wavelengths_nm=[530],r=>r.values.measured_focal_band_mean_um.basis='model',r=>delete r.values.measured_focal_band_mean_um.reference_plane,r=>delete r.values.measured_focal_band_mean_um.aggregation_note,r=>delete r.values.psf_protocol]){
  const d=structuredClone(data);change(d.domains.metalens.rows.find(r=>r.id==='fan2019_single_summary'));assert.throws(()=>validateDevices(d,catalog),/spectral focal mean context/);
 }
});
