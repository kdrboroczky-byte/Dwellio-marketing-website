
const header=document.querySelector('header');addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30));
const menu=document.querySelector('.mobile-menu'),nav=document.querySelector('.navlinks');if(menu){menu.onclick=()=>nav.classList.toggle('open');nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'))}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
