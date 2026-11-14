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
function layoutLabels(items){
 const placed=[],padding=4,height=18;
 const overlaps=(a,b,gap)=>a.x<b.x+b.width+gap&&a.x+a.width+gap>b.x&&a.y<b.y+b.height+gap&&a.y+a.height+gap>b.y;
 const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
 for(const item of items){
  // One em per character is deliberately conservative for the 13px labels.
  const width=Array.from(item.label).length*13+8;
  const box=(x,y)=>({x:clamp(x,100,800-width),y:clamp(y,40,360-height),width,height});
  const free=b=>width<=700&&!placed.some(p=>p&&overlaps(b,p,padding))&&!items.some(p=>overlaps(b,{x:p.x-10,y:p.y-10,width:20,height:20},0));
  const candidates=[box(item.x+14,item.y-36),box(item.x+14,item.y+14),box(item.x-width-14,item.y-36),box(item.x-width-14,item.y+14)];
  let chosen=candidates.find(free);
  if(!chosen){
   let distance=Infinity;
   for(let y=40;y<=360-height;y+=24)for(let x=100;x<=800-width;x+=24){
    const b=box(x,y),dx=item.x-clamp(item.x,b.x,b.x+b.width),dy=item.y-clamp(item.y,b.y,b.y+b.height),d=dx*dx+dy*dy;
    if(free(b)&&d<distance){chosen=b;distance=d;}
   }
  }
  if(!chosen){placed.push(null);continue;}
  // Connect to the visible start of the text, not its conservative width estimate.
  placed.push({...chosen,anchorX:chosen.x,anchorY:item.y<chosen.y+height/2?chosen.y:chosen.y+height});
 }
 return placed;
}
function chart(rows,x,y,metrics){
 const ps=points(rows,x,y);
 if(!ps.length)return '<p>这两个指标暂无同时已知的型号。请选择其他指标；不会补零。</p>';
 const groups=new Map();
 for(const p of ps){const key=JSON.stringify([p.x,p.y]);if(!groups.has(key))groups.set(key,{x:p.x,y:p.y,labels:[]});groups.get(key).labels.push(p.label);}
 const xs=ps.map(p=>p.x),ys=ps.map(p=>p.y);
 let xmin=Math.min(...xs),xmax=Math.max(...xs),ymin=Math.min(...ys),ymax=Math.max(...ys);
 const dx=(xmax-xmin)||Math.abs(xmin)*.1||1,dy=(ymax-ymin)||Math.abs(ymin)*.1||1;
 xmin-=dx*.1;xmax+=dx*.1;ymin-=dy*.1;ymax+=dy*.1;
 const px=v=>90+(v-xmin)/(xmax-xmin)*700,py=v=>370-(v-ymin)/(ymax-ymin)*310;
 const xticks=tickLabels(xmin,xmax),yticks=tickLabels(ymin,ymax);
 let s='<p class="chart-scroll-hint" id="chart-scroll-hint">窄屏可横向滚动查看完整散点图；下方图例保留全部型号与坐标。</p><div class="scroll plot-scroll" role="region" aria-label="散点图横向滚动区域" aria-describedby="chart-scroll-hint" tabindex="0"><svg viewBox="0 0 900 450" role="img" aria-label="型号指标散点图；重合点按坐标分组，型号见下方图例"><path d="M90 40V370H810" stroke="#718096" fill="none"/>';
 for(let i=0;i<=4;i++){
  const xv=xmin+(xmax-xmin)*i/4,yv=ymin+(ymax-ymin)*i/4;
  s+=`<text x="${px(xv)}" y="395" text-anchor="middle" font-size="12">${E(xticks[i])}</text><text x="80" y="${py(yv)}" text-anchor="end" font-size="12">${E(yticks[i])}</text>`;
 }
 s+=`<text x="450" y="435" text-anchor="middle">${E(metrics.find(m=>m.id===x).label)}</text><text x="12" y="20">${E(metrics.find(m=>m.id===y).label)}</text>`;
 const legend=[];let markers='',annotations='';
 const entries=[...groups.values()],labels=entries.map(g=>g.labels.length>1?`${g.labels.length} 个型号`:g.labels[0]);
 const positions=layoutLabels(entries.map((g,i)=>({x:px(g.x),y:py(g.y),label:labels[i]})));
 entries.forEach((g,i)=>{
  const label=labels[i],position=positions[i],color=`hsl(${i*97%360} 65% 40%)`;
  const leader=position?`<line class="label-leader" x1="${px(g.x)}" y1="${py(g.y)}" x2="${position.anchorX}" y2="${position.anchorY}" stroke="${color}" stroke-width="1" opacity="0.65" aria-hidden="true"/>`:'';
  const text=position?`<text class="point-label" x="${position.x}" y="${position.y+14}" font-size="13">${E(label)}</text>`:'';
  s+=leader;
  markers+=`<g><circle cx="${px(g.x)}" cy="${py(g.y)}" r="7" fill="${color}"><title>${E(g.labels.join('、'))}: ${g.x}, ${g.y}</title></circle></g>`;
  annotations+=text;
  legend.push(`<li><span style="color:${color}" aria-hidden="true">●</span> ${E(g.labels.join('、'))}：(${g.x}, ${g.y})${g.labels.length>1?'，同坐标重合':''}</li>`);
 });
 return s+markers+annotations+'</svg></div>'+(positions.some(p=>!p)?'<p>部分文字标签请见下方完整图例；圆点坐标未移动。</p>':'')+'<ul class="chart-legend" aria-label="散点型号与坐标">'+legend.join('')+'</ul>';
}
function render(reset=false,resetScroll=false){const domain=$('domain').value,c=D.domains[domain],ms=c.metrics,rs=c.rows.filter(r=>domain==='xr'||r.module===$('module').value);$('module-label').hidden=domain==='xr';$('scope').textContent=c.scope;for(const id of ['x','y']){if(reset||!ms.some(m=>m.id===$(id).value)){$(id).innerHTML=ms.filter(m=>m.numeric).map(m=>`<option value="${m.id}">${E(m.label)}</option>`).join('');$(id).value=ms.filter(m=>m.numeric)[id==='x'?0:1].id;}}const x=$('x').value,y=$('y').value,ps=points(rs,x,y);$('chart').innerHTML=chart(rs,x,y,ms);$('status').textContent=`当前 ${rs.length} 个型号，${ps.length} 个可绘制点；${rs.length-ps.length} 个缺少所选数值。证据：厂商公开规格，非同条件实测。`;$('table').innerHTML='<table><thead><tr><th>型号 / 配置</th>'+ms.map(m=>`<th>${E(m.label)}</th>`).join('')+'</tr></thead><tbody>'+rs.map(r=>'<tr><th>'+E(r.model)+'<small>'+E(r.variant)+'</small></th>'+ms.map(m=>{const v=r.values[m.id];return '<td>'+(v&&v.value!==null?E(v.value):'未公开 / 未核验')+(v?`<small>${E(v.note||'')} <a href="#source-${E(v.source)}">出处</a> · ${E(v.location)}</small>`:'')+'</td>';}).join('')+'</tr>').join('')+'</tbody></table>';$('definitions').innerHTML=ms.map(m=>`<details><summary>${E(m.label)}</summary><p>${E(m.definition)}</p><p>比较前提：${E(m.conditions)}</p></details>`).join('');$('sources').innerHTML=D.sources.filter(s=>rs.some(r=>Object.values(r.values).some(v=>v.source===s.id))).map(s=>`<p id="source-${E(s.id)}"><a href="${E(s.url)}" target="_blank" rel="noopener">${E(s.title)}</a><br>${E(s.scope)} · 核验 ${E(s.checked_on)}</p>`).join('');$('date').textContent='样本截止 '+D.as_of+'；非完整市场清单，未知项保留。';if(resetScroll)$('table').scrollLeft=0;}
['domain','module','x','y'].forEach(id=>$(id).addEventListener('change',()=>render(id==='domain',id==='domain'||id==='module')));render(true);
