const ideologies = ['fascism', 'democratic', 'communism', 'neutrality'];
let currentLang = 'english';

const i18n = {
    english: {
        title: "HoI4 Mod Generator",
        settings: "Basic Settings",
        modName: "Mod Name (English):",
        tag: "Tag (Normal or Cosmetic, e.g. GER or BALTIC_ASSEMBLY):",
        fascism: "Fascism",
        democratic: "Democratic",
        communism: "Communism",
        neutrality: "Non-Aligned",
        baseName: "Base Name (UI):",
        defName: "Definite Name (Events, Capitulation):",
        adjName: "Adjective:",
        uploadFlag: "Upload Flag (PNG):",
        genBtn: "Generate Mod",
        puppetTitle: "Puppet Names (Optional)",
        puppetDesc: "Example: Overlord EST, Puppet POL, Name 'Estonian Poland'."
    },
    russian: {
        title: "Генератор стран HoI4",
        settings: "Базовые настройки",
        modName: "Название мода (на англ):",
        tag: "Тег (Обычный или Cosmetic, напр. GER или BALTIC_ASSEMBLY):",
        fascism: "Фашизм",
        democratic: "Демократия",
        communism: "Коммунизм",
        neutrality: "Нейтралитет",
        baseName: "Основное название:",
        defName: "Официальное (Для ивентов/капитуляции):",
        adjName: "Прилагательное:",
        uploadFlag: "Загрузить флаг (PNG):",
        genBtn: "Сгенерировать мод",
        puppetTitle: "Названия марионеток (Опционально)",
        puppetDesc: "Например: Сюзерен EST, Марионетка POL, Название 'Эстонская Польша'."
    }
};

window.onload = () => {
    const savedData = JSON.parse(localStorage.getItem('hoi4modData'));
    if (savedData && savedData.lang) {
        setLanguage(savedData.lang);
        restoreData(savedData);
    } else {
        document.getElementById('lang-modal').style.display = 'flex';
    }
};

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('lang-modal').style.display = 'none';
    document.getElementById('app-content').style.display = 'block';
    
    document.getElementById('titleText').innerText = i18n[lang].title;
    document.getElementById('settingsText').innerText = i18n[lang].settings;
    document.getElementById('modNameLabel').innerText = i18n[lang].modName;
    document.getElementById('tagLabel').innerText = i18n[lang].tag;
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
        puppet: {
            overlord: document.getElementById('puppetOverlord').value.toUpperCase(),
            tag: document.getElementById('puppetTag').value.toUpperCase(),
            name: document.getElementById('puppetName').value
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
    
    if (data.puppet) {
        document.getElementById('puppetOverlord').value = data.puppet.overlord || '';
        document.getElementById('puppetTag').value = data.puppet.tag || '';
        document.getElementById('puppetName').value = data.puppet.name || '';
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
    view.setUint8(17, 0x20); 

    let offset = 18;
    for (let i = 0; i < imgData.length; i += 4) {
        uint8[offset++] = imgData[i + 2]; // B
        uint8[offset++] = imgData[i + 1]; // G
        uint8[offset++] = imgData[i];     // R
        uint8[offset++] = imgData[i + 3]; // A
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
    const pupName = document.getElementById('puppetName').value.trim();
    
    if (pupOverlord && pupTag && pupName) {
        locContent += ` autonomy_${pupOverlord}_${pupTag}:0 "${pupName}"\n`;
        locContent += ` autonomy_${pupOverlord}_${pupTag}_DEF:0 "${pupName}"\n`;
    }

    const locBlob = new Blob(["\uFEFF" + locContent], { type: "text/plain;charset=utf-8" });
    locFolder.file(`countries_l_${currentLang}.yml`, locBlob);

    const modFileContent = `version="1.0"\ntags={\n\t"Alternative History"\n\t"Graphics"\n}\nname="${modName}"\nsupported_version="*"\npath="mod/${modName}"`;
    zip.file(`${modName}.mod`, modFileContent);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${modName}.zip`);
}
