const button=document.querySelector('.menu-button');
const menu=document.querySelector('.site-menu');
button?.addEventListener('click',()=>{const open=menu.classList.toggle('open');button.setAttribute('aria-expanded',String(open));button.textContent=open?'CLOSE':'MENU';});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');button?.setAttribute('aria-expanded','false');if(button)button.textContent='MENU';}));
