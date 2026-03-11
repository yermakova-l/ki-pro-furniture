/* =========================================
   Mobile menu functionality
========================================= */
import { initMobileMenu } from './modules/mobile-menu.js';
import { initGallery } from './modules/filter-gallery.js';
import { initTestimonials } from './modules/testimonials.js';

document.addEventListener('DOMContentLoaded', () => {
  // Ініціалізація меню та галереї (твої модулі)
  if (typeof initMobileMenu === 'function') initMobileMenu();
  if (typeof initGallery === 'function') initGallery();
  if (typeof initTestimonials === 'function') initTestimonials();
});
