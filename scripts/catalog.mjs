import fs from 'node:fs';
import {validateDevices} from './devices.mjs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {isDeepStrictEqual} from 'node:util';
export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
export function load(){const d={meta:read('data/catalog.json'),bibliography:read('data/bibliography.json'),bests:read('data/scoped_bests.json'),standards:read('data/standards.json'),comparisons:read('data/comparisons.json')};for(const folder of ['applications','metrics','sources','benchmarks'])d[folder]=fs.readdirSync(path.join(root,'data',folder)).filter(f=>f.endsWith('.json')).sort().map(f=>read(`data/${folder}/${f}`));return d}
export function validate(d){
 const errors=[];const expect=(ok,msg)=>{if(!ok)errors.push(msg)};const ids={};
 for(const type of ['applications','metrics','sources','benchmarks']){ids[type]=new Set();for(const x of d[type]){expect(typeof x.id==='string'&&/^[a-z0-9_]+$/.test(x.id),`${type}: invalid id`);expect(!ids[type].has(x.id),`${type}: duplicate ${x.id}`);ids[type].add(x.id)}}
 const refs=(list,where)=>{expect(Array.isArray(list)&&list.length>0,`${where}: evidence required`);for(const id of list||[])expect(ids.sources.has(id),`${where}: missing source ${id}`)};
 const str=(v)=>typeof v==='string'&&v.trim().length>0;
 for(const s of d.sources){expect(['inherited_v2','checked_excerpt'].includes(s.verification),`${s.id}: valid source verification required`);expect(str(s.title)&&str(s.location)&&str(s.evidence_scope),`${s.id}: source metadata required`);expect(/^https:\/\//.test(s.url),`${s.id}: HTTPS source required`);expect(/^\d{4}-\d{2}-\d{2}$/.test(s.checked_on),`${s.id}: checked_on required`)}
 for(const s of d.sources)if(s.publication_source)expect(d.sources.some(p=>p.id===s.publication_source&&p.id!==s.id&&!p.publication_source),s.id+': invalid publication source');
 for(const m of d.metrics){expect(str(m.name)&&str(m.definition)&&str(m.unit),`${m.id}: definition/name/unit required`);refs(m.definition_refs,m.id);expect(m.required_conditions?.length>0,`${m.id}: comparison conditions required`);expect(['higher','lower','lower_abs','target','tradeoff'].includes(m.direction),`${m.id}: invalid direction`)}
 for(const a of d.applications){expect(str(a.name)&&str(a.category),`${a.id}: application name/category required`);expect(['not_established','editorial_synthesis','author_explicit'].includes(a.ranking_status),`${a.id}: ranking status required`);for(const id of a.metric_ids)expect(ids.metrics.has(id),`${a.id}: missing metric ${id}`);for(const id of a.record_ids)expect(ids.benchmarks.has(id),`${a.id}: missing record ${id}`);if(a.ranking_status==='not_established')expect(a.priorities.length===0,`${a.id}: cannot publish unsupported ranking`);else expect(a.priorities.length>0,`${a.id}: ranked application needs priorities`);for(const p of a.priorities){refs(p.evidence_refs,a.id+' priority');expect(['editorial_synthesis','author_explicit'].includes(p.basis),`${a.id}: ranking basis required`);expect(Number.isInteger(p.tier)&&p.tier>0,`${a.id}: tier required`);expect(str(p.rationale)&&str(p.scope),`${a.id}: rationale/scope required`);for(const mid of p.metric_ids)expect(a.metric_ids.includes(mid),`${a.id}: ranked metric outside application`);if(p.basis==='author_explicit')expect(str(p.explicit_rank_location),`${a.id}: explicit source rank locator required`);expect(p.basis===a.ranking_status,`${a.id}: ranking status must match every priority basis`)}}
 for(const a of d.applications)if(a.ranking_gap_refs!==undefined){refs(a.ranking_gap_refs,a.id+' ranking context');expect(str(a.ranking_gap),`${a.id}: cited ranking context needs explanation`);}
 for(const a of d.applications)for(const id of a.record_ids){const r=d.benchmarks.find(x=>x.id===id);expect(!r||r.application_id===a.id,`${a.id}: record ${id} belongs to another application`)}
 for(const b of d.benchmarks){expect(ids.applications.has(b.application_id),`${b.id}: application not found`);refs(b.source_ids,b.id);expect(str(b.conditions)&&str(b.unreported_or_not_verified),`${b.id}: conditions and gaps required`);expect(b.parameters?.length>0,`${b.id}: empty parameters`);expect(['inherited_v2','checked_excerpt'].includes(b.record_status),`${b.id}: valid record status required`);expect(/^\d{4}-\d{2}-\d{2}$/.test(b.checked_on),`${b.id}: record checked_on required`);expect(['standard_requirement','representative_result'].includes(b.claim_type),`${b.id}: benchmark claim type required`);
  expect(d.applications.find(a=>a.id===b.application_id)?.record_ids.includes(b.id),`${b.id}: record must be visible in its application`);
  for(const p of b.parameters||[]){
   expect(str(p.name)&&str(p.value),`${b.id}: parameter name/value required`);
   if(p.metric_id!==undefined){expect(ids.metrics.has(p.metric_id),`${b.id}: parameter metric not found`);expect(d.applications.find(a=>a.id===b.application_id)?.metric_ids.includes(p.metric_id),`${b.id}: parameter metric outside application`);}
   if(b.record_status==='checked_excerpt'||p.evidence){
    expect(str(p.evidence?.location),`${b.id}: parameter source locator required`);
    expect(ids.sources.has(p.evidence?.source_id)&&b.source_ids.includes(p.evidence?.source_id),`${b.id}: parameter source must belong to record`);
   }
  }
 }
 for(const b of d.bests){expect(ids.applications.has(b.application_id)&&ids.metrics.has(b.metric_id),`${b.id}: best references invalid`);refs(b.evidence_refs,b.id);expect(['author_reported_best','theoretical_bound','corpus_best'].includes(b.claim_type),`${b.id}: unscoped world record forbidden`);expect(str(b.scope)&&str(b.location)&&str(b.display_value),`${b.id}: best claim scope and locator required`);expect(Object.keys(b.conditions||{}).length>=3,`${b.id}: best conditions incomplete`);if(b.claim_type==='corpus_best'){
  const cohort=b.cohort_record_ids||[],keys=b.comparison_keys||[],metric=d.metrics.find(m=>m.id===b.metric_id);
  expect(/^\d{4}-\d{2}-\d{2}$/.test(b.as_of)&&/^\d{4}-\d{2}-\d{2}$/.test(b.checked_on),`${b.id}: corpus cutoff and verification dates required`);
  expect((metric?.required_conditions||[]).every(k=>keys.includes(k)),`${b.id}: metric-required comparison conditions missing`);
  expect(cohort.includes(b.selected_record_id)&&str(b.comparison_parameter_name),`${b.id}: selected record and parameter required`);
  expect(cohort.length>=2&&new Set(cohort).size===cohort.length&&str(b.comparison_protocol),`${b.id}: corpus-best requires unique cohort and comparison protocol`);
  expect(keys.length>=3&&new Set(keys).size===keys.length&&keys.every(str),`${b.id}: explicit comparison keys required`);
  expect(Object.keys(b.conditions||{}).every(k=>keys.includes(k)),`${b.id}: comparison keys must cover declared conditions`);
  for(const id of cohort){
   const r=d.benchmarks.find(x=>x.id===id);
   expect(Boolean(r),`${b.id}: unknown cohort record ${id}`);
   if(r){
    const p=r.parameters.find(p=>p.name===b.comparison_parameter_name&&p.metric_id===b.metric_id);
    expect(Boolean(p&&str(p.evidence?.location)&&r.source_ids.includes(p.evidence?.source_id)),`${b.id}: cohort metric parameter evidence required`);
    if(id===b.selected_record_id)expect(p?.value===b.display_value,`${b.id}: display value must match selected parameter`);
    expect(r.application_id===b.application_id,`${b.id}: cohort application mismatch`);expect(canCompare(b.conditions,r.comparison_conditions,keys),`${b.id}: incomplete or mismatched comparison conditions for ${id}`)}
  }
 }}
 // Comparison views reference original parameters; they never supply a second numerical truth.
 const comparisonIds=new Set(),comparisonApps=new Set();
 for(const c of d.comparisons||[]){
  expect(str(c.id)&&!comparisonIds.has(c.id),`${c.id}: comparison id must be unique`);comparisonIds.add(c.id);
  expect(ids.applications.has(c.application_id)&&!comparisonApps.has(c.application_id),`${c.id}: one comparison per known application`);comparisonApps.add(c.application_id);
  expect(str(c.title)&&str(c.scope)&&/^\d{4}-\d{2}-\d{2}$/.test(c.updated_on),`${c.id}: comparison scope/date required`);
  const fields=c.fields||[],entries=c.entries||[],keys=fields.map(f=>f.id);
  expect(fields.length>0&&new Set(keys).size===keys.length,`${c.id}: unique comparison fields required`);
  for(const f of fields){expect(str(f.id)&&str(f.label),`${c.id}: comparison field labels required`);for(const mid of f.metric_ids||[])expect(d.applications.find(a=>a.id===c.application_id)?.metric_ids.includes(mid),`${c.id}: comparison metric outside application`)}
  expect(entries.length>=2&&new Set(entries.map(e=>e.record_id)).size===entries.length,`${c.id}: comparison needs distinct records`);
  for(const e of entries){
   const r=d.benchmarks.find(r=>r.id===e.record_id);
   expect(Boolean(r)&&r.application_id===c.application_id,`${c.id}: comparison record outside application`);
   expect(str(e.study_id)&&str(e.label)&&str(e.task),`${c.id}: comparison study/task required`);
   expect(Object.keys(e.cells||{}).length===keys.length&&keys.every(k=>Object.hasOwn(e.cells||{},k)),`${c.id}: comparison must retain all condition fields`);
   for(const [key,cell] of Object.entries(e.cells||{})){
    expect(str(cell.note)&&Array.isArray(cell.parameter_names),`${c.id}/${key}: comparison note and references required`);
    expect(!Object.hasOwn(cell,'value'),`${c.id}/${key}: comparison values must come from record`);
    expect(new Set(cell.parameter_names||[]).size===(cell.parameter_names||[]).length,`${c.id}/${key}: duplicate comparison parameter`);
    for(const name of cell.parameter_names||[]){const matches=r?.parameters.filter(p=>p.name===name)||[];expect(matches.length===1&&str(matches[0].evidence?.location),`${c.id}/${key}: comparison parameter must resolve unambiguously with evidence`)}
   }
  }
 }
 if(errors.length)throw new Error(errors.join('\n'));return {applications:d.applications.length,metrics:d.metrics.length,sources:d.sources.length,benchmarks:d.benchmarks.length,ranked_applications:d.applications.filter(a=>a.priorities.length).length,bests:d.bests.length};
}
// Missing comparison conditions are not wildcards; uncertainty must block automatic ordering.
export function isKnownCondition(v){
 if(v==null)return false;
 if(typeof v==='number')return Number.isFinite(v);
 if(typeof v==='string')return v.trim().length>0&&!/^(unknown|unreported|not[_ -]?(known|reported|verified)|n\/?a|未报告|未核验|未知|缺失)$/i.test(v.trim());
 if(Array.isArray(v))return v.length>0&&v.every(isKnownCondition);
 if(typeof v==='object')return Object.keys(v).length>0&&Object.values(v).every(isKnownCondition);
 return typeof v==='boolean';
}
export function canCompare(a,b,keys){return Boolean(a&&b&&Array.isArray(keys)&&keys.length>0&&keys.every(k=>Object.hasOwn(a,k)&&Object.hasOwn(b,k)&&isKnownCondition(a[k])&&isKnownCondition(b[k])&&isDeepStrictEqual(a[k],b[k])))}
export function versionAssets(directory){
 const digest=name=>crypto.createHash('sha256').update(fs.readFileSync(path.join(directory,name))).digest('hex').slice(0,16);
 // Version the module dependency before hashing its importer.
 const modulePath=path.join(directory,'workspace.js');
 const module=fs.readFileSync(modulePath,'utf8').replace(/(['"])\.\/workspace-data\.js\1/g,(_,quote)=>quote+'./workspace-data.js?v='+digest('workspace-data.js')+quote);
 fs.writeFileSync(modulePath,module);
 const indexPath=path.join(directory,'index.html');
 const index=fs.readFileSync(indexPath,'utf8').replace(/\b(src|href)="([a-zA-Z0-9_-]+\.(?:js|css))"/g,(_,attribute,name)=>`${attribute}="${name}?v=${digest(name)}"`);
 fs.writeFileSync(indexPath,index);
}
export function build(){const d=load();validateDevices(read('data/devices.json'),d);const stats=validate(d);fs.mkdirSync(path.join(root,'dist'),{recursive:true});for(const f of ['index.html','app.js','style.css','devices.html','devices.js','workspace.js','workspace-data.js','workspace.css'])fs.copyFileSync(path.join(root,'web',f),path.join(root,'dist',f));fs.writeFileSync(path.join(root,'dist/devices-data.js'),'window.DEVICE_DATA='+JSON.stringify(read('data/devices.json')).replaceAll('<','\\u003c')+';\n');const data=JSON.stringify(d);fs.writeFileSync(path.join(root,'dist/data.js'),'window.LENS_DATA='+data.replaceAll('<','\\u003c')+';\n');fs.writeFileSync(path.join(root,'dist/catalog.json'),JSON.stringify(d,null,2)+'\n');fs.writeFileSync(path.join(root,'dist/build.json'),JSON.stringify({version:d.meta.version,data_sha256:crypto.createHash('sha256').update(data).digest('hex'),...stats},null,2)+'\n');versionAssets(path.join(root,'dist'));return stats}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 let stats;
 if(process.argv[2]==='build')stats=build();
 else{const d=load();validateDevices(read('data/devices.json'),d);stats=validate(d);}
 console.log(JSON.stringify(stats,null,2));
}
