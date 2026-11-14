import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from '../scripts/catalog.mjs';
import {validateDevices} from '../scripts/devices.mjs';
import {createWorkspace,axisPoints,groupRows,valueSources} from '../web/workspace-data.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),catalog=load();
const atlas=createWorkspace(catalog,data),lens=atlas.domains.find(d=>d.id==='metalens'),rows=lens.rows.filter(r=>r.study_id==='richards2023');
const get=id=>rows.find(r=>r.id==='richards2023_'+id);

test('Richards reuses one publication and supplementary source across the legacy and literature domains',()=>{
 assert.equal(validateDevices(data,catalog),true);assert.equal(rows.length,47);assert.equal(new Set(rows.map(r=>r.specimen_id)).size,11);
 assert.equal(groupRows(rows).length,1);assert.ok(rows.every(r=>r.paper==='richards'));
 const old=atlas.domains.find(d=>d.id==='app_14').rows.filter(r=>r.id.startsWith('richards_'));
 assert.ok(old.every(r=>r.paper==='richards'));assert.equal(atlas.sources.get('richards_si').publication_source,'richards');
 for(const id of ['device-richards_2023','device-richards_si_2023'])assert.equal(atlas.sources.has(id),false);
 for(const r of rows)for(const v of Object.values(r.values))for(const id of valueSources(v))assert.ok(atlas.sources.has(id));
});

test('catalog aliases reject missing, mismatched and ambiguous publications rather than creating false citations',()=>{
 for(const change of [s=>s.catalog_source='missing',s=>s.doi='10.1000/wrong',s=>s.catalog_source='richards_si',s=>s.doi=1]){
  const d=structuredClone(data);change(d.sources.find(s=>s.id==='richards_2023'));
  assert.throws(()=>validateDevices(d,catalog),/catalog source alias/);assert.throws(()=>createWorkspace(catalog,d),/catalog source alias/);
 }
 const d=structuredClone(data);d.sources.find(s=>s.id==='richards_si_2023').catalog_source='richards';
 assert.throws(()=>validateDevices(d,catalog),/catalog source alias/);assert.throws(()=>createWorkspace(catalog,d),/catalog source alias/);
});

test('S1 efficiencies retain all eight physical configurations, wavelength labels and their sampling statistics',()=>{
 const series=[[45.3,53.1,60,64],[42.3,40,40,41.7],[53.3,45.5,50,37.8],[50,43.6,42.6,47.5],[34.5,37,38.5,33.5],[38.5,45,41.7,36.1],[33.3,30,28.1,21.7],[38.9,29.3,35.7,35]];
 for(const [i,ee]of series.entries())for(const [j,w]of [488,542,612,633].entries()){
  const r=get('geometric_5'+String.fromCharCode(97+i)+'_'+w),v=r.values,e=v.efficiency_at_lambda_pct;
  assert.equal(e.value,ee[j]);assert.match(e.location,new RegExp('Fig.5'+String.fromCharCode(97+i)));assert.equal(e.sample_size,i===0?10:1);assert.equal(e.statistic,i===0?'mean':'single_specimen');
  assert.equal(v.na.reference_wavelength_nm,633);assert.equal(v.efficiency_lambda_nm.value,w);assert.match(v.efficiency_protocol.value,/半径3×FWHM/);assert.match(v.efficiency_protocol.value,/空白基底/);assert.equal(v.strehl,undefined);
 }
 assert.equal(axisPoints(rows,'efficiency_lambda_nm','efficiency_at_lambda_pct').length,32);
});

test('the four printed Strehl labels stay on the random single lens and do not become cohort efficiency results',()=>{
 for(const [w,sr]of [[488,.45],[542,.6],[612,.65],[633,.52]]){
  const r=get('geometric_5a_sr_'+w),v=r.values;
  assert.equal(r.specimen_id,'geometric_5a');assert.equal(r.sample_set_id,'selected_for_strehl');assert.equal(v.strehl.value,sr);assert.equal(v.strehl.sample_size,1);assert.equal(v.strehl.basis,'derived_from_measurement');assert.match(v.strehl.note,/cone/);assert.match(v.strehl.note,/16πλ²/);assert.equal(v.efficiency_at_lambda_pct,undefined);
 }
 assert.equal(axisPoints(rows,'wavelength_nm','strehl').length,4);
});

test('author focal errors retain ambiguous statistics and do not masquerade as per-wavelength focus or maximum span',()=>{
 assert.equal(axisPoints(rows,'diameter_um','focus_error_pct').length,9);
 for(const r of rows){for(const k of ['measured_focal_um','design_focal_um','focus_variation_um','lambda_min_nm','lambda_max_nm','fwhm_um'])assert.equal(r.values[k],undefined);}
 assert.equal(get('geometric_5a_summary').values.focus_error_um.value,4);assert.equal(get('geometric_5h_summary').values.focus_error_pct.value,7.5);
 assert.equal(get('geometric_5h_summary').values.focus_error_pct.reference_wavelength_nm,null);
 for(const change of [r=>delete r.values.focus_error_protocol,r=>r.values.wavelength_nm.value=488,r=>r.values.focus_error_pct.statistic='maximum_pairwise_difference',r=>r.values.focus_error_pct.reference_wavelength_nm=600,r=>r.values.focus_error_pct.value=-1]){
  const d=structuredClone(data);change(d.domains.metalens.rows.find(r=>r.id==='richards2023_geometric_5h_summary'));assert.throws(()=>validateDevices(d,catalog),/focal error context/);
 }
});
