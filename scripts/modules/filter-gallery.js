/* =========================================
   ФАЙЛ: scripts/modules/gallery.js
========================================= */

export const initGallery = () => {
  // 1. Отримуємо елементи Фільтру та нові Картки
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-card'); // Оновлений клас картки

  // 2. Отримуємо елементи Модального вікна
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const overlay = document.querySelector('.lightbox-overlay');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  // Змінні для відстеження поточного фото
  let visibleItems = Array.from(galleryItems);
  let currentIndex = 0;

  if (!lightbox) return;

  // =========================================
  // ЛОГІКА ФІЛЬТРАЦІЇ
  // =========================================
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });

      // Оновлюємо масив видимих карток
      visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
    });
  });

  // =========================================
  // ЛОГІКА МОДАЛЬНОГО ВІКНА (LIGHTBOX)
  // =========================================

  // Відкриття фото
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      currentIndex = visibleItems.indexOf(item);

      // МАГІЯ ТУТ: Беремо посилання на ВЕЛИКЕ фото з атрибута data-highres
      const imageWrap = item.querySelector('.gallery-card-image');
      const highResSrc = imageWrap.getAttribute('data-highres');

      // Вставляємо велике фото в модальне вікно
      lightboxImg.setAttribute('src', highResSrc);

      lightbox.classList.add('active');
      document.body.classList.add('no-scroll');
    });
  });

  // Функція закриття
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');

    // Опціонально: очищаємо src при закритті, щоб при наступному відкритті
    // не "блимало" попереднє фото, поки вантажиться нове
    setTimeout(() => {
      lightboxImg.setAttribute('src', '');
    }, 300); // чекаємо закінчення анімації зникнення
  };

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);

  // Функція перемикання фото
  const changeImage = direction => {
    currentIndex += direction;

    if (currentIndex >= visibleItems.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = visibleItems.length - 1;
    }

    // МАГІЯ ТУТ 2: При гортанні стрілками теж беремо data-highres наступної картки
    const nextImageWrap = visibleItems[currentIndex].querySelector('.gallery-card-image');
    const newHighResSrc = nextImageWrap.getAttribute('data-highres');

    lightboxImg.setAttribute('src', newHighResSrc);
  };

  // Кліки по стрілках
  nextBtn.addEventListener('click', e => {
    e.stopPropagation(); // Щоб клік по стрілці не закривав модалку (не спрацьовував клік по overlay)
    changeImage(1);
  });

  prevBtn.addEventListener('click', e => {
    e.stopPropagation();
    changeImage(-1);
  });

  // Клавіатура
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'ArrowLeft') changeImage(-1);
  });
  // =========================================
  // ЛОГІКА СВАЙПУ ДЛЯ МОБІЛЬНИХ (TOUCH EVENTS)
  // =========================================
  let touchStartX = 0;
  let touchEndX = 0;

  // Коли палець торкається екрана
  lightbox.addEventListener(
    'touchstart',
    e => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  // Коли палець відривається від екрана
  lightbox.addEventListener(
    'touchend',
    e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  // Функція, яка визначає, чи був це свайп, і в який бік
  const handleSwipe = () => {
    const swipeThreshold = 50; // Мінімальна довжина свайпу в пікселях, щоб не реагувати на випадкове тремтіння пальця

    if (touchEndX < touchStartX - swipeThreshold) {
      // Свайп вліво -> Наступне фото
      changeImage(1);
    }

    if (touchEndX > touchStartX + swipeThreshold) {
      // Свайп вправо -> Попереднє фото
      changeImage(-1);
    }
  };
};
