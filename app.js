var ideologies = ['fascism', 'democratic', 'communism', 'neutrality'];
var currentLang = 'english';
var countries = [];
var puppetRules = [];
var stateNameRules = [];
var cityNameRules = [];
var modCoverData = null;

var autonomyLevels = [
    'reichskommissariat', 'reichsprotectorate', 'satellite', 'puppet', 
    'dominion', 'colony', 'integrated_puppet', 'tpc_minimal', 'subjugated', 
    'supervised_state', 'protectorate'
];

var i18n = {
    english: {
        title: "HoI4 Mod Generator",
        onlineLabel: "online",
        onlineTitle: "Active visitors",
        modName: "Mod Name (English):",
        modNameDesc: "Used for the mod folder, descriptor, and project files.",
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
        puppetTitle: "Puppet Names & Flags",
        puppetDesc: "Add puppet naming rules and custom flags. Overlord can be a regular tag (GER, ENG) or cosmetic tag (EUR_UNIFIED, EUR).",
        puppetOverlord: "Overlord tag (regular or cosmetic):",
        puppetOverlordPlaceholder: "GER or EUR_UNIFIED",
        puppetTag: "Puppet tag:",
        puppetTagPlaceholder: "e.g. EGY",
        tagCosmeticPlaceholder: "e.g. EUR_UNIFIED",
        puppetMode: "Naming Mode:",
        puppetModeShort: "Short (One name for all)",
        puppetModeExpanded: "Expanded (Individual variants)",
        puppetShortName: "Puppet Name (all autonomy levels):",
        puppetNameForIdeology: "Name for this ideology:",
        autonomyReichskommissariat: "Name (Reichskommissariat):",
        autonomyReichsprotectorate: "Name (Reichsprotectorate):",
        autonomySatellite: "Name (Satellite):",
        autonomyPuppet: "Name (Puppet State):",
        autonomyDominion: "Name (Dominion):",
        autonomyColony: "Name (Colony):",
        autonomyIntegrated_puppet: "Name (Integrated Puppet):",
        autonomyTpc_minimal: "Name (Minimal Autonomy - TPC):",
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
        footerSource: "Source Code",

        // Project Management
        projStatusDraft: "Project:",
        projUnnamed: "Unnamed Mod",
        saveProjectBtn: "Save Project",
        loadProjectBtn: "Load Project",
        myProjectsBtn: "My Projects",
        newProjectBtn: "New Project",
        confirmNewProject: "Start a new project? All unsaved changes in the editor will be reset.",
        projectSavedSuccess: "Project saved to file!",
        projectLoadedSuccess: "Project loaded successfully!",
        projectModLoadedSuccess: "Mod archive loaded and opened for editing!",
        projectLoadError: "Error reading file: invalid format.",
        invalidFile: "Please select a .json project or .zip mod archive.",

        // Projects Library
        projectsModalTitle: "Saved Projects",
        projectsModalDesc: "Your local projects stored in the browser",
        saveCurrentToLibBtnText: "Save current project to library",
        noProjectsInLib: "No saved projects yet. Click 'Save current project to library' or export to file!",
        projCardCountries: "countries",
        projCardPuppets: "puppets",
        projCardLoadBtn: "Load",
        projCardExportBtn: "Export JSON",
        projCardDeleteBtn: "Delete",
        projCardDeleteConfirm: "Delete this project from browser library?",
        projSavedToLibToast: "Project saved to library!"
    },
    russian: {
        title: "Генератор стран HoI4",
        onlineLabel: "онлайн",
        onlineTitle: "Сейчас на сайте",
        modName: "Название мода (на англ):",
        modNameDesc: "Используется для папки мода, дескриптора и файлов проекта.",
        countryLabel: "Страна",
        addCountry: "Добавить страну",
        tag: "Тег:",
        tagType: "Тип тега:",
        tagNormal: "Обычный тэг",
        tagCosmetic: "Косметический тэг",
        fascism: "Фашизм",
        democratic: "Демократия",
        communism: "Коммунизм",
        neutrality: "Нейтралитет",
        baseName: "Основное название:",
        defName: "Офиц. (ивенты/капитуляция):",
        adjName: "Прилагательное:",
        uploadFlag: "Загрузить флаг (PNG):",
        genBtn: "Сгенерировать мод",
        puppetTitle: "Названия и флаги марионеток",
        puppetDesc: "Добавляй правила и флаги для марионеток. Сюзереном может быть как обычная страна (GER, SOV), так и косметический тег (EUR_UNIFIED, EUR).",
        puppetOverlord: "Тег сюзерена (обычный или косметический):",
        puppetOverlordPlaceholder: "GER или EUR_UNIFIED",
        puppetTag: "Тег марионетки:",
        puppetTagPlaceholder: "напр. EGY",
        tagCosmeticPlaceholder: "напр. EUR_UNIFIED",
        puppetMode: "Режим названий:",
        puppetModeShort: "Укороченный (одно для всех)",
        puppetModeExpanded: "Развёрнутый (для каждого случая)",
        puppetShortName: "Название марионетки (для всех уровней автономии):",
        puppetNameForIdeology: "Название для этой идеологии:",
        autonomyReichskommissariat: "Название (Рейхскомиссариат):",
        autonomyReichsprotectorate: "Название (Рейхспротекторат):",
        autonomySatellite: "Название (Сателлит):",
        autonomyPuppet: "Название (Марионетка):",
        autonomyDominion: "Название (Доминион):",
        autonomyColony: "Название (Колония):",
        autonomyIntegrated_puppet: "Название (Интегр. марионетка):",
        autonomyTpc_minimal: "Название (Минимальная автономия - TPC):",
        autonomySubjugated: "Название (Подчиненное гос-во):",
        autonomySupervised_state: "Название (Поднадзорное гос-во):",
        autonomyProtectorate: "Название (Протекторат):",
        addPuppet: "Добавить марионетку",
        remove: "Удалить",
        stateTitle: "Названия регионов по контролирующей стране",
        stateDesc: "Переименовывай регион, когда им управляет конкретная страна. Пример: рег. 39 + GER \u2192 Кракау.",
        stateId: "ID региона:",
        controllerTag: "Тег контролирующей:",
        stateName: "Новое название:",
        addStateRule: "Добавить название региона",
        defaultStateName: "Исходное название восстанавливается при смене контролирующей страны.",
        invalidStateRule: "Заполни ID региона, тег и название перед добавлением.",
        cityTitle: "Названия городов по контролирующей стране",
        cityDesc: "Переименовывай город / победную точку, когда его провинцией управляет конкретная страна.",
        cityStateId: "ID региона:",
        provinceId: "ID провинции:",
        cityName: "Новое название:",
        addCityRule: "Добавить название города",
        invalidCityRule: "Заполни ID провинции, тег и название перед добавлением.",
        footerWorkshop: "Мод в мастерской",
        footerSource: "Исходный код сайта",

        // Управление проектом
        projStatusDraft: "Проект:",
        projUnnamed: "Без названия",
        saveProjectBtn: "Сохранить проект",
        loadProjectBtn: "Загрузить проект",
        myProjectsBtn: "Мои проекты",
        newProjectBtn: "Новый проект",
        confirmNewProject: "Начать новый проект? Все несохраненные данные будут сброшены.",
        projectSavedSuccess: "Проект сохранён в файл!",
        projectLoadedSuccess: "Проект успешно загружен!",
        projectModLoadedSuccess: "Архив мода успешно загружен и открыт для редактирования!",
        projectLoadError: "Ошибка чтения файла: неподдерживаемый формат.",
        invalidFile: "Пожалуйста, выберите файл проекта .json или архив мода .zip.",

        // Библиотека проектов
        projectsModalTitle: "Сохранённые проекты",
        projectsModalDesc: "Локальная библиотека проектов в браузере",
        saveCurrentToLibBtnText: "Сохранить текущий проект в библиотеку",
        noProjectsInLib: "В библиотеке пока нет сохраненных проектов. Сохраните текущий или загрузите из файла!",
        projCardCountries: "стран",
        projCardPuppets: "марионеток",
        projCardLoadBtn: "Загрузить",
        projCardExportBtn: "Экспорт JSON",
        projCardDeleteBtn: "Удалить",
        projCardDeleteConfirm: "Удалить этот проект из локальной библиотеки?",
        projSavedToLibToast: "Проект сохранён в библиотеку!"
    }
};

function initOnlinePresence() {
    var countEl = document.getElementById('onlineCountNum');
    if (!countEl) return;

    var curCount = Math.floor(Math.random() * 4) + 2; // 2..5
    countEl.textContent = curCount;

    setInterval(function() {
        var diff = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
        curCount = Math.max(1, Math.min(18, curCount + diff));
        countEl.textContent = curCount;
    }, 12000);
}

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
    initOnlinePresence();
};

function loadSaved(d) {
    document.getElementById('modName').value = d.modName || '';
    modCoverData = d.cover || null;

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
                    name: oldIdeo.name || pr.shortName || '',
                    img: oldIdeo.img || null,
                    autonomy: {}
                };
                for (var ak = 0; ak < autonomyLevels.length; ak++) {
                    var al = autonomyLevels[ak];
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

    updateProjectToolbar();
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

    var badgeEl = document.getElementById('onlineCounterBadge');
    var badgeLabel = document.getElementById('onlineCountLabel');
    if (badgeEl && t.onlineTitle) badgeEl.title = t.onlineTitle;
    if (badgeLabel && t.onlineLabel) badgeLabel.textContent = t.onlineLabel;

    var nmDesc = document.getElementById('modNameDesc');
    if (nmDesc) nmDesc.innerText = t.modNameDesc;

    // Project toolbar
    var spBtn = document.getElementById('btnSaveProjFileText');
    if (spBtn) spBtn.innerText = t.saveProjectBtn;

    var lpBtn = document.getElementById('btnLoadProjFileText');
    if (lpBtn) lpBtn.innerText = t.loadProjectBtn;

    var mpBtn = document.getElementById('btnMyProjectsText');
    if (mpBtn) mpBtn.innerText = t.myProjectsBtn;

    var npBtn = document.getElementById('btnNewProjText');
    if (npBtn) npBtn.innerText = t.newProjectBtn;

    // Projects Modal
    var pmt = document.getElementById('projectsModalTitle');
    if (pmt) pmt.innerText = t.projectsModalTitle;
    var pmd = document.getElementById('projectsModalDesc');
    if (pmd) pmd.innerText = t.projectsModalDesc;
    var scl = document.getElementById('saveCurrentToLibBtnText');
    if (scl) scl.innerText = t.saveCurrentToLibBtnText;

    document.getElementById('puppetTitle').innerText = t.puppetTitle;
    document.getElementById('puppetDesc').innerText = t.puppetDesc;
    document.getElementById('puppetAddBtn').innerText = '＋ ' + t.addPuppet;
    document.getElementById('stateTitle').innerText = t.stateTitle;
    document.getElementById('stateDesc').innerText = t.stateDesc;
    document.getElementById('stateAddBtn').innerText = '＋ ' + t.addStateRule;
    document.getElementById('stateDefaultNote').innerText = t.defaultStateName;
    document.getElementById('cityTitle').innerText = t.cityTitle;
    document.getElementById('cityDesc').innerText = t.cityDesc;
    document.getElementById('cityAddBtn').innerText = '＋ ' + t.addCityRule;
    document.getElementById('generateBtn').innerText = t.genBtn;

    var fwl = document.getElementById('footerWorkshopLink');
    var fsl = document.getElementById('footerSourceLink');
    if (fwl) fwl.textContent = t.footerWorkshop;
    if (fsl) fsl.textContent = t.footerSource;

    renderCountries();
    renderPuppetRules();
    renderStateNameRules();
    renderCityNameRules();
    updateProjectToolbar();
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
            '<input type="text" id="c' + idx + '_tag" value="' + esc(co.tag) + '" placeholder="' + (co.tagType === 'cosmetic' ? (i18n[currentLang].tagCosmeticPlaceholder || 'EUR_UNIFIED') : 'TAG') + '" oninput="onInput()"></div>' +
            '<div class="input-group"><label>' + i18n[currentLang].tagType + '</label>' +
            '<select id="c' + idx + '_tagType" onchange="onTagTypeChange(' + idx + ')">' +
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

function onTagTypeChange(idx) {
    pullCountriesFromDOM();
    var tagEl = document.getElementById('c' + idx + '_tag');
    var ttEl = document.getElementById('c' + idx + '_tagType');
    if (tagEl && ttEl) {
        tagEl.placeholder = ttEl.value === 'cosmetic'
            ? (i18n[currentLang].tagCosmeticPlaceholder || 'EUR_UNIFIED')
            : 'TAG';
    }
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
            st.textContent = currentLang === 'english' ? 'Puppet rule #' + (idx + 1) : '\u041f\u0440\u0430\u0432\u0438\u043b\u043e \u043c\u0430\u0440\u0438\u043e\u043d\u0435\u0442\u043a\u0438 \u2116' + (idx + 1);
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
            metaGrid.appendChild(mkGrp(t.puppetOverlord, r.overlord, function(v) { puppetRules[idx].overlord = v.toUpperCase(); saveData(); }, t.puppetOverlordPlaceholder || 'GER / EUR_UNIFIED'));
            metaGrid.appendChild(mkGrp(t.puppetTag, r.tag, function(v) { puppetRules[idx].tag = v.toUpperCase(); saveData(); }, t.puppetTagPlaceholder || 'EGY'));

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
                for (var ii = 0; ii < ideologies.length; ii++) {
                    (function(ideo) {
                        var ideoTitle = document.createElement('div');
                        ideoTitle.className = 'puppet-ideo-head';
                        ideoTitle.textContent = t[ideo];
                        card.appendChild(ideoTitle);

                        card.appendChild(mkGrp(t.puppetShortName, (r.ideologies[ideo] && r.ideologies[ideo].name) || r.shortName || '', function(v) {
                            puppetRules[idx].ideologies[ideo].name = v;
                            puppetRules[idx].shortName = v;
                            saveData();
                        }));

                        addPuppetIdeologyFlag(card, idx, ideo, r, t);
                    })(ideologies[ii]);
                }
            } else {
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

                        body.appendChild(mkGrp(t.puppetNameForIdeology, data.name || r.shortName || '', function(v) {
                            puppetRules[idx].ideologies[ideo].name = v;
                            saveData();
                        }));
                        addPuppetIdeologyFlag(body, idx, ideo, r, t);

                        var autoHead = document.createElement('div');
                        autoHead.className = 'puppet-autonomy-title';
                        autoHead.textContent = currentLang === 'english' ? 'Names by autonomy level:' : '\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u043f\u043e \u0443\u0440\u043e\u0432\u043d\u044e \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u0438\u0438:';
                        body.appendChild(autoHead);

                        var autoGrid = document.createElement('div');
                        autoGrid.className = 'dynamic-grid two-col';
                        for (var ai = 0; ai < autonomyLevels.length; ai++) {
                            (function(al) {
                                var alKey = 'autonomy' + al.charAt(0).toUpperCase() + al.slice(1);
                                var alLabel = t[alKey] || al;
                                autoGrid.appendChild(mkGrp(alLabel, data.autonomy[al] || data.name || r.shortName || '', function(v) {
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

function mkGrp(label, val, cb, placeholder) {
    var g = document.createElement('div');
    g.className = 'input-group';
    var lb = document.createElement('label');
    lb.textContent = label;
    g.appendChild(lb);
    var inp = document.createElement('input');
    inp.type = 'text';
    inp.value = val || '';
    if (placeholder) inp.placeholder = placeholder;
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
        cover: modCoverData || null,
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
                img: (cv && cv.getAttribute('data-img')) || co.ideologies[ideo].img || null
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
                name: pd.name || pr.shortName || '',
                img: (pCn && pCn.getAttribute('data-img')) || pd.img || null,
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

    try {
        localStorage.setItem('hoi4modData', JSON.stringify(out));
    } catch(e) {
        console.warn('LocalStorage save error:', e);
    }
    updateProjectToolbar();
}

function onModNameChange() {
    var val = (document.getElementById('modName') || {}).value || '';
    var el = document.getElementById('projectActiveName');
    if (el) el.textContent = val.trim() || (i18n[currentLang] ? i18n[currentLang].projUnnamed : 'MyAwesomeMod');
    saveData();
}

function updateProjectToolbar() {
    var nameEl = document.getElementById('projectActiveName');
    var modVal = (document.getElementById('modName') || {}).value || '';
    if (nameEl) {
        nameEl.textContent = modVal.trim() || (i18n[currentLang] ? i18n[currentLang].projUnnamed : 'MyAwesomeMod');
    }
    var stat = document.getElementById('projectStatusIndicator');
    if (stat && i18n[currentLang]) {
        stat.textContent = i18n[currentLang].projStatusDraft;
    }
}

function saveProjectToFile() {
    pullCountriesFromDOM();
    var modName = ((document.getElementById('modName') || {}).value.trim()) || 'CustomMod';
    var out = {
        version: "2.0",
        app: "HoI4ModGenerator",
        savedAt: new Date().toISOString(),
        lang: currentLang,
        modName: modName,
        cover: modCoverData || null,
        countries: countries,
        puppetRules: puppetRules,
        stateNameRules: stateNameRules,
        cityNameRules: cityNameRules
    };
    var blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json;charset=utf-8' });
    saveAs(blob, modName + '_project.json');
    showToast(i18n[currentLang] ? i18n[currentLang].projectSavedSuccess : 'Project saved to file!');
}

function triggerLoadProjectFile() {
    var inp = document.getElementById('projectFileInput');
    if (inp) {
        inp.value = '';
        inp.click();
    }
}

async function handleProjectFileUpload(ev) {
    var f = ev.target.files[0];
    if (!f) return;
    var name = f.name.toLowerCase();

    if (name.endsWith('.json')) {
        var rd = new FileReader();
        rd.onload = function(e) {
            try {
                var d = JSON.parse(e.target.result);
                loadSaved(d);
                applyLang(currentLang);
                showToast(i18n[currentLang] ? i18n[currentLang].projectLoadedSuccess : 'Project loaded!');
            } catch(err) {
                alert((i18n[currentLang] ? i18n[currentLang].projectLoadError : 'Error loading project') + '\n' + err.message);
            }
        };
        rd.readAsText(f);
    } else {
        alert(i18n[currentLang] ? i18n[currentLang].invalidFile : 'Invalid file format.');
    }
}

function openProjectsModal() {
    var modal = document.getElementById('projectsModal');
    if (modal) {
        renderProjectsList();
        modal.style.display = 'flex';
    }
}

function closeProjectsModal() {
    var modal = document.getElementById('projectsModal');
    if (modal) modal.style.display = 'none';
}

function getStoredProjectsList() {
    try {
        return JSON.parse(localStorage.getItem('hoi4_saved_projects_list')) || [];
    } catch(e) {
        return [];
    }
}

function saveCurrentToLibrary() {
    pullCountriesFromDOM();
    var modName = ((document.getElementById('modName') || {}).value.trim()) || 'CustomMod';
    var list = getStoredProjectsList();
    var id = 'proj_' + Date.now();
    var item = {
        id: id,
        name: modName,
        savedAt: new Date().toLocaleString(),
        countryCount: countries.length,
        puppetCount: puppetRules.length,
        cover: modCoverData || null,
        data: {
            version: "2.0",
            app: "HoI4ModGenerator",
            savedAt: new Date().toISOString(),
            lang: currentLang,
            modName: modName,
            cover: modCoverData || null,
            countries: countries,
            puppetRules: puppetRules,
            stateNameRules: stateNameRules,
            cityNameRules: cityNameRules
        }
    };
    list.unshift(item);
    localStorage.setItem('hoi4_saved_projects_list', JSON.stringify(list));
    renderProjectsList();
    showToast(i18n[currentLang] ? i18n[currentLang].projSavedToLibToast : 'Project saved to library!');
}

function renderProjectsList() {
    var container = document.getElementById('projectsListContainer');
    if (!container) return;
    container.innerHTML = '';
    var list = getStoredProjectsList();

    if (!list.length) {
        container.innerHTML = '<div class="project-empty-msg">' + (i18n[currentLang].noProjectsInLib || 'No saved projects yet.') + '</div>';
        return;
    }

    var t = i18n[currentLang];
    for (var i = 0; i < list.length; i++) {
        (function(item) {
            var card = document.createElement('div');
            card.className = 'project-card';

            var info = document.createElement('div');
            info.className = 'project-card-info';

            var thumb = document.createElement('div');
            thumb.className = 'project-card-thumb';
            if (item.cover) {
                var im = document.createElement('img');
                im.src = item.cover;
                thumb.appendChild(im);
            } else {
                thumb.textContent = '🗺️';
            }

            var meta = document.createElement('div');
            meta.className = 'project-card-meta';
            var h4 = document.createElement('h4');
            h4.textContent = item.name || 'CustomMod';
            var sp = document.createElement('span');
            sp.textContent = (item.savedAt || '') + ' • ' + (item.countryCount || 0) + ' ' + (t.projCardCountries || 'стран') + ', ' + (item.puppetCount || 0) + ' ' + (t.projCardPuppets || 'марионеток');
            meta.appendChild(h4);
            meta.appendChild(sp);

            info.appendChild(thumb);
            info.appendChild(meta);

            var btns = document.createElement('div');
            btns.className = 'project-card-btns';

            var loadBtn = document.createElement('button');
            loadBtn.type = 'button';
            loadBtn.className = 'secondary-btn';
            loadBtn.textContent = '📂 ' + (t.projCardLoadBtn || 'Загрузить');
            loadBtn.onclick = function() { loadProjectFromLibrary(item.id); };

            var expBtn = document.createElement('button');
            expBtn.type = 'button';
            expBtn.className = 'secondary-btn';
            expBtn.textContent = '💾 ' + (t.projCardExportBtn || 'JSON');
            expBtn.onclick = function() { exportProjectFromLibrary(item.id); };

            var delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'secondary-btn danger-btn';
            delBtn.textContent = '🗑️';
            delBtn.title = t.projCardDeleteBtn || 'Удалить';
            delBtn.onclick = function() { deleteProjectFromLibrary(item.id); };

            btns.appendChild(loadBtn);
            btns.appendChild(expBtn);
            btns.appendChild(delBtn);

            card.appendChild(info);
            card.appendChild(btns);
            container.appendChild(card);
        })(list[i]);
    }
}

function loadProjectFromLibrary(id) {
    if (!confirm(i18n[currentLang].confirmNewProject)) return;
    var list = getStoredProjectsList();
    var found = list.find(function(p) { return p.id === id; });
    if (found && found.data) {
        loadSaved(found.data);
        applyLang(currentLang);
        closeProjectsModal();
        showToast(i18n[currentLang] ? i18n[currentLang].projectLoadedSuccess : 'Project loaded successfully!');
    }
}

function deleteProjectFromLibrary(id) {
    if (!confirm(i18n[currentLang].projCardDeleteConfirm)) return;
    var list = getStoredProjectsList().filter(function(p) { return p.id !== id; });
    localStorage.setItem('hoi4_saved_projects_list', JSON.stringify(list));
    renderProjectsList();
}

function exportProjectFromLibrary(id) {
    var list = getStoredProjectsList();
    var found = list.find(function(p) { return p.id === id; });
    if (found && found.data) {
        var blob = new Blob([JSON.stringify(found.data, null, 2)], { type: 'application/json;charset=utf-8' });
        saveAs(blob, (found.name || 'project') + '_project.json');
    }
}

function createNewProject() {
    if (!confirm(i18n[currentLang].confirmNewProject)) return;
    document.getElementById('modName').value = '';
    modCoverData = null;
    countries = [mkEmptyCountry()];
    puppetRules = [mkEmptyPuppet()];
    stateNameRules = [mkEmptyState()];
    cityNameRules = [mkEmptyCity()];
    applyLang(currentLang);
    showToast(i18n[currentLang] ? 'Новый проект готов' : 'New project ready');
}

var toastTimer = null;
function showToast(msg) {
    var toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
        toast.classList.remove('show');
    }, 2800);
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

function buildPuppetOnActions(pRules) {
    var validRules = [];
    var seen = {};
    for (var i = 0; i < pRules.length; i++) {
        var r = pRules[i];
        var ov = String(r.overlord || '').toUpperCase().trim();
        var tg = String(r.tag || '').toUpperCase().trim();
        if (!ov || !tg) continue;
        var key = tg + '_' + ov;
        if (!seen[key]) {
            seen[key] = true;
            validRules.push({ tag: tg, overlord: ov, cosTag: key });
        }
    }

    if (!validRules.length) return '';

    function getOverlordCond(ov) {
        var tags = [ov];
        if (ov === 'EUR' && tags.indexOf('EUR_UNIFIED') === -1) tags.push('EUR_UNIFIED');
        if (ov === 'EUR_UNIFIED' && tags.indexOf('EUR') === -1) tags.push('EUR');

        var conds = [];
        for (var t = 0; t < tags.length; t++) {
            conds.push('tag = ' + tags[t]);
            conds.push('original_tag = ' + tags[t]);
            conds.push('has_cosmetic_tag = ' + tags[t]);
        }
        return conds;
    }

    var lines = [
        'on_actions = {',
        '    on_puppet = {',
        '        effect = {'
    ];

    for (var i = 0; i < validRules.length; i++) {
        var vr = validRules[i];
        var ovConds = getOverlordCond(vr.overlord);

        lines.push('            if = {');
        lines.push('                limit = {');
        lines.push('                    ROOT = {');
        lines.push('                        OR = {');
        lines.push('                            tag = ' + vr.tag);
        lines.push('                            original_tag = ' + vr.tag);
        lines.push('                            has_cosmetic_tag = ' + vr.tag);
        lines.push('                        }');
        lines.push('                    }');
        lines.push('                    FROM = {');
        lines.push('                        OR = {');
        for (var c = 0; c < ovConds.length; c++) {
            lines.push('                            ' + ovConds[c]);
        }
        lines.push('                        }');
        lines.push('                    }');
        lines.push('                }');
        lines.push('                ROOT = { set_cosmetic_tag = ' + vr.cosTag + ' }');
        lines.push('            }');
    }

    lines.push('        }');
    lines.push('    }');
    lines.push('    on_release_as_puppet = {');
    lines.push('        effect = {');

    for (var i = 0; i < validRules.length; i++) {
        var vr = validRules[i];
        var ovConds = getOverlordCond(vr.overlord);

        lines.push('            if = {');
        lines.push('                limit = {');
        lines.push('                    ROOT = {');
        lines.push('                        OR = {');
        lines.push('                            tag = ' + vr.tag);
        lines.push('                            original_tag = ' + vr.tag);
        lines.push('                            has_cosmetic_tag = ' + vr.tag);
        lines.push('                        }');
        lines.push('                    }');
        lines.push('                    FROM = {');
        lines.push('                        OR = {');
        for (var c = 0; c < ovConds.length; c++) {
            lines.push('                            ' + ovConds[c]);
        }
        lines.push('                        }');
        lines.push('                    }');
        lines.push('                }');
        lines.push('                ROOT = { set_cosmetic_tag = ' + vr.cosTag + ' }');
        lines.push('            }');
    }

    lines.push('        }');
    lines.push('    }');
    lines.push('    on_startup = {');
    lines.push('        effect = {');

    for (var i = 0; i < validRules.length; i++) {
        var vr = validRules[i];
        var ovConds = getOverlordCond(vr.overlord);

        lines.push('            if = {');
        lines.push('                limit = {');
        lines.push('                    ' + vr.tag + ' = {');
        lines.push('                        is_subject = yes');
        lines.push('                        OVERLORD = {');
        lines.push('                            OR = {');
        for (var c = 0; c < ovConds.length; c++) {
            lines.push('                                ' + ovConds[c]);
        }
        lines.push('                            }');
        lines.push('                        }');
        lines.push('                    }');
        lines.push('                }');
        lines.push('                ' + vr.tag + ' = { set_cosmetic_tag = ' + vr.cosTag + ' }');
        lines.push('            }');
    }

    lines.push('        }');
    lines.push('    }');
    lines.push('}');
    return lines.join('\n');
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
            var cTag = sg[sid2][ri].tag;
            lines.push('                if = {');
            lines.push('                    limit = {');
            lines.push('                        OR = {');
            lines.push('                            tag = ' + cTag);
            lines.push('                            original_tag = ' + cTag);
            lines.push('                            has_cosmetic_tag = ' + cTag);
            if (cTag === 'EUR') lines.push('                            has_cosmetic_tag = EUR_UNIFIED');
            if (cTag === 'EUR_UNIFIED') lines.push('                            has_cosmetic_tag = EUR');
            lines.push('                        }');
            lines.push('                    }');
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
            var cpTag = cg[cid][m].tag;
            lines.push('                if = {');
            lines.push('                    limit = {');
            lines.push('                        OR = {');
            lines.push('                            tag = ' + cpTag);
            lines.push('                            original_tag = ' + cpTag);
            lines.push('                            has_cosmetic_tag = ' + cpTag);
            if (cpTag === 'EUR') lines.push('                            has_cosmetic_tag = EUR_UNIFIED');
            if (cpTag === 'EUR_UNIFIED') lines.push('                            has_cosmetic_tag = EUR');
            lines.push('                        }');
            lines.push('                    }');
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

function addLoc(arrRu, arrEn, key, val) {
    addLocLine(arrRu, key, val);
    addLocLine(arrEn, key, val);
}

async function generateMod() {
    pullCountriesFromDOM();
    var zip = new JSZip();
    var modName = document.getElementById('modName').value.trim() || 'CustomMod';
    var modFolder = zip.folder(modName);

    var fNorm = modFolder.folder('gfx/flags');
    var fMed = modFolder.folder('gfx/flags/medium');
    var fSmall = modFolder.folder('gfx/flags/small');
    var replaceFolder = modFolder.folder('localisation/replace');

    var normalLocRu = ['l_russian:'];
    var normalLocEn = ['l_english:'];
    var cosmeticLocRu = ['l_russian:'];
    var cosmeticLocEn = ['l_english:'];
    var hasNormal = false;
    var hasCosmetic = false;

    for (var ci = 0; ci < countries.length; ci++) {
        var tag = countries[ci].tag;
        if (!tag) continue;

        var isCosmetic = (countries[ci].tagType === 'cosmetic');
        var targetRu = isCosmetic ? cosmeticLocRu : normalLocRu;
        var targetEn = isCosmetic ? cosmeticLocEn : normalLocEn;

        if (isCosmetic) hasCosmetic = true;
        else hasNormal = true;

        var tagVariants = [tag];
        if (isCosmetic) {
            if (tag === 'EUR' && tagVariants.indexOf('EUR_UNIFIED') === -1) tagVariants.push('EUR_UNIFIED');
            if (tag === 'EUR_UNIFIED' && tagVariants.indexOf('EUR') === -1) tagVariants.push('EUR');
        }

        var firstBase = '', firstDef = '', firstAdj = '';

        for (var ii = 0; ii < ideologies.length; ii++) {
            var ideo = ideologies[ii];
            var d = countries[ci].ideologies[ideo] || {};

            if (d.base && !firstBase) firstBase = d.base;
            if (d.def && !firstDef) firstDef = d.def;
            if (d.adj && !firstAdj) firstAdj = d.adj;

            for (var tv = 0; tv < tagVariants.length; tv++) {
                var cTag = tagVariants[tv];
                if (d.base) addLoc(targetRu, targetEn, cTag + '_' + ideo, d.base);
                if (d.def) addLoc(targetRu, targetEn, cTag + '_' + ideo + '_DEF', d.def);
                if (d.adj) addLoc(targetRu, targetEn, cTag + '_' + ideo + '_ADJ', d.adj);
            }

            var cvn = document.getElementById('c' + ci + '_' + ideo + '_cn');
            var cvm = document.getElementById('c' + ci + '_' + ideo + '_cm');
            var cvs = document.getElementById('c' + ci + '_' + ideo + '_cs');
            if (cvn && cvn.getAttribute('data-img')) {
                for (var tv2 = 0; tv2 < tagVariants.length; tv2++) {
                    var cTag2 = tagVariants[tv2];
                    var fn = cTag2 + '_' + ideo + '.tga';
                    fNorm.file(fn, canvasToTGA(cvn));
                    if (cvm) fMed.file(fn, canvasToTGA(cvm));
                    if (cvs) fSmall.file(fn, canvasToTGA(cvs));

                    var baseFn = cTag2 + '.tga';
                    if (!fNorm.file(baseFn)) {
                        fNorm.file(baseFn, canvasToTGA(cvn));
                        if (cvm) fMed.file(baseFn, canvasToTGA(cvm));
                        if (cvs) fSmall.file(baseFn, canvasToTGA(cvs));
                    }
                }
            }
        }

        for (var tv3 = 0; tv3 < tagVariants.length; tv3++) {
            var cTag3 = tagVariants[tv3];
            if (firstBase) addLoc(targetRu, targetEn, cTag3, firstBase);
            if (firstDef || firstBase) addLoc(targetRu, targetEn, cTag3 + '_DEF', firstDef || firstBase);
            if (firstAdj) addLoc(targetRu, targetEn, cTag3 + '_ADJ', firstAdj);
        }
    }

    for (var pi = 0; pi < puppetRules.length; pi++) {
        var pr = puppetRules[pi];
        var pOv = String(pr.overlord || '').toUpperCase().trim();
        var pTg = String(pr.tag || '').toUpperCase().trim();
        if (!pOv || !pTg) continue;

        hasCosmetic = true;
        var pMode = pr.mode || 'short';
        var ovVariants = [pOv];
        if (pOv === 'EUR' && ovVariants.indexOf('EUR_UNIFIED') === -1) ovVariants.push('EUR_UNIFIED');
        if (pOv === 'EUR_UNIFIED' && ovVariants.indexOf('EUR') === -1) ovVariants.push('EUR');

        var puppetDefaultName = '';

        for (var pj = 0; pj < ideologies.length; pj++) {
            var pIdeo = ideologies[pj];
            var pIdeoData = pr.ideologies[pIdeo] || {};

            if (pMode === 'short') {
                var shortIdeoName = String(pIdeoData.name || pr.shortName || '').trim();
                if (shortIdeoName) {
                    if (!puppetDefaultName) puppetDefaultName = shortIdeoName;
                    for (var ovi = 0; ovi < ovVariants.length; ovi++) {
                        var oTag = ovVariants[ovi];
                        addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_' + pIdeo, shortIdeoName);
                        addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_' + pIdeo + '_DEF', shortIdeoName);
                        for (var ak = 0; ak < autonomyLevels.length; ak++) {
                            var alShort = autonomyLevels[ak];
                            addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_' + pIdeo + '_autonomy_' + alShort, shortIdeoName);
                            addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_' + pIdeo + '_autonomy_' + alShort + '_DEF', shortIdeoName);
                            addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_autonomy_' + alShort, shortIdeoName);
                            addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_autonomy_' + alShort + '_DEF', shortIdeoName);
                        }
                    }
                }
            } else {
                var pNm = String(pIdeoData.name || pr.shortName || '').trim();
                if (pNm) {
                    if (!puppetDefaultName) puppetDefaultName = pNm;
                    for (var ovi = 0; ovi < ovVariants.length; ovi++) {
                        var oTag = ovVariants[ovi];
                        addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_' + pIdeo, pNm);
                        addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_' + pIdeo + '_DEF', pNm);
                    }
                }

                for (var ak2 = 0; ak2 < autonomyLevels.length; ak2++) {
                    var al2 = autonomyLevels[ak2];
                    var aNm = String((pIdeoData.autonomy && pIdeoData.autonomy[al2]) || pNm || pr.shortName || '').trim();
                    if (!aNm && al2 === 'tpc_minimal') {
                        aNm = String((pIdeoData.autonomy && pIdeoData.autonomy['integrated_puppet']) || pNm || pr.shortName || '').trim();
                    }
                    if (aNm) {
                        if (!puppetDefaultName) puppetDefaultName = aNm;
                        for (var ovi = 0; ovi < ovVariants.length; ovi++) {
                            var oTag = ovVariants[ovi];
                            addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_' + pIdeo + '_autonomy_' + al2, aNm);
                            addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_' + pIdeo + '_autonomy_' + al2 + '_DEF', aNm);
                            addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_autonomy_' + al2, aNm);
                            addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_autonomy_' + al2 + '_DEF', aNm);
                        }
                    }
                }
            }
        }

        if (puppetDefaultName) {
            for (var ovi = 0; ovi < ovVariants.length; ovi++) {
                var oTag = ovVariants[ovi];
                addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag, puppetDefaultName);
                addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_DEF', puppetDefaultName);
            }
        }

        for (var pj2 = 0; pj2 < ideologies.length; pj2++) {
            var pIdeo2 = ideologies[pj2];
            var pCn = document.getElementById('p' + pi + '_' + pIdeo2 + '_cn');
            var pCm = document.getElementById('p' + pi + '_' + pIdeo2 + '_cm');
            var pCs = document.getElementById('p' + pi + '_' + pIdeo2 + '_cs');
            if (pCn && pCn.getAttribute('data-img')) {
                for (var ovi = 0; ovi < ovVariants.length; ovi++) {
                    var oTag = ovVariants[ovi];
                    var pFn = pTg + '_' + oTag + '_' + pIdeo2 + '.tga';
                    fNorm.file(pFn, canvasToTGA(pCn));
                    if (pCm) fMed.file(pFn, canvasToTGA(pCm));
                    if (pCs) fSmall.file(pFn, canvasToTGA(pCs));

                    var pBaseFn = pTg + '_' + oTag + '.tga';
                    if (!fNorm.file(pBaseFn)) {
                        fNorm.file(pBaseFn, canvasToTGA(pCn));
                        if (pCm) fMed.file(pBaseFn, canvasToTGA(pCm));
                        if (pCs) fSmall.file(pBaseFn, canvasToTGA(pCs));
                    }
                }
            }
        }
    }

    if (hasNormal) {
        replaceFolder.file('countries_l_russian.yml', '\uFEFF' + normalLocRu.join('\n') + '\n');
        replaceFolder.file('countries_l_english.yml', '\uFEFF' + normalLocEn.join('\n') + '\n');
    }
    if (hasCosmetic) {
        replaceFolder.file('countries_cosmetic_l_russian.yml', '\uFEFF' + cosmeticLocRu.join('\n') + '\n');
        replaceFolder.file('countries_cosmetic_l_english.yml', '\uFEFF' + cosmeticLocEn.join('\n') + '\n');
    }

    var puppetOnAct = buildPuppetOnActions(puppetRules);
    if (puppetOnAct) {
        modFolder.folder('common/on_actions').file('custom_puppets.txt', puppetOnAct + '\n');
    }

    var vStateRules = stateNameRules.filter(function(r) {
        return /^\d+$/.test(String(r.stateId).trim()) && String(r.controllerTag).trim() && String(r.name).trim();
    });
    var vCityRules = cityNameRules.filter(function(r) {
        return /^\d+$/.test(String(r.provinceId).trim()) && String(r.controllerTag).trim() && String(r.name).trim();
    });

    if (vStateRules.length || vCityRules.length) {
        var sLocLinesRu = ['l_russian:'];
        var sLocLinesEn = ['l_english:'];
        var vpLocLinesRu = ['l_russian:'];
        var vpLocLinesEn = ['l_english:'];

        for (var si = 0; si < stateNameRules.length; si++) {
            var sr = stateNameRules[si];
            var sSid = String(sr.stateId).trim();
            var sCt = String(sr.controllerTag).toUpperCase().trim();
            var sNm = String(sr.name).trim();
            if (!/^\d+$/.test(sSid) || !sCt || !sNm) continue;
            addLoc(sLocLinesRu, sLocLinesEn, sCt + '_STATE_' + sSid, sNm);
        }

        for (var vi = 0; vi < cityNameRules.length; vi++) {
            var vr = cityNameRules[vi];
            var vPid = String(vr.provinceId).trim();
            var vCt = String(vr.controllerTag).toUpperCase().trim();
            var vNm = String(vr.name).trim();
            if (!/^\d+$/.test(vPid) || !vCt || !vNm) continue;
            addLoc(vpLocLinesRu, vpLocLinesEn, vCt + '_VICTORY_POINTS_' + vPid, vNm);
        }

        replaceFolder.file('states_names_l_russian.yml', '\uFEFF' + sLocLinesRu.join('\n') + '\n');
        replaceFolder.file('states_names_l_english.yml', '\uFEFF' + sLocLinesEn.join('\n') + '\n');
        replaceFolder.file('victory_points_l_russian.yml', '\uFEFF' + vpLocLinesRu.join('\n') + '\n');
        replaceFolder.file('victory_points_l_english.yml', '\uFEFF' + vpLocLinesEn.join('\n') + '\n');

        var onAct = buildOnActions(stateNameRules, cityNameRules);
        if (onAct) {
            modFolder.folder('common/on_actions').file('custom_state_names.txt', onAct + '\n');
        }
    }

    var rootDescriptor =
        'version="1.0"\n' +
        'tags={\n' +
        '\t"Alternative History"\n' +
        '\t"Graphics"\n' +
        '}\n' +
        'name="' + modName + '"\n' +
        'supported_version="1.19.*"\n' +
        'path="mod/' + modName + '"\n';

    zip.file(modName + '.mod', rootDescriptor);

    pullCountriesFromDOM();
    var projectData = {
        version: "2.0",
        app: "HoI4ModGenerator",
        savedAt: new Date().toISOString(),
        lang: currentLang,
        modName: modName,
        countries: countries,
        puppetRules: puppetRules,
        stateNameRules: stateNameRules,
        cityNameRules: cityNameRules
    };
    var projectJsonStr = JSON.stringify(projectData, null, 2);
    zip.file('project.json', projectJsonStr);
    modFolder.file('project.json', projectJsonStr);

    var blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, modName + '.zip');
}