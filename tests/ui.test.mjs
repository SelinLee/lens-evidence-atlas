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
 f.location.hash='#app_14/priority';f.run('route()');assert.ok(f.el('panel').innerHTML.includes('不构成阵列'));
});
