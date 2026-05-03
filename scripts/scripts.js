/* =========================================
   Combined JS: scripts/scripts.js
========================================= */

const initMobileMenu = () => {
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.getElementById('menuCloseBtn');
  const overlay = document.getElementById('mobileMenuOverlay');
  const body = document.body;
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');

  if (!hamburger || !overlay) return;

  const openMenu = () => {
    overlay.classList.add('is-open');
    hamburger.classList.add('is-active');
    body.classList.add('no-scroll');
  };

  const closeMenu = () => {
    overlay.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    body.classList.remove('no-scroll');
  };

  hamburger.addEventListener('click', openMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
};

const initGallery = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const overlay = document.querySelector('.lightbox-overlay');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  let visibleItems = Array.from(galleryItems);
  let currentIndex = 0;

  if (!lightbox) return;

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

      visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      currentIndex = visibleItems.indexOf(item);
      const imageWrap = item.querySelector('.gallery-card-image');
      const highResSrc = imageWrap.getAttribute('data-highres');
      lightboxImg.setAttribute('src', highResSrc);
      lightbox.classList.add('active');
      document.body.classList.add('no-scroll');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
      lightboxImg.setAttribute('src', '');
    }, 300);
  };

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);

  const changeImage = direction => {
    currentIndex += direction;

    if (currentIndex >= visibleItems.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = visibleItems.length - 1;
    }

    const nextImageWrap = visibleItems[currentIndex].querySelector('.gallery-card-image');
    const newHighResSrc = nextImageWrap.getAttribute('data-highres');
    lightboxImg.setAttribute('src', newHighResSrc);
  };

  nextBtn.addEventListener('click', e => {
    e.stopPropagation();
    changeImage(1);
  });

  prevBtn.addEventListener('click', e => {
    e.stopPropagation();
    changeImage(-1);
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'ArrowLeft') changeImage(-1);
  });

  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener(
    'touchstart',
    e => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    'touchend',
    e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  const handleSwipe = () => {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
      changeImage(1);
    }

    if (touchEndX > touchStartX + swipeThreshold) {
      changeImage(-1);
    }
  };
};

const initTestimonials = () => {
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

  const modal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('videoPlayer');
  const playButtons = document.querySelectorAll('.video-play-btn');
  const closeBtn = document.querySelector('.close-modal');

  if (modal && playButtons.length > 0) {
    playButtons.forEach(btn => {
      btn.onclick = e => {
        e.preventDefault();
        const videoId = btn.getAttribute('data-video');
        const isVertical = btn.getAttribute('data-format') === 'vertical';

        if (videoId) {
          modal.classList.add('active');
          const container = modal.querySelector('.video-container');
          if (isVertical) {
            container.classList.add('vertical');
          } else {
            container.classList.remove('vertical');
          }
          videoPlayer.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
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
};

/* ========================================
    Send form data to w3form 
=========================================*/

const initContactForm = () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  // Створюємо Toast у DOM при ініціалізації
  if (!document.querySelector('.toast')) {
    const toastHTML = `
            <div id="toast" class="toast">
                <div class="toast-icon-box">✓</div>
                <div class="toast-content">
                    <span class="toast-title">Success!</span>
                    <span class="toast-message">Your message has been sent.</span>
                </div>
            </div>`;
    document.body.insertAdjacentHTML('beforeend', toastHTML);
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = contactForm.querySelector('.form-submit');
    const toast = document.getElementById('toast');
    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Стан завантаження
    const originalBtnText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then(async response => {
        if (response.status == 200) {
          toast.classList.add('show');
          contactForm.reset();
          setTimeout(() => toast.classList.remove('show'), 5000);
        } else {
          alert('Error: Something went wrong.');
        }
      })
      .catch(error => {
        console.error(error);
        alert('Submission failed. Check your connection.');
      })
      .finally(() => {
        btn.textContent = originalBtnText;
        btn.disabled = false;
      });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initGallery();
  initTestimonials();
  initContactForm();
});
