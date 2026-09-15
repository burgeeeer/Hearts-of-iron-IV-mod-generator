(function () {
    var baseMkEmptyCountry = window.mkEmptyCountry;
    var baseRenderCountries = window.renderCountries;
    var basePullCountriesFromDOM = window.pullCountriesFromDOM;
    var baseSaveData = window.saveData;
    var baseLoadSaved = window.loadSaved;
    var baseOnload = window.onload;
    var counterKey = 'burgeeeer_hoi4_mod_generator_visitors_2026';
    var countApiBase = 'https://countapi.mileshilliard.com/api/v1';

    window.mkEmptyCountry = function () {
        var c = baseMkEmptyCountry();
        return c;
    };

    window.loadSaved = function (d) {
        baseLoadSaved(d);
    };

    function registerVisit() {
        try {
            if (localStorage.getItem('hoi4VisitorRegistered') === '1') return;
            fetch(countApiBase + '/hit/' + encodeURIComponent(counterKey), { cache: 'no-store' })
                .then(function (response) {
                    if (response.ok) localStorage.setItem('hoi4VisitorRegistered', '1');
                })
                .catch(function () {});
        } catch (e) {}
    }

    function showOwnerStats() {
        var panel = document.getElementById('ownerStatsPanel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'ownerStatsPanel';
            panel.innerHTML = '<strong id="ownerStatsTitle"></strong><div id="ownerStatsCount">...</div>';
            document.body.appendChild(panel);
        }
        document.getElementById('ownerStatsTitle').textContent = currentLang === 'english' ? 'Site visitors' : 'Посетители сайта';
        fetch(countApiBase + '/get/' + encodeURIComponent(counterKey), { cache: 'no-store' })
            .then(function (response) { return response.json(); })
            .then(function (data) {
                document.getElementById('ownerStatsCount').textContent = String(data.value || '0');
            })
            .catch(function () {
                document.getElementById('ownerStatsCount').textContent = '—';
            });
    }

    function initExtras() {
        registerVisit();
        var params = new URLSearchParams(window.location.search);
        if (params.get('stats') === '1') showOwnerStats();
    }

    window.onload = function () {
        if (typeof baseOnload === 'function') baseOnload();
        initExtras();
    };
})();
