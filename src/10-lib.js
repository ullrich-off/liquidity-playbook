<script>
/* ========== helpers ========== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
function K(o,c,wu=1,wl=1){return{o,c,h:Math.max(o,c)+wu,l:Math.min(o,c)-wl}}
function chain(start,list,seed=7){const r=rng(seed);let p=start;return list.map(e=>{let c,wu,wl;if(Array.isArray(e))[c,wu,wl]=e;else c=e;
  if(wu===undefined)wu=.4+r()*.9;if(wl===undefined)wl=.4+r()*.9;const k=K(p,c,wu,wl);p=c;return k})}
function flip(cs,ax){return cs.map(k=>({o:2*ax-k.o,c:2*ax-k.c,h:2*ax-k.l,l:2*ax-k.h}))}
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
let UID=0;

/* ========== candle chart engine ========== */
function candleChart(sp){
  const cs=sp.c,n=cs.length,W=sp.w||760,H=sp.h||340,uid='m'+(++UID);
  const pd=Object.assign({l:16,r:16,t:30,b:sp.xl?30:16},sp.pad||{});
  let lo=Math.min(...cs.map(k=>k.l)),hi=Math.max(...cs.map(k=>k.h));
  if(sp.y){lo=sp.y[0];hi=sp.y[1]}else{const m=(hi-lo)*.1;lo-=m;hi+=m}
  const iw=W-pd.l-pd.r,ih=H-pd.t-pd.b,st=iw/n,bw=Math.min(24,st*.58);
  const X=i=>pd.l+(i+.5)*st,Y=p=>pd.t+(hi-p)/(hi-lo)*ih;
  const R=p=>{if(typeof p==='number')return p;if(p==='T')return hi;if(p==='B')return lo;
    const m=/^(bt|bb|o|h|l|c)(\d+)([+-][\d.]+)?$/.exec(p);if(!m)throw new Error('bad ref '+p);
    const k=cs[+m[2]];if(!k)throw new Error('no candle '+p);
    const v=m[1]==='bt'?Math.max(k.o,k.c):m[1]==='bb'?Math.min(k.o,k.c):k[m[1]];return v+(m[3]?+m[3]:0)};
  const txt=(x,y,s,cls,anc)=>{const L=String(s).split('\n');
    return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anc||'start'}" class="halo ${cls||''}">${L.map((t,i)=>`<tspan x="${x.toFixed(1)}" dy="${i?13:0}">${esc(t)}</tspan>`).join('')}</text>`};
  let under='',over='';
  (sp.a||[]).forEach(a=>{const c=a.cls||'k-mute';
    switch(a.t){
    case'zone':{const x1=X(a.i1)-st/2,x2=X(a.i2)+st/2,y1=Y(R(a.p1)),y2=Y(R(a.p2)),t=Math.min(y1,y2),h=Math.abs(y2-y1);
      under+=`<g class="${c}"><rect class="${a.band?'band':'zone'}" x="${x1.toFixed(1)}" y="${t.toFixed(1)}" width="${(x2-x1).toFixed(1)}" height="${h.toFixed(1)}"/></g>`;
      if(a.s){const la=a.la||'tl';const tx=la.includes('r')?x2-6:la==='c'?(x1+x2)/2:x1+6,ty=la.includes('b')?t+h-8:la==='c'?t+h/2+4:t+14;
        over+=`<g class="${c}">${txt(tx,ty,a.s,'kt',la.includes('r')?'end':la==='c'?'middle':'start')}</g>`}break}
    case'hline':{const x1=a.i1==null?pd.l:X(a.i1),x2=a.i2==null?W-pd.r:X(a.i2),y=Y(R(a.p));
      over+=`<g class="${c}"><line class="ln ${a.d===false?'':'d'}" x1="${x1}" x2="${x2}" y1="${y}" y2="${y}"/>`;
      if(a.s){const l=a.la==='l';over+=txt(l?x1+4:x2-4,y+(a.below?15:-6),a.s,'kt',l?'start':'end')}over+='</g>';break}
    case'vline':{const x=X(a.i);over+=`<g class="${c}"><line class="ln d" x1="${x}" x2="${x}" y1="${pd.t}" y2="${H-pd.b}"/>${a.s?txt(x+4,pd.t+10,a.s,'kt'):''}</g>`;break}
    case'text':over+=`<g class="${c}">${txt(X(a.i)+(a.dx||0),Y(R(a.p))+(a.dy||0),a.s,'kt '+(a.big?'big':''),a.anc)}</g>`;break;
    case'tag':{const x=X(a.i)+(a.dx||0),y=Y(R(a.p))+(a.dy||0),w=a.s.length*6.5+14;
      over+=`<g class="tag ${c}"><rect x="${(a.anc==='end'?x-w:a.anc==='middle'?x-w/2:x).toFixed(1)}" y="${y-12}" width="${w}" height="19" rx="4"/><text x="${(a.anc==='end'?x-w/2:a.anc==='middle'?x:x+w/2).toFixed(1)}" y="${y+1.5}" text-anchor="middle">${esc(a.s)}</text></g>`;break}
    case'arrow':over+=`<g class="${c}"><line class="ln ${a.d?'d':''}" x1="${X(a.i1)}" y1="${Y(R(a.p1))}" x2="${X(a.i2)}" y2="${Y(R(a.p2))}" marker-end="url(#ah${uid})"/>${a.s?txt((X(a.i1)+X(a.i2))/2+(a.dx||8),(Y(R(a.p1))+Y(R(a.p2)))/2+(a.dy||0),a.s,'kt',a.anc):''}</g>`;break;
    case'dot':over+=`<g class="${c}"><circle class="dot" cx="${X(a.i)}" cy="${Y(R(a.p))}" r="${a.r||5}"/>${a.s?txt(X(a.i)+(a.dx||9),Y(R(a.p))+(a.dy||4),a.s,'kt',a.anc):''}</g>`;break;
    case'poly':over+=`<g class="${c}"><polyline class="ln ${a.d?'d':''}" points="${a.pts.map(q=>X(q[0]).toFixed(1)+','+Y(R(q[1])).toFixed(1)).join(' ')}"/></g>`;break;
    case'range':{const l=R(a.lo),h=R(a.hi),m=(l+h)/2;
      under+=`<g class="k-bad"><rect class="zone" x="${X(a.i1)-st/2}" y="${Y(h)}" width="${X(a.i2)-X(a.i1)+st}" height="${Y(m)-Y(h)}"/></g><g class="k-good"><rect class="zone" x="${X(a.i1)-st/2}" y="${Y(m)}" width="${X(a.i2)-X(a.i1)+st}" height="${Y(l)-Y(m)}"/></g>`;
      const x2=X(a.i2)+st/2;over+=`<g class="k-ink"><line class="ln d" x1="${X(a.i1)-st/2}" x2="${x2}" y1="${Y(m)}" y2="${Y(m)}"/>${txt(x2-4,Y(m)-6,'EQ 50%','kt','end')}</g><g class="k-bad">${txt(X(a.i1)-st/2+6,Y(h)+14,a.top||'PREMIUM','kt')}</g><g class="k-good">${txt(X(a.i1)-st/2+6,Y(l)-8,a.bot||'DISCOUNT','kt')}</g>`;break}
    }});
  let body='';
  for(let g=0;g<=5;g++){const gy=(pd.t+ih*g/5).toFixed(1);under+=`<line class="grid" x1="${pd.l}" x2="${W-pd.r}" y1="${gy}" y2="${gy}"/>`}
  cs.forEach((k,i)=>{const up=k.c>=k.o,x=X(i),top=Y(Math.max(k.o,k.c)),bh=Math.max(1.6,Math.abs(Y(k.o)-Y(k.c))),cl=(k.cls||(up?'cu':'cd'));
    body+=`<g class="${cl}"><line class="wk" x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${Y(k.h).toFixed(1)}" y2="${Y(k.l).toFixed(1)}"/><rect x="${(x-bw/2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="1"/></g>`});
  let xl='';if(sp.xl)Object.entries(sp.xl).forEach(([i,l])=>{xl+=`<text x="${X(+i)}" y="${H-8}" text-anchor="middle">${esc(l)}</text><line class="grid" x1="${X(+i)}" x2="${X(+i)}" y1="${H-pd.b}" y2="${H-pd.b+4}"/>`});
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(sp.alt||'Annotated candlestick chart')}"><defs><marker id="ah${uid}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs><rect class="band k-mute" x="0" y="0" width="${W}" height="${H}" fill="none"/>${under}${body}${over}${xl}</svg>`}

/* ========== generic line plot ========== */
function plotLines(sp){
  const W=sp.w||760,H=sp.h||320,pd=Object.assign({l:54,r:22,t:24,b:44},sp.pad||{});
  const [x0,x1]=sp.x,[y0,y1]=sp.y,iw=W-pd.l-pd.r,ih=H-pd.t-pd.b;
  const X=v=>pd.l+(v-x0)/(x1-x0)*iw,Y=v=>pd.t+(y1-v)/(y1-y0)*ih;let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(sp.alt||'Line chart')}">`;
  (sp.yt||[]).forEach(t=>{s+=`<line class="grid" x1="${pd.l}" x2="${W-pd.r}" y1="${Y(t.v)}" y2="${Y(t.v)}"/><text x="${pd.l-8}" y="${Y(t.v)+4}" text-anchor="end">${esc(t.s)}</text>`});
  (sp.xt||[]).forEach(t=>{s+=`<line class="grid" x1="${X(t.v)}" x2="${X(t.v)}" y1="${pd.t}" y2="${H-pd.b}"/><text x="${X(t.v)}" y="${H-pd.b+17}" text-anchor="middle">${esc(t.s)}</text>`});
  s+=`<line class="axis" x1="${pd.l}" x2="${W-pd.r}" y1="${H-pd.b}" y2="${H-pd.b}"/><line class="axis" x1="${pd.l}" x2="${pd.l}" y1="${pd.t}" y2="${H-pd.b}"/>`;
  if(sp.xlab)s+=`<text x="${pd.l+iw/2}" y="${H-6}" text-anchor="middle">${esc(sp.xlab)}</text>`;
  if(sp.ylab)s+=`<text transform="translate(13 ${pd.t+ih/2}) rotate(-90)" text-anchor="middle">${esc(sp.ylab)}</text>`;
  (sp.hl||[]).forEach(h=>{s+=`<g class="${h.cls||'k-mute'}"><line class="ln d" x1="${pd.l}" x2="${W-pd.r}" y1="${Y(h.v)}" y2="${Y(h.v)}"/>${h.s?`<text class="kt halo" x="${W-pd.r-4}" y="${Y(h.v)-6}" text-anchor="end">${esc(h.s)}</text>`:''}</g>`});
  (sp.s||[]).forEach(q=>{const pts=q.pts.map(p=>X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1)).join(' ');
    if(q.area)s+=`<g class="${q.cls}"><polygon class="zone" points="${X(q.pts[0][0])},${Y(y0)} ${pts} ${X(q.pts[q.pts.length-1][0])},${Y(y0)}"/></g>`;
    s+=`<g class="${q.cls}"><polyline class="ln ${q.d?'d':''}" style="${q.w?'stroke-width:'+q.w:''}" points="${pts}"/>${q.s?`<text class="kt halo" x="${X(q.pts[q.pts.length-1][0])-4}" y="${Y(q.pts[q.pts.length-1][1])-8}" text-anchor="end">${esc(q.s)}</text>`:''}</g>`});
  (sp.p||[]).forEach(p=>{s+=`<g class="${p.cls||'k-liq'}"><circle class="dot" cx="${X(p.x)}" cy="${Y(p.y)}" r="${p.r||5}"/>${p.s?`<text class="kt halo" x="${X(p.x)+(p.dx??9)}" y="${Y(p.y)+(p.dy??-9)}" text-anchor="${p.anc||'start'}">${esc(p.s)}</text>`:''}</g>`});
  return s+'</svg>'}

/* ========== figure / widget registries ========== */
const FIG={},WID={},PAGES=[];
const F=(name,cap,t)=>`<figure class="fig"><div class="fig-h"><span class="fn"></span><span>${esc(t||'')}</span></div><div class="fig-b" data-fig="${name}"></div><figcaption class="fig-c">${cap}</figcaption></figure>`;
const F2=(a,b,cap,la,lb,t)=>`<figure class="fig"><div class="fig-h"><span class="fn"></span><span>${esc(t||'')}</span></div><div class="row2"><div class="fig-b"><div class="sub">${la}</div><div data-fig="${a}"></div></div><div class="fig-b"><div class="sub">${lb}</div><div data-fig="${b}"></div></div></div><figcaption class="fig-c">${cap}</figcaption></figure>`;
const W_=name=>`<div class="wid" data-wid="${name}"></div>`;
const box=(k,label,html)=>`<div class="box ${k}"><b>${label}</b>${html}</div>`;
const KEY=h=>box('key','Key idea',h),WARN=h=>box('warn','Common mistake',h),TIP=h=>box('tip','Practitioner tip',h),DEF=(t,h)=>box('def',t,h);
const tbl=(head,rows,nums=[])=>`<div class="tbl"><table><thead><tr>${head.map((h,i)=>`<th class="${nums.includes(i)?'n':''}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td class="${nums.includes(i)?'n':''}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const steps=l=>`<div class="steps">${l.map(s=>`<div class="step"><em>${s[0]}</em><b>${s[1]}</b><p>${s[2]}</p></div>`).join('')}</div>`;

/* ========== state ========== */
let S={done:{},quiz:{},chk:{},exam:null},mem=false;
try{const v=localStorage.getItem('lp-state-v1');if(v)S=Object.assign(S,JSON.parse(v))}catch(e){mem=true}
function save(){try{localStorage.setItem('lp-state-v1',JSON.stringify(S))}catch(e){}}
try{const t=localStorage.getItem('lp-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}

/* ========== quiz ========== */
function quizHTML(id,items,title){
  return `<section class="quiz" data-quiz="${id}"><h3>${title||'Checkpoint quiz'}<span class="qs"></span></h3>${items.map((q,i)=>`<div class="qi" data-i="${i}"><p>${i+1}. ${q.q}</p>${q.o.map((o,j)=>`<button type="button" class="qo" data-j="${j}">${o}</button>`).join('')}<div class="qw"><b>${'Why:'}</b> ${q.w}</div></div>`).join('')}</section>`}
function wireQuiz(root){
  $$('.quiz',root).forEach(qz=>{const id=qz.dataset.quiz,items=(QZ[id]||[]);const upd=()=>{const a=$$('.qi.answered',qz).length,ok=$$('.qo.ok.picked',qz).length;$('.qs',qz).textContent=`${ok} correct · ${a}/${items.length} answered`;
      if(a===items.length){if(id==='exam')S.exam=ok;else S.quiz[id]=ok;save();refreshNav()}};
    qz.addEventListener('click',e=>{const b=e.target.closest('.qo');if(!b)return;const qi=b.closest('.qi');if(qi.classList.contains('answered'))return;
      const q=items[+qi.dataset.i],j=+b.dataset.j;qi.classList.add('answered');$$('.qo',qi).forEach((x,k)=>{x.disabled=true;if(k===q.a)x.classList.add('ok');});
      if(j===q.a)b.classList.add('picked');else b.classList.add('no');upd()});upd()})}
const QZ={};

/* ========== nav / router ========== */
const PARTS={I:'Foundations',II:'Liquidity',III:'Structure & Imbalance',IV:'Timing & Correlation',V:'Putting It Together',T:'Reference'};
function modules(){return PAGES.filter(p=>p.n)}
function refreshNav(){
  const mods=modules(),d=mods.filter(m=>S.done[m.id]).length,pc=Math.round(d/mods.length*100);
  $('#prog').innerHTML=`<svg width="54" height="54" viewBox="0 0 54 54"><circle cx="27" cy="27" r="22" fill="none" stroke="var(--side-line)" stroke-width="5"/><circle cx="27" cy="27" r="22" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-dasharray="${(138.2*pc/100).toFixed(1)} 138.2" transform="rotate(-90 27 27)"/><text x="27" y="31" text-anchor="middle" style="fill:var(--side-ink);font:600 12px var(--f-mono)">${pc}%</text></svg><div><strong>${d} of ${mods.length} modules</strong>${mem?'Progress not saved in this view':'Progress saves in this browser'}</div>`;
  let h='',last='';const cur=location.hash.slice(1)||'welcome';
  PAGES.forEach(p=>{const part=p.part||'';if(part!==last){h+=part?`<div class="nav-part">${PARTS[part]||part}</div>`:'';last=part}
    h+=`<button class="nav-i ${S.done[p.id]?'done':''}" data-go="${p.id}" ${cur===p.id?'aria-current="page"':''}><span class="no">${p.n?(S.done[p.id]?'&#10003;':p.n):'&#9679;'}</span><span>${p.title}</span></button>`});
  $('#nav').innerHTML=h}
function pageHTML(p){
  if(p.raw){const h=p.html,i=h.indexOf('<h2');return i<0?h:h.slice(0,i)+'<div class="body">'+h.slice(i)+'</div>'}
  const i=PAGES.indexOf(p),prev=PAGES[i-1],next=PAGES[i+1];
  return `<header class="hd"><div><div class="eyebrow">Part ${p.part} &middot; Module ${p.n}</div><h1>${p.title}</h1><p class="lead">${p.lead}</p>
  <div class="chips"><span class="chip">${p.min} min read</span><span class="chip">${p.level}</span><span class="chip">${p.src}</span></div></div>
  <div class="goals"><h4>After this module you can</h4><ul>${p.goals.map(g=>`<li>${g}</li>`).join('')}</ul></div></header><div class="body">${p.html}</div>
  <section class="recap"><h3>Module recap</h3><ul>${p.recap.map(r=>`<li>${r}</li>`).join('')}</ul></section>
  ${quizHTML(p.id,QZ[p.id])}
  <div class="pager"><button class="btn alt" data-go="${prev?prev.id:'welcome'}">&larr; ${prev?prev.title:'Start'}</button><button class="btn ${S.done[p.id]?'alt':'liq'}" data-done="${p.id}">${S.done[p.id]?'Completed. Undo':'Mark module complete'}</button>${next?`<button class="btn" data-go="${next.id}">${next.title} &rarr;</button>`:''}</div>
  <p class="disc">Educational material only. It is not financial advice or a signal service. Futures and leveraged products can lose more than you deposit, and most day traders lose money. Practise on a simulator first.</p>`}
function hydrate(root,p){
  let k=0;$$('.fig',root).forEach(f=>{k++;const fn=$('.fn',f);if(fn)fn.textContent='Fig '+(p&&p.n?p.n+'.':'')+k});
  $$('[data-fig]',root).forEach(el=>{try{el.innerHTML=FIG[el.dataset.fig]()}catch(e){el.innerHTML='<p>Chart error: '+esc(e.message)+'</p>';console.error(el.dataset.fig,e)}});
  $$('[data-wid]',root).forEach(el=>{try{WID[el.dataset.wid](el)}catch(e){el.innerHTML='<p>Widget error</p>';console.error(el.dataset.wid,e)}});
  wireQuiz(root)}
function route(){
  const id=location.hash.slice(1)||'welcome',p=PAGES.find(x=>x.id===id)||PAGES[0];
  $('#main').innerHTML=`<div class="page">${pageHTML(p)}</div>`;hydrate($('#main'),p);applyLayout();refreshNav();window.scrollTo(0,0);document.body.classList.remove('menu');
  document.title='Liquidity Playbook'}

/* ===== wide-screen layout: text left, visuals right ===== */
const MQ=matchMedia('(min-width:1700px)');
function flatten(){const body=$('.body');if(!body||!body.dataset.sec)return;const all=[];$$('.sec',body).forEach(sc=>{[...sc.children].forEach(c=>{if(c.classList.contains('tx')||c.classList.contains('vz'))[...c.children].forEach(n=>all.push(n));else all.push(c)})});
  all.sort((a,b)=>a._i-b._i);body.innerHTML='';all.forEach(n=>body.appendChild(n));delete body.dataset.sec}
function sectionize(){const body=$('.body');if(!body||body.dataset.sec)return;const nodes=[...body.children];nodes.forEach((n,i)=>n._i=i);body.innerHTML='';body.dataset.sec='1';
  let sec=null,tx=null,vz=null;const mk=h=>{sec=document.createElement('section');sec.className='sec';if(h)sec.appendChild(h);tx=document.createElement('div');tx.className='tx';vz=document.createElement('div');vz.className='vz';sec.append(tx,vz);body.appendChild(sec)};
  nodes.forEach(n=>{if(n.tagName==='H2')mk(n);else{if(!sec)mk(null);(n.matches('.fig,.wid,.tbl,.steps,.cards')?vz:tx).appendChild(n)}});
  $$('.sec',body).forEach(sc=>{if(!$('.vz',sc).children.length){sc.classList.add('solo');$('.vz',sc).remove()}else if(!$('.tx',sc).children.length){sc.classList.add('vonly');$('.tx',sc).remove()}})}
function applyLayout(){if(MQ.matches)sectionize();else flatten()}
MQ.addEventListener('change',applyLayout);
document.addEventListener('click',e=>{
  const g=e.target.closest('[data-go]');if(g){e.preventDefault();location.hash=g.dataset.go;return}
  const d=e.target.closest('[data-done]');if(d){const id=d.dataset.done;S.done[id]=!S.done[id];save();route();return}
  if(e.target.closest('#burger'))document.body.classList.toggle('menu')});
$('#theme').addEventListener('click',()=>{const r=document.documentElement,cur=r.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),nx=cur==='dark'?'light':'dark';r.dataset.theme=nx;try{localStorage.setItem('lp-theme',nx)}catch(e){}});
addEventListener('hashchange',route);
addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName))return;const i=PAGES.findIndex(x=>x.id===(location.hash.slice(1)||'welcome'));
  if(e.key==='ArrowRight'&&PAGES[i+1])location.hash=PAGES[i+1].id;if(e.key==='ArrowLeft'&&PAGES[i-1])location.hash=PAGES[i-1].id});
</script>
