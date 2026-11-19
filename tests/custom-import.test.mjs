import test from 'node:test';
import assert from 'node:assert/strict';
import {customImportTemplate,mergeCustomImport} from '../web/workspace-data.js';

const domain = {id:'optics',name:'测试领域',metrics:[
  {id:'field-1',label:'焦距 (mm)',parameterKey:'["焦距","mm"]',numeric:true},
  {id:'note',label:'备注',numeric:false}
]};
const empty = {samples:[],metrics:[]};
test('templates use display names and units and import sparse values into stable storage keys',()=>{
  const template=customImportTemplate(domain,[]);
  assert.deepEqual(template.samples[0].values,{'焦距 (mm)':null});
  template.samples[0].values={'焦距 (mm)':0,'额外读数 (%)':-1.25,'空项':null};
  template.samples.push({name:'第二组',values:{'额外读数 (%)':2}});
  const {data,added}=mergeCustomImport(template,domain,empty);
  assert.equal(added.length,2);
  assert.deepEqual(data.metrics.map(m=>m.label),['额外读数 (%)']);
  assert.deepEqual(added[0].values,{'["焦距","mm"]':0,[data.metrics[0].id]:-1.25});
  assert.deepEqual(added[1].values,{[data.metrics[0].id]:2});
  const again=mergeCustomImport(template,domain,data);
  assert.equal(again.duplicates,2);assert.deepEqual(again.data,data);
});
test('invalid imports identify the affected sample and leave existing data untouched',()=>{
  const template=customImportTemplate(domain,[]);
  assert.throws(()=>mergeCustomImport(template,domain,empty),/没有指标数值/);
  template.samples[0].values={'新指标':1};
  template.samples.push({values:{'另一个指标':'oops'}});
  assert.throws(()=>mergeCustomImport(template,domain,empty),/第 2 个样本.*另一个指标/);
  assert.throws(()=>mergeCustomImport({...template,domain:'other'},domain,empty),/应用领域/);
  assert.deepEqual(empty,{samples:[],metrics:[]});
});

test('domains without numeric records also get named metrics from their definitions',()=>{
  const d={...domain,metrics:[]};
  const template=customImportTemplate(d,[],[{name:'光谱分辨率',unit:'nm'}]);
  assert.deepEqual(template.samples[0].values,{'光谱分辨率 (nm)':null});
  template.samples[0].values['光谱分辨率 (nm)']=0.25;
  assert.equal(mergeCustomImport(template,d,empty).data.metrics[0].label,'光谱分辨率 (nm)');
});
