// ============================================================
// REDUX PICKER — app.js (Supabase, YouTube плеер, hover-видео)
// ============================================================

const SUPABASE_URL = 'https://pdpmorawwynhkoxunzyn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkcG1vcmF3d3luaGtveHVuenluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MzkzNTQsImV4cCI6MjEwMjMxNTM1NH0.HiV97Jc5iIsdWn7RxBLSee9KhUwClc2qzxHBRZKJ8zU';

let sb = null;
let DB = [];

const supaScript = document.createElement('script');
supaScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
document.head.appendChild(supaScript);

const COLORS=[
{n:"все",v:"all",h:null},{n:"розовый",v:"розовый",h:"#ff4d9d"},{n:"оранжевый",v:"оранжевый",h:"#ff9800"},
{n:"жёлтый",v:"жёлтый",h:"#ffeb3b"},{n:"зелёный",v:"зелёный",h:"#4CAF50"},{n:"голубой",v:"голубой",h:"#B3E5FC"},
{n:"циан",v:"циан",h:"#00ffcc"},{n:"синий",v:"синий",h:"#4d9fff"},{n:"фиолетовый",v:"фиолетовый",h:"#c04dff"},
{n:"коричневый",v:"коричневый",h:"#8d6e63"},{n:"тёмный",v:"тёмный",h:"#37474F"},{n:"белый",v:"белый",h:"#f5f5f5"},
];

const GENERIC_NAMES = [
  'update','redux','preset','presets','files','file','download',
  'gta5','gta 5','мод','мода','моды','mods','mod','reshade',
  'graphics','graphic','setting','settings','config','v1','v2',
  'v3','v4','v5','final','new','test','скачать','папка','folder',
  'installation','install','rar','zip','archive','архив',
  'мой диск','my drive','shared','shared with me'
];

function cleanFilename(name){
  if(!name)return '';
  return name.replace(/\.(rar|zip|7z|tar|gz|exe|iso|mp4|avi)$/i,'').trim();
}

function isGenericName(name){
  if(!name)return true;
  var cleaned=cleanFilename(name).toLowerCase().trim();
  if(cleaned.length<3)return true;
  if(GENERIC_NAMES.indexOf(cleaned)!==-1)return true;
  for(var i=0;i<GENERIC_NAMES.length;i++){
    var g=GENERIC_NAMES[i];
    if(new RegExp('^'+g+'\\s*[v]?\\d*$','i').test(cleaned))return true;
    if(new RegExp('^'+g+'\\s*(final|new|test)$','i').test(cleaned))return true;
  }
  return false;
}

function getEmoji(r){return r.type==='redux'?'✨':'💫'}
function extractYtId(url){
  if(!url)return '';
  var m=url.match(/(?:youtu\.be\/|v=|shorts\/)([a-zA-Z0-9_-]{11})/);
  return m?m[1]:'';
}

let ST={search:'',color:'all',author:'all',sort:'popular',type:'all'};
let currentUser=null,favorites=[];
let userRatings={};
let authMode='login';

async function loadMods(){
  if(!sb)return;
  try{
    const {data,error}=await sb.from('mods').select('*').order('created_at',{ascending:false});
    if(error)throw error;
    DB=data.map(function(r){
      var displayName=r.name;
      if(r.drive_filename){
        var cleaned=cleanFilename(r.drive_filename);
        if(cleaned&&!isGenericName(cleaned))displayName=cleaned;
      }
      return {
        id:r.id,type:r.type||'redux',name:displayName,author:r.author,
        color:r.color,colorName:r.color_name,
        rating:parseFloat(r.rating)||5.0,votes:r.votes||0,dl:r.downloads||0,
        date:r.created_at?r.created_at.split('T')[0]:new Date().toISOString().split('T')[0],
        badge:r.badge,tags:r.tags||[],desc:r.description||'',
        palette:r.palette&&r.palette.length?r.palette:[r.color,r.color,r.color,r.color],
        link:r.drive_url,preview:r.preview_image||'',youtube:r.youtube_url||''
      };
    });
    return true;
  }catch(e){
    console.error('❌ Ошибка загрузки модов:',e);
    return false;
  }
}

function setupRealtime(){
  if(!sb)return;
  sb.channel('mods_changes')
    .on('postgres_changes',{event:'*',schema:'public',table:'mods'},async function(){
      await loadMods();
      renderGrid();
      renderDayCard();
      renderMarquee();
      initFilters();
      animateStats();
    })
    .subscribe();
  sb.channel('settings_changes')
    .on('postgres_changes',{event:'*',schema:'public',table:'site_settings'},function(){
      renderDayCard();
    })
    .subscribe();
}

// CURSOR
const cMain=document.getElementById('cursorMain'),cDot=document.getElementById('cursorDot'),cLabel=document.getElementById('cursorLabel');
let mx=0,my=0,cx=0,cy=0;
document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;cDot.style.left=mx+'px';cDot.style.top=my+'px';cLabel.style.left=mx+'px';cLabel.style.top=my+'px'});
function animCursor(){cx+=(mx-cx)*.15;cy+=(my-cy)*.15;cMain.style.left=cx+'px';cMain.style.top=cy+'px';requestAnimationFrame(animCursor)}
animCursor();

function bindHovers(){
document.querySelectorAll('a,button,input,select,.color-pill,.card-fav,.palette-dot,.day-tag,.detail-stars i,.marquee-item,.type-btn,.card-author-link,.detail-author-link,.day-author').forEach(function(el){
  if(el.classList.contains('redux-card')||el.classList.contains('redux-card-wrapper'))return;
  el.onmouseenter=function(){cMain.classList.add('hover');cMain.classList.remove('card-hover')};
  el.onmouseleave=function(){cMain.classList.remove('hover');cLabel.classList.remove('visible')};
});
document.querySelectorAll('.redux-card-wrapper').forEach(function(el){
  el.addEventListener('mouseenter',function(){cMain.classList.add('card-hover');cMain.classList.remove('hover');cLabel.textContent='open';cLabel.classList.add('visible')});
  el.addEventListener('mouseleave',function(){cMain.classList.remove('card-hover');cLabel.classList.remove('visible')});
});
}

// BRANCHES
var isLowPerf=navigator.hardwareConcurrency&&navigator.hardwareConcurrency<4;
function updateBranches(){
if(isLowPerf)return;
var tl=document.getElementById('branchTL'),br=document.getElementById('branchBR');
if(!tl||!br)return;
var tlDist=Math.sqrt(mx*mx+my*my),maxD=400;
if(tlDist<maxD){var f=(maxD-tlDist)/maxD;tl.style.transform='translate('+(-mx*f*0.15)+'px,'+(-my*f*0.15)+'px) rotate('+(-f*8)+'deg)'}
else{tl.style.transform='translate(0,0) rotate(0)'}
var brDx=mx-innerWidth,brDy=my-innerHeight,brDist=Math.sqrt(brDx*brDx+brDy*brDy);
if(brDist<maxD){var f2=(maxD-brDist)/maxD;br.style.transform='translate('+(-brDx*f2*0.15)+'px,'+(-brDy*f2*0.15)+'px) rotate('+(180+f2*8)+'deg)'}
else{br.style.transform='translate(0,0) rotate(180deg)'}
}
if(!isLowPerf)setInterval(updateBranches,50);

// PARTICLES
var pCanvas=document.getElementById('particlesCanvas'),pCtx=pCanvas.getContext('2d');
var particles=[],pMouse={x:-999,y:-999},particlesRunning=true;
function resizePCanvas(){pCanvas.width=innerWidth;pCanvas.height=innerHeight}
resizePCanvas();addEventListener('resize',resizePCanvas);
document.addEventListener('mousemove',function(e){pMouse.x=e.clientX;pMouse.y=e.clientY});

function Particle(){this.reset();this.y=Math.random()*pCanvas.height}
Particle.prototype.reset=function(){
this.x=Math.random()*pCanvas.width;this.y=Math.random()*pCanvas.height;
this.size=Math.random()*2.5+.8;this.bvx=(Math.random()-.5)*.25;this.bvy=(Math.random()-.5)*.25;
this.vx=this.bvx;this.vy=this.bvy;this.hue=Math.random()*80+280;
};
Particle.prototype.update=function(){
var dx=this.x-pMouse.x,dy=this.y-pMouse.y,dist=Math.sqrt(dx*dx+dy*dy);
if(dist<150){var f=(150-dist)/150;this.vx+=(dx/dist)*f*.5;this.vy+=(dy/dist)*f*.5}
this.vx+=(this.bvx-this.vx)*.03;this.vy+=(this.bvy-this.vy)*.03;
this.x+=this.vx;this.y+=this.vy;
if(this.x<0)this.x=pCanvas.width;if(this.x>pCanvas.width)this.x=0;
if(this.y<0)this.y=pCanvas.height;if(this.y>pCanvas.height)this.y=0;
};
Particle.prototype.draw=function(){
var isDark=document.documentElement.dataset.theme==='dark';
pCtx.beginPath();pCtx.arc(this.x,this.y,this.size,0,Math.PI*2);
pCtx.fillStyle='hsla('+this.hue+',75%,'+(isDark?75:45)+'%,'+(isDark?.55:.25)+')';pCtx.fill();
};

function initParticles(){particles=[];var c=isLowPerf?60:Math.min(120,Math.floor(pCanvas.width*pCanvas.height/15000));for(var i=0;i<c;i++)particles.push(new Particle())}
initParticles();addEventListener('resize',initParticles);

function animParticles(){
if(!particlesRunning){requestAnimationFrame(animParticles);return}
pCtx.clearRect(0,0,pCanvas.width,pCanvas.height);
var isDark=document.documentElement.dataset.theme==='dark';
var i,j,dx,dy,d;
for(i=0;i<particles.length;i++){particles[i].update();particles[i].draw()}
for(i=0;i<particles.length;i++)for(j=i+1;j<particles.length;j++){
  dx=particles[i].x-particles[j].x;dy=particles[i].y-particles[j].y;d=Math.sqrt(dx*dx+dy*dy);
  if(d<110){pCtx.beginPath();pCtx.strokeStyle='hsla(320,60%,'+(isDark?70:40)+'%,'+(0.12*(1-d/110))+')';pCtx.lineWidth=.6;pCtx.moveTo(particles[i].x,particles[i].y);pCtx.lineTo(particles[j].x,particles[j].y);pCtx.stroke()}
}
requestAnimationFrame(animParticles)}
animParticles();
document.addEventListener('visibilitychange',function(){particlesRunning=!document.hidden});

// WIND
function initWind(){
if(isLowPerf)return;
var wind=document.getElementById('wind');
function makeWind(){
  var line=document.createElement('div');line.className='wind-line';
  line.style.top=(Math.random()*100)+'%';
  line.style.animationDuration=(6+Math.random()*4)+'s';
  line.style.width=(200+Math.random()*400)+'px';
  wind.appendChild(line);
  setTimeout(function(){line.remove()},12000);
}
setInterval(makeWind,2500);
for(var i=0;i<3;i++)setTimeout(makeWind,i*800);
}

// PETALS
var petalEmojis=['🌸','🌺','💮'];
function spawnPetal(){
var p=document.createElement('div');p.className='petal';
p.textContent=petalEmojis[Math.floor(Math.random()*petalEmojis.length)];
p.style.left=Math.random()*100+'%';
p.style.fontSize=(Math.random()*1+.8)+'rem';
var dur=(Math.random()*8+10);
p.style.animationDuration=dur+'s';
p.style.filter='blur('+(Math.random()*1.5)+'px)';
document.body.appendChild(p);
setTimeout(function(){p.remove()},(dur+2)*1000);
}
function startPetals(){
if(isLowPerf)return;
for(var i=0;i<8;i++)setTimeout(spawnPetal,i*300);
setInterval(spawnPetal,1200);
}

function runLoading(){
var bar=document.getElementById('loadingBar'),text=document.getElementById('loadingText'),sakura=document.getElementById('loadingSakura');
for(var i=0;i<35;i++){
  var p=document.createElement('div');p.className='load-petal';
  p.textContent=petalEmojis[Math.floor(Math.random()*petalEmojis.length)];
  var side=Math.random();
  if(side<.25){p.style.left=Math.random()*18+'%';p.style.top=Math.random()*100+'%'}
  else if(side<.5){p.style.right=Math.random()*18+'%';p.style.top=Math.random()*100+'%'}
  else if(side<.75){p.style.top=Math.random()*18+'%';p.style.left=Math.random()*100+'%'}
  else{p.style.bottom=Math.random()*18+'%';p.style.left=Math.random()*100+'%'}
  p.style.animationDelay=Math.random()*4+'s';p.style.opacity=.15+Math.random()*.35;
  p.style.fontSize=(1.2+Math.random()*2.5)+'rem';
  sakura.appendChild(p);
}
var msgs=['loading mods...','connecting database...','rendering interface...','almost ready...','welcome 🌸'];
var pct=0,mi=0;
var iv=setInterval(function(){
  pct+=Math.random()*15+5;if(pct>100)pct=100;
  bar.style.width=pct+'%';
  if(pct>mi*25&&mi<msgs.length){text.textContent=msgs[mi];mi++}
  if(pct>=100){clearInterval(iv);setTimeout(function(){document.getElementById('loadingScreen').classList.add('hidden');setTimeout(showMain,600)},500)}
},200);
}

async function waitForSupabase(){
  return new Promise(function(resolve){
    if(window.supabase){resolve();return}
    supaScript.onload=function(){resolve()};
  });
}

async function showMain(){
  await waitForSupabase();
  sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
  await loadMods();
  setupRealtime();
  
  var ids=['navbar','hero','reduxDay','trendingMarquee','catalog','about','footer'];
  ids.forEach(function(id,i){
    setTimeout(function(){var el=document.getElementById(id);if(el){el.style.opacity='1';el.style.transition='opacity .5s'}},i*120);
  });
  var footer=document.getElementById('footer');
  if(footer){
    footer.innerHTML='<p>© 2026 REDUX PICKER by <a href="https://www.youtube.com/@thagreatest" target="_blank" style="color:var(--s1);font-weight:700">@thagreatest</a></p><p>🌸 Все моды принадлежат их авторам</p>';
  }
  var catSel=document.getElementById('catSel');
  if(catSel)catSel.style.display='none';

  startPetals();initWind();
  setupNavbar();setupTheme();
  renderDayCard();renderMarquee();initFilters();initTypeSwitcher();renderGrid();
  setupModals();setupAuth();bindHovers();animateStats();
  setupMagnetic();setupPages();setupTelegram();loadUserData();
}

function toast(msg){
var c=document.getElementById('toastContainer'),t=document.createElement('div');
t.className='toast';t.innerHTML=msg;c.appendChild(t);
setTimeout(function(){t.style.opacity='0';t.style.transform='translateX(100px)';t.style.transition='all .3s';setTimeout(function(){t.remove()},300)},3500);
}

function spawnConfetti(){
var emojis=['🌸','✨','💖','🎉','⭐','💫','🌺'];
for(var i=0;i<35;i++){
  var c=document.createElement('div');c.className='confetti';
  c.textContent=emojis[Math.floor(Math.random()*emojis.length)];
  c.style.left=Math.random()*100+'%';c.style.top='-5%';
  c.style.animationDuration=(Math.random()*2+2)+'s';c.style.animationDelay=Math.random()*.5+'s';
  document.body.appendChild(c);setTimeout(function(){c.remove()},4000);
}}

function setupNavbar(){addEventListener('scroll',function(){document.getElementById('navbar').classList.toggle('scrolled',scrollY>50)})}

function setupTheme(){
document.getElementById('themeBtn').addEventListener('click',function(){
  var html=document.documentElement;
  html.classList.add('theme-switching');
  var isDark=html.dataset.theme==='dark';
  html.dataset.theme=isDark?'light':'dark';
  localStorage.setItem('rdx_theme',html.dataset.theme);
  requestAnimationFrame(function(){setTimeout(function(){html.classList.remove('theme-switching')},100)});
});
var saved=localStorage.getItem('rdx_theme');
if(saved)document.documentElement.dataset.theme=saved;
}

function animateStats(){
var totalMods=DB.length;
var uniqueAuthors=[];
DB.forEach(function(r){if(uniqueAuthors.indexOf(r.author)===-1)uniqueAuthors.push(r.author)});
var totalDownloads=DB.reduce(function(sum,r){return sum+r.dl},0);
animateNum('statMods',totalMods);
animateNum('statAuthors',uniqueAuthors.length);
animateNum('statDownloads',totalDownloads);
}

function animateNum(id,target){
var el=document.getElementById(id);
if(!el)return;
var current=parseInt((el.textContent||'0').replace(/\D/g,''))||0;
var start=performance.now(),dur=800,startVal=current;
function upd(t){
  var p=Math.min((t-start)/dur,1);
  var val=Math.floor(startVal+(target-startVal)*(1-Math.pow(1-p,3)));
  el.textContent=val>=1000?val.toLocaleString('ru'):val;
  if(p<1)requestAnimationFrame(upd);
}
requestAnimationFrame(upd);
}

function setupMagnetic(){
document.querySelectorAll('.magnetic').forEach(function(b){
  b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+(((e.clientX-r.left-r.width/2)*.12))+'px,'+(((e.clientY-r.top-r.height/2)*.12))+'px) scale(1.05)'});
  b.addEventListener('mouseleave',function(){b.style.transform=''});
});}

async function renderDayCard(){
if(DB.length===0){document.getElementById('reduxDay').innerHTML='';return}
var r=null;
if(sb){
  try{
    const {data,error}=await sb.from('site_settings').select('value').eq('key','mod_of_day_id').single();
    if(!error&&data&&data.value){
      var dayId=parseInt(data.value);
      r=DB.find(function(m){return m.id===dayId});
    }
  }catch(e){}
}
if(!r){
  r=DB.reduce(function(a,b){
    if(b.rating>a.rating)return b;
    if(b.rating===a.rating){
      if(b.votes>a.votes)return b;
      if(b.votes===a.votes&&b.dl>a.dl)return b;
    }
    return a;
  });
}
var emoji=getEmoji(r);
document.getElementById('reduxDay').innerHTML=
'<div class="day-card">'+
'<div class="day-preview" style="background:linear-gradient(135deg,'+r.color+'11,'+r.color+'33)">'+
(r.preview?'<img src="'+r.preview+'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.7" onerror="this.remove()">':'')+
'<div class="day-preview-icon">'+emoji+'</div></div>'+
'<div class="day-content">'+
'<div class="day-badge">⭐ Мод дня</div>'+
'<h2 class="day-title">'+r.name+'</h2>'+
'<div class="day-author" data-author="'+r.author+'"><i class="fas fa-user" style="color:var(--s2)"></i> '+r.author+' · <i class="fas fa-star" style="color:var(--s1)"></i> '+r.rating+'</div>'+
'<p class="day-desc">'+r.desc+'</p>'+
'<div class="day-actions">'+
'<button class="day-btn" data-id="'+r.id+'"><i class="fas fa-eye"></i> Подробнее</button>'+
'<div class="day-tags-inline">'+r.tags.slice(0,3).map(function(t){return '<span class="day-tag">'+t+'</span>'}).join('')+'</div>'+
'</div></div></div>';
var dayAuthorEl=document.querySelector('.day-author[data-author]');
if(dayAuthorEl)dayAuthorEl.addEventListener('click',function(){openAuthorPage(dayAuthorEl.dataset.author)});
var dayBtn=document.querySelector('.day-btn[data-id]');
if(dayBtn)dayBtn.addEventListener('click',function(){openDetail(getReduxById(parseInt(dayBtn.dataset.id)))});
bindHovers();
}

function getReduxById(id){return DB.find(function(r){return r.id===id})}

function renderMarquee(){
if(DB.length===0){document.getElementById('marqueeTrack').innerHTML='';return}
var sorted=DB.slice().sort(function(a,b){return b.dl-a.dl}).slice(0,10);
var items=sorted.map(function(r,i){
  return '<span class="marquee-item" data-id="'+r.id+'"><span class="rank">#'+(i+1)+'</span> <span class="emoji">'+getEmoji(r)+'</span> <span>'+r.name+'</span></span>';
}).join('<span class="marquee-sep">·</span>');
document.getElementById('marqueeTrack').innerHTML=items+'<span class="marquee-sep">·</span>'+items;
document.querySelectorAll('.marquee-item').forEach(function(el){
  el.addEventListener('click',function(){var r=DB.find(function(x){return x.id==el.dataset.id});if(r)openDetail(r)});
});
bindHovers();
}

function initTypeSwitcher(){
document.querySelectorAll('.type-btn').forEach(function(b){
  if(b.dataset.type==='revik')b.innerHTML='💫 REV';
  b.addEventListener('click',function(e){
    e.preventDefault();e.stopPropagation();
    document.querySelectorAll('.type-btn').forEach(function(x){x.classList.remove('active')});
    b.classList.add('active');
    ST.type=b.dataset.type;
    renderGrid();
  });
});
}

function initFilters(){
var au=[];DB.forEach(function(r){if(au.indexOf(r.author)===-1)au.push(r.author)});au.sort();
var as=document.getElementById('authorSel');
as.innerHTML='<option value="all">Все авторы</option>';
au.forEach(function(a){var o=document.createElement('option');o.value=a;o.textContent=a;as.appendChild(o)});
var cp=document.getElementById('colorPills');
if(cp.children.length===0){
  COLORS.forEach(function(c){
    var b=document.createElement('button');b.className='color-pill'+(c.v==='all'?' all-c active':'');
    b.title=c.n;if(c.h)b.style.background=c.h;
    b.onclick=function(){document.querySelectorAll('.color-pill').forEach(function(x){x.classList.remove('active')});b.classList.add('active');ST.color=c.v;renderGrid()};
    cp.appendChild(b);
  });
}
var dt;
var searchIn=document.getElementById('searchIn');
if(searchIn){searchIn.oninput=function(e){clearTimeout(dt);dt=setTimeout(function(){ST.search=e.target.value.toLowerCase().trim();renderGrid()},200)}}
document.getElementById('authorSel').onchange=function(e){ST.author=e.target.value;renderGrid()};
var sortSel=document.getElementById('sortSel');
if(sortSel)sortSel.onchange=function(e){ST.sort=e.target.value;renderGrid()};
}

function renderGrid(target){
if(!target)target='bentoGrid';
var list=DB.slice();

if(target==='bentoGrid'){
  if(ST.type!=='all')list=list.filter(function(r){return r.type===ST.type});
  if(ST.search)list=list.filter(function(r){return r.name.toLowerCase().indexOf(ST.search)!==-1||r.author.toLowerCase().indexOf(ST.search)!==-1||r.tags.some(function(t){return t.indexOf(ST.search)!==-1})});
  if(ST.color!=='all')list=list.filter(function(r){return r.colorName===ST.color});
  if(ST.author!=='all')list=list.filter(function(r){return r.author===ST.author});
  switch(ST.sort){
    case'popular':list.sort(function(a,b){return b.dl-a.dl});break;
    case'rating':list.sort(function(a,b){return b.rating-a.rating});break;
    case'new':list.sort(function(a,b){return new Date(b.date)-new Date(a.date)});break;
    case'name':list.sort(function(a,b){return a.name.localeCompare(b.name)});break;
  }
}else if(target==='favGrid'){
  list=DB.filter(function(r){return favorites.indexOf(r.id)!==-1});
}else if(target==='authorGrid'){
  list=window._authorGridList||[];
}

var grid=document.getElementById(target);grid.innerHTML='';

if(list.length===0){
  if(target==='favGrid'){
    grid.innerHTML='<div class="fav-empty" style="grid-column:1/-1"><div class="fav-empty-icon">💔</div><h3>Пусто</h3><p>'+(currentUser?'Ты ещё не добавил ничего в избранное':'Войди в аккаунт чтобы сохранять моды')+'</p>'+(!currentUser?'<button class="btn-primary" onclick="document.getElementById(\'authBtn\').click()"><i class="fas fa-user"></i> Войти</button>':'<button class="btn-primary" onclick="goToCatalog()"><i class="fas fa-th-large"></i> К каталогу</button>')+'</div>';
  }else{
    grid.innerHTML='<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🌸</div><h3>Пока нет модов</h3><p>Скоро тут появятся крутые редуксы и REV</p></div>';
  }
  updateFavBadge();return;
}

var BATCH=9;
var rendered=0;
function renderBatch(){
var batch=list.slice(rendered,rendered+BATCH);
batch.forEach(function(r,i){
  var wrapper=document.createElement('div');
  wrapper.className='redux-card-wrapper';
  wrapper.style.animationDelay=(i*.04)+'s';
  var card=document.createElement('div');
  card.className='redux-card';
  var isFav=favorites.indexOf(r.id)!==-1;
  var badge=r.badge?'<div class="card-badge badge-'+r.badge+'">'+(r.badge==='new'?'✨ new':r.badge==='hot'?'🔥 hot':'⭐ top')+'</div>':'';
  var typeBadge=r.type==='redux'?'<div class="card-type-badge type-redux">✨ Redux</div>':'<div class="card-type-badge type-revik">💫 REV</div>';
  var starsDisplay='';
  for(var si=0;si<5;si++){starsDisplay+='<i class="fas fa-star '+(si<Math.round(r.rating)?'':'empty')+'"></i>'}
  var ytId=extractYtId(r.youtube);
  var previewHTML=r.preview?'<img class="card-thumb" data-yt="'+ytId+'" src="'+r.preview+'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.7" loading="lazy" onerror="this.remove()">':'';
  
  card.innerHTML=
    '<div class="card-preview" style="background:linear-gradient(135deg,'+r.color+'08,'+r.color+'15)">'+
    previewHTML+
    '<div class="card-color-bar" style="background:'+r.color+'"></div>'+
    badge+typeBadge+
    '<button class="card-fav '+(isFav?'active':'')+'" data-id="'+r.id+'"><i class="fas fa-heart"></i></button>'+
    '</div>'+
    '<div class="card-body">'+
    '<div class="card-name">'+r.name+'</div>'+
    '<div class="card-meta">'+
    '<span class="card-author-link" data-author="'+r.author+'"><i class="fas fa-user"></i>'+r.author+'</span>'+
    '<span><i class="fas fa-download"></i>'+r.dl+'</span>'+
    '</div>'+
    '<div class="card-tags">'+r.tags.map(function(t){return '<span class="card-tag">'+t+'</span>'}).join('')+'</div>'+
    '<div class="card-palette">'+r.palette.map(function(c){return '<div class="palette-dot" style="background:'+c+'" title="'+c+'"></div>'}).join('')+'</div>'+
    '<div class="card-foot">'+
    '<div class="card-stars">'+starsDisplay+'</div>'+
    '<span class="card-rating-num">'+r.rating+'</span>'+
    '</div></div>';
  
  wrapper.appendChild(card);
  wrapper.addEventListener('mousemove',function(e){
    var rect=wrapper.getBoundingClientRect();
    var x=e.clientX-rect.left,y=e.clientY-rect.top;
    var dx=(x-rect.width/2)/(rect.width/2),dy=(y-rect.height/2)/(rect.height/2);
    card.style.transform='rotateX('+(-dy*15)+'deg) rotateY('+(dx*15)+'deg) scale(1.04)';
  });
  wrapper.addEventListener('mouseleave',function(){card.style.transform='rotateX(0deg) rotateY(0deg) scale(1)'});
  card.addEventListener('click',function(e){
    if(e.target.closest('.card-fav')||e.target.closest('.palette-dot')||e.target.closest('.card-author-link'))return;
    openDetail(r);
  });
  grid.appendChild(wrapper);
});
rendered+=BATCH;

document.querySelectorAll('.card-fav').forEach(function(f){
  f.addEventListener('click',function(e){e.stopPropagation();toggleFav(parseInt(f.dataset.id))});
});
document.querySelectorAll('.card-author-link').forEach(function(a){
  a.addEventListener('click',function(e){e.stopPropagation();openAuthorPage(a.dataset.author)});
});

// hover-видео на превьюшках
document.querySelectorAll('.card-thumb[data-yt]').forEach(function(img){
  if(img._hoverInit)return;
  img._hoverInit=true;
  var timer=null;
  var parent=img.parentElement;
  parent.addEventListener('mouseenter',function(){
    var ytId=img.dataset.yt;
    if(!ytId)return;
    timer=setTimeout(function(){
      var iframe=document.createElement('iframe');
      iframe.src='https://www.youtube.com/embed/'+ytId+'?autoplay=1&mute=1&controls=0&loop=1&playlist='+ytId+'&modestbranding=1';
      iframe.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:none;z-index:2';
      iframe.allow='autoplay';
      iframe.setAttribute('loading','lazy');
      parent.appendChild(iframe);
      parent._iframe=iframe;
    },0.900);
  });
  parent.addEventListener('mouseleave',function(){
    clearTimeout(timer);
    if(parent._iframe){parent._iframe.remove();parent._iframe=null}
  });
});

bindHovers();

if(rendered<list.length){requestAnimationFrame(renderBatch)}
}
renderBatch();
updateFavBadge();
}

function updateFavBadge(){
var b=document.getElementById('favBadge');
if(favorites.length>0){b.style.display='inline-block';b.textContent=favorites.length}
else b.style.display='none';
}

function openAuthorPage(authorName){
if(!authorName)return;
var authorMods=DB.filter(function(r){return r.author===authorName});
if(authorMods.length===0)return;
closeAllModals();
var totalDl=authorMods.reduce(function(s,r){return s+r.dl},0);
var avgRating=(authorMods.reduce(function(s,r){return s+r.rating},0)/authorMods.length).toFixed(1);
var reduxCount=authorMods.filter(function(r){return r.type==='redux'}).length;
var revikCount=authorMods.filter(function(r){return r.type==='revik'}).length;
document.getElementById('authorAvatar').textContent=authorName.charAt(0).toUpperCase();
document.getElementById('authorName').textContent=authorName;
document.getElementById('authorStats').innerHTML=
  '<span><i class="fas fa-cubes"></i> '+authorMods.length+' модов</span>'+
  (reduxCount>0?'<span>✨ '+reduxCount+' редуксов</span>':'')+
  (revikCount>0?'<span>💫 '+revikCount+' REV</span>':'')+
  '<span><i class="fas fa-download"></i> '+totalDl.toLocaleString('ru')+' скачиваний</span>'+
  '<span><i class="fas fa-star"></i> '+avgRating+' средний рейтинг</span>';
document.getElementById('homePage').style.display='none';
document.getElementById('favoritesPage').classList.remove('active');
document.getElementById('authorPage').classList.add('active');
window._authorGridList=authorMods;
renderGrid('authorGrid');
window.scrollTo({top:0,behavior:'smooth'});
bindHovers();
}

function closeAuthorPage(){
document.getElementById('authorPage').classList.remove('active');
document.getElementById('homePage').style.display='block';
}

function setupPages(){
document.querySelectorAll('[data-page]').forEach(function(a){
  a.addEventListener('click',function(e){
    e.preventDefault();
    var page=a.dataset.page;
    if(page==='home-about'){switchPage('home');setTimeout(function(){document.getElementById('about').scrollIntoView({behavior:'smooth'})},300)}
    else{switchPage(page)}
  });
});
document.getElementById('authorBack').addEventListener('click',closeAuthorPage);
}

function switchPage(page){
document.querySelectorAll('[data-page]').forEach(function(a){a.classList.toggle('active',a.dataset.page===page)});
document.getElementById('authorPage').classList.remove('active');
if(page==='favorites'){
  document.getElementById('homePage').style.display='none';
  document.getElementById('favoritesPage').classList.add('active');
  renderGrid('favGrid');
  window.scrollTo({top:0,behavior:'smooth'});
}else{
  document.getElementById('homePage').style.display='block';
  document.getElementById('favoritesPage').classList.remove('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
}

function goToCatalog(){
switchPage('home');
setTimeout(function(){document.getElementById('catalog').scrollIntoView({behavior:'smooth',block:'start'})},300);
}

function toggleFav(id){
if(!currentUser){toast('🌸 Войди в аккаунт чтобы сохранять избранное');return}
var idx=favorites.indexOf(id);
if(idx>-1)favorites.splice(idx,1);else favorites.push(id);
saveUserData();renderGrid();
if(document.getElementById('favoritesPage').classList.contains('active'))renderGrid('favGrid');
if(document.getElementById('authorPage').classList.contains('active'))renderGrid('authorGrid');
}

async function rateRedux(id,star){
if(!currentUser){toast('🌸 Войди в аккаунт чтобы ставить оценки');return}
if(!sb)return;
try{
  const {error}=await sb.rpc('add_rating',{p_mod_id:id,p_user_login:currentUser,p_rating:star});
  if(error)throw error;
  userRatings[id]=star;
  saveUserData();
  await loadMods();
  var r=getReduxById(id);
  if(r)openDetail(r);
  renderGrid();
}catch(e){
  console.error('Ошибка оценки:',e);
}
}

async function incrementDownload(id){
if(!sb)return;
try{
  await sb.rpc('increment_downloads',{mod_id:id});
  var r=getReduxById(id);
  if(r)r.dl++;
  animateStats();
  renderGrid();
}catch(e){
  console.error('Ошибка счётчика:',e);
}
}

function openDetail(r){
var modal=document.getElementById('detailModal'),box=document.getElementById('detailBox');
var isFav=favorites.indexOf(r.id)!==-1;
var typeLabel=r.type==='redux'?'✨ Redux':'💫 REV';
var myRating=userRatings[r.id]||0;
var starsHtml='';
for(var i=0;i<5;i++){starsHtml+='<i class="fas fa-star '+(i<myRating?'':'empty')+'" data-star="'+(i+1)+'"></i>'}
var ratingLabel=myRating?'Твоя оценка: '+myRating+'/5':(currentUser?'Поставь оценку!':'Войди чтобы оценить');

// YouTube iframe вместо картинки
var detailYtId=extractYtId(r.youtube);
var previewHTML='';
if(detailYtId){
  previewHTML='<iframe src="https://www.youtube.com/embed/'+detailYtId+'?rel=0&modestbranding=1" style="position:absolute;inset:0;width:100%;height:100%;border:none;z-index:2" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
}else if(r.preview){
  previewHTML='<img src="'+r.preview+'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.6" onerror="this.remove()">';
}

box.innerHTML=
'<button class="modal-close" onclick="closeAllModals()"><i class="fas fa-times"></i></button>'+
'<div class="detail-preview" style="background:linear-gradient(135deg,'+r.color+'22,'+r.color+'44)">'+
previewHTML+
'</div>'+
'<div class="detail-body">'+
'<h2 class="detail-title">'+r.name+'</h2>'+
'<div class="detail-meta">'+
'<span class="detail-author-link" data-author="'+r.author+'"><i class="fas fa-user"></i>'+r.author+'</span>'+
'<span><i class="fas fa-tag"></i>'+typeLabel+'</span>'+
'<span><i class="fas fa-download"></i>'+r.dl+'</span>'+
'<span><i class="fas fa-calendar"></i>'+r.date+'</span></div>'+
'<p class="detail-desc">'+r.desc+'</p>'+
'<div class="detail-info">'+
'<div class="detail-info-item"><div class="detail-info-label">Рейтинг</div><div class="detail-info-value" style="color:var(--s1)"><i class="fas fa-star"></i>'+r.rating+' ('+r.votes+' голосов)</div></div>'+
'<div class="detail-info-item"><div class="detail-info-label">Цвет</div><div class="detail-info-value"><span style="display:inline-block;width:12px;height:12px;background:'+r.color+';border-radius:50%"></span>'+r.colorName+'</div></div>'+
'<div class="detail-info-item" style="grid-column:span 2"><div class="detail-info-label">Палитра</div><div class="detail-info-value">'+r.palette.map(function(c){return '<span style="display:inline-block;width:18px;height:18px;background:'+c+';border-radius:50%;border:2px solid var(--glass-border);margin-right:2px"></span>'}).join('')+'</div></div></div>'+
'<div class="detail-tags-wrap">'+r.tags.map(function(t){return '<span class="day-tag">'+t+'</span>'}).join('')+'</div>'+
'<div style="margin-bottom:8px;font-family:var(--font-bold);font-size:.7rem;color:var(--text2);letter-spacing:1.5px;text-transform:uppercase">'+ratingLabel+'</div>'+
'<div class="detail-stars" data-id="'+r.id+'">'+starsHtml+'</div>'+
'<div class="detail-actions">'+
'<button class="btn-primary" id="detailDlBtn" data-id="'+r.id+'"><i class="fas fa-download"></i> Скачать</button>'+
'<button class="btn-secondary" onclick="toggleFav('+r.id+');closeAllModals();"><i class="fas fa-heart"></i> '+(isFav?'В избранном':'В избранное')+'</button></div>'+
'<div class="detail-share">'+
'<div class="detail-share-url">reduxpicker.com/mod/'+r.id+'</div>'+
'<button class="detail-share-copy" onclick="navigator.clipboard.writeText(\'reduxpicker.com/mod/'+r.id+'\')">Copy</button></div></div>';

modal.classList.add('active');
document.body.style.overflow='hidden';

var authorLink=box.querySelector('.detail-author-link');
if(authorLink){authorLink.addEventListener('click',function(){openAuthorPage(authorLink.dataset.author)})}
box.querySelectorAll('.detail-stars i').forEach(function(s){
  s.addEventListener('click',function(){rateRedux(r.id,parseInt(s.dataset.star))});
});

var dlBtn=box.querySelector('#detailDlBtn');
if(dlBtn){
  dlBtn.addEventListener('click',function(){
    incrementDownload(r.id);
    if(r.link)window.open(r.link,'_blank');
  });
}
bindHovers();
document.querySelectorAll('.blob').forEach(function(b,i){if(i===0)b.style.background=r.color;if(i===2)b.style.background=r.palette[1]||r.color});
}

function setupModals(){
document.getElementById('randomHeroBtn').onclick=startRandom;
document.getElementById('closeRandom').onclick=closeAllModals;
document.getElementById('rerollBtn').onclick=startRandom;
document.getElementById('randomModal').onclick=function(e){if(e.target.id==='randomModal')closeAllModals()};
document.getElementById('detailModal').onclick=function(e){if(e.target.id==='detailModal')closeAllModals()};
document.getElementById('authModal').onclick=function(e){if(e.target.id==='authModal')closeAllModals()};
document.getElementById('closeAuth').onclick=closeAllModals;
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAllModals()});
}

// РАНДОМ — точное центрирование
function startRandom(){
if(DB.length===0)return;
var modal=document.getElementById('randomModal');
modal.classList.add('active');
document.body.style.overflow='hidden';
document.getElementById('rollingView').style.display='block';
document.getElementById('resultView').style.display='none';

var slot=document.getElementById('slotBox');
if(!document.getElementById('slotStyles')){
  var st=document.createElement('style');
  st.id='slotStyles';
  st.textContent=`
    .slot{position:relative;height:180px;overflow:hidden;background:var(--bg2);border-radius:16px;border:1px solid var(--glass-border)}
    .slot-marker{position:absolute;top:0;bottom:0;left:50%;transform:translateX(-50%);width:3px;background:linear-gradient(180deg,transparent,var(--s1),var(--s1),transparent);z-index:10;box-shadow:0 0 20px var(--s1);pointer-events:none}
    .slot-marker::before,.slot-marker::after{content:'';position:absolute;left:50%;transform:translateX(-50%);width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent}
    .slot-marker::before{top:-2px;border-top:12px solid var(--s1);filter:drop-shadow(0 0 8px var(--s1))}
    .slot-marker::after{bottom:-2px;border-bottom:12px solid var(--s1);filter:drop-shadow(0 0 8px var(--s1))}
    .slot-reel{display:flex;gap:0;will-change:transform;position:absolute;top:50%;transform:translateY(-50%)}
    .slot-item{flex-shrink:0;width:152px;height:140px;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:12px;margin:0 6px;position:relative;overflow:hidden;background:var(--surface);border:2px solid transparent}
    .slot-item.winner{animation:winnerPulse .6s ease-in-out infinite alternate;z-index:5}
    .slot-item .slot-emoji{font-size:2rem;filter:drop-shadow(0 0 8px currentColor)}
    .slot-item .slot-name{font-family:var(--font-bold);font-weight:800;font-size:.7rem;text-align:center;line-height:1.2;color:var(--text);word-break:break-word;max-height:2.4em;overflow:hidden}
    .slot-item .slot-type{font-family:var(--font-bold);font-size:.55rem;letter-spacing:1px;text-transform:uppercase;opacity:.7}
    @keyframes winnerPulse{
      from{box-shadow:0 0 15px currentColor;transform:scale(1.02)}
      to{box-shadow:0 0 30px currentColor,0 0 60px currentColor;transform:scale(1.08)}
    }
    .slot-fade-l,.slot-fade-r{position:absolute;top:0;bottom:0;width:80px;z-index:5;pointer-events:none}
    .slot-fade-l{left:0;background:linear-gradient(to right,var(--bg2),transparent)}
    .slot-fade-r{right:0;background:linear-gradient(to left,var(--bg2),transparent)}
  `;
  document.head.appendChild(st);
}

slot.innerHTML='<div class="slot-fade-l"></div><div class="slot-fade-r"></div><div class="slot-marker"></div><div class="slot-reel" id="slotReel"></div>';
var reel=document.getElementById('slotReel');

var winner=DB[Math.floor(Math.random()*DB.length)];

var ITEM_TOTAL=164; // width 152 + margin 6*2
var TOTAL=40;
var WINNER_POS=TOTAL-6;

var items=[];
for(var i=0;i<TOTAL;i++){
  items.push(i===WINNER_POS?winner:DB[Math.floor(Math.random()*DB.length)]);
}

var html='';
items.forEach(function(r){
  html+='<div class="slot-item" style="color:'+r.color+';background:linear-gradient(135deg,'+r.color+'15,'+r.color+'08);border-color:'+r.color+'33">'+
    '<div class="slot-emoji">'+getEmoji(r)+'</div>'+
    '<div class="slot-name">'+r.name+'</div>'+
    '<div class="slot-type" style="color:'+r.color+'">'+(r.type==='redux'?'REDUX':'REV')+'</div>'+
  '</div>';
});
reel.innerHTML=html;

reel.style.transition='none';
reel.style.transform='translateY(-50%) translateX(0)';

requestAnimationFrame(function(){
requestAnimationFrame(function(){
  var slotW=slot.offsetWidth;
  // Центр WINNER = WINNER_POS * ITEM_TOTAL + ITEM_TOTAL/2
  // Он должен оказаться на slotW/2
  var finalX = slotW/2 - (WINNER_POS * ITEM_TOTAL + ITEM_TOTAL/2);

  reel.style.transition='transform 3s cubic-bezier(.1,.9,.3,1)';
  reel.style.transform='translateY(-50%) translateX('+finalX+'px)';

  setTimeout(function(){
    var els=reel.querySelectorAll('.slot-item');
    if(els[WINNER_POS])els[WINNER_POS].classList.add('winner');
    setTimeout(function(){showRandom(winner)},800);
  },3100);
});
});
}

function showRandom(r){
document.getElementById('rollingView').style.display='none';
document.getElementById('resultView').style.display='block';
var typeLabel=r.type==='redux'?'✨ Redux':'💫 REV';
document.getElementById('resultCard').innerHTML=
'<div style="background:var(--glass);backdrop-filter:blur(30px);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:24px;text-align:left;position:relative;overflow:hidden">'+
'<div style="position:absolute;top:-40px;right:-40px;width:150px;height:150px;background:'+r.color+';border-radius:50%;filter:blur(60px);opacity:.4"></div>'+
'<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;position:relative">'+
'<div style="font-size:2rem">'+getEmoji(r)+'</div>'+
'<div><div style="font-family:var(--font-bold);font-weight:800;font-size:1.15rem">'+r.name+'</div>'+
'<div style="font-family:var(--font-body);font-size:.75rem;color:var(--text2);font-weight:500">'+r.author+' · '+typeLabel+'</div></div></div>'+
'<div style="font-size:.85rem;color:var(--text2);font-weight:500;position:relative;line-height:1.5">'+(r.desc?r.desc.slice(0,120)+'...':'')+'</div>'+
'<div style="margin-top:12px;display:flex;gap:15px;align-items:center;font-family:var(--font-bold);font-size:.75rem;color:var(--s1);position:relative">'+
'<span><i class="fas fa-star"></i> '+r.rating+'</span>'+
'<span style="color:var(--text2)"><i class="fas fa-download"></i> '+r.dl+'</span></div></div>';
document.getElementById('viewResultBtn').onclick=function(){closeAllModals();setTimeout(function(){openDetail(r)},200)};
spawnConfetti();
bindHovers();
}

function closeAllModals(){
document.querySelectorAll('.modal-overlay').forEach(function(m){m.classList.remove('active')});
document.body.style.overflow='';
var cols=['#e5a4c4','#d9a8c2','#c4a8d9','#a8b0e0','#a8c0e0'];
document.querySelectorAll('.blob').forEach(function(b,i){b.style.background=cols[i]});
}

function setupTelegram(){
document.getElementById('tgLink').addEventListener('click',function(e){
  var rect=e.currentTarget.getBoundingClientRect();
  spawnAuraCounter(rect.left+rect.width/2,rect.top,Math.floor(Math.random()*9000000)+1000000);
});
}

function spawnAuraCounter(x,y,finalNum){
var el=document.createElement('div');
el.className='aura-popup';
el.style.left=x+'px';el.style.top=y+'px';
el.textContent='+0 AURA';
document.body.appendChild(el);
var start=performance.now(),dur=1200;
function upd(t){
  var p=Math.min((t-start)/dur,1);
  var cur=Math.floor((1-Math.pow(1-p,3))*finalNum);
  el.textContent='+'+cur.toLocaleString()+' AURA';
  if(p<1)requestAnimationFrame(upd);
}
requestAnimationFrame(upd);
setTimeout(function(){el.remove()},2500);
}

function setupAuth(){
document.getElementById('authBtn').onclick=function(){
  if(currentUser)renderUserProfile();else{authMode='login';renderAuthContent()}
  document.getElementById('authModal').classList.add('active');document.body.style.overflow='hidden';
};
}

function renderAuthContent(){
var c=document.getElementById('authContent');
if(authMode==='login'){
  c.innerHTML='<div class="auth-title"><span class="g">Войти</span></div><div class="auth-sub">Введи данные аккаунта</div>'+
  '<div class="auth-field"><label>Логин</label><input id="authLogin" placeholder="ваш логин" autocomplete="off"></div>'+
  '<div class="auth-field"><label>Пароль</label><input id="authPass" type="password" placeholder="ваш пароль" autocomplete="off"></div>'+
  '<button class="auth-submit" id="authSubmitBtn">Войти</button><div class="auth-error" id="authError"></div>'+
  '<div class="auth-switch">Нет аккаунта? <a href="#" id="authSwitchBtn">Создать</a></div>';
}else{
  c.innerHTML='<div class="auth-title"><span class="g">Регистрация</span></div><div class="auth-sub">Создай новый аккаунт</div>'+
  '<div class="auth-field"><label>Логин</label><input id="authLogin" placeholder="придумай логин" autocomplete="off"></div>'+
  '<div class="auth-field"><label>Пароль</label><input id="authPass" type="password" placeholder="придумай пароль" autocomplete="off"></div>'+
  '<button class="auth-submit" id="authSubmitBtn">Создать аккаунт</button><div class="auth-error" id="authError"></div>'+
  '<div class="auth-switch">Уже есть аккаунт? <a href="#" id="authSwitchBtn">Войти</a></div>';
}
document.getElementById('authSubmitBtn').onclick=handleAuthSubmit;
document.getElementById('authSwitchBtn').onclick=function(e){e.preventDefault();authMode=(authMode==='login')?'register':'login';renderAuthContent()};
document.getElementById('authLogin').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('authPass').focus()});
document.getElementById('authPass').addEventListener('keydown',function(e){if(e.key==='Enter')handleAuthSubmit()});
bindHovers();
}

async function handleAuthSubmit(){
var login=document.getElementById('authLogin').value.trim();
var pass=document.getElementById('authPass').value.trim();
var err=document.getElementById('authError');
err.classList.remove('active');
if(!login||!pass){err.textContent='Заполни оба поля';err.classList.add('active');return}
if(login.length<3){err.textContent='Логин слишком короткий (мин. 3)';err.classList.add('active');return}
if(pass.length<4){err.textContent='Пароль слишком короткий (мин. 4)';err.classList.add('active');return}
if(!/^[a-zA-Zа-яА-Я0-9_-]+$/.test(login)){err.textContent='Логин может содержать только буквы, цифры, _ и -';err.classList.add('active');return}

try{
  if(authMode==='login'){
    const {data,error}=await sb.from('users').select('*').ilike('login',login).eq('password',pass).maybeSingle();
    if(error||!data){err.textContent='Неверный логин или пароль';err.classList.add('active');return}
    currentUser=data.login;
    favorites=data.favorites||[];
    const {data:ratings}=await sb.from('user_ratings').select('mod_id,rating').eq('user_login',currentUser);
    userRatings={};
    if(ratings)ratings.forEach(function(r){userRatings[r.mod_id]=r.rating});
    localStorage.setItem('rdx_current',currentUser);
    closeAllModals();updateAuthUI();renderGrid();
    toast('🌸 С возвращением, '+currentUser+'!');
  }else{
    const {data:existing}=await sb.from('users').select('id,login').ilike('login',login).maybeSingle();
    if(existing){err.textContent='Логин "'+existing.login+'" уже занят';err.classList.add('active');return}
    const {error:insertError}=await sb.from('users').insert({login:login,password:pass,favorites:[]});
    if(insertError){
      if(insertError.code==='23505'||(insertError.message||'').toLowerCase().indexOf('duplicate')!==-1){err.textContent='Логин уже занят'}
      else{err.textContent='Ошибка: '+insertError.message}
      err.classList.add('active');return;
    }
    currentUser=login;favorites=[];userRatings={};
    localStorage.setItem('rdx_current',login);
    closeAllModals();updateAuthUI();renderGrid();
    spawnConfetti();toast('✨ Добро пожаловать, '+login+'!');
  }
}catch(e){
  err.textContent='Ошибка: '+e.message;err.classList.add('active');
}
}

function renderUserProfile(){
var c=document.getElementById('authContent');
var ratedCount=Object.keys(userRatings).length;
c.innerHTML=
  '<div class="auth-user-panel">'+
  '<div class="auth-user-avatar">'+currentUser.charAt(0).toUpperCase()+'</div>'+
  '<div class="auth-user-name">'+currentUser+'</div>'+
  '<div class="auth-user-stats">💖 В избранном: <b style="color:var(--s1)">'+favorites.length+'</b> · ⭐ Оценок: <b style="color:var(--s1)">'+ratedCount+'</b></div>'+
  '<button class="btn-secondary" style="width:100%;margin-bottom:10px" onclick="closeAllModals();switchPage(\'favorites\')"><i class="fas fa-heart"></i> Открыть избранное</button>'+
  '<button class="auth-logout" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Выйти</button></div>';
document.getElementById('logoutBtn').onclick=logoutUser;
bindHovers();
}

function logoutUser(){
currentUser=null;favorites=[];userRatings={};
localStorage.removeItem('rdx_current');
updateAuthUI();renderGrid();closeAllModals();
}

function updateAuthUI(){
document.getElementById('authBtnText').textContent=currentUser||'Войти';
updateFavBadge();
}

async function saveUserData(){
if(!currentUser||!sb)return;
try{await sb.from('users').update({favorites:favorites}).eq('login',currentUser)}catch(e){}
}

async function loadUserData(){
var cur=localStorage.getItem('rdx_current');
if(!cur||!sb)return;
try{
  const {data,error}=await sb.from('users').select('*').ilike('login',cur).maybeSingle();
  if(error||!data){localStorage.removeItem('rdx_current');return}
  currentUser=data.login;
  favorites=data.favorites||[];
  const {data:ratings}=await sb.from('user_ratings').select('mod_id,rating').eq('user_login',currentUser);
  userRatings={};
  if(ratings)ratings.forEach(function(r){userRatings[r.mod_id]=r.rating});
  updateAuthUI();renderGrid();
}catch(e){}
}

document.addEventListener('DOMContentLoaded',runLoading);
