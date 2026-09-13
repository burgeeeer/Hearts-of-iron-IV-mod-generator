(function () {
    var baseMkEmptyCountry = window.mkEmptyCountry;
    var baseRenderCountries = window.renderCountries;
    var basePullCountriesFromDOM = window.pullCountriesFromDOM;
    var baseSaveData = window.saveData;
    var baseLoadSaved = window.loadSaved;
    var baseOnload = window.onload;
    var counterKey = 'burgeeeer_hoi4_mod_generator_visitors_2026';
    var countApiBase = 'https://countapi.mileshilliard.com/api/v1';

    var vanillaCountryColors = {
        GER: ['106 119 89', '138 155 116'], ENG: ['201 56 93', '255 73 121'], SOV: ['125 13 24', '163 17 31'],
        SWE: ['36 132 247', '47 172 255'], FRA: ['57 113 228', '74 147 255'], LUX: ['65 175 179', '85 228 233'],
        BEL: ['193 171 8', '251 222 10'], HOL: ['203 138 74', '255 179 96'], CZE: ['54 167 156', '70 217 203'],
        POL: ['197 92 106', '255 120 138'], AUS: ['194 198 215', '255 255 255'], LIT: ['219 219 119', '255 255 155'],
        EST: ['50 135 175', '99 204 254'], LAT: ['75 77 186', '124 125 184'], SPR: ['242 205 94', '255 255 122'],
        ITA: ['67 127 63', '87 165 82'], ROM: ['215 196 72', '255 255 120'], YUG: ['72 73 126', '94 95 164'],
        SWI: ['224 5 5', '193 81 81'], TUR: ['171 190 152', '222 247 198'], GRE: ['93 181 227', '121 235 255'],
        ALB: ['149 45 102', '194 59 133'], NOR: ['111 71 71', '144 92 92'], DEN: ['153 116 93', '199 151 121'],
        BUL: ['51 155 0', '210 147 217'], POR: ['39 116 70', '51 151 91'], FIN: ['205 212 228', '255 255 255'],
        IRE: ['80 159 90', '104 207 117'], HUN: ['249 126 98', '255 164 127'], AFG: ['64 160 167', '83 208 217'],
        ARG: ['145 157 236', '189 204 255'], AST: ['57 143 97', '74 186 126'], BHU: ['172 122 88', '172 122 88'],
        BRA: ['76 145 63', '99 189 82'], CAN: ['119 48 39', '155 62 51'], CHL: ['155 101 107', '202 131 139'],
        COL: ['222 187 91', '255 243 118'], COS: ['152 128 43', '152 128 43'], ECU: ['249 146 98', '255 190 127'],
        ELS: ['152 130 191', '198 169 248'], ETH: ['152 130 191', '198 169 248'], GUA: ['72 49 112', '72 49 112'],
        HON: ['128 145 65', '128 145 65'], IRQ: ['178 114 99', '231 148 129'], JAP: ['255 223 179', '255 242 212'],
        LIB: ['152 130 191', '198 169 248'], MEX: ['104 152 83', '135 198 108'], NIC: ['146 179 191', '146 179 191'],
        NZL: ['152 130 191', '198 169 248'], PAN: ['152 130 191', '198 169 248'], PER: ['71 113 97', '92 147 126'],
        PHI: ['152 130 191', '198 169 248'], PRU: ['196 189 204', '255 246 255'], SAF: ['152 130 191', '198 169 248'],
        SAU: ['171 190 152', '222 247 198'], SIA: ['171 190 152', '222 247 198'], SIK: ['71 190 152', '222 247 198'],
        TIB: ['80 115 45', '222 247 198'], URG: ['171 190 152', '222 247 198'], VEN: ['171 190 152', '222 247 198'],
        YUN: ['114 148 80', '222 247 198'], USA: ['20 133 237', '87 160 255'], MON: ['108 140 42', '209 247 133'],
        MEN: ['185 255 152', '165 230 132'], TAN: ['152 130 191', '198 169 248'], PAR: ['57 113 228', '74 147 255'],
        CUB: ['140 65 166', '140 65 166'], DOM: ['152 130 191', '198 169 248'], HAI: ['174 113 113', '174 113 113'],
        YEM: ['155 101 107', '202 131 139'], OMA: ['155 101 107', '202 131 139'], SLO: ['158 161 188', '255 255 255'],
        RAJ: ['170 10 10', '200 10 10'], CRO: ['230 70 180', '230 255 122'], PRC: ['245 12 55', '178 34 60'],
        GXC: ['71 113 97', '71 113 97'], SHX: ['82 2 15', '101 30 41'], XSM: ['105 90 132', '105 90 132'],
        LBA: ['200 180 90', '200 180 90'], EGY: ['230 230 70', '230 230 70'], PAL: ['170 125 80', '170 125 80'],
        LEB: ['130 150 60', '130 150 60'], JOR: ['111 55 78', '111 55 78'], SYR: ['100 100 150', '100 100 150'],
        SER: ['160 110 110', '160 110 110'], ICE: ['100 125 175', '100 125 175'], UKR: ['0 80 230', '0 80 230'],
        AZR: ['69 151 49', '69 151 49'], GEO: ['255 150 150', '255 204 204'], ARM: ['176 102 180', '176 102 180'],
        LAO: ['176 102 136', '176 102 136'], INS: ['128 158 118', '128 158 118'], VIN: ['230 223 50', '230 223 50'],
        CAM: ['100 71 150', '100 71 150'], MAL: ['213 169 121', '213 169 121'], MNT: ['77 90 105', '77 90 105']
    };

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
        pullCountriesFromDOM();
        var modNameEl = document.getElementById('modName');
        var modName = modNameEl && modNameEl.value.trim() ? modNameEl.value.trim() : 'CustomMod';
        var modFolder = this.folder(modName);
        var countryFolder = modFolder.folder('common/countries');
        var normal = [];
        var cosmetic = [];
        var hasAnyNormalColor = false;
        var hasAnyCosmeticColor = false;
        var palette = {};

        for (var vanillaTag in vanillaCountryColors) {
            if (Object.prototype.hasOwnProperty.call(vanillaCountryColors, vanillaTag)) {
                palette[vanillaTag] = vanillaCountryColors[vanillaTag];
            }
        }

        for (var i = 0; i < countries.length; i++) {
            var c = countries[i] || {};
            var tag = String(c.tag || '').toUpperCase().trim();
            var rgb = hexToRgb(c.color);
            if (!tag || !rgb) continue;

            var rgbText = rgb.r + ' ' + rgb.g + ' ' + rgb.b;
            if (c.tagType === 'cosmetic') {
                cosmetic.push(tag + ' = {\n    color = rgb { ' + rgbText + ' }\n    color_ui = rgb { ' + rgbText + ' }\n}');
                hasAnyCosmeticColor = true;
            } else {
                normal.push(tag + ' = {\n    color = rgb { ' + rgbText + ' }\n    color_ui = rgb { ' + rgbText + ' }\n}');
                palette[tag] = [rgbText, rgbText];
                hasAnyNormalColor = true;
            }
        }

        if (hasAnyNormalColor) {
            var colorLines = ['#reload countrycolors'];
            for (var tagKey in palette) {
                if (!Object.prototype.hasOwnProperty.call(palette, tagKey)) continue;
                colorLines.push(tagKey + ' = {\n    color = rgb { ' + palette[tagKey][0] + ' }\n    color_ui = rgb { ' + palette[tagKey][1] + ' }\n}');
            }
            countryFolder.file('colors.txt', colorLines.join('\n\n') + '\n');
        }

        if (hasAnyCosmeticColor) {
            countryFolder.file('cosmetic.txt', ['#reload cosmeticcolors'].concat(cosmetic).join('\n\n') + '\n');
        }

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
