/* Guided session: walks through timed exercises, with a soft beep and a real-clock countdown. */
(()=>{
  'use strict';
  const PREP=5;
  const clock=(s)=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
  const esc=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  window.startPlayer=function(o){
    const seq=o.sequence,total=seq.reduce((a,x)=>a+x.secs,0);
    let i=0,t0=Date.now(),pausedAt=null,phase='',timer=null,wake=null,ac=null,muted=!!o.muted,finished=false;
    const el=document.createElement('div');
    el.className='player';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',o.title);el.dataset.total=total;el.dataset.slots=seq.length;
    document.body.appendChild(el);document.body.style.overflow='hidden';

    try{const AC=window.AudioContext||window.webkitAudioContext;if(AC){ac=new AC();ac.resume();}}catch{}
    function tone(freq,at,dur){
      if(!ac||muted)return;
      try{
        const t=ac.currentTime+at,osc=ac.createOscillator(),gain=ac.createGain();
        osc.type='sine';osc.frequency.value=freq;
        gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.12,t+.02);gain.gain.exponentialRampToValueAtTime(.001,t+dur);
        osc.connect(gain).connect(ac.destination);osc.start(t);osc.stop(t+dur+.02);
      }catch{}
    }
    const beep={go:()=>tone(660,0,.18),side:()=>{tone(660,0,.14);tone(660,.2,.14);},end:()=>tone(880,0,.35),done:()=>{tone(660,0,.25);tone(784,.22,.25);tone(988,.44,.45);}};

    async function keepAwake(){try{if(navigator.wakeLock&&!wake&&!document.hidden&&!pausedAt&&!finished){wake=await navigator.wakeLock.request('screen');wake.addEventListener('release',()=>{wake=null;});}}catch{}}
    const letSleep=()=>{try{wake&&wake.release();}catch{}wake=null;};

    const elapsed=()=>(pausedAt||Date.now())-t0;
    function close(){clearInterval(timer);letSleep();ac&&ac.close&&ac.close().catch(()=>{});document.removeEventListener('visibilitychange',onVisible);el.remove();document.body.style.overflow='';o.onClose&&o.onClose();}
    function onVisible(){if(!document.hidden){if(ac)ac.resume();keepAwake();tick();}}
    document.addEventListener('visibilitychange',onVisible);

    function draw(){
      if(finished){el.innerHTML=`<div class="pl-inner pl-end"><div class="eyebrow">${esc(o.title)}</div><h1>Sesión hecha.</h1><p class="lead">${clock(total)} minutos para ti. Mañana, otro poco.</p><div class="actions"><button class="btn" data-pl="close">Cerrar</button></div></div>`;return;}
      const x=seq[i],next=seq[i+1];
      el.innerHTML=`<div class="pl-inner">
        <div class="pl-top"><span>${i+1} de ${seq.length} · ${esc(x.block)}${x.rounds>1?` · vuelta ${x.round} de ${x.rounds}`:''}</span><button class="pl-link" data-pl="close">Salir</button></div>
        <div class="pl-track"><i id="pl-bar"></i></div>
        <div class="pl-art">${x.art}</div>
        <h2>${esc(x.name)}</h2>
        <p class="pl-hint">${esc(x.hint||'')}</p>
        <div class="pl-status" id="pl-status" aria-live="polite"></div>
        <div class="pl-clock" id="pl-clock" role="timer"></div>
        <div class="pl-controls"><button class="btn secondary" data-pl="back" ${i?'':'disabled'} aria-label="Ejercicio anterior">Atrás</button><button class="btn" data-pl="pause" id="pl-pause"></button><button class="btn secondary" data-pl="skip" aria-label="Saltar ejercicio">Saltar</button></div>
        <details class="pl-how"><summary>Cómo se hace</summary><ol>${x.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></details>
        <div class="pl-foot"><span>${next?`Después: ${esc(next.name)}`:'Último ejercicio'}</span><span id="pl-total"></span><button class="pl-link" data-pl="mute" aria-pressed="${muted}">${muted?'Sonido: no':'Sonido: sí'}</button></div>
      </div>`;
      phase='';update();
    }
    function update(){
      if(finished)return;
      const x=seq[i],s=elapsed()/1000,work=x.secs-PREP,mid=PREP+work/2;
      const now=s<PREP?'prep':(x.half&&s>=mid?'b':'a');
      if(now!==phase){
        if(phase==='prep'&&now!=='prep')beep.go();
        if(phase==='a'&&now==='b')beep.side();
        phase=now;
      }
      const left=Math.max(0,Math.ceil(now==='prep'?PREP-s:(x.half&&now==='a'?mid-s:x.secs-s)));
      const rest=seq.slice(i+1).reduce((a,y)=>a+y.secs,0)+Math.max(0,x.secs-s);
      const q=(id)=>el.querySelector(id);
      q('#pl-clock').textContent=clock(left);
      const status=pausedAt?'En pausa':now==='prep'?'Prepárate':now==='b'?x.halfLabel:x.half?'Primer lado':'Vamos';
      if(q('#pl-status').textContent!==status)q('#pl-status').textContent=status;
      q('#pl-status').className=`pl-status ${now==='prep'&&!pausedAt?'soft':''}`;
      q('#pl-pause').textContent=pausedAt?'Seguir':'Pausa';
      q('#pl-total').textContent=`Quedan ${clock(Math.ceil(rest))}`;
      q('#pl-bar').style.width=`${(1-rest/total)*100}%`;
    }
    function tick(){
      if(pausedAt||finished)return;
      let changed=false;
      while(elapsed()>=seq[i].secs*1000){
        const x=seq[i],late=elapsed()>(x.secs*1000+1500);
        if(x.round===x.rounds)o.onDone(x.key);
        t0+=x.secs*1000;changed=true;
        if(i===seq.length-1){finished=true;letSleep();clearInterval(timer);if(!late)beep.done();break;}
        i++;if(!late)beep.end();
      }
      if(changed)draw();else update();
    }
    function go(n){i=n;t0=Date.now();if(pausedAt)pausedAt=Date.now();draw();}
    el.addEventListener('click',e=>{
      const b=e.target.closest('[data-pl]');if(!b)return;const a=b.dataset.pl;
      if(a==='close')close();
      else if(a==='pause'){if(pausedAt){t0+=Date.now()-pausedAt;pausedAt=null;if(ac)ac.resume();keepAwake();}else{pausedAt=Date.now();letSleep();}update();}
      else if(a==='skip'){if(i===seq.length-1){finished=true;letSleep();clearInterval(timer);draw();}else go(i+1);}
      else if(a==='back'&&i>0)go(i-1);
      else if(a==='mute'){muted=!muted;o.onMute&&o.onMute(muted);b.textContent=muted?'Sonido: no':'Sonido: sí';b.setAttribute('aria-pressed',muted);}
    });
    draw();keepAwake();timer=setInterval(tick,250);
  };
})();
