export function initTestimonials() {
  // Ініціалізація меню та галереї (твої модулі)
  if (typeof initMobileMenu === 'function') initMobileMenu();
  if (typeof initGallery === 'function') initGallery();

  // 1. Слайдер
  const track = document.querySelector('.testimonials-track');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');

  if (track && nextBtn && prevBtn) {
    const getScrollAmount = () => {
      const card = track.querySelector('.testimonial-card');
      return card ? card.offsetWidth + 20 : 300;
    };

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
  }

  // 2. Відео
  const modal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('videoPlayer');
  const playButtons = document.querySelectorAll('.video-play-btn');
  const closeBtn = document.querySelector('.close-modal');

  if (modal && playButtons.length > 0) {
    playButtons.forEach(btn => {
      btn.onclick = e => {
        e.preventDefault();

        // Отримуємо унікальний ID відео з атрибута data-video
        const videoId = btn.getAttribute('data-video');
        const isVertical = btn.getAttribute('data-format') === 'vertical'; // Перевірка формату

        if (videoId) {
          modal.classList.add('active');

          const container = modal.querySelector('.video-container');
          // Додаємо або прибираємо клас залежно від формату
          if (isVertical) {
            container.classList.add('vertical');
          } else {
            container.classList.remove('vertical');
          }
          // Формуємо повне посилання з отриманим ID
          videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
      };
    });

    const closeModalFunc = () => {
      modal.classList.remove('active');
      videoPlayer.src = '';
    };

    if (closeBtn) closeBtn.onclick = closeModalFunc;

    window.onclick = event => {
      if (event.target == modal) closeModalFunc();
    };
  }
}
