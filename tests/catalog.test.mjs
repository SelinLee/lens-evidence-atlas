import {test} from 'node:test';import assert from 'node:assert/strict';import {load,validate,canCompare} from '../scripts/catalog.mjs';
test('catalog resolves definitions, claims and evidence',()=>{const s=validate(load());assert.equal(s.applications,33);assert.ok(s.benchmarks>=55)});
test('dangling references fail',()=>{const d=load();d.metrics[0].definition_refs=['missing'];assert.throws(()=>validate(d),/missing source/)});
test('explicit priority cannot be fabricated from cited context',()=>{const d=load();const a=d.applications.find(a=>a.priorities.length);a.priorities[0].basis='author_explicit';assert.throws(()=>validate(d),/explicit source rank locator/)});
test('global best without a scoped comparison is rejected',()=>{const d=load();d.bests[0].claim_type='world_record';assert.throws(()=>validate(d),/world record forbidden/)});
test('missing and mismatched conditions block numeric comparisons',()=>{assert.equal(canCompare({nm:532},{nm:633},['nm']),false);assert.equal(canCompare({nm:532},{nm:532},['nm','denominator']),false);assert.equal(canCompare({nm:532,denominator:'incident'},{nm:532,denominator:'incident'},['nm','denominator']),true)});

test('fresh parameters need their own locatable source',()=>{const d=load();const b=d.benchmarks.find(b=>b.record_status==='checked_excerpt');delete b.parameters[0].evidence;assert.throws(()=>validate(d),/parameter source/)});
test('parameter citation must belong to the record',()=>{const d=load();const b=d.benchmarks.find(b=>b.record_status==='checked_excerpt');b.parameters[0].evidence.source_id='missing';assert.throws(()=>validate(d),/parameter source must belong/)});
test('application records cannot point to a different application',()=>{const d=load();d.applications[0].record_ids.push(d.applications[1].record_ids[0]);assert.throws(()=>validate(d),/belongs to another application/)});
test('unlisted benchmark cannot disappear from the site',()=>{const d=load();d.applications[0].record_ids.pop();assert.throws(()=>validate(d),/record must be visible/)});
function corpusFixture(){
 const d=load(),a=d.applications.find(a=>a.id==='app_14'),metric=d.metrics.find(m=>m.id==='focus_efficiency'),cohort=a.record_ids.slice(0,2);
 const conditions=Object.fromEntries(metric.required_conditions.map((k,i)=>[k,`known test condition ${i}`]));
 for(const id of cohort){const r=d.benchmarks.find(b=>b.id===id);r.comparison_conditions={...conditions};r.parameters.push({name:'test efficiency',metric_id:metric.id,value:'50%',evidence:{source_id:r.source_ids[0],location:'test fixture only'}})}
 d.bests.push({id:'test_corpus',application_id:a.id,metric_id:metric.id,claim_type:'corpus_best',display_value:'50%',evidence_refs:[d.sources[0].id],location:'test fixture',scope:'test fixture, no published ranking',conditions,cohort_record_ids:cohort,comparison_keys:Object.keys(conditions),comparison_protocol:'Exact declared conditions and source review; scientific completeness remains a manual review.',selected_record_id:cohort[0],comparison_parameter_name:'test efficiency',as_of:'2026-11-06',checked_on:'2026-11-06'});return d;
}
test('corpus evidence with explicit common conditions validates',()=>assert.doesNotThrow(()=>validate(corpusFixture())));
test('unknown corpus candidate fails',()=>{const d=corpusFixture();d.bests.at(-1).cohort_record_ids[0]='missing';assert.throws(()=>validate(d),/unknown cohort record/)});
test('duplicate corpus candidate fails',()=>{const d=corpusFixture();d.bests.at(-1).cohort_record_ids[1]=d.bests.at(-1).cohort_record_ids[0];assert.throws(()=>validate(d),/unique cohort/)});
test('missing or mismatched corpus conditions fail',()=>{for(const value of [undefined,'different']){const d=corpusFixture();d.benchmarks.find(b=>b.id===d.bests.at(-1).cohort_record_ids[0]).comparison_conditions[d.bests.at(-1).comparison_keys[0]]=value;assert.throws(()=>validate(d),/incomplete or mismatched/)} });
test('comparison keys cannot omit declared conditions',()=>{const d=corpusFixture();d.bests.at(-1).comparison_keys.pop();assert.throws(()=>validate(d),/cover declared conditions/)});
test('unknown values are not matching wildcards, including nested values',()=>{for(const v of ['',null,'unknown','未核验',[],{},[null],{width:null}])assert.equal(canCompare({x:v},{x:v},['x']),false);assert.equal(canCompare({x:0},{x:0},['x']),true);assert.equal(canCompare({x:{a:1,b:2}},{x:{b:2,a:1}},['x']),true)});

test('missing or invalid record status cannot bypass evidence',()=>{for(const status of [undefined,'checked_excert']){const d=load(),b=d.benchmarks.find(b=>b.record_status==='checked_excerpt');b.record_status=status;for(const p of b.parameters)delete p.evidence;assert.throws(()=>validate(d),/valid record status/)} });
test('corpus keys must include the metric requirements',()=>{const d=corpusFixture(),b=d.bests.at(-1);b.conditions={label:'same',country:'same',note:'same'};b.comparison_keys=Object.keys(b.conditions);for(const id of b.cohort_record_ids)d.benchmarks.find(r=>r.id===id).comparison_conditions={...b.conditions};assert.throws(()=>validate(d),/metric-required comparison conditions/)});
test('corpus claim requires a cutoff and traceable selected value',()=>{const d=corpusFixture();delete d.bests.at(-1).as_of;assert.throws(()=>validate(d),/cutoff/);const e=corpusFixture();e.bests.at(-1).display_value='99.99%';assert.throws(()=>validate(e),/display value must match/)});

test('unknown source verification cannot be displayed as newly checked',()=>{const d=load();delete d.sources[0].verification;assert.throws(()=>validate(d),/valid source verification/)});

// Optional parameter metric links must stay valid outside corpus_best claims too.
test('parameter metric links resolve and belong to their application',()=>{
 for(const metric of ['missing_metric','transmission']){const d=load();d.benchmarks.find(b=>b.id==='zhang_hex_mla').parameters[2].metric_id=metric;assert.throws(()=>validate(d),/parameter metric/)}
});
test('array geometry stays separate from optical efficiency and sample-series values',()=>{
 const d=load(),b=d.benchmarks.find(b=>b.id==='zhang_hex_mla'),m=d.metrics.find(m=>m.id==='array_fill_factor');
 assert.equal(b.parameters.find(p=>p.metric_id===m.id).value,'88%（由几何量计算）');
 assert.ok(b.conditions.includes('不是直接实测的光学效率'));assert.ok(!b.parameters.some(p=>/焦距|NA/.test(p.name)));
 assert.ok(m.required_conditions.includes('评估区域与边缘处理'));assert.ok(!d.bests.some(x=>x.cohort_record_ids?.includes(b.id)));
});

test('TECF combined experiment does not become a single-axis tolerance or model',()=>{
 const d=load(),b=d.benchmarks.find(b=>b.id==='he_tecf_combined_misalignment');
 assert.equal(b.parameters.find(p=>p.metric_id==='coupling').value,'50.4%');
 assert.deepEqual(b.parameters.slice(1).map(p=>p.value),['20 μm','10 mm','0.5 mm','0.04°','1 mm']);
 assert.ok(b.parameters.every(p=>p.evidence.location.includes('§4.3末两段')));
 for(const word of ['组合工作点','不是独立单轴允许公差','1515–1595 nm','未单独确认光谱'])assert.ok(b.conditions.includes(word));
 assert.ok(b.unreported_or_not_verified.includes('功率校准面'));
 assert.ok(!b.parameters.some(p=>/NA|焦距/.test(p.name)));
 assert.ok(!d.bests.some(x=>x.cohort_record_ids?.includes(b.id)));
});


test('application ranking status cannot mislabel its evidence',()=>{
 const d=load(),a=d.applications.find(a=>a.id==='app_04');a.ranking_status='editorial_synthesis';assert.throws(()=>validate(d),/ranking status must match/);
 const e=load(),b=e.applications.find(a=>a.id==='app_04');b.priorities=[];assert.throws(()=>validate(e),/ranked application needs priorities/);
});

test('low-NA computational microscopy separates raw imaging from FP reconstruction',()=>{
 const d=load(),r=d.benchmarks.find(b=>b.id==='chu_meta_fp_usaf');
 assert.equal(r.source_ids.length,1);assert.equal(r.parameters.length,9);
 assert.deepEqual(r.parameters.filter(p=>p.metric_id==='resolution').map(p=>p.value),['7.81 μm（USAF G6-1）','3.91 μm（USAF G7-1）']);
 for(const word of ['0.75 s','60 s','3 s内','20–41%'])assert.ok(r.parameters.some(p=>p.value.includes(word)));
 assert.ok(r.parameters.every(p=>p.evidence.source_id==='chu_meta_fp_2025'&&p.evidence.location.startsWith('§2 Results')));
 for(const text of ['81角度','不是PSF FWHM','不是两个独立样本','RCNN单帧预测不属于'])assert.ok(r.conditions.includes(text));
 assert.ok(r.unreported_or_not_verified.includes('不由直径/焦距反算成实测NA'));
 assert.ok(!r.parameters.some(p=>p.metric_id==='na'));
 assert.ok(!d.bests.some(b=>b.cohort_record_ids?.includes(r.id)));
 assert.ok(d.metrics.find(m=>m.id==='resolution').definition_refs.includes('chu_meta_fp_2025'));
});
