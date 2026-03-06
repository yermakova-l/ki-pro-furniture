/* =========================================
   ФАЙЛ: scripts/modules/mobile-menu.js
========================================= */

export const initMobileMenu = () => {
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.getElementById('menuCloseBtn'); // Наша нова кнопка Х
  const overlay = document.getElementById('mobileMenuOverlay'); // Наш новий оверлей
  const body = document.body;

  // Всі посилання всередині мобільного оверлею
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');

  // Якщо основних елементів немає, виходимо
  if (!hamburger || !overlay) return;

  // Функція для ВІДКРИТТЯ меню
  const openMenu = () => {
    overlay.classList.add('is-open');
    hamburger.classList.add('is-active'); // Якщо ти хочеш, щоб гамбургер теж міняв вигляд
    body.classList.add('no-scroll');
  };

  // Функція для ЗАКРИТТЯ меню
  const closeMenu = () => {
    overlay.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    body.classList.remove('no-scroll');
  };

  // Слухаємо клік по гамбургеру (відкрити)
  hamburger.addEventListener('click', openMenu);

  // Слухаємо клік по кнопці Х (закрити)
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Закриваємо меню при кліку на будь-яке посилання в ньому
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Додатково: закриваємо, якщо користувач натиснув клавішу Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
};
