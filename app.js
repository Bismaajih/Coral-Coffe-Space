/**
 * Coral Coffee Space — Interaction & Visual Psychology Script
 * Features:
 * 1. Image Shake / Jiggle on tap & scroll entrance (Appetite stimulation)
 * 2. Smooth Scroll Fade-In & Fade-Out (Focus retention)
 * 3. Synthetic Audio Feedback (Zero-dependency Web Audio API)
 * 4. Floating Crave Counter & Heart Bursts
 * 5. Sticky Category Nav Sync
 */

document.addEventListener('DOMContentLoaded', () => {
  initImageShakeInteraction();
  initScrollFadeEffects();
  initCategoryNavSync();
  initCraveMeter();
  initMascotFun();
});

/**
 * 1. Image Shake / Jiggle on Tap & Scroll Entrance
 */
function initImageShakeInteraction() {
  const shakeContainers = document.querySelectorAll('.visual-interactive-wrap');

  shakeContainers.forEach(container => {
    const img = container.querySelector('.product-png-photo');
    if (!img) return;

    // Trigger on Click / Tap
    container.addEventListener('click', () => {
      triggerDeliciousShake(img);
      playBubblePopSound();
      spawnMiniReaction(container, '✨');
    });

    // Touch feedback
    container.addEventListener('touchstart', () => {
      triggerDeliciousShake(img);
      playBubblePopSound();
    }, { passive: true });
  });
}

function triggerDeliciousShake(img) {
  if (!img) return;
  img.classList.remove('is-shaking');
  // Trigger reflow to restart CSS animation
  void img.offsetWidth;
  img.classList.add('is-shaking');

  setTimeout(() => {
    img.classList.remove('is-shaking');
  }, 700);
}

/**
 * 2. Scroll-Driven Fade In & Fade Out for Product Images
 */
function initScrollFadeEffects() {
  const fadeElements = document.querySelectorAll('.scroll-fade-elem');
  if (!fadeElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-5% 0px -10% 0px',
    threshold: [0, 0.2, 0.6, 1.0]
  };

  const hasShakenOnce = new WeakSet();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const rect = entry.boundingClientRect;
      const vh = window.innerHeight;

      if (entry.isIntersecting) {
        el.classList.add('is-visible');
        el.classList.remove('is-scrolled-past');

        // Psychology trick: trigger a playful entrance wobble once when entering view!
        if (!hasShakenOnce.has(el)) {
          hasShakenOnce.add(el);
          const img = el.querySelector('.product-png-photo');
          if (img) {
            setTimeout(() => {
              triggerDeliciousShake(img);
            }, 250);
          }
        }
      } else {
        if (rect.bottom < 85) {
          // Lewat ke atas layar -> fade out lembut
          el.classList.remove('is-visible');
          el.classList.add('is-scrolled-past');
        } else if (rect.top > vh - 40) {
          // Di bawah layar -> sembunyikan siap masuk
          el.classList.remove('is-visible');
          el.classList.remove('is-scrolled-past');
        }
      }
    });
  }, observerOptions);

  fadeElements.forEach(elem => observer.observe(elem));

  // Fallback 60fps scroll listener
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollPositions(fadeElements);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateScrollPositions(fadeElements);
}

function updateScrollPositions(elements) {
  const vh = window.innerHeight;
  const topThreshold = 85;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < topThreshold && rect.bottom < topThreshold + 40) {
      el.classList.remove('is-visible');
      el.classList.add('is-scrolled-past');
    } else if (rect.top < vh - 40 && rect.bottom > topThreshold) {
      el.classList.add('is-visible');
      el.classList.remove('is-scrolled-past');
    } else if (rect.top >= vh - 40) {
      el.classList.remove('is-visible');
      el.classList.remove('is-scrolled-past');
    }
  });
}

/**
 * 3. Zero-Dependency Web Audio Synthesizer (Ice clink / Bubble pop)
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
    // Frequency slide for a cute ice pop / bubble sound
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (err) {
    // Audio optional, silently ignore if blocked by browser policy
  }
}

/**
 * 4. Sticky Category Nav Sync & Smooth Scrolling
 */
function initCategoryNavSync() {
  const pills = document.querySelectorAll('.cat-pill');
  const sections = document.querySelectorAll('.menu-block');
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
      if (rect.top <= navHeight + 90 && rect.bottom >= navHeight) {
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
 * 5. Floating Crave Counter & Reaction Burst (Psychological Social Proof)
 */
function initCraveMeter() {
  const craveBtn = document.getElementById('craveBtn');
  const craveCount = document.getElementById('craveCount');
  if (!craveBtn || !craveCount) return;

  let count = 142;
  const emojis = ['❤️', '🔥', '☕', '✨', '😋', '🥤'];

  craveBtn.addEventListener('click', (e) => {
    count++;
    craveCount.textContent = `${count} orang ngiler hari ini 🔥`;
    playBubblePopSound();

    // Spawn floating particle
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

function spawnMiniReaction(container, emoji) {
  const particle = document.createElement('div');
  particle.className = 'crave-particle';
  particle.textContent = emoji;
  const rect = container.getBoundingClientRect();
  particle.style.left = `${rect.left + rect.width / 2}px`;
  particle.style.top = `${rect.top + rect.height / 3}px`;
  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 850);
}

/**
 * 6. Mascot Fun Interaction
 */
function initMascotFun() {
  const mascot = document.getElementById('mascotCup');
  if (!mascot) return;

  mascot.addEventListener('click', () => {
    playBubblePopSound();
    spawnMiniReaction(mascot, '☕');
  });
}
