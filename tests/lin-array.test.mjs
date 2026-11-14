import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,groupRows,axisPoints,hasVisibleLight,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load(),atlas=createWorkspace(catalog,data);
const lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='lin2019'),get=id=>rows.find(r=>r.id==='lin2019_'+id);

test('Lin array main paper, author archive and SI form one publication with unit and camera configurations',()=>{
 assert.equal(validateDevices(data,catalog),true);for(const id of ['operation_efficiency_at_lambda_pct','operation_efficiency_band_mean_pct'])assert.deepEqual(lens.metrics.find(m=>m.id===id).axis_bounds,{min:0,max:100});assert.equal(rows.length,16);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,2);assert.equal(groupRows(rows).length,1);
 assert.ok(rows.every(r=>r.paper==='device-lin_array_2019'&&hasVisibleLight(lens,r)));
 for(const id of ['lin_array_full_2019','lin_array_si_2019'])assert.equal(atlas.sources.get('device-'+id).publication_source,'device-lin_array_2019');
 for(const r of rows)for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
 assert.equal(atlas.sources.get('device-lin_array_2019').bibliography.short,'Nat. Nanotechnol.');
});

test('design focal length and collection objectives never backfill fourteen missing measured focal lengths',()=>{
 const spectral=rows.filter(r=>Number.isFinite(r.values.wavelength_nm.value));assert.deepEqual(spectral.map(r=>r.values.wavelength_nm.value),Array.from({length:14},(_,i)=>400+20*i));
 for(const r of spectral){const v=r.values;assert.equal(v.diameter_um.value,21.65);assert.equal(v.na.value,.2157);assert.equal(v.design_focal_um.value,49);assert.equal(v.design_focal_um.basis,'reported_configuration');assert.equal(v.measured_focal_um.value,null);assert.equal(v.fwhm_um.value,null);assert.equal(v.height_nm.value,800);assert.equal(v.focus_variation_um,undefined);}
 const camera=get('lightfield_system').values;for(const k of ['diameter_um','na','design_focal_um','measured_focal_um','fwhm_um'])assert.equal(camera[k],undefined);
 assert.match(camera.material.value,/60×60/);assert.equal(camera.chromatic.basis,'reconstruction');assert.equal(axisPoints(lens.rows,'wavelength_nm','measured_focal_um').length,18);
});

test('author operation efficiencies preserve their denominator and errors instead of joining focusing efficiency data',()=>{
 const point=get('unit_420').values,band=get('unit_summary').values;
 assert.equal(point.operation_efficiency_at_lambda_pct.value,74.8);assert.match(point.operation_efficiency_at_lambda_pct.display,/74.8 ± 2.6/);
 assert.deepEqual(point.operation_efficiency_at_lambda_pct.reported_error,{type:'SD',value:2.6,sample_size:null});
 assert.equal(band.operation_efficiency_band_mean_pct.value,39.1);assert.equal(band.operation_efficiency_band_mean_pct.approximate,true);assert.equal(band.operation_efficiency_band_mean_pct.statistic,'band_mean');assert.equal(band.operation_efficiency_band_mean_pct.reported_error.type,'not_specified');
 assert.match(point.operation_efficiency_protocol.value,/相反手性/);assert.match(point.operation_efficiency_protocol.value,/积分区域.*未给/);
 for(const r of rows)for(const k of ['efficiency_at_lambda_pct','efficiency_band_mean_pct'])assert.equal(r.values[k],undefined);
 assert.equal(axisPoints(rows,'wavelength_nm','operation_efficiency_at_lambda_pct').length,1);assert.equal(axisPoints(lens.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,92);
});

test('the MTF audit keeps only three curve associations and explicitly unknown PSF provenance and raw arrays',()=>{
 const curves=rows.filter(r=>Number.isFinite(r.values.wavelength_nm.value)&&r.values.mtf_curve);assert.deepEqual(curves.map(r=>r.values.wavelength_nm.value),[400,540,660]);
 for(const r of curves){const v=r.values.mtf_curve,a=v.data_availability;assert.equal(v.basis,'unresolved');assert.equal(typeof v.value,'string');assert.equal(a.status,'curves_only');assert.equal(a.frequency_unit,'linepair/mm');assert.equal(a.author_numeric_mtf,null);assert.equal(a.raw_psf,null);assert.equal(a.independently_recomputed_mtf,null);assert.equal(a.psf_provenance,null);assert.equal(a.field_point,null);assert.equal(a.directions,null);assert.match(a.device_assignment,/imaging system/);}
});

test('operation efficiency requires its own wavelength or band context and unknown n cannot become a fabricated sample size',()=>{
 for(const change of [r=>delete r.values.operation_efficiency_protocol,r=>r.values.wavelength_nm.value=null,r=>r.values.operation_efficiency_at_lambda_pct.value=101,r=>r.values.operation_efficiency_at_lambda_pct.reported_error.value=-1,r=>r.values.operation_efficiency_at_lambda_pct.reported_error.sample_size=1]){
  const d=structuredClone(data);change(d.domains.metalens.rows.find(r=>r.id==='lin2019_unit_420'));assert.throws(()=>validateDevices(d,catalog),/operation efficiency|reported error context/);
 }
 for(const change of [r=>r.values.operation_efficiency_band_mean_pct.statistic='peak',r=>delete r.values.lambda_max_nm,r=>r.values.wavelength_nm.value=420]){
  const d=structuredClone(data);change(d.domains.metalens.rows.find(r=>r.id==='lin2019_unit_summary'));assert.throws(()=>validateDevices(d,catalog),/operation efficiency band mean/);
 }
});
