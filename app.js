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
        puppetTitle: "Puppet Names (ALL 4 IDEOLOGIES)",
        puppetDesc: "Example: Overlord EST, Puppet POL."
    },
    russian: {
        title: "HoI4 Mod Generator",
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
        puppetTitle: "Название марионеток (ВСЕ 4 ИДЕОЛОГИИ)",
        puppetDesc: "Например: Сюзерен EST, Марионетка POL."
    }
};

window.onload = () => {
    const savedData = JSON.parse(localStorage.getItem('hoi4modData'));
    let langToSet = 'english';
    
    // Проверяем, есть ли сохраненный язык
    if (savedData && savedData.lang) {
        langToSet = savedData.lang;
    } else {
        // Сначала проверяем параметр URL (?lang=en / ?lang=ru) для sitemap/SEO
        const urlLang = new URLSearchParams(window.location.search).get('lang');
        if (urlLang === 'ru' || urlLang === 'en') {
            langToSet = urlLang === 'ru' ? 'russian' : 'english';
        } else {
            // Если нет, автоматически определяем язык браузера пользователя
            const browserLang = navigator.language || navigator.userLanguage;
            // Если язык начинается на "ru", ставим русский, иначе английский
            langToSet = browserLang.toLowerCase().startsWith('ru') ? 'russian' : 'english';
        }
    }

    document.getElementById('app-content').style.display = 'block';
    setLanguage(langToSet);
    
    if (savedData) {
        restoreData(savedData);
    }
};

function toggleLanguage() {
    // Сохраняем текущие данные перед перерисовкой форм, чтобы они не стерлись
    saveData(); 
    
    const newLang = currentLang === 'english' ? 'russian' : 'english';
    setLanguage(newLang);
    
    // Восстанавливаем данные обратно в новые формы
    const savedData = JSON.parse(localStorage.getItem('hoi4modData'));
    if (savedData) {
        restoreData(savedData);
    }
}

function setLanguage(lang) {
    currentLang = lang;
    
    // Обновляем текст на кнопке переключения
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

    buildIdeologyForms(lang);
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

function saveData() {
    const data = {
        lang: currentLang,
        modName: document.getElementById('modName').value,
        tag: document.getElementById('countryTag').value.toUpperCase(),
        tagType: document.getElementById('tagType') ? document.getElementById('tagType').value : 'normal',
        puppet: {
            overlord: document.getElementById('puppetOverlord').value.toUpperCase(),
            tag: document.getElementById('puppetTag').value.toUpperCase(),
            fascism: document.getElementById('puppetName_fascism') ? document.getElementById('puppetName_fascism').value : '',
            democratic: document.getElementById('puppetName_democratic') ? document.getElementById('puppetName_democratic').value : '',
            communism: document.getElementById('puppetName_communism') ? document.getElementById('puppetName_communism').value : '',
            neutrality: document.getElementById('puppetName_neutrality') ? document.getElementById('puppetName_neutrality').value : ''
        },
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
    
    if (data.puppet) {
        document.getElementById('puppetOverlord').value = data.puppet.overlord || '';
        document.getElementById('puppetTag').value = data.puppet.tag || '';
        if(document.getElementById('puppetName_fascism')) document.getElementById('puppetName_fascism').value = data.puppet.fascism || '';
        if(document.getElementById('puppetName_democratic')) document.getElementById('puppetName_democratic').value = data.puppet.democratic || '';
        if(document.getElementById('puppetName_communism')) document.getElementById('puppetName_communism').value = data.puppet.communism || '';
        if(document.getElementById('puppetName_neutrality')) document.getElementById('puppetName_neutrality').value = data.puppet.neutrality || '';
    }

    ideologies.forEach(ideo => {
        if(data.ideologies[ideo]) {
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
                        if (type.id === 'normal') canvas.setAttribute('data-img', imgSrc);
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, type.w, type.h);
                    });
                };
                img.src = imgSrc;
            }
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

    // Заголовок TGA
    view.setUint8(2, 2); // Uncompressed true-color
    view.setUint16(12, width, true); 
    view.setUint16(14, height, true); 
    view.setUint8(16, 32); 
    view.setUint8(17, 0x00); // 0x00 - Origin at bottom-left (стандарт движка)

    let offset = 18;
    
    // Записываем пиксели построчно снизу вверх
    for (let y = height - 1; y >= 0; y--) {
        for (let x = 0; x < width; x++) {
            let i = (y * width + x) * 4;
            uint8[offset++] = imgData[i + 2]; // B
            uint8[offset++] = imgData[i + 1]; // G
            uint8[offset++] = imgData[i];     // R
            uint8[offset++] = imgData[i + 3]; // A
        }
    }
    
    return buffer;
}

async function generateMod() {
    const zip = new JSZip();
    const modName = document.getElementById('modName').value.trim() || 'CustomMod';
    const tag = document.getElementById('countryTag').value.toUpperCase().trim() || 'TAG';
    
    const modFolder = zip.folder(modName);
    const flagsNormal = modFolder.folder("gfx/flags");
    const flagsMedium = modFolder.folder("gfx/flags/medium");
    const flagsSmall = modFolder.folder("gfx/flags/small");
    const locFolder = modFolder.folder(`localisation/replace/${currentLang}`);

    let locContent = `l_${currentLang}:\n`;

    ideologies.forEach(ideo => {
        const base = document.getElementById(`${ideo}_base`).value;
        const def = document.getElementById(`${ideo}_def`).value;
        const adj = document.getElementById(`${ideo}_adj`).value;
        
        if (base) locContent += ` ${tag}_${ideo}:0 "${base}"\n`;
        if (def) locContent += ` ${tag}_${ideo}_DEF:0 "${def}"\n`;
        if (adj) locContent += ` ${tag}_${ideo}_ADJ:0 "${adj}"\n`;

        const canvasNormal = document.getElementById(`${ideo}_canvas_normal`);
        if (canvasNormal && canvasNormal.getAttribute('data-img')) {
            const fileName = `${tag}_${ideo}.tga`;
            flagsNormal.file(fileName, canvasToTGA(document.getElementById(`${ideo}_canvas_normal`)));
            flagsMedium.file(fileName, canvasToTGA(document.getElementById(`${ideo}_canvas_medium`)));
            flagsSmall.file(fileName, canvasToTGA(document.getElementById(`${ideo}_canvas_small`)));
        }
    });

    // Локализация марионеток
    const pupOverlord = document.getElementById('puppetOverlord').value.toUpperCase().trim();
    const pupTag = document.getElementById('puppetTag').value.toUpperCase().trim();
    
    if (pupOverlord && pupTag) {
        ideologies.forEach(ideo => {
            const pupName = document.getElementById(`puppetName_${ideo}`).value.trim();
            if (pupName) {
                // Строки по стандартам локализации Hearts of Iron IV
                locContent += ` ${pupTag}_${pupOverlord}_${ideo}_subject:0 "${pupName}"\n`;
                locContent += ` ${pupTag}_${pupOverlord}_${ideo}_subject_DEF:0 "${pupName}"\n`;
            }
        });
    }

    const locBlob = new Blob(["\uFEFF" + locContent], { type: "text/plain;charset=utf-8" });
    const tagType = document.getElementById('tagType') ? document.getElementById('tagType').value : 'normal';
    const locFileName = tagType === 'cosmetic' ? `countries_cosmetic_l_${currentLang}.yml` : `countries_l_${currentLang}.yml`;
    locFolder.file(locFileName, locBlob);

    const modFileContent = `version="1.0"\ntags={\n\t"Alternative History"\n\t"Graphics"\n}\nname="${modName}"\nsupported_version="*"\npath="mod/${modName}"`;
    zip.file(`${modName}.mod`, modFileContent);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${modName}.zip`);
}

