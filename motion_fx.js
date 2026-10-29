/**
 * ============================================================================
 * HOI4 MOD STUDIO — MOTION DESIGN ENGINE (Powered by Anime.js & Spring Physics)
 * Tactile micro-interactions, spring physics, staggered choreographies
 * ============================================================================
 */

(function(window) {
  'use strict';

  const MotionFX = {
    // Check if anime is available
    hasAnime: function() {
      return typeof window.anime === 'function';
    },

    // 1. Initial Page Entrance Stagger
    animatePageEntrance: function() {
      if (!this.hasAnime()) return;

      // Animate Topbar
      window.anime({
        targets: '.app-header',
        translateY: [-24, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutCubic'
      });

      // Animate Mode Selector & Status Bar
      window.anime({
        targets: '.header-mode-nav, .project-toolbar',
        translateY: [-12, 0],
        opacity: [0, 1],
        delay: window.anime.stagger(80, { start: 150 }),
        duration: 500,
        easing: 'easeOutCubic'
      });

      // Stagger Sections in Active View
      const activeView = (document.getElementById('view-cosmetic-mod') && document.getElementById('view-cosmetic-mod').style.display !== 'none')
        ? '#view-cosmetic-mod'
        : '#view-general-mod';

      window.anime({
        targets: `${activeView} .section, ${activeView} .cosm-presets-card, ${activeView} .hoi4-gui-decision-preview-box`,
        translateY: [24, 0],
        opacity: [0, 1],
        delay: window.anime.stagger(60, { start: 200 }),
        duration: 650,
        easing: 'easeOutQuart'
      });
    },

    // 2. Studio Mode Switcher Cross-Fade & Slide
    animateModeSwitch: function(targetMode, onMidpoint) {
      if (!this.hasAnime()) {
        if (typeof onMidpoint === 'function') onMidpoint();
        return;
      }

      const activeView = targetMode === 'general'
        ? document.getElementById('view-cosmetic-mod')
        : document.getElementById('view-general-mod');

      const incomingView = targetMode === 'general'
        ? document.getElementById('view-general-mod')
        : document.getElementById('view-cosmetic-mod');

      // Slide out current view
      if (activeView && activeView.style.display !== 'none') {
        window.anime({
          targets: activeView,
          translateX: [0, targetMode === 'general' ? 24 : -24],
          opacity: [1, 0],
          duration: 200,
          easing: 'easeInCubic',
          complete: function() {
            if (typeof onMidpoint === 'function') onMidpoint();

            // Slide in incoming view
            if (incomingView) {
              incomingView.style.display = 'block';
              window.anime({
                targets: incomingView,
                translateX: [targetMode === 'general' ? -24 : 24, 0],
                opacity: [0, 1],
                duration: 380,
                easing: 'easeOutCubic'
              });

              // Stagger its child sections
              window.anime({
                targets: incomingView.querySelectorAll('.section, .card, .hoi4-gui-decision-preview-box'),
                translateY: [20, 0],
                opacity: [0, 1],
                delay: window.anime.stagger(45, { start: 60 }),
                duration: 520,
                easing: 'easeOutQuart'
              });
            }
          }
        });
      } else {
        if (typeof onMidpoint === 'function') onMidpoint();
        if (incomingView) {
          incomingView.style.display = 'block';
          window.anime({
            targets: incomingView,
            opacity: [0, 1],
            duration: 320,
            easing: 'easeOutCubic'
          });
        }
      }
    },

    // 3. Preset Button Click Interaction
    animatePresetClick: function(buttonEl) {
      if (!this.hasAnime() || !buttonEl) return;

      // Spring button bounce
      window.anime({
        targets: buttonEl,
        scale: [1, 0.92, 1.06, 1],
        duration: 380,
        easing: 'easeOutBack'
      });

      // Animate the Live Preview in-game box updating
      const previewBox = document.querySelector('.hoi4-gui-decision-preview-box, .hoi4-gui-window');
      if (previewBox) {
        window.anime({
          targets: previewBox,
          scale: [0.97, 1.02, 1],
          opacity: [0.75, 1],
          duration: 420,
          easing: 'easeOutElastic(1, .8)'
        });
      }

      // Pulse Category Map Thumbnail
      const thumb = document.getElementById('catPicThumbnail');
      if (thumb) {
        window.anime({
          targets: thumb,
          scale: [0.88, 1.05, 1],
          duration: 350,
          easing: 'easeOutBack'
        });
      }
    },

    // 4. Modal Open Spring Animation
    animateModalOpen: function(modalOverlayEl) {
      if (!this.hasAnime() || !modalOverlayEl) return;

      const windowEl = modalOverlayEl.querySelector('.modal-window, .modal-content, .modal-map-layout');
      const backdropEl = modalOverlayEl.querySelector('.modal-backdrop');

      // Fade backdrop
      if (backdropEl) {
        window.anime({
          targets: backdropEl,
          opacity: [0, 1],
          duration: 250,
          easing: 'easeOutQuad'
        });
      }

      // Spring modal window
      if (windowEl) {
        window.anime({
          targets: windowEl,
          scale: [0.93, 1],
          translateY: [24, 0],
          opacity: [0, 1],
          duration: 450,
          easing: 'easeOutElastic(1, .75)'
        });
      }
    },

    // 4b. Modal Close Animation
    animateModalClose: function(modalOverlayEl, onComplete) {
      if (!this.hasAnime() || !modalOverlayEl) {
        if (typeof onComplete === 'function') onComplete();
        return;
      }

      const windowEl = modalOverlayEl.querySelector('.modal-window, .modal-content, .modal-map-layout');
      const backdropEl = modalOverlayEl.querySelector('.modal-backdrop');

      if (windowEl) {
        window.anime({
          targets: windowEl,
          scale: [1, 0.94],
          translateY: [0, 18],
          opacity: [1, 0],
          duration: 220,
          easing: 'easeInCubic'
        });
      }

      if (backdropEl) {
        window.anime({
          targets: backdropEl,
          opacity: [1, 0],
          duration: 200,
          easing: 'easeInQuad',
          complete: function() {
            if (typeof onComplete === 'function') onComplete();
          }
        });
      } else {
        setTimeout(function() {
          if (typeof onComplete === 'function') onComplete();
        }, 220);
      }
    },

    // 5. State Card Selection Toggle
    animateStateCard: function(cardEl, isSelected) {
      if (!this.hasAnime() || !cardEl) return;

      window.anime({
        targets: cardEl,
        scale: isSelected ? [1, 0.92, 1.06, 1] : [1, 0.95, 1],
        duration: 320,
        easing: 'easeOutBack'
      });

      const checkEl = cardEl.querySelector('.state-card-check');
      if (checkEl && isSelected) {
        window.anime({
          targets: checkEl,
          rotate: [-60, 0],
          scale: [0.4, 1.15, 1],
          duration: 280,
          easing: 'easeOutBack'
        });
      }
    },

    // 6. Dock Counter Number Bump
    animateCounterBump: function(counterEl) {
      if (!this.hasAnime() || !counterEl) return;

      window.anime({
        targets: counterEl,
        scale: [1, 1.45, 1],
        duration: 300,
        easing: 'easeOutBack'
      });
    },

    // 7. Dock Chip Addition
    animateChipEntrance: function(chipEl) {
      if (!this.hasAnime() || !chipEl) return;

      window.anime({
        targets: chipEl,
        translateX: [-15, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 280,
        easing: 'easeOutCubic'
      });
    },

    // 8. Theme Switcher 360 Spin
    animateThemeToggle: function(iconEl) {
      if (!this.hasAnime() || !iconEl) return;

      window.anime({
        targets: iconEl,
        rotate: '+=360deg',
        scale: [1, 1.35, 1],
        duration: 500,
        easing: 'easeOutBack'
      });
    },

    // 9. Toast Notification Spring Pop
    animateToast: function(toastEl) {
      if (!this.hasAnime() || !toastEl) return;

      window.anime({
        targets: toastEl,
        translateY: [35, 0],
        opacity: [0, 1],
        scale: [0.92, 1],
        duration: 400,
        easing: 'easeOutElastic(1, .8)'
      });
    },

    // 9b. Toast Notification Hide
    animateToastHide: function(toastEl, onComplete) {
      if (!this.hasAnime() || !toastEl) {
        if (typeof onComplete === 'function') onComplete();
        return;
      }

      window.anime({
        targets: toastEl,
        translateY: [0, 20],
        opacity: [1, 0],
        scale: [1, 0.9],
        duration: 250,
        easing: 'easeInCubic',
        complete: function() {
          if (typeof onComplete === 'function') onComplete();
        }
      });
    },

    // 10. Live Preview Update Pulse
    animateLivePreviewUpdate: function() {
      if (!this.hasAnime()) return;
      const previewBox = document.querySelector('.hoi4-gui-window');
      if (previewBox && !previewBox._animating) {
        previewBox._animating = true;
        window.anime({
          targets: previewBox,
          scale: [1, 1.008, 1],
          duration: 300,
          easing: 'easeOutQuad',
          complete: function() { previewBox._animating = false; }
        });
      }
    },

    // 11. Staggered Cards Entrance (Filtered states, cheat list)
    animateCardsEntrance: function(container) {
      if (!this.hasAnime() || !container) return;
      const items = Array.from(container.querySelectorAll('.state-card, .cheat-item-row')).slice(0, 36);
      if (items.length === 0) return;

      window.anime({
        targets: items,
        opacity: [0, 1],
        translateY: [12, 0],
        delay: window.anime.stagger(15, { start: 20 }),
        duration: 280,
        easing: 'easeOutCubic'
      });
    },

    // 12. Universal Button Spring Ripples
    attachButtonSprings: function() {
      if (!this.hasAnime()) return;

      document.addEventListener('click', function(e) {
        const btn = e.target.closest('button, .btn-primary, .btn-secondary, .btn-map-launch, .region-tab, .cat-pill, .mode-tab-btn, .sub-nav-link');
        if (btn) {
          window.anime({
            targets: btn,
            scale: [1, 0.94, 1.02, 1],
            duration: 280,
            easing: 'easeOutBack'
          });
        }
      });
    }
  };

  // Expose to window
  window.MotionFX = MotionFX;

  // Auto-init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      MotionFX.animatePageEntrance();
      MotionFX.attachButtonSprings();
    }, 100);
  });

})(window);
