import {createWorkspace, valueSources, filteredRows, axisPoints, metricAvailability, availableAxes} from './workspace-data.js?v=c050b70bf78a0f91';

const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const atlas = createWorkspace(window.LENS_DATA, window.DEVICE_DATA), evidence = window.LensEvidence;
const initial = new URL(location.href), oldRoute = initial.hash.slice(1).split('/');
const state = {domain:'phone', module:'main', x:'mp', y:'f', mode:'scatter', sort:'original', models:null, columns:null, query:'', evidence:'', evidenceTab:'metrics', compare:[]};
let citations = new Map(), activeRows = [], activeColumns = [], activePoints = [], activeSetting = 'models';
const domain = () => atlas.domains.find(d => d.id === state.domain);
const rowAnchor = r => `row-${state.domain}-${r.id}`;
const cellAnchor = (r, m) => `cell-${state.domain}-${r.id}-${m.id}`;
const definitionAnchor = m => `definition-${state.domain}-${m.id}`;
const refAnchor = id => 'ref-' + id;
const citation = id => citations.has(id) ? `<a class="citation" href="#${esc(refAnchor(id))}" aria-label="参考文献 ${citations.get(id)}">[${citations.get(id)}]</a>` : '';
const sourceKind = kind => ({manufacturer:'厂商资料',manufacturer_technical:'原厂技术说明',scholarly_book:'学术书章',paper:'原始研究论文',peer_reviewed_paper:'同行评议论文',paper_review:'学术综述',standard:'标准 / 公开预览',supplementary_material:'论文补充材料',research_software:'作者研究代码',author_manuscript:'论文作者稿',conference_paper:'会议论文',metrology_reference:'计量与统计参考',trial_protocol:'原始试验方案',software_documentation:'原厂软件文档'})[kind] || kind || '厂商资料';
const valueText = value => value?.display ?? (value?.value === null || value?.value === undefined ? '未公开 / 未核验' : String(value.value));

function defaults(id) {
  state.domain = id; state.models = null; state.columns = null; state.query = ''; state.evidence = ''; state.compare = [];
  const numeric = domain().metrics.filter(m => m.numeric);
  if (domain().app) {
    const mostReported = [...numeric].sort((a,b) => domain().rows.filter(r=>Number.isFinite(r.values[b.id]?.value)).length - domain().rows.filter(r=>Number.isFinite(r.values[a.id]?.value)).length)[0];
    state.x = '$model'; state.y = mostReported?.id || '';
  } else { state.x = numeric[0]?.id || '$model'; state.y = numeric[1]?.id || numeric[0]?.id || ''; }
  state.evidenceTab = 'metrics';
}
function sourceIndex() {
  const d = domain(), ids = new Set([...d.sourceIds, ...(d.task_guidance || []).map(g=>g.source)]);
  for (const m of d.metrics) for (const ref of m.definition_refs || []) ids.add(ref.source);
  for (const r of d.rows) {
    for (const id of r.sourceIds || []) ids.add(id);
    for (const v of Object.values(r.values)) for (const id of valueSources(v)) ids.add(id);
  }
  citations = new Map([...ids].filter(id => atlas.sources.has(id)).map((id, i) => [id, i + 1]));
}
function saveView() {
  const url = new URL(location.href); url.search = '';
  for (const key of ['domain','module','x','y','mode','sort','evidence']) if (state[key]) url.searchParams.set(key, state[key]);
  if (state.query) url.searchParams.set('q', state.query);
  for (const key of ['models','columns']) if (state[key] !== null) url.searchParams.set(key, JSON.stringify(state[key]));
  if (state.compare.length) url.searchParams.set('compare', JSON.stringify(state.compare));
  if (/^#app_\d+/.test(url.hash)) url.hash = '';
  history.replaceState(null, '', url);
}
function restore(url) {
  const p = url.searchParams, id = p.get('domain') || (atlas.domains.some(d => d.id === oldRoute[0]) ? oldRoute[0] : 'phone');
  defaults(atlas.domains.some(d => d.id === id) ? id : 'phone');
  const valid = {module:['main','ultrawide','tele'], mode:['scatter'], sort:['original','model','x','y'], evidence:['','manufacturer','research']};
  for (const [key, choices] of Object.entries(valid)) if (choices.includes(p.get(key))) state[key] = p.get(key);
  for (const key of ['x','y']) { const value = p.get(key); if (domain().metrics.some(m => m.numeric && m.id === value) || (key === 'x' && value === '$model')) state[key] = value; }
  // Older device links selected model names. New links use stable row IDs.
  for (const key of ['models','columns','compare']) {
    try { const values = JSON.parse(p.get(key)); if (Array.isArray(values) && values.every(v => typeof v === 'string')) state[key] = key === 'models' ? domain().rows.filter(r => values.includes(r.id) || values.includes(r.model)).map(r => r.id) : values; } catch {}
  }
  state.query = p.get('q') || '';
  if (oldRoute[1] === 'compare' && evidence.comparisonFor(state.domain)) { state.evidenceTab = 'compare'; state.compare = oldRoute.slice(2); }
  else if (['metrics','priority','best'].includes(oldRoute[1])) state.evidenceTab = oldRoute[1];
}
function controls() {
  const d = domain();
  $('domain').value = d.id; $('module').value = state.module; $('mode').value = state.mode; $('sort').value = state.sort; $('evidence').value = state.evidence;
  $('module-label').hidden = d.id !== 'phone';
  const numeric = d.metrics.filter(m => m.numeric);
  for (const axis of ['x','y']) {
    $(axis).innerHTML = (axis === 'x' ? '<option value="$model">型号 / 样本（类别轴）</option>' : '') + numeric.map(m => {const count=metricAvailability(activeRows,m.id);return `<option value="${esc(m.id)}"${count?'':' disabled'}>${esc(m.label)} · ${count?count+'项有值':'暂无数据'}</option>`;}).join('') + (!numeric.length && axis === 'y' ? '<option value="">暂无可绘制单值</option>' : '');
    $(axis).value = state[axis];
  }
  $('model-search').value = state.query;
  const candidates = filteredRows(d, {...state, models:null});
  $('selection-count').textContent = `${activeRows.length} / ${candidates.length} 个样本`;
  $('models').innerHTML = candidates.length ? candidates.map(r => `<label><input type="checkbox" data-row="${esc(r.id)}" ${state.models === null || state.models.includes(r.id) ? 'checked' : ''}><span>${esc(r.model)}</span></label>`).join('') : '<p class="muted">没有匹配样本</p>';
  $('columns').innerHTML = d.metrics.map(m => `<label><input type="checkbox" data-column="${esc(m.id)}" ${state.columns === null || state.columns.includes(m.id) ? 'checked' : ''}><span>${esc(m.label)}</span></label>`).join('');
}
function sortRows(rows) {
  return [...rows].sort((a,b) => {
    if (state.sort === 'model') return a.model.localeCompare(b.model, 'zh-CN');
    if (['x','y'].includes(state.sort)) {
      const axis = state[state.sort];
      return (a.values[axis]?.value ?? Infinity) - (b.values[axis]?.value ?? Infinity) || a.model.localeCompare(b.model, 'zh-CN');
    }
    return 0;
  });
}
function pointDescription(p) {
  const d = domain(), xm = d.metrics.find(m => m.id === state.x), ym = d.metrics.find(m => m.id === state.y);
  const xv = p.row.values[state.x], yv = p.row.values[state.y];
  return `${p.row.model}；${xm?.label || '样本序号'}：${valueText(xv) === '未公开 / 未核验' && state.x === '$model' ? p.x : valueText(xv)}；${ym?.label || '纵轴'}：${valueText(yv)}；${p.row.variant}；${[xv,yv].filter(Boolean).map(v=>[v.evidence,v.note,v.location].filter(Boolean).join(' · ')).join('；')}；${[...new Set([...valueSources(xv), ...valueSources(yv)])].map(id => { const s = atlas.sources.get(id); return `[${citations.get(id)}] ${s?.title}；${s?.evidence_scope || s?.scope || ''}；核验 ${s?.checked_on}`; }).join('；')}`;
}
function drawChart() {
  const d = domain(), ms = d.metrics, categorical = state.x === '$model';
  activePoints = axisPoints(activeRows, state.x, state.y);
  if (!activePoints.length) {
    const absent = [state.x,state.y].filter(id=>id!=='$model'&&!metricAvailability(activeRows,id)).map(id=>ms.find(m=>m.id===id)?.label).filter(Boolean);
    const reason = !activeRows.length ? '当前没有选中的样本，请全选样本或清除筛选条件。' : absent.length ? `当前 ${activeRows.length} 个样本尚无“${absent.join(' / ')}”的已核验数值。` : '所选两个指标没有同时具备数值的样本；各自已有的数据仍保留在表格中。';
    const recovery=availableAxes(d,activeRows),canRecover=axisPoints(activeRows,recovery.x,recovery.y).length>0;
    $('chart').innerHTML = `<div class="empty-plot" role="status"><strong>当前指标暂无可绘制数据</strong><p>${esc(reason)}</p><p>未知值不补零，区间或复合参数保留原文。</p>${canRecover?'<button class="recover-chart" data-recover-chart>显示已有数据的散点图</button>':''}<a href="#data-table">查看已收集的数据 ↓</a></div>`;
    return;
  }
  const plotRows = activePoints.map(p => ({...p.row, values:{...p.row.values, $model:{value:p.x}}}));
  const plotMetrics = [...ms, {id:'$model',label:'型号 / 样本序号（对应图例）'}];
  $('chart').innerHTML = window.LensPlot.chart(plotRows, state.x, state.y, plotMetrics, 'scatter');
  const svg = $('chart').querySelector('svg');
  svg.setAttribute('aria-label', `${d.name} 散点图；数据来源见图例与表格`);
  svg.insertAdjacentHTML('afterbegin','<defs><pattern id="grid" width="175" height="77.5" patternUnits="userSpaceOnUse" x="90" y="60"><path d="M175 0H0V77.5" fill="none" stroke="#e8eeeb" stroke-width="1"/></pattern></defs><rect x="90" y="60" width="700" height="310" fill="url(#grid)"/>');
  const grouped = new Map();
  for (const p of activePoints) {const key = JSON.stringify([p.x,p.y]); if (!grouped.has(key)) grouped.set(key, []); grouped.get(key).push(p);}
  [...svg.querySelectorAll('circle')].forEach((circle, index) => {
    const group = [...grouped.values()][index], node = circle.parentElement;
    node.classList.add('plot-point'); node.setAttribute('tabindex', '0'); node.setAttribute('role', 'button'); node.dataset.point = String(index);
    node.setAttribute('aria-label', group.map(pointDescription).join('\n')); circle.querySelector('title').textContent = group.map(pointDescription).join('\n\n');
  });
  if (categorical) {
    svg.querySelectorAll('text[y="395"]').forEach(t=>t.remove());
    [...svg.querySelectorAll('circle')].forEach((circle,index)=>svg.insertAdjacentHTML('beforeend',`<text x="${circle.getAttribute('cx')}" y="395" text-anchor="middle" font-size="12">${activePoints[index].x}</text>`));
  }
  const legend = $('chart').querySelector('.chart-legend');
  legend.setAttribute('aria-label','样本、坐标与来源');
  legend.innerHTML = activePoints.map((p, index) => {
    const ids = [...new Set([...valueSources(p.row.values[state.x]), ...valueSources(p.row.values[state.y])])];
    return `<li><a href="#${esc(rowAnchor(p.row))}" title="${esc(pointDescription(p))}">${categorical ? `${p.x}. ` : ''}${esc(p.row.model)} · (${p.x}, ${p.y})</a>${ids.map(citation).join('')}</li>`;
  }).join('');
}
function table() {
  const backlinks = new Map([...citations.keys()].map(id => [id, new Map()]));
  const linkBack = (id, anchor, label) => backlinks.get(id)?.set(anchor, label);
  $('table').innerHTML = `<table><thead><tr><th scope="col">型号 / 样本与配置</th>${activeColumns.map(m => `<th scope="col"><a href="#${esc(definitionAnchor(m))}" data-definition="${esc(m.id)}">${esc(m.label)}</a></th>`).join('')}</tr></thead><tbody>${activeRows.map(r => {
    const rowSources = r.sourceIds || [...new Set(Object.values(r.values).flatMap(valueSources))];
    rowSources.forEach(id => linkBack(id, rowAnchor(r), r.model));
    return `<tr id="${esc(rowAnchor(r))}"><th scope="row">${esc(r.model)}<small>${esc(r.variant)}</small><small>${esc(r.evidence || '厂商标称；非独立实测')} ${rowSources.map(citation).join('')}</small>${r.missing ? `<small>记录缺口：${esc(r.missing)}</small>` : ''}</th>${activeColumns.map(m => {
      const v = r.values[m.id], ids = valueSources(v), anchor = cellAnchor(r,m), valid = v?.display !== undefined || (v?.value !== undefined && v?.value !== null);
      ids.forEach(id => linkBack(id, anchor, `${r.model} · ${m.label}`));
      return `<td id="${esc(anchor)}"><span class="value${valid ? '' : ' missing'}">${esc(valueText(v))}</span>${ids.map(citation).join('')}${v ? `<small>${esc(v.note || '')}</small><small>${esc(v.evidence || r.evidence || '厂商标称')} · ${esc(v.checked_on || atlas.sources.get(ids[0])?.checked_on || r.checked_on || '')}</small><small>${v.location ? '原文位置：' + esc(v.location) : ids.length ? '仅记录级来源；未核逐参数定位。' : '逐参数来源待补。'}</small>` : '<small>本库未取得该配置可核验的参数；不表示原来源完全未涉及。</small>'}</td>`;
    }).join('')}</tr>`;
  }).join('')}</tbody></table>${!activeRows.length ? '<p class="empty-table">当前未选择样本；可在侧边全选或清除搜索条件。</p>' : ''}`;
  return backlinks;
}
function referenceList(backlinks) {
  $('sources').innerHTML = [...citations].map(([id, number]) => {
    const s = atlas.sources.get(id), backs = backlinks.get(id);
    return `<li id="${esc(refAnchor(id))}" value="${number}"><div class="reference-title"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a>${s.source_year ? ` (${esc(s.source_year)})` : ''}.</div>${s.doi ? `<p>DOI：${esc(s.doi)}</p>` : ''}<p>${esc(sourceKind(s.kind))} · 核验 ${esc(s.checked_on)}${s.verification === 'inherited_v2' ? '（沿用原核验记录）' : ''}</p>${s.location ? `<p>原文位置：${esc(s.location)}</p>` : ''}<p>读取范围：${esc(s.evidence_scope || s.scope || '以记录所列范围为准')}</p><div class="backlinks">${backs?.size ? [...backs].map(([anchor,label]) => `<a href="#${esc(anchor)}">↑ ${esc(label)}</a>`).join('') : '<a href="#evidence-notes">↑ 指标定义 / 任务依据</a>'}</div></li>`;
  }).join('');
}
function linkEvidence() {
  $('definitions').querySelectorAll('[data-source]').forEach(button => {const id=button.dataset.source, a=document.createElement('a');a.href='#'+refAnchor(id);a.textContent=button.textContent+(citations.has(id)?` [${citations.get(id)}]`:'');button.replaceWith(a);});
}
function renderDefinitions() {
  const d = domain(), tabs = [...document.querySelectorAll('[data-evidence-tab]')];
  tabs.forEach(button => {
    const name=button.dataset.evidenceTab; button.hidden=!d.app&&name!=='metrics'||name==='compare'&&!evidence.comparisonFor(d.id);
    button.setAttribute('aria-selected', String(name === state.evidenceTab)); button.setAttribute('tabindex', name===state.evidenceTab?'0':'-1'); button.id='evidence-tab-'+name;
  });
  $('definitions').setAttribute('aria-labelledby','evidence-tab-'+state.evidenceTab);
  const fieldDefinitions = d.metrics.map(m => `<article class="definition-item" id="${esc(definitionAnchor(m))}"><h3>${esc(m.label)}</h3><p>${esc(m.definition)}</p><p>比较前提：${esc(m.conditions)}</p><p>${(m.definition_refs || []).map(ref => `${citation(ref.source)} ${esc(ref.location)}`).join('；') || (d.app ? '参数保留原记录；下方提供应用指标词典。' : '完整定义出处仍待补证。')}</p></article>`).join('');
  const guidance = (d.task_guidance || []).map(g=>`<article class="definition-item"><h3>${esc(g.task)}</h3><p>${esc(g.text)} ${citation(g.source)}</p><p>原文位置：${esc(g.location)}</p></article>`).join('');
  if (state.evidenceTab === 'metrics') $('definitions').innerHTML = guidance + (d.app ? `<p class="small">原始参数保留各自口径；字段同名不代表同协议。${esc(d.app.metric_mapping_note)}</p>` : '<p class="small">厂商规格不等于独立实测；未建立通用重要性排名。</p>') + fieldDefinitions + (d.app ? evidence.panelMarkup(d.app,'metrics') : '');
  else if (state.evidenceTab === 'compare') $('definitions').innerHTML = evidence.comparisonPanel(evidence.comparisonFor(d.id), ...state.compare);
  else $('definitions').innerHTML = evidence.panelMarkup(d.app, state.evidenceTab);
  linkEvidence();
}
function render(updateControls = true) {
  const d=domain(); sourceIndex(); activeRows=sortRows(filteredRows(d,state)); activeColumns=d.metrics.filter(m=>state.columns===null||state.columns.includes(m.id));
  if(updateControls) controls();
  $('view-title').textContent=d.name; $('scope').textContent=d.scope; $('scope').title=d.scope;
  $('view-count').textContent=`${activeRows.length} 个样本 · ${d.metrics.length} 个字段`;
  document.title=d.name+' · 透镜评价证据库';
  drawChart();
  $('point-detail').textContent='选择图中数据点，查看数值、条件与出处。';
  $('status').textContent=`${activePoints.length} 个点 · ${activeRows.length-activePoints.length} 项缺少所选单值`;
  $('plot-note').textContent='每个圆点代表一个样本；短细线仅指向名称标签，样本之间不连线。'+(d.app?' 同名同单位仍需核对条件。':' 厂商标称与独立实测分别理解。');
  referenceList(table()); renderDefinitions();
  $('date').textContent=`本页样本维护日期 ${d.asOf}；逐条保留原核验日期与读取范围。样本不代表完整市场覆盖。`;
  saveView();
}
function focusPoint(index) {
  const groups = new Map(); for(const p of activePoints){const key=JSON.stringify([p.x,p.y]);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(p);}
  $('point-detail').innerHTML=([...groups.values()][index]||[]).map(p=>`${esc(p.row.model)} · (${p.x}, ${p.y}) <a href="#${esc(rowAnchor(p.row))}">查看数据表 ↓</a>${[...new Set([...valueSources(p.row.values[state.x]),...valueSources(p.row.values[state.y])])].map(citation).join('')}<span> · ${esc(p.row.variant)}</span>`).join('<br>');
}
function download(name,type,text){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([text],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function exportCSV(){
  const safe=v=>/^[=+\-@\t\r]/.test(String(v))?"'"+v:String(v??'');
  const quote=v=>'"'+safe(v).replace(/"/g,'""')+'"';
  const rows=[['型号 / 样本','配置','证据类型',...activeColumns.flatMap(m=>[m.label,m.label+'备注',m.label+'证据性质',m.label+'原文位置',m.label+'来源',m.label+'核验日期'])],...activeRows.map(r=>[r.model,r.variant,r.evidence||'厂商标称',...activeColumns.flatMap(m=>{const v=r.values[m.id],ids=valueSources(v);return [valueText(v),v?.note||r.missing||'',v?.evidence||r.evidence||'',v?.location||(ids.length?'仅记录级来源；未核逐参数定位':''),ids.map(id=>atlas.sources.get(id)?.url).join(' ; '),v?.checked_on||atlas.sources.get(ids[0])?.checked_on||r.checked_on||''];})])];
  download('lens-'+state.domain+'-table.csv','text/csv;charset=utf-8','\ufeff'+rows.map(row=>row.map(quote).join(',')).join('\r\n'));
}

const groups=new Map(); for(const d of atlas.domains){if(!groups.has(d.category))groups.set(d.category,[]);groups.get(d.category).push(d);}
$('domain').innerHTML=[...groups].map(([category,ds])=>`<optgroup label="${esc(category)}">${ds.map(d=>`<option value="${d.id}">${esc(d.name)}</option>`).join('')}</optgroup>`).join('');
restore(initial); render();
if(oldRoute[1]) { if(oldRoute[1]==='sources')location.hash='references';else if(oldRoute[1]!=='metrics'){$('evidence-notes').open=true;location.hash='evidence-notes';} }
for(const key of ['domain','module','x','y','sort','evidence']) $(key).addEventListener('change',()=>{
  if(key==='domain')defaults($(key).value);else {state[key]=$(key).value;if(key==='module')state.models=null;}
  render(); if(key==='domain'||key==='module')$('table').scrollLeft=0;
});
$('model-search').addEventListener('input',()=>{state.query=$('model-search').value;render();$('model-search').focus();});
for(const [id,key,value] of [['all-models','models',null],['no-models','models',[]],['all-columns','columns',null],['no-columns','columns',[]]]) $(id).addEventListener('click',()=>{state[key]=value;render();});
$('reset-view').addEventListener('click',()=>{defaults(state.domain);state.mode='scatter';state.sort='original';render();});
document.addEventListener('change',event=>{
  const target=event.target;
  if(target.matches('[data-row],[data-column]')){
    const model=target.hasAttribute('data-row'),key=model?'models':'columns',id=model?target.dataset.row:target.dataset.column;
    const all=model?domain().rows.map(r=>r.id):domain().metrics.map(m=>m.id);
    const set=new Set(state[key]===null?all:state[key]);if(target.checked)set.add(id);else set.delete(id);state[key]=[...set];
    render();document.querySelector(`[data-${model?'row':'column'}="${CSS.escape(id)}"]`)?.focus();
  }
  if(target.matches('[data-compare]')){
    const c=evidence.comparisonFor(state.domain),pair=evidence.comparisonPair(c,...state.compare).map(v=>v.record_id),index=Number(target.dataset.compare),old=pair[index];pair[index]=target.value;if(pair[0]===pair[1])pair[1-index]=old;state.compare=pair;renderDefinitions();saveView();$('compare-'+index)?.focus();
  }
});
document.addEventListener('click',event=>{
  const setting=event.target.closest('[data-setting]'),tab=event.target.closest('[data-evidence-tab]'),metric=event.target.closest('[data-metric]'),record=event.target.closest('[data-record]'),point=event.target.closest('[data-point]'),definition=event.target.closest('[data-definition]');
  if(event.target.closest('[data-recover-chart]')){Object.assign(state,availableAxes(domain(),activeRows));render();}
  if(setting){activeSetting=setting.dataset.setting;for(const button of document.querySelectorAll('[data-setting]')){button.setAttribute('aria-selected',String(button===setting));button.tabIndex=button===setting?0:-1;}$('model-controls').hidden=activeSetting!=='models';$('column-controls').hidden=activeSetting!=='columns';}
  if(tab){state.evidenceTab=tab.dataset.evidenceTab;renderDefinitions();document.querySelector(`[data-evidence-tab="${state.evidenceTab}"]`).focus();}
  if(metric)evidence.openMetric(metric.dataset.metric);
  if(record){const r=window.LENS_DATA.benchmarks.find(r=>r.id===record.dataset.record);evidence.openDialog(r.name,evidence.recordCard(r,true));}
  if(point)focusPoint(Number(point.dataset.point));
  if(definition){$('evidence-notes').open=true;state.evidenceTab='metrics';renderDefinitions();}
});
document.addEventListener('keydown',event=>{
  const point=event.target.closest('[data-point]');if(point&&['Enter',' '].includes(event.key)){event.preventDefault();focusPoint(Number(point.dataset.point));}
  const tab=event.target.closest('[role="tab"]');if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const buttons=[...tab.parentElement.querySelectorAll('[role="tab"]')].filter(b=>!b.hidden),index=buttons.indexOf(tab),next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowRight'?1:buttons.length-1))%buttons.length;buttons[next].click();buttons[next].focus();}
});
$('closeDialog').addEventListener('click',()=>$('detail').close());$('methodButton').addEventListener('click',()=>evidence.method());
$('export-csv').addEventListener('click',exportCSV);
$('export-svg').addEventListener('click',()=>{const svg=$('chart').querySelector('svg');if(!svg){$('status').textContent='当前无有效图表可导出';return;}const copy=svg.cloneNode(true);copy.setAttribute('xmlns','http://www.w3.org/2000/svg');const desc=document.createElementNS('http://www.w3.org/2000/svg','desc');desc.textContent=$('plot-note').textContent+'\n'+activePoints.map(pointDescription).join('\n');copy.prepend(desc);download('lens-'+state.domain+'-chart.svg','image/svg+xml',new XMLSerializer().serializeToString(copy));});
$('share').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);$('status').textContent='已复制当前视图链接';}catch{$('status').textContent='当前选择已保存，可复制地址栏分享。';}});
window.addEventListener('popstate',()=>{restore(new URL(location.href));render();});
function revealAnchor(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}if(id.startsWith('definition-')){$('evidence-notes').open=true;if(state.evidenceTab!=='metrics'){state.evidenceTab='metrics';renderDefinitions();}}requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));}
window.addEventListener('hashchange',revealAnchor);if(location.hash)revealAnchor();

const selectionControls=$('selection-controls'), selectionHome=selectionControls.parentElement;
$('mobile-filter-toggle').addEventListener('click',()=>{$('mobile-filter-content').append(selectionControls);$('filter-dialog').showModal();});
$('close-filters').addEventListener('click',()=>$('filter-dialog').close());
$('filter-dialog').addEventListener('close',()=>{selectionHome.insertBefore(selectionControls,selectionHome.querySelector('.settings-actions'));});
window.matchMedia('(min-width:760px)').addEventListener('change',event=>{if(event.matches&&$('filter-dialog').open)$('filter-dialog').close();});

window.ATLAS_READY=true;
