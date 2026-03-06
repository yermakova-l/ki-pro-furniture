// Імпорт головного файлу стилів (Vite сам зробить з них один файл)
import '../styles/style.css';

/* =========================================
   Mobile menu functionality
========================================= */
import { initMobileMenu } from './modules/mobile-menu.js';

/* =========================================
   Filtered Galleryfunctionality
========================================= */

import { initGallery } from './modules/filter-gallery.js';

document.addEventListener('DOMContentLoaded', () => {
  // Ініціалізація мобільного меню
  initMobileMenu();
  initGallery();
});
