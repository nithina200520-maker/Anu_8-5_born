const WISHES = [
  "Little Anu, may your day be as bright and beautiful as your smile! May every moment today sparkle with joy, laughter, and all the magic you deserve! 🌟",
  "Happy Birthday to the most adorable princess! May your special day be filled with the sweetest moments, biggest hugs, and all your favourite things! 🎂",
  "Today the whole world celebrates the most precious little girl! May your birthday be as wonderful as you make every day for everyone around you! 💖",
  "Dearest Anu, may your birthday bring you a mountain of gifts, a river of sweets, and endless love from everyone who adores you! You deserve it all! 🎊",
  "Wishing our little princess the most magical birthday! May every candle you blow out bring a dream that comes true! You are pure joy! ✨",
  "Happy Birthday sweet Anu! May you always stay this adorable, this curious, and this full of life. The world is brighter because of you! 🌸",
  "To the most beautiful little star — today is YOUR day! May it be filled with cake, balloons, dancing, and every happiness your heart can hold! 🎈",
  "Anu you are loved more than you know! May this birthday be the beginning of the most amazing adventure of your life. Sky is not the limit — you are! 👑",
];
const EMOJI_SETS=[['🎂','🎉','🎊','🥳','🌟','💖'],['👑','✨','🎈','🎁','🌸','💕'],['⭐','🎆','💝','🥂','🌺','💫']];
const COLORS=['#ff4fa7','#c15bff','#ffe070','#7effda','#ff7e5f','#5bf5ff','#fff','#ffb347','#ff6b6b','#a8ff78'];
const HEARTS=['❤️','💖','💕','💗','💝','🌸','⭐','✨','🎂','🎉','🥳','👑','🌟','💫','🎊','🎈','🎀','🌺'];

function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function launch(){
  const name=document.getElementById('nameInput').value.trim()||'Princess';
  document.getElementById('wishName').textContent=name+'!';
  document.getElementById('wishMsg').textContent=WISHES[Math.floor(Math.random()*WISHES.length)];
  const set=EMOJI_SETS[Math.floor(Math.random()*EMOJI_SETS.length)];
  const row=document.getElementById('emojiRow');
  row.innerHTML='';
  set.forEach((e,i)=>{
    const s=document.createElement('span');
    s.textContent=e;
    s.style.setProperty('--ed',(0.8+i*.15)+'s');
    s.style.animationDelay=i*.08+'s';
    row.appendChild(s);
  });
  go('surpriseScreen');
  setTimeout(()=>{spawnConfetti();spawnHearts();spawnFireworks();spawnLasers();},200);
}

function spawnConfetti(){
  for(let i=0;i<120;i++){
    setTimeout(()=>{
      const c=document.createElement('div');
      c.className='confetti-piece';
      const dx=(Math.random()-.5)*300;
      c.style.cssText=`left:${Math.random()*100}vw;background:${COLORS[Math.floor(Math.random()*COLORS.length)]};width:${Math.random()*12+5}px;height:${Math.random()*12+5}px;--dx:${dx}px;animation-duration:${(Math.random()*2.5+2).toFixed(1)}s;border-radius:${Math.random()>.5?'50%':'3px'};`;
      document.body.appendChild(c);
      setTimeout(()=>c.remove(),5500);
    },i*18);
  }
}

function spawnHearts(){
  for(let i=0;i<24;i++){
    setTimeout(()=>{
      const h=document.createElement('div');
      h.className='heart-float';
      h.textContent=HEARTS[Math.floor(Math.random()*HEARTS.length)];
      h.style.cssText=`left:${Math.random()*100}vw;font-size:${Math.random()*1.8+0.8}rem;animation-duration:${(Math.random()*3+3).toFixed(1)}s;`;
      document.body.appendChild(h);
      setTimeout(()=>h.remove(),8000);
    },i*160);
  }
}

function spawnFireworks(){
  const spots=[[15,20],[85,15],[50,10],[10,50],[90,45],[30,70],[70,65],[50,35]];
  spots.forEach((pos,idx)=>{
    setTimeout(()=>{
      const fw=document.createElement('div');
      fw.className='firework';
      fw.style.cssText=`left:${pos[0]}vw;top:${pos[1]}vh;`;
      const col=COLORS[Math.floor(Math.random()*COLORS.length)];
      for(let i=0;i<24;i++){
        const angle=(i/24)*360;
        const dist=Math.random()*100+50;
        const rad=angle*(Math.PI/180);
        const sp=document.createElement('div');
        sp.className='spark';
        sp.style.cssText=`background:${col};--tx:${Math.cos(rad)*dist}px;--ty:${Math.sin(rad)*dist}px;--dur:${(Math.random()*.6+.5).toFixed(2)}s;box-shadow:0 0 6px ${col};`;
        fw.appendChild(sp);
      }
      document.body.appendChild(fw);
      setTimeout(()=>fw.remove(),1600);
    },idx*300);
  });
}

function spawnLasers(){
  const cols=['#ff4fa7','#c15bff','#ffe070','#7effda','#ff7e5f'];
  for(let i=0;i<12;i++){
    setTimeout(()=>{
      const l=document.createElement('div');
      l.className='laser';
      l.style.cssText=`left:${Math.random()*100}vw;top:${Math.random()*100}vh;background:${cols[Math.floor(Math.random()*cols.length)]};transform:rotate(${Math.random()*360}deg);opacity:0.7;box-shadow:0 0 8px currentColor;`;
      document.body.appendChild(l);
      setTimeout(()=>l.remove(),700);
    },i*120);
  }
}


const MEMORY_IMGS = [
  "images/memory-01.jpg",
  "images/memory-02.jpg",
  "images/memory-03.jpg",
  "images/memory-04.jpg",
  "images/memory-05.jpg",
  "images/memory-06.png",
  "images/memory-07.jpg",
  "images/memory-08.png",
  "images/memory-09.jpg",
  "images/memory-10.jpg"
];

let currentSlide = 0;
let slideInterval = null;
let isPlaying = false;

function openMemory() {
  go('memoryScreen');
  initMemoryScreen();
  setTimeout(() => spawnMemoryMoons(), 300);
}

function initMemoryScreen() {
  // Build thumbnails
  const strip = document.getElementById('thumbStrip');
  strip.innerHTML = '';
  MEMORY_IMGS.forEach((src, i) => {
    const t = document.createElement('div');
    t.className = 'thumb' + (i === 0 ? ' active' : '');
    t.onclick = () => goToSlide(i);
    const img = document.createElement('img');
    img.src = src;
    t.appendChild(img);
    strip.appendChild(t);
  });

  // Build dots
  const dotRow = document.getElementById('dotRow');
  dotRow.innerHTML = '';
  MEMORY_IMGS.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goToSlide(i);
    dotRow.appendChild(d);
  });

  // Slide stars
  const ss = document.getElementById('slideStars');
  ss.innerHTML = '';
  const starSymbols = ['★','✦','✧','⭐','🌟'];
  for (let i = 0; i < 20; i++) {
    const s = document.createElement('div');
    s.className = 'slide-star-item';
    s.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;--sd:${(Math.random()*2+1).toFixed(1)}s;--ss:${(Math.random()*0.8+0.5).toFixed(1)}rem;animation-delay:${(Math.random()*3).toFixed(1)}s;`;
    ss.appendChild(s);
  }

  currentSlide = 0;
  updateSlide();
}

function updateSlide() {
  const img = document.getElementById('slideImg');
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = MEMORY_IMGS[currentSlide];
    img.style.opacity = 1;
  }, 250);
  document.getElementById('slideCounter').textContent = (currentSlide + 1) + ' / ' + MEMORY_IMGS.length;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  document.querySelectorAll('.thumb').forEach((t, i) => t.classList.toggle('active', i === currentSlide));
  // scroll thumb into view
  const thumbs = document.querySelectorAll('.thumb');
  if (thumbs[currentSlide]) thumbs[currentSlide].scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
}

function goToSlide(i) {
  currentSlide = i;
  updateSlide();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % MEMORY_IMGS.length;
  updateSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + MEMORY_IMGS.length) % MEMORY_IMGS.length;
  updateSlide();
}

function togglePlay() {
  isPlaying = !isPlaying;
  const btn = document.getElementById('playBtn');
  if (isPlaying) {
    btn.textContent = '⏸';
    slideInterval = setInterval(nextSlide, 2500);
  } else {
    btn.textContent = '▶';
    clearInterval(slideInterval);
  }
}

function spawnMemoryMoons() {
  const symbols = ['🌙','⭐','🌟','✨','💫','🌛','🌠'];
  for (let i = 0; i < 14; i++) {
    const m = document.createElement('div');
    m.className = 'float-moon';
    m.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    m.style.cssText = `left:${Math.random()*100}vw;top:${Math.random()*100}vh;--fm:${(Math.random()*3+2).toFixed(1)}s;--fms:${(Math.random()*1.5+0.8).toFixed(1)}rem;animation-delay:${(Math.random()*2).toFixed(1)}s;`;
    document.body.appendChild(m);
    setTimeout(() => m.remove(), 8000);
  }
}


// Stars
const starsEl=document.getElementById('stars');
for(let i=0;i<160;i++){
  const s=document.createElement('div');
  s.className='star';
  const sz=Math.random()*2.8+0.4;
  s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${sz}px;height:${sz}px;--d:${(Math.random()*3+1).toFixed(1)}s;animation-delay:${(Math.random()*5).toFixed(1)}s;`;
  starsEl.appendChild(s);
}
