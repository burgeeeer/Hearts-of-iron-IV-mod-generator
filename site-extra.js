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
        c.color = '';
        return c;
    };

    window.loadSaved = function (d) {
        baseLoadSaved(d);
        if (d && d.countries && d.countries.length) {
            for (var i = 0; i < countries.length; i++) {
                countries[i].color = (d.countries[i] && d.countries[i].color) ? d.countries[i].color : '';
            }
        }
    };

    window.renderCountries = function () {
        baseRenderCountries();
        addColorFields();
    };

    window.pullCountriesFromDOM = function () {
        basePullCountriesFromDOM();
        for (var i = 0; i < countries.length; i++) {
            var el = document.getElementById('c' + i + '_color');
            if (el && el.getAttribute('data-custom') === '1') {
                countries[i].color = normalizeHex(el.value);
            }
        }
    };

    window.saveData = function () {
        baseSaveData();
        try {
            var data = JSON.parse(localStorage.getItem('hoi4modData') || '{}');
            if (data.countries && data.countries.length) {
                for (var i = 0; i < data.countries.length; i++) {
                    data.countries[i].color = countries[i] && countries[i].color ? countries[i].color : '';
                }
            }
            localStorage.setItem('hoi4modData', JSON.stringify(data));
        } catch (e) {}
    };

    function addColorFields() {
        var t = currentLang === 'english' ? 'Country color:' : 'Цвет страны:';
        var cards = document.querySelectorAll('.country-card');
        for (var i = 0; i < countries.length; i++) {
            var meta = cards[i] ? cards[i].querySelector('.country-meta') : null;
            if (!meta || document.getElementById('c' + i + '_color')) continue;

            var group = document.createElement('div');
            group.className = 'input-group country-color-group';

            var label = document.createElement('label');
            label.textContent = t;
            group.appendChild(label);

            var row = document.createElement('div');
            row.className = 'country-color-row';

            var picker = document.createElement('input');
            picker.type = 'color';
            picker.id = 'c' + i + '_color';
            picker.className = 'country-color-input';
            picker.value = isHex(countries[i].color) ? countries[i].color : '#808080';
            picker.setAttribute('data-custom', countries[i].color ? '1' : '0');
            picker.oninput = function (idx, input) {
                return function () {
                    input.setAttribute('data-custom', '1');
                    countries[idx].color = normalizeHex(input.value);
                    var value = document.getElementById('c' + idx + '_color-value');
                    if (value) value.textContent = countries[idx].color;
                    saveData();
                };
            }(i, picker);

            var value = document.createElement('span');
            value.id = 'c' + i + '_color-value';
            value.className = 'country-color-value';
            value.textContent = countries[i].color || '';

            row.appendChild(picker);
            row.appendChild(value);
            group.appendChild(row);
            meta.appendChild(group);
        }
    }

    function normalizeHex(value) {
        value = String(value || '').trim().toUpperCase();
        return /^#[0-9A-F]{6}$/.test(value) ? value : '';
    }

    function isHex(value) {
        return /^#[0-9A-F]{6}$/i.test(String(value || ''));
    }

    function hexToRgb(hex) {
        if (!isHex(hex)) return null;
        return {
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16)
        };
    }

    var baseGenerateAsync = JSZip.prototype.generateAsync;
    JSZip.prototype.generateAsync = function (options) {
        try {
            pullCountriesFromDOM();
            var modNameEl = document.getElementById('modName');
            var modName = modNameEl && modNameEl.value.trim() ? modNameEl.value.trim() : 'CustomMod';
            var modFolder = this.folder(modName);
            var countryFolder = modFolder.folder('common/countries');
            var normal = [];
            var cosmetic = [];

            for (var i = 0; i < countries.length; i++) {
                var c = countries[i] || {};
                var tag = String(c.tag || '').toUpperCase().trim();
                var rgb = hexToRgb(c.color);
                if (!tag || !rgb) continue;
                var block = tag + ' = {\n' +
                    '    color = rgb { ' + rgb.r + ' ' + rgb.g + ' ' + rgb.b + ' }\n' +
                    '    color_ui = rgb { ' + rgb.r + ' ' + rgb.g + ' ' + rgb.b + ' }\n' +
                    '}';
                if (c.tagType === 'cosmetic') cosmetic.push(block);
                else normal.push(block);
            }

            if (normal.length) countryFolder.file('colors.txt', normal.join('\n\n') + '\n');
            if (cosmetic.length) countryFolder.file('cosmetic.txt', cosmetic.join('\n\n') + '\n');
        } catch (e) {}
        return baseGenerateAsync.call(this, options);
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
