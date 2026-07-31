const ideologies = ['democratic', 'fascism', 'communism', 'neutrality'];
let currentLang = 'en';

const i18n = {
    en: {
        title: "HoI4 Country Mod Builder",
        modName: "Mod Name:",
        tag: "Country Tag (3 letters):",
        name: "Standard Name:",
        def: "Event/War Name (Definitive):",
        adj: "Adjective:",
        flag: "Upload Flag (PNG):",
        gen: "Generate Mod .ZIP"
    },
    ru: {
        title: "Генератор модов HoI4",
        modName: "Название мода:",
        tag: "Тег страны (3 буквы):",
        name: "Обычное название:",
        def: "Название для ивентов/войны (Definitive):",
        adj: "Прилагательное:",
        flag: "Загрузить флаг (PNG):",
        gen: "Создать ZIP с модом"
    }
};

const placeholders = {
    en: {
        democratic: { name: "Russia", def: "the Russian Federation", adj: "Russian" },
        fascism: { name: "Russian State", def: "the Russian State", adj: "Russian" },
        communism: { name: "Soviet Union", def: "the Soviet Union", adj: "Soviet" },
        neutrality: { name: "Russian Empire", def: "the Russian Empire", adj: "Russian" }
    },
    ru: {
        democratic: { name: "Россия", def: "Российская Федерация", adj: "Российский" },
        fascism: { name: "Русское Государство", def: "Русское Национальное Государство", adj: "Русский" },
        communism: { name: "Советский Союз", def: "СССР", adj: "Советский" },
        neutrality: { name: "Российская Империя", def: "Российская Империя", adj: "Русский" }
    }
};

// Инициализация интерфейса
function initUI() {
    const container = document.getElementById('ideologies-container');
    container.innerHTML = '';
    
    ideologies.forEach(ideo => {
        const ph = placeholders[currentLang][ideo];
        
        const card = document.createElement('div');
        card.className = 'ideology-card';
        card.innerHTML = `
            <h3>${ideo}</h3>
            <label class="lbl-name">${i18n[currentLang].name}</label>
            <input type="text" id="${ideo}_name" placeholder="Например: ${ph.name}" oninput="saveData()">
            
            <label class="lbl-def">${i18n[currentLang].def}</label>
            <input type="text" id="${ideo}_def" placeholder="Например: ${ph.def}" oninput="saveData()">
            
            <label class="lbl-adj">${i18n[currentLang].adj}</label>
            <input type="text" id="${ideo}_adj" placeholder="Например: ${ph.adj}" oninput="saveData()">
            
            <div class="flag-upload">
                <label class="lbl-flag">${i18n[currentLang].flag}</label>
                <input type="file" accept="image/png" id="${ideo}_file" onchange="handleFlagUpload(this, '${ideo}')">
                <img id="${ideo}_preview" class="flag-preview" src="">
            </div>
        `;
        container.appendChild(card);
    });
    
    updateLabels();
    loadData();
}

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('lang-modal').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    localStorage.setItem('hoi4_mod_lang', lang);
    initUI();
}

function updateLabels() {
    document.getElementById('title-text').innerText = i18n[currentLang].title;
    document.getElementById('mod-name-label').innerText = i18n[currentLang].modName;
    document.getElementById('tag-label').innerText = i18n[currentLang].tag;
    document.getElementById('generate-btn').innerText = i18n[currentLang].gen;
}

// Конвертация PNG в DataURL для превью и сохранения
function handleFlagUpload(input, ideology) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(`${ideology}_preview`).src = e.target.result;
            saveData();
        }
        reader.readAsDataURL(file);
    }
}

// Автосохранение (защита от случайного закрытия)
function saveData() {
    const data = {
        modName: document.getElementById('modName').value,
        tag: document.getElementById('countryTag').value.toUpperCase(),
        ideologies: {}
    };
    
    ideologies.forEach(ideo => {
        const previewSrc = document.getElementById(`${ideo}_preview`).src;
        data.ideologies[ideo] = {
            name: document.getElementById(`${ideo}_name`).value,
            def: document.getElementById(`${ideo}_def`).value,
            adj: document.getElementById(`${ideo}_adj`).value,
            flagUrl: previewSrc.startsWith('data:image') ? previewSrc : null
        };
    });
    localStorage.setItem('hoi4_mod_data', JSON.stringify(data));
}

function loadData() {
    const savedLang = localStorage.getItem('hoi4_mod_lang');
    if (savedLang && document.getElementById('lang-modal').style.display !== 'none') {
        setLanguage(savedLang);
        return; 
    }

    const dataStr = localStorage.getItem('hoi4_mod_data');
    if (dataStr) {
        const data = JSON.parse(dataStr);
        document.getElementById('modName').value = data.modName || '';
        document.getElementById('countryTag').value = data.tag || '';
        
        ideologies.forEach(ideo => {
            if (data.ideologies[ideo]) {
                document.getElementById(`${ideo}_name`).value = data.ideologies[ideo].name || '';
                document.getElementById(`${ideo}_def`).value = data.ideologies[ideo].def || '';
                document.getElementById(`${ideo}_adj`).value = data.ideologies[ideo].adj || '';
                if (data.ideologies[ideo].flagUrl) {
                    document.getElementById(`${ideo}_preview`).src = data.ideologies[ideo].flagUrl;
                }
            }
        });
    }
}

// Конвертер Canvas в TGA (32-bit, Uncompressed, Top-Down)
function canvasToTGA(canvas) {
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    
    const header = new Uint8Array(18);
    header[2] = 2; // Uncompressed RGB
    header[12] = canvas.width & 0xFF;
    header[13] = (canvas.width >> 8) & 0xFF;
    header[14] = canvas.height & 0xFF;
    header[15] = (canvas.height >> 8) & 0xFF;
    header[16] = 32; // 32 bpp
    header[17] = 0x20; // 0x20 гарантирует Top-Down (флаг не перевернется в игре)

    const tga = new Uint8Array(18 + data.length);
    tga.set(header, 0);
    
    // RGBA -> BGRA
    for (let i = 0; i < data.length; i += 4) {
        tga[18 + i] = data[i + 2];     // B
        tga[18 + i + 1] = data[i + 1]; // G
        tga[18 + i + 2] = data[i];     // R
        tga[18 + i + 3] = data[i + 3]; // A
    }
    return tga;
}

// Функция масштабирования и конвертации
async function processFlag(dataUrl, width, height) {
    return new Promise((resolve) => {
        if (!dataUrl || !dataUrl.startsWith('data:image')) {
            resolve(null);
            return;
        }
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvasToTGA(canvas));
        };
        img.src = dataUrl;
    });
}

// Генерация архива
async function generateMod() {
    const modName = document.getElementById('modName').value || "MyMod";
    const tag = document.getElementById('countryTag').value.toUpperCase() || "XXX";
    const safeModName = modName.replace(/[^a-zA-Z0-9_-]/g, "_");
    
    const zip = new JSZip();
    
    // Корневой файл .mod
    const rootModFile = `name="${modName}"\npath="mod/${safeModName}"\nsupported_version="1.*"`;
    zip.file(`${safeModName}.mod`, rootModFile);
    
    // Папка мода
    const modFolder = zip.folder(safeModName);
    modFolder.file("descriptor.mod", rootModFile);
    
    // Локализация (строго UTF-8 BOM)
    let locContent = `\uFEFFl_${currentLang === 'ru' ? 'russian' : 'english'}:\n`;
    
    ideologies.forEach(ideo => {
        const name = document.getElementById(`${ideo}_name`).value;
        const def = document.getElementById(`${ideo}_def`).value;
        const adj = document.getElementById(`${ideo}_adj`).value;
        
        if (name) locContent += ` ${tag}_${ideo}:0 "${name}"\n`;
        if (def) locContent += ` ${tag}_${ideo}_DEF:0 "${def}"\n`;
        if (adj) locContent += ` ${tag}_${ideo}_ADJ:0 "${adj}"\n`;
    });
    
    const locFileName = `countries_l_${currentLang === 'ru' ? 'russian' : 'english'}.yml`;
    modFolder.folder("localisation").folder(currentLang === 'ru' ? 'russian' : 'english').file(locFileName, locContent);
    
    // Обработка флагов
    const gfxFolder = modFolder.folder("gfx").folder("flags");
    const mediumFolder = gfxFolder.folder("medium");
    const smallFolder = gfxFolder.folder("small");
    
    for (const ideo of ideologies) {
        const flagUrl = document.getElementById(`${ideo}_preview`).src;
        
        const tgaNormal = await processFlag(flagUrl, 82, 52);
        const tgaMedium = await processFlag(flagUrl, 41, 26);
        const tgaSmall = await processFlag(flagUrl, 10, 7);
        
        if (tgaNormal) {
            const fileName = `${tag}_${ideo}.tga`;
            gfxFolder.file(fileName, tgaNormal);
            mediumFolder.file(fileName, tgaMedium);
            smallFolder.file(fileName, tgaSmall);
        }
    }
    
    // Скачивание архива
    zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, `${safeModName}_mod.zip`);
    });
}

// Запуск (проверка на сохраненный язык)
window.onload = () => {
    if (localStorage.getItem('hoi4_mod_lang')) {
        loadData();
    }
};

