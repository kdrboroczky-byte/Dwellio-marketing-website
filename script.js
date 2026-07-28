const header=document.querySelector('header');
addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>30),{passive:true});
const menu=document.querySelector('.mobile-menu'),nav=document.querySelector('.navlinks');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));}
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}

// Full-screen gallery for project pages
const gallery=document.querySelector('[data-lightbox-gallery]');
if(gallery){
  const figures=[...gallery.querySelectorAll('figure')], images=figures.map(f=>f.querySelector('img'));
  const box=document.createElement('div');box.className='lightbox';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.innerHTML='<button class="lightbox-close" aria-label="Close">×</button><button class="lightbox-prev" aria-label="Previous image">‹</button><img alt="Expanded project photograph"><button class="lightbox-next" aria-label="Next image">›</button><div class="lightbox-count"></div>';document.body.appendChild(box);
  const large=box.querySelector('img'),count=box.querySelector('.lightbox-count');let current=0;
  const show=i=>{current=(i+images.length)%images.length;large.src=images[current].src;large.alt=images[current].alt;count.textContent=`${current+1} / ${images.length}`;};
  const open=i=>{show(i);box.classList.add('open');document.body.style.overflow='hidden';box.querySelector('.lightbox-close').focus();};
  const close=()=>{box.classList.remove('open');document.body.style.overflow='';};
  figures.forEach((f,i)=>{f.addEventListener('click',()=>open(i));f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i)}})});
  box.querySelector('.lightbox-close').onclick=close;box.querySelector('.lightbox-prev').onclick=()=>show(current-1);box.querySelector('.lightbox-next').onclick=()=>show(current+1);box.addEventListener('click',e=>{if(e.target===box)close()});
  addEventListener('keydown',e=>{if(!box.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1)});
}
