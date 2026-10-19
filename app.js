/**
 * Coral Coffee Space — Menu & Interaction Script
 * Features:
 * 1. Scroll-Driven Slide & Fade In/Out for Cutout Images (smooth scroll entrance & exit)
 * 2. Synthetic Audio Feedback (Web Audio API)
 * 3. Sticky Category Nav Sync
 * 4. Floating Crave Counter & Reaction Burst
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollSlideEffects();
  initCategoryNavSync();
  initMascotFun();
});

/**
 * 1. Scroll-Driven Slide & Fade In/Out for Cutout Images
 * - Saat scroll awal masuk: slide perlahan & fade in
 * - Saat berada di viewport: tampak jernih 100%
 * - Saat scroll ke bawah lagi: menghilang slide out & fade out
 * - Saat scroll balik ke atas: muncul kembali dengan halus
 */
function initScrollSlideEffects() {
  const slideElements = document.querySelectorAll('.scroll-slide-elem');
  if (!slideElements.length) return;

  function updateSlidePositions() {
    const vh = window.innerHeight;
    const enterThreshold = vh * 0.90;
    const exitThreshold = 75;

    slideElements.forEach(el => {
      const rect = el.getBoundingClientRect();

      if (rect.bottom < exitThreshold) {
        // Scroll lewat ke atas: slide out & fade out
        el.classList.remove('slide-active', 'slide-below');
        el.classList.add('slide-above');
      } else if (rect.top > enterThreshold) {
        // Belum sampai (di bawah layar): siap untuk slide in
        el.classList.remove('slide-active', 'slide-above');
        el.classList.add('slide-below');
      } else {
        // Tepat di dalam layar (viewport): slide in & fade in
        el.classList.remove('slide-below', 'slide-above');
        el.classList.add('slide-active');
      }
    });
  }

  // 60fps Scroll tracking
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateSlidePositions();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial update
  updateSlidePositions();
}

/**
 * 3. Zero-Dependency Web Audio Synthesizer (Ice clink / Pop sound)
 */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playBubblePopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(560, now);
    osc.frequency.exponentialRampToValueAtTime(920, now + 0.07);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (err) {
    // Audio optional, ignore if browser policy limits auto sound
  }
}

/**
 * 4. Sticky Category Nav Sync & Smooth Scrolling
 */
function initCategoryNavSync() {
  const pills = document.querySelectorAll('.cat-pill');
  const sections = document.querySelectorAll('.editorial-section');
  const track = document.getElementById('categoryTrack');

  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = pill.getAttribute('data-target');
      const targetSec = document.getElementById(targetId);

      if (targetSec) {
        const navHeight = document.getElementById('categoryNav').offsetHeight || 55;
        const targetTop = targetSec.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });

        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        centerPill(pill, track);
        playBubblePopSound();
      }
    });
  });

  window.addEventListener('scroll', () => {
    const navHeight = document.getElementById('categoryNav').offsetHeight || 55;
    let currentId = '';

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= navHeight + 110 && rect.bottom >= navHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      pills.forEach(pill => {
        if (pill.getAttribute('data-target') === currentId) {
          if (!pill.classList.contains('active')) {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            centerPill(pill, track);
          }
        }
      });
    }
  }, { passive: true });
}

function centerPill(pill, track) {
  if (!track || !pill) return;
  const pillLeft = pill.offsetLeft;
  const pillWidth = pill.offsetWidth;
  const trackWidth = track.offsetWidth;

  track.scrollTo({
    left: pillLeft - (trackWidth / 2) + (pillWidth / 2),
    behavior: 'smooth'
  });
}



/**
 * 6. Mascot Fun Interaction
 */
function initMascotFun() {
  const mascot = document.getElementById('mascotCup');
  if (!mascot) return;

  mascot.addEventListener('click', () => {
    playBubblePopSound();
  });
}
