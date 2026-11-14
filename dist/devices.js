{
 'use strict';
const E=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=id=>document.getElementById(id),D=window.DEVICE_DATA;
function points(rows,x,y){return rows.filter(r=>Number.isFinite(r.values[x]?.value)&&Number.isFinite(r.values[y]?.value)).map(r=>({id:r.id,label:r.model,x:r.values[x].value,y:r.values[y].value}));}
function tickLabels(min,max){
 const values=Array.from({length:5},(_,i)=>min+(max-min)*i/4);
 for(let precision=3;precision<=17;precision++){
  const labels=values.map(value=>String(Number(value.toPrecision(precision))));
  if(new Set(labels).size===values.length)return labels;
 }
 return values.map(String);
}
function groupPoints(points) {
 const groups = new Map();
 for (const point of points) {
  const key = JSON.stringify([point.x, point.y]);
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(point);
 }
 return [...groups.values()];
}

function groupLabels(group) {
 const publications = new Set(), models = new Set();
 for (const point of group) {
  const paper = point.row?.pointLabel || point.row?.paperLabel;
  if (paper) publications.add(paper);
  else models.add(point.label ?? point.row?.model);
 }
 return [...publications, ...models];
}

function axisRange(values, bounds = {}) {
 const low = Math.min(...values), high = Math.max(...values);
 const padding = ((high - low) || Math.abs(low) * .1 || 1) * .1;
 // Bound the optional whitespace only. Keep every reported coordinate on the plot.
 return [
  Math.min(low, Math.max(low - padding, bounds.min ?? -Infinity)),
  Math.max(high, Math.min(high + padding, bounds.max ?? Infinity))
 ];
}

function scatterMarkup(groups, xLabel, yLabel, {width = 900, categorical = false, scrollable = false, mode = 'scatter', xBounds, yBounds, zoom} = {}) {
 const compact = width < 600;
 const height = compact ? 242 : 450;
 const left = compact ? 54 : 90, right = width - (compact ? 20 : 110);
 const top = compact ? 34 : 60, bottom = height - (compact ? 46 : 80);
 const xTickY = bottom + (compact ? 17 : 25);
 const coordinates = groups.map(([p]) => p);
 const xs = coordinates.map(p => p.x), ys = coordinates.map(p => p.y);
 const [xmin, xmax, ymin, ymax] = zoom || [...axisRange(xs, xBounds), ...axisRange(ys, yBounds)];
 const px = x => left + (x-xmin)/(xmax-xmin)*(right-left), py = y => bottom - (y-ymin)/(ymax-ymin)*(bottom-top);
 const xticks = tickLabels(xmin,xmax), yticks = tickLabels(ymin,ymax);
 const palette = ['#30776d','#4678aa','#8a61a3','#b1623f','#96721c','#466997','#a95472','#547e45'];
 const marks = coordinates.map(p => ({x:px(p.x), y:py(p.y)}));
 const boxOverlaps = (a,b) => a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y;
 const occupied = marks.map(p => ({x:p.x-8,y:p.y-8,w:16,h:16}));
 const markers = [], labels = [], legend = [], ticks = [], grid = [];
 for (let i=0; i<5; i++) {
  const x = left+(right-left)*i/4, y = bottom-(bottom-top)*i/4;
  grid.push(`M${x} ${top}V${bottom} M${left} ${y}H${right}`);
  ticks.push(`<text x="${left-10}" y="${y}" text-anchor="end" dominant-baseline="middle" font-size="12">${E(yticks[i])}</text>`);
  if (!categorical) ticks.push(`<text x="${x}" y="${xTickY}" text-anchor="middle" font-size="12">${E(xticks[i])}</text>`);
 }
 if (categorical) {
  let previous = -Infinity;
  for (const x of [...xs].sort((a,b)=>a-b)) {
   if (px(x)-previous < 35) continue;
   ticks.push(`<text x="${px(x)}" y="${xTickY}" text-anchor="middle" font-size="12">${E(x)}</text>`);
   previous = px(x);
  }
 }
 groups.forEach((group,i) => {
  const p = group[0], {x,y} = marks[i], names = group.map(p=>p.label ?? p.row?.model);
  const series = [...new Set(group.map(p=>p.row?.study_id || p.row?.id || p.id))];
  const hash = Array.from(series[0]).reduce((n,c)=>(n*31+c.codePointAt(0))>>>0,0);
  const color = series.length === 1 ? palette[hash%palette.length] : '#53636d';
  const identities = groupLabels(group);
  const name = group.length === 1 ? (p.row?.pointLabel || names[0]) :
   identities[0] + (identities.length > 1 ? ' +' + (identities.length - 1) : '');
  markers.push(`<g data-point="${i}"><rect x="${x-9}" y="${y-9}" width="18" height="18" fill="transparent"/><circle cx="${x}" cy="${y}" r="5" fill="${color}" stroke="white" stroke-width="1"><title>${E(names.join('、'))} (${p.x}, ${p.y})</title></circle></g>`);
  // Only place a complete name immediately beside its point. Dense views use inspection.
  if ((group.some(point=>point.row?.pointLabel || point.row?.paperLabel) || groups.length <= (compact ? 5 : 12)) && name.length <= 42) {
   const w = Array.from(name).reduce((sum,c)=>sum+(c.charCodeAt(0)<128 ? 6.4 : 10.5),0)+3;
   for (const start of [x+9,x-9-w]) {
    const box = {x:start,y:y-7,w,h:14};
    if (start < left || start+w > right || occupied.some(b=>boxOverlaps(b,box))) continue;
    labels.push(`<text class="point-label" x="${start}" y="${y}" dominant-baseline="middle" font-size="10" fill="#506560" pointer-events="none">${E(name)}</text>`);
    occupied.push(box);
    break;
   }
  }
  legend.push(`<li>${E(names.join('、'))}：(${p.x}, ${p.y})${group.length>1?'，'+group.length+' 个型号同坐标重合':''}</li>`);
 });
 let line = '';
 if (mode==='line' && marks.length>1) {
  const ordered = [...coordinates].sort((a,b)=>a.x-b.x||a.y-b.y);
  line = `<polyline class="model-line" points="${ordered.map(p=>px(p.x)+','+py(p.y)).join(' ')}" stroke="#526a82" stroke-width="2" fill="none"/>`;
 }
 const hint = scrollable ? '<p class="chart-scroll-hint" id="chart-scroll-hint">窄屏可横向滚动查看完整散点图。</p>' : '';
 return `${hint}<div class="scroll plot-scroll" role="region" aria-label="指标散点图"${scrollable?' aria-describedby="chart-scroll-hint"':''} tabindex="0"><svg viewBox="0 0 ${width} ${height}" role="group" aria-label="样本指标散点图" data-axis-left="${left}" data-axis-right="${right}" data-axis-top="${top}" data-axis-bottom="${bottom}" data-x-min="${xmin}" data-x-max="${xmax}" data-y-min="${ymin}" data-y-max="${ymax}" data-x-tick-y="${xTickY}"><path d="${grid.join(' ')}" stroke="#e2eae7" fill="none"/><path d="M${left} ${top-(compact?4:20)}V${bottom}H${right+(compact?5:20)}" stroke="#83968e" fill="none"/><g class="axis-ticks">${ticks.join('')}</g><text x="${(left+right)/2}" y="${height-(compact?4:17)}" text-anchor="middle" font-size="13">${E(xLabel)}</text><text x="12" y="20" font-size="13">${E(yLabel)}</text>${line}${labels.join('')}${markers.join('')}</svg></div><ul class="chart-legend" aria-label="散点型号与坐标">${legend.join('')}</ul>`;
}

function chart(rows,x,y,metrics,mode='scatter') {
 const groups = groupPoints(points(rows,x,y));
 if (!groups.length) return '<p>这两个指标暂无同时已知的型号。请选择其他指标；不会补零。</p>';
 const xm = metrics.find(m=>m.id===x), ym = metrics.find(m=>m.id===y);
 return scatterMarkup(groups, xm.label, ym.label, {mode, scrollable:true, xBounds:xm.axis_bounds, yBounds:ym.axis_bounds});
}
window.LensPlot = {points,tickLabels,groupPoints,groupLabels,axisRange,scatterMarkup,chart};
if(!window.UNIFIED_WORKSPACE){
let chosenModels=null,chosenColumns=null;
function viewRows(){const c=D.domains[$('domain').value];return c.rows.filter(r=>($('domain').value==='xr'||r.module===$('module').value)&&(chosenModels===null||chosenModels.includes(r.model)));}
function sortedRows(rows,x,y){const key=$('sort').value;return [...rows].sort((a,b)=>key==='x'||key==='y'?((a.values[key==='x'?x:y]?.value??Infinity)-(b.values[key==='x'?x:y]?.value??Infinity)||a.model.localeCompare(b.model)):key==='model'?a.model.localeCompare(b.model):0);}
function cellText(r,m){const v=r.values[m.id];return v&&v.value!==null?String(v.value):'未公开 / 未核验';}
function render(reset=false,resetScroll=false){
 const domain=$('domain').value,c=D.domains[domain],ms=c.metrics;
 if(reset){chosenModels=null;chosenColumns=null;}
 const available=c.rows.filter(r=>domain==='xr'||r.module===$('module').value),models=[...new Set(available.map(r=>r.model))];
 $('models').innerHTML=models.map(m=>`<option${chosenModels===null||chosenModels.includes(m)?' selected':''}>${E(m)}</option>`).join('');
 $('columns').innerHTML=ms.map(m=>`<option value="${m.id}"${chosenColumns===null||chosenColumns.includes(m.id)?' selected':''}>${E(m.label)}</option>`).join('');
 $('module-label').hidden=domain==='xr';$('scope').textContent=c.scope;
 for(const id of ['x','y'])if(reset||!ms.some(m=>m.id===$(id).value)){$(id).innerHTML=ms.filter(m=>m.numeric).map(m=>`<option value="${m.id}">${E(m.label)}</option>`).join('');$(id).value=ms.filter(m=>m.numeric)[id==='x'?0:1].id;}
 const x=$('x').value,y=$('y').value,rs=sortedRows(viewRows(),x,y),columns=ms.filter(m=>chosenColumns===null||chosenColumns.includes(m.id)),ps=points(rs,x,y);
 $('chart').innerHTML=chart(rs,x,y,ms,$('mode').value);$('status').textContent=`当前 ${rs.length} 个型号，${ps.length} 个可绘制点；${rs.length-ps.length} 个缺少所选数值。证据：厂商公开规格，非同条件实测。`;
 $('table').innerHTML='<table><thead><tr><th>型号 / 配置</th>'+columns.map(m=>`<th><a href="#metric-${domain}-${m.id}">${E(m.label)}</a></th>`).join('')+'</tr></thead><tbody>'+rs.map(r=>'<tr><th>'+E(r.model)+'<small>'+E(r.variant)+'</small></th>'+columns.map(m=>{const v=r.values[m.id];return '<td>'+E(cellText(r,m))+(v?`<small>${E(v.note||'')} <a href="#source-${E(v.source)}">出处</a> · ${E(v.location)}</small>`:'')+'</td>';}).join('')+'</tr>').join('')+'</tbody></table>';
 $('definitions').innerHTML=ms.map(m=>`<details id="metric-${domain}-${m.id}"><summary>${E(m.label)}</summary><p>${E(m.definition)}</p><p>比较前提：${E(m.conditions)}</p>${m.definition_refs?.length?'<p>定义/字段依据：'+m.definition_refs.map(ref=>{const source=D.sources.find(v=>v.id===ref.source);return `<a href="#source-${E(ref.source)}">${E(source.title)}</a> · ${E(ref.location)}`;}).join('；')+'</p>':'<p>完整定义出处仍待补证。</p>'}<p>未建立通用重要性排名；字段支持声明不等于同条件性能测量。</p></details>`).join('');
 $('sources').innerHTML=D.sources.filter(s=>rs.some(r=>Object.values(r.values).some(v=>v.source===s.id))||ms.some(m=>m.definition_refs?.some(ref=>ref.source===s.id))).map(s=>`<p id="source-${E(s.id)}"><a href="${E(s.url)}" target="_blank" rel="noopener">${E(s.title)}</a><br>${E(({scholarly_book:'学术教材',manufacturer_technical:'原厂技术说明',manufacturer:'厂商规格'})[s.kind]||'厂商规格')} · ${E(s.scope)} · 核验 ${E(s.checked_on)}</p>`).join('');
 $('date').textContent='样本截止 '+D.as_of+'；非完整市场清单，未知项保留。';if(resetScroll)$('table').scrollLeft=0;
 saveView();
}
function saveView(){if(!window.history||!window.location)return;const u=new URL(window.location.href);for(const id of ['domain','module','x','y','mode','sort'])u.searchParams.set(id,$(id).value);for(const [id,v]of [['models',chosenModels],['columns',chosenColumns]]){if(v===null)u.searchParams.delete(id);else u.searchParams.set(id,JSON.stringify(v));}window.history.replaceState(null,'',u);}
function download(name,type,text){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([text],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function csvText(rows,metrics){const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';const safe=v=>/^[=+\-@\t\r]/.test(String(v))?"'"+v:v;return '\ufeff'+[['型号','配置',...metrics.flatMap(m=>[m.label,m.label+'备注',m.label+'来源',m.label+'原文位置'])],...rows.map(r=>[r.model,r.variant,...metrics.flatMap(m=>{const v=r.values[m.id];return [cellText(r,m),v?.note||'',D.sources.find(s=>s.id===v?.source)?.url||'',v?.location||''];})])].map(row=>row.map(v=>q(safe(v))).join(',')).join('\r\n');}
['domain','module','x','y','mode','sort'].forEach(id=>$(id).addEventListener('change',()=>render(id==='domain',id==='domain'||id==='module')));
for(const id of ['models','columns'])$(id).addEventListener('change',()=>{const values=[...$(id).selectedOptions].map(o=>o.value);if(id==='models')chosenModels=values;else chosenColumns=values;render();});
$('all-models').addEventListener('click',()=>{chosenModels=null;render();});$('all-columns').addEventListener('click',()=>{chosenColumns=null;render();});
$('export-csv').addEventListener('click',()=>{const c=D.domains[$('domain').value];download('lens-device-table.csv','text/csv;charset=utf-8',csvText(sortedRows(viewRows(),$('x').value,$('y').value),c.metrics.filter(m=>chosenColumns===null||chosenColumns.includes(m.id))));});
$('export-svg').addEventListener('click',()=>{const svg=$('chart').querySelector('svg');if(!svg){$('status').textContent='当前无有效图表可导出';return;}const copy=svg.cloneNode(true);copy.setAttribute('xmlns','http://www.w3.org/2000/svg');const desc=document.createElementNS('http://www.w3.org/2000/svg','desc');desc.textContent=$('status').textContent+'；'+$('chart').textContent;copy.prepend(desc);download('lens-device-chart.svg','image/svg+xml',new XMLSerializer().serializeToString(copy));});
$('share').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(window.location.href);$('status').textContent='已复制当前视图链接';}catch{$('status').textContent='可复制浏览器地址栏，当前选择已保存在链接中。';}});
const initialSearch=window.location?.href;render(true);
if(initialSearch){const p=new URL(initialSearch).searchParams;const domain=p.get('domain');if(D.domains[domain]){$('domain').value=domain;render(true);}for(const id of ['module','x','y','mode','sort']){const v=p.get(id);if(v&&[...$(id).options].some(o=>o.value===v))$(id).value=v;}for(const id of ['models','columns']){try{const v=JSON.parse(p.get(id));if(Array.isArray(v)&&v.every(x=>typeof x==='string')){if(id==='models')chosenModels=v;else chosenColumns=v;}}catch{}}render();}

}

}
