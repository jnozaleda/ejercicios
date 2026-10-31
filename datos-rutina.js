(()=>{
  'use strict';
  /* Figures: head [x,y], limbs as SVG paths, spots = where you should feel it. Floor at y=106. */
  const P={
    gato:{h:[42,50],l:['M58 58Q95 36 132 58','M60 60V106','M132 58V106H168'],s:[[95,46]]},
    zancada:{h:[88,20],l:['M92 36L100 70','M92 42L60 106','M92 42L132 26','M100 70L62 72L58 106','M100 70L150 88L178 106'],s:[[118,78]]},
    cuclillas:{h:[82,34],l:['M88 50L108 88','M88 56L72 76','M108 88L70 76L76 106H92'],s:[[106,90]]},
    sentadilla:{h:[84,22],l:['M88 36L112 72','M88 44L52 52','M112 72L72 74L78 106'],s:[[106,76],[90,74]]},
    puente:{h:[28,92],l:['M44 98L108 66','M44 98H78','M108 66L140 64L142 106','M108 66L160 42'],s:[[106,72]]},
    gemelo:{h:[94,14],l:['M96 30V68','M96 38L138 50','M96 68L98 92L112 106','M96 68L84 84L70 80','M138 8V106'],s:[[97,84]]},
    tibial:{h:[60,16],l:['M46 8V106','M58 32L64 66','M64 66L108 100L126 88'],s:[[92,84]]},
    bicho:{h:[30,88],l:['M46 96H110','M52 94L52 56','M52 94L24 64','M110 96L132 62L164 62','M110 96L168 94'],s:[[80,88]]},
    cuatro:{h:[42,36],l:['M56 54H130','M60 56V106','M60 54L18 52','M130 56V106H150','M130 54L180 52'],s:[[94,48]]},
    lateral:{h:[34,48],l:['M46 60L150 100','M50 62V106','M50 62V24'],s:[[92,72]]},
    piernas:{h:[28,92],l:['M44 98H106','M58 98H92','M106 98L150 54'],s:[[86,90]]},
    inverso:{h:[28,92],l:['M44 98H98','M54 98H90','M98 98Q112 80 118 62L150 68'],s:[[84,86]]},
    plancha:{h:[36,62],l:['M50 72L142 96','M52 74V90','M52 90H78','M142 96L168 106'],s:[[94,78]]},
    flexion:{h:[32,46],l:['M46 58L150 92','M52 60V106','M150 92L176 106'],s:[[58,62]]},
    ytw:{h:[50,94],l:['M68 94H150','M150 94L184 100','M68 90L24 60'],s:[[80,84]]},
    flexor:{h:[100,18],l:['M100 34V72','M100 72L56 76L52 106','M100 72L124 106L170 104'],s:[[100,76]]},
    diamante:{h:[32,46],l:['M46 60L150 92','M54 62L82 86L66 106','M150 92L176 106'],s:[[72,76]]},
    pica:{h:[66,76],l:['M64 60L104 24','M64 60L38 106','M104 24L156 106'],s:[[62,56]]},
    toalla:{h:[80,14],l:['M80 30V72','M80 72V106','M80 72L118 74V94','M80 36L84 62L114 48'],t:'M114 48Q124 72 118 96',s:[[84,48]]}
  };
  const stand={h:[100,14],l:['M100 30V70','M100 36V64','M100 70V106H114']};
  const wall='M46 8V106',wallR='M138 8V106';
  Object.assign(P,{
    lateral:{h:[34,48],l:['M46 60L176 104','M50 62V104H74','M50 62V26'],s:[[104,80]]},
    gato1:{h:[42,50],l:['M58 58H132','M60 58V106','M132 58V106H168']},
    gato2:{h:[42,38],l:['M58 52Q95 76 132 52','M60 54V106','M132 54V106H168'],a:['M95 74V92'],s:[[95,64]]},
    gato3:{...P.gato,h:[42,64],a:['M95 28V12']},
    zancada1:{h:[52,32],l:['M66 44L110 70','M66 44L48 106','M110 70L70 74L66 106','M110 70L150 90L180 106'],s:[[126,80]]},
    zancada2:{h:[80,24],l:['M92 38L100 70','M92 42L60 106','M92 42L104 8','M100 70L62 72L58 106','M100 70L150 88L178 106'],a:['M124 34L116 14'],s:[[118,78]]},
    cuclillas1:{...stand},
    cuclillas2:{...P.cuclillas,a:['M132 40V64']},
    sentadilla1:{...stand},
    sentadilla2:{...P.sentadilla,a:['M134 34V58']},
    sentadilla3:{...stand,a:['M134 72V40']},
    puente1:{h:[28,92],l:['M44 98H108','M108 98L134 68L146 106']},
    puente2:{h:[28,92],l:['M44 98H108','M108 98L134 68L146 106','M108 98L150 44']},
    puente3:{...P.puente,a:['M88 54V38']},
    gemelo1:{h:[94,14],l:['M96 30V68','M96 38L138 50','M96 68V104H110','M96 68L84 84L70 80',wallR]},
    gemelo2:{...P.gemelo,a:['M66 50V30']},
    tibial1:{h:[60,16],l:[wall,'M58 32L64 66','M64 66L108 100L130 104']},
    tibial2:{...P.tibial,a:['M150 100V78']},
    bicho1:{h:[30,88],l:['M46 96H110','M52 94V56','M110 96L132 62L164 62']},
    bicho2:{...P.bicho,a:['M24 50L14 66','M184 72L184 88']},
    cuatro1:{h:[42,42],l:['M56 56H130','M60 56V106','M130 56V106H150']},
    cuatro2:{...P.cuatro,a:['M26 32H8','M168 36H188']},
    lateral1:{h:[34,84],l:['M48 94H176','M50 92V104H74']},
    lateral2:{...P.lateral,a:['M122 66V46']},
    piernas1:{h:[28,92],l:['M44 98H178']},
    piernas2:{h:[28,92],l:['M44 98H106','M106 98L132 40'],a:['M160 76L148 44'],s:[[86,90]]},
    piernas3:{h:[28,92],l:['M44 98H106','M106 98L164 72'],a:['M176 54L184 80']},
    inverso1:{h:[28,92],l:['M44 98H96','M96 98L122 66L152 72']},
    inverso2:{h:[28,92],l:['M44 98H88','M88 98L98 84','M98 84L76 58L104 50'],a:['M136 74L114 58'],s:[[76,90]]},
    flexion1:{...P.flexion,s:[]},
    flexion2:{h:[28,72],l:['M44 84L150 98','M54 86L78 76L62 106','M150 98L176 106'],a:['M100 54V74'],s:[[58,82]]},
    flexion3:{...P.flexion,a:['M100 72V50']},
    ytw1:{nf:1,h:[100,20],l:['M100 36V76','M100 76L88 108','M100 76L112 108','M100 42L66 12','M100 42L134 12'],s:[[100,50]]},
    ytw2:{nf:1,h:[100,20],l:['M100 36V76','M100 76L88 108','M100 76L112 108','M100 44H50','M100 44H150'],s:[[100,50]]},
    ytw3:{nf:1,h:[100,20],l:['M100 36V76','M100 76L88 108','M100 76L112 108','M100 46L68 54L56 22','M100 46L132 54L144 22'],s:[[100,50]]},
    flexor1:{h:[100,18],l:['M100 34V72','M100 72L56 76L52 106','M100 72L124 106L170 104']},
    flexor2:{h:[88,18],l:['M90 34L94 72','M94 72L56 76L52 106','M94 72L124 106L170 104'],a:['M72 40H50'],s:[[98,78]]},
    manos:{nf:1,h:null,l:['M24 70L100 28','M24 70L100 96','M176 70L100 28','M176 70L100 96']},
    diamante2:{...P.diamante,a:['M112 46V68']},
    diamante3:{...flexionUp(),a:['M100 72V50'],s:[[72,62]]},
    pica1:{...P.pica},
    pica2:{h:[62,88],l:['M74 68L104 24','M74 68L50 76L42 106','M104 24L156 106'],a:['M44 54L58 72'],s:[[72,62]]},
    pica3:{...P.pica,a:['M46 66L34 46']},
    toalla1:{h:[80,14],l:['M80 30V72','M80 72V106','M80 72L118 74V94','M80 36L84 62L108 76'],t:'M108 76Q120 84 118 96',s:[]},
    toalla2:{...P.toalla,a:['M136 72L132 40']}
  });
  function flexionUp(){return {h:P.flexion.h,l:P.flexion.l};}
  /* Images per step, in the same order as the steps. null = the step needs no drawing. */
  const F={gato:['gato1','gato2','gato3'],zancada:['zancada1','zancada2',null],cuclillas:['cuclillas1','cuclillas2',null],sentadilla:['sentadilla1','sentadilla2','sentadilla3'],puente:['puente1','puente2','puente3'],gemelo:['gemelo1','gemelo2',null],tibial:['tibial1','tibial2',null],bicho:['bicho1','bicho2',null],cuatro:['cuatro1','cuatro2',null],lateral:['lateral1','lateral2',null],piernas:['piernas1','piernas2','piernas3'],inverso:['inverso1','inverso2',null],plancha:['plancha',null,null],flexion:['flexion1','flexion2','flexion3'],ytw:['ytw1','ytw2','ytw3'],flexor:['flexor1','flexor2',null],diamante:['manos','diamante2','diamante3'],pica:['pica1','pica2','pica3'],toalla:['toalla1','toalla2',null]};
  function figure(id){
    const p=P[id];
    const spots=(p.s||[]).map(([x,y])=>`<circle cx="${x}" cy="${y}" r="14" fill="#e8814a" opacity=".6"/>`).join('');
    const limbs=p.l.map(d=>`<path d="${d}" fill="none" stroke="#3e735c" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
    const arrows=(p.a||[]).map(d=>`<path d="${d}" fill="none" stroke="#b9531f" stroke-width="3.5" stroke-linecap="round" marker-end="url(#tip)"/>`).join('');
    const head=p.h?`<circle cx="${p.h[0]}" cy="${p.h[1]}" r="12" fill="#3e735c"/>`:'';
    const floor=p.nf?'':'<path d="M8 110H192" stroke="#c6d6ca" stroke-width="3" stroke-linecap="round"/>';
    return `<svg viewBox="0 0 200 118" aria-hidden="true"><defs><marker id="tip" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="3.4" markerHeight="3.4" orient="auto"><path d="M1 1L8 5L1 9" fill="none" stroke="#b9531f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>${floor}${limbs}${p.t?`<path d="${p.t}" fill="none" stroke="#b9794f" stroke-width="3" stroke-linecap="round"/>`:''}${head}${spots}${arrows}</svg>`;
  }

  /* No anatomy: names say what you do, "feel" points at a place you can touch. */
  const E={
    gato:{name:'Arquear y redondear la espalda',feel:'Toda la espalda, como si se soltara.',steps:['Ponte a cuatro patas.','Coge aire y deja caer la barriga mirando un poco hacia arriba.','Suelta el aire y redondea la espalda como un gato enfadado.'],ok:'Se mueve despacio, sin tirones.',easy:'Haz el movimiento más pequeño.'},
    zancada:{name:'Paso largo y giro',feel:'La parte delantera de la cadera de la pierna de atrás.',steps:['Da un paso largo y apoya las manos en el suelo.','Sube un brazo hacia el techo y mira tu mano.','Bájalo y cambia de lado cada 30 segundos.'],ok:'Notas que estira, pero no duele.',easy:'Apoya la rodilla de atrás en el suelo.'},
    cuclillas:{name:'Quedarte en cuclillas',feel:'Caderas y tobillos.',steps:['Pies algo más abiertos que los hombros.','Baja hasta donde puedas y quédate ahí.','Respira tranquilo y empuja las rodillas hacia fuera con los codos.'],ok:'Los talones siguen en el suelo.',easy:'Agárrate al marco de una puerta.'},
    sentadilla:{name:'Sentarte en una silla invisible',feel:'Parte delantera de los muslos y culo.',steps:['Pies a la anchura de los hombros.','Baja en 3 segundos, como si fueras a sentarte.','Sube empujando el suelo con todo el pie.'],ok:'Las rodillas apuntan hacia los dedos de los pies.',easy:'Siéntate de verdad en una silla y levántate.'},
    puente:{name:'Subir el culo desde el suelo',feel:'El culo. Si lo notas en la espalda, sube menos.',steps:['Túmbate boca arriba con las rodillas dobladas.','Estira una pierna hacia arriba.','Empuja con el otro pie y sube el culo hasta formar una línea recta.'],ok:'La cadera sube recta, sin torcerse.',easy:'Hazlo con los dos pies en el suelo.'},
    gemelo:{name:'Ponerte de puntillas a un pie',feel:'La parte de atrás de la pierna, debajo de la rodilla.',steps:['Apoya una mano en la pared.','Sube de puntillas sobre un pie, lo más alto posible.','Baja despacio, en 2 o 3 segundos.'],ok:'Subes hasta arriba del todo cada vez.',easy:'Hazlo con los dos pies.'},
    tibial:{name:'Levantar las puntas de los pies',feel:'La parte delantera de la pierna, junto a la espinilla.',steps:['Apoya la espalda en la pared, con los pies un poco adelantados.','Levanta las puntas de los pies hacia ti.','Bájalas sin llegar a tocar el suelo con fuerza.'],ok:'Solo se mueven los pies.',easy:'Acerca los pies a la pared.'},
    bicho:{name:'Boca arriba, brazo y pierna contrarios',feel:'La barriga, como si te fueran a dar un toque.',steps:['Boca arriba, con los brazos hacia el techo y las rodillas dobladas en el aire.','Baja un brazo y la pierna contraria, sin tocar el suelo.','Vuelve y cambia de lado.'],ok:'La parte baja de la espalda no se despega del suelo.',easy:'Baja solo la pierna.'},
    cuatro:{name:'A cuatro patas, brazo y pierna contrarios',feel:'Barriga y culo. La espalda no debería molestar.',steps:['Ponte a cuatro patas.','Estira un brazo y la pierna contraria hasta formar una línea.','Aguanta 2 segundos y cambia.'],ok:'Podrías llevar un vaso de agua en la espalda.',easy:'Mueve solo la pierna.'},
    lateral:{name:'Tabla de lado',feel:'El costado que queda hacia el suelo.',steps:['Túmbate de lado, apoyado en el antebrazo.','Levanta la cadera hasta quedar recto.','Aguanta respirando con normalidad.'],ok:'La cadera no se cae hacia el suelo.',easy:'Apoya las rodillas en vez de los pies.'},
    piernas:{name:'Subir y bajar las piernas tumbado',feel:'La parte baja de la barriga.',steps:['Túmbate boca arriba con las manos bajo el culo.','Sube las piernas hasta apuntar al techo.','Bájalas en 3 segundos, sin dejarlas caer.'],ok:'La espalda sigue pegada al suelo.',easy:'Dobla las rodillas. Hazlo también si notas tirantez en la espalda.'},
    inverso:{name:'Llevar las rodillas al pecho',feel:'La barriga, sobre todo debajo del ombligo.',steps:['Boca arriba, con las rodillas dobladas en el aire.','Lleva las rodillas hacia el pecho, despegando un poco el culo.','Baja despacio, sin balancearte.'],ok:'El culo sube por la fuerza de la barriga, no por el impulso.',easy:'Sube menos el culo.'},
    plancha:{name:'Tabla apretando barriga y culo',feel:'Toda la barriga, como si la cerraras.',steps:['Apóyate en antebrazos y puntas de los pies.','Aprieta el culo y mete un poco la barriga.','Empuja el suelo y separa bien los hombros.'],ok:'El cuerpo forma una línea, sin que la cadera se hunda.',easy:'Apoya las rodillas.'},
    flexion:{name:'Flexiones',feel:'El pecho y la parte de atrás de los brazos.',steps:['Manos bajo los hombros y cuerpo recto.','Baja en 2 o 3 segundos, hasta casi tocar el suelo.','Empuja hasta estirar los brazos.'],ok:'El cuerpo baja entero, como una tabla.',easy:'Apoya las rodillas o las manos en la mesa.'},
    ytw:{name:'Boca abajo, dibujar Y, T y W con los brazos',feel:'Entre los omóplatos, los huesos planos de la espalda.',steps:['Boca abajo y mirando al suelo, levanta un poco los brazos en forma de Y. El dibujo te ve desde arriba.','Sin tocar el suelo, ábrelos en forma de T.','Dobla los codos en forma de W y junta los omóplatos, como si sujetaras un lápiz entre ellos.'],ok:'El cuello sigue relajado.',easy:'Sube menos los brazos.'},
    flexor:{name:'Estirar la cadera de rodillas',feel:'La parte delantera de la cadera, donde se dobla la pierna.',steps:['Ponte con una rodilla en el suelo y el otro pie delante.','Aprieta el culo y lleva el cuerpo un poco hacia delante.','Aguanta 30 segundos y cambia de lado.'],ok:'Notas que estira por delante, no en la espalda.',easy:'Pon una toalla bajo la rodilla.'},
    diamante:{name:'Flexiones con las manos juntas',feel:'La parte de atrás del brazo, la que cuelga si no la trabajas.',steps:['Junta las manos bajo el pecho, formando un rombo con los dedos.','Baja despacio, con los codos pegados al cuerpo.','Empuja hasta estirar los brazos.'],ok:'Deberías poder hacer 2 más al terminar.',easy:'Apoya las rodillas.'},
    pica:{name:'Flexiones con el culo hacia arriba',feel:'Los hombros y la parte de atrás del brazo.',steps:['Colócate como una V al revés, con el culo arriba.','Dobla los codos y acerca la cabeza al suelo.','Empuja para volver arriba.'],ok:'La cabeza va hacia el suelo, no hacia delante.',easy:'Acerca más los pies a las manos.'},
    toalla:{name:'Subir una toalla contra tu pierna',feel:'La parte de delante del brazo, la del «músculo» clásico.',steps:['Sentado o de pie, pasa una toalla bajo un pie y coge los dos extremos con una mano.','Sube la mano doblando el codo, mientras la pierna empuja hacia abajo.','Baja en 3 segundos, sin dejar de hacer fuerza.'],ok:'El codo se queda pegado al cuerpo.',easy:'Empuja menos con la pierna.'}
  };

  const warm={t:'Despertar el cuerpo',m:3,items:[['gato','1 minuto'],['zancada','1 minuto'],['cuclillas','1 minuto']]};
  const legs=(r)=>({t:'Piernas',m:r===2?4:2,note:r===2?'2 vueltas':'1 vuelta',items:[['sentadilla','10 veces'],['puente','8 por lado'],['gemelo','10 por lado'],['tibial','15 veces']]});
  const cool={t:'Para terminar',m:1,items:[['flexor','30 segundos por lado']]};
  const A={key:'abs',label:'Barriga',title:'Barriga fuerte',lead:'Hoy trabajas la barriga y la espalda baja. Para que se vean los abdominales, además, cuenta sobre todo la comida.',min:15,blocks:[warm,legs(1),
    {t:'Barriga y espalda',m:4,note:'2 vueltas',items:[['bicho','8 por lado'],['cuatro','8 por lado'],['lateral','20 segundos por lado']]},
    {t:'Abdominales',m:3,focus:true,note:'2 vueltas',items:[['piernas','8 veces'],['inverso','10 veces'],['plancha','30 segundos']]},
    {t:'Pecho y espalda alta',m:2,note:'1 vuelta',items:[['flexion','las que salgan bien'],['ytw','5 de cada letra']]},cool]};
  const B={key:'arms',label:'Brazos',title:'Brazos fuertes',lead:'Hoy el trabajo principal son los brazos. Mejor pocas repeticiones bien hechas que muchas a toda prisa.',min:15,blocks:[warm,legs(1),
    {t:'Brazos',m:6,focus:true,note:'2 vueltas',items:[['diamante','hasta que te queden 2 en reserva'],['pica','6 a 10 veces'],['toalla','8 a 12 por brazo']]},
    {t:'Barriga y espalda',m:2,note:'1 vuelta',items:[['bicho','8 por lado'],['cuatro','8 por lado'],['lateral','20 segundos por lado']]},
    {t:'Espalda alta',m:1,items:[['ytw','5 de cada letra']]},cool]};
  const C={key:'easy',label:'Suave',title:'Día suave',lead:'Hoy solo moverte un poco. Descansar también forma parte de ponerse fuerte.',min:8,blocks:[warm,legs(2),cool]};
  const WEEK=[A,B,A,B,A,B,C];
  const LETTERS=['L','M','X','J','V','S','D'];


  const dayIdx=()=>(new Date().getDay()+6)%7;
  const NAMES=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
  const iso=(d)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const bar=(day)=>`<div class="bar-wrap"><div class="bar" aria-hidden="true">${day.blocks.map(b=>`<i class="${b.focus?'focus':''}" style="flex:${b.m}"></i>`).join('')}</div><div class="bar-note">Cómo se reparten los ${day.min} minutos. En verde oscuro, lo importante.</div></div>`;
  const toGroups=(day)=>day.blocks.map((b,bi)=>({title:b.t,meta:`${b.m} min${b.note?' · '+b.note:''}`,items:b.items.map(([id,dose],i)=>({key:`${bi}-${i}`,id,dose}))}));
  /* Carries over progress saved by the first version of this page ({'2026-10-5':{'0-0':true}}). */
  try{
    const old=JSON.parse(localStorage.getItem('rutina-15-v1'));
    if(old&&typeof old==='object'&&!localStorage.getItem('rutina-15-v2')){
      const checked={};
      Object.entries(old).forEach(([k,v])=>{const [y,m,d]=k.split('-');const ids=Object.keys(v||{}).filter(x=>v[x]);if(ids.length)checked[`${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`]=ids;});
      localStorage.setItem('rutina-15-v2',JSON.stringify({checked}));
    }
  }catch{}
  startProgram({
    key:'rutina-15-v2',file:'mi-rutina.json',brand:['15 ','min.'],tag:'Rutina en casa',
    note:['Sin material.','Mejor poco cada día, bien hecho, que mucho de vez en cuando.'],eyebrow:'Sin material · En casa',
    exercise(id){const e=E[id];return {name:e.name,thumb:figure(id),sheet:{feel:e.feel,frames:F[id].map(f=>f?figure(f):null),steps:e.steps,ok:e.ok,easy:e.easy}};},
    today(c){
      const i=dayIdx(),day=WEEK[i],mon=new Date();mon.setDate(mon.getDate()-i);
      const moved=WEEK.filter((_,n)=>{const d=new Date(mon);d.setDate(mon.getDate()+n);return (c.st.checked[iso(d)]||[]).length>0;}).length;
      return {pill:`${NAMES[i].toUpperCase()} · ${day.min} MINUTOS`,title:day.title,lead:day.lead,art:`<span class="fig">${figure(day.key==='arms'?'flexion':day.key==='abs'?'plancha':'cuclillas')}</span>`,
        stats:(done,total)=>[{v:day.min,l:'Minutos de hoy'},{v:moved,of:7,l:'Días con actividad esta semana'},{v:done,of:total,l:'Ejercicios marcados hoy'}],
        heading:'Hoy, paso a paso',sub:'Toca un ejercicio para ver cómo se hace',cardTitle:'Tu sesión',cardLead:'Marca cada ejercicio al terminarlo.',bar:bar(day),groups:toGroups(day),
        after:`<div style="height:6px"></div><div class="notice">${c.svgIcon('info')}<div><strong>Molestia sí, dolor no.</strong> Si aparece un dolor agudo, que baja por la pierna o que va a más, para y consulta con un profesional. <button data-page="care" style="border:0;padding:0;background:none;color:var(--teal-dark);text-decoration:underline;font-weight:700">Ver cuándo parar</button>.</div></div>`};
    },
    plan(c){
      return {eyebrow:'Tu semana',title:'Siete días.<br>Quince minutos.',lead:'Una semana que se repite: un día barriga, otro brazos y el domingo más suave. Selecciona un día para ver qué toca.',heading:'Explora los días',fit:true,current:String(dayIdx()),
        chips:WEEK.map((d,i)=>({id:String(i),n:LETTERS[i],l:d.label})),
        detail(sel){const d=WEEK[+sel];return `<div class="card week-card" style="margin-top:11px"><span class="tag ${d.key==='easy'?'peach':''}">${NAMES[+sel].toUpperCase()} · ${d.min} MINUTOS</span><h2>${d.title}</h2><p class="sub">${d.lead}</p></div>${toGroups(d).map(g=>c.group(g,'plan'+sel,false)).join('')}`;}};
    },
    library(c,f){
      const ids=Object.keys(E),day=WEEK[dayIdx()],todays=[...new Set(day.blocks.flatMap(b=>b.items.map(x=>x[0])))];
      return {eyebrow:'Biblioteca de movimiento',title:'Todos los<br>ejercicios.',lead:'Cada ejercicio explicado con palabras sencillas y dibujos paso a paso. Las ilustraciones son esquemáticas.',
        filters:[{id:'today',label:`Para hoy (${todays.length})`},{id:'all',label:`Todos (${ids.length})`}],
        items:(f==='all'?ids:todays).map(id=>({key:id,id,dose:E[id].feel}))};
    },
    care(){return {top:`<div class="eyebrow">El cuidado primero</div><h1 class="page-h">Escucha las<br>señales de tu cuerpo.</h1><p class="lead">Las agujetas y el cansancio muscular son normales. El dolor no lo es.</p>
      <div class="row-2" style="margin-top:24px"><div class="card"><div class="card-hdr"><div><h3>Cómo avanzar</h3><p>Cada 2 semanas, cambia solo una cosa.</p></div></div><div class="safety-list">${['Termina sintiendo que podrías hacer 2 o 3 repeticiones más.','Baja más lento antes de hacer más repeticiones.','Si vas justo de tiempo, haz menos, pero sin correr.','Empieza las posturas profundas hasta donde te resulte cómodo.'].map(t=>`<div class="safety-item"><span class="bul"></span><span>${t}</span></div>`).join('')}</div></div>
      <div class="urgent"><span class="tag peach">CUÁNDO PARAR</span><h3 style="margin-top:14px">Para y consulta si notas</h3><ul><li>Dolor agudo o repentino.</li><li>Dolor que baja por la pierna.</li><li>Dolor que va a más de un día a otro.</li><li>Mareo o dolor en el pecho.</li></ul><p style="color:#955d59;font-size:12px;line-height:1.6;margin-bottom:0">Si tienes una lesión o una enfermedad, consulta antes a un profesional. En España, ante una emergencia, llama al 112.</p></div></div>
      <div class="section-title"><h2>Lo que más ayuda</h2></div><div class="card pad"><div class="week-list"><div><strong>Abdominales visibles</strong><p class="tiny">Dependen sobre todo de tener poca grasa encima, es decir, de la comida. Hacer abdominales no quema la grasa de esa zona.</p></div><div><strong>Comer proteína</strong><p class="tiny">Ayuda a conservar el músculo si estás perdiendo peso.</p></div><div><strong>Caminar</strong><p class="tiny">Moverte a diario gasta más que añadir más abdominales.</p></div><div><strong>Dormir</strong><p class="tiny">Dormir poco da más hambre y empeora la recuperación.</p></div></div></div>`,
      bottom:`<p class="tiny" style="margin:18px 0 0">Guía orientativa y general. No sustituye la valoración de un profesional sanitario.</p>`};}
  });
})();
