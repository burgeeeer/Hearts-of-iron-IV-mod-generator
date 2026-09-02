const ideologies = ['fascism', 'democratic', 'communism', 'neutrality'];
let currentLang = 'english';

const i18n = {
    english: {
        title: "HoI4 Mod Generator",
        settings: "Basic Settings",
        modName: "Mod Name (English):",
        tag: "Tag (Normal or Cosmetic, e.g. GER or BAL_UNIFIED):",
        tagType: "Tag Type:",
        tagNormal: "Normal Tag",
        tagCosmetic: "Cosmetic Tag",
        fascism: "Fascism",
        democratic: "Democratic",
        communism: "Communism",
        neutrality: "Non-Aligned",
        baseName: "Base Name (UI):",
        defName: "Definite Name (Events, Capitulation):",
        adjName: "Adjective:",
        uploadFlag: "Upload Flag (PNG):",
        genBtn: "Generate Mod",
        puppetTitle: "Puppet Names",
        puppetDesc: "Add one or more puppet naming rules. Each rule can define names for all 4 ideologies.",
        puppetOverlord: "Overlord tag:",
        puppetTag: "Puppet tag:",
        puppetNameFascism: "Puppet name (Fascism):",
        puppetNameDemocratic: "Puppet name (Democratic):",
        puppetNameCommunism: "Puppet name (Communism):",
        puppetNameNeutrality: "Puppet name (Non-Aligned):",
        addPuppet: "Add puppet",
        remove: "Remove",
        stateTitle: "State Names by Controller",
        stateDesc: "Rename a state when it is controlled by a specific country. Example: State 39 + GER → Krakau.",
        stateId: "State ID:",
        controllerTag: "Controller tag:",
        stateName: "New state name:",
        addStateRule: "Add state name",
        defaultStateName: "Default / original name is restored when another country takes control.",
        invalidStateRule: "Please fill in State ID, Controller tag and New state name before adding another rule.",
        cityTitle: "City Names by Controller",
        cityDesc: "Rename a city / victory point when a specific country controls its province. Example: Province 1234 + GER → Krakau.",
        cityStateId: "State ID containing the city:",
        provinceId: "Province ID:",
        cityName: "New city name:",
        addCityRule: "Add city name",
        invalidCityRule: "Please fill in Province ID, Controller tag and New city name before adding another rule."
    },
    russian: {
        title: "Генератор стран HoI4",
        settings: "Базовые настройки",
        modName: "Название мода (на англ):",
        tag: "Тег (Обычный или Cosmetic, напр. GER или BAL_UNIFIED):",
        tagType: "Тип тега:",
        tagNormal: "Обычный тэг",
        tagCosmetic: "Косметический тэг",
        fascism: "Фашизм",
        democratic: "Демократия",
        communism: "Коммунизм",
        neutrality: "Нейтралитет",
        baseName: "Основное название:",
        defName: "Официальное (Для ивентов/капитуляции):",
        adjName: "Прилагательное:",
        uploadFlag: "Загрузить флаг (PNG):",
        genBtn: "Сгенерировать мод",
        puppetTitle: "Названия марионеток",
        puppetDesc: "Добавляй сколько угодно правил для разных марионеток. Для каждого правила можно задать названия для всех 4 идеологий.",
        puppetOverlord: "Тег сюзерена:",
        puppetTag: "Тег марионетки:",
        puppetNameFascism: "Название марионетки (Фашизм):",
        puppetNameDemocratic: "Название марионетки (Демократия):",
        puppetNameCommunism: "Название марионетки (Коммунизм):",
        puppetNameNeutrality: "Название марионетки (Нейтралитет):",
        addPuppet: "Добавить марионетку",
        remove: "Удалить",
        stateTitle: "Названия регионов по контролирующей стране",
        stateDesc: "Переименовывай регион, когда им управляет конкретная страна. Например: регион 39 + GER → Krakau.",
        stateId: "ID региона:",
        controllerTag: "Тег контролирующей страны:",
        stateName: "Новое название региона:",
        addStateRule: "Добавить название региона",
        defaultStateName: "Когда регион переходит под контроль другой страны, его исходное название будет восстановлено.",
        invalidStateRule: "Заполни ID региона, тег контролирующей страны и новое название перед добавлением нового правила.",
        cityTitle: "Названия городов по контролирующей стране",
        cityDesc: "Переименовывай город / победную точку, когда его провинцией управляет конкретная страна. Например: провинция 1234 + GER → Кракау.",
        cityStateId: "ID региона, в котором находится город:",
        provinceId: "ID провинции:",
        cityName: "Новое название города:",
        addCityRule: "Добавить название города",
        invalidCityRule: "Заполни ID провинции, тег контролирующей страны и новое название перед добавлением нового правила."
    }
};

let puppetRules = [];
let stateNameRules = [];
let cityNameRules = [];

window.onload = () => {
    const savedData = JSON.parse(localStorage.getItem('hoi4modData'));
    let langToSet = 'english';

    if (savedData && savedData.lang) {
        langToSet = savedData.lang;
    } else {
        const urlLang = new URLSearchParams(window.location.search).get('lang');
        if (urlLang === 'ru' || urlLang === 'en') {
            langToSet = urlLang === 'ru' ? 'russian' : 'english';
        } else {
            const browserLang = navigator.language || navigator.userLanguage;
            langToSet = browserLang.toLowerCase().startsWith('ru') ? 'russian' : 'english';
        }
    }

    document.getElementById('app-content').style.display = 'block';
    setLanguage(langToSet);

    if (savedData) {
        restoreData(savedData);
    } else {
        puppetRules = [createEmptyPuppetRule()];
        stateNameRules = [createEmptyStateRule()];
        cityNameRules = [createEmptyCityRule()];
        renderPuppetRules();
        renderStateNameRules();
        renderCityNameRules();
        saveData();
    }
};

function createEmptyPuppetRule() {
    return {
        overlord: '',
        tag: '',
        fascism: '',
        democratic: '',
        communism: '',
        neutrality: ''
    };
}

function createEmptyStateRule() {
    return {
        stateId: '',
        controllerTag: '',
        name: ''
    };
}

function createEmptyCityRule() {
    return {
        stateId: '',
        provinceId: '',
        controllerTag: '',
        name: ''
    };
}

function toggleLanguage() {
    saveData();

    const newLang = currentLang === 'english' ? 'russian' : 'english';
    setLanguage(newLang);

    const savedData = JSON.parse(localStorage.getItem('hoi4modData'));
    if (savedData) {
        restoreData(savedData);
    }
}

function setLanguage(lang) {
    currentLang = lang;

    const toggleBtn = document.getElementById('langToggleBtn');
    if (toggleBtn) {
        toggleBtn.innerText = lang === 'english' ? 'RU' : 'EN';
    }

    document.getElementById('app-content').style.display = 'block';

    document.getElementById('titleText').innerText = i18n[lang].title;
    document.getElementById('settingsText').innerText = i18n[lang].settings;
    document.getElementById('modNameLabel').innerText = i18n[lang].modName;
    document.getElementById('tagLabel').innerText = i18n[lang].tag;
    document.getElementById('tagTypeLabel').innerText = i18n[lang].tagType;

    const tagTypeSel = document.getElementById('tagType');
    if (tagTypeSel) {
        tagTypeSel.querySelector('option[value="normal"]').innerText = i18n[lang].tagNormal;
        tagTypeSel.querySelector('option[value="cosmetic"]').innerText = i18n[lang].tagCosmetic;
    }

    document.getElementById('generateBtn').innerText = i18n[lang].genBtn;
    document.getElementById('puppetTitle').innerText = i18n[lang].puppetTitle;
    document.getElementById('puppetDesc').innerText = i18n[lang].puppetDesc;
    document.getElementById('puppetAddBtn').innerText = `＋ ${i18n[lang].addPuppet}`;

    document.getElementById('stateTitle').innerText = i18n[lang].stateTitle;
    document.getElementById('stateDesc').innerText = i18n[lang].stateDesc;
    document.getElementById('stateAddBtn').innerText = `＋ ${i18n[lang].addStateRule}`;
    document.getElementById('stateDefaultNote').innerText = i18n[lang].defaultStateName;

    document.getElementById('cityTitle').innerText = i18n[lang].cityTitle;
    document.getElementById('cityDesc').innerText = i18n[lang].cityDesc;
    document.getElementById('cityAddBtn').innerText = `＋ ${i18n[lang].addCityRule}`;

    buildIdeologyForms(lang);
    renderPuppetRules();
    renderStateNameRules();
    renderCityNameRules();
    saveData();
}

function buildIdeologyForms(lang) {
    const container = document.getElementById('ideologies-container');
    container.innerHTML = '';

    ideologies.forEach(ideo => {
        const section = document.createElement('div');
        section.className = 'section ideology-block';

        section.innerHTML = `
            <div>
                <h2>${i18n[lang][ideo]}</h2>
                <div class="input-group">
                    <label>${i18n[lang].baseName}</label>
                    <input type="text" id="${ideo}_base" oninput="saveData()">
                </div>
                <div class="input-group">
                    <label>${i18n[lang].defName}</label>
                    <input type="text" id="${ideo}_def" oninput="saveData()">
                </div>
                <div class="input-group">
                    <label>${i18n[lang].adjName}</label>
                    <input type="text" id="${ideo}_adj" oninput="saveData()">
                </div>
            </div>
            <div class="flag-preview-container">
                <label>${i18n[lang].uploadFlag}</label>
                <input type="file" accept="image/png" id="${ideo}_file" onchange="handleImageUpload(event, '${ideo}')" style="margin-bottom: 10px;">
                <div class="canvas-wrapper">
                    <div class="canvas-item">
                        <span>Normal (82x52)</span>
                        <canvas id="${ideo}_canvas_normal" width="82" height="52"></canvas>
                    </div>
                    <div class="canvas-item">
                        <span>Medium (41x26)</span>
                        <canvas id="${ideo}_canvas_medium" width="41" height="26"></canvas>
                    </div>
                    <div class="canvas-item">
                        <span>Small (10x7)</span>
                        <canvas id="${ideo}_canvas_small" width="10" height="7"></canvas>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(section);
    });
}

function handleImageUpload(event, ideology) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const types = [
                { id: 'normal', w: 82, h: 52 },
                { id: 'medium', w: 41, h: 26 },
                { id: 'small', w: 10, h: 7 }
            ];

            types.forEach(type => {
                const canvas = document.getElementById(`${ideology}_canvas_${type.id}`);
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, type.w, type.h);
                ctx.drawImage(img, 0, 0, type.w, type.h);
            });

            document.getElementById(`${ideology}_canvas_normal`).setAttribute('data-img', e.target.result);
            saveData();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function renderPuppetRules() {
    const container = document.getElementById('puppet-rules-container');
    if (!container) return;

    container.innerHTML = '';

    puppetRules.forEach((rule, index) => {
        const card = document.createElement('div');
        card.className = 'dynamic-card';

        card.innerHTML = `
            <div class="dynamic-card-header">
                <strong>${currentLang === 'english' ? `Puppet rule #${index + 1}` : `Правило марионетки №${index + 1}`}</strong>
                ${puppetRules.length > 1 ? `<button type="button" class="secondary-btn danger-btn" onclick="removePuppetRule(${index})">${i18n[currentLang].remove}</button>` : ''}
            </div>
            <div class="dynamic-grid two-col">
                <div class="input-group">
                    <label>${i18n[currentLang].puppetOverlord}</label>
                    <input type="text" maxlength="32" value="${escapeHtml(rule.overlord)}"
                        placeholder="${currentLang === 'english' ? 'e.g. GER' : 'например GER'}"
                        oninput="updatePuppetRule(${index}, 'overlord', this.value)">
                </div>
                <div class="input-group">
                    <label>${i18n[currentLang].puppetTag}</label>
                    <input type="text" maxlength="32" value="${escapeHtml(rule.tag)}"
                        placeholder="${currentLang === 'english' ? 'e.g. POL' : 'например POL'}"
                        oninput="updatePuppetRule(${index}, 'tag', this.value)">
                </div>
            </div>
            <div class="input-group">
                <label>${i18n[currentLang].puppetNameFascism}</label>
                <input type="text" value="${escapeHtml(rule.fascism)}"
                    placeholder="${currentLang === 'english' ? 'e.g. Reichskommissariat Poland' : 'например Рейхскомиссариат Польша'}"
                    oninput="updatePuppetRule(${index}, 'fascism', this.value)">
            </div>
            <div class="input-group">
                <label>${i18n[currentLang].puppetNameDemocratic}</label>
                <input type="text" value="${escapeHtml(rule.democratic)}"
                    placeholder="${currentLang === 'english' ? 'Democratic puppet name' : 'Название демократической марионетки'}"
                    oninput="updatePuppetRule(${index}, 'democratic', this.value)">
            </div>
            <div class="input-group">
                <label>${i18n[currentLang].puppetNameCommunism}</label>
                <input type="text" value="${escapeHtml(rule.communism)}"
                    placeholder="${currentLang === 'english' ? 'Communist puppet name' : 'Название коммунистической марионетки'}"
                    oninput="updatePuppetRule(${index}, 'communism', this.value)">
            </div>
            <div class="input-group">
                <label>${i18n[currentLang].puppetNameNeutrality}</label>
                <input type="text" value="${escapeHtml(rule.neutrality)}"
                    placeholder="${currentLang === 'english' ? 'Non-Aligned puppet name' : 'Название нейтральной марионетки'}"
                    oninput="updatePuppetRule(${index}, 'neutrality', this.value)">
            </div>
        `;

        container.appendChild(card);
    });
}

function addPuppetRule() {
    puppetRules.push(createEmptyPuppetRule());
    renderPuppetRules();
    saveData();
}

function removePuppetRule(index) {
    if (puppetRules.length === 1) return;
    puppetRules.splice(index, 1);
    renderPuppetRules();
    saveData();
}

function updatePuppetRule(index, field, value) {
    puppetRules[index][field] = value;
    saveData();
}

function renderStateNameRules() {
    const container = document.getElementById('state-name-rules-container');
    if (!container) return;

    container.innerHTML = '';

    stateNameRules.forEach((rule, index) => {
        const card = document.createElement('div');
        card.className = 'dynamic-card';

        card.innerHTML = `
            <div class="dynamic-card-header">
                <strong>${currentLang === 'english' ? `State rule #${index + 1}` : `Правило региона №${index + 1}`}</strong>
                ${stateNameRules.length > 1 ? `<button type="button" class="secondary-btn danger-btn" onclick="removeStateNameRule(${index})">${i18n[currentLang].remove}</button>` : ''}
            </div>
            <div class="dynamic-grid three-col">
                <div class="input-group">
                    <label>${i18n[currentLang].stateId}</label>
                    <input type="number" min="1" step="1" value="${escapeHtml(rule.stateId)}"
                        placeholder="39"
                        oninput="updateStateNameRule(${index}, 'stateId', this.value)">
                </div>
                <div class="input-group">
                    <label>${i18n[currentLang].controllerTag}</label>
                    <input type="text" maxlength="32" value="${escapeHtml(rule.controllerTag)}"
                        placeholder="${currentLang === 'english' ? 'GER' : 'GER'}"
                        oninput="updateStateNameRule(${index}, 'controllerTag', this.value)">
                </div>
                <div class="input-group">
                    <label>${i18n[currentLang].stateName}</label>
                    <input type="text" value="${escapeHtml(rule.name)}"
                        placeholder="${currentLang === 'english' ? 'Krakau' : 'Кракау'}"
                        oninput="updateStateNameRule(${index}, 'name', this.value)">
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function addStateNameRule() {
    const last = stateNameRules[stateNameRules.length - 1];
    if (last && (!String(last.stateId).trim() || !String(last.controllerTag).trim() || !String(last.name).trim())) {
        alert(i18n[currentLang].invalidStateRule);
        return;
    }

    stateNameRules.push(createEmptyStateRule());
    renderStateNameRules();
    saveData();
}

function removeStateNameRule(index) {
    if (stateNameRules.length === 1) return;
    stateNameRules.splice(index, 1);
    renderStateNameRules();
    saveData();
}

function updateStateNameRule(index, field, value) {
    stateNameRules[index][field] = value;
    saveData();
}

function renderCityNameRules() {
    const container = document.getElementById('city-name-rules-container');
    if (!container) return;

    container.innerHTML = '';

    cityNameRules.forEach((rule, index) => {
        const card = document.createElement('div');
        card.className = 'dynamic-card';

        card.innerHTML = `
            <div class="dynamic-card-header">
                <strong>${currentLang === 'english' ? `City rule #${index + 1}` : `Правило города №${index + 1}`}</strong>
                ${cityNameRules.length > 1 ? `<button type="button" class="secondary-btn danger-btn" onclick="removeCityNameRule(${index})">${i18n[currentLang].remove}</button>` : ''}
            </div>
            <div class="dynamic-grid three-col">
                <div class="input-group">
                    <label>${i18n[currentLang].cityStateId}</label>
                    <input type="number" min="1" step="1" value="${escapeHtml(rule.stateId)}"
                        placeholder="86"
                        oninput="updateCityNameRule(${index}, 'stateId', this.value)">
                </div>
                <div class="input-group">
                    <label>${i18n[currentLang].provinceId}</label>
                    <input type="number" min="1" step="1" value="${escapeHtml(rule.provinceId)}"
                        placeholder="6558"
                        oninput="updateCityNameRule(${index}, 'provinceId', this.value)">
                </div>
                <div class="input-group">
                    <label>${i18n[currentLang].controllerTag}</label>
                    <input type="text" maxlength="32" value="${escapeHtml(rule.controllerTag)}"
                        placeholder="GER"
                        oninput="updateCityNameRule(${index}, 'controllerTag', this.value)">
                </div>
                <div class="input-group">
                    <label>${i18n[currentLang].cityName}</label>
                    <input type="text" value="${escapeHtml(rule.name)}"
                        placeholder="${currentLang === 'english' ? 'Krakau' : 'Кракау'}"
                        oninput="updateCityNameRule(${index}, 'name', this.value)">
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function addCityNameRule() {
    const last = cityNameRules[cityNameRules.length - 1];
    if (last && (!String(last.stateId).trim() || !String(last.provinceId).trim() || !String(last.controllerTag).trim() || !String(last.name).trim())) {
        alert(i18n[currentLang].invalidCityRule);
        return;
    }

    cityNameRules.push(createEmptyCityRule());
    renderCityNameRules();
    saveData();
}

function removeCityNameRule(index) {
    if (cityNameRules.length === 1) return;
    cityNameRules.splice(index, 1);
    renderCityNameRules();
    saveData();
}

function updateCityNameRule(index, field, value) {
    cityNameRules[index][field] = value;
    saveData();
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function saveData() {
    const data = {
        lang: currentLang,
        modName: document.getElementById('modName')?.value || '',
        tag: (document.getElementById('countryTag')?.value || '').toUpperCase(),
        tagType: document.getElementById('tagType') ? document.getElementById('tagType').value : 'normal',
        puppetRules: puppetRules.map(rule => ({
            overlord: String(rule.overlord || '').toUpperCase(),
            tag: String(rule.tag || '').toUpperCase(),
            fascism: rule.fascism || '',
            democratic: rule.democratic || '',
            communism: rule.communism || '',
            neutrality: rule.neutrality || ''
        })),
        stateNameRules: stateNameRules.map(rule => ({
            stateId: String(rule.stateId || '').trim(),
            controllerTag: String(rule.controllerTag || '').toUpperCase().trim(),
            name: rule.name || ''
        })),
        cityNameRules: cityNameRules.map(rule => ({
            stateId: String(rule.stateId || '').trim(),
            provinceId: String(rule.provinceId || '').trim(),
            controllerTag: String(rule.controllerTag || '').toUpperCase().trim(),
            name: rule.name || ''
        })),
        ideologies: {}
    };

    ideologies.forEach(ideo => {
        const base = document.getElementById(`${ideo}_base`);
        if (!base) return;

        const canvasNormal = document.getElementById(`${ideo}_canvas_normal`);
        data.ideologies[ideo] = {
            base: base.value,
            def: document.getElementById(`${ideo}_def`).value,
            adj: document.getElementById(`${ideo}_adj`).value,
            img: canvasNormal ? canvasNormal.getAttribute('data-img') : null
        };
    });

    localStorage.setItem('hoi4modData', JSON.stringify(data));
}

function restoreData(data) {
    document.getElementById('modName').value = data.modName || '';
    document.getElementById('countryTag').value = data.tag || '';

    if (document.getElementById('tagType')) {
        document.getElementById('tagType').value = data.tagType || 'normal';
    }

    // New format
    if (Array.isArray(data.puppetRules)) {
        puppetRules = data.puppetRules.length ? data.puppetRules : [createEmptyPuppetRule()];
    } else if (data.puppet) {
        // Migrate old single puppet rule to the new format.
        puppetRules = [{
            overlord: data.puppet.overlord || '',
            tag: data.puppet.tag || '',
            fascism: data.puppet.fascism || '',
            democratic: data.puppet.democratic || '',
            communism: data.puppet.communism || '',
            neutrality: data.puppet.neutrality || ''
        }];
    } else {
        puppetRules = [createEmptyPuppetRule()];
    }

    if (Array.isArray(data.stateNameRules)) {
        stateNameRules = data.stateNameRules.length ? data.stateNameRules : [createEmptyStateRule()];
    } else {
        stateNameRules = [createEmptyStateRule()];
    }

    if (Array.isArray(data.cityNameRules)) {
        cityNameRules = data.cityNameRules.length ? data.cityNameRules.map(rule => ({
            stateId: rule.stateId || '',
            provinceId: rule.provinceId || '',
            controllerTag: rule.controllerTag || '',
            name: rule.name || ''
        })) : [createEmptyCityRule()];
    } else {
        cityNameRules = [createEmptyCityRule()];
    }

    renderPuppetRules();
    renderStateNameRules();
    renderCityNameRules();

    ideologies.forEach(ideo => {
        if (!data.ideologies || !data.ideologies[ideo]) return;

        document.getElementById(`${ideo}_base`).value = data.ideologies[ideo].base || '';
        document.getElementById(`${ideo}_def`).value = data.ideologies[ideo].def || '';
        document.getElementById(`${ideo}_adj`).value = data.ideologies[ideo].adj || '';

        const imgSrc = data.ideologies[ideo].img;
        if (imgSrc) {
            const img = new Image();
            img.onload = () => {
                const types = [
                    { id: 'normal', w: 82, h: 52 },
                    { id: 'medium', w: 41, h: 26 },
                    { id: 'small', w: 10, h: 7 }
                ];

                types.forEach(type => {
                    const canvas = document.getElementById(`${ideo}_canvas_${type.id}`);
                    if (!canvas) return;
                    if (type.id === 'normal') canvas.setAttribute('data-img', imgSrc);
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, type.w, type.h);
                    ctx.drawImage(img, 0, 0, type.w, type.h);
                });
            };
            img.src = imgSrc;
        }
    });
}

// Физический переворот пикселей для корректного отображения в игре
function canvasToTGA(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height).data;

    const buffer = new ArrayBuffer(18 + imgData.length);
    const view = new DataView(buffer);
    const uint8 = new Uint8Array(buffer);

    view.setUint8(2, 2);
    view.setUint16(12, width, true);
    view.setUint16(14, height, true);
    view.setUint8(16, 32);
    view.setUint8(17, 0x00);

    let offset = 18;

    for (let y = height - 1; y >= 0; y--) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            uint8[offset++] = imgData[i + 2];
            uint8[offset++] = imgData[i + 1];
            uint8[offset++] = imgData[i];
            uint8[offset++] = imgData[i + 3];
        }
    }

    return buffer;
}

function addYamlLocalizationLine(lines, key, value) {
    const safeValue = String(value).replace(/"/g, '\\"');
    lines.push(` ${key}:0 "${safeValue}"`);
}

function generateStateAndCityRenameOnActions(stateRules, cityRules) {
    const stateGrouped = {};
    const cityGrouped = {};

    stateRules.forEach((rule, index) => {
        const stateId = String(rule.stateId).trim();
        const controllerTag = String(rule.controllerTag).toUpperCase().trim();
        const name = String(rule.name).trim();

        if (!/^\d+$/.test(stateId) || !controllerTag || !name) return;

        if (!stateGrouped[stateId]) stateGrouped[stateId] = [];
        stateGrouped[stateId].push({
            controllerTag,
            locKey: `${controllerTag}_STATE_${stateId}`
        });
    });

    cityRules.forEach((rule, index) => {
        const stateId = String(rule.stateId).trim();
        const provinceId = String(rule.provinceId).trim();
        const controllerTag = String(rule.controllerTag).toUpperCase().trim();
        const name = String(rule.name).trim();

        if (!/^\d+$/.test(stateId) || !/^\d+$/.test(provinceId) || !controllerTag || !name) return;

        if (!cityGrouped[stateId]) cityGrouped[stateId] = [];
        cityGrouped[stateId].push({
            provinceId,
            controllerTag,
            locKey: `${controllerTag}_VICTORY_POINTS_${provinceId}`
        });
    });

    if (!Object.keys(stateGrouped).length && !Object.keys(cityGrouped).length) return '';

    const lines = [
        'on_actions = {',
        '    on_state_control_changed = {',
        '        effect = {'
    ];

    Object.keys(stateGrouped).forEach(stateId => {
        lines.push(`            # State ${stateId}`);
        lines.push('            if = {');
        lines.push(`                limit = { FROM.FROM = { state = ${stateId} } }`);
        lines.push(`                FROM.FROM = { reset_state_name = yes }`);

        stateGrouped[stateId].forEach(rule => {
            lines.push('                if = {');
            lines.push(`                    limit = { tag = ${rule.controllerTag} }`);
            lines.push(`                    FROM.FROM = { set_state_name = ${rule.locKey} }`);
            lines.push('                }');
        });

        lines.push('            }');
    });

    Object.keys(cityGrouped).forEach(stateId => {
        lines.push(`            # Cities in state ${stateId}`);
        lines.push('            if = {');
        lines.push(`                limit = { FROM.FROM = { state = ${stateId} } }`);

        cityGrouped[stateId].forEach(rule => {
            lines.push(`                FROM.FROM = { reset_province_name = ${rule.provinceId} }`);
        });

        cityGrouped[stateId].forEach(rule => {
            lines.push('                if = {');
            lines.push(`                    limit = { tag = ${rule.controllerTag} }`);
            lines.push(`                    FROM.FROM = { set_province_name = { id = ${rule.provinceId} name = ${rule.locKey} } }`);
            lines.push('                }');
        });

        lines.push('            }');
    });

    lines.push('        }');
    lines.push('    }');
    lines.push('}');

    return lines.join('\\n');
}

async function generateMod() {
    const zip = new JSZip();
    const modName = document.getElementById('modName').value.trim() || 'CustomMod';
    const tag = document.getElementById('countryTag').value.toUpperCase().trim() || 'TAG';

    const modFolder = zip.folder(modName);
    const flagsNormal = modFolder.folder("gfx/flags");
    const flagsMedium = modFolder.folder("gfx/flags/medium");
    const flagsSmall = modFolder.folder("gfx/flags/small");

    const countryLocFolder = modFolder.folder(`localisation/replace/${currentLang}`);
    const russianReplaceFolder = modFolder.folder('localisation/replace/russian');

    let countryLocLines = [`l_${currentLang}:`];

    ideologies.forEach(ideo => {
        const base = document.getElementById(`${ideo}_base`).value;
        const def = document.getElementById(`${ideo}_def`).value;
        const adj = document.getElementById(`${ideo}_adj`).value;

        if (base) addYamlLocalizationLine(countryLocLines, `${tag}_${ideo}`, base);
        if (def) addYamlLocalizationLine(countryLocLines, `${tag}_${ideo}_DEF`, def);
        if (adj) addYamlLocalizationLine(countryLocLines, `${tag}_${ideo}_ADJ`, adj);

        const canvasNormal = document.getElementById(`${ideo}_canvas_normal`);
        if (canvasNormal && canvasNormal.getAttribute('data-img')) {
            const fileName = `${tag}_${ideo}.tga`;
            flagsNormal.file(fileName, canvasToTGA(document.getElementById(`${ideo}_canvas_normal`)));
            flagsMedium.file(fileName, canvasToTGA(document.getElementById(`${ideo}_canvas_medium`)));
            flagsSmall.file(fileName, canvasToTGA(document.getElementById(`${ideo}_canvas_small`)));
        }
    });

    // Puppet localisation. Supports any number of puppet rules.
    puppetRules.forEach(rule => {
        const pupOverlord = String(rule.overlord || '').toUpperCase().trim();
        const pupTag = String(rule.tag || '').toUpperCase().trim();
        if (!pupOverlord || !pupTag) return;

        ideologies.forEach(ideo => {
            const pupName = String(rule[ideo] || '').trim();
            if (!pupName) return;

            addYamlLocalizationLine(
                countryLocLines,
                `${pupTag}_${pupOverlord}_${ideo}_subject`,
                pupName
            );
            addYamlLocalizationLine(
                countryLocLines,
                `${pupTag}_${pupOverlord}_${ideo}_subject_DEF`,
                pupName
            );
        });
    });

    const countryLocBlob = new Blob(["\uFEFF" + countryLocLines.join('\n') + '\n'], {
        type: "text/plain;charset=utf-8"
    });

    const tagType = document.getElementById('tagType') ? document.getElementById('tagType').value : 'normal';
    const countryLocFileName = tagType === 'cosmetic'
        ? `countries_cosmetic_l_${currentLang}.yml`
        : `countries_l_${currentLang}.yml`;

    countryLocFolder.file(countryLocFileName, countryLocBlob);

    // State + city rename localisation and controller-change logic.
    const validStateRules = stateNameRules.filter(rule =>
        /^\d+$/.test(String(rule.stateId).trim()) &&
        String(rule.controllerTag).trim() &&
        String(rule.name).trim()
    );

    const validCityRules = cityNameRules.filter(rule =>
        /^\d+$/.test(String(rule.stateId).trim()) &&
        /^\d+$/.test(String(rule.provinceId).trim()) &&
        String(rule.controllerTag).trim() &&
        String(rule.name).trim()
    );

    if (validStateRules.length || validCityRules.length) {
        const stateLocLines = ['l_russian:'];
        const victoryPointLocLines = ['l_russian:'];

        stateNameRules.forEach(rule => {
            const stateId = String(rule.stateId).trim();
            const controllerTag = String(rule.controllerTag).toUpperCase().trim();
            const name = String(rule.name).trim();
            if (!/^\d+$/.test(stateId) || !controllerTag || !name) return;
            addYamlLocalizationLine(stateLocLines, `${controllerTag}_STATE_${stateId}`, name);
        });

        cityNameRules.forEach(rule => {
            const provinceId = String(rule.provinceId).trim();
            const controllerTag = String(rule.controllerTag).toUpperCase().trim();
            const name = String(rule.name).trim();
            if (!/^\d+$/.test(String(rule.stateId).trim()) || !/^\d+$/.test(provinceId) || !controllerTag || !name) return;
            addYamlLocalizationLine(victoryPointLocLines, `${controllerTag}_VICTORY_POINTS_${provinceId}`, name);
        });

        russianReplaceFolder.file(
            'states_names_l_russian.yml',
            new Blob(["\uFEFF" + stateLocLines.join('\n') + '\n'], {
                type: "text/plain;charset=utf-8"
            })
        );

        russianReplaceFolder.file(
            'victory_points_l_russian.yml',
            new Blob(["\uFEFF" + victoryPointLocLines.join('\n') + '\n'], {
                type: "text/plain;charset=utf-8"
            })
        );

        const onActionsContent = generateStateAndCityRenameOnActions(stateNameRules, cityNameRules);
        if (onActionsContent) {
            modFolder.folder("common/on_actions").file(
                "custom_state_names.txt",
                onActionsContent + '\n'
            );
        }
    }

    const modFileContent =
        `version="1.0"\n` +
        `tags={\n` +
        `\t"Alternative History"\n` +
        `\t"Graphics"\n` +
        `}\n` +
        `name="${modName}"\n` +
        `supported_version="*"\n` +
        `path="mod/${modName}"`;

    zip.file(`${modName}.mod`, modFileContent);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${modName}.zip`);
}
