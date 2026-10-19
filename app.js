/**
 * Coral Coffee Space — Simple Editorial Mobile Menu
 * Interaction & Scroll-Driven Smooth Fade-In / Fade-Out Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollFadeEffects();
  initCategoryNavSync();
});

/**
 * 1. Scroll-Driven Smooth Fade In & Fade Out for Product Images
 * Ketika di-scroll:
 * - Muncul halus saat memasuki viewport dari bawah
 * - Menghilang lembut saat lewat ke atas viewport
 * - Muncul kembali dengan mulus saat di-scroll balik ke bawah
 */
function initScrollFadeEffects() {
  const fadeTargets = document.querySelectorAll('.scroll-fade-target');
  if (!fadeTargets.length) return;

  // Gunakan kombinasi IntersectionObserver + subtle scroll position check
  const observerOptions = {
    root: null,
    rootMargin: '-5% 0px -10% 0px', // Active zone di area tengah layar
    threshold: [0, 0.15, 0.5, 0.85, 1.0]
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const rect = entry.boundingClientRect;
      const viewportHeight = window.innerHeight;

      if (entry.isIntersecting) {
        // Objek sedang berada di dalam viewport aktif
        el.classList.add('is-visible');
        el.classList.remove('is-scrolled-past');
      } else {
        // Objek keluar dari viewport
        if (rect.bottom < 80) {
          // Keluar melewati bagian atas (scrolled past)
          el.classList.remove('is-visible');
          el.classList.add('is-scrolled-past');
        } else if (rect.top > viewportHeight - 50) {
          // Keluar ke bagian bawah (belum sampai)
          el.classList.remove('is-visible');
          el.classList.remove('is-scrolled-past');
        }
      }
    });
  }, observerOptions);

  fadeTargets.forEach(target => fadeObserver.observe(target));

  // Handle scroll events with requestAnimationFrame for 60fps buttery smooth transitions
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateFadeStates(fadeTargets);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial check on page load
  updateFadeStates(fadeTargets);
}

function updateFadeStates(targets) {
  const viewportHeight = window.innerHeight;
  const stickyNavOffset = 90; // Tinggi sticky nav + margin

  targets.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < stickyNavOffset && rect.bottom < stickyNavOffset + 40) {
      // Telah melewati bagian atas layar -> Menghilang halus
      el.classList.remove('is-visible');
      el.classList.add('is-scrolled-past');
    } else if (rect.top < viewportHeight - 40 && rect.bottom > stickyNavOffset) {
      // Sedang aktif di tengah pandangan mata -> Tampil jelas & tajam
      el.classList.add('is-visible');
      el.classList.remove('is-scrolled-past');
    } else if (rect.top >= viewportHeight - 40) {
      // Masih di bawah pandangan layar -> Siap meluncur masuk
      el.classList.remove('is-visible');
      el.classList.remove('is-scrolled-past');
    }
  });
}

/**
 * 2. Sticky Category Navigation & Smooth Anchor Scroll
 */
function initCategoryNavSync() {
  const pills = document.querySelectorAll('.cat-pill');
  const sections = document.querySelectorAll('.menu-section');
  const navTrack = document.querySelector('.category-scroll-track');

  // Click handler untuk smooth scroll dengan sticky offset
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = pill.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const navHeight = document.getElementById('categoryNav').offsetHeight || 55;
        const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });

        // Update active class langsung
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        centerPillInTrack(pill, navTrack);
      }
    });
  });

  // Sync active pill saat scrolling melewati section
  window.addEventListener('scroll', () => {
    const navHeight = document.getElementById('categoryNav').offsetHeight || 55;
    let currentActiveId = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navHeight + 80 && rect.bottom >= navHeight) {
        currentActiveId = section.getAttribute('id');
      }
    });

    if (currentActiveId) {
      pills.forEach(pill => {
        if (pill.getAttribute('data-target') === currentActiveId) {
          if (!pill.classList.contains('active')) {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            centerPillInTrack(pill, navTrack);
          }
        }
      });
    }
  }, { passive: true });
}

function centerPillInTrack(pill, track) {
  if (!track || !pill) return;
  const pillLeft = pill.offsetLeft;
  const pillWidth = pill.offsetWidth;
  const trackWidth = track.offsetWidth;

  track.scrollTo({
    left: pillLeft - (trackWidth / 2) + (pillWidth / 2),
    behavior: 'smooth'
  });
}
