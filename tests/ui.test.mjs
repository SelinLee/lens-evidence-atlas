import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {load} from '../scripts/catalog.mjs';

// A deliberately small DOM fixture tests generated content and query logic.
// This is not a browser, layout test, or substitute for visual acceptance.
function fixture(){
 const elements=new Map();
 const el=id=>{if(!elements.has(id))elements.set(id,{value:'',checked:false,textContent:'',innerHTML:'',open:false,dataset:{},setAttribute(){},addEventListener(){},insertAdjacentHTML(_,html){this.innerHTML+=html},showModal(){this.open=true},close(){this.open=false},focus(){}});return elements.get(id)};
 const tabs=['metrics','priority','best','sources'].map(name=>Object.assign(el('tab-'+name),{dataset:{tab:name},textContent:name}));
 const document={getElementById:el,querySelectorAll:()=>tabs,querySelector:s=>s==='.tabs'?el('tabs'):tabs.find(t=>s.includes('"'+t.dataset.tab+'"')),addEventListener(){}};
 const location={hash:'#app_14/metrics'},window={LENS_DATA:load(),addEventListener(){}};
 const context=vm.createContext({document,location,window});
 vm.runInContext(fs.readFileSync(new URL('../web/app.js',import.meta.url),'utf8'),context);
 return {el,location,run:s=>vm.runInContext(s,context)};
}
test('array definition and source locator render in the query interface',()=>{
 const f=fixture();assert.ok(f.el('panel').innerHTML.includes('阵列几何填充因子'));
 f.run("openMetric('array_fill_factor')");const body=f.el('detailBody').innerHTML;
 assert.ok(body.includes('10.1002/adom.202200677'));assert.ok(body.includes('Eq.4'));assert.ok(body.includes('不是透过率或聚焦效率'));assert.equal(f.el('detail').open,true);
});
test('array search returns one application, handles empty results, and clears',()=>{
 const f=fixture();f.el('search').value='Zhang';f.run('renderList()');assert.equal(f.el('resultCount').textContent,'1 / 33 类应用');
 assert.ok(f.el('appList').innerHTML.includes('app_14'));
 f.el('search').value='nonexistent_evidence_123';f.run('renderList()');assert.equal(f.el('resultCount').textContent,'0 / 33 类应用');
 f.el('search').value='';f.run('renderList()');assert.equal(f.el('resultCount').textContent,'33 / 33 类应用');
});
test('array record and narrowed priority scope render with evidence boundaries',()=>{
 const f=fixture();f.location.hash='#app_14/best';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('Zhang 2022'));
 f.run("openDialog('test',recordCard(records.get('zhang_hex_mla'),true))");
 const body=f.el('detailBody').innerHTML;for(const expected of ['35.14 ± 0.55','71.35','88%（由几何量计算）','不是直接实测的光学效率','完整行列数','Eq.4'])assert.ok(body.includes(expected));
 f.location.hash='#app_14/priority';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('单透镜效率不能替代整阵列效率'));
});

test('TECF record shows combined conditions, source locator and uncertainty',()=>{
 const f=fixture();f.location.hash='#app_22/best';f.run('route()');
 assert.ok(f.el('panel').innerHTML.includes('He 2022'));
 f.run("openDialog('test',recordCard(records.get('he_tecf_combined_misalignment'),true))");
 for(const word of ['50.4%','20 μm','0.5 mm','0.04°','§4.3末两段','未单独确认光谱','功率校准面'])assert.ok(f.el('detailBody').innerHTML.includes(word));
 f.location.hash='#app_22/sources';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('10.3390/mi13020324'));
});
test('TECF search can be repeated and cleared without hiding unrelated applications',()=>{
 const f=fixture();
 for(const query of ['He 2022','TECF','unmatched_alignment_987','He 2022','']){
  f.el('search').value=query;f.run('renderList()');
  assert.equal(f.el('resultCount').textContent,query==='unmatched_alignment_987'?'0 / 33 类应用':query?'1 / 33 类应用':'33 / 33 类应用');
 }
});


test('author relative priority and editorial interpretation have distinct labels',()=>{
 const f=fixture();f.location.hash='#app_04/priority';f.run('route()');
 for(const text of ['作者原文明示的限定任务相对次序','相对次序原文位置','650–1000 nm','不是通用指标总榜'])assert.ok(f.el('panel').innerHTML.includes(text));
 assert.ok(!f.el('coverage').innerHTML.includes('编辑解读'));
 f.location.hash='#app_32/priority';f.run('route()');
 assert.ok(f.el('panel').innerHTML.includes('有出处的编辑性优先级'));assert.ok(!f.el('panel').innerHTML.includes('作者原文明示的限定任务相对次序'));
 f.run('method()');assert.ok(f.el('detailBody').innerHTML.includes('1 类应用有带出处'));assert.ok(f.el('detailBody').innerHTML.includes('1 类应用包含作者'));
});

test('meta-FP record renders raw and reconstructed details with source and gaps',()=>{
 const f=fixture();f.location.hash='#app_04/best';f.run('route()');
 assert.ok(f.el('panel').innerHTML.includes('Chu 2025'));
 f.run("openDialog('test',recordCard(records.get('chu_meta_fp_usaf'),true))");
 for(const text of ['60 s','20–41%','532 nm','13 mm','5.2 mm','约4×','1.75 × 1.75','81个','7.81 μm','3.91 μm','§2 Results','RCNN单帧预测不属于','实测NA','判读阈值'])assert.ok(f.el('detailBody').innerHTML.includes(text),text);
 f.location.hash='#app_04/sources';f.run('route()');
 assert.ok(f.el('panel').innerHTML.includes('10.1515/nanoph-2025-0416'));
 f.run("openMetric('resolution')");assert.ok(f.el('detailBody').innerHTML.includes('不能替代裸光学系统PSF或MTF'));
});
test('meta-FP search repeats, clears, and preserves existing TECF and array records',()=>{
 const f=fixture();
 for(const query of ['meta-FP','Chu 2025','unmatched_low_na_987','meta-FP','']){
  f.el('search').value=query;f.run('renderList()');
  assert.equal(f.el('resultCount').textContent,query==='unmatched_low_na_987'?'0 / 33 类应用':query?'1 / 33 类应用':'33 / 33 类应用');
 }
 for(const [app,record] of [['app_22','He 2022'],['app_14','Liu']]){
  f.location.hash='#'+app+'/best';f.run('route()');assert.ok(f.el('panel').innerHTML.includes(record));
 }
});

test('Airy profile renders all positions with width and length evidence boundaries',()=>{
 const f=fixture();f.location.hash='#app_25/best';f.run('route()');
 assert.ok(f.el('panel').innerHTML.includes('Battistella 2022'));
 f.run("openDialog('test',recordCard(records.get('battistella_airy_profile'),true))");
 for(const text of ['488 nm','7.8 ± 1.3 μm','10.1 ± 1.5 μm','11.1 ± 0.9 μm','y=0–3 mm','Fig.3C','第一主峰','不是荧光微球系统PSF','3306 μm','±的统计定义'])assert.ok(f.el('detailBody').innerHTML.includes(text),text);
 f.run("openMetric('sheet_thickness')");assert.ok(f.el('detailBody').innerHTML.includes('首主峰FWHM不表示旁瓣总能量'));
 f.run("openMetric('sheet_length')");assert.ok(f.el('detailBody').innerHTML.includes('不能不经判据直接当作实测有效长度'));
 f.location.hash='#app_25/sources';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('10.1016/j.isci.2022.104797'));
});
test('Airy search repeats, clears, and preserves independent existing experiments',()=>{
 const f=fixture();
 for(const query of ['Battistella','Airy','unmatched_airy_987','Battistella','']){
  f.el('search').value=query;f.run('renderList()');
  assert.equal(f.el('resultCount').textContent,query==='unmatched_airy_987'?'0 / 33 类应用':query?'1 / 33 类应用':'33 / 33 类应用');
 }
 f.location.hash='#app_25/best';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('Luo 2025'));
 for(const [app,record] of [['app_04','Chu 2025'],['app_22','He 2022'],['app_14','Liu']]){
  f.location.hash='#'+app+'/best';f.run('route()');assert.ok(f.el('panel').innerHTML.includes(record));
 }
});

test('light-sheet task tradeoffs show a source without fabricating P1/P2',()=>{
 const f=fixture();f.run("selected='app_25';tab='priority';render()");
 const panel=f.el('panel').innerHTML;
 assert.ok(panel.includes('任务权衡：没有统一重要性排序'));
 assert.ok(panel.includes('data-source="shi_lattice_2022"'));
 assert.equal(panel.includes('class="tier"'),false);
 f.run("openSource('shi_lattice_2022')");assert.ok(f.el('detailBody').innerHTML.includes('p.9 Discussion'));
 f.run("tab='sources';render()");assert.ok(f.el('panel').innerHTML.includes('10.1038/s41467-022-32341-w'));
});
test('sectioning definition and measured lattice record keep experimental boundaries visible',()=>{
 const f=fixture();f.run("openMetric('optical_sectioning_width')");
 for(const text of ['63%','半宽','积分范围','不是系统PSF FWHM','Table S2'])assert.ok(f.el('detailBody').innerHTML.includes(text),text);
 f.run("openDialog('test',recordCard(records.get('shi_lattice_bead_psf'),true))");
 for(const text of ['887 / 1075 nm','537 / 559 nm','16.8 μm','不是三个独立来源','0.45/0.35','560 nm/n=1.3属于模拟'])assert.ok(f.el('detailBody').innerHTML.includes(text),text);
});

test('sectioning definition shows its energy conflict, integration protocol and source',()=>{
 const f=fixture();f.location.hash='#app_25/metrics';f.run('route()');
 assert.ok(f.el('panel').innerHTML.includes('光学切片含能量宽度'));
 f.run("openMetric('optical_sectioning_width')");
 for(const text of ['63%','67%','全宽/半宽','实测或模型','10.1364/BOE.11.000008','§3.1.1','未读到PDF页面','不建立最佳声明'])assert.ok(f.el('detailBody').innerHTML.includes(text),text);
 assert.equal(f.el('detail').open,true);f.el('detail').close();assert.equal(f.el('detail').open,false);
 f.run("openMetric('optical_sectioning_width')");assert.equal(f.el('detail').open,true);
 f.location.hash='#app_25/sources';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('Remacha'));
 f.location.hash='#app_25/priority';f.run('route()');assert.ok(!f.el('panel').innerHTML.includes('光学切片含能量宽度'));
});
test('sectioning search repeats and clears without converting older measurements',()=>{
 const f=fixture();for(const query of ['含能量','Remacha','no_sectioning_match_987','含能量','']){
  f.el('search').value=query;f.run('renderList()');
  assert.equal(f.el('resultCount').textContent,query==='no_sectioning_match_987'?'0 / 33 类应用':query?'1 / 33 类应用':'33 / 33 类应用');
 }
 f.location.hash='#app_25/best';f.run('route()');
 for(const text of ['Luo 2025','Battistella 2022','7.8 ± 1.3 μm'])assert.ok(f.el('panel').innerHTML.includes(text));
 assert.ok(!f.el('panel').innerHTML.includes('Remacha'));
});

test('MLAG spacing definition and dual reported/recomputed evidence render with caveats',()=>{
 const f=fixture();f.run("openMetric('array_spacing_cv')");
 for(const word of ['10.3390/s25154833','不是强度均匀性','样本数','标准差估计口径'])assert.ok(f.el('detailBody').innerHTML.includes(word),word);
 f.location.hash='#app_14/best';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('Zhao 2025'));
 for(let i=0;i<2;i++){
  f.run("openDialog('test',recordCard(records.get('zhao_mlag_spacing'),true))");
  for(const word of ['1.25%','1.11%','1.12965%','1.05222%','6组配对','蓝绿复合','638 nm','Table 1','所核验段落未明确交代CV是否使用更多未列出数据'])assert.ok(f.el('detailBody').innerHTML.includes(word),word);
  assert.equal(f.el('detail').open,true);f.el('detail').close();assert.equal(f.el('detail').open,false);
 }
 f.location.hash='#app_14/sources';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('PMC12349526'));
});
test('MLAG query repeats, clears, and retains existing independent evidence',()=>{
 const f=fixture();
 for(const query of ['Zhao 2025','阵列光栅','unmatched_spacing_987','Zhao 2025','']){
  f.el('search').value=query;f.run('renderList()');assert.equal(f.el('resultCount').textContent,query==='unmatched_spacing_987'?'0 / 33 类应用':query?'1 / 33 类应用':'33 / 33 类应用');
 }
 f.location.hash='#app_14/best';f.run('route()');for(const word of ['Liu','Zhang 2022','Richards'])assert.ok(f.el('panel').innerHTML.includes(word),word);
 f.location.hash='#app_25/best';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('Battistella'));
});

test('LEOF loss and definition render all parameters, directions and evidence boundaries',()=>{
 const f=fixture();f.location.hash='#app_22/best';f.run('route()');
 assert.ok(f.el('panel').innerHTML.includes('Woźniak 2026'));
 for(let i=0;i<2;i++){
  f.run("openDialog('test',recordCard(records.get('wozniak_leof_repeatability'),true))");
  for(const text of ['0.76 dB','0.39 dB','约0.67 dB','0.40 dB','19, 22, 23, 22, 22','28, 23, 26, 26, 30','100次','§4.2','1550 nm','Fig.8b/9b','功率校准面','不是允许偏移公差'])assert.ok(f.el('detailBody').innerHTML.includes(text),text);
  f.run("$('detail').close()");assert.equal(f.el('detail').open,false);
 }
 f.run("openMetric('insertion_loss')");
 for(const text of ['−10 log10','几何平均','10.3390/ma19051013','p.6'])assert.ok(f.el('detailBody').innerHTML.includes(text),text);
 f.location.hash='#app_22/sources';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('10.3390/ma19051013'));
});
test('LEOF query repeats, clears, and preserves previous evidence',()=>{
 const f=fixture();
 for(const query of ['Woźniak','LEOF','unmatched_leof_987','Woźniak','']){
  f.el('search').value=query;f.run('renderList()');
  assert.equal(f.el('resultCount').textContent,query==='unmatched_leof_987'?'0 / 33 类应用':query?'1 / 33 类应用':'33 / 33 类应用');
 }
 for(const [app,record] of [['app_22','He 2022'],['app_25','Battistella 2022'],['app_04','Chu 2025'],['app_14','Liu']]){
  f.location.hash='#'+app+'/best';f.run('route()');assert.ok(f.el('panel').innerHTML.includes(record));
 }
});

test('FPM correction, all parameters and primary sources remain visible across dialogs',()=>{
 const f=fixture();f.location.hash='#app_04/best';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('Zheng 2013'));
 for(let i=0;i<2;i++){
  f.run("openDialog('test',recordCard(records.get('zheng_fpm_usaf_2013'),true))");
  for(const text of ['632 nm','约20 nm','NA 0.08','0.5（合成','半周期0.78 μm','整周期1.56 μm','2.75 μm / 0.275 μm','137个LED','中央49个各3次','120 mm²','约3 min / 约10 min','PDF p.8','10.1038/nphoton.2015.148','SI Fig.S2/S6/S7','0.55 μm','0, 0.6, 1, 1.25 cm','约30%','0.632 μm','0.197 billion','Michelson'])assert.ok(f.el('detailBody').innerHTML.includes(text),text);
  assert.equal(f.el('detail').open,true);f.run("$('detail').close()");assert.equal(f.el('detail').open,false);
 }
 f.run("openMetric('resolution')");assert.ok(f.el('detailBody').innerHTML.includes('整周期（线对周期）'));
 f.location.hash='#app_04/sources';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('10.1038/nphoton.2013.187'));
});
test('FPM search repeats, returns empty and clears without altering prior experiments',()=>{
 const f=fixture();
 for(const query of ['Zheng 2013','傅里叶叠层','unmatched_fpm_987','Zheng 2013','']){
  f.el('search').value=query;f.run('renderList()');
  assert.equal(f.el('resultCount').textContent,query==='unmatched_fpm_987'?'0 / 33 类应用':query?'1 / 33 类应用':'33 / 33 类应用');
 }
 for(const [app,text] of [['app_04','Chu 2025'],['app_25','Battistella 2022'],['app_22','He 2022'],['app_14','Liu']]){
  f.location.hash='#'+app+'/best';f.run('route()');assert.ok(f.el('panel').innerHTML.includes(text));
 }
 f.location.hash='#app_04/priority';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('650–1000 nm'));
});

test('array and SMF tradeoffs remain cited and discoverable without ranked status',()=>{
 const f=fixture();
 for(const [app,source,phrases] of [
  ['app_14','richards',['打印精度','18单元','后续设计建议','单透镜效率不能替代整阵列效率']],
  ['app_22','jovanovic_smf_2017',['Table 1','无波前像差','尚未制备','天文注入任务']]
 ]){
  f.location.hash='#'+app+'/priority';f.run('route()');
  const panel=f.el('panel').innerHTML;
  assert.ok(panel.includes('任务权衡：没有统一重要性排序'));
  assert.ok(panel.includes('data-source="'+source+'"'));assert.ok(!panel.includes('class="tier"'));
  for(const phrase of phrases)assert.ok(panel.includes(phrase),phrase);
  f.run(`openSource('${source}')`);assert.ok(f.el('detailBody').innerHTML.includes(source==='richards'?'pp.6–7':'pp.5–6'));
 }
 f.el('rankedOnly').checked=true;f.run('renderList()');
 assert.equal(f.el('resultCount').textContent,'2 / 33 类应用');
 for(const app of ['app_14','app_22'])assert.ok(!f.el('appList').innerHTML.includes('data-app="'+app+'"'));
 f.el('rankedOnly').checked=false;f.run('renderList()');
 for(const app of ['app_14','app_22'])assert.ok(f.el('appList').innerHTML.includes('data-app="'+app+'"'));
});

test('telecentric measurement task exposes source locations and non-interchangeable error metrics',()=>{
 const f=fixture();f.location.hash='#app_03/priority';f.run('route()');
 for(const word of ['二维尺寸测量','三维结构光','输入公差','data-source="li_telecentric_2015"'])assert.ok(f.el('panel').innerHTML.includes(word),word);
 assert.ok(!f.el('panel').innerHTML.includes('class="tier"'));
 f.run("openMetric('reprojection_error')");for(const word of ['Eq.(9)','坐标面','独立验证精度'])assert.ok(f.el('detailBody').innerHTML.includes(word),word);
 f.run("openMetric('dimensional_measurement_error')");assert.ok(f.el('detailBody').innerHTML.includes('MAE'));
 f.location.hash='#app_03/best';f.run('route()');for(const word of ['Li 2015','VariMagTL'])assert.ok(f.el('panel').innerHTML.includes(word),word);
 f.run("openDialog('test',recordCard(records.get('li_telecentric_calibration_2015'),true))");
 for(const word of ['9.4 μm','10.02 μm','16.5 μm','1.75 μm','4.5 μm','102.56 mm','验证集划分','Table 1','AD/BC'])assert.ok(f.el('detailBody').innerHTML.includes(word),word);
 f.el('rankedOnly').checked=true;f.run('renderList()');assert.ok(!f.el('appList').innerHTML.includes('data-app="app_03"'));
 f.el('rankedOnly').checked=false;f.el('search').value='Li 2015';f.run('renderList()');assert.equal(f.el('resultCount').textContent,'1 / 33 类应用');
});

test('machine vision separates defect visibility from dimensional measurement and preserves source boundaries',()=>{
 const f=fixture();f.location.hash='#app_02/priority';f.run('route()');
 for(const word of ['缺陷可见性任务','尺寸测量任务','漏检率','data-source="ma_defect_gamma_2026"','data-source="li_telecentric_2015"'])assert.ok(f.el('panel').innerHTML.includes(word),word);
 assert.ok(!f.el('panel').innerHTML.includes('class="tier"'));
 f.run("openMetric('defect_separability')");for(const word of ['Eq.(14)','ε在根号内','不是检测概率','10.3390/s26072032'])assert.ok(f.el('detailBody').innerHTML.includes(word),word);
 f.run("openDialog('test',recordCard(records.get('ma_gamma_defect_visibility'),true))");
 for(const word of ['0.986 → 1.001','1.392 → 1.447','1.062 → 1.082','8000 μs','D120','249 fps','&gt;255','未校正基线','置信区间'])assert.ok(f.el('detailBody').innerHTML.includes(word),word);
 for(const q of ['Ma 2026','unmatched_gamma_987','Ma 2026','']){f.el('search').value=q;f.run('renderList()');assert.equal(f.el('resultCount').textContent,q==='unmatched_gamma_987'?'0 / 33 类应用':q?'1 / 33 类应用':'33 / 33 类应用');}
 f.location.hash='#app_02/best';f.run('route()');for(const id of ['machine_hp','machine_m12','ma_gamma_defect_visibility'])assert.ok(f.el('panel').innerHTML.includes('data-record="'+id+'"'));
});

test('OCT query shows source conflicts and different measurement domains without an invented ranking',()=>{
 const f=fixture();f.location.hash='#app_23/priority';f.run('route()');
 for(const word of ['系统PSF','扫描时间','data-source="oct_definition"','data-source="spaide_oct_lateral_2022"'])assert.ok(f.el('panel').innerHTML.includes(word),word);
 assert.ok(!f.el('panel').innerHTML.includes('class="tier"'));
 for(const [id,words] of [['oct_axial',['幅度包络','群折射率','1/√2']],['gaussian_depth_focus',['2z_R','相差4倍','相折射率']]]){
  f.run(`openMetric('${id}')`);for(const word of words)assert.ok(f.el('detailBody').innerHTML.includes(word),word);
 }
 f.run("openSource('oct_definition')");assert.ok(f.el('detailBody').innerHTML.includes('§3.2.4'));
 f.run("openDialog('test',recordCard(records.get('spaide_oct_lateral_2022'),true))");
 for(const word of ['5.11 ± 0.034','4.9 ± 0.033','4.98 ± 0.06','19%','4.592','2.296','厂商','非实测','非患者实际PSF','色散补偿'])assert.ok(f.el('detailBody').innerHTML.includes(word),word);
 for(const q of ['Spaide 2022','no_oct_match_987','Spaide 2022','']){f.el('search').value=q;f.run('renderList()');assert.equal(f.el('resultCount').textContent,q==='no_oct_match_987'?'0 / 33 类应用':q?'1 / 33 类应用':'33 / 33 类应用');}
 f.location.hash='#app_23/best';f.run('route()');for(const id of ['oct36','spaide_oct_lateral_2022'])assert.ok(f.el('panel').innerHTML.includes('data-record="'+id+'"'));
 f.el('rankedOnly').checked=true;f.run('renderList()');assert.ok(!f.el('appList').innerHTML.includes('data-app="app_23"'));
});

test('thermal query separates NETD, source-size effect and temperature accuracy with traceable conditions',()=>{
 const f=fixture();f.location.hash='#app_10/priority';f.run('route()');
 assert.ok(f.el('panel').innerHTML.includes('定量辐射测温'));
 for(const id of ['koenig_thermal_2020','flir_a700_science_24'])assert.ok(f.el('panel').innerHTML.includes('data-source="'+id+'"'));
 assert.ok(!f.el('panel').innerHTML.includes('class="tier"'));
 f.run("openMetric('netd')");for(const word of ['Eq.(2)','1/√2','不是N−1','正态分布'])assert.ok(f.el('detailBody').innerHTML.includes(word),word);
 f.run("openMetric('size_of_source_effect')");assert.ok(f.el('detailBody').innerHTML.includes('不是负得越多越好'));
 for(const [id,words] of [['koenig_thermal_netd_2020',['11.7 / 73.5 / 34.6','9.6 / 9.1 / 13.0','U(k=2)','目测估读']],['flir_a700_24_science',['&lt;25 mK','+30°C','1.04','环境15–35°C']]]){
  f.run(`openDialog('test',recordCard(records.get('${id}'),true))`);for(const word of words)assert.ok(f.el('detailBody').innerHTML.includes(word),word);
 }
 f.location.hash='#app_10/best';f.run('route()');for(const id of ['lwir_requirements','lwir_product','koenig_thermal_netd_2020','flir_a700_24_science'])assert.ok(f.el('panel').innerHTML.includes('data-record="'+id+'"'));
 for(const q of ['König 2020','A700','thermal_unmatched_977','']){f.el('search').value=q;f.run('renderList()');assert.equal(f.el('resultCount').textContent,q==='thermal_unmatched_977'?'0 / 33 类应用':q?'1 / 33 类应用':'33 / 33 类应用');}
 f.el('rankedOnly').checked=true;f.run('renderList()');assert.ok(!f.el('appList').innerHTML.includes('data-app="app_10"'));
});

test('SWIR and low-NA records expose sampling, relay and evidence limits without unsupported ranking',()=>{
 const f=fixture();f.location.hash='#app_09/metrics';f.run('route()');
 f.run("openMetric('detector_nyquist')");
 for(const s of ['νN=500/p','不是50%的MTF值','EMVA'])assert.ok(f.el('detailBody').innerHTML.includes(s));
 f.location.hash='#app_09/priority';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('不同Ny/2频率的模拟'));
 f.run("openDialog('test',recordCard(records.get('dupre_swir_prototype_2023'),true))");
 for(const s of ['不是样机实测','Ny/2=100','Ny/2=50','UV光刻','未标H/V/对角'])assert.ok(f.el('detailBody').innerHTML.includes(s));
 f.run("openDialog('test',recordCard(records.get('balli_low_na_imaging_2021'),true))");
 for(const s of ['M-10X','约30 mm','42%归属有冲突','未独立判读'])assert.ok(f.el('detailBody').innerHTML.includes(s));
 for(const [q,n] of [['Dupre 2023',1],['Balli 2021',1],['no_swir_match_013',0],['',33]]){
  f.el('search').value=q;f.run('renderList()');assert.equal(f.el('resultCount').textContent,`${n} / 33 类应用`);
 }
});

test('fiber return-loss query shows definitions, experimental limits and normative exceptions together',()=>{
 const f=fixture();f.location.hash='#app_22/metrics';f.run('route()');f.run("openMetric('return_loss')");
 for(const s of ['−30 dB反射对应+30 dB回损','不能互换','G.671','G.957','G.650.3'])assert.ok(f.el('detailBody').innerHTML.includes(s));
 f.run("openDialog('test',recordCard(records.get('chanclou_gradissimo_return_2001'),true))");
 for(const s of ['±2 dB','0.0955%','不是样品达到100 dB','不是所有散点','未给偏振'])assert.ok(f.el('detailBody').innerHTML.includes(s));
 f.run("openDialog('test',recordCard(records.get('itu_g671_connector_2025'),true))");
 for(const s of ['允许−27 dB','−40 dB为研究中','Notes7、8','不是所有透镜'])assert.ok(f.el('detailBody').innerHTML.includes(s));
 for(const [q,n] of [['Chanclou 2001',1],['G.671 (2025)',1],['no_return_loss_qa',0],['',33]]){
  f.el('search').value=q;f.run('renderList()');assert.equal(f.el('resultCount').textContent,`${n} / 33 类应用`);
 }
});

test('MLA crosstalk query exposes reciprocal disagreement and acquisition conditions',()=>{
 const f=fixture();f.location.hash='#app_14/metrics';f.run('route()');f.run("openMetric('array_crosstalk')");
 for(const word of ['I_neigh/I_prim','负值','无量纲','MathML'])assert.ok(f.el('detailBody').innerHTML.includes(word));
 f.run("openDialog('test',recordCard(records.get('katopodis_mla_crosstalk_2025'),true))");
 for(const word of ['0.96535','0.05042','19.15','16.25','1.035','19.83','倒数','n=7','未取得出版PDF'])assert.ok(f.el('detailBody').innerHTML.includes(word));
 f.location.hash='#app_14/priority';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('data-source="katopodis_dual_mode_2025"'));assert.ok(!f.el('panel').innerHTML.includes('class="tier"'));
 for(const [q,n] of [['Katopodis 2025',1],['no_mla_crosstalk_match_013',0],['',33]]){f.el('search').value=q;f.run('renderList()');assert.equal(f.el('resultCount').textContent,`${n} / 33 类应用`);}
 f.location.hash='#app_14/best';f.run('route()');for(const id of ['zhao_mlag_spacing','zhang_hex_mla','liu_mla_100um','richards_main','katopodis_mla_crosstalk_2025'])assert.ok(f.el('panel').innerHTML.includes('data-record="'+id+'"'));
});
