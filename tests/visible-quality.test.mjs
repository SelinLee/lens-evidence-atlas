import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateDevices} from '../scripts/devices.mjs';
import {load} from '../scripts/catalog.mjs';
import {createWorkspace,valueSources,axisPoints} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),lens=data.domains.metalens;
const row=id=>lens.rows.find(r=>r.id===id);

test('Chen theory example, fabricated focusing lens and large imaging lens do not share invented geometry',()=>{
 const high=row('chen2018_na02').values,low=row('chen2018_na002').values;
 assert.equal(high.na.value,.2);assert.equal(high.design_focal_um.value,63);
 assert.equal(high.design_focal_um.basis,'reported_configuration');assert.equal(high.diameter_um,undefined);
 assert.match(high.design_focal_um.note,/理论/);assert.equal(high.measured_focal_um,undefined);
 assert.equal(low.na.value,.02);assert.equal(low.diameter_um.value,220);assert.equal(low.design_focal_um,undefined);
 assert.equal(high.strehl.value,null);assert.match(high.strehl.display,/>0.8/);
 assert.equal(high.efficiency_at_lambda_pct.value,null);assert.equal(high.efficiency_at_lambda_pct.basis,'unresolved');assert.match(high.efficiency_at_lambda_pct.display,/待消歧/);
 assert.equal(high.psnr_db,undefined);assert.equal(low.psnr_db,undefined);
 for(const diameter of [180,160]){const v=row('chen2018_na002_d'+diameter).values;assert.equal(v.diameter_um.value,diameter);assert.equal(v.na.value,.02);for(const id of ['fov_deg','efficiency_at_lambda_pct','efficiency_band_mean_pct','design_focal_um'])assert.equal(v[id],undefined);}
});

test('Wang band mean is scoped to NA .106 and never becomes a point, maximum or zero chromatic shift',()=>{
 const rows=lens.rows.filter(r=>r.study_id==='wang2018');assert.equal(rows.length,3);
 const v=row('wang2018_na0106').values;
 assert.equal(v.na.value,.106);assert.equal(v.design_focal_um.value,235);assert.equal(v.diameter_um,undefined);
 assert.equal(v.efficiency_band_mean_pct.value,40);assert.equal(v.efficiency_band_mean_pct.statistic,'band_mean');
 assert.equal(v.efficiency_band_mean_pct.approximate,true);assert.equal(v.efficiency_at_lambda_pct,undefined);
 for(const r of rows){assert.deepEqual([r.values.lambda_min_nm.value,r.values.lambda_max_nm.value],[400,660]);assert.match(r.values.chromatic.value,/残余焦移/);if(r.id!=='wang2018_na0106'){assert.equal(r.values.design_focal_um,undefined);assert.equal(r.values.efficiency_band_mean_pct,undefined);}}
});

test('point efficiency preserves wavelength, denominator, channel and aggregation instead of merging band means',()=>{
 const v=row('chen2018_na002').values;
 assert.equal(v.efficiency_at_lambda_pct.value,20);assert.equal(v.efficiency_at_lambda_pct.approximate,true);assert.equal(v.efficiency_lambda_nm.value,500);
 assert.match(v.efficiency_protocol.value,/同口径圆偏振入射/);assert.match(v.efficiency_protocol.value,/Airy/);
 assert.equal(v.efficiency_band_mean_pct,undefined);
 assert.equal(axisPoints(lens.rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,1);
 assert.equal(axisPoints(lens.rows,'na','efficiency_band_mean_pct').length,1);
});

test('efficiency validation rejects missing measurement context, band definition and impossible percentage',()=>{
 assert.equal(validateDevices(data),true);
 for(const edit of [r=>delete r.values.efficiency_protocol,r=>delete r.values.efficiency_lambda_nm,r=>r.values.efficiency_lambda_nm.value=0,r=>r.values.efficiency_at_lambda_pct.value=120]){
  const copy=structuredClone(data);edit(copy.domains.metalens.rows.find(r=>r.id==='chen2018_na002'));assert.throws(()=>validateDevices(copy),/efficiency/);
 }
 for(const edit of [r=>delete r.values.lambda_min_nm,r=>r.values.lambda_max_nm.value=200,r=>r.values.efficiency_band_mean_pct.statistic='peak']){
  const copy=structuredClone(data);edit(copy.domains.metalens.rows.find(r=>r.id==='wang2018_na0106'));assert.throws(()=>validateDevices(copy),/efficiency/);
 }
});

test('multiple original sources survive namespacing and preserve both conflict references',()=>{
 const workspace=createWorkspace(load(),data),r=workspace.domains.find(d=>d.id==='metalens').rows.find(r=>r.id==='chen2018_na02');
 const ids=valueSources(r.values.efficiency_at_lambda_pct);
 assert.deepEqual(ids,['device-chen_visible_manuscript_2018','device-chen_visible_si_2018']);
 for(const id of ids)assert.ok(workspace.sources.has(id));
 const unresolved=structuredClone(data);unresolved.domains.metalens.rows.find(r=>r.id==='chen2018_na02').values.efficiency_at_lambda_pct.value=20;assert.throws(()=>validateDevices(unresolved),/unresolved/);
 for(const sources of [['missing'],['chen_visible_si_2018'],'bad']){
  const copy=structuredClone(data);copy.domains.metalens.rows.find(r=>r.id==='chen2018_na02').values.efficiency_at_lambda_pct.sourceIds=sources;assert.throws(()=>validateDevices(copy),/multiple sources/);
 }
});
