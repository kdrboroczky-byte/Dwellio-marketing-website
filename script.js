(function () {
  'use strict';

  function init() {
    const header = document.querySelector('header');
    const menu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.navlinks');

    function updateHeader() {
      if (header) header.classList.toggle('scrolled', window.scrollY > 30);
    }
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    function setMenu(open) {
      if (!menu || !nav) return;
      nav.classList.toggle('open', open);
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', open);
    }

    if (menu && nav) {
      menu.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        setMenu(menu.getAttribute('aria-expanded') !== 'true');
      });

      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setMenu(false); });
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth > 900) setMenu(false);
      }, { passive: true });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') setMenu(false);
      });
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = document.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('visible'); });
    } else {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { observer.observe(el); });
    }

    const gallery = document.querySelector('[data-lightbox-gallery]');
    if (gallery) {
      const figures = Array.from(gallery.querySelectorAll('figure'));
      const images = figures.map(function (figure) { return figure.querySelector('img'); }).filter(Boolean);
      if (images.length) {
        const box = document.createElement('div');
        box.className = 'lightbox';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.innerHTML = '<button class="lightbox-close" aria-label="Close">×</button><button class="lightbox-prev" aria-label="Previous image">‹</button><img alt="Expanded project photograph"><button class="lightbox-next" aria-label="Next image">›</button><div class="lightbox-count"></div>';
        document.body.appendChild(box);
        const large = box.querySelector('img');
        const count = box.querySelector('.lightbox-count');
        let current = 0;
        function show(index) {
          current = (index + images.length) % images.length;
          large.src = images[current].src;
          large.alt = images[current].alt || 'Project photograph';
          count.textContent = (current + 1) + ' / ' + images.length;
        }
        function open(index) {
          show(index);
          box.classList.add('open');
          document.body.style.overflow = 'hidden';
          box.querySelector('.lightbox-close').focus();
        }
        function close() {
          box.classList.remove('open');
          document.body.style.overflow = '';
        }
        figures.forEach(function (figure, index) {
          figure.setAttribute('tabindex', '0');
          figure.addEventListener('click', function () { open(index); });
          figure.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault(); open(index);
            }
          });
        });
        box.querySelector('.lightbox-close').addEventListener('click', close);
        box.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
        box.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });
        box.addEventListener('click', function (event) { if (event.target === box) close(); });
        document.addEventListener('keydown', function (event) {
          if (!box.classList.contains('open')) return;
          if (event.key === 'Escape') close();
          if (event.key === 'ArrowLeft') show(current - 1);
          if (event.key === 'ArrowRight') show(current + 1);
        });
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
