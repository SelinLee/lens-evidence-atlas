import {test} from 'node:test';import assert from 'node:assert/strict';import {load,validate,canCompare} from '../scripts/catalog.mjs';
test('catalog resolves definitions, claims and evidence',()=>{const s=validate(load());assert.equal(s.applications,33);assert.ok(s.benchmarks>=55)});
test('dangling references fail',()=>{const d=load();d.metrics[0].definition_refs=['missing'];assert.throws(()=>validate(d),/missing source/)});
test('explicit priority cannot be fabricated from cited context',()=>{const d=load();const a=d.applications.find(a=>a.priorities.length);a.priorities[0].basis='author_explicit';delete a.priorities[0].explicit_rank_location;assert.throws(()=>validate(d),/explicit source rank locator/)});
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

test('Airy illumination widths stay separate from model FOV and independent samples',()=>{
 const d=load(),r=d.benchmarks.find(x=>x.id==='battistella_airy_profile');
 assert.equal(r.parameters.length,5);
 assert.deepEqual(r.parameters.filter(p=>p.metric_id==='sheet_thickness').map(p=>p.value),['7.8 ± 1.3 μm','10.1 ± 1.5 μm','11.1 ± 0.9 μm']);
 assert.equal(r.parameters.filter(p=>p.metric_id==='sheet_length').length,0);
 assert.ok(r.conditions.includes('三位置属于同一研究'));
 assert.ok(r.conditions.includes('不是荧光微球系统PSF'));
 assert.ok(r.unreported_or_not_verified.includes('3306 μm'));
 assert.ok(r.unreported_or_not_verified.includes('±的统计定义'));
 assert.ok(!d.bests.some(b=>b.application_id==='app_25'));
 assert.notEqual(d.applications.find(a=>a.id==='app_25').ranking_status,'author_explicit');
 assert.ok(validate(d).benchmarks>=68);
});

test('cited task tradeoffs cannot silently lose their source or explanation',()=>{
 const d=load(),a=d.applications.find(x=>x.id==='app_25');
 assert.equal(a.ranking_status,'not_established');assert.equal(a.priorities.length,0);
 assert.ok(validate(d));
 a.ranking_gap_refs=['missing_tradeoff_source'];assert.throws(()=>validate(d),/ranking context: missing source/);
 a.ranking_gap_refs=['shi_lattice_2022'];a.ranking_gap='';assert.throws(()=>validate(d),/cited ranking context needs explanation/);
});
test('lattice measured PSF and length do not import simulated widths or wavelength',()=>{
 const d=load(),r=d.benchmarks.find(x=>x.id==='shi_lattice_bead_psf');
 assert.deepEqual(r.parameters.filter(p=>p.metric_id==='resolution').map(p=>p.value),['887 / 1075 nm','728 / 738 nm','537 / 559 nm']);
 assert.deepEqual(r.parameters.filter(p=>p.metric_id==='sheet_length').map(p=>p.value),['16.8 μm','18.0 μm','20.0 μm']);
 assert.equal(r.parameters.some(p=>p.metric_id==='sheet_thickness'||p.metric_id==='optical_sectioning_width'),false);
 assert.equal(r.parameters.some(p=>/560|580|605/.test(p.value)),false);
 assert.equal(d.bests.some(b=>b.application_id==='app_25'),false);
});

test('enclosed-energy sectioning stays distinct from peak width and measured records',()=>{
 const d=load(),m=d.metrics.find(m=>m.id==='optical_sectioning_width'),a=d.applications.find(a=>a.id==='app_25');
 assert.ok(a.metric_ids.includes(m.id));assert.equal(m.unit,'μm');assert.equal(m.direction,'lower');
 assert.ok(m.definition_refs.includes('remacha_sectioning_2020'));assert.ok(m.definition_refs.includes('shi_lattice_2022'));
 for(const text of ['63%','67%','不设通用阈值','不是主峰强度FWHM','系统轴向PSF'])assert.ok(m.definition.includes(text),text);
 for(const text of ['包含能量比例及分母/积分范围','积分轴、区间选取及全宽/半宽','实测或模型、采样与背景处理'])assert.ok(m.required_conditions.includes(text));
 assert.ok(d.metrics.find(m=>m.id==='sheet_thickness').definition.includes('1/e≈37%'));
 const length=d.metrics.find(m=>m.id==='sheet_length');for(const text of ['两倍','√2','单侧/双侧'])assert.ok(length.definition.includes(text));
 assert.equal(a.ranking_status,'not_established');assert.ok(!a.priorities.some(p=>p.metric_ids.includes(m.id)));
 assert.ok(!d.bests.some(b=>b.application_id===a.id));
 assert.ok(!d.benchmarks.some(b=>b.parameters.some(p=>p.metric_id===m.id)));
 assert.equal(d.benchmarks.find(b=>b.id==='battistella_airy_profile').source_ids.length,1);
 const source=d.sources.find(s=>s.id==='remacha_sectioning_2020');assert.equal(source.source_year,2020);
 for(const text of ['未读到PDF页面','未复现作者代码','67%'])assert.ok(source.evidence_scope.includes(text));
});

test('MLAG spot-spacing CV preserves printed observations and reported disagreement',()=>{
 const d=load(),r=d.benchmarks.find(r=>r.id==='zhao_mlag_spacing'),m=d.metrics.find(m=>m.id==='array_spacing_cv');
 assert.equal(r.source_ids.length,1);assert.equal(r.parameters.length,7);
 assert.deepEqual(r.parameters[3].value.match(/\d+/g).map(Number),[564,577,573,576,584,575]);
 assert.deepEqual(r.parameters[4].value.match(/\d+/g).map(Number),[563,574,576,568,580,573]);
 assert.equal(r.parameters[0].value,'1.25%（与六行表值复算不一致）');assert.equal(r.parameters[1].value,'1.11%（与六行表值复算不一致）');
 const cv=a=>{const mean=a.reduce((s,v)=>s+v,0)/a.length;return 100*Math.sqrt(a.reduce((s,v)=>s+(v-mean)**2,0)/(a.length-1))/mean};
 for(const [index,expected] of [[3,1.1296468390129404],[4,1.0522157055921924]]){
  const a=r.parameters[index].value.match(/\d+/g).map(Number);assert.equal(a.length,6);assert.ok(Math.abs(cv(a)-expected)<1e-10);
  assert.ok(r.parameters[index+2].value.startsWith(expected.toFixed(5)+'%'));
 }
 assert.equal(r.parameters.filter(p=>p.metric_id===m.id).length,4);
 for(const w of ['蓝绿复合','未明数值波长','总体SD','不是六个独立来源'])assert.ok(r.conditions.includes(w));
 for(const w of ['638 nm','660/520/450 nm','置信区间','方差0.09','理论2070'])assert.ok(r.unreported_or_not_verified.includes(w));
 assert.ok(m.definition.includes('不是强度均匀性'));assert.ok(m.definition.includes('不声称原文指定了n−1'));
 assert.ok(!d.bests.some(b=>b.cohort_record_ids?.includes(r.id)));
 assert.equal(d.applications.find(a=>a.id==='app_14').ranking_status,'not_established');
});

test('LEOF loss record preserves direction, sample hierarchy and reported uncertainties',()=>{
 const d=load(),r=d.benchmarks.find(r=>r.id==='wozniak_leof_repeatability'),m=d.metrics.find(m=>m.id==='insertion_loss');
 assert.equal(r.parameters.length,9);assert.deepEqual(r.source_ids,['wozniak_leof_2026']);
 assert.deepEqual(r.parameters.slice(0,4).map(p=>p.value),['0.76 dB','0.39 dB（图文聚合未复现）','约0.67 dB','0.40 dB（图文聚合未复现）']);
 assert.deepEqual(r.parameters[7].value.match(/\d+/g).map(Number),[19,22,23,22,22]);
 assert.deepEqual(r.parameters[8].value.match(/\d+/g).map(Number),[28,23,26,26,30]);
 assert.ok(r.parameters.every(p=>p.evidence.source_id===r.source_ids[0]));
 assert.ok(r.parameters[4].evidence.location.includes('§4.2'));
 for(const word of ['1550 nm','不是独立来源','不是允许偏移公差'])assert.ok(r.conditions.includes(word));
 for(const word of ['Fig.8b/9b','功率校准面','置信区间','FIFO'])assert.ok(r.unreported_or_not_verified.includes(word));
 assert.equal(r.parameters.filter(p=>p.metric_id==='coupling').length,0);
 assert.ok(!d.bests.some(b=>b.cohort_record_ids?.includes(r.id)));
 assert.equal(m.direction,'lower');assert.equal(m.unit,'dB');
 for(const word of ['−10 log10','百分数','Fresnel','几何平均','附加损失'])assert.ok(m.definition.includes(word));
 assert.ok(m.required_conditions.includes('样品数量、重复次数与平均域'));
});

test('FPM retains correction, sampling, exposure and physical-aperture boundaries',()=>{
 const d=load(),b=d.benchmarks.find(b=>b.id==='zheng_fpm_usaf_2013'),m=d.metrics.find(m=>m.id==='resolution');
 assert.equal(b.parameters.length,11);
 assert.equal(b.parameters.find(p=>p.metric_id==='resolution').value,'半周期0.78 μm；整周期1.56 μm');
 assert.equal(b.parameters.find(p=>p.metric_id==='resolution').evidence.source_id,'zheng_fpm_correction_2015');
 assert.equal(b.parameters.find(p=>p.metric_id==='na').value,'2×；NA 0.08（Olympus Plan APO）');
 assert.equal(b.parameters.filter(p=>p.metric_id==='na').length,1);
 for(const word of ['137个LED','中央49个各3次','其余各2次','不能记成137次曝光'])assert.ok(b.parameters.find(p=>p.name==='照明角度与HDR采集').value.includes(word));
 for(const word of ['不是两个独立样本','2015勘误','Rayleigh','不代表本轮证明全视场'])assert.ok(b.conditions.includes(word));
 assert.ok(m.definition_refs.includes('zheng_fpm_correction_2015'));
 assert.deepEqual(b.source_ids,['zheng_fpm_2013','zheng_fpm_correction_2015','zheng_fpm_si_2015']);
 assert.equal(b.parameters.find(p=>p.metric_id==='fov').evidence.source_id,'zheng_fpm_si_2015');
 for(const word of ['0.55 μm','0, 0.6, 1, 1.25 cm','约30%'])assert.ok(b.parameters.some(p=>p.value.includes(word)),word);
 for(const word of ['0.632 μm','0.197 billion','0.23 billion','Michelson','密集全视场'])assert.ok(b.unreported_or_not_verified.includes(word),word);
 assert.ok(b.conditions.includes('不是独立研究'));
 assert.ok(d.sources.find(s=>s.id==='zheng_fpm_si_2015').location.includes('PDF p.1'));
 const fov=d.metrics.find(m=>m.id==='fov');assert.ok(fov.unit.includes('mm²'));assert.ok(fov.definition_refs.includes('zheng_fpm_2013'));assert.ok(fov.required_conditions.includes('线性/角度/面积及区域形状'));
 assert.ok(m.required_conditions.includes('周期靶半周期/整周期口径与重建采样'));
 assert.ok(!d.bests.some(x=>x.cohort_record_ids?.includes(b.id)));
});

test('telecentric validation separates reported aggregates, MAE, residuals and independent accuracy',()=>{
 const d=load(),r=d.benchmarks.find(r=>r.id==='li_telecentric_calibration_2015');
 const a=d.applications.find(a=>a.id==='app_03');
 assert.equal(a.ranking_status,'not_established');assert.equal(a.priorities.length,0);
 assert.deepEqual(a.ranking_gap_refs,['lenhardt_telecentric_course','li_telecentric_2015']);
 assert.equal(r.source_ids.length,1);assert.equal(r.parameters.length,12);
 const columns=r.parameters.find(p=>p.name==='Table 1逐姿态绝对Error列').value.split('；');
 const means=columns.map(s=>{const values=s.match(/\d+\.\d+/g).map(Number);assert.equal(values.length,10);return values.reduce((a,b)=>a+b)/values.length});
 assert.ok(Math.abs(means[0]-10.02)<1e-10);assert.ok(Math.abs(means[1]-10.75)<1e-10);
 assert.notEqual(means[0],9.4);
 assert.ok(r.parameters.find(p=>p.name==='Table 1作者Average误差').value.includes('不能直接叫MAE'));
 assert.equal(r.parameters.find(p=>p.name==='相机/投影仪重投影RMS').metric_id,'reprojection_error');
 assert.equal(r.parameters.find(p=>p.name==='平面拟合残差RMS').metric_id,undefined);
 assert.ok(r.unreported_or_not_verified.includes('独立验证集划分'));assert.ok(r.unreported_or_not_verified.includes('50 nm sensitivity不是位置准确度'));
 assert.ok(!d.bests.some(b=>b.cohort_record_ids?.includes(r.id)));
 assert.ok(d.metrics.find(m=>m.id==='dimensional_measurement_error').definition.includes('标准测量不确定度'));
});
