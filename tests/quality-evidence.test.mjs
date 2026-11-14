import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateDevices} from '../scripts/devices.mjs';
import {load} from '../scripts/catalog.mjs';
import {createWorkspace,filteredRows,axisPoints} from '../web/workspace-data.js';
const d=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url)));
const lens=d.domains.metalens;

test('research entries require study identity, scope, per-cell provenance and evidence basis',()=>{
 assert.equal(validateDevices(d),true);
 for(const change of [r=>delete r.study_id,r=>delete r.measurement_scope,r=>delete r.values.diameter_um.basis,r=>r.values.diameter_um.source='missing',r=>r.values.diameter_um.location='']){
  const copy=structuredClone(d);change(copy.domains.metalens.rows[0]);assert.throws(()=>validateDevices(copy));
 }
});
test('Shrestha nominal geometry and reported NA conflicts remain distinct from measured curves',()=>{
 const rows=lens.rows.filter(r=>r.study_id==='shrestha2018');assert.equal(rows.length,4);
 const byId=new Map(rows.map(r=>[r.id,r]));
 for(const [id,diameter,focal,lo,hi] of [['m1a',100,200,1300,1650],['m1b',100,200,1200,1650],['m2',200,800,1200,1650],['m3',100,30,1200,1400]]){
  const values=byId.get('shrestha2018_'+id).values;
  assert.deepEqual([values.diameter_um.value,values.design_focal_um.value,values.lambda_min_nm.value,values.lambda_max_nm.value],[diameter,focal,lo,hi]);
  assert.equal(values.design_focal_um.basis,'reported_configuration');
  assert.equal(values.measured_focal_um,undefined);assert.equal(values.psnr_db,undefined);
 }
 for(const id of ['m2','m3'])assert.equal(byId.get('shrestha2018_'+id).values.na.value,null);
 for(const id of ['m1b','m2']){const bound=byId.get('shrestha2018_'+id).values.strehl;assert.equal(bound.value,null);assert.match(bound.display,/>0.8/);}
});
test('neural experimental PSNR never becomes optical SNR, physical achromatic focus, or measured MTF',()=>{
 const v=lens.rows.find(r=>r.id==='tseng2021_neural').values;
 assert.equal(v.diameter_um.value,500);assert.equal(v.fnumber.value,2);assert.equal(v.fov_deg.value,40);
 assert.equal(v.psnr_db.value,22.1);assert.equal(v.ssim.value,.807);assert.equal(v.psnr_db.basis,'reconstruction');
 assert.equal(v.snr,undefined);assert.equal(v.measured_focal_um,undefined);assert.equal(v.design_focal_um.value,1000);assert.equal(v.design_focal_um.basis,'reported_configuration');assert.equal(v.design_focal_um.value/v.diameter_um.value,v.fnumber.value);assert.equal(v.mtf_curve.basis,'model');
});
test('Kang spectral rows retain the two physical specimens and original measured sequences',()=>{
 const rows=lens.rows.filter(r=>r.study_id==='kang2026');assert.equal(rows.length,15);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,2);
 const si=rows.filter(r=>r.specimen_id==='kang_sinx'),zr=rows.filter(r=>r.specimen_id==='kang_zro2');
 assert.deepEqual(si.map(r=>r.values.wavelength_nm.value),[320,375,405,430,450]);
 assert.deepEqual(si.map(r=>r.values.measured_focal_um.value),[656,584,656,592,624]);
 assert.deepEqual(si.map(r=>r.values.fwhm_um.value),[4.0297,3.7392,3.6911,4.9220,4.9556]);
 assert.deepEqual(si.map(r=>r.values.strehl.value),[.67,.80,.94,.76,.79]);
 assert.deepEqual(zr.map(r=>r.values.measured_focal_um.value),[1320,1100,1100,1380,1440,1530,1380,1410,1350,1380]);
 const maxError=Math.max(...si.map(r=>Math.abs(r.values.measured_focal_um.value-626)/626*100));
 const meanError=zr.reduce((sum,r)=>sum+Math.abs(r.values.measured_focal_um.value-1400)/1400*100,0)/zr.length;
 assert.ok(Math.abs(maxError-6.7)<.05);assert.ok(Math.abs(meanError-6.9)<.05);
 for(const r of rows){assert.equal(r.values.na.value,null);assert.equal(r.values.strehl.basis,'derived_from_measurement');assert.equal(r.values.measured_focal_um.basis,'measured');}
});
test('external macro SNR means, SD and sample count are retained without contaminating native modules',()=>{
 const rows=d.domains.phone.rows.filter(r=>r.study_id==='vennela2026');assert.equal(rows.length,14);
 assert.ok(rows.every(r=>r.module==='external_macro'));assert.equal(new Set(rows.map(r=>r.specimen_id)).size,2);
 const i=rows.find(r=>r.id==='vennela_iphone15_frontal'),a=rows.find(r=>r.id==='vennela_a23_frontal');
 assert.equal(i.values.snr.value,4.74);assert.equal(i.values.snr_sd.value,2.50);assert.equal(a.values.snr.value,4.16);
 for(const r of rows){const v=r.values.snr;assert.equal(v.statistic,'mean');assert.deepEqual(v.uncertainty,{type:'SD',value:r.values.snr_sd.value,n:30});assert.match(v.note,/外接/);assert.match(v.display,/±/);}
 assert.ok(d.domains.phone.rows.filter(r=>r.module==='main').every(r=>r.values.snr===undefined));
 const bad=structuredClone(d);bad.domains.phone.rows.find(r=>r.id===i.id).values.snr.uncertainty.value=-1;assert.throws(()=>validateDevices(bad),/uncertainty/);
});
test('XR cutoff frequency is not MTF50, a dimensionless MTF value, display PPD or chromatic shift',()=>{
 for(const [id,redblue,white] of [['vive_2022_study',6,9],['vive_pro_2022_study',8,12]]){
  const v=d.domains.xr.rows.find(r=>r.id===id).values;assert.equal(v.cutoff_rb.value,redblue);assert.equal(v.cutoff_white.value,white);assert.equal(v.cutoff_white.approximate,true);assert.equal(v.mtf.value,null);assert.match(v.cutoff_white.note,/未给统一截止阈值/);
 }
 assert.equal(d.domains.xr.rows.find(r=>r.id==='vive_pro2_2022_study').values.cutoff_white,undefined);
});
test('literature domain and accessory selector use the shared data model and traceable unit-consistent points',()=>{
 const workspace=createWorkspace(load(),d),domain=workspace.domains.find(v=>v.id==='metalens');
 assert.equal(domain.name,'消色差超透镜与对照（文献）');assert.equal(domain.category,'文献器件与计算成像');assert.equal(domain.rows.length,21);
 const rows=filteredRows(domain,{module:'main',query:'',models:null,evidence:'research'});assert.equal(rows.length,21);
 const ps=axisPoints(rows,'wavelength_nm','measured_focal_um');assert.equal(ps.length,15);
 for(const row of domain.rows)for(const value of Object.values(row.values)){assert.ok(workspace.sources.has(value.source));assert.ok(value.location);assert.ok(value.note);}
});
