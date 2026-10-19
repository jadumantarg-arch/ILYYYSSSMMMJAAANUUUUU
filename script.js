/* ===== EDIT THESE (nothing here is invented — replace placeholders with your own words) ===== */
const CONFIG={
  lilyMessages:["MERIII JAAAANNUUUUU","JUIIIIIII BABUUUUUU","BAUNIIIIIIIII","MERAAAA BACCCHAAAAA","SHISHUPAL KI MUMMYYYY 🤭","MERIII BIWIIIIII 💋","MERAAA DIHHHMANNNNN","MERIII FORVEAHHHH"],
  photos:["","","","","",""],            // e.g. "assets/photo1.jpg" (put images in assets/)
  captions:["","","","","",""],
  nicknames:["[add a nickname]","[add a nickname]"],
  loves:["[something you love about her]"],
  memories:["[a favourite memory — your words]"],
  farApart:["[a message for when you're apart]"],
  birthdayWish:"[Write your heartfelt birthday wish here]"
};
/* ========================================================================================= */
const $=s=>document.querySelector(s),rnd=(a,b)=>a+Math.random()*(b-a);
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const params=new URLSearchParams(location.search);

/* lily svg */
function lily(pink){
  const c1=pink?"#ffd3e3":"#ffffff",c2=pink?"#e0709a":"#f3e6ee";let p="";
  for(let i=0;i<6;i++)p+=`<path transform="rotate(${i*60} 50 50)" d="M50 50C36 34 40 12 50 3C60 12 64 34 50 50Z" fill="url(#g${pink?1:0})" stroke="${pink?"#c4568a":"#d9c3d0"}" stroke-width=".6"/><path transform="rotate(${i*60} 50 50)" d="M50 48V12" stroke="${pink?"#c4568a":"#e5d2dc"}" stroke-width=".5" opacity=".6"/>`;
  let s="";for(let i=0;i<5;i++)s+=`<line x1="50" y1="50" x2="${50+16*Math.sin(i*1.3)}" y2="${50-16*Math.cos(i*1.3)}" stroke="#b97a4a" stroke-width=".8"/><circle cx="${50+16*Math.sin(i*1.3)}" cy="${50-16*Math.cos(i*1.3)}" r="2" fill="#e39a3b"/>`;
  return `<svg viewBox="0 0 100 100"><defs><radialGradient id="g${pink?1:0}" cx="50%" cy="85%" r="90%"><stop offset="0" stop-color="${pink?"#fff":"#f5f0c8"}"/><stop offset=".4" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs>${p}${s}</svg>`;
}
function plant(box,n,interactive){
  const w=box.clientWidth||innerWidth;
  for(let i=0;i<n;i++){
    const el=document.createElement(interactive?"button":"div");el.className="lily";
    const size=rnd(60,100),pink=Math.random()>.45,h=rnd(50,box.clientHeight?box.clientHeight*.7:140);
    el.style.cssText=`left:${(i+rnd(.1,.8))/n*100}%;width:${size}px;margin-left:-${size/2}px;bottom:0;--h:${h}px;animation-delay:${-rnd(0,5)}s;animation-duration:${rnd(4,7)}s;`;
    el.innerHTML=`<span class="stem"></span>`+lily(pink);
    el.firstChild.style.top=`${size*.7}px`;
    el.style.height=`${h+size*.7}px`;el.style.bottom=`${rnd(0,18)}px`;
    if(interactive){el.setAttribute("aria-label","Tap this lily for a message");let k=i;
      el.onclick=()=>{el.classList.remove("pop");void el.offsetWidth;el.classList.add("pop");const m=CONFIG.lilyMessages;showToast(m[(k++)%m.length])};}
    box.appendChild(el);
  }
}
let tt;function showToast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>e.classList.remove("show"),4200)}
document.querySelectorAll(".garden[data-lilies]").forEach(g=>plant(g,+g.dataset.lilies,false));
plant($("#play"),8,true);

/* petals + fairy lights */
const fx=$("#fx");
function spawn(n){for(let i=0;i<n;i++){
  const p=document.createElement("span");p.className="petal";
  p.style.cssText=`left:${rnd(0,100)}%;--dx:${rnd(-80,80)}px;animation-duration:${rnd(9,18)}s;animation-delay:${-rnd(0,15)}s;transform:scale(${rnd(.6,1.2)})`;fx.appendChild(p);}
  for(let i=0;i<n;i++){const g=document.createElement("span");g.className="glow";g.style.cssText=`left:${rnd(0,100)}%;top:${rnd(0,100)}%;animation-delay:${-rnd(0,3)}s;animation-duration:${rnd(2,5)}s`;fx.appendChild(g);}}
spawn(reduce?8:(innerWidth<700?12:22));

/* music */
const song=$("#song"),pb=$("#playBtn"),pl=$("#player"),msg=$("#musicMsg");
function say(t){msg.textContent=t}
const SONG_START=0; /* seconds into the song where it should begin, e.g. 83 for 1:23 */
let startSet=false;
pb.onclick=async()=>{
  if(!startSet){startSet=true;const s=()=>{try{song.currentTime=SONG_START}catch(e){}};song.readyState>0?s():song.addEventListener("loadedmetadata",s,{once:true})}
  if(song.paused){try{await song.play();pb.textContent="❚❚";pb.setAttribute("aria-label","Pause");pl.classList.add("playing");say("playing ♡")}
    catch(e){say("Couldn't play the song. Check assets/our-song.mp3 exists, then tap again.")}}
  else{song.pause();pb.textContent="▶";pl.classList.remove("playing");say("paused")}
};
$("#muteBtn").onclick=e=>{song.muted=!song.muted;e.currentTarget.classList.toggle("off",song.muted);say(song.muted?"muted":"sound on")};
$("#loopBtn").onclick=e=>{song.loop=!song.loop;e.currentTarget.setAttribute("aria-pressed",song.loop);say(song.loop?"loop on":"loop off")};
song.addEventListener("error",()=>say("Song file not found. Put it at assets/our-song.mp3"));
song.addEventListener("ended",()=>{pb.textContent="▶";pl.classList.remove("playing")});

/* opening + letter */
$("#openBtn").onclick=()=>{$("#letterSec").scrollIntoView({behavior:reduce?"auto":"smooth"});say("Tap ▶ whenever you want our song")};
$("#letterBody").textContent=$("#letterSource").textContent.replace(/^\n/,"").replace(/\n$/,"");
$("#envelope").onclick=e=>{
  const env=e.currentTarget;if(env.classList.contains("open"))return;env.classList.add("open");
  setTimeout(()=>{const p=$("#paper");p.hidden=false;p.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"})},reduce?0:1000);
};

/* our little world */
;

/* birthday */
const now=new Date(),isB=(now.getMonth()===10&&now.getDate()===12)||params.get("preview")==="birthday";
if(isB){
  $("#revealBox").hidden=false;document.body.classList.add("bday");
  if(!reduce)spawn(14);
  const b=$("#bday");let done=0;
  const obs=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!done){done=1;const d=document.createElement("div");d.className="garden bloom";d.dataset.lilies=14;b.appendChild(d);plant(d,14,false)}},{threshold:.3});obs.observe(b);
  $("#wishBtn").onclick=()=>{const w=$("#wish");w.textContent=CONFIG.birthdayWish;w.hidden=false;if(!reduce)spawn(24)};
}else{
  $("#bday").style.display="none";
}
