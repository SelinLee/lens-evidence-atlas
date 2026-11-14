import {createWorkspace, groupRows, valueSources, filteredRows, axisPoints, metricAvailability, availableAxes} from './workspace-data.js?v=b0afb6606f76d9de';

const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const atlas = createWorkspace(window.LENS_DATA, window.DEVICE_DATA), evidence = window.LensEvidence;
const initial = new URL(location.href), oldRoute = initial.hash.slice(1).split('/');
const state = {domain:'phone', module:'main', x:'mp', y:'f', mode:'scatter', sort:'original', visible:false, models:null, columns:null, query:'', evidence:'', evidenceTab:'metrics', compare:[]};
let viewQuery = location.search;
let referenceGroups = new Map(), citations = new Map(), activeRows = [], activeColumns = [], activePoints = [], activeSetting = 'models';
const domain = () => atlas.domains.find(d => d.id === state.domain);
const rowAnchor = r => `row-${state.domain}-${r.id}`;
const cellAnchor = (r, m) => `cell-${state.domain}-${r.id}-${m.id}`;
const definitionAnchor = m => `definition-${state.domain}-${m.id}`;
const refAnchor = id => 'ref-' + id;
const citation = id => citations.has(id) ? `<a class="citation" href="#${esc(refAnchor(id))}" aria-label="参考文献 ${citations.get(id)}">[${citations.get(id)}]</a>` : '';
const sourceKind = kind => ({manufacturer:'厂商资料',manufacturer_technical:'原厂技术说明',scholarly_book:'学术书章',paper:'原始研究论文',peer_reviewed_paper:'同行评议论文',paper_review:'学术综述',standard:'标准 / 公开预览',supplementary_material:'论文补充材料',research_data:'作者原始数据',research_software:'作者研究代码',author_webpage:'作者课题组网页',author_manuscript:'论文作者稿',doctoral_thesis:'博士论文（原始研究）',conference_paper:'会议论文',metrology_reference:'计量与统计参考',trial_protocol:'原始试验方案',software_documentation:'原厂软件文档'})[kind] || kind || '厂商资料';
const valueText = value => value?.display ?? (value?.value === null || value?.value === undefined ? '未公开 / 未核验' : String(value.value));

function citeSources(ids) {
  const targets = new Map();
  for (const id of new Set(ids)) {
    const main = atlas.sources.get(id)?.publication_source || id;
    if (!targets.has(main)) targets.set(main,id);
  }
  return [...targets.values()].map(citation).join('');
}

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
  for (const r of activeRows) {
    for (const id of r.sourceIds || []) ids.add(id);
    for (const v of Object.values(r.values)) for (const id of valueSources(v)) ids.add(id);
  }
  referenceGroups = new Map();
  citations = new Map();
  for (const id of ids) {
    const source = atlas.sources.get(id);
    if (!source) continue;
    const main = source.publication_source || id;
    if (!referenceGroups.has(main)) referenceGroups.set(main,{number:referenceGroups.size+1, materials:new Set([main])});
    const group = referenceGroups.get(main);
    group.materials.add(id);
    citations.set(id,group.number);
    citations.set(main,group.number);
  }
}
function saveView() {
  const url = new URL(location.href); url.search = '';
  for (const key of ['domain','module','x','y','mode','sort','evidence']) if (state[key]) url.searchParams.set(key, state[key]);
  if (state.visible) url.searchParams.set('visible','1');
  if (state.query) url.searchParams.set('q', state.query);
  for (const key of ['models','columns']) if (state[key] !== null) url.searchParams.set(key, JSON.stringify(state[key]));
  if (state.compare.length) url.searchParams.set('compare', JSON.stringify(state.compare));
  if (/^#app_\d+/.test(url.hash) || (/^#(?:row|cell|ref|paper|specimen)-/.test(url.hash) && !document.getElementById(url.hash.slice(1)))) url.hash = '';
  history.replaceState(null, '', url);
  viewQuery = url.search;
}
function restore(url) {
  const p = url.searchParams, id = p.get('domain') || (atlas.domains.some(d => d.id === oldRoute[0]) ? oldRoute[0] : 'phone');
  defaults(atlas.domains.some(d => d.id === id) ? id : 'phone');
  const valid = {module:['main','ultrawide','tele','external_macro','native_research'], mode:['scatter'], sort:['original','model','x','y'], evidence:['','manufacturer','research']};
  for (const [key, choices] of Object.entries(valid)) if (choices.includes(p.get(key))) state[key] = p.get(key);
  for (const key of ['x','y']) { const value = p.get(key); if (domain().metrics.some(m => m.numeric && m.id === value) || (key === 'x' && value === '$model')) state[key] = value; }
  // Older device links selected model names. New links use stable row IDs.
  for (const key of ['models','columns','compare']) {
    try { const values = JSON.parse(p.get(key)); if (Array.isArray(values) && values.every(v => typeof v === 'string')) state[key] = key === 'models' ? domain().rows.filter(r => values.includes(r.id) || values.includes(r.model)).map(r => r.id) : values; } catch {}
  }
  state.visible = p.get('visible')==='1';
  state.query = p.get('q') || '';
  if (oldRoute[1] === 'compare' && evidence.comparisonFor(state.domain)) { state.evidenceTab = 'compare'; state.compare = oldRoute.slice(2); }
  else if (['metrics','priority','best'].includes(oldRoute[1])) state.evidenceTab = oldRoute[1];
}
function groupedSamples(container, rows, item, list=false) {
  const opened = new Set([...container.querySelectorAll('details[open]')].map(el=>el.dataset.paper));
  const wrap = html => list ? '<li>'+html+'</li>' : html;
  return groupRows(rows).map(group=>{
    const items = group.rows.map(row=>wrap(item(row))).join('');
    if (!group.paper || group.rows.length===1) return items;
    const title = atlas.sources.get(group.paper).title.split(/[:：]/)[0];
    return wrap(`<details data-paper="${esc(group.paper)}" ${opened.has(group.paper)?'open':''}><summary>${esc(title)} · ${group.rows.length} 条记录</summary>${list?'<ul>'+items+'</ul>':items}</details>`);
  }).join('');
}
function controls() {
  const d = domain();
  if(d.id==='phone')$('module').innerHTML=[...new Set(d.rows.map(r=>r.module))].map(id=>`<option value="${esc(id)}">${esc(({main:'主摄',ultrawide:'超广角',tele:'长焦',external_macro:'外接微距（研究）',native_research:'原生摄像头（研究）'})[id]||id)}</option>`).join('');
  $('domain').value = d.id; $('module').value = state.module; $('mode').value = state.mode; $('sort').value = state.sort; $('evidence').value = state.evidence;
  $('module-label').hidden = d.id !== 'phone';
  const numeric = d.metrics.filter(m => m.numeric);
  for (const axis of ['x','y']) {
    $(axis).innerHTML = (axis === 'x' ? '<option value="$model">型号 / 样本（类别轴）</option>' : '') + numeric.map(m => {const count=metricAvailability(activeRows,m.id);return `<option value="${esc(m.id)}"${count?'':' disabled'}>${esc(m.label)} · ${count?count+'项有值':'暂无数据'}</option>`;}).join('') + (!numeric.length && axis === 'y' ? '<option value="">暂无可绘制单值</option>' : '');
    $(axis).value = state[axis];
  }
  $('visible-light').checked = state.visible;
  $('model-search').value = state.query;
  const candidates = filteredRows(d, {...state, models:null});
  $('selection-count').textContent = `${activeRows.length} / ${candidates.length} 条记录`;
  $('models').innerHTML = candidates.length ? groupedSamples($('models'),candidates,r => `<label><input type="checkbox" data-row="${esc(r.id)}" ${state.models === null || state.models.includes(r.id) ? 'checked' : ''}><span>${esc(r.model)}</span></label>`) : '<p class="muted">没有匹配样本</p>';
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
function coordinateText(p, axis) {
  return `${p.row.values[state[axis]]?.approximate ? '约' : ''}${p[axis]}`;
}
function pointDescription(p) {
  const d = domain(), xm = d.metrics.find(m => m.id === state.x), ym = d.metrics.find(m => m.id === state.y);
  const xv = p.row.values[state.x], yv = p.row.values[state.y];
  return `${p.row.model}；${xm?.label || '样本序号'}：${valueText(xv) === '未公开 / 未核验' && state.x === '$model' ? p.x : valueText(xv)}；${ym?.label || '纵轴'}：${valueText(yv)}；${p.row.variant}；${[xv,yv].filter(Boolean).map(v=>[v.evidence,v.note,v.location].filter(Boolean).join(' · ')).join('；')}；${[...new Set([...valueSources(xv), ...valueSources(yv)])].map(id => { const s = atlas.sources.get(id); return `[${citations.get(id)}] ${s?.title}；${s?.evidence_scope || s?.scope || ''}；核验 ${s?.checked_on}`; }).join('；')}`;
}
const inspectHint = '悬停或轻点圆点查看坐标，点击可固定读数。';
let plotWidth = 0, positionReadout;
function drawChart() {
  plotWidth = Math.min(900, Math.max(280, $('chart').clientWidth - 2));
  positionReadout = null;

  $('point-detail').textContent = inspectHint;
  const d = domain(), ms = d.metrics, categorical = state.x === '$model';
  activePoints = axisPoints(activeRows, state.x, state.y);
  if (!activePoints.length) {
    const absent = [state.x,state.y].filter(id=>id!=='$model'&&!metricAvailability(activeRows,id)).map(id=>ms.find(m=>m.id===id)?.label).filter(Boolean);
    const reason = !activeRows.length ? (state.visible ? '当前范围没有符合可见光条件的记录。可取消可见光或调整样本筛选。' : '当前没有选中的样本，请全选样本或清除筛选条件。') : absent.length ? `当前 ${activeRows.length} 个样本尚无“${absent.join(' / ')}”的已核验数值。` : '所选两个指标没有同时具备数值的样本；各自已有的数据仍保留在表格中。';
    const recovery=availableAxes(d,activeRows),canRecover=axisPoints(activeRows,recovery.x,recovery.y).length>0;
    $('chart').innerHTML = `<div class="empty-plot" role="status"><strong>当前指标暂无可绘制数据</strong><p>${esc(reason)}</p><p>未知值不补零，区间或复合参数保留原文。</p>${canRecover?'<button class="recover-chart" data-recover-chart>显示已有数据的散点图</button>':''}<a href="#data-table">查看已收集的数据 ↓</a></div>`;
    return;
  }
  const groups = window.LensPlot.groupPoints(activePoints);
  const xLabel = categorical ? '样本序号' : ms.find(m=>m.id===state.x).label;
  const yLabel = ms.find(m=>m.id===state.y).label;
  $('chart').innerHTML = window.LensPlot.scatterMarkup(groups, xLabel, yLabel, {width:plotWidth, categorical});
  const svg = $('chart').querySelector('svg'), nodes = [...svg.querySelectorAll('[data-point]')];
  svg.setAttribute('aria-label', d.name + '散点图');
  const legend = $('chart').querySelector('.chart-legend');
  legend.setAttribute('aria-label','样本、坐标与来源');
  const groupByRow = new Map();
  groups.forEach((group,index) => {
    group.forEach(p => groupByRow.set(p.row.id,index));
    const node = nodes[index];
    node.classList.add('plot-point');
    node.setAttribute('tabindex','0');
    node.setAttribute('role','button');
    node.setAttribute('aria-pressed','false');
    node.setAttribute('aria-label',group.map(p=>p.row.model).join('、') + '，' + xLabel + ' ' + coordinateText(group[0],'x') + '，' + yLabel + ' ' + coordinateText(group[0],'y'));
    node.querySelector('title').remove(); // The inspector supplies the visible tooltip.
  });
  const pointByRow = new Map(activePoints.map(p=>[p.row,p]));
  legend.innerHTML = groupedSamples(legend,[...pointByRow.keys()],row=>{
    const p = pointByRow.get(row);
    const ids = [...new Set([...valueSources(p.row.values[state.x]), ...valueSources(p.row.values[state.y])])];
    const index = groupByRow.get(p.row.id), color = nodes[index].querySelector('circle').getAttribute('fill');
    return `<a data-legend-point="${index}" href="#${esc(rowAnchor(p.row))}"><i class="legend-dot" style="background:${color}" aria-hidden="true"></i>${categorical ? p.x+'. ' : ''}${esc(p.row.model)} · (${esc(coordinateText(p,'x'))}, ${esc(coordinateText(p,'y'))})</a>${citeSources(ids)}`;
  }, true);
  inspectPlot(svg, nodes, groups, xLabel, yLabel);
}

function inspectPlot(svg, nodes, groups, xLabel, yLabel) {
  const chart = $('chart'), plot = svg.parentElement;
  const left = Number(svg.dataset.axisLeft), bottom = Number(svg.dataset.axisBottom);
  svg.insertAdjacentHTML('beforeend', `<g class="axis-inspection" display="none" pointer-events="none" aria-hidden="true">
    <path fill="none" stroke="#176b60" stroke-width="1.4" stroke-dasharray="4 4"/>
    <g class="x-reading"><rect rx="3" fill="#185f56"/><text text-anchor="middle" dominant-baseline="middle" font-size="13" fill="white"></text></g>
    <g class="y-reading"><rect rx="3" fill="#185f56"/><text text-anchor="end" dominant-baseline="middle" font-size="13" fill="white"></text></g>
  </g>`);
  const guides = svg.querySelector('.axis-inspection');
  const tip = document.createElement('div');
  tip.className = 'plot-readout'; tip.hidden = true; tip.setAttribute('aria-hidden','true');
  plot.append(tip);
  let hover = null, focus = null, pinned = null, shown = null;
  const readIndex = el => {
    const item = el?.closest('[data-point],[data-legend-point]');
    return item ? Number(item.dataset.point ?? item.dataset.legendPoint) : null;
  };
  const centers = nodes.map(node=>node.querySelector('circle'));
  function pointerIndex(event) {
    const index = readIndex(event.target);
    if (index===null || !plot.contains(event.target)) return index;
    // When hit targets overlap, choose the closest true coordinate to the pointer.
    const pointer = new DOMPoint(event.clientX,event.clientY).matrixTransform(svg.getScreenCTM().inverse());
    let nearest = index, min = Infinity;
    centers.forEach((circle,i)=>{
      const distance = (circle.cx.baseVal.value-pointer.x)**2 + (circle.cy.baseVal.value-pointer.y)**2;
      if (distance < min) { nearest = i; min = distance; }
    });
    return nearest;
  }
  function placeTip() {
    if (shown === null) return;
    const bounds = plot.getBoundingClientRect(), marker = nodes[shown].getBoundingClientRect();
    const x = marker.left+marker.width/2-bounds.left, y = marker.top+marker.height/2-bounds.top;
    const w = tip.offsetWidth, h = tip.offsetHeight;
    const beside = x+12+w <= bounds.width-4 ? x+12 : x-12-w;
    tip.style.left = Math.max(4,Math.min(beside,bounds.width-w-4))+'px';
    const top = y-h-8 >= 4 ? y-h-8 : y+10;
    tip.style.top = Math.max(4, Math.min(top,bounds.height-h-4))+'px';
  }
  positionReadout = placeTip;
  const ticks = [...svg.querySelectorAll('.axis-ticks text')];
  function badge(selector, value, x, y) {
    const g = guides.querySelector(selector), label = g.querySelector('text'), rect = g.querySelector('rect');
    label.textContent = value; label.setAttribute('x',x); label.setAttribute('y',y);
    const box = label.getBBox();
    // Keep long decimals fully inside the SVG at either edge.
    const shift = Math.max(0,5-box.x) + Math.min(0,plotWidth-5-box.x-box.width);
    label.setAttribute('x',x+shift);
    rect.setAttribute('x',box.x+shift-4); rect.setAttribute('y',box.y-2);
    rect.setAttribute('width',box.width+8); rect.setAttribute('height',box.height+4);
    return rect.getBBox();
  }
  function show() {
    const index = pinned ?? hover ?? focus;
    if (index === shown) return;
    if (shown !== null) nodes[shown].classList.remove('is-inspected');
    shown = index;
    guides.setAttribute('display', index === null ? 'none' : 'inline');
    tip.hidden = index === null;
    for (const tick of ticks) tick.removeAttribute('visibility');
    if (index === null) return;
    const group = groups[index], circle = centers[index];
    const x = Number(circle.getAttribute('cx')), y = Number(circle.getAttribute('cy'));
    const reading = axis => [...new Set(group.map(p=>coordinateText(p,axis)))].join(' / ');
    nodes[index].classList.add('is-inspected');
    guides.querySelector('path').setAttribute('d',`M${left} ${y}H${x}V${bottom}`);
    const badges = [badge('.x-reading',reading('x'),x,Number(svg.dataset.xTickY)-3), badge('.y-reading',reading('y'),left-8,y)];
    for (const tick of ticks) {
      const t = tick.getBBox();
      if (badges.some(b=>t.x < b.x+b.width+2 && t.x+t.width > b.x-2 && t.y < b.y+b.height+2 && t.y+t.height > b.y-2)) tick.setAttribute('visibility','hidden');
    }
    const name = group.length===1 ? group[0].row.model : group[0].row.model+' 等 '+group.length+' 个同坐标样本';
    tip.innerHTML = `<strong>${esc(name)}</strong><dl><dt>${esc(xLabel)}</dt><dd>${esc(reading('x'))}</dd><dt>${esc(yLabel)}</dt><dd>${esc(reading('y'))}</dd></dl>`;
    placeTip();
  }
  function pin(index) {
    for (const p of groups[pinned] || []) document.getElementById(rowAnchor(p.row))?.classList.remove('plot-selected');
    if (pinned !== null) nodes[pinned].setAttribute('aria-pressed','false');
    pinned = index;
    if (index === null) {
      hover = focus = null;
      $('point-detail').textContent = inspectHint;
    } else {
      nodes[index].setAttribute('aria-pressed','true');
      for (const p of groups[index]) document.getElementById(rowAnchor(p.row))?.classList.add('plot-selected');
      $('point-detail').innerHTML = groups[index].map(p=>`${esc(p.row.model)} · (${esc(coordinateText(p,'x'))}, ${esc(coordinateText(p,'y'))}) <a href="#${esc(rowAnchor(p.row))}">查看数据表 ↓</a>${citeSources([...valueSources(p.row.values[state.x]),...valueSources(p.row.values[state.y])])}<span> · ${esc(p.row.variant)}</span>`).join('<br>');
    }
    show();
  }
  // Bind to the newly rendered elements so a filter change discards the old interaction state.
  for (const region of [plot, chart.querySelector('.chart-legend')]) {
    region.addEventListener('pointermove',event=>{if(event.pointerType!=='touch'){hover=pointerIndex(event); show();}});
    region.addEventListener('pointerout',event=>{hover=readIndex(event.relatedTarget); show();});
    region.addEventListener('focusin',event=>{focus=readIndex(event.target); show();});
    region.addEventListener('focusout',event=>{focus=readIndex(event.relatedTarget); show();});
  }
  plot.addEventListener('click',event=>{
    const index = pointerIndex(event);
    pin(index===pinned ? null : index);
  });
  plot.addEventListener('keydown',event=>{
    const index = readIndex(event.target);
    if (index!==null && ['Enter',' '].includes(event.key)) {
      event.preventDefault();
      pin(index===pinned ? null : index);
    }
  });
  const dismiss = event=>{if(event.key==='Escape') pin(null);};
  plot.addEventListener('keydown',dismiss);
  chart.querySelector('.chart-legend').addEventListener('keydown',dismiss);
}

function table() {
  const backlinks = new Map([...citations.keys()].map(id => [id, new Map()]));
  const linkBack = (id, row, metric) => {
    const byRow = backlinks.get(id);
    if (!byRow) return;
    if (!byRow.has(row.id)) byRow.set(row.id,{row,metrics:[]});
    if (metric) byRow.get(row.id).metrics.push(metric);
  };
  const columns = `<thead><tr><th scope="col">型号 / 样本与配置</th>${activeColumns.map(m=>`<th scope="col"><a href="#${esc(definitionAnchor(m))}" data-definition="${esc(m.id)}">${esc(m.label)}</a></th>`).join('')}</tr></thead>`;
  function dataRow(r) {
    const rowSources = r.sourceIds || [...new Set(Object.values(r.values).flatMap(valueSources))];
    rowSources.forEach(id => linkBack(id, r));
    return `<tr id="${esc(rowAnchor(r))}"><th scope="row">${esc(r.model)}<small>${esc(r.variant)}</small><small>${esc(r.evidence || '厂商标称；非独立实测')} ${citeSources(rowSources)}</small>${r.missing ? `<small>记录缺口：${esc(r.missing)}</small>` : ''}</th>${activeColumns.map(m => {
      const v = r.values[m.id], ids = valueSources(v), anchor = cellAnchor(r,m), valid = v?.display !== undefined || (v?.value !== undefined && v?.value !== null);
      ids.forEach(id => linkBack(id, r, m));
      return `<td id="${esc(anchor)}"><span class="value${valid ? '' : ' missing'}">${esc(valueText(v))}</span>${citeSources(ids)}${v ? `<small>${esc(v.note || '')}</small><small>${esc(v.evidence || r.evidence || '厂商标称')} · ${esc(v.checked_on || atlas.sources.get(ids[0])?.checked_on || r.checked_on || '')}</small><small>${v.location ? '原文位置：' + esc(v.location) : ids.length ? '仅记录级来源；未核逐参数定位。' : '逐参数来源待补。'}</small>` : '<small>本库未取得该配置可核验的参数；不表示原来源完全未涉及。</small>'}</td>`;
    }).join('')}</tr>`;
  }
  function specimenTables(rows) {
    const groups = new Map();
    for (const r of rows) {
      const key = r.specimen_id || r.id;
      if (!groups.has(key)) groups.set(key,[]);
      groups.get(key).push(r);
    }
    if (![...groups.values()].some(group=>group.length>1)) return dataTable(rows);
    return [...groups.values()].map(group=>{
      const row = group[0], id = 'specimen-'+state.domain+'-'+row.study_id+'-'+(row.specimen_id || row.id);
      const parts = row.model.split(' · ').filter((part,i)=>group.every(r=>r.model.split(' · ')[i]===part));
      const name = parts.join(' · ') || row.model;
      return `<details class="specimen-table" id="${esc(id)}" ${open.has(id)?'open':''}><summary><span>${esc(name)}</span><small>${group.length} 条记录</small></summary>${dataTable(group)}</details>`;
    }).join('');
  }
  const dataTable = rows => `<div class="table-scroll" role="region" aria-label="样本指标" tabindex="0"><table>${columns}<tbody>${rows.map(dataRow).join('')}</tbody></table></div>`;
  let output='', other=[];
  const open = new Set([...$('table').querySelectorAll('details[open]')].map(el=>el.id));
  function flushOther() {
    if (other.length) output+=dataTable(other);
    other=[];
  }
  for (const group of groupRows(activeRows)) {
    const {paper,rows} = group;
    if (!paper && !rows[0].study_id) { other.push(...rows); continue; }
    flushOther();
    const id = `paper-${state.domain}-${group.key}`;
    const title = atlas.sources.get(paper)?.title || group.key;
    const samples = new Set(rows.map(r=>r.specimen_id || r.id));
    const count = (rows.some(r=>r.specimen_id) ? samples.size+' 个配置 · ' : '')+rows.length+' 条记录';
    output+=`<details class="paper-table" id="${esc(id)}" ${open.has(id)?'open':''}><summary><span>${esc(title)}</span><small>${count}</small></summary>${specimenTables(rows)}</details>`;
  }
  flushOther();
  $('table').innerHTML = output || '<p class="empty-table">当前筛选范围没有记录。</p>';
  return backlinks;
}
function referenceList(backlinks) {
  function material(id,main) {
    const s = atlas.sources.get(id), rows = [...(backlinks.get(id)?.values() || [])];
    const url = `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a>`;
    const back = rows.length ? `<details class="source-uses"><summary>表中引用 · ${rows.length} 条记录</summary>${rows.map(({row,metrics})=>
      `<div class="backlinks"><a href="#${esc(rowAnchor(row))}">${esc(row.model)} ↑</a>${metrics.map(m=>`<a href="#${esc(cellAnchor(row,m))}">${esc(m.label)}</a>`).join('')}</div>`).join('')}</details>` : '<a class="source-definition" href="#evidence-notes">指标定义 / 任务依据 ↑</a>';
    return `<div class="reference-material"${id===main?'':` id="${esc(refAnchor(id))}"`}>${id===main?'':`<div class="reference-title">${url}</div>`}${s.doi?`<p>DOI：${esc(s.doi)}</p>`:''}<p>${esc(sourceKind(s.kind))} · 核验 ${esc(s.checked_on)}${s.verification==='inherited_v2'?'（沿用原核验记录）':''}</p>${s.location?`<p>原文位置：${esc(s.location)}</p>`:''}<p>读取范围：${esc(s.evidence_scope || s.scope || '以记录所列范围为准')}</p>${back}</div>`;
  }
  $('sources').innerHTML = [...referenceGroups].map(([main,group])=>{
    const s = atlas.sources.get(main);
    return `<li id="${esc(refAnchor(main))}" value="${group.number}"><div class="reference-title"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a>${s.source_year?' ('+esc(s.source_year)+')':''}</div><details class="source-materials"><summary>来源详情${group.materials.size>1?' · '+group.materials.size+' 份材料':''}</summary>${[...group.materials].map(id=>material(id,main)).join('')}</details></li>`;
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
  const d=domain(); activeRows=sortRows(filteredRows(d,state)); sourceIndex(); activeColumns=d.metrics.filter(m=>state.columns===null||state.columns.includes(m.id));
  if(updateControls) controls();
  $('view-title').textContent=d.name; $('scope').textContent=d.scope; $('scope').title=d.scope;
  const paperCount = groupRows(activeRows).filter(g=>g.paper || g.rows[0].study_id).length;
  $('view-count').textContent=(paperCount ? paperCount+' 篇文献 · ' : '')+activeRows.length+' 条记录';
  document.title=d.name+' · 透镜评价证据库';
  drawChart();
  $('status').textContent=`${activePoints.length} 个点 · ${activeRows.length-activePoints.length} 项缺少所选单值`;
  $('plot-note').textContent=(state.visible?'可见光 380–780 nm。保留波段交叠及明确可见光用途的记录，波段未知时隐藏。 ':'')+'虚线标出当前点的横、纵坐标。'+(d.app?' 同名同单位仍需核对条件。':d.id==='metalens'?' 同器件多个谱点不计作独立镜片。':' 厂商标称与独立实测分别理解。');
  referenceList(table()); renderDefinitions();
  $('date').textContent=`本页样本维护日期 ${d.asOf}；逐条保留原核验日期与读取范围。样本不代表完整市场覆盖。`;
  saveView();
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
  render();
});
$('model-search').addEventListener('input',()=>{state.query=$('model-search').value;render();$('model-search').focus();});
for(const [id,key,value] of [['all-models','models',null],['no-models','models',[]],['all-columns','columns',null],['no-columns','columns',[]]]) $(id).addEventListener('click',()=>{state[key]=value;render();});
$('visible-light').addEventListener('change',()=>{state.visible=$('visible-light').checked;render();});
$('reset-view').addEventListener('click',()=>{defaults(state.domain);state.visible=false;state.mode='scatter';state.sort='original';render();});
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
  const setting=event.target.closest('[data-setting]'),tab=event.target.closest('[data-evidence-tab]'),metric=event.target.closest('[data-metric]'),record=event.target.closest('[data-record]'),definition=event.target.closest('[data-definition]');
  if(event.target.closest('[data-recover-chart]')){Object.assign(state,availableAxes(domain(),activeRows));render();}
  if(setting){activeSetting=setting.dataset.setting;for(const button of document.querySelectorAll('[data-setting]')){button.setAttribute('aria-selected',String(button===setting));button.tabIndex=button===setting?0:-1;}$('model-controls').hidden=activeSetting!=='models';$('column-controls').hidden=activeSetting!=='columns';}
  if(tab){state.evidenceTab=tab.dataset.evidenceTab;renderDefinitions();document.querySelector(`[data-evidence-tab="${state.evidenceTab}"]`).focus();}
  if(metric)evidence.openMetric(metric.dataset.metric);
  if(record){const r=window.LENS_DATA.benchmarks.find(r=>r.id===record.dataset.record);evidence.openDialog(r.name,evidence.recordCard(r,true));}
  if(definition){$('evidence-notes').open=true;state.evidenceTab='metrics';renderDefinitions();}
});
document.addEventListener('keydown',event=>{
  const tab=event.target.closest('[role="tab"]');if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const buttons=[...tab.parentElement.querySelectorAll('[role="tab"]')].filter(b=>!b.hidden),index=buttons.indexOf(tab),next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowRight'?1:buttons.length-1))%buttons.length;buttons[next].click();buttons[next].focus();}
});
$('closeDialog').addEventListener('click',()=>$('detail').close());$('methodButton').addEventListener('click',()=>evidence.method());
$('export-csv').addEventListener('click',exportCSV);
$('export-svg').addEventListener('click',()=>{
  const svg = $('chart').querySelector('svg');
  if (!svg) { $('status').textContent='当前无有效图表可导出'; return; }
  const copy = svg.cloneNode(true);
  copy.setAttribute('xmlns','http://www.w3.org/2000/svg');
  copy.querySelector('.axis-inspection')?.remove();
  for (const tick of copy.querySelectorAll('.axis-ticks text')) tick.removeAttribute('visibility');
  for (const point of copy.querySelectorAll('[data-point]')) {
    const title = document.createElementNS(svg.namespaceURI,'title');
    title.textContent = point.getAttribute('aria-label');
    point.prepend(title);
  }
  const desc = document.createElementNS(svg.namespaceURI,'desc');
  desc.textContent = $('plot-note').textContent+'\n'+activePoints.map(pointDescription).join('\n');
  copy.prepend(desc);
  download('lens-'+state.domain+'-chart.svg','image/svg+xml',new XMLSerializer().serializeToString(copy));
});
$('share').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);$('status').textContent='已复制当前视图链接';}catch{$('status').textContent='当前选择已保存，可复制地址栏分享。';}});
// Following a citation only changes the fragment. Keep the pinned chart and table rows.
window.addEventListener('popstate',()=>{
  if (location.search !== viewQuery) { restore(new URL(location.href)); render(); }
});
function revealAnchor() {
  let id;
  try { id=decodeURIComponent(location.hash.slice(1)); } catch { return; }
  if (id.startsWith('definition-')) {
    $('evidence-notes').open=true;
    if (state.evidenceTab!=='metrics') { state.evidenceTab='metrics'; renderDefinitions(); }
  }
  const target = document.getElementById(id);
  if (!target) return;
  if (target.matches('#sources li')) target.querySelector('.source-materials').open=true;
  for (let parent=target.closest('details'); parent; parent=parent.parentElement?.closest('details')) parent.open=true;
  requestAnimationFrame(()=>target.scrollIntoView({block:'start',inline:'nearest'}));
}
document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');
  const cell = link?.classList.contains('citation') && link.closest('td[id],tr[id]');
  if (cell) {
    const material = document.getElementById(link.hash.slice(1));
    if (material) {
      document.querySelector('.source-return')?.remove();
      const back = document.createElement('a');
      back.className='source-return'; back.href='#'+cell.id; back.textContent='↑ 返回刚才查看的数据';
      const heading = material.querySelector('.reference-title');
      if (heading) heading.after(back); else material.prepend(back);
    }
  }
  if (link && link.hash===location.hash) revealAnchor();
});
window.addEventListener('hashchange',revealAnchor);if(location.hash)revealAnchor();

const selectionControls=$('selection-controls'), selectionHome=selectionControls.parentElement;
$('mobile-filter-toggle').addEventListener('click',()=>{$('mobile-filter-content').append(selectionControls);$('filter-dialog').showModal();});
$('close-filters').addEventListener('click',()=>$('filter-dialog').close());
$('filter-dialog').addEventListener('close',()=>{selectionHome.insertBefore(selectionControls,selectionHome.querySelector('.settings-actions'));});
window.matchMedia('(min-width:760px)').addEventListener('change',event=>{if(event.matches&&$('filter-dialog').open)$('filter-dialog').close();});

new ResizeObserver(()=>{
  const width = Math.min(900, Math.max(280, $('chart').clientWidth - 2));
  if (width !== plotWidth) {
    for (const row of $('table').querySelectorAll('.plot-selected')) row.classList.remove('plot-selected');
    drawChart();
  } else positionReadout?.();
}).observe($('chart'));

window.ATLAS_READY=true;
