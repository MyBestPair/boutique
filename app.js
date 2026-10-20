(function(){
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const $=id=>document.getElementById(id);
const MONO="url(images/mono-cream.webp)";
document.documentElement.style.setProperty("--mono",MONO);
document.documentElement.style.setProperty("--monohole",MONO);
const AU=.4373,AV=.4875,AR=343/160,INNER=.0351;
const COL={noir:["#161616","Noir"],blanc:["#F1EEE8","Blanc"],olive:["#4B5139","Kaki olive"],marine:["#1E2A45","Marine"]};
const P={
 tee:{n:"T-shirt Running",p:"Prix prévu 35 €",ph:"tee",cat:"Capsule 01 · Running",d:"Maille technique légère et respirante, qui évacue la transpiration. Monogramme MBP sur le cœur, MYBESTPAIR dans le dos.",m:"Polyester technique respirant. Lavage à 30 °C, sans sèche-linge.",c:["noir","marine","olive"],s:["S","M","L","XL","XXL"],g:["tee","teesea","bgroute"],mate:"cap"},
 cap:{n:"Casquette Running",p:"Prix prévu 25 €",ph:"cap",cat:"Capsule 01 · Running",d:"Légère, aérée, réglable. Monogramme MBP brodé sur le devant.",m:"Tissu technique léger. Lavage à la main.",c:["noir","blanc","olive"],s:["Unique"],g:["cap","beach","bgtrail"],mate:"tee"}
};
P.pull={n:"Pull Hiver",p:"Prix à venir",ph:"hoodie",cat:"Capsule 01 · Hiver",d:"Moitié sport, moitié streetwear : un sweat à capuche chaud et doux à l'intérieur, dans un tissu qui respire. Pour l'échauffement, l'après-séance et la ville.",m:"Molleton chaud qui respire. Lavage à 30 °C, à l'envers.",c:["noir","marine","olive"],s:["S","M","L","XL","XXL"],g:["hoodie","sweat","fog"],mate:"tee"};
P.cap.mate="pull";
let view="home",curP=null,busy=false,openV=1;
try{openV=localStorage.getItem("mbp-cap-seen")?0:1;localStorage.setItem("mbp-cap-seen","1")}catch(e){}

/* Masque monogramme */
function maskAt(el,W,fx,fy,cx,cy){const H=W/AR;el.style.webkitMaskSize=el.style.maskSize=`${W}px ${H}px`;
 const x=cx-fx*W,y=cy-fy*H;el.style.webkitMaskPosition=el.style.maskPosition=`${x}px ${y}px`}
function coverW(w,h){return Math.hypot(w,h)/2/INNER*1.15}
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

/* 1 · Ouverture (validée : signature puis zoom la 1re fois, zoom court ensuite) */
const WORD="images/wordmark.webp",MONOI="images/mono-cream.webp";
function heroIn(){const t=$("ititle");t.classList.remove("on");void t.offsetWidth;setTimeout(()=>t.classList.add("on"),60)}
function opening(v){
 const o=$("opening");o.innerHTML="";o.className="opening";o.hidden=false;
 if(RM){o.hidden=true;heroIn();return}
 document.documentElement.style.overflow="hidden";
 const w=innerWidth,h=innerHeight,b=Math.min(w*.62,680),C=coverW(w,h),cy=h*.46,T=performance.now();
 let done=false;
 const finish=()=>{if(done)return;done=true;o.classList.add("out");document.documentElement.style.overflow="";heroIn();setTimeout(()=>{if(o.classList.contains("out")){o.hidden=true;o.innerHTML=""}},560)};
 o.onclick=finish;
 const skip=document.createElement("span");skip.className="oskip mono-t";skip.textContent="Toucher pour passer";o.appendChild(skip);
 const win=document.createElement("div");win.className="win";const ph=document.createElement("div");ph.className="ph ph-hero2 oph";win.appendChild(ph);o.appendChild(win);
 const wm=document.createElement("img");wm.className="owm";wm.src=WORD;wm.alt="";wm.style.top=(cy+b/AR/2+24)+"px";o.appendChild(wm);
 maskAt(win,b,.5,.5,w/2,cy);
 let sig;
 if(v===0){win.style.opacity=0;wm.style.opacity=0}
 if(v===1){sig=document.createElement("img");sig.className="osig";sig.src=MONOI;sig.alt="";Object.assign(sig.style,{left:(w/2-b/2)+"px",top:(cy-b/AR/2)+"px",width:b+"px"});o.appendChild(sig);win.style.opacity=0;wm.style.opacity=0}
 const Z=v===0?[1050,2350]:[1650,2900];const eo=t=>1-Math.pow(1-t,3);
 function f(t){if(done)return;const e=t-T;
  if(v===0){win.style.opacity=Math.min(1,e/450);wm.style.opacity=e<850?Math.min(1,e/450):Math.max(0,1-(e-850)/250)}
  if(v===1){const p=Math.min(1,e/1050);sig.style.clipPath=`inset(0 ${100-100*eo(p)}% 0 0)`;const q=Math.min(1,Math.max(0,(e-1100)/450));win.style.opacity=q;sig.style.opacity=1-q;
   wm.style.opacity=Math.min(1,Math.max(0,(e-650)/350))*(1-Math.min(1,Math.max(0,(e-1450)/250)))}
  if(e<Z[0])ph.style.transform=`scale(${1.3-.05*Math.min(1,e/Z[0])})`;
  else{const z=Math.min(1,(e-Z[0])/(Z[1]-Z[0])),ze=ease(z),W=b*Math.exp(Math.log(C/b)*ze),k=Math.min(1,z/.3);
   maskAt(win,W,.5+(AU-.5)*k,.5+(AV-.5)*k,w/2,cy);ph.style.transform=`scale(${1.25-.25*ze})`;
   if(z>=1){win.classList.add("free");finish();return}}
  requestAnimationFrame(f)}
 requestAnimationFrame(f);
}

/* Bandeau */
(function(){const one=["Capsule 01","Courir l'hiver","Liste d'attente ouverte","De la tête aux pieds"].map(t=>`<span>${t}</span><img src="images/mono-cream.webp" alt="">`).join("");$("marq").innerHTML=one+one})();

/* Manifeste */
(function(){const p=$("manp"),acc=["stock.","gaspillage.","inscris,","servis."];
 p.innerHTML=p.textContent.split(" ").map(w=>`<span class="w${acc.includes(w)?" acc":""}">${w}</span>`).join(" ")})();
function upManif(){if(view!=="home")return;const s=$("manif").getBoundingClientRect(),ws=[...document.querySelectorAll("#manp .w")];
 const p=Math.min(1,Math.max(0,(innerHeight*.85-s.top)/(s.height*.9)));const n=Math.round(p*ws.length);ws.forEach((w,i)=>w.classList.toggle("lit",RM||i<n))}
function upTop(){$("top").classList.toggle("solid",scrollY>40&&!(view==="home"&&scrollY<innerHeight*.85))}
function upCta(){$("stcta").classList.toggle("on",view==="prod"&&!$("sheet").classList.contains("on"))}
addEventListener("scroll",()=>requestAnimationFrame(()=>{upManif();upTop()}),{passive:true});
addEventListener("resize",upManif);

/* Apparitions au défilement */
function reveal(sel){if(RM)return;const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove("pre");io.unobserve(e.target)}}),{rootMargin:"0px 0px -10% 0px"});
 document.querySelectorAll(sel).forEach((el,i)=>{el.classList.add("pre");el.style.transitionDelay=(i%3)*110+"ms";requestAnimationFrame(()=>io.observe(el))})}

/* Passage à travers le logo */
const th=$("through"),twin=$("twin"),tph=$("tph");
function through(photo,midway){
 if(busy)return;busy=true;
 if(RM){midway();busy=false;return}
 tph.className="ph ph-"+photo;twin.classList.remove("free");th.classList.remove("fade");th.classList.add("on");
 const w=innerWidth,h=innerHeight,b=Math.min(w*.36,380),C=coverW(w,h),t0=performance.now(),D=1250;
 maskAt(twin,b*.05,AU,AV,w/2,h/2);
 function f(t){const p=Math.min(1,(t-t0)/D),e=p<.18?0:ease((p-.18)/.82);
  const k=Math.min(1,p/.18);const W0=b*(.05+.95*ease(k));
  if(p<.18)maskAt(twin,W0,AU,AV,w/2,h/2);else maskAt(twin,Math.max(W0,b*Math.exp(Math.log(C/b)*e)),AU,AV,w/2,h/2);
  tph.style.transform=`scale(${1.2-.2*e})`;
  if(p<1)requestAnimationFrame(f);else{twin.classList.add("free");midway();
   requestAnimationFrame(()=>{th.classList.add("fade");setTimeout(()=>{th.classList.remove("on","fade");busy=false},480)})}}
 requestAnimationFrame(f);
}
function show(v,keep){view=v;["home","prod","story"].forEach(k=>$("v-"+k).hidden=k!==v);document.body.classList.toggle("light",v!=="home");if(!keep)scrollTo(0,0);
 document.querySelectorAll(".top nav button").forEach(b=>b.setAttribute("aria-current",b.dataset.nav===v?"true":"false"));upTop();upCta();if(v==="home")upManif()}

/* Fiche produit */
function setMain(ph){const m=$("gph");if(RM){m.className="ph ph-"+ph;return}m.style.opacity=0;m.style.transform="scale(1.06)";setTimeout(()=>{m.className="ph ph-"+ph;m.style.opacity=1;m.style.transform="none"},250)}
function openProd(k){curP=k;const p=P[k];
 $("gph").className="ph ph-"+p.ph;$("gph").style.opacity=1;$("gph").style.transform="none";
 $("gstamp").hidden=k!=="tee";
 $("gthumbs").innerHTML=p.g.map((g,i)=>`<button type="button" aria-pressed="${i===0}" data-g="${g}" aria-label="Photo ${i+1}"><div class="ph ph-${g}"></div></button>`).join("");
 $("pcat").textContent=p.cat;$("pname").textContent=p.n;$("pprice").textContent=p.p;$("pdesc").textContent=p.d;$("pmat").textContent=p.m;
 $("pcols").innerHTML=p.c.map((c,i)=>`<button type="button" aria-pressed="${i===0}" style="background:${COL[c][0]}" aria-label="${COL[c][1]}" data-n="${COL[c][1]}"></button>`).join("");$("pcolname").textContent=COL[p.c[0]][1];
 $("psizes").innerHTML=p.s.map((s,i)=>`<button type="button" aria-pressed="${i===Math.min(1,p.s.length-1)}">${s}</button>`).join("");
 $("psizes").style.gridTemplateColumns=p.s.length===1?"repeat(3,1fr)":"";
 const m=P[p.mate];const mt=$("pmate");mt.querySelector(".ph").className="ph ph-"+m.ph;mt.querySelector("b").textContent=m.n+" · "+m.p.replace("Prix prévu ","");mt.dataset.k=p.mate;
 show("prod")}
$("gthumbs").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;$("gthumbs").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));$("gstamp").hidden=!(curP==="tee"&&b.dataset.g==="tee");setMain(b.dataset.g)});
$("pcols").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;$("pcols").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));$("pcolname").textContent=b.dataset.n});
$("psizes").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;$("psizes").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b))});
$("pmate").onclick=()=>{const k=$("pmate").dataset.k;through(P[k].ph,()=>openProd(k))};
$("crumb").onclick=()=>through("hero2",()=>{show("home");requestAnimationFrame(()=>$("capsule").scrollIntoView())});
document.querySelectorAll("[data-prod]").forEach(b=>b.onclick=()=>through(P[b.dataset.prod].ph,()=>openProd(b.dataset.prod)));
function wantProd(){const p=P[curP];const col=$("pcolname").textContent,sz=$("psizes").querySelector('[aria-pressed="true"]').textContent;
 openSheet({k:curP,title:p.n,sub:col+" · "+(sz==="Unique"?"taille unique":"taille "+sz),ph:p.ph,produit:p.n,taille:sz,coloris:col})}
$("pwant").onclick=wantProd;$("stbtn").onclick=wantProd;

/* Ton idée */
const IDEAS=["Hoodie épais","Sweat oversize","Legging","Short de running","Jogging","Veste coupe-vent","Bonnet","Chaussettes","Sac à dos"];
$("ichips").innerHTML=IDEAS.map(t=>`<button type="button" aria-pressed="false">${t}</button>`).join("");
$("ichips").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")!=="true");$("ierr").textContent=""});
$("isend").onclick=()=>{const ch=[...$("ichips").querySelectorAll('[aria-pressed="true"]')].map(b=>b.textContent),o=$("iother").value.trim();if(o)ch.push(o);
 if(!ch.length){$("ierr").textContent="Choisis au moins une pièce, ou écris ton idée.";return}
 openSheet({k:"idee",title:"Ton idée",sub:ch.join(" · "),ph:"jetty",idea:true,produit:"Idée : "+ch.join(", ")})};

/* Fenêtre « Je le veux » */
let lastFocus=null,SEL={};
const BREVO="https://7f12e7c8.sibforms.com/serve/MUIFAGHKZqC7yo43M3zpo7qzrqxv0uXQ95rFDWXbd1syF_FIbv7JqjCN_f_eaLIZkIgSwPkwBWixVihx9qFxim6pJfihxTarHGpnwdQBNrXgbfKVUZx2RjHDDRitXrp58t3U-6HzBqNrub7pRoRiM6DEl42T-FUezdm6sKKMfitAzUbQZqnbepevT_qyx32OFABhkUH6Qi-PTSY22Q==";
function openSheet(o){lastFocus=document.activeElement;SEL=o;
 $("shsum").innerHTML=(o.img?`<img src="${o.img}" alt="">`:`<div class="ph ph-${o.ph}"></div>`)+`<div><b>${o.title}</b><small>${o.sub}</small></div>`;
 $("shform").hidden=false;$("shok").hidden=true;$("sht").textContent=o.idea?"Ton idée":"Je le veux";$("shkind").textContent=o.idea?"Ta prochaine pièce":"Liste d'attente";$("fokt").textContent=o.idea?"J'accepte d'être prévenu par e-mail si cette pièce voit le jour. Désinscription en un clic, à tout moment.":"J'accepte d'être prévenu par e-mail de la sortie de cette pièce. Désinscription en un clic, à tout moment.";$("sheet").dataset.idea=o.idea?"1":"";$("ferr").textContent="";$("fsend").classList.remove("done");$("sheet").dataset.title=o.title;
 $("sheet").classList.add("on");$("scrim").classList.add("on");$("sheet").setAttribute("aria-hidden","false");upCta();setTimeout(()=>$("fname").focus(),RM?0:450)}
function closeSheet(){$("sheet").classList.remove("on");$("scrim").classList.remove("on");$("sheet").setAttribute("aria-hidden","true");upCta();if(lastFocus)lastFocus.focus()}
$("shx").onclick=closeSheet;$("scrim").onclick=closeSheet;$("okclose").onclick=closeSheet;
addEventListener("keydown",e=>{if(e.key==="Escape"&&$("sheet").classList.contains("on"))closeSheet()});
$("shform").addEventListener("submit",e=>{e.preventDefault();const n=$("fname").value.trim(),m=$("fmail").value.trim();
 if(!n){$("ferr").textContent="Indique ton prénom.";$("fname").focus();return}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m)){$("ferr").textContent="Cette adresse e-mail ne semble pas valide.";$("fmail").focus();return}
 if(!$("fok").checked){$("ferr").textContent="Coche la case pour être prévenu par e-mail.";return}
 $("ferr").textContent="";$("fsend").classList.add("done");$("fsend").disabled=true;
 const s=SEL,f=new FormData();
 f.append("EMAIL",m);f.append("PRENOM",n);f.append("PRODUIT",s.produit);f.append("TAILLE",s.taille||"");f.append("COLORIS",s.coloris||"");
 f.append("email_address_check","");f.append("locale","fr");f.append("html_type","simple");
 fetch(BREVO+"?isAjax=1",{method:"POST",mode:"no-cors",body:f}).then(()=>{
  setTimeout(()=>{$("shform").hidden=true;$("shok").hidden=false;$("okt").textContent="C'est noté, "+n+" !";
   $("okp").textContent=$("sheet").dataset.idea?"Merci pour ton idée ! Les pièces les plus demandées seront les prochaines fabriquées. Tu veux en parler ? Écris-moi directement.":"Tu fais partie de la liste pour « "+$("sheet").dataset.title+" ». Tu recevras un e-mail dès que la série est lancée. Une question ? Écris-moi directement.";},RM?0:400)
 }).catch(()=>{$("fsend").classList.remove("done");$("ferr").textContent="L'envoi n'a pas fonctionné. Vérifie ta connexion et réessaie, ou écris-moi sur Instagram."}).finally(()=>{$("fsend").disabled=false})});

/* Navigation */
document.addEventListener("click",e=>{const b=e.target.closest("[data-nav]");if(!b)return;const t=b.dataset.nav;
 if(t==="capsule"){if(view==="home"){$("capsule").scrollIntoView({behavior:RM?"auto":"smooth"});return}through("tee",()=>{show("home");requestAnimationFrame(()=>$("capsule").scrollIntoView())});return}
 if(t==="home"){if(view==="home"){scrollTo({top:0,behavior:RM?"auto":"smooth"});return}through("hero2",()=>show("home"));return}
 if(t==="idee"){if(view==="home"){$("idee").scrollIntoView({behavior:RM?"auto":"smooth"});return}through("jetty",()=>{show("home");requestAnimationFrame(()=>$("idee").scrollIntoView())});return}
 if(t==="story"){through("hikers",()=>show("story"));return}});

/* Curseur */
(function(){if(matchMedia("(hover:none),(pointer:coarse)").matches)return;const c=$("cur");let x=-100,y=-100,tx=-100,ty=-100;
 addEventListener("pointermove",e=>{tx=e.clientX;ty=e.clientY;c.style.opacity=1;const t=e.target.closest("[data-cursor]");c.classList.toggle("big",!!t);if(t)c.firstElementChild.textContent=t.dataset.cursor});
 (function f(){x+=(tx-x)*.2;y+=(ty-y)*.2;c.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(f)})()})();

reveal(".how .up");upManif();upTop();opening(openV);
})();
