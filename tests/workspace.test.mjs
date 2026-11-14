import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {load,versionAssets} from '../scripts/catalog.mjs';
import {scalar,createWorkspace,groupRows,hasVisibleLight,valueSources,filteredRows,axisPoints,metricAvailability,availableAxes} from '../web/workspace-data.js';
const catalog=load(),devices=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url))),atlas=createWorkspace(catalog,devices);

test('legacy scalars preserve unit and zero without guessing ranges, errors or composite measurements',()=>{
 assert.deepEqual(scalar('0 mm'),{value:0,unit:'mm'});
 assert.deepEqual(scalar('f/2.8'),{value:2.8,unit:'F数'});
 assert.deepEqual(scalar('88.5%'),{value:88.5,unit:'%'});
 for(const text of ['20–41%','7.8 ± 1.3 μm','约4×','532 nm / 655 nm','f/2.8 mm','NA=0.1','10 mm²','12 mm text','Infinity',''])assert.equal(scalar(text),null,text);
});
test('all applications and device domains share a template without losing original parameter strings',()=>{
 assert.equal(atlas.domains.length,catalog.applications.length+Object.keys(devices.domains).length);
 for(const app of catalog.applications){
  const domain=atlas.domains.find(d=>d.id===app.id);assert.equal(domain.rows.length,app.record_ids.length);
  for(const row of domain.rows){const record=catalog.benchmarks.find(r=>r.id===row.id);assert.equal(Object.keys(row.values).length,record.parameters.length);for(const value of Object.values(row.values))assert.equal(value.display,record.parameters[value.parameterIndex].value);}
 }
});
test('same parameter names with incompatible units never enter the same numeric axis',()=>{
 const d=structuredClone(catalog),app=d.applications[0];app.record_ids=['fixture-a','fixture-b','fixture-c'];
 d.benchmarks.push(...[['a','10 mm'],['b','20 μm'],['c','10–20 mm']].map(([id,value])=>({id:'fixture-'+id,name:id,parameters:[{name:'焦距',value}],source_ids:[d.sources[0].id]})));
 const domain=createWorkspace(d,devices).domains.find(v=>v.id===app.id);
 assert.equal(domain.metrics.length,3);assert.equal(domain.metrics.filter(m=>m.numeric).length,2);
 const x=domain.rows[0].values,y=domain.rows[1].values;assert.notEqual(Object.keys(x)[0],Object.keys(y)[0]);
});
test('parameter citations retain specific source and locator; record-level fallback is explicit',()=>{
 for(const domain of atlas.domains.filter(d=>d.app))for(const row of domain.rows){
  const r=catalog.benchmarks.find(v=>v.id===row.id);
  for(const value of Object.values(row.values)){
   const p=r.parameters[value.parameterIndex];assert.deepEqual(valueSources(value),p.evidence?[p.evidence.source_id]:r.source_ids);
   assert.equal(value.location,p.evidence?.location||'');
   for(const source of valueSources(value))assert.ok(atlas.sources.has(source));
  }
 }
});
test('device and catalog source IDs cannot collide or silently replace provenance',()=>{
 const copy=structuredClone(devices);copy.sources[0].id=catalog.sources[0].id;
 const old=devices.sources[0].id;for(const d of Object.values(copy.domains))for(const r of d.rows)for(const v of Object.values(r.values))if(v.source===old)v.source=copy.sources[0].id;
 const merged=createWorkspace(catalog,copy);assert.equal(merged.sources.get(catalog.sources[0].id).url,catalog.sources[0].url);
 assert.equal(merged.sources.get('device-'+catalog.sources[0].id).url,copy.sources[0].url);
});
test('empty selections, zero values and camera modules stay consistent between rows and plotted points',()=>{
 const phone=atlas.domains.find(d=>d.id==='phone'),base={module:'main',models:null,query:'',evidence:''};
 assert.equal(filteredRows(phone,{...base,models:[]}).length,0);
 assert.ok(filteredRows(phone,{...base,module:'tele'}).every(r=>r.module==='tele'));
 assert.equal(filteredRows(phone,{...base,query:'nonexistent_768'}).length,0);
 const rows=[{id:'a',values:{x:{value:0},y:{value:2}}},{id:'b',values:{x:{value:null},y:{value:4}}}];
 assert.equal(axisPoints(rows,'x','y').length,1);assert.equal(axisPoints(rows,'x','y')[0].x,0);
 assert.deepEqual(axisPoints(rows,'$model','y').map(p=>p.x),[1,2]);
});
test('unified entry loads both data sets and old device links retain selection parameters',()=>{
 const html=fs.readFileSync(new URL('../web/index.html',import.meta.url),'utf8'),redirect=fs.readFileSync(new URL('../web/devices.html',import.meta.url),'utf8');
 for(const script of ['data.js','devices-data.js','workspace.js'])assert.ok(html.includes(script));
 assert.ok(html.indexOf('id="workspace"')<html.indexOf('id="data-table"'));assert.ok(html.indexOf('id="data-table"')<html.indexOf('id="references"'));
 assert.match(redirect,/target.search=location.search/);assert.match(redirect,/target.hash=location.hash/);assert.match(redirect,/location.replace/);
});
test('device evidence categories preserve manufacturer, study configuration and measurement boundaries',()=>{
 const d=structuredClone(devices),row=structuredClone(d.domains.xr.rows[0]);row.id='fixture-study';row.evidence_type='study';row.measurement_scope='right eye, center only';row.values.width.basis='reported_configuration';row.values.hz.basis='measured';d.domains.xr.rows.push(row);
 const domain=createWorkspace(catalog,d).domains.find(v=>v.id==='xr'),base={module:'main',models:null,query:'',evidence:'research'};
 assert.deepEqual(filteredRows(domain,base).map(r=>r.id),d.domains.xr.rows.filter(r=>r.evidence_type==='study').map(r=>r.id));
 assert.equal(filteredRows(domain,{...base,evidence:'manufacturer'}).length,d.domains.xr.rows.filter(r=>r.evidence_type!=='study').length);
 const study=domain.rows.at(-1);assert.match(study.variant,/right eye, center only/);assert.equal(study.values.width.evidence,'研究设备配置');assert.equal(study.values.hz.evidence,'研究实测');
});
test('missing SNR is distinguished from zero and recovery chooses existing values without inventing data',()=>{
 const phone=atlas.domains.find(d=>d.id==='phone'),rows=phone.rows.filter(r=>r.module==='main');
 assert.equal(metricAvailability(rows,'snr'),0);
 assert.equal(metricAvailability([{values:{snr:{value:0}}}],'snr'),1);
 const recovery=availableAxes(phone,rows);
 assert.ok(axisPoints(rows,recovery.x,recovery.y).length>0);
 assert.equal(metricAvailability(rows,'snr'),0);
 const sparse={metrics:[{id:'only',numeric:true}],rows:[]};
 assert.deepEqual(availableAxes(sparse,[{values:{only:{value:2}}}]),{x:'$model',y:'only'});
 assert.deepEqual(availableAxes(sparse,[]),{x:'$model',y:'only'});
});
test('asset versions match the final bytes including transitive module imports and change with those bytes',()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'lens-assets-'));
 const seed=()=>{
  fs.writeFileSync(path.join(directory,'index.html'),'<link href="style.css"><script src="app.js"></script><script type="module" src="workspace.js"></script>');
  fs.writeFileSync(path.join(directory,'workspace.js'),"import {value} from './workspace-data.js';");
 };
 const digest=name=>crypto.createHash('sha256').update(fs.readFileSync(path.join(directory,name))).digest('hex').slice(0,16);
 try{
  seed();for(const name of ['app.js','style.css','workspace-data.js'])fs.writeFileSync(path.join(directory,name),'initial '+name);
  versionAssets(directory);
  const first=fs.readFileSync(path.join(directory,'index.html'),'utf8');
  for(const name of ['app.js','style.css','workspace.js'])assert.ok(first.includes(name+'?v='+digest(name)));
  assert.ok(fs.readFileSync(path.join(directory,'workspace.js'),'utf8').includes('workspace-data.js?v='+digest('workspace-data.js')));
  seed();versionAssets(directory);assert.equal(fs.readFileSync(path.join(directory,'index.html'),'utf8'),first,'builds must be deterministic');
  seed();fs.writeFileSync(path.join(directory,'workspace-data.js'),'changed dependency');versionAssets(directory);
  const second=fs.readFileSync(path.join(directory,'index.html'),'utf8');assert.notEqual(second,first);assert.ok(second.includes('workspace.js?v='+digest('workspace.js')));
 }finally{fs.rmSync(directory,{recursive:true,force:true});}
});

test('each paper owns its configurations and its supplementary source IDs resolve to the same publication',()=>{
 const lenses=atlas.domains.find(d=>d.id==='metalens'), groups=groupRows(lenses.rows);
 assert.equal(groups.length,17);
 const balli=groups.find(g=>g.key==='balli2020');
 assert.equal(balli.rows.length,37);
 assert.equal(new Set(balli.rows.map(r=>r.specimen_id)).size,5);
 assert.equal(balli.paper,'device-balli_haml_2020');
 assert.equal(atlas.sources.get('device-balli_haml_source_2020').publication_source,balli.paper);
 const mla=groupRows(atlas.domains.find(d=>d.id==='app_14').rows);
 assert.equal(mla.find(g=>g.paper==='liu_mla_2023').rows.length,2);
 const phone=groupRows(atlas.domains.find(d=>d.id==='phone').rows.filter(r=>r.module==='main'));
 assert.equal(phone.length,5);assert.ok(phone.every(g=>!g.paper));
 for(const s of atlas.sources.values())if(s.publication_source)assert.ok(atlas.sources.has(s.publication_source)&&!atlas.sources.get(s.publication_source).publication_source);
});

test('visible-light filtering prioritizes the actual spectral row and keeps unknown wavelengths separate',()=>{
 const lens=atlas.domains.find(d=>d.id==='metalens'), filtered=filteredRows(lens,{visible:true,models:null});
 assert.equal(filtered.length,575);
 assert.deepEqual(filtered.filter(r=>r.study_id==='lin2025').map(r=>r.values.wavelength_nm.value),[650,700,650,700]);
 assert.ok(!filtered.some(r=>['balli2020','shrestha2018','engelberg2020'].includes(r.study_id)));
 assert.equal(groupRows(filtered).length,14);
 const band={lambda_min_nm:{value:350},lambda_max_nm:{value:920}};
 const passes=values=>hasVisibleLight({id:'metalens'},{values});
 assert.ok(passes(band));assert.ok(!passes({}));assert.ok(!passes({...band,wavelength_nm:{value:1000}}));
 for(const [nm,expected] of [[379,false],[380,true],[780,true],[781,false]])assert.equal(passes({efficiency_lambda_nm:{value:nm}}),expected);
 const spectrometer=atlas.domains.find(d=>d.id==='app_27');
 assert.deepEqual(filteredRows(spectrometer,{visible:true,models:null}).map(r=>r.id),['spectro_vis']);
 const headset=atlas.domains.find(d=>d.id==='xr');assert.equal(filteredRows(headset,{visible:true,models:null}).length,headset.rows.length);
});

test('journal labels use the parent publication and disambiguate same-year papers across filters',()=>{
 const lenses=atlas.domains.find(d=>d.id==='metalens');
 const chang=lenses.rows.find(r=>r.study_id==='chang2024'&&r.model.includes('400'));
 assert.equal(chang.pointLabel,'Nat. Commun. 2024');
 assert.equal(chang.chartLabel,'Nat. Commun. 2024 · D400μm');
 const points=axisPoints([chang],'$model','diameter_um');
 assert.equal(points[0].label,chang.chartLabel);
 assert.equal(points[0].y,400);
 assert.equal(lenses.rows.find(r=>r.study_id==='chen2018').pointLabel,'Nat. Nanotechnol. 2018, 220');
 assert.equal(lenses.rows.find(r=>r.study_id==='wang2018').pointLabel,'Nat. Nanotechnol. 2018, 227');
 assert.ok(lenses.rows.every(r=>r.pointLabel));
 assert.ok(filteredRows(lenses,{models:null,query:'Light Sci. Appl.'}).length>0);
 const mla=atlas.domains.find(d=>d.id==='app_14');
 const supplement=mla.rows.find(r=>r.id==='liu_mla_process_radius');
 assert.match(supplement.chartLabel,/^Light Sci\. Appl\. 2023 · 制备尺寸/);
 const phone=atlas.domains.find(d=>d.id==='phone').rows[0];
 assert.equal(axisPoints([phone],'$model','mp')[0].label,phone.model);
});

test('each publication group has one traceable bibliographic record for its samples',()=>{
 for(const d of atlas.domains)for(const group of groupRows(d.rows)){
  if(!group.paper) continue;
  const source=atlas.sources.get(group.paper), key=source.doi?.toLowerCase()||source.url;
  assert.equal(source.bibliography,catalog.bibliography[key],key);
  const b=source.bibliography;
  assert.ok(b && b.authors && b.title && b.venue && b.short && Number.isInteger(b.year),key);
 }
 const chang=atlas.sources.get('device-chang_dispersion_2024').bibliography;
 assert.deepEqual([chang.authors,chang.short,chang.volume,chang.locator,chang.year],['Chang, S. et al.','Nat. Commun.','15','9627',2024]);
 assert.equal(atlas.sources.get('device-shrestha_achromatic_2018').bibliography.authors,'Shrestha, S., Overvig, A. C., Lu, M., Stein, A. & Yu, N.');
 assert.equal(atlas.sources.get('device-li_inverse_2022').bibliography,atlas.sources.get('li').bibliography);
 assert.equal(atlas.sources.get('rouquette_mla_wfs_v1_2026').bibliography.short,'arXiv');
 assert.equal(atlas.sources.get('device-asnani_native_mtf_thesis_2022').bibliography.volume,undefined);
});

test('legacy aperture and efficiency fields carry limits while axial mismatch stays signed',()=>{
 const field=name=>atlas.domains.filter(d=>d.app).flatMap(d=>d.metrics).find(m=>m.label===name);
 assert.deepEqual(field('单元口径 (μm)').axis_bounds,{min:0});
 assert.deepEqual(field('实测平均聚焦效率 (%)').axis_bounds,{min:0,max:100});
 assert.equal(field('轴向失配 (mm)').axis_bounds,undefined);
});
