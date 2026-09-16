/* Prevent the overlord-tag input from being rebuilt on every keystroke. */
(function () {
    var baseRenderPuppetRules = window.renderPuppetRules;

    function isOverlordInput(el) {
        if (!el || el.tagName !== 'INPUT' || el.type !== 'text') return false;
        var group = el.parentElement;
        if (!group || !group.classList.contains('input-group')) return false;
        var label = group.querySelector('label');
        if (!label || !window.i18n) return false;
        var t = window.i18n[window.currentLang] || {};
        return label.textContent === t.puppetOverlord;
    }

    // generator-fixes.js currently calls renderPuppetRules() from the
    // overlord field's oninput callback. Do not rebuild the DOM while the
    // user is typing; the value is already saved by that callback.
    window.renderPuppetRules = function () {
        if (isOverlordInput(document.activeElement)) return;
        return baseRenderPuppetRules.apply(this, arguments);
    };

    // Once the user leaves the overlord field, rebuild once so the correct
    // country-specific autonomy section (GER/JAP) appears or disappears.
    document.addEventListener('focusout', function (ev) {
        if (!isOverlordInput(ev.target)) return;
        setTimeout(function () {
            if (typeof baseRenderPuppetRules === 'function') {
                baseRenderPuppetRules();
            }
        }, 0);
    });
})();
