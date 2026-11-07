/* Rauda: Produktdaten, Warenkorb und Kaufansicht (auf allen Seiten geladen) */
(function(){
const P='assets/p/';
const ABAYA=['52','54','56','58','60'];
const PRODUCTS=[
  {id:'abaya-classic',sku:'RA-AB01',name:'‘Abāya Classic',line:'Rauda Essentials',cat:'abaya schwestern',price:59,
   colors:[{n:'Schwarz',hex:'#151515',img:[P+'abaya-schwarz.jpg','assets/abaya-schwarz.jpg']}],
   sizes:ABAYA,sizeNote:'Länge in Zoll, vom Schulteransatz bis zum Saum.',
   desc:'Unsere schlichteste ‘Abāya: weit geschnitten, bodenlang und aus blickdichtem Stoff. Die feine Paspel an Ärmeln und Kanten gibt ihr Ruhe und Halt, ohne aufzufallen. Ein Stück für jeden Tag, das sich still unterordnet.'},
  {id:'abaya-signature',sku:'RA-AB02',name:'‘Abāya Signature',line:'Rauda Signature',cat:'abaya schwestern',price:79,
   colors:[{n:'Grau',hex:'#4f5563',img:[P+'abaya-weit-grau.jpg']}],
   sizes:ABAYA,sizeNote:'Länge in Zoll, vom Schulteransatz bis zum Saum.',
   desc:'Besonders weit und fliessend, mit viel Stoff in Ärmeln und Rücken. Die Signature wird auf Bestellung für dich gefertigt und fällt so, dass keine Kontur sichtbar bleibt.'},
  {id:'khimar-niqab',sku:'RA-KH01',name:'Khimār mit Niqāb',line:'Rauda Essentials',cat:'khimar schwestern',price:45,
   colors:[{n:'Schwarz',hex:'#151515',img:[P+'khimar-niqab-schwarz.jpg']},{n:'Grau',hex:'#59657a',img:[P+'khimar-niqab-grau.jpg']},{n:'Oliv',hex:'#454a33',img:[P+'khimar-niqab-oliv.jpg']}],
   desc:'Ein langer Khimār mit integriertem Niqāb, der Kopf, Brust und Arme weich umhüllt. Einfach überzuziehen, ohne Nadeln, und blickdicht in jeder Bewegung.'},
  {id:'khimar-schleife',sku:'RA-KH02',name:'Khimār mit Schleife',line:'Rauda Essentials',cat:'khimar schwestern',price:39,
   colors:[{n:'Hellgrau',hex:'#d9dadc',img:[P+'khimar-schleife-hellgrau.jpg']},{n:'Khaki',hex:'#4a4a3c',img:[P+'khimar-schleife-khaki.jpg']},{n:'Weiss',hex:'#f6f4ee',img:[P+'khimar-schleife-weiss.jpg']}],
   desc:'Der Khimār mit kleiner Schleife unter dem Kinn sitzt sicher, ohne zu verrutschen. Lang geschnitten, mit weichem Fall über Schultern und Brust.'},
  {id:'khimar-classic',sku:'RA-KH03',name:'Khimār Classic',line:'Rauda Essentials',cat:'khimar schwestern',price:30,
   colors:[{n:'Taupe',hex:'#8a7462',img:[P+'khimar-taupe.jpg','assets/khimar-taupe.jpg']}],
   desc:'Der Klassiker: ein langer Khimār in warmem Taupe, der bis über die Hüfte reicht. Ruhig, weit und leicht zu kombinieren.'},
  {id:'kimono',sku:'RA-KI01',name:'Kimono',line:'Rauda Essentials',cat:'kimono schwestern',price:65,
   colors:[{n:'Weiss',hex:'#f3f1ec',img:[P+'kimono-weiss.jpg']}],
   sizes:['S/M','L/XL'],sizeNote:'Weit geschnitten. Bei Unsicherheit die kleinere Grösse wählen.',
   desc:'Ein offener, langer Kimono, der über ‘Abāya oder Kleid getragen wird. Leicht, hell und mit weiten Ärmeln.'},
  {id:'niqab',sku:'RA-NQ01',name:'Niqāb',line:'Rauda Essentials',cat:'niqab schwestern',price:19,
   colors:[{n:'Crème',hex:'#efe8da',img:[P+'niqab-creme.jpg']}],
   desc:'Ein Niqāb mit weichem Band, das am Hinterkopf gebunden wird. Atmungsaktiv und blickdicht.'},
  {id:'thobe-saudi',sku:'RA-TH01',name:'Saudischer Thobe',line:'Rauda Essentials',cat:'brueder thobe',price:59,
   colors:[{n:'Grau',hex:'#7d8796',img:[P+'thobe-grau.jpg']}],
   sizes:ABAYA,sizeNote:'Länge in Zoll, vom Schulteransatz bis zum Saum. Getragen über dem Knöchel.',
   desc:'Ein schlichter saudischer Thobe mit Stehkragen und verdeckter Knopfleiste. Gerader Schnitt, der über dem Knöchel endet, wie es der Sunnah entspricht.'},
  {id:'tote',sku:'RA-AC01',name:'Rauda Tote',line:'Madinah Collection',cat:'acc',price:25,
   colors:[{n:'Natur',hex:'#e6dccb',img:[P+'tote.jpg','assets/taschen.jpg']},{n:'Oliv',hex:'#5b5e45',img:[P+'tote.jpg','assets/taschen.jpg']},{n:'Schwarz',hex:'#1b1b1b',img:[P+'tote.jpg','assets/taschen.jpg']}],
   desc:'Eine robuste Tasche aus festem Stoff, gross genug für Qur’ān, Gebetsteppich und alles, was der Tag braucht.'}
];
window.RAUDA={PRODUCTS,byId:id=>PRODUCTS.find(p=>p.id===id)};

const chf=n=>(Number.isInteger(n)?n:n.toFixed(2))+' CHF';
const FREE=200;
/* ── Warenkorb-Speicher ── */
const KEY='rauda-cart';
let cart=[];
try{cart=JSON.parse(localStorage.getItem(KEY))||[]}catch(e){cart=[]}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(cart))}catch(e){}};
const count=()=>cart.reduce((a,i)=>a+i.q,0);
const total=()=>cart.reduce((a,i)=>{const p=RAUDA.byId(i.id);return a+(p?p.price*i.q:0)},0);

/* ── Warenkorb-Schublade ── */
const x='<svg viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5 5 19"/></svg>';
document.body.insertAdjacentHTML('beforeend',`
<div class="c-scrim"></div>
<aside class="cart" aria-label="Warenkorb" aria-hidden="true">
  <div class="c-head up"><span>Warenkorb <em class="c-n"></em></span><button class="c-x" aria-label="Warenkorb schliessen">${x}</button></div>
  <div class="c-ship"><p></p><i><b></b></i></div>
  <div class="c-items"></div>
  <div class="c-foot">
    <div class="c-sum"><span>Zwischensumme</span><span class="c-total"></span></div>
    <p class="c-note">Versand und allfällige Rabatte werden im nächsten Schritt berechnet.</p>
    <a class="c-go" href="#">Zur Kasse</a>
    <button class="c-more up">Weiter einkaufen</button>
  </div>
</aside>
<aside class="cart favs" aria-label="Merkliste" aria-hidden="true">
  <div class="c-head up"><span>Merkliste <em class="f-n"></em></span><button class="c-x" aria-label="Merkliste schliessen">${x}</button></div>
  <div class="c-items f-items"></div>
</aside>
<aside class="cart acc" aria-label="Kundenkonto" aria-hidden="true">
  <div class="c-head up"><span>Mein Konto</span><button class="c-x" aria-label="Kundenkonto schliessen">${x}</button></div>
  <div class="a-body">
    <p class="a-t">Willkommen bei Rauda</p>
    <p class="a-s">Mit deinem Konto siehst du deine Bestellungen, speicherst Adressen und hast deine Merkliste auf allen Geräten.</p>
    <button class="c-go a-go" data-soon>Anmelden</button>
    <button class="a-reg" data-soon>Konto erstellen</button>
    <p class="a-note" hidden>Das Kundenkonto ist bald verfügbar.</p>
  </div>
</aside>`);
const el=document.querySelector('.cart:not(.favs):not(.acc)'),fv=document.querySelector('.cart.favs'),ac=document.querySelector('.cart.acc'),scrim=document.querySelector('.c-scrim');
const panel=(d,o)=>{[el,fv,ac].forEach(x=>{const on=o&&x===d;x.classList.toggle('open',on);x.setAttribute('aria-hidden',!on)});
  scrim.classList.toggle('open',o);document.body.style.overflow=o?'hidden':'';
  document.querySelectorAll('a[aria-label="Warenkorb"]').forEach(a=>a.classList.toggle('on',o&&d===el));
  document.querySelectorAll('.ic-fav').forEach(a=>a.classList.toggle('on',o&&d===fv));
  document.querySelectorAll('.ic-acc').forEach(a=>a.classList.toggle('on',o&&d===ac))};
const open=o=>panel(el,o),openFav=o=>panel(fv,o);
scrim.onclick=()=>panel(el,false);el.querySelector('.c-x').onclick=()=>open(false);el.querySelector('.c-more').onclick=()=>open(false);fv.querySelector('.c-x').onclick=()=>openFav(false);ac.querySelector('.c-x').onclick=()=>panel(ac,false);
document.querySelectorAll('[data-acc]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();panel(ac,true)}));
ac.querySelectorAll('[data-soon]').forEach(b=>b.onclick=()=>{ac.querySelector('.a-note').hidden=false});
addEventListener('keydown',e=>{if(e.key==='Escape')panel(el,false)});

function render(){
  const n=count(),t=total();
  el.querySelector('.c-n').textContent='('+n+')';
  document.querySelectorAll('.bag-n').forEach(b=>{b.textContent=n;b.hidden=!n});
  const left=FREE-t;
  el.querySelector('.c-ship p').innerHTML=!n?'Ab CHF 200.– ist der Versand in der Schweiz kostenlos.':left>0?'Noch <strong>'+chf(left)+'</strong> bis zum Gratis-Versand.':'Dein Versand ist <strong>kostenlos</strong>.';
  el.querySelector('.c-ship b').style.transform='scaleX('+Math.min(1,t/FREE)+')';
  el.querySelector('.c-total').textContent=chf(t);
  el.classList.toggle('empty',!n);
  el.querySelector('.c-items').innerHTML=!n?'<div class="c-empty"><p>Dein Warenkorb ist leer.</p><a class="up" href="shop.html">Zur Kollektion</a></div>':
    cart.map((i,k)=>{const p=RAUDA.byId(i.id);if(!p)return'';const c=p.colors.find(c=>c.n===i.c)||p.colors[0];
      return `<div class="c-it"><a href="produkt.html?p=${p.id}&c=${encodeURIComponent(c.n)}" class="c-img"><img src="${c.img[0]}" alt=""></a>
      <div class="c-info"><a href="produkt.html?p=${p.id}&c=${encodeURIComponent(c.n)}" class="c-name">${p.name}</a>
      <p class="c-meta">${c.n}${i.s?' · Grösse '+i.s:''}</p>
      <div class="c-row"><div class="qty"><button data-k="${k}" data-d="-1" aria-label="Weniger">−</button><span>${i.q}</span><button data-k="${k}" data-d="1" aria-label="Mehr">+</button></div><span>${chf(p.price*i.q)}</span></div>
      <button class="c-rm" data-rm="${k}">Entfernen</button></div></div>`}).join('');
  el.querySelectorAll('.qty button').forEach(b=>b.onclick=()=>{const it=cart[b.dataset.k];it.q=Math.max(0,it.q+ +b.dataset.d);if(!it.q)cart.splice(b.dataset.k,1);save();render()});
  el.querySelectorAll('.c-rm').forEach(b=>b.onclick=()=>{cart.splice(b.dataset.rm,1);save();render()});
  const body=cart.map(i=>{const p=RAUDA.byId(i.id);return p?`${i.q} × ${p.name} (${i.c}${i.s?', Grösse '+i.s:''}) – ${chf(p.price*i.q)}`:''}).join('\n');
  el.querySelector('.c-go').href='mailto:info@rauda.ch?subject='+encodeURIComponent('Bestellung bei Rauda')+'&body='+encodeURIComponent('Salam Rauda,\n\nich möchte gerne bestellen:\n\n'+body+'\n\nZwischensumme: '+chf(t)+'\n\nName:\nAdresse:\nTelefon:\n');
}
RAUDA.add=(id,c,s)=>{const it=cart.find(i=>i.id===id&&i.c===c&&i.s===s);if(it)it.q++;else cart.push({id,c,s,q:1});save();render();open(true)};
RAUDA.openCart=()=>open(true);

/* Taschen-Symbol in der Kopfzeile */
document.querySelectorAll('a[aria-label="Warenkorb"]').forEach(a=>{
  a.classList.add('bag');a.insertAdjacentHTML('beforeend','<span class="bag-n" hidden></span>');
  a.addEventListener('click',e=>{e.preventDefault();open(true)});
});
render();

/* ── Merkliste ── */
const FK='rauda-fav';let favs=[];
try{favs=JSON.parse(localStorage.getItem(FK))||[]}catch(e){favs=[]}
const saveF=()=>{try{localStorage.setItem(FK,JSON.stringify(favs))}catch(e){}};
function renderFav(){
  fv.querySelector('.f-n').textContent='('+favs.length+')';
  document.querySelectorAll('.ic-fav').forEach(b=>b.classList.toggle('has',favs.length>0));
  fv.querySelector('.f-items').innerHTML=!favs.length?'<div class="c-empty"><p>Noch nichts gemerkt.<br>Tippe auf das Herz bei einem Stück, um es hier zu sammeln.</p><a class="up" href="shop.html">Zur Kollektion</a></div>':
    favs.map(id=>{const p=RAUDA.byId(id);if(!p)return'';return `<div class="c-it"><a href="produkt.html?p=${p.id}" class="c-img"><img src="${p.colors[0].img[0]}" alt=""></a>
    <div class="c-info"><a href="produkt.html?p=${p.id}" class="c-name">${p.name}</a><p class="c-meta">${chf(p.price)}</p>
    <div class="c-row"><a class="f-go" href="produkt.html?p=${p.id}">Ansehen</a></div><button class="c-rm" data-unfav="${p.id}">Entfernen</button></div></div>`}).join('');
  fv.querySelectorAll('[data-unfav]').forEach(b=>b.onclick=()=>RAUDA.toggleFav(b.dataset.unfav));
  document.querySelectorAll('.prod[data-id] .heart').forEach(h=>{const on=favs.includes(h.closest('.prod').dataset.id);h.classList.toggle('on',on);h.setAttribute('aria-pressed',on)});
}
RAUDA.isFav=id=>favs.includes(id);
RAUDA.toggleFav=id=>{favs=favs.includes(id)?favs.filter(f=>f!==id):favs.concat(id);saveF();renderFav()};
document.querySelectorAll('[data-fav]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();setTimeout(()=>openFav(true),b.closest('.drawer')?420:0)}));
document.querySelectorAll('.prod[data-id] .heart').forEach(h=>h.addEventListener('click',()=>RAUDA.toggleFav(h.closest('.prod').dataset.id)));
renderFav();
if(/shop\.html/.test(location.pathname))document.querySelectorAll('.ic-search').forEach(a=>a.classList.add('on'));
addEventListener('storage',e=>{if(e.key===KEY){try{cart=JSON.parse(e.newValue)||[]}catch(_){cart=[]}render()}if(e.key===FK){try{favs=JSON.parse(e.newValue)||[]}catch(_){favs=[]}renderFav()}});

/* ── Produkt-Reihen auf der Startseite (wie Fendi) ── */
const arr=d=>`<svg viewBox="0 0 7 12" aria-hidden="true"><path d="${d?'M1 1l5 5-5 5':'M6 1 1 6l5 5'}"/></svg>`;
document.querySelectorAll('[data-rail]').forEach(sec=>{
  const g=sec.dataset.rail;
  let items=PRODUCTS.filter(p=>p.cat.split(' ').includes(g)),soon=[];
  if(g==='brueder'){items=items.concat(PRODUCTS.filter(p=>p.id==='tote'));soon=['Kufi','Marokkanischer Thobe','Hose über dem Knöchel']}
  const card=p=>`<a class="r-card" href="produkt.html?p=${p.id}"><span class="r-img"><img src="${p.colors[0].img[0]}" alt="${p.name}"></span><span class="r-meta up"><span>${p.name}</span><span>${chf(p.price)}</span></span></a>`;
  const soonCard=n=>`<div class="r-card soon"><span class="r-img"><span class="r-soon up">Bald erhältlich</span></span><span class="r-meta up"><span>${n}</span><span>&nbsp;</span></span></div>`;
  sec.insertAdjacentHTML('beforeend',`<div class="r-track">${items.map(card).join('')}${soon.map(soonCard).join('')}</div>
  <div class="r-ctl"><button class="r-prev" aria-label="Zurück">${arr(0)}</button><span class="r-bar"><b></b></span><button class="r-next" aria-label="Weiter">${arr(1)}</button></div>`);
  const t=sec.querySelector('.r-track'),bar=sec.querySelector('.r-bar b'),ctl=sec.querySelector('.r-ctl');
  const upd=()=>{const max=t.scrollWidth-t.clientWidth,f=Math.min(1,t.clientWidth/t.scrollWidth);bar.style.width=(f*100)+'%';bar.style.transform='translateX('+(max>0?t.scrollLeft/max*(1/f-1)*100:0)+'%)';ctl.style.visibility=max>4?'visible':'hidden'};
  t.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
  sec.querySelector('.r-prev').onclick=()=>t.scrollBy({left:-t.clientWidth*.8,behavior:'smooth'});
  sec.querySelector('.r-next').onclick=()=>t.scrollBy({left:t.clientWidth*.8,behavior:'smooth'});
});

/* ── Cookie-Hinweis (einmalig) ── */
(function(){
  let seen=null;try{seen=localStorage.getItem('rauda-consent')}catch(e){}
  if(seen)return;
  document.body.insertAdjacentHTML('beforeend',`<div class="ck" role="dialog" aria-label="Cookies" aria-live="polite">
    <div class="ck-in">
      <p class="ck-t up">Cookies bei Rauda</p>
      <p class="ck-p">Wir verwenden Cookies, damit dein Warenkorb und deine Einstellungen funktionieren. Mit deiner Zustimmung nutzen wir zusätzlich anonyme Statistiken, um Rauda für dich zu verbessern. Mehr dazu in unserer <a href="#">Datenschutzerklärung</a>.</p>
      <div class="ck-b"><button class="ck-no">Nur notwendige</button><button class="ck-yes">Alle akzeptieren</button></div>
    </div></div>`);
  const ck=document.querySelector('.ck');
  requestAnimationFrame(()=>setTimeout(()=>ck.classList.add('show'),700));
  const close=v=>{try{localStorage.setItem('rauda-consent',v)}catch(e){}ck.classList.remove('show');setTimeout(()=>ck.remove(),600)};
  ck.querySelector('.ck-no').onclick=()=>close('notwendig');
  ck.querySelector('.ck-yes').onclick=()=>close('alle');
})();

/* ── Kaufansicht (produkt.html) ── */
const root=document.getElementById('pdp');
if(!root)return;
const q=new URLSearchParams(location.search);
const p=RAUDA.byId(q.get('p'))||PRODUCTS[0];
let col=p.colors.find(c=>c.n===q.get('c'))||p.colors[0],size=null;
document.title=p.name+' · Rauda';
const heart='<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z"/></svg>';
const plus='<svg viewBox="0 0 12 12"><path d="M6 1v10M1 6h10"/></svg>';
root.innerHTML=`
<div class="pdp">
  <div class="pdp-gal" aria-label="Bilder"></div>
  <div class="pdp-side"><div class="pi">
    <div class="pi-top"><span class="pi-sku">${p.sku}</span><button class="pi-heart" aria-label="Merken" aria-pressed="false">${heart}</button></div>
    <h1 class="pi-name">${p.name}</h1>
    <p class="pi-price">${chf(p.price)}</p>
    <div class="pi-row"><span>Farbe</span><span class="pi-cn">${col.n}</span></div>
    <div class="pi-cols">${p.colors.map(c=>`<button data-c="${c.n}" aria-label="${c.n}" style="--sw:${c.hex}"><img src="${c.img[0]}" alt=""></button>`).join('')}</div>
    ${p.sizes?`<div class="pi-row"><span>Grösse</span><button class="pi-guide">Grössenberatung</button></div>
    <div class="pi-sizes">${p.sizes.map(s=>`<button data-s="${s}">${s}</button>`).join('')}</div><p class="pi-hint" hidden>Bitte wähle deine Grösse.</p>`:`<div class="pi-row"><span>Grösse</span><span>Einheitsgrösse</span></div>`}
    <button class="pi-add">In den Warenkorb</button>
    <p class="pi-ship">Versand aus Zürich in 2–4 Werktagen · Gratis ab CHF 200.–</p>
    <div class="pi-desc"><p>${p.desc}</p></div>
    <button class="pi-more">Mehr lesen</button>
    <div class="pi-acc">
      <details><summary>Details &amp; Pflege ${plus}</summary><ul><li>${p.line}</li><li>Weit geschnitten und blickdicht</li><li>Artikelnummer ${p.sku}</li><li>Schonend bei 30 °C waschen, nicht in den Trockner</li></ul></details>
      <details class="acc-size"><summary>Grösse &amp; Passform ${plus}</summary><p>${p.sizeNote||'Einheitsgrösse, die für die meisten Schwestern passt.'} Schreib uns gerne, wir beraten dich persönlich.</p></details>
      <details><summary>Versand &amp; Rückgabe ${plus}</summary><p>Wir versenden aus Zürich innerhalb von 2–4 Werktagen, ab CHF 200.– kostenlos. Ungetragene Stücke kannst du innert 14 Tagen zurückgeben.</p></details>
      <details><summary>Liebevoll verpackt ${plus}</summary><p>Jede Bestellung kommt in Seidenpapier, mit Schleife und einer handgeschriebenen Dankeskarte.</p></details>
    </div>
    <a class="pi-help" href="mailto:info@rauda.ch?subject=${encodeURIComponent('Frage zu '+p.name)}">Persönliche Beratung</a>
  </div></div>
</div>
<section class="recs"><h2 class="up">Das könnte dir auch gefallen</h2><div class="recs-grid up"></div></section>`;
const gal=root.querySelector('.pdp-gal');
function setColor(c){
  col=c;root.querySelector('.pi-cn').textContent=c.n;
  root.querySelectorAll('.pi-cols button').forEach(b=>b.classList.toggle('on',b.dataset.c===c.n));
  gal.innerHTML=c.img.map((src,i)=>`<figure><img src="${src}" alt="${p.name} in ${c.n}${i?' – Ansicht '+(i+1):''}"${i?'':''}></figure>`).join('');
  history.replaceState(null,'','produkt.html?p='+p.id+'&c='+encodeURIComponent(c.n));
  dots.innerHTML=c.img.length>1?c.img.map((_,i)=>'<i'+(i?'':' class="on"')+'></i>').join(''):'';gal.scrollLeft=0;
}
const dots=document.createElement('div');dots.className='pdp-dots';gal.after(dots);
setColor(col);
gal.addEventListener('scroll',()=>{const i=Math.round(gal.scrollLeft/gal.clientWidth);dots.querySelectorAll('i').forEach((d,k)=>d.classList.toggle('on',k===i))},{passive:true});
root.querySelectorAll('.pi-cols button').forEach(b=>b.onclick=()=>setColor(p.colors.find(c=>c.n===b.dataset.c)));
root.querySelectorAll('.pi-sizes button').forEach(b=>b.onclick=()=>{size=b.dataset.s;root.querySelectorAll('.pi-sizes button').forEach(x=>x.classList.toggle('on',x===b));root.querySelector('.pi-hint').hidden=true});
const g=root.querySelector('.pi-guide');if(g)g.onclick=()=>{const d=root.querySelector('.acc-size');d.open=true;d.scrollIntoView({behavior:'smooth',block:'center'})};
const add=root.querySelector('.pi-add');
add.onclick=()=>{
  if(p.sizes&&!size){root.querySelector('.pi-hint').hidden=false;root.querySelector('.pi-sizes').classList.add('shake');setTimeout(()=>root.querySelector('.pi-sizes').classList.remove('shake'),500);return}
  RAUDA.add(p.id,col.n,size);add.textContent='Hinzugefügt';setTimeout(()=>add.textContent='In den Warenkorb',1800);
};
const desc=root.querySelector('.pi-desc'),more=root.querySelector('.pi-more');
more.onclick=()=>{const o=desc.classList.toggle('open');more.textContent=o?'Weniger':'Mehr lesen'};
const ht=root.querySelector('.pi-heart');const syncH=()=>{const o=RAUDA.isFav(p.id);ht.classList.toggle('on',o);ht.setAttribute('aria-pressed',o)};syncH();ht.onclick=()=>{RAUDA.toggleFav(p.id);syncH()};
/* Empfehlungen: gleiche Gruppe zuerst */
const grp=p.cat.split(' ')[1]||p.cat;
const recs=PRODUCTS.filter(x=>x.id!==p.id).sort((a,b)=>(b.cat.includes(grp))-(a.cat.includes(grp))).slice(0,4);
root.querySelector('.recs-grid').innerHTML=recs.map(r=>`<a class="rec" href="produkt.html?p=${r.id}"><span class="ph"><img src="${r.colors[0].img[0]}" alt="${r.name}"></span><span class="meta"><span>${r.name}</span><span>${chf(r.price)}</span></span></a>`).join('');
})();

/* Seiten mit dunklem Anfang: oben dunkler Hintergrund beim Überscrollen, unten weiss */
(()=>{const top=document.querySelector('.intro,.story');if(!top)return;const h=document.documentElement;
  const f=()=>h.classList.toggle('top-dark',scrollY<innerHeight);addEventListener('scroll',f,{passive:true});f()})();
