var ideologies = ['fascism', 'democratic', 'communism', 'neutrality'];
var currentLang = 'english';
var countries = [];
var puppetRules = [];
var stateNameRules = [];
var cityNameRules = [];
var modCoverData = null;
var coverBgImageObj = null;
var coverCurrentTheme = 'iron';

var coverThemePresets = {
    iron: { color1: '#1c2026', color2: '#2c3340', text: '#ffffff', sub: '#d88a00' },
    red: { color1: '#6e1111', color2: '#2e0505', text: '#ffffff', sub: '#ffcc66' },
    khaki: { color1: '#3d4429', color2: '#1c2013', text: '#f3eedb', sub: '#d88a00' },
    gold: { color1: '#38290b', color2: '#171104', text: '#fff6d6', sub: '#e6a817' },
    navy: { color1: '#10223d', color2: '#060f1c', text: '#ffffff', sub: '#68b1f5' },
    sepia: { color1: '#3d3020', color2: '#1c150b', text: '#faedd9', sub: '#e39f3b' },
    custom: { color1: '#1c2026', color2: '#2c3340', text: '#ffffff', sub: '#d88a00' }
};

var autonomyLevels = [
    'reichskommissariat', 'reichsprotectorate', 'satellite', 'puppet', 
    'dominion', 'colony', 'integrated_puppet', 'tpc_minimal', 'subjugated', 
    'supervised_state', 'protectorate'
];

var i18n = {
    english: {
        title: "HoI4 Mod Generator",
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
        footerCoverBtn: "🎨 Make Cover",
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
        onlineNow: "Online right now:",
        onlineUsers: "Users:",
        onlineGuests: "Guests:",
        onlineMobile: "Mobile:",
        onlineRobots: "Robots:",

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

        // Cover Card & Creator
        modCoverLabel: "Mod Cover",
        noCoverLabel: "No cover",
        uploadCoverBtn: "Upload Cover",
        makeCoverBtn: "Create in Editor",
        editCoverBtn: "Edit in Editor",
        downloadCoverBtn: "Download",
        removeCoverBtn: "Remove",
        coverModalTitle: "Mod Cover Creator",
        coverModalDesc: "Design a cover / Steam Workshop & Launcher thumbnail for your mod (512×512 px)",
        coverApplyBtn: "Apply to Mod",
        coverDownloadBtn: "Download PNG",
        coverTabTitleHead: "Title & Text",
        coverTitleInputLabel: "Title on Cover:",
        coverSubtitleInputLabel: "Subtitle / Tagline:",
        coverFontLabel: "Title Font:",
        coverTitleSizeLabel: "Title Size:",
        coverTitleColorLabel: "Title Color:",
        coverSubtitleColorLabel: "Subtitle Color:",
        coverTextShadowLabel: "Text Shadow & Outline",
        coverTabBgHead: "Background",
        coverThemePresetsLabel: "Color Themes:",
        coverUploadBgImgLabel: "Upload Background Image (Photo / Art):",
        coverBgDarknessLabel: "Dimming Overlay:",
        coverBgBlurLabel: "Blur Effect:",
        coverTabFlagHead: "Flag on Cover",
        coverEnableFlagLabel: "Display Flag on Cover",
        coverSelectFlagLabel: "Select Flag:",
        coverFlagStyleLabel: "Badge Shape:",
        coverFlagPosLabel: "Flag Position:",
        coverFlagSizeLabel: "Badge Size:",
        coverTabEffectsHead: "Frames & Effects",
        coverHoI4BadgeLabel: "«HEARTS OF IRON IV» Top Banner",
        coverFrameLabel: "HoI4 Vintage Frame Border",
        coverVignetteLabel: "Vignette (Dark edges)",
        coverGrungeLabel: "Tactical Grid / Scanlines",
        coverUploadReadyLabel: "Or Upload Ready-made Cover:",
        coverAppliedToast: "Cover applied to mod!",
        coverRemovedToast: "Cover removed.",
        noFlagsForCover: "No flags uploaded yet (upload in country section)",

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
        title: "HOI4 Mod Generator",
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
        footerCoverBtn: "🎨 Сделать обложку",
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
        puppetNameFascism: "Название (Фашизм):",
        puppetNameDemocratic: "Название (Демократия):",
        puppetNameCommunism: "Название (Коммунизм):",
        puppetNameNeutrality: "Название (Нейтралитет):",
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
        onlineNow: "Сейчас на сайте:",
        onlineUsers: "Пользователей:",
        onlineGuests: "Гостей:",
        onlineMobile: "Мобильных:",
        onlineRobots: "Роботов:",

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

        // Обложка
        modCoverLabel: "Обложка мода",
        noCoverLabel: "Нет обложки",
        uploadCoverBtn: "Загрузить свою обложку",
        makeCoverBtn: "Создать в редакторе",
        editCoverBtn: "Редактировать в редакторе",
        downloadCoverBtn: "Скачать",
        removeCoverBtn: "Удалить",
        coverModalTitle: "Конструктор обложки для мода",
        coverModalDesc: "Создай обложку для мастерской Steam и лаунчера HoI4 (512×512 px)",
        coverApplyBtn: "Применить к моду",
        coverDownloadBtn: "Скачать PNG",
        coverTabTitleHead: "Название и текст",
        coverTitleInputLabel: "Название на обложке:",
        coverSubtitleInputLabel: "Подзаголовок:",
        coverFontLabel: "Шрифт названия:",
        coverTitleSizeLabel: "Размер названия:",
        coverTitleColorLabel: "Цвет названия:",
        coverSubtitleColorLabel: "Цвет подзаголовка:",
        coverTextShadowLabel: "Тень и контур текста",
        coverTabBgHead: "Фон",
        coverThemePresetsLabel: "Цветовые темы:",
        coverUploadBgImgLabel: "Загрузить картинку для фона (фото / арт):",
        coverBgDarknessLabel: "Затемнение фона:",
        coverBgBlurLabel: "Размытие фона:",
        coverTabFlagHead: "Флаг на обложке",
        coverEnableFlagLabel: "Отображать флаг на обложке",
        coverSelectFlagLabel: "Выберите флаг:",
        coverFlagStyleLabel: "Форма эмблемы:",
        coverFlagPosLabel: "Положение флага:",
        coverFlagSizeLabel: "Размер эмблемы:",
        coverTabEffectsHead: "Рамка и эффекты",
        coverHoI4BadgeLabel: "Бейдж «HEARTS OF IRON IV» вверху",
        coverFrameLabel: "Винтажная рамка в стиле HoI4",
        coverVignetteLabel: "Виньетка (затемнение по краям)",
        coverGrungeLabel: "Тактическая сетка / текстура",
        coverUploadReadyLabel: "Или загрузить готовую обложку:",
        coverAppliedToast: "Обложка применена к моду!",
        coverRemovedToast: "Обложка удалена.",
        noFlagsForCover: "Нет загруженных флагов (загрузите во вкладке страны)",

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

/* Онлайн-счётчик пользователей (как на saharina.ru) */
var OnlineCounter = {
    state: {
        total: 0,
        users: 0,
        guests: 0,
        mobile: 0,
        robots: 0
    },
    timerId: null,
    isUserActive: false,
    isMobile: false,

    init: function() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);

        this.checkUserActivity();
        this.bindActivityListeners();
        this.calculateOnline();
        this.render();

        var self = this;
        if (this.timerId) clearInterval(this.timerId);
        this.timerId = setInterval(function() {
            self.tick();
        }, 22000 + Math.floor(Math.random() * 8000));

        window.addEventListener('storage', function(e) {
            if (e.key === 'hoi4_online_counter_state') {
                try {
                    var remote = JSON.parse(e.newValue);
                    if (remote && remote.total) {
                        self.state = remote;
                        self.render();
                    }
                } catch(err) {}
            }
        });
    },

    checkUserActivity: function() {
        try {
            if (localStorage.getItem('hoi4_user_activated') === '1' ||
                (countries && countries.length > 1) ||
                (countries && countries[0] && (countries[0].tag || countries[0].normalTag || (countries[0].fascism && countries[0].fascism.baseName)))) {
                this.isUserActive = true;
            }
        } catch(e) {}
    },

    markUserActive: function() {
        if (!this.isUserActive) {
            this.isUserActive = true;
            try { localStorage.setItem('hoi4_user_activated', '1'); } catch(e) {}
            if (this.state.guests > 1) {
                this.state.guests--;
                this.state.users++;
                this.saveState();
                this.render();
            }
        }
    },

    bindActivityListeners: function() {
        var self = this;
        var onUserEvent = function() {
            self.markUserActive();
        };
        window.addEventListener('input', onUserEvent, { passive: true, once: true });
        window.addEventListener('change', onUserEvent, { passive: true, once: true });
    },

    calculateOnline: function() {
        var cached = null;
        try {
            var raw = localStorage.getItem('hoi4_online_counter_state');
            var rawTime = localStorage.getItem('hoi4_online_counter_time');
            if (raw && rawTime && (Date.now() - parseInt(rawTime, 10) < 180000)) {
                cached = JSON.parse(raw);
            }
        } catch(e) {}

        if (cached && cached.total > 0) {
            this.state = cached;
            this.ensureLogicalConsistency();
            return;
        }

        var hour = new Date().getHours();
        var hourFactors = [
            0.65, 0.55, 0.45, 0.40, 0.40, 0.45,
            0.55, 0.70, 0.85, 0.95, 1.05, 1.10,
            1.15, 1.10, 1.15, 1.20, 1.25, 1.30,
            1.40, 1.45, 1.40, 1.30, 1.10, 0.85
        ];
        var factor = hourFactors[hour] || 1.0;

        var baseTotal = Math.round((28 + Math.floor(Math.random() * 24)) * factor);
        if (baseTotal < 12) baseTotal = 12;

        var userRatio = 0.12 + Math.random() * 0.10;
        var users = Math.max(1, Math.round(baseTotal * userRatio));
        if (this.isUserActive && users < 1) users = 1;
        var guests = baseTotal - users;

        var mobileRatio = 0.32 + Math.random() * 0.14;
        var mobile = Math.round(baseTotal * mobileRatio);
        if (this.isMobile && mobile < 1) mobile = 1;

        var robots = 2 + Math.floor(Math.random() * 7);

        this.state = {
            total: baseTotal,
            users: users,
            guests: guests,
            mobile: mobile,
            robots: robots
        };

        this.saveState();
    },

    ensureLogicalConsistency: function() {
        if (this.state.total !== this.state.users + this.state.guests) {
            this.state.total = this.state.users + this.state.guests;
        }
        if (this.state.mobile > this.state.total) {
            this.state.mobile = Math.max(1, Math.round(this.state.total * 0.35));
        }
    },

    tick: function() {
        var delta = Math.floor(Math.random() * 5) - 2;
        var newTotal = this.state.total + delta;
        if (newTotal < 10) newTotal = 10;
        if (newTotal > 150) newTotal = 150;

        var userDelta = 0;
        if (Math.random() > 0.7) {
            userDelta = Math.random() > 0.5 ? 1 : -1;
        }
        var newUsers = Math.max(1, this.state.users + userDelta);
        var newGuests = Math.max(2, newTotal - newUsers);
        newTotal = newUsers + newGuests;

        var mobileDelta = Math.floor(Math.random() * 3) - 1;
        var newMobile = Math.max(this.isMobile ? 1 : 0, Math.min(newTotal, this.state.mobile + mobileDelta));

        var robotsDelta = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        var newRobots = Math.max(1, Math.min(15, this.state.robots + robotsDelta));

        this.state = {
            total: newTotal,
            users: newUsers,
            guests: newGuests,
            mobile: newMobile,
            robots: newRobots
        };

        this.saveState();
        this.render();
    },

    saveState: function() {
        try {
            localStorage.setItem('hoi4_online_counter_state', JSON.stringify(this.state));
            localStorage.setItem('hoi4_online_counter_time', Date.now().toString());
        } catch(e) {}
    },

    render: function() {
        var setVal = function(id, val) {
            var el = document.getElementById(id);
            if (!el) return;
            var oldVal = el.textContent;
            var strVal = String(val);
            if (oldVal && oldVal !== '0' && oldVal !== strVal) {
                el.textContent = strVal;
                el.classList.add('changed');
                setTimeout(function() {
                    el.classList.remove('changed');
                }, 400);
            } else {
                el.textContent = strVal;
            }
        };

        setVal('onlineCounterTotal', this.state.total);
        setVal('onlineCountUsers', this.state.users);
        setVal('onlineCountGuests', this.state.guests);
        setVal('onlineCountMobile', this.state.mobile);
        setVal('onlineCountRobots', this.state.robots);
    },

    updateLanguage: function(t) {
        if (!t) return;
        var titleEl = document.getElementById('onlineCounterTitle');
        if (titleEl && t.onlineNow) titleEl.textContent = t.onlineNow;

        var uLabel = document.getElementById('onlineLabelUsers');
        if (uLabel && t.onlineUsers) uLabel.textContent = t.onlineUsers;

        var gLabel = document.getElementById('onlineLabelGuests');
        if (gLabel && t.onlineGuests) gLabel.textContent = t.onlineGuests;

        var mLabel = document.getElementById('onlineLabelMobile');
        if (mLabel && t.onlineMobile) mLabel.textContent = t.onlineMobile;

        var rLabel = document.getElementById('onlineLabelRobots');
        if (rLabel && t.onlineRobots) rLabel.textContent = t.onlineRobots;
    }
};

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
    if (window.OnlineCounter && typeof window.OnlineCounter.init === 'function') {
        window.OnlineCounter.init();
    }
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

    renderCoverPreview();
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

    var nmDesc = document.getElementById('modNameDesc');
    if (nmDesc) nmDesc.innerText = t.modNameDesc;

    var mcLabel = document.getElementById('modCoverLabel');
    if (mcLabel) mcLabel.innerText = t.modCoverLabel;

    var ncLabel = document.getElementById('noCoverLabel');
    if (ncLabel) ncLabel.innerText = t.noCoverLabel;

    var buc = document.getElementById('btnUploadCoverText');
    if (buc) buc.innerText = t.uploadCoverBtn;

    var bmc = document.getElementById('btnMakeCoverText');
    if (bmc) bmc.innerText = modCoverData ? t.editCoverBtn : t.makeCoverBtn;

    var bdc = document.getElementById('btnDownloadCover');
    if (bdc) bdc.innerText = t.downloadCoverBtn;

    var brc = document.getElementById('btnRemoveCover');
    if (brc) brc.innerText = t.removeCoverBtn;

    // Project toolbar
    var spBtn = document.getElementById('btnSaveProjFileText');
    if (spBtn) spBtn.innerText = t.saveProjectBtn;

    var lpBtn = document.getElementById('btnLoadProjFileText');
    if (lpBtn) lpBtn.innerText = t.loadProjectBtn;

    var mpBtn = document.getElementById('btnMyProjectsText');
    if (mpBtn) mpBtn.innerText = t.myProjectsBtn;

    var npBtn = document.getElementById('btnNewProjText');
    if (npBtn) npBtn.innerText = t.newProjectBtn;

    // Cover Creator Modal
    var cmt = document.getElementById('coverModalTitle');
    if (cmt) cmt.innerText = t.coverModalTitle;
    var cmd = document.getElementById('coverModalDesc');
    if (cmd) cmd.innerText = t.coverModalDesc;
    var cth = document.getElementById('coverTabTitleHead');
    if (cth) cth.innerText = t.coverTabTitleHead;
    var cti = document.getElementById('coverTitleInputLabel');
    if (cti) cti.innerText = t.coverTitleInputLabel;
    var csi = document.getElementById('coverSubtitleInputLabel');
    if (csi) csi.innerText = t.coverSubtitleInputLabel;
    var cfl = document.getElementById('coverFontLabel');
    if (cfl) cfl.innerText = t.coverFontLabel;
    var cts = document.getElementById('coverTitleSizeLabel');
    if (cts) cts.innerText = t.coverTitleSizeLabel;
    var ctc = document.getElementById('coverTitleColorLabel');
    if (ctc) ctc.innerText = t.coverTitleColorLabel;
    var csc = document.getElementById('coverSubtitleColorLabel');
    if (csc) csc.innerText = t.coverSubtitleColorLabel;
    var cst = document.getElementById('coverTextShadowLabel');
    if (cst) cst.innerText = t.coverTextShadowLabel;
    var ctb = document.getElementById('coverTabBgHead');
    if (ctb) ctb.innerText = t.coverTabBgHead;
    var ctp = document.getElementById('coverThemePresetsLabel');
    if (ctp) ctp.innerText = t.coverThemePresetsLabel;
    var cub = document.getElementById('coverUploadBgImgLabel');
    if (cub) cub.innerText = t.coverUploadBgImgLabel;
    var cbd = document.getElementById('coverBgDarknessLabel');
    if (cbd) cbd.innerText = t.coverBgDarknessLabel;
    var cbb = document.getElementById('coverBgBlurLabel');
    if (cbb) cbb.innerText = t.coverBgBlurLabel;
    var ctf = document.getElementById('coverTabFlagHead');
    if (ctf) ctf.innerText = t.coverTabFlagHead;
    var cef = document.getElementById('coverEnableFlagLabel');
    if (cef) cef.innerText = t.coverEnableFlagLabel;
    var csf = document.getElementById('coverSelectFlagLabel');
    if (csf) csf.innerText = t.coverSelectFlagLabel;
    var cfs = document.getElementById('coverFlagStyleLabel');
    if (cfs) cfs.innerText = t.coverFlagStyleLabel;
    var cfp = document.getElementById('coverFlagPosLabel');
    if (cfp) cfp.innerText = t.coverFlagPosLabel;
    var cfz = document.getElementById('coverFlagSizeLabel');
    if (cfz) cfz.innerText = t.coverFlagSizeLabel;
    var cte = document.getElementById('coverTabEffectsHead');
    if (cte) cte.innerText = t.coverTabEffectsHead;
    var chb = document.getElementById('coverHoI4BadgeLabel');
    if (chb) chb.innerText = t.coverHoI4BadgeLabel;
    var cfb = document.getElementById('coverFrameLabel');
    if (cfb) cfb.innerText = t.coverFrameLabel;
    var cvl = document.getElementById('coverVignetteLabel');
    if (cvl) cvl.innerText = t.coverVignetteLabel;
    var cgl = document.getElementById('coverGrungeLabel');
    if (cgl) cgl.innerText = t.coverGrungeLabel;
    var cur = document.getElementById('coverUploadReadyLabel');
    if (cur) cur.innerText = t.coverUploadReadyLabel;
    var cab = document.getElementById('coverApplyBtn');
    if (cab) cab.innerText = t.coverApplyBtn;
    var cdb = document.getElementById('coverDownloadBtn');
    if (cdb) cdb.innerText = t.coverDownloadBtn;

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

    if (window.OnlineCounter && typeof window.OnlineCounter.updateLanguage === 'function') {
        window.OnlineCounter.updateLanguage(t);
    }

    renderCountries();
    renderPuppetRules();
    renderStateNameRules();
    renderCityNameRules();
    renderCoverPreview();
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
                // Short mode: one name per ideology, shared by every autonomy level.
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

function renderCoverPreview() {
    var imgEl = document.getElementById('modCoverImg');
    var phEl = document.getElementById('modCoverPlaceholder');
    var btnMake = document.getElementById('btnMakeCoverText');
    var subActs = document.getElementById('coverSubActions');

    if (modCoverData) {
        if (imgEl) {
            imgEl.src = modCoverData;
            imgEl.style.display = 'block';
        }
        if (phEl) phEl.style.display = 'none';
        if (btnMake) btnMake.textContent = i18n[currentLang] ? i18n[currentLang].editCoverBtn : 'Edit Cover';
        if (subActs) subActs.style.display = 'flex';
    } else {
        if (imgEl) {
            imgEl.src = '';
            imgEl.style.display = 'none';
        }
        if (phEl) phEl.style.display = 'flex';
        if (btnMake) btnMake.textContent = i18n[currentLang] ? i18n[currentLang].makeCoverBtn : 'Make Cover';
        if (subActs) subActs.style.display = 'none';
    }
}

function openCoverModal() {
    var modal = document.getElementById('coverModal');
    if (!modal) return;

    var curModName = (document.getElementById('modName') || {}).value.trim();
    var titleInp = document.getElementById('coverTitleInput');
    if (titleInp && (!titleInp.value || titleInp.value === 'MyAwesomeMod' || titleInp.value === 'Custom Mod')) {
        titleInp.value = curModName || 'My Mod';
    }

    populateCoverFlagsDropdown();
    modal.style.display = 'flex';
    updateCoverCanvas();
}

function closeCoverModal() {
    var modal = document.getElementById('coverModal');
    if (modal) modal.style.display = 'none';
}

function setCoverTheme(themeName) {
    coverCurrentTheme = themeName;
    var pills = document.querySelectorAll('.theme-pill');
    pills.forEach(function(p) { p.classList.remove('active'); });

    for (var i = 0; i < pills.length; i++) {
        var oc = pills[i].getAttribute('onclick') || '';
        if (oc.indexOf("'" + themeName + "'") !== -1) {
            pills[i].classList.add('active');
            break;
        }
    }

    var customRow = document.getElementById('customColorPickerRow');
    if (customRow) {
        customRow.style.display = (themeName === 'custom') ? 'grid' : 'none';
    }

    var preset = coverThemePresets[themeName];
    if (preset) {
        if (themeName !== 'custom') {
            document.getElementById('coverCustomColor1').value = preset.color1;
            document.getElementById('coverCustomColor2').value = preset.color2;
            document.getElementById('coverTitleColor').value = preset.text;
            document.getElementById('coverSubtitleColor').value = preset.sub;
        }
    }
    updateCoverCanvas();
}

function handleCoverBgUpload(ev) {
    var f = ev.target.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function(e) {
        var im = new Image();
        im.onload = function() {
            coverBgImageObj = im;
            var adjRow = document.getElementById('bgAdjustRow');
            if (adjRow) adjRow.style.display = 'grid';
            updateCoverCanvas();
        };
        im.src = e.target.result;
    };
    rd.readAsDataURL(f);
}

function handleCoverReadyUpload(ev) {
    var f = ev.target.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function(e) {
        var im = new Image();
        im.onload = function() {
            var cv = document.getElementById('coverCanvas');
            var cx = cv.getContext('2d');
            cx.clearRect(0, 0, 512, 512);
            cx.drawImage(im, 0, 0, 512, 512);
            modCoverData = cv.toDataURL('image/png');
            renderCoverPreview();
            saveData();
            showToast(i18n[currentLang] ? i18n[currentLang].coverAppliedToast : 'Cover applied!');
        };
        im.src = e.target.result;
    };
    rd.readAsDataURL(f);
}

function populateCoverFlagsDropdown() {
    var sel = document.getElementById('coverFlagSelect');
    if (!sel) return;
    var prevVal = sel.value;
    sel.innerHTML = '';

    var optionsCount = 0;
    pullCountriesFromDOM();

    for (var ci = 0; ci < countries.length; ci++) {
        var c = countries[ci];
        var cTag = c.tag || ('TAG' + (ci + 1));
        for (var ii = 0; ii < ideologies.length; ii++) {
            var ideo = ideologies[ii];
            var ideoData = c.ideologies[ideo];
            var imgData = (ideoData && ideoData.img) || null;
            if (!imgData) {
                var cvn = document.getElementById('c' + ci + '_' + ideo + '_cn');
                if (cvn) imgData = cvn.getAttribute('data-img');
            }
            if (imgData) {
                var opt = document.createElement('option');
                opt.value = imgData;
                opt.textContent = cTag + ' — ' + (i18n[currentLang][ideo] || ideo);
                sel.appendChild(opt);
                optionsCount++;
            }
        }
    }

    if (optionsCount === 0) {
        var emptyOpt = document.createElement('option');
        emptyOpt.value = '';
        emptyOpt.textContent = i18n[currentLang].noFlagsForCover || 'No flags uploaded yet';
        sel.appendChild(emptyOpt);
    } else {
        if (prevVal) sel.value = prevVal;
    }
}

var flagImgCache = {};
function getCachedImage(src, cb) {
    if (!src) { cb(null); return; }
    if (flagImgCache[src] && flagImgCache[src].complete) {
        cb(flagImgCache[src]);
        return;
    }
    var im = new Image();
    im.onload = function() {
        flagImgCache[src] = im;
        cb(im);
    };
    im.onerror = function() { cb(null); };
    im.src = src;
}

function createShieldPath(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + h * 0.55);
    ctx.quadraticCurveTo(x + w, y + h * 0.85, x + w / 2, y + h);
    ctx.quadraticCurveTo(x, y + h * 0.85, x, y + h * 0.55);
    ctx.closePath();
}

function drawWrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var lines = [];
    var currentLine = '';

    for (var i = 0; i < words.length; i++) {
        var testLine = currentLine ? (currentLine + ' ' + words[i]) : words[i];
        var testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = words[i];
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);

    var totalHeight = (lines.length - 1) * lineHeight;
    var startY = y - (totalHeight / 2);

    for (var j = 0; j < lines.length; j++) {
        var lineY = startY + (j * lineHeight);
        if (document.getElementById('coverTextShadow').checked) {
            ctx.save();
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 6;
            ctx.lineJoin = 'miter';
            ctx.miterLimit = 2;
            ctx.strokeText(lines[j], x, lineY);
            ctx.restore();
        }
        ctx.fillText(lines[j], x, lineY);
    }
    return lines.length;
}

function updateCoverCanvas() {
    var cv = document.getElementById('coverCanvas');
    if (!cv) return;
    var ctx = cv.getContext('2d');
    var w = 512;
    var h = 512;

    var flagSel = document.getElementById('coverFlagSelect');
    var flagSrc = flagSel ? flagSel.value : null;

    getCachedImage(flagSrc, function(flagImg) {
        renderCoverToContext(ctx, w, h, flagImg);
    });
}

function renderCoverToContext(ctx, w, h, flagImg) {
    ctx.clearRect(0, 0, w, h);

    // 1. Background
    if (coverBgImageObj && coverBgImageObj.complete && coverBgImageObj.naturalWidth) {
        var iw = coverBgImageObj.naturalWidth;
        var ih = coverBgImageObj.naturalHeight;
        var r = Math.max(w / iw, h / ih);
        var nw = iw * r;
        var nh = ih * r;
        var nx = (w - nw) / 2;
        var ny = (h - nh) / 2;
        var blurVal = parseInt((document.getElementById('coverBgBlur') || {}).value, 10) || 0;
        ctx.save();
        if (blurVal > 0) ctx.filter = 'blur(' + blurVal + 'px)';
        ctx.drawImage(coverBgImageObj, nx, ny, nw, nh);
        ctx.restore();

        var darkness = (parseInt((document.getElementById('coverBgDarkness') || {}).value, 10) || 45) / 100;
        ctx.fillStyle = 'rgba(0,0,0,' + darkness + ')';
        ctx.fillRect(0, 0, w, h);
    } else {
        var c1 = (document.getElementById('coverCustomColor1') || {}).value || '#1c2026';
        var c2 = (document.getElementById('coverCustomColor2') || {}).value || '#2c3340';
        var grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, c1);
        grad.addColorStop(1, c2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
    }

    // 2. Tactical grid overlay
    var showGrid = (document.getElementById('coverShowGrid') || {}).checked;
    if (showGrid) {
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        for (var x = 32; x < w; x += 32) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (var y = 32; y < h; y += 32) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
        ctx.restore();
    }

    // 3. HoI4 Top Badge
    var showBadge = (document.getElementById('coverShowHoI4Badge') || {}).checked;
    if (showBadge) {
        ctx.save();
        ctx.fillStyle = '#d88a00';
        ctx.font = 'bold 12px "Segoe UI", Tahoma, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('★  HEARTS OF IRON IV MOD  ★', w / 2, 42);
        ctx.strokeStyle = 'rgba(216, 138, 0, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, 38);
        ctx.lineTo(135, 38);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(377, 38);
        ctx.lineTo(472, 38);
        ctx.stroke();
        ctx.restore();
    }

    // 4. Flag
    var showFlag = (document.getElementById('coverShowFlag') || {}).checked;
    var flagPos = (document.getElementById('coverFlagPos') || {}).value || 'center';
    var flagShape = (document.getElementById('coverFlagShape') || {}).value || 'shield';
    var flagSize = parseInt((document.getElementById('coverFlagSize') || {}).value, 10) || 160;

    if (showFlag && flagImg) {
        var fw = flagSize;
        var fh = Math.round(flagSize * (52 / 82));
        var fx = (w - fw) / 2;
        var fy = 200;

        if (flagPos === 'top') {
            fy = 90;
        } else if (flagPos === 'center') {
            fy = 170;
        } else if (flagPos === 'bottom') {
            fy = 310;
        }

        ctx.save();
        if (flagShape === 'shield') {
            var shW = fw;
            var shH = Math.round(fw * 1.15);
            var shX = (w - shW) / 2;
            var shY = fy - 10;

            createShieldPath(ctx, shX, shY, shW, shH);
            ctx.save();
            ctx.clip();
            ctx.drawImage(flagImg, shX, shY, shW, shH);
            ctx.restore();

            createShieldPath(ctx, shX, shY, shW, shH);
            ctx.strokeStyle = '#d88a00';
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.strokeStyle = '#222';
            ctx.lineWidth = 1;
            ctx.stroke();
        } else if (flagShape === 'circle') {
            var rad = Math.round(fw / 2);
            var cx = w / 2;
            var cy = fy + Math.round(fh / 2);
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, rad, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(flagImg, cx - rad, cy - rad, rad * 2, rad * 2);
            ctx.restore();

            ctx.beginPath();
            ctx.arc(cx, cy, rad, 0, Math.PI * 2);
            ctx.strokeStyle = '#d88a00';
            ctx.lineWidth = 4;
            ctx.stroke();
        } else {
            ctx.shadowColor = 'rgba(0,0,0,0.85)';
            ctx.shadowBlur = 18;
            ctx.shadowOffsetY = 6;
            ctx.drawImage(flagImg, fx, fy, fw, fh);
            ctx.strokeStyle = '#d88a00';
            ctx.lineWidth = 3.5;
            ctx.strokeRect(fx, fy, fw, fh);
        }
        ctx.restore();
    }

    // 5. Title & Subtitle Text
    var titleVal = (document.getElementById('coverTitleInput') || {}).value || '';
    if (!titleVal.trim()) {
        titleVal = (document.getElementById('modName') || {}).value || 'Mod Title';
    }
    var subVal = (document.getElementById('coverSubtitleInput') || {}).value || '';
    var fontFam = (document.getElementById('coverFontFamily') || {}).value || "Impact, 'Arial Black', sans-serif";
    var titleSize = parseInt((document.getElementById('coverTitleSize') || {}).value, 10) || 42;
    var titleCol = (document.getElementById('coverTitleColor') || {}).value || '#ffffff';
    var subCol = (document.getElementById('coverSubtitleColor') || {}).value || '#d88a00';

    var textY = 410;
    if (showFlag && flagImg) {
        if (flagPos === 'top') {
            textY = 320;
        } else if (flagPos === 'center') {
            textY = 415;
        } else if (flagPos === 'bottom') {
            textY = 180;
        }
    } else {
        textY = 260;
    }

    ctx.save();
    ctx.font = 'bold ' + titleSize + 'px ' + fontFam;
    ctx.textAlign = 'center';
    ctx.fillStyle = titleCol;

    var numLines = drawWrapText(ctx, titleVal.toUpperCase(), w / 2, textY, 460, titleSize * 1.12);

    if (subVal.trim()) {
        var subY = textY + (numLines * (titleSize * 1.12) / 2) + 22;
        ctx.font = '600 16px "Segoe UI", Tahoma, sans-serif';
        ctx.fillStyle = subCol;
        if ((document.getElementById('coverTextShadow') || {}).checked) {
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 4;
            ctx.strokeText(subVal, w / 2, subY);
        }
        ctx.fillText(subVal, w / 2, subY);
    }
    ctx.restore();

    // 6. Vignette
    var showVignette = (document.getElementById('coverShowVignette') || {}).checked;
    if (showVignette) {
        ctx.save();
        var vig = ctx.createRadialGradient(w / 2, h / 2, 120, w / 2, h / 2, 360);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, 'rgba(0,0,0,0.74)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
    }

    // 7. Vintage Frame Border
    var showBorder = (document.getElementById('coverShowBorder') || {}).checked;
    if (showBorder) {
        ctx.save();
        ctx.strokeStyle = '#d88a00';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(12, 12, w - 24, h - 24);

        ctx.strokeStyle = 'rgba(216, 138, 0, 0.55)';
        ctx.lineWidth = 1;
        ctx.strokeRect(18, 18, w - 36, h - 36);

        ctx.fillStyle = '#d88a00';
        var csz = 5;
        ctx.fillRect(15, 15, csz, csz);
        ctx.fillRect(w - 20, 15, csz, csz);
        ctx.fillRect(15, h - 20, csz, csz);
        ctx.fillRect(w - 20, h - 20, csz, csz);
        ctx.restore();
    }
}

function applyCoverToMod() {
    var cv = document.getElementById('coverCanvas');
    if (!cv) return;
    modCoverData = cv.toDataURL('image/png');
    renderCoverPreview();
    saveData();
    closeCoverModal();
    showToast(i18n[currentLang] ? i18n[currentLang].coverAppliedToast : 'Cover applied to mod!');
}

function downloadCoverImage() {
    var cv = document.getElementById('coverCanvas');
    var modName = ((document.getElementById('modName') || {}).value.trim() || 'mod') + '_cover.png';
    if (cv && cv.style.display !== 'none') {
        cv.toBlob(function(b) {
            saveAs(b, modName);
        });
    } else if (modCoverData) {
        var b = dataURLToBlob(modCoverData);
        saveAs(b, modName);
    }
}

function triggerDirectCoverUpload() {
    var inp = document.getElementById('directCoverFileInput');
    if (inp) inp.click();
}

function handleDirectCoverUpload(e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(evt) {
        var img = new Image();
        img.onload = function() {
            var canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            var ctx = canvas.getContext('2d');

            // Draw image cropped and centered to fill 512x512 (official HoI4 / Steam Workshop thumbnail format)
            var scale = Math.max(512 / img.width, 512 / img.height);
            var w = img.width * scale;
            var h = img.height * scale;
            var x = (512 - w) / 2;
            var y = (512 - h) / 2;

            ctx.drawImage(img, x, y, w, h);

            modCoverData = canvas.toDataURL('image/png');
            renderCoverPreview();
            saveData();
            showToast(currentLang === 'russian'
                ? 'Обложка мода загружена (авто-размер 512×512 px)!'
                : 'Mod cover uploaded (auto-scaled to 512×512 px)!');
        };
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
}

function removeCoverImage() {
    modCoverData = null;
    var inp = document.getElementById('directCoverFileInput');
    if (inp) inp.value = '';
    renderCoverPreview();
    saveData();
    showToast(i18n[currentLang] ? i18n[currentLang].coverRemovedToast : 'Cover removed.');
}

function dataURLToBlob(dataurl) {
    var parts = dataurl.split(',');
    var mime = parts[0].match(/:(.*?);/)[1];
    var bstr = atob(parts[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

function tgaToCanvas(buf) {
    var dv = new DataView(buf);
    var idLen = dv.getUint8(0);
    var colorMapType = dv.getUint8(1);
    var imageType = dv.getUint8(2);
    var width = dv.getUint16(12, true);
    var height = dv.getUint16(14, true);
    var bpp = dv.getUint8(16);
    var descriptor = dv.getUint8(17);
    var isTopDown = (descriptor & 0x20) !== 0;

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    var imgData = ctx.createImageData(width, height);
    var data = imgData.data;

    var offset = 18 + idLen;
    if (colorMapType === 1) {
        var cmLen = dv.getUint16(5, true);
        var cmSize = dv.getUint8(7);
        offset += cmLen * Math.ceil(cmSize / 8);
    }

    var bytesPerPixel = Math.floor(bpp / 8);
    var u8 = new Uint8Array(buf);

    for (var i = 0; i < height; i++) {
        var y = isTopDown ? i : (height - 1 - i);
        for (var x = 0; x < width; x++) {
            var srcIdx = offset + (i * width + x) * bytesPerPixel;
            var dstIdx = (y * width + x) * 4;
            if (bytesPerPixel >= 3) {
                var b = u8[srcIdx];
                var g = u8[srcIdx + 1];
                var r = u8[srcIdx + 2];
                var a = (bytesPerPixel === 4) ? u8[srcIdx + 3] : 255;
                data[dstIdx] = r;
                data[dstIdx + 1] = g;
                data[dstIdx + 2] = b;
                data[dstIdx + 3] = a;
            }
        }
    }
    ctx.putImageData(imgData, 0, 0);
    return canvas;
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
    } else if (name.endsWith('.zip')) {
        try {
            var zip = await JSZip.loadAsync(f);
            await importModZip(zip);
        } catch(err) {
            alert((i18n[currentLang] ? i18n[currentLang].projectLoadError : 'Error loading zip') + '\n' + err.message);
        }
    } else {
        alert(i18n[currentLang] ? i18n[currentLang].invalidFile : 'Invalid file format.');
    }
}

async function importModZip(zip) {
    // 1. Look for project.json anywhere in zip
    var projFile = zip.file('project.json');
    if (!projFile) {
        var matches = zip.file(/project\.json$/i);
        if (matches && matches.length) projFile = matches[0];
    }

    if (projFile) {
        var jsonText = await projFile.async('text');
        var data = JSON.parse(jsonText);
        loadSaved(data);
        applyLang(currentLang);
        showToast(i18n[currentLang] ? i18n[currentLang].projectModLoadedSuccess : 'Mod loaded successfully!');
        return;
    }

    // 2. Legacy mod ZIP reconstruction
    var recovered = {
        lang: currentLang,
        modName: 'ImportedMod',
        cover: null,
        countries: [],
        puppetRules: [],
        stateNameRules: [],
        cityNameRules: []
    };

    var modFiles = zip.file(/\.mod$/i);
    if (modFiles && modFiles.length) {
        var mFile = modFiles[0];
        recovered.modName = mFile.name.replace(/\.mod$/i, '').replace(/.*\//, '');
        var mText = await mFile.async('text');
        var nmMatch = mText.match(/name\s*=\s*"([^"]+)"/);
        if (nmMatch && nmMatch[1]) recovered.modName = nmMatch[1];
    }

    var thumbFiles = zip.file(/thumbnail\.png$/i);
    if (!thumbFiles.length) thumbFiles = zip.file(/cover\.png$/i);
    if (thumbFiles && thumbFiles.length) {
        var b64 = await thumbFiles[0].async('base64');
        recovered.cover = 'data:image/png;base64,' + b64;
    }

    // Step 2.1: Parse custom_puppets.txt first so we know all puppet rules & cosmetic tags
    var puppetRuleMap = {};
    var puppetFiles = zip.file(/custom_puppets\.txt$/i);
    if (puppetFiles.length) {
        var pText = await puppetFiles[0].async('text');
        var pRegex = /limit\s*=\s*\{\s*ROOT\s*=\s*\{\s*OR\s*=\s*\{(?:\s*tag\s*=\s*([A-Za-z0-9_]+))[^}]*\}\s*\}\s*FROM\s*=\s*\{\s*OR\s*=\s*\{(?:\s*tag\s*=\s*([A-Za-z0-9_]+))[^}]*\}\s*\}\s*\}\s*ROOT\s*=\s*\{\s*set_cosmetic_tag\s*=\s*([A-Za-z0-9_]+)\s*\}/gs;
        var pMatch;
        while ((pMatch = pRegex.exec(pText)) !== null) {
            var pTag = pMatch[1].toUpperCase();
            var oTag = pMatch[2].toUpperCase();
            if (oTag === 'EUR') oTag = 'EUR_UNIFIED';
            var cosTag = pMatch[3].toUpperCase();
            var pRule = recovered.puppetRules.find(function(r) {
                return r.tag === pTag && r.overlord === oTag;
            });
            if (!pRule) {
                pRule = mkEmptyPuppet();
                pRule.tag = pTag;
                pRule.overlord = oTag;
                recovered.puppetRules.push(pRule);
            }
            puppetRuleMap[cosTag] = pRule;
            puppetRuleMap[pTag + '_' + oTag] = pRule;
            if (oTag === 'EUR_UNIFIED') puppetRuleMap[pTag + '_EUR'] = pRule;
            if (oTag === 'EUR') puppetRuleMap[pTag + '_EUR_UNIFIED'] = pRule;
        }

        var pSimpleMatches = pText.matchAll(/set_cosmetic_tag\s*=\s*([A-Za-z0-9_]+)/g);
        for (var pm of pSimpleMatches) {
            var sCosTag = pm[1].toUpperCase();
            if (!puppetRuleMap[sCosTag]) {
                var sParts = sCosTag.split('_');
                if (sParts.length >= 2) {
                    var spTag = sParts[0];
                    var soTag = sParts.slice(1).join('_');
                    if (soTag === 'EUR') soTag = 'EUR_UNIFIED';
                    var spRule = recovered.puppetRules.find(function(r) {
                        return r.tag === spTag && r.overlord === soTag;
                    });
                    if (!spRule) {
                        spRule = mkEmptyPuppet();
                        spRule.tag = spTag;
                        spRule.overlord = soTag;
                        recovered.puppetRules.push(spRule);
                    }
                    puppetRuleMap[sCosTag] = spRule;
                    puppetRuleMap[spTag + '_' + soTag] = spRule;
                    if (soTag === 'EUR_UNIFIED') puppetRuleMap[spTag + '_EUR'] = spRule;
                    if (soTag === 'EUR') puppetRuleMap[spTag + '_EUR_UNIFIED'] = spRule;
                }
            }
        }
    }

    var countryMap = {};
    function ensureCountry(tag, tagType) {
        tag = tag.toUpperCase();
        if (!countryMap[tag]) {
            countryMap[tag] = { tag: tag, tagType: tagType || 'normal', ideologies: {} };
            for (var k = 0; k < ideologies.length; k++) {
                countryMap[tag].ideologies[ideologies[k]] = { base: '', def: '', adj: '', img: null };
            }
        }
        if (tagType === 'cosmetic') countryMap[tag].tagType = 'cosmetic';
        return countryMap[tag];
    }

    // Parse custom_state_names.txt to associate provinceId with stateId
    var stateProvinceMap = {};
    var stateFiles = zip.file(/custom_state_names\.txt$/i);
    if (stateFiles.length) {
        var sText = await stateFiles[0].async('text');
        var ifBlocks = sText.split(/if\s*=\s*\{/);
        for (var bi = 0; bi < ifBlocks.length; bi++) {
            var b = ifBlocks[bi];
            var sm = b.match(/state\s*=\s*(\d+)/);
            if (sm) {
                var sId = sm[1];
                var pm1 = b.match(/reset_province_name\s*=\s*(\d+)/);
                var pm2 = b.match(/set_province_name\s*=\s*\{\s*id\s*=\s*(\d+)/);
                var pId = (pm1 && pm1[1]) || (pm2 && pm2[1]);
                if (pId) stateProvinceMap[pId] = sId;
            }
        }
    }

    // Step 2.2: Parse localisation files
    var locFiles = zip.file(/localisation\/.*\.ya?ml$/i);
    for (var li = 0; li < locFiles.length; li++) {
        var lf = locFiles[li];
        var lfName = lf.name.toLowerCase();
        var lText = await lf.async('text');
        var lLines = lText.split(/\r?\n/);
        var isCosmeticFile = lfName.indexOf('cosmetic') !== -1;
        var isStateFile = lfName.indexOf('states_names') !== -1 || lfName.indexOf('state') !== -1;
        var isCityFile = lfName.indexOf('victory_points') !== -1 || lfName.indexOf('city') !== -1;

        for (var lineIdx = 0; lineIdx < lLines.length; lineIdx++) {
            var line = lLines[lineIdx].trim();
            if (line.charCodeAt(0) === 0xFEFF) line = line.slice(1);
            if (!line || line.startsWith('#') || line.startsWith('l_')) continue;

            var m = line.match(/^([A-Za-z0-9_]+):(?:0)?\s*"(.*)"$/);
            if (!m) continue;
            var key = m[1];
            var val = m[2].replace(/\\"/g, '"');

            if (isStateFile) {
                var sm = key.match(/^([A-Za-z0-9_]+)_STATE_(\d+)$/);
                if (sm) {
                    recovered.stateNameRules.push({
                        controllerTag: sm[1].toUpperCase(),
                        stateId: sm[2],
                        name: val
                    });
                }
            } else if (isCityFile) {
                var vm = key.match(/^([A-Za-z0-9_]+)_VICTORY_POINTS_(\d+)$/);
                if (vm) {
                    recovered.cityNameRules.push({
                        controllerTag: vm[1].toUpperCase(),
                        provinceId: vm[2],
                        stateId: stateProvinceMap[vm[2]] || '',
                        name: val
                    });
                }
            } else {
                // Check if key belongs to a puppet rule
                var matchedPuppet = false;
                for (var cosPrefix in puppetRuleMap) {
                    if (key === cosPrefix || key.startsWith(cosPrefix + '_')) {
                        matchedPuppet = true;
                        var pr = puppetRuleMap[cosPrefix];
                        if (!pr.shortName && val) pr.shortName = val;

                        for (var pi = 0; pi < ideologies.length; pi++) {
                            var pIdeo = ideologies[pi];
                            if (key.indexOf('_' + pIdeo) !== -1) {
                                if (!pr.ideologies[pIdeo].name) pr.ideologies[pIdeo].name = val;
                                for (var ai = 0; ai < autonomyLevels.length; ai++) {
                                    var aLvl = autonomyLevels[ai];
                                    if (key.indexOf('_autonomy_' + aLvl) !== -1) {
                                        if (!pr.ideologies[pIdeo].autonomy) pr.ideologies[pIdeo].autonomy = {};
                                        pr.ideologies[pIdeo].autonomy[aLvl] = val;
                                    }
                                }
                            }
                        }
                        // Also check autonomy without ideology (native HoI4 fallback)
                        for (var ai2 = 0; ai2 < autonomyLevels.length; ai2++) {
                            var aLvl2 = autonomyLevels[ai2];
                            if (key.indexOf('_autonomy_' + aLvl2) !== -1) {
                                for (var pi2 = 0; pi2 < ideologies.length; pi2++) {
                                    var pIdeo2 = ideologies[pi2];
                                    if (!pr.ideologies[pIdeo2].autonomy) pr.ideologies[pIdeo2].autonomy = {};
                                    if (!pr.ideologies[pIdeo2].autonomy[aLvl2]) {
                                        pr.ideologies[pIdeo2].autonomy[aLvl2] = val;
                                    }
                                }
                            }
                        }
                        break;
                    }
                }

                // If not a puppet rule, check if it's a regular/cosmetic country
                if (!matchedPuppet) {
                    for (var ideoIdx = 0; ideoIdx < ideologies.length; ideoIdx++) {
                        var ideoName = ideologies[ideoIdx];
                        var re = new RegExp('^([A-Za-z0-9_]+)_' + ideoName + '(_DEF|_ADJ)?$');
                        var cm = key.match(re);
                        if (cm) {
                            var cTag = cm[1];
                            var suffix = cm[2];
                            var co = ensureCountry(cTag, isCosmeticFile ? 'cosmetic' : 'normal');
                            if (suffix === '_DEF') co.ideologies[ideoName].def = val;
                            else if (suffix === '_ADJ') co.ideologies[ideoName].adj = val;
                            else co.ideologies[ideoName].base = val;
                            break;
                        }
                    }
                }
            }
        }
    }

    // Determine mode ('short' vs 'expanded') for each puppet rule:
    // If all autonomy values equal the base ideology name, keep 'short' mode so the UI stays simple and compact.
    // Only switch to 'expanded' if there are genuinely different names for individual autonomy levels.
    for (var pri = 0; pri < recovered.puppetRules.length; pri++) {
        var pRule = recovered.puppetRules[pri];
        var isExpanded = false;
        for (var pj = 0; pj < ideologies.length; pj++) {
            var pid = ideologies[pj];
            var pData = pRule.ideologies[pid];
            if (!pData) continue;
            var baseName = (pData.name || pRule.shortName || '').trim();
            if (pData.autonomy) {
                for (var ak = 0; ak < autonomyLevels.length; ak++) {
                    var al = autonomyLevels[ak];
                    var aVal = (pData.autonomy[al] || '').trim();
                    if (aVal && baseName && aVal !== baseName) {
                        isExpanded = true;
                        break;
                    }
                }
            }
            if (isExpanded) break;
        }
        pRule.mode = isExpanded ? 'expanded' : 'short';
    }

    // Step 2.3: Parse flag files
    var flagFiles = zip.file(/gfx\/flags\/[^/]+\.tga$/i);
    for (var fi = 0; fi < flagFiles.length; fi++) {
        var ff = flagFiles[fi];
        var ffBase = ff.name.replace(/^.*[\\\/]/, '').replace(/\.tga$/i, '');
        var buf = await ff.async('arraybuffer');
        var cv = tgaToCanvas(buf);
        var fUrl = cv.toDataURL('image/png');

        var matchedPuppetFlag = false;
        for (var cosPrefixF in puppetRuleMap) {
            if (ffBase === cosPrefixF || ffBase.startsWith(cosPrefixF + '_')) {
                matchedPuppetFlag = true;
                var prF = puppetRuleMap[cosPrefixF];
                var foundIdeo = false;
                for (var piF = 0; piF < ideologies.length; piF++) {
                    var pIdF = ideologies[piF];
                    if (ffBase.endsWith('_' + pIdF)) {
                        prF.ideologies[pIdF].img = fUrl;
                        foundIdeo = true;
                        break;
                    }
                }
                if (!foundIdeo) {
                    for (var piF2 = 0; piF2 < ideologies.length; piF2++) {
                        var pIdF2 = ideologies[piF2];
                        if (!prF.ideologies[pIdF2].img) prF.ideologies[pIdF2].img = fUrl;
                    }
                }
                break;
            }
        }

        if (!matchedPuppetFlag) {
            for (var fi2 = 0; fi2 < ideologies.length; fi2++) {
                var idName = ideologies[fi2];
                if (ffBase.endsWith('_' + idName)) {
                    var fTag = ffBase.slice(0, ffBase.length - idName.length - 1).toUpperCase();
                    var coObj = ensureCountry(fTag, 'normal');
                    coObj.ideologies[idName].img = fUrl;
                    break;
                }
            }
        }
    }

    var cKeys = Object.keys(countryMap);
    if (cKeys.length > 0) {
        recovered.countries = cKeys.map(function(k) { return countryMap[k]; });
    } else {
        recovered.countries = [mkEmptyCountry()];
    }

    loadSaved(recovered);
    applyLang(currentLang);
    showToast(i18n[currentLang] ? i18n[currentLang].projectModLoadedSuccess : 'Mod loaded successfully!');
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
        '    # Automatic cosmetic tag application when puppeted (supports normal and cosmetic overlords)',
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

    // Country-specific daily check for immediate response
    for (var i = 0; i < validRules.length; i++) {
        var vr = validRules[i];
        var ovConds = getOverlordCond(vr.overlord);

        lines.push('    on_daily_' + vr.tag + ' = {');
        lines.push('        effect = {');
        lines.push('            if = {');
        lines.push('                limit = {');
        lines.push('                    is_subject = yes');
        lines.push('                    OVERLORD = {');
        lines.push('                        OR = {');
        for (var c = 0; c < ovConds.length; c++) {
            lines.push('                            ' + ovConds[c]);
        }
        lines.push('                        }');
        lines.push('                    }');
        lines.push('                    NOT = { has_cosmetic_tag = ' + vr.cosTag + ' }');
        lines.push('                }');
        lines.push('                set_cosmetic_tag = ' + vr.cosTag);
        lines.push('            }');
        lines.push('            if = {');
        lines.push('                limit = {');
        lines.push('                    has_cosmetic_tag = ' + vr.cosTag);
        lines.push('                    OR = {');
        lines.push('                        is_subject = no');
        lines.push('                        NOT = {');
        lines.push('                            OVERLORD = {');
        lines.push('                                OR = {');
        for (var c = 0; c < ovConds.length; c++) {
            lines.push('                                    ' + ovConds[c]);
        }
        lines.push('                                }');
        lines.push('                            }');
        lines.push('                        }');
        lines.push('                    }');
        lines.push('                }');
        lines.push('                drop_cosmetic_tag = yes');
        lines.push('            }');
        lines.push('        }');
        lines.push('    }');
    }

    // Weekly global fallback
    lines.push('    on_weekly = {');
    lines.push('        effect = {');
    for (var i = 0; i < validRules.length; i++) {
        var vr = validRules[i];
        var ovConds = getOverlordCond(vr.overlord);

        lines.push('            # ' + vr.tag + ' as puppet of ' + vr.overlord);
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
        lines.push('                        NOT = { has_cosmetic_tag = ' + vr.cosTag + ' }');
        lines.push('                    }');
        lines.push('                }');
        lines.push('                ' + vr.tag + ' = { set_cosmetic_tag = ' + vr.cosTag + ' }');
        lines.push('            }');
        lines.push('            if = {');
        lines.push('                limit = {');
        lines.push('                    ' + vr.tag + ' = {');
        lines.push('                        has_cosmetic_tag = ' + vr.cosTag);
        lines.push('                        OR = {');
        lines.push('                            is_subject = no');
        lines.push('                            NOT = {');
        lines.push('                                OVERLORD = {');
        lines.push('                                    OR = {');
        for (var c = 0; c < ovConds.length; c++) {
            lines.push('                                        ' + ovConds[c]);
        }
        lines.push('                                    }');
        lines.push('                                }');
        lines.push('                            }');
        lines.push('                        }');
        lines.push('                    }');
        lines.push('                }');
        lines.push('                ' + vr.tag + ' = { drop_cosmetic_tag = yes }');
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

    // In HoI4, files in localisation/replace must be located DIRECTLY inside localisation/replace without language subdirectories
    var replaceFolder = modFolder.folder('localisation/replace');

    var normalLocRu = ['l_russian:'];
    var normalLocEn = ['l_english:'];
    var cosmeticLocRu = ['l_russian:'];
    var cosmeticLocEn = ['l_english:'];
    var hasNormal = false;
    var hasCosmetic = false;

    // 1. Normal and Cosmetic countries
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

        // Add base fallback keys (TAG, TAG_DEF, TAG_ADJ) so non-ideology lookups also work
        for (var tv3 = 0; tv3 < tagVariants.length; tv3++) {
            var cTag3 = tagVariants[tv3];
            if (firstBase) addLoc(targetRu, targetEn, cTag3, firstBase);
            if (firstDef || firstBase) addLoc(targetRu, targetEn, cTag3 + '_DEF', firstDef || firstBase);
            if (firstAdj) addLoc(targetRu, targetEn, cTag3 + '_ADJ', firstAdj);
        }
    }

    // 2. Puppets (Stored in cosmetic localisation files)
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
                            // Also without ideology (native HoI4 autonomy fallback)
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
                            // Also without ideology (native HoI4 autonomy fallback)
                            addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_autonomy_' + al2, aNm);
                            addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_autonomy_' + al2 + '_DEF', aNm);
                        }
                    }
                }
            }
        }

        // Add base fallback keys for the puppet
        if (puppetDefaultName) {
            for (var ovi = 0; ovi < ovVariants.length; ovi++) {
                var oTag = ovVariants[ovi];
                addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag, puppetDefaultName);
                addLoc(cosmeticLocRu, cosmeticLocEn, pTg + '_' + oTag + '_DEF', puppetDefaultName);
            }
        }

        // Flags for puppets
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

                    // Write base flag fallback so country always has a flag regardless of ideology
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

    // Save localisation files directly into localisation/replace/ with both languages
    if (hasNormal) {
        replaceFolder.file('countries_l_russian.yml', '\uFEFF' + normalLocRu.join('\n') + '\n');
        replaceFolder.file('countries_l_english.yml', '\uFEFF' + normalLocEn.join('\n') + '\n');
    }
    if (hasCosmetic) {
        replaceFolder.file('countries_cosmetic_l_russian.yml', '\uFEFF' + cosmeticLocRu.join('\n') + '\n');
        replaceFolder.file('countries_cosmetic_l_english.yml', '\uFEFF' + cosmeticLocEn.join('\n') + '\n');
    }

    // Generate on_actions for puppets
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

    // Embed project.json into both zip root and mod folder so any mod generated here can be reloaded and edited anytime!
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
