/* =========================================
   ФАЙЛ: scripts/modules/mobile-menu.js
========================================= */

export const initMobileMenu = () => {
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');
  const body = document.body;
  const navLinks = document.querySelectorAll('.nav-link, .btn-outline'); // Всі посилання в меню

  // Якщо на сторінці немає хедера, перериваємо скрипт, щоб не було помилок
  if (!hamburger || !mainNav) return;

  // Функція для перемикання станів
  const toggleMenu = () => {
    hamburger.classList.toggle('is-active');
    mainNav.classList.toggle('is-open');
    body.classList.toggle('no-scroll'); // Блокуємо або дозволяємо прокрутку фону
  };

  // Слухаємо клік по гамбургеру
  hamburger.addEventListener('click', toggleMenu);

  // Закриваємо меню, якщо користувач клікнув на пункт меню
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Перевіряємо, чи меню зараз відкрите (чи є ми на мобільній версії)
      if (mainNav.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });
};
