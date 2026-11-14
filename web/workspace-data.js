// Preserve reported values. Legacy text is never guessed into a shared metric.
export function scalar(text) {
  const match = String(text).trim().match(/^(f\/)?([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*(mm|μm|µm|nm|m|cm|%|°|Hz|ms|s|MP|lp\/mm)?$/);
  if (!match || (match[1] && match[3])) return null;
  const value = Number(match[2]);
  return Number.isFinite(value) ? {value, unit: match[1] ? 'F数' : (match[3] || '无量纲').replace('µ', 'μ')} : null;
}

export function createWorkspace(catalog, devices) {
  const records = new Map(catalog.benchmarks.map(r => [r.id, r]));
  const definitions = new Map(catalog.metrics.map(m => [m.id, m]));
  const sources = new Map(catalog.sources.map(s => [s.id, s]));
  for (const source of devices.sources) sources.set('device-' + source.id, {...source, id: 'device-' + source.id, publication_source: source.publication_source && 'device-' + source.publication_source, evidence_scope: source.scope});
  const deviceDomains = Object.entries(devices.domains).map(([id, domain]) => ({
    ...domain, id, name: domain.name || (id === 'phone' ? '手机镜头 / 摄像头' : 'AR / VR 显示'), category: domain.category || '手机与近眼显示',
    task_guidance: (domain.task_guidance || []).map(g => ({...g, source: 'device-' + g.source})),
    metrics: domain.metrics.map(m => ({...m, definition_refs: (m.definition_refs || []).map(r => ({...r, source: 'device-' + r.source}))})),
    rows: domain.rows.map(r => ({...r, evidence: r.evidence_type === 'study' ? '研究记录 / 作者报告' : '厂商标称', variant: [r.variant, r.measurement_scope].filter(Boolean).join('；'), values: Object.fromEntries(Object.entries(r.values).map(([key, value]) => [key, {...value, ...(value.sourceIds ? {sourceIds:value.sourceIds.map(id=>'device-'+id)} : {}), evidence: value.frequency_status==='author_scale_unverified'?'作者原表刻度（未标定）':value.frequency_status==='author_stated_unit'?'作者报告实测（单位明示）':({measured:'研究实测',reported_configuration:'研究设备配置',modeled:'模型结果',model:'模型结果',derived_from_measurement:'由实测数据计算',reconstruction:'实验重建统计',unresolved:'原文待消歧',manufacturer_claim:'厂商标称'})[value.basis] || (r.evidence_type === 'study' ? '研究记录 / 作者报告' : '厂商标称'), source: 'device-' + value.source}]))})),
    sourceIds: [], asOf: devices.as_of
  }));
  const legacyDomains = catalog.applications.map(app => {
    const metrics = [], byKey = new Map();
    const rows = app.record_ids.map(id => {
      const record = records.get(id), values = {};
      for (const [index, p] of record.parameters.entries()) {
        const number = scalar(p.value), unit = number?.unit || '原文';
        const key = JSON.stringify([p.name, unit]);
        if (!byKey.has(key)) {
          const field = {id: 'field-' + metrics.length, label: p.name + (number ? ` (${unit})` : ''), numeric: !!number,
            definition: '保留该样本的原始参数名称与口径。名称不同不自动合并；复合值、区间及误差不压成单值。',
            conditions: '须核对各记录的波段、样品、测量方法与参考面；同名同单位不代表同条件可比。', definition_refs: []};
          metrics.push(field); byKey.set(key, field);
        }
        const field = byKey.get(key), source = p.evidence?.source_id;
        values[field.id] = {value: number?.value ?? null, display: p.value, source: source || null,
          sourceIds: source ? [source] : record.source_ids, location: p.evidence?.location || '',
          note: record.conditions, evidence: record.evidence_type, checked_on: record.checked_on, parameterIndex: index};
      }
      return {id: record.id, visibleLight:record.visible_light_use===true || record.parameters.some(visibleLegacyParameter), model: record.name, variant: record.conditions, evidence: record.evidence_type,
        sourceIds: record.source_ids, missing: record.unreported_or_not_verified, checked_on: record.checked_on, values};
    });
    const sourceIds = new Set(app.ranking_gap_refs || []);
    for (const id of app.metric_ids) for (const ref of definitions.get(id).definition_refs) sourceIds.add(ref);
    for (const p of app.priorities) for (const ref of p.evidence_refs) sourceIds.add(ref);
    for (const row of rows) for (const ref of row.sourceIds) sourceIds.add(ref);
    for (const b of catalog.bests.filter(b => b.application_id === app.id)) for (const ref of b.evidence_refs) sourceIds.add(ref);
    return {id: app.id, name: app.name, category: app.category, scope: app.summary, app, rows, metrics, sourceIds: [...sourceIds], asOf: app.updated_on};
  });
  const domains = [...deviceDomains, ...legacyDomains];
  for (const domain of domains) {
    for (const row of domain.rows) {
      const ids = row.sourceIds || Object.values(row.values).flatMap(valueSources);
      const publications = new Set(ids.map(id=>sources.get(id)?.publication_source || id)
        .filter(id=>paperKinds.has(sources.get(id)?.kind)));
      if (publications.size === 1 && (domain.app || row.study_id)) row.paper = [...publications][0];
    }
  }
  return {domains, sources};
}

const paperKinds = new Set(['paper','peer_reviewed_paper','workshop_paper','conference_paper','author_manuscript','doctoral_thesis']);

export function groupRows(rows) {
  const groups = new Map();
  for (const row of rows) {
    const key = row.study_id || row.paper || row.id;
    if (!groups.has(key)) groups.set(key, {key, paper:row.paper, rows:[]});
    const group = groups.get(key);
    group.paper ??= row.paper;
    group.rows.push(row);
  }
  return [...groups.values()];
}

// This is the UI passband. A wavelength-resolved row takes precedence over the lens's full band.
const inVisible = nm => nm >= 380 && nm <= 780;
function visibleLegacyParameter(p) {
  // Parse only fields that describe absolute spectral positions. A PSF width, pillar height,
  // filter width or focal shift in nm does not place a sample in the visible spectrum.
  const field = /^(?:波长|波段|光谱|校色范围|系列轴向校色|评价波段|表征光谱|元件消色差表征范围|成像照明|三波长焦距（作者记法）|.*(?:中心波长|设计波长|实测波长|测量照明波长|对准波长|工作波段|优化波段|优化光谱范围|测量波段|荧光波长))$/;
  if (/^(照明|绿色荧光配置)$/.test(p.name) && /绿色LED|绿色荧光|绿光|红光|蓝光/.test(p.name+p.value)) return true;
  if (!field.test(p.name)) {
    // A wavelength qualifier on another metric, e.g. NA 0.471 @633 nm.
    return [...p.value.matchAll(/@\s*(\d+(?:\.\d+)?)\s*nm/g)].some(m=>inVisible(Number(m[1])));
  }
  const text = p.value.split('→')[0];
  const match = text.match(/(\d+(?:\.\d+)?(?:\s*[/–—~-]\s*\d+(?:\.\d+)?)*)\s*(nm|[µμ]m)/);
  if (match) {
    const values = match[1].split(/[/–—~-]/).map(v=>Number(v)*(match[2]==='nm'?1:1000));
    if (values.some(inVisible)) return true;
    if (values.length===2 && !match[1].includes('/')) return values[0]<=780 && values[1]>=380;
  }
  return false;
}

export function hasVisibleLight(domain, row) {
  const v = row.values;
  const wavelength = v.wavelength_nm?.value ?? v.efficiency_lambda_nm?.value;
  if (Number.isFinite(wavelength)) return inVisible(wavelength);
  const low = v.lambda_min_nm?.value, high = v.lambda_max_nm?.value;
  if (Number.isFinite(low) && Number.isFinite(high)) return low<=780 && high>=380;
  // These camera modules and near-eye display configurations explicitly serve colour imaging/viewing.
  if (domain.id==='phone') return ['main','ultrawide','tele','external_macro','native_research'].includes(row.module);
  if (domain.id==='xr') return true;
  return row.visibleLight === true;
}

export function valueSources(value) { return value?.sourceIds || (value?.source ? [value.source] : []); }

export function filteredRows(domain, state) {
  const available = domain.rows.filter(r => (!state.visible || hasVisibleLight(domain,r)) && (domain.id !== 'phone' || r.module === state.module) &&
    (!state.query || [r.model, r.variant, r.evidence].join(' ').toLowerCase().includes(state.query.toLowerCase())) &&
    (!state.evidence || (state.evidence === 'manufacturer' ? /厂商|商业|manufacturer/.test(r.evidence || r.variant) : !/厂商|商业|manufacturer/.test(r.evidence || r.variant))));
  return available.filter(r => state.models === null || state.models.includes(r.id));
}

export function axisPoints(rows, x, y) {
  return rows.flatMap((row, index) => {
    const xv = x === '$model' ? index + 1 : row.values[x]?.value, yv = row.values[y]?.value;
    return Number.isFinite(xv) && Number.isFinite(yv) ? [{row, x: xv, y: yv}] : [];
  });
}

export function metricAvailability(rows, metric) {
  return rows.filter(row => Number.isFinite(row.values[metric]?.value)).length;
}

export function availableAxes(domain, rows) {
  const metrics = domain.metrics.filter(m => m.numeric);
  const ranked = metrics.map(m => ({id:m.id, count:metricAvailability(rows,m.id)})).sort((a,b)=>b.count-a.count);
  const x = ranked.find(m=>m.count)?.id;
  if (!x) return {x:'$model', y:metrics[0]?.id || ''};
  const y = ranked.filter(m=>m.id!==x).map(m=>({...m, pairs:axisPoints(rows,x,m.id).length})).sort((a,b)=>b.pairs-a.pairs)[0];
  return y?.pairs ? {x, y:y.id} : {x:'$model', y:x};
}
