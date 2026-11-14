import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {validateDevices} from '../scripts/devices.mjs';
const d=JSON.parse(fs.readFileSync(new URL('../data/devices.json',import.meta.url)));
test('device matrix validates provenance and finite numeric fields',()=>{assert.equal(validateDevices(d),true);for(const change of [x=>x.domains.phone.rows[0].values.mp.source='missing',x=>x.domains.phone.rows[0].values.mp.value='48',x=>x.domains.phone.rows.push(x.domains.phone.rows[0])]){const x=structuredClone(d);change(x);assert.throws(()=>validateDevices(x));}});
test('missing values are excluded, zero is not treated as missing',()=>{const code=fs.readFileSync(new URL('../web/devices.js',import.meta.url),'utf8');const f=code.slice(code.indexOf('function points('),code.indexOf('function chart('));const c=vm.createContext({});vm.runInContext(f,c);assert.equal(vm.runInContext("points([{values:{x:{value:null},y:{value:2}}},{values:{x:{value:0},y:{value:2}}}], 'x','y').length",c),1);});
test('no invented VisionPro per-eye values or motion-to-photon',()=>{const v=d.domains.xr.rows.find(r=>r.id==='visionprom5');assert.equal(v.values.width,undefined);assert.equal(v.values.latency,undefined);assert.equal(v.values.hz.value,120);});
test('FOV axes and camera modules remain separate',()=>{assert.deepEqual([...new Set(d.domains.phone.rows.map(r=>r.module))].sort(),['main','tele','ultrawide']);const p=d.domains.xr.rows.find(r=>r.id==='psvr2');assert.equal(p.values.hfov,undefined);assert.equal(p.values.ufov.value,110);});

// Content/interaction fixture only, not browser or visual acceptance.
function deviceFixture(data=d){
 const els=new Map();
 const el=id=>{if(!els.has(id))els.set(id,{value:id==='domain'?'phone':id==='module'?'main':'',innerHTML:'',textContent:'',hidden:false,handlers:{},addEventListener(type,fn){this.handlers[type]=fn;}});return els.get(id);};
 const c=vm.createContext({window:{DEVICE_DATA:structuredClone(data)},document:{getElementById:el}});
 vm.runInContext(fs.readFileSync(new URL('../web/devices.js',import.meta.url),'utf8'),c);
 return {el,change(id,value){el(id).value=value;el(id).handlers.change();}};
}
test('device domain and module controls can be changed repeatedly',()=>{
 const f=deviceFixture();
 for(const module of ['ultrawide','tele','main']){f.change('module',module);assert.ok(f.el('status').textContent.includes('当前 '+d.domains.phone.rows.filter(r=>r.module===module).length+' 个型号'));assert.match(f.el('table').innerHTML,/iPhone/);}
 for(let i=0;i<2;i++){
  f.change('domain','xr');assert.equal(f.el('module-label').hidden,true);assert.match(f.el('table').innerHTML,/Vision Pro/);assert.ok(!f.el('table').innerHTML.includes('iPhone'));
  f.change('domain','phone');assert.equal(f.el('module-label').hidden,false);assert.match(f.el('table').innerHTML,/iPhone/);
 }
});
test('device empty chart retains the table, definitions and cited sources',()=>{
 const f=deviceFixture();
 const numeric=d.domains.phone.metrics.filter(m=>m.numeric);
 const missing=numeric.find(m=>d.domains.phone.rows.filter(r=>r.module==='main').every(r=>!Number.isFinite(r.values[m.id]?.value)));
 assert.ok(missing,'fixture must include an unverified numeric metric');
 f.change('x',missing.id);assert.match(f.el('chart').innerHTML,/暂无同时已知/);assert.match(f.el('status').textContent,/0 个可绘制点/);
 assert.match(f.el('table').innerHTML,/iPhone/);assert.match(f.el('definitions').innerHTML,/比较前提/);assert.match(f.el('sources').innerHTML,/https:\/\//);
 f.change('x','mp');f.change('y','f');assert.match(f.el('chart').innerHTML,/<svg/);
});
test('device page explicitly overrides the inherited fixed header height',()=>{
 const html=fs.readFileSync(new URL('../web/devices.html',import.meta.url),'utf8');
 assert.match(html,/header\{[^}]*height:auto/);
});

test('coincident model coordinates are grouped without jitter and retain every model',()=>{
 const f=deviceFixture();f.change('module','tele');f.change('x','mp');f.change('y','f');
 assert.match(f.el('chart').innerHTML,/2 个型号/);assert.match(f.el('chart').innerHTML,/同坐标重合/);
 assert.match(f.el('chart').innerHTML,/iPhone 18 Pro/);assert.match(f.el('chart').innerHTML,/Pixel 11 Pro/);
 f.change('domain','xr');f.change('x','hz');f.change('y','hz');
 const html=f.el('chart').innerHTML;assert.equal((html.match(/<circle /g)||[]).length,2);assert.match(html,/8 个型号/);assert.match(html,/\(120, 120\)/);
 for(const r of d.domains.xr.rows)assert.ok(html.includes(r.model));
});

test('scrolling the plot cannot move the model legend outside the viewport',()=>{
 const f=deviceFixture();
 const html=f.el('chart').innerHTML;
 const plot=html.match(/<div[^>]*class="[^"]*plot-scroll[^"]*"[^>]*>([\s\S]*?)<\/div>/);
 assert.ok(plot,'the plot must have its own scroll region');
 assert.match(plot[0],/tabindex="0"/);
 assert.match(plot[0],/aria-describedby="chart-scroll-hint"/);
 assert.match(plot[1],/<svg/);
 assert.ok(!plot[1].includes('<ul'),'model legend must not scroll with the SVG');
 assert.ok(html.indexOf('<ul')>=html.indexOf(plot[0])+plot[0].length);
 assert.match(html,/id="chart-scroll-hint">[^<]*横向滚动/);
 const page=fs.readFileSync(new URL('../web/devices.html',import.meta.url),'utf8');
 assert.ok(!/<div[^>]*class="scroll"[^>]*id="chart"/.test(page),'outer chart must not be a scroll container');
});

test('domain and camera changes reset the table offset while axis changes preserve it',()=>{
 const f=deviceFixture();
 for(const [id,value] of [['domain','xr'],['domain','phone'],['module','tele'],['module','ultrawide']]){
  f.el('table').scrollLeft=397;f.change(id,value);
  assert.equal(f.el('table').scrollLeft,0,`${id} must show the new table from its model column`);
  assert.match(f.el('table').innerHTML,/型号 \/ 配置/);
 }
 f.el('table').scrollLeft=120;f.change('x','f');
 assert.equal(f.el('table').scrollLeft,120,'changing only chart axes should not move the table');
});

test('close or coincident coordinates always render distinct readable axis tick labels',()=>{
 const only120=structuredClone(d);only120.domains.xr.rows=only120.domains.xr.rows.filter(r=>r.values.hz?.value===120);
 const f=deviceFixture(only120);f.change('domain','xr');f.change('x','hz');f.change('y','hz');
 const html=f.el('chart').innerHTML;
 const x=[...html.matchAll(/<text x="[^"]+" y="395"[^>]*>([^<]+)<\/text>/g)].map(m=>m[1]);
 const y=[...html.matchAll(/<text x="80" y="[^"]+"[^>]*>([^<]+)<\/text>/g)].map(m=>m[1]);
 for(const labels of [x,y]){
  assert.deepEqual(labels,['118.8','119.4','120','120.6','121.2']);
  assert.equal(new Set(labels).size,5);
 }
 const code=fs.readFileSync(new URL('../web/devices.js',import.meta.url),'utf8');
 const c=vm.createContext({});
 vm.runInContext(code.slice(code.indexOf('function tickLabels('),code.indexOf('function chart(')),c);
 for(const [min,max] of [[0,1],[-1.0002,-1], [1e-7,1.002e-7],[1e12,1e12+100]]){
  const labels=vm.runInContext(`tickLabels(${min},${max})`,c);
  assert.equal(new Set(labels).size,5,`distinct ticks across ${min}..${max}`);
  for(let i=0;i<5;i++){
   const value=Number(labels[i]),expected=min+(max-min)*i/4;
   assert.ok(Number.isFinite(value));
   assert.ok(Math.abs(value-expected)<=(max-min)/8,`label ${labels[i]} must retain its magnitude`);
   if(i)assert.ok(value>Number(labels[i-1]));
  }
 }
});

test('follow-up specifications preserve unresolved ranges and optical measurement boundaries',()=>{
 const tele=d.domains.phone.rows.find(r=>r.id==='xiaomi17ultra_tele');
 assert.equal(tele.values.f,undefined);assert.equal(tele.values.focal,undefined);assert.match(tele.values.mp.note,/75–100/);
 const x=d.domains.xr.rows.find(r=>r.id==='xreal_one_pro');
 for(const key of ['width','height','brightness','latency','hfov','ppd'])assert.equal(x.values[key],undefined);
 const v=d.domains.xr.rows.find(r=>r.id==='vive_focus_vision');assert.match(v.values.hz.note,/DisplayPort.*Beta/);assert.equal(v.values.hfov,undefined);
 assert.equal(d.domains.phone.rows.length,15);assert.equal(d.domains.xr.rows.length,11);
});

test('XREAL optical scheme is sourced without adopting marketing performance claims',()=>{
 const r=d.domains.xr.rows.find(r=>r.id==='xreal_one_pro');
 assert.equal(r.values.optics.value,'X Prism');assert.equal(r.values.optics.source,'xreal_pro_product');
 assert.match(r.values.optics.note,/不等于/);assert.equal(r.values.mtf,undefined);
});

test('dense model labels avoid one another and every true point without mutating coordinates',()=>{
 const code=fs.readFileSync(new URL('../web/devices.js',import.meta.url),'utf8');
 const c=vm.createContext({});vm.runInContext(code.slice(code.indexOf('function layoutLabels('),code.indexOf('function chart(')),c);
 const scenarios=[
  [{x:156,y:86,label:'Pixel 11 Pro'},{x:156,y:95,label:'Xiaomi 17 Ultra'}],
  [{x:148,y:344,label:'2 个型号'},{x:156,y:341,label:'Galaxy S26 Ultra'},{x:732,y:86,label:'Xiaomi 17 Ultra'}],
  Array.from({length:6},(_,i)=>({x:150+i,y:330+i,label:'密集样本完整型号 '+i}))
 ];
 const overlap=(a,b)=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
 for(const items of scenarios){
  const original=JSON.stringify(items);c.items=items;
  const labels=vm.runInContext('layoutLabels(items)',c);
  assert.equal(JSON.stringify(items),original);
  assert.equal(labels.length,items.length);assert.ok(labels.every(Boolean),'all catalog-sized groups need a visible label');
  labels.forEach((label,i)=>{
   assert.ok(label.x>=100&&label.x+label.width<=800&&label.y>=40&&label.y+label.height<=360);
   labels.slice(i+1).forEach(other=>assert.ok(!overlap(label,other),'model label boxes overlap'));
   items.forEach(point=>assert.ok(!overlap(label,{x:point.x-7,y:point.y-7,width:14,height:14}),'a label covers a data point'));
  });
 }
});

test('label displacement leaves the PR60 dense telephoto marker coordinates exactly in place',()=>{
 const f=deviceFixture();f.change('module','tele');f.change('x','mp');f.change('y','mp');
 const html=f.el('chart').innerHTML;
 const circles=[...html.matchAll(/<circle cx="([^"]+)" cy="([^"]+)"/g)].map(m=>[Number(m[1]),Number(m[2])]);
 // Golden SVG positions from a232977 before the label-only repair.
 const expected=[[148.33333333333334,344.1666666666667],[156.00877192982455,340.7675438596491],[731.6666666666666,85.83333333333337]];
 assert.equal(circles.length,expected.length);
 circles.forEach((point,i)=>point.forEach((value,j)=>assert.ok(Math.abs(value-expected[i][j])<1e-10)));
 const leaders=[...html.matchAll(/<line class="label-leader" x1="([^"]+)" y1="([^"]+)"/g)].map(m=>[Number(m[1]),Number(m[2])]);
 assert.deepEqual(leaders,circles,'each label leader must start on its unchanged data point');
 assert.equal((html.match(/class="point-label"/g)||[]).length,3);
});

test('crowded and coincident labels keep every complete model in the readable legend',()=>{
 const f=deviceFixture();
 for(const module of ['main','tele']){
  f.change('module',module);const html=f.el('chart').innerHTML;
  const legend=html.slice(html.indexOf('<ul class="chart-legend"'));
  for(const r of d.domains.phone.rows.filter(r=>r.module===module&&r.values.f))assert.ok(legend.includes(r.model));
  assert.ok(!html.includes('部分文字标签'),'current catalog labels must all fit');
 }
 f.change('domain','xr');f.change('x','hz');f.change('y','hz');
 const html=f.el('chart').innerHTML;assert.equal((html.match(/<circle /g)||[]).length,2);
 assert.match(html,/8 个型号/);for(const r of d.domains.xr.rows)assert.ok(html.includes(r.model));
 assert.ok(!html.includes('部分文字标签'));
 const longName=structuredClone(d);longName.domains.phone.rows=[longName.domains.phone.rows[0]];
 longName.domains.phone.rows[0].model='完整型号'.repeat(40);
 const overflow=deviceFixture(longName).el('chart').innerHTML;
 assert.match(overflow,/部分文字标签请见下方完整图例/);
 assert.equal((overflow.match(/<circle /g)||[]).length,1);
 assert.ok(overflow.includes(longName.domains.phone.rows[0].model),'even an oversized label must keep its complete identity');
});

test('XREAL 1S binocular and unmeasured optical quantities remain unfilled',()=>{
 const r=d.domains.xr.rows.find(r=>r.id==='xreal_1s');assert.equal(r.values.hz.value,120);assert.equal(r.values.ufov.value,52);
 assert.match(r.values.hz.note,/90 Hz/);assert.match(r.values.panel.note,/双眼/);
 for(const k of ['width','height','brightness','ppd','hfov','vfov','latency'])assert.equal(r.values[k],undefined);
 for(const c of Object.values(r.values)){assert.equal(c.source,'xreal_1s_official');assert.match(c.location,/XREAL 1S/);}
});

 test('Luma Pro keeps explicit per-eye specs and missing measurement boundaries',()=>{const r=d.domains.xr.rows.find(r=>r.id==='viture_luma_pro');assert.equal(r.values.width.value,1920);assert.equal(r.values.height.value,1200);assert.equal(r.values.hz.value,120);assert.match(r.values.hz.note,/60 Hz/);assert.equal(r.values.ufov.value,52);for(const k of ['hfov','vfov','ppd','eyebox','eyerelief','brightness','mtf','latency'])assert.equal(r.values[k],undefined);});

test('XR scope count follows current rows',()=>{assert.ok(d.domains.xr.scope.startsWith(`${d.domains.xr.rows.length}款`));});

test('line mode orders by numeric x and keeps the same point coordinates',()=>{
 const f=deviceFixture();const scatter=f.el('chart').innerHTML;f.change('mode','line');const line=f.el('chart').innerHTML;
 assert.match(line,/class="model-line"/);
 const coords=s=>[...s.matchAll(/<circle cx="([^"]+)" cy="([^"]+)"/g)].map(m=>[+m[1],+m[2]]);
 assert.deepEqual(coords(scatter),coords(line));
 const xs=line.match(/class="model-line" points="([^"]+)"/)[1].split(' ').map(s=>+s.split(',')[0]);assert.ok(xs.every((x,i)=>i===0||x>=xs[i-1]));
 f.change('x','sfr');assert.ok(!f.el('chart').innerHTML.includes('polyline'));assert.ok(!f.el('chart').innerHTML.includes('<circle'));
});

test('CSV exports missing values, notes and provenance with formula and quoting protection',()=>{
 const code=fs.readFileSync(new URL('../web/devices.js',import.meta.url),'utf8');const c=vm.createContext({D:d});
 vm.runInContext(code.slice(code.indexOf('function cellText('),code.indexOf('function render('))+code.slice(code.indexOf('function csvText('),code.indexOf("['domain','module','x','y','mode','sort','evidence']",code.indexOf('function csvText('))),c);
 c.rows=[{model:'=1+2',variant:'a,"b',values:{mp:{value:48,source:'apple_phone',location:'Camera',note:'line\n2'}}}];c.ms=[{id:'mp',label:'MP'},{id:'dr',label:'DR'}];
 const s=vm.runInContext('csvText(rows,ms)',c);assert.ok(s.startsWith('\ufeff'));assert.ok(s.includes("'=1+2"));assert.ok(s.includes('a,""b'));assert.ok(s.includes('未公开 / 未核验'));assert.ok(s.includes('https://www.apple.com/iphone-18-pro/specs/'));
});

test('OPPO Global camera fields are paired by module without inferred focal length or negative OIS',()=>{
 const rows=d.domains.phone.rows.filter(r=>r.id.startsWith('oppo_x10_pro_max_'));
 assert.equal(rows.length,3);
 for(const [module,f,fov] of [['main',1.5,84],['ultrawide',2.2,124],['tele',2.1,34]]){
  const r=rows.find(r=>r.module===module);assert.equal(r.values.mp.value,200);assert.equal(r.values.f.value,f);assert.equal(r.values.fov.value,fov);
  assert.equal(r.values.focal,undefined);assert.equal(r.values.sensor,undefined);assert.equal(r.values.sfr,undefined);
  assert.equal(r.values.af.value,'支持');if(module==='ultrawide')assert.equal(r.values.ois,undefined);else assert.equal(r.values.ois.value,'两轴 OIS');
  assert.ok(Object.values(r.values).every(v=>v.source==='oppo_x10_pro_max_global_20261114'&&v.location.includes('Camera / Rear')));
 }
});
test('metric citations reject broken references and stay visible even with no selected rows',()=>{
 for(const ref of [{source:'missing',location:'test'},{source:'edmund_fnumber_20261114'}]){
  const x=structuredClone(d);x.domains.phone.metrics[0].definition_refs=[ref];assert.throws(()=>validateDevices(x),/metric definition provenance/);
 }
 const empty=structuredClone(d);empty.domains.phone.rows=[];const f=deviceFixture(empty);
 for(const id of ['edmund_fnumber_20261114','tudelft_principal_planes_20261114']){
  assert.ok(f.el('definitions').innerHTML.includes(`href="#source-${id}"`));assert.ok(f.el('sources').innerHTML.includes(`id="source-${id}"`));
 }
 assert.match(f.el('sources').innerHTML,/学术教材/);assert.match(f.el('sources').innerHTML,/原厂技术说明/);
});

test('XR study records retain measured, reported and unavailable scalar boundaries',()=>{
 const rs=d.domains.xr.rows.filter(r=>r.evidence_type==='study');assert.equal(rs.length,3);assert.equal(new Set(rs.map(r=>r.study_id)).size,1);
 for(const r of rs){assert.equal(r.values.mtf.value,null);assert.match(r.values.mtf.display,/曲线/);assert.equal(r.values.width.basis,'reported_configuration');assert.equal(r.values.duty_cycle.basis,'measured');assert.equal(r.values.brightness,undefined);assert.equal(r.values.ppd,undefined);assert.equal(r.values.latency,undefined);}
 assert.deepEqual(rs.map(r=>r.values.duty_cycle.value),[17,17,5]);assert.deepEqual(rs.map(r=>r.values.luminance_study.value),[208,130,79]);
 const v=rs.find(r=>r.id==='vive_pro2_2022_study');assert.equal(v.values.emission_ms.value,.42);assert.match(v.measurement_scope,/中心/);
 const f=deviceFixture();f.change('domain','xr');f.change('evidence','study');assert.match(f.el('status').textContent,/当前 3 个型号/);assert.match(f.el('table').innerHTML,/论文所列配置/);assert.match(f.el('table').innerHTML,/论文实测/);assert.match(f.el('table').innerHTML,/曲线见Fig.5/);assert.ok(!f.el('table').innerHTML.includes('Meta Quest 3'));
 f.change('x','mtf');assert.ok(!f.el('chart').innerHTML.includes('<circle'));f.change('evidence','manufacturer');assert.match(f.el('status').textContent,/当前 8 个型号/);assert.ok(!f.el('table').innerHTML.includes('2022研究'));assert.match(f.el('guidance').innerHTML,/平滑追踪/);assert.match(f.el('sources').innerHTML,/同行评议研究论文/);
});
test('study provenance and curve placeholders cannot silently become numeric measured points',()=>{
 for(const change of [r=>delete r.study_id,r=>delete r.measurement_scope,r=>delete r.values.width.basis,r=>r.values.mtf.value=.8]){
  const x=structuredClone(d),r=x.domains.xr.rows.find(r=>r.evidence_type==='study');change(r);assert.throws(()=>validateDevices(x),/study|curve/);
 }
 const x=structuredClone(d);x.domains.xr.task_guidance[0].source='missing';assert.throws(()=>validateDevices(x),/task guidance provenance/);
});

test('chart hover retains every coincident study record and its measured provenance',()=>{
 const x=structuredClone(d),r=x.domains.xr.rows.find(r=>r.id==='vive_2022_study');
 r.values.duty_cycle.note='<script>untrusted note</script>';
 const f=deviceFixture(x);f.change('domain','xr');f.change('evidence','study');f.change('x','hz');f.change('y','duty_cycle');
 const html=f.el('chart').innerHTML,titles=[...html.matchAll(/<circle[^>]*><title>([\s\S]*?)<\/title>/g)].map(m=>m[1]);
 assert.equal(titles.length,2);
 const shared=titles.find(t=>t.includes('HTC VIVE'));
 assert.match(shared,/VIVE Pro（2022研究）/);
 assert.match(shared,/论文实测/);assert.match(shared,/Spatiotemporal image quality/);assert.match(shared,/Fig\.6/);
 assert.match(shared,/&lt;script&gt;untrusted note&lt;\/script&gt;/);assert.ok(!shared.includes('<script>'));
 assert.match(html,/<a href="#source-zhao_vr_spatiotemporal_2022">出处与读取范围<\/a>/);
 f.change('domain','phone');f.change('evidence','manufacturer');f.change('x','mp');f.change('y','f');assert.match(f.el('chart').innerHTML,/<title>[^<]*厂商规格/);
});
