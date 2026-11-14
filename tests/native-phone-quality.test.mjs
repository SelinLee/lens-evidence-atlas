import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateDevices} from '../scripts/devices.mjs';
import {load} from '../scripts/catalog.mjs';
import {createWorkspace,filteredRows,axisPoints} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),phone=data.domains.phone;
const native=phone.rows.filter(r=>r.module==='native_research');

test('the author table retains both pipelines without inventing physical calibration, camera specifications or statistics',()=>{
 const rows=native.filter(r=>r.study_id==='asnani_mtfcalculator');assert.equal(rows.length,6);
 assert.deepEqual(rows.map(r=>r.values.mtf50_app_reported.value),[.1717,.1460,.1417,.1338,.1259,.1140]);
 assert.deepEqual(rows.map(r=>r.values.mtf50_imatest_reported.value),[.1749,.1399,.1312,.1306,.1123,.1088]);
 for(const r of rows){for(const id of ['sfr','mtf50_cpp','snr','mp','focal'])assert.equal(r.values[id],undefined);for(const id of ['mtf50_app_reported','mtf50_imatest_reported']){const v=r.values[id];assert.equal(v.frequency_unit,'author_scale');assert.equal(v.frequency_status,'author_scale_unverified');assert.equal(v.uncertainty,undefined);assert.equal(v.statistic,undefined);assert.match(v.display,/^0\.\d{4}$/);}assert.match(r.values.mtf_protocol.note,/未填SD/);}
});

test('explicit cycles per pixel reports retain missing test conditions instead of inheriting dataset capture parameters',()=>{
 const rows=native.filter(r=>r.study_id==='beveridge_matador_2025');assert.equal(rows.length,2);
 assert.deepEqual(rows.map(r=>r.values.mtf50_cpp.value),[.240,.158]);
 for(const r of rows){const v=r.values.mtf50_cpp;assert.equal(v.frequency_unit,'cycles/pixel');assert.equal(v.frequency_status,'author_stated_unit');assert.match(v.note,/模组|方法/);assert.equal(v.uncertainty,undefined);for(const id of ['mp','fov','sensor','snr','mtf50_app_reported'])assert.equal(r.values[id],undefined);assert.match(r.values.mtf_protocol.note,/未证实用于MTF/);}
});

test('uncalibrated author axes cannot silently become physical MTF frequency or an MTF response',()=>{
 assert.equal(validateDevices(data),true);
 for(const id of ['mtf50_cpp','sfr']){const copy=structuredClone(data),row=copy.domains.phone.rows.find(r=>r.id==='asnani2022_iphone11pro');row.values[id]=structuredClone(row.values.mtf50_app_reported);assert.throws(()=>validateDevices(copy),/frequency/);}
 for(const edit of [r=>r.values.mtf50_app_reported.frequency_unit='cycles/pixel',r=>delete r.values.mtf_protocol]){const copy=structuredClone(data);edit(copy.domains.phone.rows.find(r=>r.id==='asnani2022_iphone11pro'));assert.throws(()=>validateDevices(copy),/MTF/);}
 for(const edit of [r=>delete r.values.mtf50_cpp.frequency_unit,r=>r.values.mtf50_cpp.frequency_status='author_scale_unverified',r=>r.values.mtf50_cpp.value=0,r=>delete r.values.mtf_protocol]){const copy=structuredClone(data);edit(copy.domains.phone.rows.find(r=>r.id==='beveridge2025_iphone15promax'));assert.throws(()=>validateDevices(copy),/MTF|frequency/);}
});

test('native studies use the shared template, retain all original sources and never create cross-unit paired points',()=>{
 const workspace=createWorkspace(load(),data),domain=workspace.domains.find(d=>d.id==='phone'),state={module:'native_research',models:null,query:'',evidence:'research'};
 const rows=filteredRows(domain,state);assert.equal(rows.length,8);
 assert.equal(axisPoints(rows,'mtf50_app_reported','mtf50_imatest_reported').length,6);
 assert.equal(axisPoints(rows,'$model','mtf50_cpp').length,2);assert.ok(rows.filter(r=>r.values.mtf50_cpp).every(r=>/作者报告实测/.test(r.values.mtf50_cpp.evidence)));
 assert.equal(axisPoints(rows,'mtf50_cpp','mtf50_app_reported').length,0);
 assert.ok(rows.filter(r=>r.study_id==='asnani_mtfcalculator').every(r=>/未标定/.test(r.values.mtf50_app_reported.evidence)));
 for(const r of rows)for(const v of Object.values(r.values)){assert.ok(workspace.sources.has(v.source));assert.ok(v.location);}
 assert.equal(filteredRows(domain,{...state,evidence:'manufacturer'}).length,0);
});

test('native results do not backfill current commercial modules or external-macro SNR',()=>{
 assert.ok(phone.rows.filter(r=>r.module==='main').every(r=>!r.values.mtf50_cpp&&!r.values.mtf50_app_reported));
 assert.ok(native.every(r=>!r.values.snr));assert.equal(new Set(native.map(r=>r.study_id)).size,2);
 const external=phone.rows.filter(r=>r.module==='external_macro');assert.equal(external.length,14);assert.ok(external.every(r=>r.values.snr));
});
