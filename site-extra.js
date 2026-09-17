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
        return baseMkEmptyCountry();
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

    function removeExpandedPuppetData() {
        for (var i = 0; i < puppetRules.length; i++) {
            var r = puppetRules[i];
            r.mode = 'short';
            r.shortName = r.shortName || '';
            if (!r.ideologies) r.ideologies = {};
            for (var j = 0; j < ideologies.length; j++) {
                var id = ideologies[j];
                if (!r.ideologies[id]) r.ideologies[id] = { name: '', img: null, autonomy: {} };
                r.ideologies[id].autonomy = {};
            }
        }
    }

    function renderShortOnlyPuppets() {
        var box = document.getElementById('puppet-rules-container');
        if (!box) return;
        box.innerHTML = '';
        var t = i18n[currentLang];

        for (var i = 0; i < puppetRules.length; i++) {
            (function (idx) {
                var r = puppetRules[idx];
                var card = document.createElement('div');
                card.className = 'dynamic-card';

                var hdr = document.createElement('div');
                hdr.className = 'dynamic-card-header';
                var st = document.createElement('strong');
                st.textContent = currentLang === 'english' ? 'Puppet rule #' + (idx + 1) : 'Правило марионетки №' + (idx + 1);
                hdr.appendChild(st);
                if (puppetRules.length > 1) {
                    var rb = document.createElement('button');
                    rb.type = 'button';
                    rb.className = 'secondary-btn danger-btn';
                    rb.textContent = t.remove;
                    rb.onclick = function () { removePuppetRule(idx); };
                    hdr.appendChild(rb);
                }
                card.appendChild(hdr);

                var metaGrid = document.createElement('div');
                metaGrid.className = 'dynamic-grid two-col';
                metaGrid.appendChild(mkGrp(t.puppetOverlord, r.overlord, function (v) {
                    puppetRules[idx].overlord = v.toUpperCase();
                    saveData();
                }));
                metaGrid.appendChild(mkGrp(t.puppetTag, r.tag, function (v) {
                    puppetRules[idx].tag = v.toUpperCase();
                    saveData();
                }));
                card.appendChild(metaGrid);

                for (var ii = 0; ii < ideologies.length; ii++) {
                    (function (ideo) {
                        var data = r.ideologies[ideo] || { name: '', img: null };
                        var title = document.createElement('div');
                        title.className = 'puppet-ideo-head';
                        title.textContent = t[ideo];
                        card.appendChild(title);

                        card.appendChild(mkGrp(t.puppetShortName, data.name || r.shortName || '', function (v) {
                            puppetRules[idx].ideologies[ideo].name = v;
                            puppetRules[idx].shortName = v;
                            saveData();
                        }));

                        addPuppetIdeologyFlag(card, idx, ideo, r, t);
                    })(ideologies[ii]);
                }

                box.appendChild(card);
            })(i);
        }
    }

    window.onload = function () {
        if (typeof baseOnload === 'function') baseOnload();
        removeExpandedPuppetData();
        window.renderPuppetRules = renderShortOnlyPuppets;
        renderShortOnlyPuppets();
        saveData();
        initExtras();
    };
})();
