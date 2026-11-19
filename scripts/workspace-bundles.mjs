import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {createWorkspace, valueSources} from '../web/workspace-data.js';

export function writeWorkspaceBundles(directory, catalog, devices) {
  const atlas = createWorkspace(catalog,devices);
  const domains = [];
  const folder = path.join(directory,'domains');
  fs.mkdirSync(folder,{recursive:true});
  const references = path.join(directory,'references');
  fs.mkdirSync(references,{recursive:true});
  const generated = new Set();
  function writeJson(file,data) {
    generated.add(file);
    const json = JSON.stringify(data);
    const hash = crypto.createHash('sha256').update(json).digest('hex').slice(0,16);
    fs.writeFileSync(path.join(directory,file),json);
    return file+'?v='+hash;
  }
  const papers = new Map(), detailUrls = new Map();
  for (const source of atlas.sources.values()) {
    const main = source.publication_source || source.id;
    if (!papers.has(main)) papers.set(main,[]);
    papers.get(main).push(source);
  }
  for (const [main,materials] of papers) {
    detailUrls.set(main,writeJson('references/'+main+'.json',materials));
  }
  for (const domain of atlas.domains) {
    const app = domain.app;
    const comparisons = catalog.comparisons.filter(c=>c.application_id===domain.id);
    const metricIds = new Set([...(app?.metric_ids || []), ...comparisons.flatMap(c=>c.fields.flatMap(f=>f.metric_ids))]);
    const metrics = catalog.metrics.filter(m=>metricIds.has(m.id));
    const ids = new Set([...domain.sourceIds, ...(domain.task_guidance || []).map(g=>g.source)]);
    for (const metric of metrics) for (const id of metric.definition_refs) ids.add(id);
    for (const metric of domain.metrics) for (const ref of metric.definition_refs || []) ids.add(ref.source);
    for (const row of domain.rows) {
      for (const id of row.sourceIds || []) ids.add(id);
      for (const value of Object.values(row.values)) for (const id of valueSources(value)) ids.add(id);
    }
    for (const id of ids) {
      const parent = atlas.sources.get(id)?.publication_source;
      if (parent) ids.add(parent);
    }
    const sources = [...ids].map(id=>atlas.sources.get(id)).filter(Boolean);
    const evidence = {metrics, comparisons, benchmarks:catalog.benchmarks.filter(r=>r.application_id===domain.id),
      bests:catalog.bests.filter(b=>b.application_id===domain.id)};
    // Many spectral rows cite the identical measurement object, including its full protocol.
    const valueIndex = new Map(), values = [];
    for (const row of domain.rows) {
      for (const [metric,value] of Object.entries(row.values)) {
        const key = JSON.stringify(value);
        if (!valueIndex.has(key)) { valueIndex.set(key,values.length); values.push(value); }
        row.values[metric] = valueIndex.get(key);
      }
    }
    if (app) evidence.sources = catalog.sources.filter(s=>ids.has(s.id));
    const headers = sources.map(({id,publication_source,title,doi,url,bibliography,paperLabel,source_year,checked_on,evidence_scope})=>
      ({id,publication_source,title,doi,url,bibliography,paperLabel,source_year,checked_on,evidence_scope,detailsUrl:detailUrls.get(id)}));
    const url = writeJson('domains/'+domain.id+'.json',{domain,sources:headers,evidence,values});
    domains.push({id:domain.id,name:domain.name,category:domain.category,url});
  }
  for (const subdirectory of ['domains','references']) {
    for (const name of fs.readdirSync(path.join(directory,subdirectory))) {
      const file = subdirectory+'/'+name;
      if (name.endsWith('.json') && !generated.has(file)) fs.unlinkSync(path.join(directory,file));
    }
  }
  const coverage = {applications:catalog.applications.length, metrics:catalog.metrics.length, benchmarks:catalog.benchmarks.length,
    editorial:catalog.applications.filter(a=>a.ranking_status==='editorial_synthesis').length,
    explicit:catalog.applications.filter(a=>a.ranking_status==='author_explicit').length};
  const index = JSON.stringify({domains,meta:catalog.meta,coverage}).replaceAll('<','\\u003c');
  fs.writeFileSync(path.join(directory,'workspace-index.js'),'window.WORKSPACE_INDEX='+index+';\n');
}
