/* Animated figures. Each exercise: joints as a tree, poses as joint positions, keys as a timed loop.
   Angles are interpolated so limbs keep their length. Key "d" = seconds until the next key. */
(()=>{
  'use strict';
  const k=(p,d,s,c)=>({p,d,s,c});
  const STAND={ankle:[100,104],toe:[116,104],knee:[100,78],hip:[100,52],shoulder:[100,22],head:[100,8],hand:[100,48]};
  const STAND_TREE=[['ankle',null],['toe','ankle'],['knee','ankle'],['hip','knee'],['shoulder','hip'],['head','shoulder'],['hand','shoulder']];
  const STAND_BONES=[['ankle','toe'],['ankle','knee'],['knee','hip'],['hip','shoulder'],['shoulder','hand']];

  const SQUAT={ankle:[96,104],toe:[112,104],knee:[114,86],hip:[88,82],shoulder:[106,57],head:[113,44],hand:[132,57]};
  const DEEP={ankle:[96,104],toe:[112,104],knee:[112,82],hip:[92,94],shoulder:[100,64],head:[104,50],hand:[110,80]};

  const G_F={knee:[132,106],foot:[168,106],hip:[132,58],mid:[96,58],shoulder:[60,58],hand:[60,106],head:[44,50]};
  const G_S={...G_F,hip:[132,56],mid:[96,68],shoulder:[60,56],head:[42,40]};
  const G_R={...G_F,hip:[132,60],mid:[96,42],shoulder:[60,60],head:[46,72]};

  const Z_L={ffoot:[58,106],fknee:[62,72],hip:[100,70],bknee:[150,88],bfoot:[178,106],shoulder:[66,44],head:[52,32],hand:[52,106],up:[56,106]};
  const Z_U={...Z_L,shoulder:[92,40],head:[80,24],up:[104,6]};

  const PU_L={foot:[146,106],knee:[134,68],hip:[106,100],shoulder:[44,100],head:[28,94],arm:[78,102]};
  const PU_H={...PU_L,knee:[138,66],hip:[108,70]};

  const GE_F={toe:[112,104],ankle:[96,104],knee:[96,78],hip:[96,52],shoulder:[96,22],head:[96,8],hand:[138,34]};
  const GE_U={toe:[112,104],ankle:[104,96],knee:[103,71],hip:[102,46],shoulder:[101,16],head:[101,2],hand:[138,34]};

  const TI_D={hip:[64,66],shoulder:[58,32],head:[60,16],heel:[110,104],toe:[128,106]};
  const TI_U={...TI_D,toe:[124,90]};

  const BUG={hip:[112,100],shoulder:[48,100],head:[32,95],nh:[48,64],fh:[53,64],nk:[112,64],nf:[148,64],fk:[117,64],ff:[153,64]};
  const BUG_A={...BUG,nh:[12,100],fk:[148,98],ff:[184,100]};
  const BUG_B={...BUG,fh:[17,100],nk:[148,98],nf:[184,100]};

  const CU={hip:[130,56],shoulder:[56,56],head:[42,42],na:[60,106],fa:[64,106],nk:[130,106],nf:[150,106],fk:[134,106],ff:[154,106]};
  const CU_A={...CU,fa:[18,52],nk:[168,54],nf:[192,52]};
  const CU_B={...CU,na:[18,52],fk:[168,54],ff:[192,52]};

  const LA_L={foot:[176,104],hip:[110,100],shoulder:[55,70],head:[42,60],elbow:[55,104],fore:[30,104],arm:[80,90]};
  const LA_H={...LA_L,hip:[113,87],arm:[55,38]};

  const PI_F={hip:[106,100],shoulder:[44,100],head:[28,94],knee:[142,100],foot:[178,100]};
  const PI_U={...PI_F,knee:[120,62],foot:[134,26]};

  const IN_A={hip:[96,100],shoulder:[44,100],head:[28,94],knee:[122,68],foot:[152,74]};
  const IN_B={hip:[92,94],shoulder:[44,100],head:[28,94],knee:[78,60],foot:[104,52]};

  const PL_L={foot:[168,106],hip:[104,98],shoulder:[54,76],head:[38,66],elbow:[52,104],hand:[78,104]};
  const PL_H={...PL_L,hip:[104,88],shoulder:[52,74]};

  const FL_U={foot:[176,106],hip:[108,84],shoulder:[48,62],head:[32,50],elbow:[50,84],hand:[52,106]};
  const FL_D={foot:[176,106],hip:[110,97],shoulder:[48,88],head:[32,78],elbow:[70,90],hand:[52,106]};

  const YT={hip:[100,76],shoulder:[100,42],head:[100,22],lf:[88,106],rf:[112,106]};
  const Y={...YT,le:[84,26],lh:[66,10],re:[116,26],rh:[134,10]};
  const T={...YT,le:[76,44],lh:[50,44],re:[124,44],rh:[150,44]};
  const W={...YT,le:[70,54],lh:[58,24],re:[130,54],rh:[142,24]};

  const FX_A={ffoot:[52,106],fknee:[56,76],hip:[100,72],bknee:[124,106],bfoot:[170,104],shoulder:[100,34],head:[100,18]};
  const FX_B={...FX_A,hip:[92,74],shoulder:[90,36],head:[90,20]};

  const PC_U={foot:[156,106],hip:[104,24],shoulder:[64,60],head:[66,76],elbow:[51,83],hand:[38,106]};
  const PC_D={foot:[156,106],hip:[108,30],shoulder:[74,72],head:[60,90],elbow:[52,80],hand:[40,106]};

  const TO_L={sfoot:[80,106],hip:[80,72],shoulder:[80,30],head:[80,14],rknee:[118,74],rfoot:[118,96],elbow:[84,62],hand:[108,78]};
  const TO_H={...TO_L,hand:[108,42]};

  const PUSH_TREE=[['foot',null],['hip','foot'],['shoulder','hip'],['head','shoulder'],['elbow','shoulder'],['hand','elbow']];
  const PUSH_BONES=[['foot','hip'],['hip','shoulder'],['shoulder','elbow'],['elbow','hand']];

  const A={
    gato:{tree:[['knee',null],['foot','knee'],['hip','knee'],['mid','hip'],['shoulder','mid'],['hand','shoulder'],['head','shoulder']],bones:[['knee','foot'],['knee','hip'],['hip','mid'],['mid','shoulder'],['shoulder','hand']],spot:['mid','mid'],
      keys:[k(G_F,.5,.2,'A cuatro patas'),k(G_F,2,.2,'Coge aire y deja caer la barriga'),k(G_S,.3,.7,'Mira un poco hacia arriba'),k(G_S,2.5,.7,'Suelta el aire y redondea la espalda'),k(G_R,.3,.7,'Como un gato enfadado'),k(G_R,1,.7,'Vuelve al centro')]},
    zancada:{tree:[['ffoot',null],['fknee','ffoot'],['hip','fknee'],['bknee','hip'],['bfoot','bknee'],['shoulder','hip'],['head','shoulder'],['hand','shoulder'],['up','shoulder']],bones:[['ffoot','fknee'],['fknee','hip'],['hip','bknee'],['bknee','bfoot'],['hip','shoulder'],['shoulder','hand'],['shoulder','up']],spot:['hip','bknee'],
      keys:[k(Z_L,.6,.6,'Paso largo, manos en el suelo'),k(Z_L,2,.6,'Sube un brazo hacia el techo'),k(Z_U,.8,.8,'Mira tu mano'),k(Z_U,1.5,.8,'Bájalo despacio')]},
    cuclillas:{tree:STAND_TREE,bones:STAND_BONES,spot:['hip','knee'],
      keys:[k(STAND,.5,.1,'De pie, pies abiertos'),k(STAND,2.5,.1,'Baja hasta donde puedas'),k(DEEP,4,.75,'Quédate ahí y respira tranquilo'),k(DEEP,1.5,.75,'Sube despacio')]},
    sentadilla:{tree:STAND_TREE,bones:STAND_BONES,spot:['hip','knee'],
      keys:[k(STAND,.6,.15,'De pie'),k(STAND,3,.15,'Baja en 3 segundos'),k(SQUAT,.4,.8,'Abajo, sin rebotar'),k(SQUAT,1,.8,'Sube en 1 segundo, empujando el suelo')]},
    puente:{tree:[['foot',null],['knee','foot'],['hip','knee'],['shoulder','hip'],['head','shoulder'],['arm','shoulder']],bones:[['foot','knee'],['knee','hip'],['hip','shoulder'],['shoulder','arm']],spot:['hip','hip'],
      keys:[k(PU_L,.4,.15,'Boca arriba, pies apoyados'),k(PU_L,1.5,.15,'Empuja con los pies y sube el culo'),k(PU_H,.5,.8,'Línea recta'),k(PU_H,2,.8,'Baja despacio')]},
    gemelo:{props:['M138 -8V106'],tree:[['toe',null],['ankle','toe'],['knee','ankle'],['hip','knee'],['shoulder','hip'],['head','shoulder'],['hand','shoulder']],bones:[['toe','ankle'],['ankle','knee'],['knee','hip'],['hip','shoulder'],['shoulder','hand']],spot:['ankle','knee'],
      keys:[k(GE_F,.3,.15,'Mano en la pared'),k(GE_F,1,.15,'Sube de puntillas'),k(GE_U,.4,.8,'Lo más alto posible'),k(GE_U,2.5,.8,'Baja en 2 o 3 segundos')]},
    tibial:{props:['M46 -8V106'],tree:[['hip',null],['shoulder','hip'],['head','shoulder'],['heel','hip'],['toe','heel']],bones:[['hip','shoulder'],['hip','heel'],['heel','toe']],spot:['heel','hip',.2],
      keys:[k(TI_D,.3,.15,'Espalda en la pared, pies adelantados'),k(TI_D,.8,.15,'Levanta las puntas de los pies'),k(TI_U,.3,.8,'Hacia ti'),k(TI_U,1.2,.8,'Bájalas sin dar un golpe')]},
    bicho:{tree:[['hip',null],['shoulder','hip'],['head','shoulder'],['nh','shoulder'],['fh','shoulder'],['nk','hip'],['nf','nk'],['fk','hip'],['ff','fk']],bones:[['shoulder','fh'],['hip','fk'],['fk','ff'],['hip','shoulder'],['shoulder','nh'],['hip','nk'],['nk','nf']],far:[0,1,2],spot:['hip','shoulder'],
      keys:[k(BUG,.4,.25,'Brazos arriba, rodillas dobladas'),k(BUG,2,.25,'Baja un brazo y la pierna contraria'),k(BUG_A,1.5,.8,'Vuelve sin despegar la espalda'),k(BUG,.4,.25,'Brazos arriba, rodillas dobladas'),k(BUG,2,.25,'Ahora el otro lado'),k(BUG_B,1.5,.8,'Vuelve sin despegar la espalda')]},
    cuatro:{tree:[['hip',null],['shoulder','hip'],['head','shoulder'],['na','shoulder'],['fa','shoulder'],['nk','hip'],['nf','nk'],['fk','hip'],['ff','fk']],bones:[['shoulder','fa'],['hip','fk'],['fk','ff'],['hip','shoulder'],['shoulder','na'],['hip','nk'],['nk','nf']],far:[0,1,2],spot:['hip','shoulder'],
      keys:[k(CU,.4,.25,'A cuatro patas'),k(CU,1.5,.25,'Estira un brazo y la pierna contraria'),k(CU_A,1.5,.8,'Aguanta sin moverte, y vuelve'),k(CU,.4,.25,'A cuatro patas'),k(CU,1.5,.25,'Ahora el otro lado'),k(CU_B,1.5,.8,'Aguanta sin moverte, y vuelve')]},
    lateral:{tree:[['foot',null],['hip','foot'],['shoulder','hip'],['head','shoulder'],['elbow','shoulder'],['fore','elbow'],['arm','shoulder']],bones:[['foot','hip'],['hip','shoulder'],['shoulder','elbow'],['elbow','fore'],['shoulder','arm']],spot:['hip','shoulder'],
      keys:[k(LA_L,.7,.1,'De lado, sobre el antebrazo'),k(LA_L,1.2,.1,'Levanta la cadera'),k(LA_H,3,.8,'Aguanta recto y respira'),k(LA_H,1.2,.8,'Baja despacio')]},
    piernas:{tree:[['hip',null],['shoulder','hip'],['head','shoulder'],['knee','hip'],['foot','knee']],bones:[['hip','shoulder'],['hip','knee'],['knee','foot']],spot:['hip','shoulder',.25],
      keys:[k(PI_F,.3,.2,'Boca arriba, manos bajo el culo'),k(PI_F,1.2,.2,'Sube las piernas al techo'),k(PI_U,.2,.8,'Arriba'),k(PI_U,3,.8,'Baja en 3 segundos, sin dejarlas caer')]},
    inverso:{tree:[['hip',null],['shoulder','hip'],['head','shoulder'],['knee','hip'],['foot','knee']],bones:[['hip','shoulder'],['hip','knee'],['knee','foot']],spot:['hip','shoulder',.25],
      keys:[k(IN_A,.3,.2,'Boca arriba, rodillas en el aire'),k(IN_A,1.2,.2,'Lleva las rodillas al pecho'),k(IN_B,.3,.8,'Despega un poco el culo'),k(IN_B,2,.8,'Baja despacio, sin balancearte')]},
    plancha:{tree:PUSH_TREE,bones:PUSH_BONES,spot:['hip','shoulder'],
      keys:[k(PL_L,.5,.15,'Antebrazos y puntas de los pies'),k(PL_L,1,.15,'Sube la cadera'),k(PL_H,4,.85,'Aprieta barriga y culo: línea recta'),k(PL_H,1,.85,'Descansa')]},
    flexion:{tree:PUSH_TREE,bones:PUSH_BONES,spot:['shoulder','shoulder'],
      keys:[k(FL_U,.3,.2,'Manos bajo los hombros, cuerpo recto'),k(FL_U,2.5,.2,'Baja en 2 o 3 segundos'),k(FL_D,.2,.85,'Casi hasta el suelo'),k(FL_D,1,.85,'Empuja hasta estirar los brazos')]},
    ytw:{floor:false,tree:[['hip',null],['shoulder','hip'],['head','shoulder'],['lf','hip'],['rf','hip'],['le','shoulder'],['lh','le'],['re','shoulder'],['rh','re']],bones:[['hip','shoulder'],['hip','lf'],['hip','rf'],['shoulder','le'],['le','lh'],['shoulder','re'],['re','rh']],spot:['shoulder','shoulder'],
      keys:[k(Y,1.2,.7,'Boca abajo, visto desde arriba: forma una Y'),k(Y,1,.7,'Abre los brazos'),k(T,1.2,.7,'Ahora una T'),k(T,1,.7,'Dobla los codos'),k(W,1.2,.85,'Ahora una W: junta los omóplatos'),k(W,1,.85,'Vuelve a la Y')]},
    flexor:{tree:[['ffoot',null],['fknee','ffoot'],['hip','fknee'],['bknee','hip'],['bfoot','bknee'],['shoulder','hip'],['head','shoulder']],bones:[['ffoot','fknee'],['fknee','hip'],['hip','bknee'],['bknee','bfoot'],['hip','shoulder']],spot:['hip','hip'],
      keys:[k(FX_A,.5,.2,'Una rodilla en el suelo, el otro pie delante'),k(FX_A,2,.2,'Aprieta el culo y avanza un poco'),k(FX_B,3,.8,'Aguanta: estira por delante'),k(FX_B,1.5,.8,'Vuelve despacio')]},
    diamante:{tree:PUSH_TREE,bones:PUSH_BONES,spot:['shoulder','elbow'],
      keys:[k(FL_U,.3,.2,'Manos juntas bajo el pecho'),k(FL_U,2.5,.2,'Baja con los codos pegados al cuerpo'),k(FL_D,.2,.85,'Abajo'),k(FL_D,1,.85,'Empuja hasta estirar los brazos')]},
    pica:{tree:PUSH_TREE,bones:PUSH_BONES,spot:['shoulder','shoulder'],
      keys:[k(PC_U,.4,.2,'Como una V al revés, culo arriba'),k(PC_U,2,.2,'Dobla los codos y acerca la cabeza al suelo'),k(PC_D,.2,.85,'Abajo'),k(PC_D,1,.85,'Empuja para volver arriba')]},
    toalla:{thin:[['hand','rfoot']],tree:[['sfoot',null],['hip','sfoot'],['shoulder','hip'],['head','shoulder'],['rknee','hip'],['rfoot','rknee'],['elbow','shoulder'],['hand','elbow']],bones:[['sfoot','hip'],['hip','shoulder'],['hip','rknee'],['rknee','rfoot'],['shoulder','elbow'],['elbow','hand']],spot:['shoulder','elbow',.6],
      keys:[k(TO_L,.3,.2,'Toalla bajo el pie, con una mano'),k(TO_L,1.5,.2,'Sube la mano mientras la pierna empuja'),k(TO_H,.2,.85,'Codo pegado al cuerpo'),k(TO_H,3,.85,'Baja en 3 segundos, haciendo fuerza')]}
  };

  const ease=(t)=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  const polar=(tree,p)=>{const o={};tree.forEach(([j,par])=>{if(!par){o[j]={x:p[j][0],y:p[j][1]};return;}const dx=p[j][0]-p[par][0],dy=p[j][1]-p[par][1];o[j]={a:Math.atan2(dy,dx),l:Math.hypot(dx,dy)};});return o;};
  const NS='http://www.w3.org/2000/svg';
  const make=(parent,tag,attrs)=>{const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([n,v])=>e.setAttribute(n,v));parent.appendChild(e);return e;};
  const line=(el,a,b)=>{el.setAttribute('x1',a[0]);el.setAttribute('y1',a[1]);el.setAttribute('x2',b[0]);el.setAttribute('y2',b[1]);};
  const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GREEN='#3e735c';

  function mount(el){
    const d=A[el.dataset.anim];
    const stage=el.querySelector('.anim-stage'),cap=el.querySelector('.anim-cap'),btn=el.querySelector('.anim-btn');
    const svg=make(stage,'svg',{viewBox:'0 -12 200 128','aria-hidden':'true'});
    if(d.floor!==false)make(svg,'path',{d:'M8 110H192',stroke:'#c6d6ca','stroke-width':3,'stroke-linecap':'round'});
    (d.props||[]).forEach(p=>make(svg,'path',{d:p,fill:'none',stroke:'#a9c0b0','stroke-width':5,'stroke-linecap':'round'}));
    const start=d.keys[0].p,solved=d.keys.map(x=>polar(d.tree,x.p));
    d.bones.forEach(([a,b])=>line(make(svg,'line',{stroke:GREEN,'stroke-width':8,'stroke-linecap':'round',opacity:.14}),start[a],start[b]));
    make(svg,'circle',{cx:start.head[0],cy:start.head[1],r:11,fill:GREEN,opacity:.14});
    const thin=(d.thin||[]).map(()=>make(svg,'line',{stroke:'#b9794f','stroke-width':3,'stroke-linecap':'round'}));
    const far=d.far||[];
    const bones=d.bones.map((_,i)=>make(svg,'line',{stroke:far.includes(i)?'#8fb3a0':GREEN,'stroke-width':8,'stroke-linecap':'round'}));
    const head=make(svg,'circle',{r:11,fill:GREEN});
    const spot=make(svg,'circle',{r:12,fill:'#e8814a'});
    const total=d.keys.reduce((a,x)=>a+x.d,0);
    const peak=d.keys.reduce((b,x,i)=>x.s>d.keys[b].s?i:b,0);
    const draw=(sec)=>{
      let t=((sec%total)+total)%total,i=0;
      while(i<d.keys.length-1&&t>=d.keys[i].d){t-=d.keys[i].d;i++;}
      const n=(i+1)%d.keys.length,f=ease(Math.min(1,t/d.keys[i].d)),P=solved[i],Q=solved[n],pos={};
      d.tree.forEach(([j,par])=>{
        if(!par){pos[j]=[P[j].x+(Q[j].x-P[j].x)*f,P[j].y+(Q[j].y-P[j].y)*f];return;}
        let da=Q[j].a-P[j].a;if(da>Math.PI)da-=2*Math.PI;if(da<-Math.PI)da+=2*Math.PI;
        const a=P[j].a+da*f,l=P[j].l+(Q[j].l-P[j].l)*f;
        pos[j]=[pos[par][0]+Math.cos(a)*l,pos[par][1]+Math.sin(a)*l];
      });
      d.bones.forEach(([x,y],b)=>line(bones[b],pos[x],pos[y]));
      (d.thin||[]).forEach(([x,y],b)=>line(thin[b],pos[x],pos[y]));
      head.setAttribute('cx',pos.head[0]);head.setAttribute('cy',pos.head[1]);
      const w=d.spot[2]===undefined?.5:d.spot[2],s0=pos[d.spot[0]],s1=pos[d.spot[1]];
      spot.setAttribute('cx',s0[0]+(s1[0]-s0[0])*w);spot.setAttribute('cy',s0[1]+(s1[1]-s0[1])*w);
      spot.setAttribute('opacity',d.keys[i].s+(d.keys[n].s-d.keys[i].s)*f);
      if(cap&&cap.textContent!==d.keys[i].c)cap.textContent=d.keys[i].c;
    };
    const inst={draw,sec:0,paused:false,total};
    /* With reduced motion, show the pose where the effort happens and wait for a tap. */
    if(reduced()){inst.paused=true;inst.sec=d.keys.slice(0,peak).reduce((a,x)=>a+x.d,0);}
    if(btn){
      btn.textContent=inst.paused?'Reproducir':'Pausa';
      btn.addEventListener('click',()=>{inst.paused=!inst.paused;btn.textContent=inst.paused?'Reproducir':'Pausa';});
    }
    draw(inst.sec);
    return inst;
  }

  window.animHtml=(id,bare)=>A[id]?`<div class="anim" data-anim="${id}"><div class="anim-stage"></div>${bare?'':'<div class="anim-foot"><p class="anim-cap"></p><button type="button" class="ghost-btn anim-btn"></button></div>'}</div>`:'';

  const live=new WeakMap();
  let last=performance.now();
  (function loop(now){
    const dt=Math.min(.1,(now-last)/1000);last=now;
    document.querySelectorAll('[data-anim]').forEach(el=>{
      let inst=live.get(el);
      if(!inst){inst=mount(el);live.set(el,inst);}
      if(el.dataset.animAt!==undefined){inst.draw(+el.dataset.animAt);return;}
      if(!inst.paused&&!el.closest('.is-paused')){inst.sec+=dt;inst.draw(inst.sec);}
    });
    requestAnimationFrame(loop);
  })(last);
})();
