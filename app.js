/* Shared shell for both programmes: navigation, today, plan, library, care, progress. */
(()=>{
  'use strict';
  const icons={
    home:'<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21v-8h6v8"/>',
    plan:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 15h3"/>',
    library:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/>',
    care:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.2 8.2a1 1 0 0 0 1.4 0l8.1-8.2a5.5 5.5 0 0 0 0-7.8Z"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    arrow:'<path d="M5 12h14m-7-7 7 7-7 7"/>'
  };
  const LABELS={home:'Hoy',plan:'Mi plan',library:'Ejercicios',care:'Cuidados'};
  const svgIcon=(k)=>`<svg class="icon" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">${icons[k]||icons.info}</svg>`;
  const esc=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dayISO=(d)=>{const x=new Date(d);return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;};

  /* One exercise sheet for both programmes. Any field may be missing. */
  function sheet(x){
    const frames=x.frames||[];
    const steps=frames.length
      ?`<div class="steps">${x.steps.map((t,n)=>`<div class="step ${frames[n]?'':'plain'}">${frames[n]?`<div class="step-img">${frames[n]}</div>`:''}<div class="step-txt"><b>${n+1}</b><span>${esc(t)}</span></div></div>`).join('')}</div>`
      :`<div class="steps">${x.steps.map((t,n)=>`<div class="step plain"><div class="step-txt"><b>${n+1}</b><span>${esc(t)}</span></div></div>`).join('')}</div>`;
    return `${x.lead?`<p class="sheet-lead">${esc(x.lead)}</p>`:''}${x.art?`<div class="big">${x.art}</div>`:''}${x.feel?`<div class="feel"><i></i><span><b>Lo notarás en:</b> ${esc(x.feel)}</span></div>`:''}${steps}${x.ok?`<div class="tips"><div class="tip"><strong>Lo haces bien si…</strong>${esc(x.ok)}</div><div class="tip"><strong>Si cuesta demasiado</strong>${esc(x.easy)}</div></div>`:''}${x.note?`<div class="disclaimer"><strong>Importante:</strong> ${esc(x.note)}</div>`:''}`;
  }

  window.startProgram=function(cfg){
    const read=()=>{try{const r=JSON.parse(localStorage.getItem(cfg.key));return r&&typeof r==='object'?r:{};}catch{return {};}};
    const st=read();
    st.checked=st.checked&&typeof st.checked==='object'?st.checked:{};
    const ui={page:'home',chip:null,filter:null,open:new Set()};
    const save=()=>{try{localStorage.setItem(cfg.key,JSON.stringify(st));}catch{}};
    const today=()=>dayISO(new Date());
    const doneToday=()=>st.checked[today()]||[];

    function row(it,scope,checkable){
      const ex=it.id?cfg.exercise(it.id):null,k=`${scope}:${it.key}`,opened=ui.open.has(k),done=checkable&&doneToday().includes(it.key);
      const body=`<span class="ex-main"><span class="ex-name">${esc(it.name||ex.name)}</span><span class="ex-dose">${esc(it.dose||'')}</span></span>`;
      return `<article class="ex ${done?'done':''} ${opened?'expanded':''}"><div class="ex-top">${checkable?`<button class="check" data-check="${esc(it.key)}" aria-pressed="${!!done}" aria-label="${done?'Desmarcar':'Marcar'} ${esc(it.name||ex.name)}">${svgIcon('check')}</button>`:''}${ex
        ?`<button class="open" data-open="${esc(k)}" aria-expanded="${opened}"><span class="thumb">${ex.thumb}</span>${body}<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></button>`
        :`<div class="open static">${body}</div>`}</div>${ex?`<div class="detail">${opened?sheet(ex.sheet):''}</div>`:''}</article>`;
    }
    const group=(g,scope,checkable)=>`<section class="group">${g.title?`<div class="group-hdr"><h3>${esc(g.title)}</h3><span>${esc(g.meta||'')}</span></div>`:''}${g.items.map(it=>row(it,scope,checkable)).join('')}</section>`;
    const mark=(k)=>{const s=new Set(doneToday());s.add(k);st.checked[today()]=[...s];save();render();};
    const ctx={st,esc,svgIcon,group,today,ui,mark,save};

    const shell=(main)=>`<aside class="sidebar"><div class="logo-wrap"><div class="logo">${esc(cfg.brand[0])}<span>${esc(cfg.brand[1])}</span></div><div class="brand-tag">${esc(cfg.tag)}</div></div><nav class="nav" aria-label="Navegación principal">${Object.entries(LABELS).map(([k,v])=>`<button class="nav-btn ${ui.page===k?'active':''}" data-page="${k}">${svgIcon(k)} ${v}</button>`).join('')}</nav><div class="side-note"><strong>${esc(cfg.note[0])}</strong> ${esc(cfg.note[1])}</div><div class="side-bottom">Tus datos no salen de este dispositivo.</div></aside><main class="main"><div class="topbar"><div class="eyebrow">${esc(cfg.eyebrow)}</div><div class="date-widget">${svgIcon('calendar')} <span>${esc(new Date().toLocaleDateString('es-ES',{day:'numeric',month:'short',year:'numeric'}))}</span></div></div>${main}</main><nav class="bottomnav" aria-label="Navegación móvil">${Object.entries(LABELS).map(([k,v])=>`<button class="${ui.page===k?'active':''}" data-page="${k}" ${ui.page===k?'aria-current="page"':''}>${svgIcon(k)}<span>${v}</span></button>`).join('')}</nav>`;

    function home(){
      const t=cfg.today(ctx),ids=t.groups.flatMap(g=>g.items.map(i=>i.key)),done=ids.filter(i=>doneToday().includes(i)).length,pct=ids.length?Math.round(done/ids.length*100):0;
      const stats=t.stats(done,ids.length);
      return `<section class="hero"><div class="hero-content"><div class="pill"><i class="dot"></i> ${esc(t.pill)}</div><h1>${t.title}</h1><p>${esc(t.lead)}</p>${t.start?`<button class="btn start" data-session>${esc(t.start)}</button>`:''}</div><div class="hero-art">${t.art}</div></section>
      <div class="mini-grid">${stats.map(s=>`<div class="card stat"><div class="value">${s.v}${s.of!==undefined?`<span class="of">/${s.of}</span>`:''}</div><div class="label">${esc(s.l)}</div></div>`).join('')}</div>
      <div class="section-title"><h2>${esc(t.heading)}</h2><span>${esc(t.sub)}</span></div>
      <div class="card today-card"><div class="card-hdr"><div><h3>${esc(t.cardTitle)}</h3><p>${esc(t.cardLead)}</p></div><div class="progress-ring" style="--p:${pct}"><span>${pct}%</span></div></div>${t.bar||''}</div>
      ${t.groups.map(g=>group(g,'home',true)).join('')}${t.after||''}`;
    }
    function plan(){
      const p=cfg.plan(ctx),sel=ui.chip||p.current;
      return `<div class="eyebrow">${esc(p.eyebrow)}</div><h1 class="page-h">${p.title}</h1><p class="lead">${esc(p.lead)}</p><div class="section-title"><h2>${esc(p.heading)}</h2><span>${sel===p.current?'Estás aquí':'Vista previa'}</span></div><div class="week-strip ${p.fit?'fit':''}">${p.chips.map(c=>`<button class="week-chip ${sel===c.id?'selected':''} ${p.current===c.id?'current':''}" data-chip="${c.id}" aria-pressed="${sel===c.id}"><strong>${esc(c.n)}</strong><span>${esc(p.current===c.id?(p.currentLabel||'Hoy'):c.l)}</span></button>`).join('')}</div>${p.detail(sel)}`;
    }
    function library(){
      const f=ui.filter||cfg.library(ctx).filters[0].id,l=cfg.library(ctx,f);
      return `<div class="eyebrow">${esc(l.eyebrow)}</div><h1 class="page-h">${l.title}</h1><p class="lead">${esc(l.lead)}</p><div class="filters">${l.filters.map(x=>`<button class="filter ${f===x.id?'active':''}" data-filter="${x.id}">${esc(x.label)}</button>`).join('')}</div>${group({items:l.items},'lib',false)}`;
    }
    function care(){
      const c=cfg.care(ctx),s=cfg.setup;
      return `${c.top}<div class="section-title"><h2>Tu configuración</h2></div><div class="card pad">${s?`<p class="tiny">${esc(s.help)}</p><div class="field"><label for="setup">${esc(s.label)}</label><input id="setup" type="date" value="${esc(st[s.field]||'')}" max="${today()}"></div>`:''}<p class="tiny" style="margin-top:14px">Tu progreso se guarda únicamente en este navegador. En otro móvil empezarás de cero, salvo que descargues una copia y la importes allí. No hay cuentas ni servidores.</p><div class="actions" style="margin-top:17px"><button class="btn secondary" data-export>Descargar progreso</button><button class="btn secondary" data-import>Importar progreso</button><button class="btn danger" data-reset>Borrar mis datos</button></div><input type="file" id="import-file" accept="application/json,.json" class="sr-only"></div>${c.bottom||''}`;
    }
    function welcome(){
      const s=cfg.setup;
      return `<main class="welcome"><div class="logo">${esc(cfg.brand[0])}<span>${esc(cfg.brand[1])}</span></div><div class="card pad"><h2>${esc(s.title)}</h2><p class="tiny">${esc(s.lead)}</p><div class="field"><label for="first">${esc(s.label)}</label><input id="first" type="date" value="${esc(st[s.field]||'')}" max="${today()}"></div><div class="actions" style="margin-top:17px"><button class="btn" data-start>Empezar</button></div><p class="tiny" style="margin-top:14px">Se guarda solo en este navegador. Podrás cambiarla en Cuidados.</p></div></main>`;
    }
    const root=document.getElementById('app');
    function render(){
      const needsSetup=cfg.setup&&!st.setupDone;
      root.className=needsSetup?'':'app';
      root.innerHTML=needsSetup?welcome():shell({home,plan,library,care}[ui.page]());
    }
    ctx.render=render;

    root.addEventListener('click',e=>{
      const b=e.target.closest('button');if(!b)return;const d=b.dataset;
      if(d.session!==undefined){cfg.session(ctx);}
      else if(d.page){ui.page=d.page;render();window.scrollTo(0,0);}
      else if(d.check!==undefined){const a=new Set(doneToday());a.has(d.check)?a.delete(d.check):a.add(d.check);st.checked[today()]=[...a];save();render();}
      else if(d.open!==undefined){ui.open.has(d.open)?ui.open.delete(d.open):ui.open.add(d.open);render();}
      else if(d.chip!==undefined){ui.chip=d.chip;render();}
      else if(d.filter){ui.filter=d.filter;render();}
      else if(d.start!==undefined){const v=document.getElementById('first').value;if(!v||v>today()){alert('Elige una fecha válida.');return;}st[cfg.setup.field]=v;st.setupDone=true;save();render();window.scrollTo(0,0);}
      else if(d.export!==undefined){const u=URL.createObjectURL(new Blob([JSON.stringify(st,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=u;a.download=cfg.file;a.click();setTimeout(()=>URL.revokeObjectURL(u),500);}
      else if(d.import!==undefined){document.getElementById('import-file').click();}
      else if(d.reset!==undefined){if(confirm('¿Borrar todo lo guardado en este navegador?')){try{localStorage.removeItem(cfg.key);}catch{}Object.keys(st).forEach(k=>delete st[k]);st.checked={};ui.page='home';ui.chip=null;render();}}
    });
    root.addEventListener('change',async e=>{
      if(e.target.id==='setup'){const v=e.target.value;if(!v||v>today()){alert('Elige una fecha válida.');e.target.value=st[cfg.setup.field];return;}st[cfg.setup.field]=v;ui.chip=null;save();render();}
      if(e.target.id==='import-file'&&e.target.files.length){try{const o=JSON.parse(await e.target.files[0].text());if(!o.checked||typeof o.checked!=='object'||Array.isArray(o.checked)||!Object.values(o.checked).every(v=>Array.isArray(v)&&v.every(x=>typeof x==='string'&&x.length<50)))throw Error('formato');if(cfg.setup&&!/^\d{4}-\d{2}-\d{2}$/.test(o[cfg.setup.field]||''))throw Error('fecha');if(!confirm('¿Importar esta copia? Reemplazará lo guardado en este navegador.'))return;Object.assign(st,o);save();render();}catch{alert('No se pudo importar el archivo. Comprueba que sea una copia válida.');}}
    });
    let seen=today();document.addEventListener('visibilitychange',()=>{if(!document.hidden&&seen!==today()){seen=today();render();}});
    render();
  };
})();
