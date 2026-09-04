var ideologies = ['fascism', 'democratic', 'communism', 'neutrality'];
var currentLang = 'english';
var countries = [];
var puppetRules = [];
var stateNameRules = [];
var cityNameRules = [];

var autonomyLevels = [
    'reichskommissariat', 'reichsprotectorate', 'satellite', 'puppet', 
    'dominion', 'colony', 'integrated_puppet', 'subjugated', 
    'supervised_state', 'protectorate'
];

var i18n = {
    english: {
        title: "HoI4 Mod Generator",
        modName: "Mod Name (English):",
        countryLabel: "Country",
        addCountry: "Add country",
        tag: "Tag:",
        tagType: "Tag Type:",
        tagNormal: "Normal Tag",
        tagCosmetic: "Cosmetic Tag",
        fascism: "Fascism",
        democratic: "Democratic",
        communism: "Communism",
        neutrality: "Non-Aligned",
        baseName: "Base Name (UI):",
        defName: "Definite Name (Events/Capitulation):",
        adjName: "Adjective:",
        uploadFlag: "Upload Flag (PNG):",
        genBtn: "Generate Mod",
        puppetTitle: "Puppet Names",
        puppetDesc: "Add puppet naming rules. Select mode: Short (1 name for all) or Expanded (detailed names).",
        puppetOverlord: "Overlord tag:",
        puppetTag: "Puppet tag:",
        puppetMode: "Naming Mode:",
        puppetModeShort: "Short (One name for all)",
        puppetModeExpanded: "Expanded (Individual variants)",
        puppetShortName: "Puppet Name (all autonomy levels):",
        puppetNameForIdeology: "Name for this ideology:",
        puppetNameFascism: "Name (Fascism):",
        puppetNameDemocratic: "Name (Democratic):",
        puppetNameCommunism: "Name (Communism):",
        puppetNameNeutrality: "Name (Non-Aligned):",
        autonomyReichskommissariat: "Name (Reichskommissariat):",
        autonomyReichsprotectorate: "Name (Reichsprotectorate):",
        autonomySatellite: "Name (Satellite):",
        autonomyPuppet: "Name (Puppet State):",
        autonomyDominion: "Name (Dominion):",
        autonomyColony: "Name (Colony):",
        autonomyIntegrated_puppet: "Name (Integrated Puppet):",
        autonomySubjugated: "Name (Subjugated):",
        autonomySupervised_state: "Name (Supervised State):",
        autonomyProtectorate: "Name (Protectorate):",
        addPuppet: "Add puppet",
        remove: "Remove",
        stateTitle: "State Names by Controller",
        stateDesc: "Rename a state when controlled by a specific country. Example: State 39 + GER \u2192 Krakau.",
        stateId: "State ID:",
        controllerTag: "Controller tag:",
        stateName: "New state name:",
        addStateRule: "Add state name",
        defaultStateName: "Default name restored when another country takes control.",
        invalidStateRule: "Fill in State ID, Controller tag and New state name first.",
        cityTitle: "City Names by Controller",
        cityDesc: "Rename a city / victory point when a specific country controls its province.",
        cityStateId: "State ID:",
        provinceId: "Province ID:",
        cityName: "New city name:",
        addCityRule: "Add city name",
        invalidCityRule: "Fill in Province ID, Controller tag and New city name first.",
        footerWorkshop: "Mod on Workshop",
        footerSource: "Source Code"
    },
    russian: {
        title: "\u0413\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440 \u0441\u0442\u0440\u0430\u043d HoI4",
        modName: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043c\u043e\u0434\u0430 (\u043d\u0430 \u0430\u043d\u0433\u043b):",
        countryLabel: "\u0421\u0442\u0440\u0430\u043d\u0430",
        addCountry: "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0441\u0442\u0440\u0430\u043d\u0443",
        tag: "\u0422\u0435\u0433:",
        tagType: "\u0422\u0438\u043f \u0442\u0435\u0433\u0430:",
        tagNormal: "\u041e\u0431\u044b\u0447\u043d\u044b\u0439 \u0442\u044d\u0433",
        tagCosmetic: "\u041a\u043e\u0441\u043c\u0435\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0442\u044d\u0433",
        fascism: "\u0424\u0430\u0448\u0438\u0437\u043c",
        democratic: "\u0414\u0435\u043c\u043e\u043a\u0440\u0430\u0442\u0438\u044f",
        communism: "\u041a\u043e\u043c\u043c\u0443\u043d\u0438\u0437\u043c",
        neutrality: "\u041d\u0435\u0439\u0442\u0440\u0430\u043b\u0438\u0442\u0435\u0442",
        baseName: "\u041e\u0441\u043d\u043e\u0432\u043d\u043e\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435:",
        defName: "\u041e\u0444\u0438\u0446. (\u0438\u0432\u0435\u043d\u0442\u044b/\u043a\u0430\u043f\u0438\u0442\u0443\u043b\u044f\u0446\u0438\u044f):",
        adjName: "\u041f\u0440\u0438\u043b\u0430\u0433\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435:",
        uploadFlag: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0444\u043b\u0430\u0433 (PNG):",
        genBtn: "\u0421\u0433\u0435\u043d\u0435\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043c\u043e\u0434",
        puppetTitle: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u043c\u0430\u0440\u0438\u043e\u043d\u0435\u0442\u043e\u043a",
        puppetDesc: "\u0414\u043e\u0431\u0430\u0432\u043b\u044f\u0439 \u043f\u0440\u0430\u0432\u0438\u043b\u0430 \u0434\u043b\u044f \u043c\u0430\u0440\u0438\u043e\u043d\u0435\u0442\u043e\u043a. \u0412\u044b\u0431\u0435\u0440\u0438 \u0440\u0435\u0436\u0438\u043c: \u0423\u043a\u043e\u0440\u043e\u0447\u0435\u043d\u043d\u044b\u0439 \u0438\u043b\u0438 \u0420\u0430\u0437\u0432\u0451\u0440\u043d\u0443\u0442\u044b\u0439.",
        puppetOverlord: "\u0422\u0435\u0433 \u0441\u044e\u0437\u0435\u0440\u0435\u043d\u0430:",
        puppetTag: "\u0422\u0435\u0433 \u043c\u0430\u0440\u0438\u043e\u043d\u0435\u0442\u043a\u0438:",
        puppetMode: "\u0420\u0435\u0436\u0438\u043c \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0439:",
        puppetModeShort: "\u0423\u043a\u043e\u0440\u043e\u0447\u0435\u043d\u043d\u044b\u0439 (\u043e\u0434\u043d\u043e \u0434\u043b\u044f \u0432\u0441\u0435\u0445)",
        puppetModeExpanded: "\u0420\u0430\u0437\u0432\u0451\u0440\u043d\u0443\u0442\u044b\u0439 (\u0434\u043b\u044f \u043a\u0430\u0436\u0434\u043e\u0433\u043e \u0441\u043b\u0443\u0447\u0430\u044f)",
        puppetShortName: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043c\u0430\u0440\u0438\u043e\u043d\u0435\u0442\u043a\u0438 (\u0434\u043b\u044f \u0432\u0441\u0435\u0445 \u0443\u0440\u043e\u0432\u043d\u0435\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u0438\u0438):",
        puppetNameForIdeology: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0434\u043b\u044f \u044d\u0442\u043e\u0439 \u0438\u0434\u0435\u043e\u043b\u043e\u0433\u0438\u0438:",
        puppetNameFascism: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u0424\u0430\u0448\u0438\u0437\u043c):",
        puppetNameDemocratic: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u0414\u0435\u043c\u043e\u043a\u0440\u0430\u0442\u0438\u044f):",
        puppetNameCommunism: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u041a\u043e\u043c\u043c\u0443\u043d\u0438\u0437\u043c):",
        puppetNameNeutrality: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u041d\u0435\u0439\u0442\u0440\u0430\u043b\u0438\u0442\u0435\u0442):",
        autonomyReichskommissariat: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u0420\u0435\u0439\u0445\u0441\u043a\u043e\u043c\u0438\u0441\u0441\u0430\u0440\u0438\u0430\u0442):",
        autonomyReichsprotectorate: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u0420\u0435\u0439\u0445\u0441\u043f\u0440\u043e\u0442\u0435\u043a\u0442\u043e\u0440\u0430\u0442):",
        autonomySatellite: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u0421\u0430\u0442\u0435\u043b\u043b\u0438\u0442):",
        autonomyPuppet: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u041c\u0430\u0440\u0438\u043e\u043d\u0435\u0442\u043a\u0430):",
        autonomyDominion: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u0414\u043e\u043c\u0438\u043d\u0438\u043e\u043d):",
        autonomyColony: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u041a\u043e\u043b\u043e\u043d\u0438\u044f):",
        autonomyIntegrated_puppet: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u0418\u043d\u0442\u0435\u0433\u0440. \u043c\u0430\u0440\u0438\u043e\u043d\u0435\u0442\u043a\u0430):",
        autonomySubjugated: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u041f\u043e\u0434\u0447\u0438\u043d\u0435\u043d\u043d\u043e\u0435 \u0433\u043e\u0441-\u0432\u043e):",
        autonomySupervised_state: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u041f\u043e\u0434\u043d\u0430\u0434\u0437\u043e\u0440\u043d\u043e\u0435 \u0433\u043e\u0441-\u0432\u043e):",
        autonomyProtectorate: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 (\u041f\u0440\u043e\u0442\u0435\u043a\u0442\u043e\u0440\u0430\u0442):",
        addPuppet: "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043c\u0430\u0440\u0438\u043e\u043d\u0435\u0442\u043a\u0443",
        remove: "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
        stateTitle: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u0440\u0435\u0433\u0438\u043e\u043d\u043e\u0432 \u043f\u043e \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0438\u0440\u0443\u044e\u0449\u0435\u0439 \u0441\u0442\u0440\u0430\u043d\u0435",
        stateDesc: "\u041f\u0435\u0440\u0435\u0438\u043c\u0435\u043d\u043e\u0432\u044b\u0432\u0430\u0439 \u0440\u0435\u0433\u0438\u043e\u043d, \u043a\u043e\u0433\u0434\u0430 \u0438\u043c \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u0442 \u043a\u043e\u043d\u043a\u0440\u0435\u0442\u043d\u0430\u044f \u0441\u0442\u0440\u0430\u043d\u0430. \u041f\u0440\u0438\u043c\u0435\u0440: \u0440\u0435\u0433. 39 + GER \u2192 \u041a\u0440\u0430\u043a\u0430\u0443.",
        stateId: "ID \u0440\u0435\u0433\u0438\u043e\u043d\u0430:",
        controllerTag: "\u0422\u0435\u0433 \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0438\u0440\u0443\u044e\u0449\u0435\u0439:",
        stateName: "\u041d\u043e\u0432\u043e\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435:",
        addStateRule: "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0440\u0435\u0433\u0438\u043e\u043d\u0430",
        defaultStateName: "\u0418\u0441\u0445\u043e\u0434\u043d\u043e\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u043f\u0440\u0438 \u0441\u043c\u0435\u043d\u0435 \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0438\u0440\u0443\u044e\u0449\u0435\u0439 \u0441\u0442\u0440\u0430\u043d\u044b.",
        invalidStateRule: "\u0417\u0430\u043f\u043e\u043b\u043d\u0438 ID \u0440\u0435\u0433\u0438\u043e\u043d\u0430, \u0442\u0435\u0433 \u0438 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0435\u0440\u0435\u0434 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435\u043c.",
        cityTitle: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u0433\u043e\u0440\u043e\u0434\u043e\u0432 \u043f\u043e \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0438\u0440\u0443\u044e\u0449\u0435\u0439 \u0441\u0442\u0440\u0430\u043d\u0435",
        cityDesc: "\u041f\u0435\u0440\u0435\u0438\u043c\u0435\u043d\u043e\u0432\u044b\u0432\u0430\u0439 \u0433\u043e\u0440\u043e\u0434 / \u043f\u043e\u0431\u0435\u0434\u043d\u0443\u044e \u0442\u043e\u0447\u043a\u0443, \u043a\u043e\u0433\u0434\u0430 \u0435\u0433\u043e \u043f\u0440\u043e\u0432\u0438\u043d\u0446\u0438\u0435\u0439 \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u0442 \u043a\u043e\u043d\u043a\u0440\u0435\u0442\u043d\u0430\u044f \u0441\u0442\u0440\u0430\u043d\u0430.",
        cityStateId: "ID \u0440\u0435\u0433\u0438\u043e\u043d\u0430:",
        provinceId: "ID \u043f\u0440\u043e\u0432\u0438\u043d\u0446\u0438\u0438:",
        cityName: "\u041d\u043e\u0432\u043e\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435:",
        addCityRule: "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0433\u043e\u0440\u043e\u0434\u0430",
        invalidCityRule: "\u0417\u0430\u043f\u043e\u043b\u043d\u0438 ID \u043f\u0440\u043e\u0432\u0438\u043d\u0446\u0438\u0438, \u0442\u0435\u0433 \u0438 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0435\u0440\u0435\u0434 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435\u043c.",
        footerWorkshop: "\u041c\u043e\u0434 \u0432 \u043c\u0430\u0441\u0442\u0435\u0440\u0441\u043a\u043e\u0439",
        footerSource: "\u0418\u0441\u0445\u043e\u0434\u043d\u044b\u0439 \u043a\u043e\u0434 \u0441\u0430\u0439\u0442\u0430"
    }
};

function mkEmptyCountry() {
    var c = { tag: '', tagType: 'normal', ideologies: {} };
    for (var i = 0; i < ideologies.length; i++) {
        c.ideologies[ideologies[i]] = { base: '', def: '', adj: '', img: null };
    }
    return c;
}

function mkEmptyPuppet() {
    var p = { overlord: '', tag: '', mode: 'short', shortName: '', ideologies: {} };
    for (var i = 0; i < ideologies.length; i++) {
        p.ideologies[ideologies[i]] = { name: '', img: null, autonomy: {} };
        for (var j = 0; j < autonomyLevels.length; j++) {
            p.ideologies[ideologies[i]].autonomy[autonomyLevels[j]] = '';
        }
    }
    return p;
}


function mkEmptyState() {
    return { stateId: '', controllerTag: '', name: '' };
}

function mkEmptyCity() {
    return { stateId: '', provinceId: '', controllerTag: '', name: '' };
}

function toggleSection(el) {
    var card = el.closest('.section, .country-card');
    if (card) card.classList.toggle('collapsed');
}

window.onload = function() {
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem('hoi4modData')); } catch(e) {}

    var lang = 'english';
    if (saved && saved.lang) {
        lang = saved.lang;
    } else {
        var ul = new URLSearchParams(window.location.search).get('lang');
        if (ul === 'ru' || ul === 'en') {
            lang = ul === 'ru' ? 'russian' : 'english';
        } else {
            var bl = (navigator.language || navigator.userLanguage || '').toLowerCase();
            lang = bl.indexOf('ru') === 0 ? 'russian' : 'english';
        }
    }
    currentLang = lang;

    if (saved) {
        loadSaved(saved);
    } else {
        countries = [mkEmptyCountry()];
        puppetRules = [mkEmptyPuppet()];
        stateNameRules = [mkEmptyState()];
        cityNameRules = [mkEmptyCity()];
    }

    document.getElementById('app-content').style.display = 'block';
    applyLang(lang);
};

function loadSaved(d) {
    document.getElementById('modName').value = d.modName || '';

    if (d.countries && d.countries.length) {
        countries = [];
        for (var i = 0; i < d.countries.length; i++) {
            var sc = d.countries[i];
            var c = { tag: sc.tag || '', tagType: sc.tagType || 'normal', ideologies: {} };
            for (var j = 0; j < ideologies.length; j++) {
                var id = ideologies[j];
                if (sc.ideologies && sc.ideologies[id]) {
                    c.ideologies[id] = {
                        base: sc.ideologies[id].base || '',
                        def: sc.ideologies[id].def || '',
                        adj: sc.ideologies[id].adj || '',
                        img: sc.ideologies[id].img || null
                    };
                } else {
                    c.ideologies[id] = { base: '', def: '', adj: '', img: null };
                }
            }
            countries.push(c);
        }
    } else {
        countries = [mkEmptyCountry()];
    }

    if (d.puppetRules && d.puppetRules.length) {
        puppetRules = [];
        for (var pi = 0; pi < d.puppetRules.length; pi++) {
            var pr = d.puppetRules[pi];
            var np = {
                overlord: pr.overlord || '',
                tag: pr.tag || '',
                mode: pr.mode || 'short',
                shortName: pr.shortName || '',
                ideologies: {}
            };
            for (var pj = 0; pj < ideologies.length; pj++) {
                var pid = ideologies[pj];
                var oldIdeo = pr.ideologies && pr.ideologies[pid] ? pr.ideologies[pid] : {};
                np.ideologies[pid] = {
                    name: oldIdeo.name || (pr.mode === 'short' ? (pr.shortName || '') : ''),
                    img: oldIdeo.img || null,
                    autonomy: {}
                };
                for (var ak = 0; ak < autonomyLevels.length; ak++) {
                    var al = autonomyLevels[ak];
                    // New format: autonomy is stored inside the ideology.
                    // Backward compatibility: read the old shared autonomy values when present.
                    np.ideologies[pid].autonomy[al] = (oldIdeo.autonomy && oldIdeo.autonomy[al])
                        ? oldIdeo.autonomy[al]
                        : ((pr.autonomy && pr.autonomy[al]) ? pr.autonomy[al] : '');
                }
            }
            puppetRules.push(np);
        }
    } else {
        puppetRules = [mkEmptyPuppet()];
    }

    stateNameRules = (d.stateNameRules && d.stateNameRules.length) ? d.stateNameRules : [mkEmptyState()];
    cityNameRules = (d.cityNameRules && d.cityNameRules.length) ? d.cityNameRules.map(function(r) {
        return { stateId: r.stateId || '', provinceId: r.provinceId || '', controllerTag: r.controllerTag || '', name: r.name || '' };
    }) : [mkEmptyCity()];
}

function toggleLanguage() {
    pullCountriesFromDOM();
    saveData();
    var next = currentLang === 'english' ? 'russian' : 'english';
    applyLang(next);
}

function applyLang(lang) {
    currentLang = lang;
    var tb = document.getElementById('langToggleBtn');
    if (tb) tb.innerText = lang === 'english' ? 'RU' : 'EN';

    var t = i18n[lang];
    document.getElementById('titleText').innerText = t.title;
    document.getElementById('modNameLabel').innerText = t.modName;
    document.getElementById('puppetTitle').innerText = t.puppetTitle;
    document.getElementById('puppetDesc').innerText = t.puppetDesc;
    document.getElementById('puppetAddBtn').innerText = '\uff0b ' + t.addPuppet;
    document.getElementById('stateTitle').innerText = t.stateTitle;
    document.getElementById('stateDesc').innerText = t.stateDesc;
    document.getElementById('stateAddBtn').innerText = '\uff0b ' + t.addStateRule;
    document.getElementById('stateDefaultNote').innerText = t.defaultStateName;
    document.getElementById('cityTitle').innerText = t.cityTitle;
    document.getElementById('cityDesc').innerText = t.cityDesc;
    document.getElementById('cityAddBtn').innerText = '\uff0b ' + t.addCityRule;
    document.getElementById('generateBtn').innerText = t.genBtn;

    var fwl = document.getElementById('footerWorkshopLink');
    var fsl = document.getElementById('footerSourceLink');
    if (fwl) fwl.textContent = t.footerWorkshop;
    if (fsl) fsl.textContent = t.footerSource;

    renderCountries();
    renderPuppetRules();
    renderStateNameRules();
    renderCityNameRules();
    saveData();
}

function renderCountries() {
    var box = document.getElementById('countries-container');
    box.innerHTML = '';

    for (var idx = 0; idx < countries.length; idx++) {
        var co = countries[idx];
        var sec = document.createElement('div');
        sec.className = 'section country-card';

        var ideoHtml = '';
        for (var ii = 0; ii < ideologies.length; ii++) {
            var ideo = ideologies[ii];
            var d = co.ideologies[ideo] || {};
            ideoHtml += '<div class="ideology-block">';
            ideoHtml += '<div>';
            ideoHtml += '<h3>' + i18n[currentLang][ideo] + '</h3>';
            ideoHtml += mkInput(i18n[currentLang].baseName, 'c' + idx + '_' + ideo + '_base', d.base);
            ideoHtml += mkInput(i18n[currentLang].defName, 'c' + idx + '_' + ideo + '_def', d.def);
            ideoHtml += mkInput(i18n[currentLang].adjName, 'c' + idx + '_' + ideo + '_adj', d.adj);
            ideoHtml += '</div>';
            ideoHtml += '<div class="flag-preview-container">';
            ideoHtml += '<label>' + i18n[currentLang].uploadFlag + '</label>';
            ideoHtml += '<input type="file" accept="image/png" onchange="handleFlag(event,' + idx + ',\'' + ideo + '\')" style="margin-bottom:8px">';
            ideoHtml += '<div class="canvas-wrapper">';
            ideoHtml += '<div class="canvas-item"><span>82\u00d752</span><canvas id="c' + idx + '_' + ideo + '_cn" width="82" height="52"></canvas></div>';
            ideoHtml += '<div class="canvas-item"><span>41\u00d726</span><canvas id="c' + idx + '_' + ideo + '_cm" width="41" height="26"></canvas></div>';
            ideoHtml += '<div class="canvas-item"><span>10\u00d77</span><canvas id="c' + idx + '_' + ideo + '_cs" width="10" height="7"></canvas></div>';
            ideoHtml += '</div></div></div>';
        }

        var rmBtn = countries.length > 1
            ? '<button type="button" class="secondary-btn danger-btn" onclick="removeCountry(' + idx + ')">' + i18n[currentLang].remove + '</button>'
            : '';

        sec.innerHTML =
            '<div class="country-header" onclick="toggleSection(this)"><strong>' + i18n[currentLang].countryLabel + ' #' + (idx + 1) + '</strong>' + rmBtn + '</div>' +
            '<div class="country-meta">' +
            '<div class="input-group"><label>' + i18n[currentLang].tag + '</label>' +
            '<input type="text" id="c' + idx + '_tag" value="' + esc(co.tag) + '" placeholder="TAG" oninput="onInput()"></div>' +
            '<div class="input-group"><label>' + i18n[currentLang].tagType + '</label>' +
            '<select id="c' + idx + '_tagType" onchange="onInput()">' +
            '<option value="normal"' + (co.tagType === 'normal' ? ' selected' : '') + '>' + i18n[currentLang].tagNormal + '</option>' +
            '<option value="cosmetic"' + (co.tagType === 'cosmetic' ? ' selected' : '') + '>' + i18n[currentLang].tagCosmetic + '</option>' +
            '</select></div></div>' + ideoHtml;

        box.appendChild(sec);
        restoreFlags(idx, co);
    }

    var ab = document.createElement('button');
    ab.type = 'button';
    ab.className = 'add-btn';
    ab.onclick = function() {
        countries.push(mkEmptyCountry());
        renderCountries();
        saveData();
    };
    ab.textContent = '\uff0b ' + i18n[currentLang].addCountry;
    box.appendChild(ab);
}

function mkInput(label, id, val) {
    return '<div class="input-group"><label>' + label + '</label>' +
        '<input type="text" id="' + id + '" value="' + esc(val) + '" oninput="onInput()"></div>';
}

function restoreFlags(ci, co) {
    for (var i = 0; i < ideologies.length; i++) {
        var ideo = ideologies[i];
        var d = co.ideologies[ideo];
        if (d && d.img) {
            paintFlag('c' + ci + '_' + ideo, d.img);
        }
    }
}

function paintFlag(prefix, url) {
    var im = new Image();
    im.onload = function() {
        var pairs = [['cn', 82, 52], ['cm', 41, 26], ['cs', 10, 7]];
        for (var i = 0; i < pairs.length; i++) {
            var cv = document.getElementById(prefix + '_' + pairs[i][0]);
            if (!cv) continue;
            cv.setAttribute('data-img', url);
            var cx = cv.getContext('2d');
            cx.clearRect(0, 0, pairs[i][1], pairs[i][2]);
            cx.drawImage(im, 0, 0, pairs[i][1], pairs[i][2]);
        }
    };
    im.src = url;
}

function onInput() {
    pullCountriesFromDOM();
    saveData();
}

function pullCountriesFromDOM() {
    for (var idx = 0; idx < countries.length; idx++) {
        var tagEl = document.getElementById('c' + idx + '_tag');
        var ttEl = document.getElementById('c' + idx + '_tagType');
        if (tagEl) countries[idx].tag = tagEl.value.toUpperCase();
        if (ttEl) countries[idx].tagType = ttEl.value;

        for (var i = 0; i < ideologies.length; i++) {
            var ideo = ideologies[i];
            var bv = document.getElementById('c' + idx + '_' + ideo + '_base');
            var dv = document.getElementById('c' + idx + '_' + ideo + '_def');
            var av = document.getElementById('c' + idx + '_' + ideo + '_adj');
            var cn = document.getElementById('c' + idx + '_' + ideo + '_cn');
            if (bv) countries[idx].ideologies[ideo].base = bv.value;
            if (dv) countries[idx].ideologies[ideo].def = dv.value;
            if (av) countries[idx].ideologies[ideo].adj = av.value;
            if (cn) countries[idx].ideologies[ideo].img = cn.getAttribute('data-img') || null;
        }
    }
}

function removeCountry(idx) {
    if (countries.length <= 1) return;
    countries.splice(idx, 1);
    renderCountries();
    saveData();
}

function handleFlag(ev, ci, ideo) {
    var f = ev.target.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function(e) {
        var im = new Image();
        im.onload = function() {
            var sz = [['cn', 82, 52], ['cm', 41, 26], ['cs', 10, 7]];
            for (var i = 0; i < sz.length; i++) {
                var cv = document.getElementById('c' + ci + '_' + ideo + '_' + sz[i][0]);
                if (!cv) continue;
                var cx = cv.getContext('2d');
                cx.clearRect(0, 0, sz[i][1], sz[i][2]);
                cx.drawImage(im, 0, 0, sz[i][1], sz[i][2]);
            }
            var main = document.getElementById('c' + ci + '_' + ideo + '_cn');
            if (main) main.setAttribute('data-img', e.target.result);
            pullCountriesFromDOM();
            saveData();
        };
        im.src = e.target.result;
    };
    rd.readAsDataURL(f);
}

function handlePuppetFlag(ev, pi, ideo) {
    var f = ev.target.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function(e) {
        var im = new Image();
        im.onload = function() {
            var sz = [['cn', 82, 52], ['cm', 41, 26], ['cs', 10, 7]];
            for (var i = 0; i < sz.length; i++) {
                var cv = document.getElementById('p' + pi + '_' + ideo + '_' + sz[i][0]);
                if (!cv) continue;
                var cx = cv.getContext('2d');
                cx.clearRect(0, 0, sz[i][1], sz[i][2]);
                cx.drawImage(im, 0, 0, sz[i][1], sz[i][2]);
            }
            var main = document.getElementById('p' + pi + '_' + ideo + '_cn');
            if (main) {
                main.setAttribute('data-img', e.target.result);
                puppetRules[pi].ideologies[ideo].img = e.target.result;
            }
            saveData();
        };
        im.src = e.target.result;
    };
    rd.readAsDataURL(f);
}

function renderPuppetRules() {
    var box = document.getElementById('puppet-rules-container');
    if (!box) return;
    box.innerHTML = '';
    var t = i18n[currentLang];

    for (var i = 0; i < puppetRules.length; i++) {
        (function(idx) {
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
                rb.onclick = function() { removePuppetRule(idx); };
                hdr.appendChild(rb);
            }
            card.appendChild(hdr);

            var metaGrid = document.createElement('div');
            metaGrid.className = 'dynamic-grid three-col';
            metaGrid.appendChild(mkGrp(t.puppetOverlord, r.overlord, function(v) { puppetRules[idx].overlord = v.toUpperCase(); saveData(); }));
            metaGrid.appendChild(mkGrp(t.puppetTag, r.tag, function(v) { puppetRules[idx].tag = v.toUpperCase(); saveData(); }));

            var modeGrp = document.createElement('div');
            modeGrp.className = 'input-group';
            var modeLabel = document.createElement('label');
            modeLabel.textContent = t.puppetMode;
            var modeSel = document.createElement('select');
            var optS = document.createElement('option');
            optS.value = 'short';
            optS.textContent = t.puppetModeShort;
            var optE = document.createElement('option');
            optE.value = 'expanded';
            optE.textContent = t.puppetModeExpanded;
            if (r.mode === 'expanded') optE.selected = true;
            else optS.selected = true;
            modeSel.onchange = function() {
                puppetRules[idx].mode = this.value;
                saveData();
                renderPuppetRules();
            };
            modeSel.appendChild(optS);
            modeSel.appendChild(optE);
            modeGrp.appendChild(modeLabel);
            modeGrp.appendChild(modeSel);
            metaGrid.appendChild(modeGrp);
            card.appendChild(metaGrid);

            if (r.mode === 'short' || !r.mode) {
                // Short mode: one name per ideology, shared by every autonomy level.
                for (var ii = 0; ii < ideologies.length; ii++) {
                    (function(ideo) {
                        var ideoTitle = document.createElement('div');
                        ideoTitle.className = 'puppet-ideo-head';
                        ideoTitle.textContent = t[ideo];
                        card.appendChild(ideoTitle);

                        card.appendChild(mkGrp(t.puppetShortName, (r.ideologies[ideo] || {}).name || '', function(v) {
                            puppetRules[idx].ideologies[ideo].name = v;
                            // Keep the legacy shortName synchronized for saved data compatibility.
                            puppetRules[idx].shortName = v;
                            saveData();
                        }));

                        addPuppetIdeologyFlag(card, idx, ideo, r, t);
                    })(ideologies[ii]);
                }
            } else {
                // Expanded mode: each ideology is a collapsible group with its own autonomy names.
                for (var ii = 0; ii < ideologies.length; ii++) {
                    (function(ideo) {
                        var data = r.ideologies[ideo] || { name: '', img: null, autonomy: {} };
                        if (!data.autonomy) data.autonomy = {};

                        var sec = document.createElement('div');
                        sec.className = 'puppet-ideology-section';

                        var head = document.createElement('div');
                        head.className = 'puppet-ideology-header';
                        var title = document.createElement('strong');
                        title.textContent = t[ideo];
                        var arrow = document.createElement('span');
                        arrow.className = 'puppet-ideology-arrow';
                        arrow.textContent = '▼';
                        head.appendChild(title);
                        head.appendChild(arrow);

                        var body = document.createElement('div');
                        body.className = 'puppet-ideology-body';
                        head.onclick = function() {
                            sec.classList.toggle('collapsed');
                        };

                        body.appendChild(mkGrp(t.puppetNameForIdeology, data.name || '', function(v) {
                            puppetRules[idx].ideologies[ideo].name = v;
                            saveData();
                        }));
                        addPuppetIdeologyFlag(body, idx, ideo, r, t);

                        var autoHead = document.createElement('div');
                        autoHead.className = 'puppet-autonomy-title';
                        autoHead.textContent = currentLang === 'english' ? 'Names by autonomy level:' : 'Названия по уровню автономии:';
                        body.appendChild(autoHead);

                        var autoGrid = document.createElement('div');
                        autoGrid.className = 'dynamic-grid two-col';
                        for (var ai = 0; ai < autonomyLevels.length; ai++) {
                            (function(al) {
                                var alKey = 'autonomy' + al.charAt(0).toUpperCase() + al.slice(1);
                                var alLabel = t[alKey] || al;
                                autoGrid.appendChild(mkGrp(alLabel, data.autonomy[al] || '', function(v) {
                                    puppetRules[idx].ideologies[ideo].autonomy[al] = v;
                                    saveData();
                                }));
                            })(autonomyLevels[ai]);
                        }
                        body.appendChild(autoGrid);
                        sec.appendChild(head);
                        sec.appendChild(body);
                        card.appendChild(sec);
                    })(ideologies[ii]);
                }
            }

            box.appendChild(card);
        })(i);
    }
}

function addPuppetIdeologyFlag(parent, puppetIndex, ideo, rule, t) {
    var box = document.createElement('div');
    box.className = 'flag-preview-container';
    box.style.marginTop = '8px';

    var flLabel = document.createElement('label');
    flLabel.textContent = t.uploadFlag;
    box.appendChild(flLabel);

    var fileInp = document.createElement('input');
    fileInp.type = 'file';
    fileInp.accept = 'image/png';
    fileInp.style.marginBottom = '10px';
    fileInp.onchange = function(ev) { handlePuppetFlag(ev, puppetIndex, ideo); };
    box.appendChild(fileInp);

    var cw = document.createElement('div');
    cw.className = 'canvas-wrapper';
    var sz = [['cn', 82, 52, 'Normal'], ['cm', 41, 26, 'Medium'], ['cs', 10, 7, 'Small']];
    for (var si = 0; si < sz.length; si++) {
        var ci2 = document.createElement('div');
        ci2.className = 'canvas-item';
        var sp = document.createElement('span');
        sp.textContent = sz[si][3] + ' (' + sz[si][1] + 'x' + sz[si][2] + ')';
        ci2.appendChild(sp);
        var cv = document.createElement('canvas');
        cv.id = 'p' + puppetIndex + '_' + ideo + '_' + sz[si][0];
        cv.width = sz[si][1];
        cv.height = sz[si][2];
        ci2.appendChild(cv);
        cw.appendChild(ci2);
    }
    box.appendChild(cw);
    parent.appendChild(box);

    if (rule.ideologies[ideo] && rule.ideologies[ideo].img) {
        paintFlag('p' + puppetIndex + '_' + ideo, rule.ideologies[ideo].img);
    }
}

function mkGrp(label, val, cb) {
    var g = document.createElement('div');
    g.className = 'input-group';
    var lb = document.createElement('label');
    lb.textContent = label;
    g.appendChild(lb);
    var inp = document.createElement('input');
    inp.type = 'text';
    inp.value = val || '';
    inp.oninput = function() { cb(this.value); };
    g.appendChild(inp);
    return g;
}

function addPuppetRule() {
    puppetRules.push(mkEmptyPuppet());
    renderPuppetRules();
    saveData();
}

function removePuppetRule(idx) {
    if (puppetRules.length <= 1) return;
    puppetRules.splice(idx, 1);
    renderPuppetRules();
    saveData();
}

function renderStateNameRules() {
    var box = document.getElementById('state-name-rules-container');
    if (!box) return;
    box.innerHTML = '';
    var t = i18n[currentLang];

    for (var i = 0; i < stateNameRules.length; i++) {
        (function(idx) {
            var r = stateNameRules[idx];
            var card = document.createElement('div');
            card.className = 'dynamic-card';

            var hdr = document.createElement('div');
            hdr.className = 'dynamic-card-header';
            var st = document.createElement('strong');
            st.textContent = currentLang === 'english' ? 'State rule #' + (idx + 1) : '\u041f\u0440\u0430\u0432\u0438\u043b\u043e \u0440\u0435\u0433\u0438\u043e\u043d\u0430 \u2116' + (idx + 1);
            hdr.appendChild(st);
            if (stateNameRules.length > 1) {
                var rb = document.createElement('button');
                rb.type = 'button';
                rb.className = 'secondary-btn danger-btn';
                rb.textContent = t.remove;
                rb.onclick = function() { removeStateRule(idx); };
                hdr.appendChild(rb);
            }
            card.appendChild(hdr);

            var grid = document.createElement('div');
            grid.className = 'dynamic-grid three-col';
            grid.appendChild(mkNumGrp(t.stateId, r.stateId, function(v) { stateNameRules[idx].stateId = v; saveData(); }));
            grid.appendChild(mkGrp(t.controllerTag, r.controllerTag, function(v) { stateNameRules[idx].controllerTag = v; saveData(); }));
            grid.appendChild(mkGrp(t.stateName, r.name, function(v) { stateNameRules[idx].name = v; saveData(); }));
            card.appendChild(grid);
            box.appendChild(card);
        })(i);
    }
}

function mkNumGrp(label, val, cb) {
    var g = document.createElement('div');
    g.className = 'input-group';
    var lb = document.createElement('label');
    lb.textContent = label;
    g.appendChild(lb);
    var inp = document.createElement('input');
    inp.type = 'number';
    inp.min = '1';
    inp.step = '1';
    inp.value = val || '';
    inp.oninput = function() { cb(this.value); };
    g.appendChild(inp);
    return g;
}

function addStateNameRule() {
    var last = stateNameRules[stateNameRules.length - 1];
    if (last && (!String(last.stateId).trim() || !String(last.controllerTag).trim() || !String(last.name).trim())) {
        alert(i18n[currentLang].invalidStateRule);
        return;
    }
    stateNameRules.push(mkEmptyState());
    renderStateNameRules();
    saveData();
}

function removeStateRule(idx) {
    if (stateNameRules.length <= 1) return;
    stateNameRules.splice(idx, 1);
    renderStateNameRules();
    saveData();
}

function renderCityNameRules() {
    var box = document.getElementById('city-name-rules-container');
    if (!box) return;
    box.innerHTML = '';
    var t = i18n[currentLang];

    for (var i = 0; i < cityNameRules.length; i++) {
        (function(idx) {
            var r = cityNameRules[idx];
            var card = document.createElement('div');
            card.className = 'dynamic-card';

            var hdr = document.createElement('div');
            hdr.className = 'dynamic-card-header';
            var st = document.createElement('strong');
            st.textContent = currentLang === 'english' ? 'City rule #' + (idx + 1) : '\u041f\u0440\u0430\u0432\u0438\u043b\u043e \u0433\u043e\u0440\u043e\u0434\u0430 \u2116' + (idx + 1);
            hdr.appendChild(st);
            if (cityNameRules.length > 1) {
                var rb = document.createElement('button');
                rb.type = 'button';
                rb.className = 'secondary-btn danger-btn';
                rb.textContent = t.remove;
                rb.onclick = function() { removeCityRule(idx); };
                hdr.appendChild(rb);
            }
            card.appendChild(hdr);

            var grid = document.createElement('div');
            grid.className = 'dynamic-grid three-col';
            grid.appendChild(mkNumGrp(t.cityStateId, r.stateId, function(v) { cityNameRules[idx].stateId = v; saveData(); }));
            grid.appendChild(mkNumGrp(t.provinceId, r.provinceId, function(v) { cityNameRules[idx].provinceId = v; saveData(); }));
            grid.appendChild(mkGrp(t.controllerTag, r.controllerTag, function(v) { cityNameRules[idx].controllerTag = v; saveData(); }));
            card.appendChild(grid);
            card.appendChild(mkGrp(t.cityName, r.name, function(v) { cityNameRules[idx].name = v; saveData(); }));
            box.appendChild(card);
        })(i);
    }
}

function addCityNameRule() {
    var last = cityNameRules[cityNameRules.length - 1];
    if (last && (!String(last.stateId).trim() || !String(last.provinceId).trim() || !String(last.controllerTag).trim() || !String(last.name).trim())) {
        alert(i18n[currentLang].invalidCityRule);
        return;
    }
    cityNameRules.push(mkEmptyCity());
    renderCityNameRules();
    saveData();
}

function removeCityRule(idx) {
    if (cityNameRules.length <= 1) return;
    cityNameRules.splice(idx, 1);
    renderCityNameRules();
    saveData();
}

function esc(v) {
    return String(v || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function saveData() {
    pullCountriesFromDOM();

    var out = {
        lang: currentLang,
        modName: (document.getElementById('modName') || {}).value || '',
        countries: [],
        puppetRules: [],
        stateNameRules: [],
        cityNameRules: []
    };

    for (var ci = 0; ci < countries.length; ci++) {
        var co = countries[ci];
        var cd = { tag: co.tag || '', tagType: co.tagType || 'normal', ideologies: {} };
        for (var i = 0; i < ideologies.length; i++) {
            var ideo = ideologies[i];
            var cv = document.getElementById('c' + ci + '_' + ideo + '_cn');
            cd.ideologies[ideo] = {
                base: co.ideologies[ideo].base || '',
                def: co.ideologies[ideo].def || '',
                adj: co.ideologies[ideo].adj || '',
                img: cv ? (cv.getAttribute('data-img') || null) : null
            };
        }
        out.countries.push(cd);
    }

    for (var p = 0; p < puppetRules.length; p++) {
        var pr = puppetRules[p];
        var pOut = {
            overlord: String(pr.overlord || '').toUpperCase(),
            tag: String(pr.tag || '').toUpperCase(),
            mode: pr.mode || 'short',
            shortName: pr.shortName || '',
            ideologies: {}
        };
        for (var pi = 0; pi < ideologies.length; pi++) {
            var pid = ideologies[pi];
            var pd = pr.ideologies[pid] || {};
            var pCn = document.getElementById('p' + p + '_' + pid + '_cn');
            pOut.ideologies[pid] = {
                name: pd.name || '',
                img: pCn ? (pCn.getAttribute('data-img') || null) : (pd.img || null),
                autonomy: {}
            };
            for (var ai = 0; ai < autonomyLevels.length; ai++) {
                var al = autonomyLevels[ai];
                pOut.ideologies[pid].autonomy[al] = (pd.autonomy && pd.autonomy[al]) ? pd.autonomy[al] : '';
            }
        }
        out.puppetRules.push(pOut);
    }

    for (var s = 0; s < stateNameRules.length; s++) {
        var sr = stateNameRules[s];
        out.stateNameRules.push({
            stateId: String(sr.stateId || '').trim(),
            controllerTag: String(sr.controllerTag || '').toUpperCase().trim(),
            name: sr.name || ''
        });
    }

    for (var c = 0; c < cityNameRules.length; c++) {
        var cr = cityNameRules[c];
        out.cityNameRules.push({
            stateId: String(cr.stateId || '').trim(),
            provinceId: String(cr.provinceId || '').trim(),
            controllerTag: String(cr.controllerTag || '').toUpperCase().trim(),
            name: cr.name || ''
        });
    }

    localStorage.setItem('hoi4modData', JSON.stringify(out));
}

function addLocLine(lines, key, val) {
    lines.push(' ' + key + ':0 "' + String(val).replace(/"/g, '\\"') + '"');
}

function canvasToTGA(canvas) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    var px = ctx.getImageData(0, 0, w, h).data;
    var buf = new ArrayBuffer(18 + px.length);
    var dv = new DataView(buf);
    var u8 = new Uint8Array(buf);

    dv.setUint8(2, 2);
    dv.setUint16(12, w, true);
    dv.setUint16(14, h, true);
    dv.setUint8(16, 32);
    dv.setUint8(17, 0);

    var off = 18;
    for (var y = h - 1; y >= 0; y--) {
        for (var x = 0; x < w; x++) {
            var pi = (y * w + x) * 4;
            u8[off++] = px[pi + 2];
            u8[off++] = px[pi + 1];
            u8[off++] = px[pi];
            u8[off++] = px[pi + 3];
        }
    }
    return buf;
}

function buildOnActions(sRules, cRules) {
    var sg = {};
    var cg = {};

    for (var i = 0; i < sRules.length; i++) {
        var r = sRules[i];
        var sid = String(r.stateId).trim();
        var ct = String(r.controllerTag).toUpperCase().trim();
        var nm = String(r.name).trim();
        if (!/^\d+$/.test(sid) || !ct || !nm) continue;
        if (!sg[sid]) sg[sid] = [];
        sg[sid].push({ tag: ct, loc: ct + '_STATE_' + sid });
    }

    for (var j = 0; j < cRules.length; j++) {
        var cr = cRules[j];
        var csid = String(cr.stateId).trim();
        var pid = String(cr.provinceId).trim();
        var cct = String(cr.controllerTag).toUpperCase().trim();
        var cnm = String(cr.name).trim();
        if (!/^\d+$/.test(csid) || !/^\d+$/.test(pid) || !cct || !cnm) continue;
        if (!cg[csid]) cg[csid] = [];
        cg[csid].push({ pid: pid, tag: cct, loc: cct + '_VICTORY_POINTS_' + pid });
    }

    if (!Object.keys(sg).length && !Object.keys(cg).length) return '';

    var lines = [
        'on_actions = {',
        '    on_state_control_changed = {',
        '        effect = {'
    ];

    var sids = Object.keys(sg);
    for (var si = 0; si < sids.length; si++) {
        var sid2 = sids[si];
        lines.push('            # State ' + sid2);
        lines.push('            if = {');
        lines.push('                limit = { FROM.FROM = { state = ' + sid2 + ' } }');
        lines.push('                FROM.FROM = { reset_state_name = yes }');
        for (var ri = 0; ri < sg[sid2].length; ri++) {
            lines.push('                if = {');
            lines.push('                    limit = { tag = ' + sg[sid2][ri].tag + ' }');
            lines.push('                    FROM.FROM = { set_state_name = ' + sg[sid2][ri].loc + ' }');
            lines.push('                }');
        }
        lines.push('            }');
    }

    var cids = Object.keys(cg);
    for (var ci = 0; ci < cids.length; ci++) {
        var cid = cids[ci];
        lines.push('            # Cities in state ' + cid);
        lines.push('            if = {');
        lines.push('                limit = { FROM.FROM = { state = ' + cid + ' } }');
        for (var k = 0; k < cg[cid].length; k++) {
            lines.push('                FROM.FROM = { reset_province_name = ' + cg[cid][k].pid + ' }');
        }
        for (var m = 0; m < cg[cid].length; m++) {
            lines.push('                if = {');
            lines.push('                    limit = { tag = ' + cg[cid][m].tag + ' }');
            lines.push('                    FROM.FROM = { set_province_name = { id = ' + cg[cid][m].pid + ' name = ' + cg[cid][m].loc + ' } }');
            lines.push('                }');
        }
        lines.push('            }');
    }

    lines.push('        }');
    lines.push('    }');
    lines.push('}');
    return lines.join('\n');
}

async function generateMod() {
    var zip = new JSZip();
    var modName = document.getElementById('modName').value.trim() || 'CustomMod';
    var modFolder = zip.folder(modName);

    var fNorm = modFolder.folder('gfx/flags');
    var fMed = modFolder.folder('gfx/flags/medium');
    var fSmall = modFolder.folder('gfx/flags/small');

    var locFolder = modFolder.folder('localisation/replace/' + currentLang);
    var ruFolder = modFolder.folder('localisation/replace/russian');

    var normalLoc = ['l_' + currentLang + ':'];
    var cosmeticLoc = ['l_' + currentLang + ':'];
    var hasNormal = false;
    var hasCosmetic = false;

    // 1. Обычные и косметические страны
    for (var ci = 0; ci < countries.length; ci++) {
        var tag = countries[ci].tag;
        if (!tag) continue;

        var isCosmetic = (countries[ci].tagType === 'cosmetic');
        var targetArr = isCosmetic ? cosmeticLoc : normalLoc;
        
        if (isCosmetic) hasCosmetic = true;
        else hasNormal = true;

        for (var ii = 0; ii < ideologies.length; ii++) {
            var ideo = ideologies[ii];
            var d = countries[ci].ideologies[ideo] || {};

            if (d.base) addLocLine(targetArr, tag + '_' + ideo, d.base);
            if (d.def) addLocLine(targetArr, tag + '_' + ideo + '_DEF', d.def);
            if (d.adj) addLocLine(targetArr, tag + '_' + ideo + '_ADJ', d.adj);

            var cvn = document.getElementById('c' + ci + '_' + ideo + '_cn');
            var cvm = document.getElementById('c' + ci + '_' + ideo + '_cm');
            var cvs = document.getElementById('c' + ci + '_' + ideo + '_cs');
            if (cvn && cvn.getAttribute('data-img')) {
                var fn = tag + '_' + ideo + '.tga';
                fNorm.file(fn, canvasToTGA(cvn));
                if (cvm) fMed.file(fn, canvasToTGA(cvm));
                if (cvs) fSmall.file(fn, canvasToTGA(cvs));
            }
        }
    }

    // 2. Марионетки (Всегда идут в косметический файл)
    for (var pi = 0; pi < puppetRules.length; pi++) {
        var pr = puppetRules[pi];
        var pOv = String(pr.overlord || '').toUpperCase().trim();
        var pTg = String(pr.tag || '').toUpperCase().trim();
        if (!pOv || !pTg) continue;

        hasCosmetic = true;
        var pMode = pr.mode || 'short';

        for (var pj = 0; pj < ideologies.length; pj++) {
            var pIdeo = ideologies[pj];
            var pIdeoData = pr.ideologies[pIdeo] || {};

            if (pMode === 'short') {
                // One name for this ideology, used for every autonomy variant.
                var shortIdeoName = String(pIdeoData.name || pr.shortName || '').trim();
                if (shortIdeoName) {
                    addLocLine(cosmeticLoc, pTg + '_' + pOv + '_' + pIdeo, shortIdeoName);
                    addLocLine(cosmeticLoc, pTg + '_' + pOv + '_' + pIdeo + '_DEF', shortIdeoName);
                    for (var ak = 0; ak < autonomyLevels.length; ak++) {
                        var alShort = autonomyLevels[ak];
                        addLocLine(cosmeticLoc, pTg + '_' + pOv + '_' + pIdeo + '_autonomy_' + alShort, shortIdeoName);
                        addLocLine(cosmeticLoc, pTg + '_' + pOv + '_' + pIdeo + '_autonomy_' + alShort + '_DEF', shortIdeoName);
                    }
                }
            } else {
                var pNm = String(pIdeoData.name || '').trim();
                if (pNm) {
                    addLocLine(cosmeticLoc, pTg + '_' + pOv + '_' + pIdeo, pNm);
                    addLocLine(cosmeticLoc, pTg + '_' + pOv + '_' + pIdeo + '_DEF', pNm);
                }

                for (var ak2 = 0; ak2 < autonomyLevels.length; ak2++) {
                    var al2 = autonomyLevels[ak2];
                    var aNm = String((pIdeoData.autonomy && pIdeoData.autonomy[al2]) || '').trim();
                    if (aNm) {
                        addLocLine(cosmeticLoc, pTg + '_' + pOv + '_' + pIdeo + '_autonomy_' + al2, aNm);
                        addLocLine(cosmeticLoc, pTg + '_' + pOv + '_' + pIdeo + '_autonomy_' + al2 + '_DEF', aNm);
                    }
                }
            }
        }

        // Флаги (работают одинаково для обоих режимов)
        for (var pj2 = 0; pj2 < ideologies.length; pj2++) {
            var pIdeo2 = ideologies[pj2];
            var pCn = document.getElementById('p' + pi + '_' + pIdeo2 + '_cn');
            var pCm = document.getElementById('p' + pi + '_' + pIdeo2 + '_cm');
            var pCs = document.getElementById('p' + pi + '_' + pIdeo2 + '_cs');
            if (pCn && pCn.getAttribute('data-img')) {
                var pFn = pTg + '_' + pOv + '_' + pIdeo2 + '.tga';
                fNorm.file(pFn, canvasToTGA(pCn));
                if (pCm) fMed.file(pFn, canvasToTGA(pCm));
                if (pCs) fSmall.file(pFn, canvasToTGA(pCs));
            }
        }
    }

    // Сохранение файлов локализации
    if (hasNormal) {
        locFolder.file('countries_l_' + currentLang + '.yml',
            new Blob(['\uFEFF' + normalLoc.join('\n') + '\n'], { type: 'text/plain;charset=utf-8' }));
    }
    if (hasCosmetic) {
        locFolder.file('countries_cosmetic_l_' + currentLang + '.yml',
            new Blob(['\uFEFF' + cosmeticLoc.join('\n') + '\n'], { type: 'text/plain;charset=utf-8' }));
    }

    var vStateRules = stateNameRules.filter(function(r) {
        return /^\d+$/.test(String(r.stateId).trim()) && String(r.controllerTag).trim() && String(r.name).trim();
    });
    var vCityRules = cityNameRules.filter(function(r) {
        return /^\d+$/.test(String(r.stateId).trim()) && /^\d+$/.test(String(r.provinceId).trim()) && String(r.controllerTag).trim() && String(r.name).trim();
    });

    if (vStateRules.length || vCityRules.length) {
        var sLocLines = ['l_russian:'];
        var vpLocLines = ['l_russian:'];

        for (var si = 0; si < stateNameRules.length; si++) {
            var sr = stateNameRules[si];
            var sSid = String(sr.stateId).trim();
            var sCt = String(sr.controllerTag).toUpperCase().trim();
            var sNm = String(sr.name).trim();
            if (!/^\d+$/.test(sSid) || !sCt || !sNm) continue;
            addLocLine(sLocLines, sCt + '_STATE_' + sSid, sNm);
        }

        for (var vi = 0; vi < cityNameRules.length; vi++) {
            var vr = cityNameRules[vi];
            var vPid = String(vr.provinceId).trim();
            var vCt = String(vr.controllerTag).toUpperCase().trim();
            var vNm = String(vr.name).trim();
            if (!/^\d+$/.test(String(vr.stateId).trim()) || !/^\d+$/.test(vPid) || !vCt || !vNm) continue;
            addLocLine(vpLocLines, vCt + '_VICTORY_POINTS_' + vPid, vNm);
        }

        ruFolder.file('states_names_l_russian.yml', new Blob(['\uFEFF' + sLocLines.join('\n') + '\n'], { type: 'text/plain;charset=utf-8' }));
        ruFolder.file('victory_points_l_russian.yml', new Blob(['\uFEFF' + vpLocLines.join('\n') + '\n'], { type: 'text/plain;charset=utf-8' }));

        var onAct = buildOnActions(stateNameRules, cityNameRules);
        if (onAct) {
            modFolder.folder('common/on_actions').file('custom_state_names.txt', onAct + '\n');
        }
    }

    var descriptor =
        'version="1.0"\n' +
        'tags={\n' +
        '\t"Alternative History"\n' +
        '\t"Graphics"\n' +
        '}\n' +
        'name="' + modName + '"\n' +
        'supported_version="*"\n' +
        'path="mod/' + modName + '"';
    zip.file(modName + '.mod', descriptor);

    var blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, modName + '.zip');
}