/**
 * Coral Coffee Space — Menu & Catalog Interactions
 * Features:
 * 1. Image Shake / Jiggle on item tap & scroll entrance
 * 2. Smooth Scroll Fade-In & Fade-Out for Catalog Cards
 * 3. Synthetic Audio Feedback (Web Audio API)
 * 4. Floating Crave Counter & Reaction Burst
 * 5. Sticky Category Nav Sync
 */

document.addEventListener('DOMContentLoaded', () => {
  initItemThumbnailShake();
  initScrollFadeEffects();
  initCategoryNavSync();
  initCraveMeter();
  initMascotFun();
});

/**
 * 1. Small Cutout Thumbnail Shake on Tap / Click
 */
function initItemThumbnailShake() {
  const itemRows = document.querySelectorAll('.menu-item-row');

  itemRows.forEach(row => {
    const thumb = row.querySelector('.thumb-cutout');

    row.addEventListener('click', () => {
      if (thumb) {
        triggerDeliciousShake(thumb);
      }
      playBubblePopSound();
    });

    row.addEventListener('touchstart', () => {
      if (thumb) {
        triggerDeliciousShake(thumb);
      }
      playBubblePopSound();
    }, { passive: true });
  });
}

function triggerDeliciousShake(img) {
  if (!img) return;
  img.classList.remove('is-shaking');
  void img.offsetWidth; // Force reflow
  img.classList.add('is-shaking');

  setTimeout(() => {
    img.classList.remove('is-shaking');
  }, 700);
}

/**
 * 2. Scroll-Driven Fade-In & Fade-Out for Catalog Cards
 */
function initScrollFadeEffects() {
  const cards = document.querySelectorAll('.scroll-fade-section');
  if (!cards.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-5% 0px -10% 0px',
    threshold: [0, 0.15, 0.5, 0.9]
  };

  const hasEnteredOnce = new WeakSet();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;
      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight;

      if (entry.isIntersecting) {
        card.classList.add('is-visible');
        card.classList.remove('is-scrolled-past');

        // Playful subtle shake on first featured thumbnail in this card
        if (!hasEnteredOnce.has(card)) {
          hasEnteredOnce.add(card);
          const firstThumb = card.querySelector('.thumb-cutout');
          if (firstThumb) {
            setTimeout(() => {
              triggerDeliciousShake(firstThumb);
            }, 300);
          }
        }
      } else {
        if (rect.bottom < 85) {
          // Passed top viewport -> softly dim
          card.classList.remove('is-visible');
          card.classList.add('is-scrolled-past');
        } else if (rect.top > vh - 40) {
          // Below viewport -> prepare to rise
          card.classList.remove('is-visible');
          card.classList.remove('is-scrolled-past');
        }
      }
    });
  }, observerOptions);

  cards.forEach(card => observer.observe(card));

  // 60fps Scroll position update
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateCardScrollState(cards);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateCardScrollState(cards);
}

function updateCardScrollState(cards) {
  const vh = window.innerHeight;
  const topThreshold = 85;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < topThreshold && rect.bottom < topThreshold + 40) {
      card.classList.remove('is-visible');
      card.classList.add('is-scrolled-past');
    } else if (rect.top < vh - 40 && rect.bottom > topThreshold) {
      card.classList.add('is-visible');
      card.classList.remove('is-scrolled-past');
    } else if (rect.top >= vh - 40) {
      card.classList.remove('is-visible');
      card.classList.remove('is-scrolled-past');
    }
  });
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
        const targetTop = targetSec.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;

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
 * 5. Floating Crave Counter & Reaction Burst
 */
function initCraveMeter() {
  const craveBtn = document.getElementById('craveBtn');
  const craveCount = document.getElementById('craveCount');
  if (!craveBtn || !craveCount) return;

  let count = 142;
  const emojis = ['❤️', '🔥', '☕', '✨', '😋', '🥤', '🍜'];

  craveBtn.addEventListener('click', () => {
    count++;
    craveCount.textContent = `${count} orang ngiler hari ini 🔥`;
    playBubblePopSound();

    const rect = craveBtn.getBoundingClientRect();
    const particle = document.createElement('div');
    particle.className = 'crave-particle';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = `${rect.left + rect.width / 2 + (Math.random() * 40 - 20)}px`;
    particle.style.top = `${rect.top - 10}px`;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 900);
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
