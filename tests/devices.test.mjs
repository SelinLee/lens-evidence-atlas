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
 for(const module of ['ultrawide','tele','main']){f.change('module',module);assert.match(f.el('status').textContent,/当前 4 个型号/);assert.match(f.el('table').innerHTML,/iPhone/);}
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
 const html=f.el('chart').innerHTML;assert.equal((html.match(/<circle /g)||[]).length,2);assert.match(html,/5 个型号/);assert.match(html,/\(120, 120\)/);
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
 assert.equal(d.domains.phone.rows.length,12);assert.equal(d.domains.xr.rows.length,6);
});

test('XREAL optical scheme is sourced without adopting marketing performance claims',()=>{
 const r=d.domains.xr.rows.find(r=>r.id==='xreal_one_pro');
 assert.equal(r.values.optics.value,'X Prism');assert.equal(r.values.optics.source,'xreal_pro_product');
 assert.match(r.values.optics.note,/不等于/);assert.equal(r.values.mtf,undefined);
});
