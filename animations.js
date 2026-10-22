/**
 * HOI4 Mod Studio — Anime.js Motion & Micro-interactions
 * Fluid animations, number counters, stagger cascades, tab transitions
 */
(function() {
    'use strict';

    if (typeof anime === 'undefined') {
        console.warn('Anime.js not loaded, skipping enhanced animations.');
        return;
    }

    // 1. Initial Page Load Stagger Animation
    function initEntranceAnimation() {
        anime.timeline({ easing: 'easeOutCubic' })
            .add({
                targets: '.main-header',
                opacity: [0, 1],
                translateY: [-10, 0],
                duration: 400
            })
            .add({
                targets: '.sub-nav-bar',
                opacity: [0, 1],
                translateY: [-8, 0],
                duration: 350
            }, '-=200')
            .add({
                targets: '#view-general-mod .card, #view-general-mod .section:not(.collapsed)',
                opacity: [0, 1],
                translateY: [16, 0],
                delay: anime.stagger(45),
                duration: 500
            }, '-=150')
            .add({
                targets: '.launch-summary-bar',
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 450
            }, '-=250');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEntranceAnimation);
    } else {
        setTimeout(initEntranceAnimation, 60);
    }

    // 2. Animated KPI Metric Counters
    window.animateMetricCounter = function(el, targetVal) {
        if (!el) return;
        var currentVal = parseInt(el.textContent) || 0;
        if (currentVal === targetVal) return;
        
        var counterObj = { val: currentVal };
        anime({
            targets: counterObj,
            val: targetVal,
            round: 1,
            duration: 450,
            easing: 'easeOutExpo',
            update: function() {
                el.textContent = counterObj.val;
            }
        });

        anime({
            targets: el,
            scale: [1, 1.15, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    };

    // 3. Tactile Button Micro-Interaction on Click
    document.addEventListener('click', function(e) {
        var btn = e.target.closest('button, .primary-btn, .secondary-btn, .btn, .btn-primary, .btn-secondary, .mode-tab-btn, .sub-nav-link');
        if (btn) {
            anime({
                targets: btn,
                scale: [1, 0.95, 1],
                duration: 180,
                easing: 'easeInOutQuad'
            });
        }
    }, true);

    // 4. Modal Open Animation
    window.animateModalOpen = function(modalEl) {
        if (!modalEl) return;
        var windowEl = modalEl.querySelector('.modal-window, .projects-modal-window');
        var backdropEl = modalEl.querySelector('.modal-backdrop');
        
        if (backdropEl) {
            anime({
                targets: backdropEl,
                opacity: [0, 1],
                duration: 250,
                easing: 'linear'
            });
        }
        if (windowEl) {
            anime({
                targets: windowEl,
                opacity: [0, 1],
                scale: [0.92, 1],
                translateY: [15, 0],
                duration: 320,
                easing: 'easeOutCubic'
            });
        }
    };

    // Intercept native open modal functions if present
    var origOpenProjects = window.openProjectsModal;
    if (typeof origOpenProjects === 'function') {
        window.openProjectsModal = function() {
            origOpenProjects.apply(this, arguments);
            window.animateModalOpen(document.getElementById('projectsModal'));
        };
    }

    var origCosmOpenProjects = window.cosm_openProjectsModal;
    if (typeof origCosmOpenProjects === 'function') {
        window.cosm_openProjectsModal = function() {
            origCosmOpenProjects.apply(this, arguments);
            window.animateModalOpen(document.getElementById('cosm_projectsModal'));
        };
    }

    var origCosmTriggers = window.cosm_openTriggersModal;
    if (typeof origCosmTriggers === 'function') {
        window.cosm_openTriggersModal = function() {
            origCosmTriggers.apply(this, arguments);
            window.animateModalOpen(document.getElementById('triggersModal'));
        };
    }

    var origCosmEffects = window.cosm_openEffectsModal;
    if (typeof origCosmEffects === 'function') {
        window.cosm_openEffectsModal = function() {
            origCosmEffects.apply(this, arguments);
            window.animateModalOpen(document.getElementById('effectsModal'));
        };
    }

    // 5. Studio View Crossfade Animation
    var origSwitchMode = window.switchStudioMode;
    if (typeof origSwitchMode === 'function') {
        window.switchStudioMode = function(mode) {
            origSwitchMode(mode);
            var activeView = (mode === 'general') 
                ? document.getElementById('view-general-mod') 
                : document.getElementById('view-cosmetic-mod');
            if (activeView) {
                anime({
                    targets: activeView,
                    opacity: [0, 1],
                    translateY: [12, 0],
                    duration: 350,
                    easing: 'easeOutCubic'
                });
            }
        };
    }

    // 6. Theme Toggle Icon Spin / Pulse
    var origToggleTheme = window.toggleTheme;
    if (typeof origToggleTheme === 'function') {
        window.toggleTheme = function() {
            origToggleTheme.apply(this, arguments);
            var iconEl = document.getElementById('themeToggleIcon');
            if (iconEl) {
                anime({
                    targets: iconEl,
                    rotate: [0, 360],
                    scale: [0.7, 1.1, 1],
                    duration: 450,
                    easing: 'easeOutBack'
                });
            }
        };
    }

    // 7. Interactive Country Card Addition Pulse
    var origAddCountry = window.addCountry;
    if (typeof origAddCountry === 'function') {
        window.addCountry = function() {
            origAddCountry.apply(this, arguments);
            var cards = document.querySelectorAll('#countryList .country-card, #countryList .section');
            if (cards.length > 0) {
                var lastCard = cards[cards.length - 1];
                anime({
                    targets: lastCard,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 400,
                    easing: 'easeOutBack'
                });
            }
        };
    }

    // 8. Interactive Puppet Rule Addition Pulse
    var origAddPuppet = window.addPuppetRule;
    if (typeof origAddPuppet === 'function') {
        window.addPuppetRule = function() {
            origAddPuppet.apply(this, arguments);
            var rules = document.querySelectorAll('#puppetRulesList .puppet-card, #puppetRulesList .section');
            if (rules.length > 0) {
                var lastRule = rules[rules.length - 1];
                anime({
                    targets: lastRule,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 400,
                    easing: 'easeOutBack'
                });
            }
        };
    }
})();
