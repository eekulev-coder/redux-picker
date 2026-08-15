// ============ DATABASE ============
const REDUXES=[
{id:1,type:"redux",name:"NaturalVision Evolved",author:"Razed",color:"#4CAF50",colorName:"зелёный",cat:"Реализм",rating:4.9,votes:342,dl:125000,date:"2024-01-15",badge:"top",tags:["реализм","4K","HDR"],desc:"Один из самых реалистичных редуксов. Полностью переработанное освещение, текстуры и эффекты погоды.",palette:["#2d5a27","#8bc34a","#c8e6c9","#1b5e20"]},
{id:2,type:"redux",name:"QuantV",author:"Quant",color:"#4d9fff",colorName:"синий",cat:"Графика",rating:4.8,votes:289,dl:98000,date:"2024-02-20",badge:"hot",tags:["рейтрейсинг","свет"],desc:"Продвинутый графический мод с эффектами рейтрейсинга и реалистичными отражениями.",palette:["#1565c0","#42a5f5","#bbdefb","#0d47a1"]},
{id:3,type:"redux",name:"Redux Mod",author:"Josh Romito",color:"#ff9800",colorName:"оранжевый",cat:"Комплексный",rating:4.5,votes:456,dl:200000,date:"2023-08-10",badge:"top",tags:["текстуры","погода","звуки"],desc:"Комплексный мод: графика, погода, транспорт и звуки. Классика среди редуксов.",palette:["#e65100","#ff9800","#ffe0b2","#bf360c"]},
{id:4,type:"redux",name:"VisualV",author:"_CP_",color:"#c04dff",colorName:"фиолетовый",cat:"Графика",rating:4.7,votes:198,dl:85000,date:"2024-03-05",badge:"new",tags:["таймцикл","атмосфера"],desc:"Кинематографическая атмосфера с улучшенным таймциклом и погодой.",palette:["#6a1b9a","#ab47bc","#e1bee7","#4a148c"]},
{id:5,type:"redux",name:"Pinnacle of V",author:"Pinnacle",color:"#ff4d9d",colorName:"розовый",cat:"Реализм",rating:4.6,votes:167,dl:76000,date:"2023-11-22",badge:null,tags:["реализм","текстуры"],desc:"Реалистичный редукс с акцентом на детали дорог и зданий.",palette:["#c2185b","#f06292","#fce4ec","#880e4f"]},
{id:6,type:"redux",name:"NVE + QuantV",author:"Community",color:"#00ffcc",colorName:"циан",cat:"Комбо",rating:4.9,votes:234,dl:65000,date:"2024-04-01",badge:"hot",tags:["комбо","максимум"],desc:"Объединение двух лучших модов — максимальное качество графики.",palette:["#00897b","#4db6ac","#b2dfdb","#004d40"]},
{id:7,type:"redux",name:"Realism Beyond",author:"Tore_",color:"#8d6e63",colorName:"коричневый",cat:"Реализм",rating:4.4,votes:123,dl:42000,date:"2023-09-15",badge:null,tags:["реализм","грязь"],desc:"Реалистичный износ и детали. Мир выглядит живым.",palette:["#4e342e","#8d6e63","#d7ccc8","#3e2723"]},
{id:8,type:"redux",name:"CinematicFX",author:"PixelKing",color:"#ff9800",colorName:"оранжевый",cat:"Кино",rating:4.3,votes:145,dl:38000,date:"2024-01-30",badge:"new",tags:["кино","DOF"],desc:"Кинематографические эффекты: DOF, lens flare, цветокоррекция.",palette:["#ef6c00","#ffa726","#fff3e0","#e65100"]},
{id:9,type:"redux",name:"Vice Cry",author:"ViceCry Team",color:"#ff4d9d",colorName:"розовый",cat:"Ретро",rating:4.7,votes:278,dl:55000,date:"2023-12-10",badge:"hot",tags:["vice","ретро","неон"],desc:"Неоновые огни и ретро-атмосфера 80-х.",palette:["#ad1457","#ec407a","#fce4ec","#880e4f"]},
{id:10,type:"redux",name:"DarkSide",author:"DarkMaster",color:"#37474F",colorName:"тёмный",cat:"Атмосфера",rating:4.2,votes:98,dl:31000,date:"2024-02-14",badge:null,tags:["нуар","контраст"],desc:"Тёмная мрачная атмосфера с высоким контрастом.",palette:["#263238","#546e7a","#cfd8dc","#1a2327"]},
{id:11,type:"redux",name:"NightCity Neon",author:"CyberMods",color:"#7C4DFF",colorName:"фиолетовый",cat:"Тематический",rating:4.6,votes:201,dl:49000,date:"2024-03-18",badge:"new",tags:["неон","киберпанк"],desc:"Киберпанк: неоновые вывески и яркие отражения.",palette:["#311b92","#7c4dff","#d1c4e9","#1a0063"]},
{id:12,type:"redux",name:"Golden Hour",author:"SunsetLover",color:"#ffb84d",colorName:"жёлтый",cat:"Освещение",rating:4.6,votes:189,dl:58000,date:"2024-04-15",badge:"hot",tags:["закат","золотой час"],desc:"Вечный золотой час — идеально для скриншотов.",palette:["#f57f17","#ffc107","#fff8e1","#ff6f00"]},
{id:13,type:"redux",name:"PhotoRealistic",author:"LensGod",color:"#4CAF50",colorName:"зелёный",cat:"Реализм",rating:4.8,votes:312,dl:91000,date:"2024-04-10",badge:"hot",tags:["фото","4K"],desc:"Максимально близко к реальной фотографии.",palette:["#1b5e20","#66bb6a","#c8e6c9","#2e7d32"]},
{id:14,type:"redux",name:"Anime Shade",author:"OtakuMods",color:"#ff80AB",colorName:"розовый",cat:"Стилизация",rating:4.1,votes:87,dl:25000,date:"2024-01-20",badge:"new",tags:["аниме","cel-shading"],desc:"Аниме-стилизация GTA 5 с cel-shading.",palette:["#c2185b","#ff80ab","#fce4ec","#ad1457"]},
{id:15,type:"redux",name:"Midnight Club",author:"NightRacer",color:"#4d9fff",colorName:"синий",cat:"Ночной",rating:4.5,votes:156,dl:44000,date:"2024-01-10",badge:null,tags:["ночь","гонки"],desc:"Ночной мод для стрит-рейсинга.",palette:["#0d47a1","#2196f3","#bbdefb","#1565c0"]},
{id:16,type:"redux",name:"SunnyDay Ultra",author:"SolarMod",color:"#ffeb3b",colorName:"жёлтый",cat:"Погода",rating:4.1,votes:78,dl:28000,date:"2023-07-20",badge:null,tags:["солнце","лето"],desc:"Яркий солнечный мод для летней атмосферы.",palette:["#f9a825","#ffee58","#fff9c4","#f57f17"]},
{id:17,type:"redux",name:"Winter Wonderland",author:"FrostByte",color:"#B3E5FC",colorName:"голубой",cat:"Сезонный",rating:4.3,votes:134,dl:34000,date:"2023-12-25",badge:null,tags:["зима","снег"],desc:"Зимний мод: снежные улицы и иней.",palette:["#01579b","#4fc3f7","#e1f5fe","#0277bd"]},
{id:18,type:"redux",name:"Tropical Paradise",author:"IslandVibes",color:"#00E676",colorName:"зелёный",cat:"Тематический",rating:4.2,votes:91,dl:29000,date:"2024-02-05",badge:null,tags:["тропики","океан"],desc:"Тропическая атмосфера: зелень и океан.",palette:["#1b5e20","#00e676","#c8e6c9","#2e7d32"]},
];

const REVIKS=[
{id:101,type:"revik",name:"Sharp Revik",author:"SharpMods",color:"#ff4d9d",colorName:"розовый",cat:"Резкость",rating:4.7,votes:189,dl:67000,date:"2024-03-20",badge:"hot",tags:["резкость","чёткость"],desc:"Максимальная резкость и чёткость картинки для капта.",palette:["#c2185b","#ff4d9d","#fce4ec","#880e4f"]},
{id:102,type:"revik",name:"Neon Revik Pro",author:"CyberMods",color:"#00ffcc",colorName:"циан",cat:"Неон",rating:4.8,votes:234,dl:82000,date:"2024-04-05",badge:"top",tags:["неон","яркость"],desc:"Яркие неоновые оттенки, идеальны для ночных каптов.",palette:["#00897b","#00ffcc","#b2dfdb","#004d40"]},
{id:103,type:"revik",name:"Contrast Master",author:"DarkMaster",color:"#37474F",colorName:"тёмный",cat:"Контраст",rating:4.5,votes:156,dl:48000,date:"2024-02-10",badge:null,tags:["контраст","чёрный"],desc:"Экстремальный контраст для глубокой картинки.",palette:["#263238","#546e7a","#cfd8dc","#1a2327"]},
{id:104,type:"revik",name:"Sunset Revik",author:"SunsetLover",color:"#ffb84d",colorName:"жёлтый",cat:"Освещение",rating:4.6,votes:145,dl:55000,date:"2024-03-15",badge:"new",tags:["закат","тепло"],desc:"Тёплая закатная палитра для атмосферных каптов.",palette:["#f57f17","#ffc107","#fff8e1","#ff6f00"]},
{id:105,type:"revik",name:"Vice Revik",author:"ViceCry Team",color:"#ff4d9d",colorName:"розовый",cat:"Ретро",rating:4.7,votes:198,dl:52000,date:"2024-01-25",badge:"hot",tags:["vice","ретро"],desc:"Ретро-стиль Vice City в форме ревика.",palette:["#ad1457","#ec407a","#fce4ec","#880e4f"]},
{id:106,type:"revik",name:"Cold Blue",author:"FrostByte",color:"#4d9fff",colorName:"синий",cat:"Холод",rating:4.4,votes:112,dl:38000,date:"2024-02-28",badge:null,tags:["холод","синева"],desc:"Холодные синие тона, зимняя эстетика.",palette:["#0d47a1","#2196f3","#bbdefb","#1565c0"]},
{id:107,type:"revik",name:"Cinematic Revik",author:"PixelKing",color:"#ff9800",colorName:"оранжевый",cat:"Кино",rating:4.6,votes:167,dl:61000,date:"2024-03-08",badge:"new",tags:["кино","драма"],desc:"Кинематографический ревик для эпичных каптов.",palette:["#ef6c00","#ffa726","#fff3e0","#e65100"]},
{id:108,type:"revik",name:"Green Machine",author:"Razed",color:"#4CAF50",colorName:"зелёный",cat:"Природа",rating:4.5,votes:143,dl:47000,date:"2024-04-01",badge:null,tags:["зелень","природа"],desc:"Насыщенная зелёная палитра для природных сцен.",palette:["#2d5a27","#8bc34a","#c8e6c9","#1b5e20"]},
{id:109,type:"revik",name:"Purple Rain",author:"CyberMods",color:"#c04dff",colorName:"фиолетовый",cat:"Тематический",rating:4.8,votes:212,dl:74000,date:"2024-04-12",badge:"hot",tags:["фиолет","дождь"],desc:"Фиолетовый ревик с эффектом дождя.",palette:["#6a1b9a","#ab47bc","#e1bee7","#4a148c"]},
{id:110,type:"revik",name:"Clean White",author:"MinimalMods",color:"#f5f5f5",colorName:"голубой",cat:"Минимализм",rating:4.3,votes:98,dl:32000,date:"2024-01-05",badge:null,tags:["минимал","белый"],desc:"Чистый минималистичный ревик без лишних эффектов.",palette:["#eeeeee","#f5f5f5","#ffffff","#e0e0e0"]},
];

const DB=[...REDUXES,...REVIKS];

const COLORS=[
{n:"все",v:"all",h:null},{n:"розовый",v:"розовый",h:"#ff4d9d"},{n:"оранжевый",v:"оранжевый",h:"#ff9800"},
{n:"жёлтый",v:"жёлтый",h:"#ffeb3b"},{n:"зелёный",v:"зелёный",h:"#4CAF50"},{n:"голубой",v:"голубой",h:"#B3E5FC"},
{n:"циан",v:"циан",h:"#00ffcc"},{n:"синий",v:"синий",h:"#4d9fff"},{n:"фиолетовый",v:"фиолетовый",h:"#c04dff"},
{n:"коричневый",v:"коричневый",h:"#8d6e63"},{n:"тёмный",v:"тёмный",h:"#37474F"},
];

const emojiMap={"NaturalVision Evolved":"🌿","QuantV":"💎","Redux Mod":"🎨","VisualV":"👁️","Pinnacle of V":"🏔️","NVE + QuantV":"⚡","Realism Beyond":"🌍","CinematicFX":"🎬","Vice Cry":"🌆","DarkSide":"🌑","NightCity Neon":"🌃","Golden Hour":"🌅","PhotoRealistic":"📸","Anime Shade":"🎌","Midnight Club":"🌙","SunnyDay Ultra":"☀️","Winter Wonderland":"❄️","Tropical Paradise":"🏝️","Sharp Revik":"🔪","Neon Revik Pro":"💠","Contrast Master":"⚫","Sunset Revik":"🌇","Vice Revik":"💗","Cold Blue":"🧊","Cinematic Revik":"🎥","Green Machine":"🌱","Purple Rain":"💜","Clean White":"⚪"};

let ST={search:'',color:'all',author:'all',cat:'all',sort:'popular',type:'all'};
let currentUser=null,favorites=[];
let userRatings={}; // {reduxId: userRating}
let authMode='login';

// ============ CURSOR ============
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

// ============ BRANCHES ============
function updateBranches(){
var tl=document.getElementById('branchTL'),br=document.getElementById('branchBR');
if(!tl||!br)return;
var tlDist=Math.sqrt(mx*mx+my*my);
var maxD=400;
if(tlDist<maxD){
  var f=(maxD-tlDist)/maxD;
  tl.style.transform='translate('+(-mx*f*0.15)+'px,'+(-my*f*0.15)+'px) rotate('+(-f*8)+'deg)';
}else{
  tl.style.transform='translate(0,0) rotate(0)';
}
var brDx=mx-innerWidth,brDy=my-innerHeight;
var brDist=Math.sqrt(brDx*brDx+brDy*brDy);
if(brDist<maxD){
  var f2=(maxD-brDist)/maxD;
  br.style.transform='translate('+(-brDx*f2*0.15)+'px,'+(-brDy*f2*0.15)+'px) rotate('+(180+f2*8)+'deg)';
}else{
  br.style.transform='translate(0,0) rotate(180deg)';
}
}
setInterval(updateBranches,50);

// ============ FAKE CURSORS ============
const FAKE_NAMES=['SakuraFan','ReduxLover','GtaKing','CaptPro','NightRider','PixelHunter','ColorMaster','ModExpert','ShaderGuru','LightSeeker'];
let fakeCursorsPool=[];

function spawnFakeCursor(){
if(fakeCursorsPool.length>=3)return;

var container=document.getElementById('fakeCursors');
if(!container)return;
var cursor=document.createElement('div');
cursor.className='fake-cursor';
var name=FAKE_NAMES[Math.floor(Math.random()*FAKE_NAMES.length)];
var color=['#e5a4c4','#c4a8d9','#a8b0e0','#a8c0e0','#d9a8c2'][Math.floor(Math.random()*5)];
cursor.style.color=color;
cursor.innerHTML='<svg class="fake-cursor-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M5,2l14,7l-6,2l-2,6z"/></svg><div class="fake-cursor-label" style="color:'+color+'">'+name+'</div>';
cursor.style.left=Math.random()*innerWidth+'px';
cursor.style.top=Math.random()*innerHeight+'px';
container.appendChild(cursor);
fakeCursorsPool.push(cursor);

setTimeout(function(){cursor.classList.add('visible')},50);

var movements=Math.floor(Math.random()*3)+2;
var moveIdx=0;
function moveNext(){
  if(moveIdx>=movements){
    cursor.classList.remove('visible');
    setTimeout(function(){
      cursor.remove();
      fakeCursorsPool=fakeCursorsPool.filter(function(c){return c!==cursor});
    },1000);
    return;
  }
  cursor.style.left=Math.random()*innerWidth+'px';
  cursor.style.top=Math.random()*innerHeight+'px';
  moveIdx++;
  setTimeout(moveNext,3200+Math.random()*2000);
}
setTimeout(moveNext,500);
}

function initFakeCursors(){
setTimeout(spawnFakeCursor,3000);
setInterval(function(){
  if(Math.random()>0.5)spawnFakeCursor();
},6000);
}

// ============ PARTICLES ============
var pCanvas=document.getElementById('particlesCanvas'),pCtx=pCanvas.getContext('2d');
var particles=[],pMouse={x:-999,y:-999};
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
pCtx.beginPath();pCtx.arc(this.x,this.y,this.size*3,0,Math.PI*2);
pCtx.fillStyle='hsla('+this.hue+',75%,'+(isDark?75:45)+'%,'+(isDark?.08:.04)+')';pCtx.fill();
};

function initParticles(){particles=[];var c=Math.min(180,Math.floor(pCanvas.width*pCanvas.height/10000));for(var i=0;i<c;i++)particles.push(new Particle())}
initParticles();addEventListener('resize',initParticles);

function animParticles(){
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

// ============ WIND ============
function initWind(){
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

// ============ PETALS ============
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
for(var i=0;i<8;i++)setTimeout(spawnPetal,i*300);
setInterval(spawnPetal,1200);
}

// ============ LOADING ============
function runLoading(){
var bar=document.getElementById('loadingBar'),text=document.getElementById('loadingText'),sakura=document.getElementById('loadingSakura');
var i,p,side;
for(i=0;i<35;i++){
  p=document.createElement('div');p.className='load-petal';
  p.textContent=petalEmojis[Math.floor(Math.random()*petalEmojis.length)];
  side=Math.random();
  if(side<.25){p.style.left=Math.random()*18+'%';p.style.top=Math.random()*100+'%'}
  else if(side<.5){p.style.right=Math.random()*18+'%';p.style.top=Math.random()*100+'%'}
  else if(side<.75){p.style.top=Math.random()*18+'%';p.style.left=Math.random()*100+'%'}
  else{p.style.bottom=Math.random()*18+'%';p.style.left=Math.random()*100+'%'}
  p.style.animationDelay=Math.random()*4+'s';p.style.opacity=.15+Math.random()*.35;
  p.style.fontSize=(1.2+Math.random()*2.5)+'rem';
  sakura.appendChild(p);
}
var msgs=['loading assets...','connecting database...','rendering interface...','almost ready...','welcome 🌸'];
var pct=0,mi=0;
var iv=setInterval(function(){
  pct+=Math.random()*15+5;if(pct>100)pct=100;
  bar.style.width=pct+'%';
  if(pct>mi*25&&mi<msgs.length){text.textContent=msgs[mi];mi++}
  if(pct>=100){clearInterval(iv);setTimeout(function(){document.getElementById('loadingScreen').classList.add('hidden');setTimeout(showMain,600)},500)}
},200);
}

function showMain(){
var ids=['navbar','hero','reduxDay','trendingMarquee','catalog','about','footer'];
ids.forEach(function(id,i){
  setTimeout(function(){var el=document.getElementById(id);if(el){el.style.opacity='1';el.style.transition='opacity .8s'}},i*150);
});
// ФИКС ФУТЕРА
var footer=document.getElementById('footer');
if(footer){
  footer.innerHTML='<p>© 2026 REDUX PICKER by <a href="https://www.youtube.com/@thagreatest" target="_blank" style="color:var(--s1);font-weight:700">@thagreatest</a></p><p>🌸 Все моды принадлежат их авторам</p>';
}
startPetals();initWind();initFakeCursors();
setupNavbar();setupTheme();
renderDayCard();renderMarquee();initFilters();initTypeSwitcher();renderGrid();
setupModals();setupAuth();bindHovers();animateStats();
setupMagnetic();setupPages();setupTelegram();loadUserData();
setTimeout(function(){toast('🌸 Добро пожаловать в Redux Picker')},800);
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
  var isDark=html.dataset.theme==='dark';
  html.dataset.theme=isDark?'light':'dark';
  localStorage.setItem('rdx_theme',html.dataset.theme);
  toast(isDark?'☀️ Светлая тема':'🌙 Тёмная тема');
});
var saved=localStorage.getItem('rdx_theme');
if(saved)document.documentElement.dataset.theme=saved;
}

// ============ РЕАЛЬНЫЕ СЧЁТЧИКИ ============
function animateStats(){
var totalMods=DB.length;
var uniqueAuthors=[];
DB.forEach(function(r){if(uniqueAuthors.indexOf(r.author)===-1)uniqueAuthors.push(r.author)});
var totalAuthors=uniqueAuthors.length;
var totalDownloads=DB.reduce(function(sum,r){return sum+r.dl},0);

animateNum('statMods',totalMods);
animateNum('statAuthors',totalAuthors);
animateNum('statDownloads',totalDownloads);
}

function animateNum(id,target){
var el=document.getElementById(id);
if(!el)return;
var start=performance.now();
var dur=1500;
function upd(t){
  var p=Math.min((t-start)/dur,1);
  var val=Math.floor((1-Math.pow(1-p,3))*target);
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

function renderDayCard(){
var r=DB.reduce(function(a,b){return a.rating>b.rating?a:b});
var emoji=emojiMap[r.name]||'🌸';
document.getElementById('reduxDay').innerHTML=
'<div class="day-card">'+
'<div class="day-preview" style="background:linear-gradient(135deg,'+r.color+'11,'+r.color+'33)">'+
'<div class="day-preview-glow" style="background:'+r.color+'"></div>'+
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

// Bind клики
var dayAuthorEl=document.querySelector('.day-author[data-author]');
if(dayAuthorEl)dayAuthorEl.addEventListener('click',function(){openAuthorPage(dayAuthorEl.dataset.author)});
var dayBtn=document.querySelector('.day-btn[data-id]');
if(dayBtn)dayBtn.addEventListener('click',function(){openDetail(getReduxById(parseInt(dayBtn.dataset.id)))});
bindHovers();
}

function getReduxById(id){return DB.find(function(r){return r.id===id})}

function renderMarquee(){
var sorted=DB.slice().sort(function(a,b){return b.dl-a.dl}).slice(0,10);
var items=sorted.map(function(r,i){
  var emoji=emojiMap[r.name]||'🌸';
  return '<span class="marquee-item" data-id="'+r.id+'"><span class="rank">#'+(i+1)+'</span> <span class="emoji">'+emoji+'</span> <span>'+r.name+'</span></span>';
}).join('<span class="marquee-sep">·</span>');
document.getElementById('marqueeTrack').innerHTML=items+'<span class="marquee-sep">·</span>'+items;
document.querySelectorAll('.marquee-item').forEach(function(el){
  el.addEventListener('click',function(){var r=DB.find(function(x){return x.id==el.dataset.id});if(r)openDetail(r)});
});
bindHovers();
}

// ============ TYPE SWITCHER (ФИКС!) ============
function initTypeSwitcher(){
document.querySelectorAll('.type-btn').forEach(function(b){
  b.addEventListener('click',function(e){
    e.preventDefault();
    e.stopPropagation();
    document.querySelectorAll('.type-btn').forEach(function(x){x.classList.remove('active')});
    b.classList.add('active');
    ST.type=b.dataset.type;
    renderGrid();
    toast('🎨 Показываю: '+(ST.type==='all'?'все моды':ST.type==='redux'?'редуксы':'ревики'));
  });
});
}

function initFilters(){
var au=[];DB.forEach(function(r){if(au.indexOf(r.author)===-1)au.push(r.author)});au.sort();
var as=document.getElementById('authorSel');
au.forEach(function(a){var o=document.createElement('option');o.value=a;o.textContent=a;as.appendChild(o)});
var ca=[];DB.forEach(function(r){if(ca.indexOf(r.cat)===-1)ca.push(r.cat)});ca.sort();
var cs=document.getElementById('catSel');
ca.forEach(function(c){var o=document.createElement('option');o.value=c;o.textContent=c;cs.appendChild(o)});
var cp=document.getElementById('colorPills');
COLORS.forEach(function(c){
  var b=document.createElement('button');b.className='color-pill'+(c.v==='all'?' all-c active':'');
  b.title=c.n;if(c.h)b.style.background=c.h;
  b.onclick=function(){document.querySelectorAll('.color-pill').forEach(function(x){x.classList.remove('active')});b.classList.add('active');ST.color=c.v;renderGrid()};
  cp.appendChild(b);
});
var dt;
document.getElementById('searchIn').oninput=function(e){clearTimeout(dt);dt=setTimeout(function(){ST.search=e.target.value.toLowerCase().trim();renderGrid()},200)};
document.getElementById('authorSel').onchange=function(e){ST.author=e.target.value;renderGrid()};
document.getElementById('catSel').onchange=function(e){ST.cat=e.target.value;renderGrid()};
document.getElementById('sortSel').onchange=function(e){ST.sort=e.target.value;renderGrid()};
}

function renderGrid(target){
if(!target)target='bentoGrid';
var list=DB.slice();

if(target==='bentoGrid'){
  if(ST.type!=='all')list=list.filter(function(r){return r.type===ST.type});
  if(ST.search)list=list.filter(function(r){return r.name.toLowerCase().indexOf(ST.search)!==-1||r.author.toLowerCase().indexOf(ST.search)!==-1||r.tags.some(function(t){return t.indexOf(ST.search)!==-1})});
  if(ST.color!=='all')list=list.filter(function(r){return r.colorName===ST.color});
  if(ST.author!=='all')list=list.filter(function(r){return r.author===ST.author});
  if(ST.cat!=='all')list=list.filter(function(r){return r.cat===ST.cat});
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
    grid.innerHTML='<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🔍</div><h3>Ничего не найдено</h3><p>Попробуй изменить фильтры</p></div>';
  }
  updateFavBadge();return;
}

list.forEach(function(r,i){
  var wrapper=document.createElement('div');
  wrapper.className='redux-card-wrapper';
  wrapper.style.animationDelay=i*.04+'s';
  
  var card=document.createElement('div');
  card.className='redux-card';
  var isFav=favorites.indexOf(r.id)!==-1;
  var badge=r.badge?'<div class="card-badge badge-'+r.badge+'">'+(r.badge==='new'?'✨ new':r.badge==='hot'?'🔥 hot':'⭐ top')+'</div>':'';
  var typeBadge=r.type==='redux'?'<div class="card-type-badge type-redux">✨ Redux</div>':'<div class="card-type-badge type-revik">💫 Revik</div>';
  // БЕЗ кликабельных звёзд — только показ рейтинга
  var starsDisplay='';
  for(var si=0;si<5;si++){starsDisplay+='<i class="fas fa-star '+(si<Math.round(r.rating)?'':'empty')+'"></i>'}
  
  card.innerHTML=
    '<div class="card-preview" style="background:linear-gradient(135deg,'+r.color+'11,'+r.color+'22)">'+
    '<div class="card-glow" style="background:'+r.color+'"></div>'+
    '<div class="card-color-bar" style="background:'+r.color+'"></div>'+
    badge+
    typeBadge+
    '<button class="card-fav '+(isFav?'active':'')+'" data-id="'+r.id+'"><i class="fas fa-heart"></i></button>'+
    '</div>'+
    '<div class="card-body">'+
    '<div class="card-name">'+r.name+'</div>'+
    '<div class="card-meta">'+
    '<span class="card-author-link" data-author="'+r.author+'"><i class="fas fa-user"></i>'+r.author+'</span>'+
    '<span><i class="fas fa-download"></i>'+(r.dl/1000|0)+'k</span>'+
    '<span><i class="fas fa-tag"></i>'+r.cat+'</span>'+
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
    var x=e.clientX-rect.left;
    var y=e.clientY-rect.top;
    var cxr=rect.width/2;
    var cyr=rect.height/2;
    var dx=(x-cxr)/cxr;
    var dy=(y-cyr)/cyr;
    var rotY=dx*15;
    var rotX=-dy*15;
    card.style.transform='rotateX('+rotX+'deg) rotateY('+rotY+'deg) scale(1.04)';
  });
  wrapper.addEventListener('mouseleave',function(){
    card.style.transform='rotateX(0deg) rotateY(0deg) scale(1)';
  });
  
  card.addEventListener('click',function(e){
    if(e.target.closest('.card-fav')||e.target.closest('.palette-dot')||e.target.closest('.card-author-link'))return;
    openDetail(r);
  });
  grid.appendChild(wrapper);
});

document.querySelectorAll('.card-fav').forEach(function(f){
  f.addEventListener('click',function(e){e.stopPropagation();toggleFav(parseInt(f.dataset.id))});
});
document.querySelectorAll('.card-author-link').forEach(function(a){
  a.addEventListener('click',function(e){e.stopPropagation();openAuthorPage(a.dataset.author)});
});
bindHovers();updateFavBadge();
}

function updateFavBadge(){
var b=document.getElementById('favBadge');
if(favorites.length>0){b.style.display='inline-block';b.textContent=favorites.length}
else b.style.display='none';
}

// ============ AUTHOR PAGE (ФИКС!) ============
function openAuthorPage(authorName){
if(!authorName)return;
var authorMods=DB.filter(function(r){return r.author===authorName});
if(authorMods.length===0){toast('❌ Нет модов у этого автора');return}

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
  (revikCount>0?'<span>💫 '+revikCount+' ревиков</span>':'')+
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
    if(page==='home-about'){
      switchPage('home');
      setTimeout(function(){document.getElementById('about').scrollIntoView({behavior:'smooth'})},300);
    }else{
      switchPage(page);
    }
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
setTimeout(function(){
  document.getElementById('catalog').scrollIntoView({behavior:'smooth',block:'start'});
},300);
}

function toggleFav(id){
if(!currentUser){toast('🌸 Войди чтобы сохранять избранное');document.getElementById('authModal').classList.add('active');renderAuthContent();return}
var idx=favorites.indexOf(id);
if(idx>-1)favorites.splice(idx,1);else favorites.push(id);
saveUserData();renderGrid();
if(document.getElementById('favoritesPage').classList.contains('active'))renderGrid('favGrid');
if(document.getElementById('authorPage').classList.contains('active'))renderGrid('authorGrid');
toast(idx>-1?'💔 Удалено из избранного':'💖 Добавлено в избранное');
}

// Рейтинг через МОДАЛКУ
function rateRedux(id,star){
if(!currentUser){toast('🌸 Войди чтобы ставить оценки');return}
var r=DB.find(function(x){return x.id===id});
if(!r)return;

var oldRating=userRatings[id];
userRatings[id]=star;
saveUserData();

if(oldRating){
  // Пересчёт: убираем старую оценку и добавляем новую
  r.rating=parseFloat((((r.rating*r.votes)-oldRating+star)/r.votes).toFixed(1));
}else{
  r.rating=parseFloat((((r.rating*r.votes)+star)/(r.votes+1)).toFixed(1));
  r.votes++;
}

// Обновляем модалку
openDetail(r);
toast('⭐ Твоя оценка: '+star+'/5 для '+r.name);
}

function openDetail(r){
var modal=document.getElementById('detailModal'),box=document.getElementById('detailBox');
var isFav=favorites.indexOf(r.id)!==-1;
var typeLabel=r.type==='redux'?'✨ Redux':'💫 Revik';

// Оценка юзера
var myRating=userRatings[r.id]||0;
var starsHtml='';
for(var i=0;i<5;i++){
  starsHtml+='<i class="fas fa-star '+(i<myRating?'':'empty')+'" data-star="'+(i+1)+'"></i>';
}
var ratingLabel=myRating?'Твоя оценка: '+myRating+'/5':(currentUser?'Поставь оценку!':'Войди чтобы оценить');

box.innerHTML=
'<button class="modal-close" onclick="closeAllModals()"><i class="fas fa-times"></i></button>'+
'<div class="detail-preview" style="background:linear-gradient(135deg,'+r.color+'22,'+r.color+'44)">'+
'<div class="detail-glow" style="background:'+r.color+'"></div></div>'+
'<div class="detail-body">'+
'<h2 class="detail-title">'+r.name+'</h2>'+
'<div class="detail-meta">'+
'<span class="detail-author-link" data-author="'+r.author+'"><i class="fas fa-user"></i>'+r.author+'</span>'+
'<span><i class="fas fa-tag"></i>'+typeLabel+'</span>'+
'<span><i class="fas fa-download"></i>'+r.dl.toLocaleString()+'</span>'+
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
'<button class="btn-primary"><i class="fas fa-download"></i> Скачать</button>'+
'<button class="btn-secondary" onclick="toggleFav('+r.id+');closeAllModals();"><i class="fas fa-heart"></i> '+(isFav?'В избранном':'В избранное')+'</button></div>'+
'<div class="detail-share">'+
'<div class="detail-share-url">reduxpicker.com/mod/'+r.id+'</div>'+
'<button class="detail-share-copy" onclick="navigator.clipboard.writeText(\'reduxpicker.com/mod/'+r.id+'\');toast(\'📋 Скопировано!\')">Copy</button></div></div>';

modal.classList.add('active');
document.body.style.overflow='hidden';

// Клик на автора внутри модалки
var authorLink=box.querySelector('.detail-author-link');
if(authorLink){
  authorLink.addEventListener('click',function(){
    openAuthorPage(authorLink.dataset.author);
  });
}

// Клики на звёзды рейтинга
box.querySelectorAll('.detail-stars i').forEach(function(s){
  s.addEventListener('click',function(){
    rateRedux(r.id,parseInt(s.dataset.star));
  });
});

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

// ============ РАНДОМ 3D РУЛЕТКА (ФИКС!) ============
function startRandom(){
var modal=document.getElementById('randomModal');
modal.classList.add('active');
document.body.style.overflow='hidden';
document.getElementById('rollingView').style.display='block';
document.getElementById('resultView').style.display='none';

var slot=document.getElementById('slotBox');
slot.innerHTML='<div class="slot-marker"></div><div class="slot-reel" id="slotReel"></div>';

var reel=document.getElementById('slotReel');
var winner=DB[Math.floor(Math.random()*DB.length)];
var TOTAL=60;
var WINNER_POS=TOTAL-5;

var items=[];
for(var i=0;i<TOTAL;i++){
  if(i===WINNER_POS)items.push(winner);
  else items.push(DB[Math.floor(Math.random()*DB.length)]);
}

var itemsHTML='';
items.forEach(function(r){
  var emoji=emojiMap[r.name]||'🎨';
  itemsHTML+='<div class="slot-item" style="color:'+r.color+'"><span class="emoji">'+emoji+'</span><span class="name">'+r.name+'</span></div>';
});
reel.innerHTML=itemsHTML;

// ФИКС: даём время на рендер и запускаем анимацию через 3 фрейма
setTimeout(function(){
  var slotHeight=slot.offsetHeight || 180;
  var itemHeight=60;
  var finalY=(slotHeight/2)-(WINNER_POS*itemHeight+itemHeight/2);
  
  // Стартовая позиция
  reel.style.transition='none';
  reel.style.transform='translateY(0)';
  reel.classList.add('spinning');
  
  // Форсируем reflow
  void reel.offsetHeight;
  
  // Запускаем анимацию
  setTimeout(function(){
    reel.style.transition='transform 4.5s cubic-bezier(0.17,0.67,0.32,1)';
    reel.style.transform='translateY('+finalY+'px)';
    
    // Убираем сильный блюр
    setTimeout(function(){
      reel.classList.remove('spinning');
      reel.classList.add('slowing');
    },3800);
    
    // Показываем результат
    setTimeout(function(){
      reel.classList.remove('slowing');
      var itemEls=reel.querySelectorAll('.slot-item');
      if(itemEls[WINNER_POS]){
        itemEls[WINNER_POS].classList.add('winner');
      }
      setTimeout(function(){
        showRandom(winner);
      },800);
    },4600);
  },50);
},100);
}

function showRandom(r){
document.getElementById('rollingView').style.display='none';
document.getElementById('resultView').style.display='block';
var emoji=emojiMap[r.name]||'🌸';
var typeLabel=r.type==='redux'?'✨ Redux':'💫 Revik';
document.getElementById('resultCard').innerHTML=
'<div style="background:var(--glass);backdrop-filter:blur(30px);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:24px;text-align:left;position:relative;overflow:hidden">'+
'<div style="position:absolute;top:-40px;right:-40px;width:150px;height:150px;background:'+r.color+';border-radius:50%;filter:blur(60px);opacity:.4"></div>'+
'<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;position:relative">'+
'<div style="font-size:2rem">'+emoji+'</div>'+
'<div><div style="font-family:var(--font-bold);font-weight:800;font-size:1.15rem">'+r.name+'</div>'+
'<div style="font-family:var(--font-body);font-size:.75rem;color:var(--text2);font-weight:500">'+r.author+' · '+typeLabel+'</div></div></div>'+
'<div style="font-size:.85rem;color:var(--text2);font-weight:500;position:relative;line-height:1.5">'+r.desc.slice(0,120)+'...</div>'+
'<div style="margin-top:12px;display:flex;gap:15px;align-items:center;font-family:var(--font-bold);font-size:.75rem;color:var(--s1);position:relative">'+
'<span><i class="fas fa-star"></i> '+r.rating+'</span>'+
'<span style="color:var(--text2)"><i class="fas fa-download"></i> '+(r.dl/1000|0)+'k</span></div></div>';
document.getElementById('viewResultBtn').onclick=function(){closeAllModals();setTimeout(function(){openDetail(r)},200)};
spawnConfetti();toast('🎲 Выпал: '+r.name);
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
  var x=rect.left+rect.width/2;
  var y=rect.top;
  var auraAmount=Math.floor(Math.random()*9000000)+1000000;
  spawnAuraCounter(x,y,auraAmount);
});
}

function spawnAuraCounter(x,y,finalNum){
var el=document.createElement('div');
el.className='aura-popup';
el.style.left=x+'px';el.style.top=y+'px';
el.textContent='+0 AURA';
document.body.appendChild(el);
var start=performance.now();
var dur=1200;
function upd(t){
  var p=Math.min((t-start)/dur,1);
  var eased=1-Math.pow(1-p,3);
  var cur=Math.floor(eased*finalNum);
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
  c.innerHTML=
    '<div class="auth-title"><span class="g">Войти</span></div>'+
    '<div class="auth-sub">Введи данные аккаунта</div>'+
    '<div class="auth-field"><label>Логин</label><input id="authLogin" placeholder="ваш логин" autocomplete="off"></div>'+
    '<div class="auth-field"><label>Пароль</label><input id="authPass" type="password" placeholder="ваш пароль" autocomplete="off"></div>'+
    '<button class="auth-submit" id="authSubmitBtn">Войти</button>'+
    '<div class="auth-error" id="authError"></div>'+
    '<div class="auth-switch">Нет аккаунта? <a href="#" id="authSwitchBtn">Создать</a></div>';
}else{
  c.innerHTML=
    '<div class="auth-title"><span class="g">Регистрация</span></div>'+
    '<div class="auth-sub">Создай новый аккаунт</div>'+
    '<div class="auth-field"><label>Логин</label><input id="authLogin" placeholder="придумай логин" autocomplete="off"></div>'+
    '<div class="auth-field"><label>Пароль</label><input id="authPass" type="password" placeholder="придумай пароль" autocomplete="off"></div>'+
    '<button class="auth-submit" id="authSubmitBtn">Создать аккаунт</button>'+
    '<div class="auth-error" id="authError"></div>'+
    '<div class="auth-switch">Уже есть аккаунт? <a href="#" id="authSwitchBtn">Войти</a></div>';
}
document.getElementById('authSubmitBtn').onclick=handleAuthSubmit;
document.getElementById('authSwitchBtn').onclick=function(e){e.preventDefault();authMode=(authMode==='login')?'register':'login';renderAuthContent()};
document.getElementById('authLogin').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('authPass').focus()});
document.getElementById('authPass').addEventListener('keydown',function(e){if(e.key==='Enter')handleAuthSubmit()});
bindHovers();
}

function handleAuthSubmit(){
var login=document.getElementById('authLogin').value.trim();
var pass=document.getElementById('authPass').value.trim();
var err=document.getElementById('authError');
err.classList.remove('active');
if(!login||!pass){err.textContent='Заполни оба поля';err.classList.add('active');return}
if(login.length<3){err.textContent='Логин слишком короткий (мин. 3)';err.classList.add('active');return}
if(pass.length<4){err.textContent='Пароль слишком короткий (мин. 4)';err.classList.add('active');return}
var users=JSON.parse(localStorage.getItem('rdx_users')||'{}');
if(authMode==='login'){
  if(!users[login]){err.textContent='Аккаунт не найден. Создай новый!';err.classList.add('active');return}
  if(users[login].pass!==pass){err.textContent='Неверный пароль';err.classList.add('active');return}
  currentUser=login;
  favorites=users[login].favorites||[];
  userRatings=users[login].ratings||{};
  localStorage.setItem('rdx_current',login);
  closeAllModals();updateAuthUI();renderGrid();
  toast('🌸 С возвращением, '+login+'!');
}else{
  if(users[login]){err.textContent='Логин уже занят';err.classList.add('active');return}
  users[login]={pass:pass,favorites:[],ratings:{}};
  localStorage.setItem('rdx_users',JSON.stringify(users));
  currentUser=login;favorites=[];userRatings={};
  localStorage.setItem('rdx_current',login);
  closeAllModals();updateAuthUI();renderGrid();
  spawnConfetti();toast('✨ Аккаунт создан! Добро пожаловать, '+login);
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
  '<button class="auth-logout" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Выйти</button>'+
  '</div>';
document.getElementById('logoutBtn').onclick=logoutUser;
bindHovers();
}

function logoutUser(){
currentUser=null;favorites=[];userRatings={};
localStorage.removeItem('rdx_current');
updateAuthUI();renderGrid();closeAllModals();
toast('👋 Ты вышел из аккаунта');
}

function updateAuthUI(){
document.getElementById('authBtnText').textContent=currentUser||'Войти';
updateFavBadge();
}

function saveUserData(){
if(!currentUser)return;
var users=JSON.parse(localStorage.getItem('rdx_users')||'{}');
if(users[currentUser]){
  users[currentUser].favorites=favorites;
  users[currentUser].ratings=userRatings;
  localStorage.setItem('rdx_users',JSON.stringify(users));
}
}

function loadUserData(){
var cur=localStorage.getItem('rdx_current');
if(cur){
  var users=JSON.parse(localStorage.getItem('rdx_users')||'{}');
  if(users[cur]){
    currentUser=cur;
    favorites=users[cur].favorites||[];
    userRatings=users[cur].ratings||{};
    updateAuthUI();renderGrid();
  }
}
}

document.addEventListener('DOMContentLoaded',runLoading);
