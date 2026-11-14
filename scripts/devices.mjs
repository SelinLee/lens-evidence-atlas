export function validateDevices(d){
 const errors=[],ids=new Set(d.sources.map(s=>s.id));
 for(const s of d.sources)if(!s.scope||!/^https:\/\//.test(s.url)||!/^\d{4}-\d{2}-\d{2}$/.test(s.checked_on))errors.push('source metadata');
 for(const c of Object.values(d.domains)){
 const mids=new Set(c.metrics.map(m=>m.id));if(mids.size!==c.metrics.length)errors.push('duplicate metric');
 for(const m of c.metrics){for(const ref of m.definition_refs||[])if(!ids.has(ref.source)||!ref.location)errors.push('metric definition provenance');}
 const rids=new Set();for(const r of c.rows){if(rids.has(r.id))errors.push('duplicate row');rids.add(r.id);
 if(r.evidence_type==='study'&&(!r.study_id||!r.measurement_scope))errors.push('study scope');
 for(const [k,v]of Object.entries(r.values)){
  if(!mids.has(k)||!ids.has(v.source)||!v.location)errors.push('cell provenance');
  const m=c.metrics.find(m=>m.id===k);if(v.value!==null&&m?.numeric&&!Number.isFinite(v.value))errors.push('nonfinite numeric');
  if(r.evidence_type==='study'&&(!['reported_configuration','measured','model','modeled','derived_from_measurement','reconstruction'].includes(v.basis)||!v.note))errors.push('study cell evidence');
  if(v.uncertainty&&(!['SD','SEM'].includes(v.uncertainty.type)||!Number.isFinite(v.uncertainty.value)||v.uncertainty.value<0||!Number.isInteger(v.uncertainty.n)||v.uncertainty.n<2||v.statistic!=='mean'))errors.push('reported uncertainty');
 }
 }
 }
 if(errors.length)throw new Error(errors.join('\n'));return true;
}
