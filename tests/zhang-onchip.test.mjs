import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data);
const lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='zhang2025'),get=id=>rows.find(r=>r.id==='zhang2025_'+id).values;

test('one 2025 publication owns single-lens, array characterization, mounted system and direct chip configurations',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,17);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,4);assert.equal(groupRows(rows).length,1);
 assert.ok(rows.every(r=>r.paper==='device-zhang_onchip_2025'&&hasVisibleLight(lens,r)));
 for(const id of ['zhang_onchip_si_2025','zhang_onchip_review_2025'])assert.equal(atlas.sources.get('device-'+id).publication_source,'device-zhang_onchip_2025');
 for(const r of rows)for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
 assert.equal(atlas.sources.get('device-zhang_onchip_2025').bibliography.locator,'7485');
});

test('aggregate focal position and variation never become six fabricated exact focal lengths',()=>{
 const summary=get('unit_summary'),spectra=rows.filter(r=>r.specimen_id==='unit_30'&&Number.isFinite(r.values.wavelength_nm.value));
 assert.deepEqual(spectra.map(r=>r.values.wavelength_nm.value),[460,488,540,580,610,650]);
 assert.equal(summary.focus_variation_pct.value,5);assert.equal(summary.focus_variation_pct.denominator,'not_defined');assert.equal(summary.focus_variation_pct.reference_focal_um,null);assert.equal(summary.focus_variation_um,undefined);
 for(const r of spectra){assert.equal(r.values.measured_focal_um.value,null);assert.equal(r.values.design_focal_um.value,null);assert.equal(r.values.fwhm_um.value,null);assert.equal(r.values.strehl.value,null);assert.equal(r.values.focus_variation_pct,undefined);}
 assert.match(summary.chromatic.value,/97.33/);assert.equal(axisPoints(rows,'wavelength_nm','measured_focal_um').length,0);assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,18);
});

test('80.39 percent remains a single band mean and array aggregate errors do not gain an invented denominator or SD',()=>{
 assert.equal(get('unit_summary').efficiency_band_mean_pct.value,80.39);assert.match(get('unit_summary').efficiency_protocol.value,/半径3×FWHM/);
 assert.equal(axisPoints(rows,'na','efficiency_band_mean_pct').length,1);assert.equal(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,0);
 for(const r of rows.filter(r=>r.specimen_id!=='unit_30'))assert.equal(r.values.efficiency_band_mean_pct,undefined);
 assert.match(get('array_summary').efficiency_protocol.value,/67%±2%/);assert.match(get('array_summary').efficiency_protocol.note,/SD\/n25/);
 assert.equal(get('mounted_system').chromatic.basis,'reconstruction');assert.equal(get('mounted_system').na,undefined);assert.equal(get('mounted_system').diameter_um,undefined);
});

test('array green-wavelength labels, focal axis units and direct chip NA conflicts stay visible',()=>{
 assert.match(get('array_535').chromatic.value,/队列效率\/f曲线/);assert.ok(!get('array_535').chromatic.value.includes('轴向PSF图'));
 assert.match(get('array_540').chromatic.value,/轴向PSF图/);assert.ok(!get('array_540').chromatic.value.includes('队列效率'));
 assert.match(get('array_535').measured_focal_um.note,/μm.*mm/);assert.equal(get('array_535').measured_focal_um.value,null);
 const direct=get('direct_8x8');assert.equal(direct.na.value,null);assert.equal(direct.na.basis,'unresolved');assert.equal(direct.diameter_um.value,2*direct.diameter_um.original_radius_um);assert.equal(direct.design_focal_um.value,125);
 assert.ok(Math.abs(26/Math.hypot(26,125)-.155)>.04);assert.ok(rows.every(r=>typeof r.values.mtf_curve.value==='string'));
});

test('percent focal variation requires actual spectra, author calculation, protocol and explicit unknown references',()=>{
 for(const change of [r=>delete r.values.focus_variation_protocol,r=>r.values.wavelength_nm.value=460,r=>r.values.focus_variation_pct.value=-5,r=>r.values.focus_variation_pct.sample_wavelengths_nm=[460],r=>r.values.focus_variation_pct.basis='model',r=>delete r.values.focus_variation_pct.denominator,r=>delete r.values.focus_variation_pct.reference_focal_um]){
  const d=structuredClone(data);change(d.domains.metalens.rows.find(r=>r.id==='zhang2025_unit_summary'));assert.throws(()=>validateDevices(d,catalog),/focal variation/);
 }
});
