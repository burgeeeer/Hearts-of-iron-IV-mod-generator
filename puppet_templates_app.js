/**
 * Puppet Bulk & Template Generator
 * Uses 439 official Hearts of Iron IV countries extracted from game files.
 * Supports both Russian and English localization, custom tag inputs, and fast export.
 */

var _g = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);
var puppetBulkTemplates = [];

function getCountriesDb() {
    return _g.HOI4_COUNTRIES_DB || (typeof HOI4_COUNTRIES_DB !== 'undefined' ? HOI4_COUNTRIES_DB : []);
}

function autoDeriveEnglishPattern(ruPattern, overlord) {
    var s = String(ruPattern || '').trim();
    var ovUpper = String(overlord || 'GER').toUpperCase().trim();
    if (!s) return (ovUpper === 'SOV' ? 'Soviet' : 'German') + ' $TAG$';

    var res = s;

    // Phrases
    var phraseMap = [
        [/автономная область|автономный округ/gi, 'Autonomous Oblast of'],
        [/автономная республика/gi, 'Autonomous Republic of'],
        [/генерал-губернаторство/gi, 'General Government of'],
        [/генеральный комиссариат/gi, 'Generalkommissariat'],
        [/военная администрация/gi, 'Military Administration in'],
        [/оккупационная зона/gi, 'Occupation Zone of'],
        [/социалистическая республика/gi, 'Socialist Republic of'],
        [/народная республика/gi, 'People\'s Republic of'],
        [/демократическая республика/gi, 'Democratic Republic of'],
        [/рейхспротекторат/gi, 'Reichsprotectorate of'],
        [/рейхскомиссариат/gi, 'Reichskommissariat'],
        [/протекторат/gi, 'Protectorate of'],
        [/колония/gi, 'Colony of'],
        [/доминион/gi, 'Dominion of'],
        [/мандат/gi, 'Mandate of'],
        [/республика/gi, 'Republic of'],
        [/королевство/gi, 'Kingdom of'],
        [/империя/gi, 'Empire of'],
        [/княжество/gi, 'Principality of'],
        [/губерния/gi, 'Governorate of'],
        [/марионетка/gi, 'Puppet'],
        [/сср/gi, 'SSR']
    ];

    // Adjectives
    var adjMap = [
        [/германск(?:ая|ий|ое|ие|ую|ом|ой)?|немецк(?:ая|ий|ое|ие|ую|ом|ой)?/gi, 'German'],
        [/советск(?:ая|ий|ое|ие|ую|ом|ой)?/gi, 'Soviet'],
        [/российск(?:ая|ий|ое|ие|ую|ом|ой)?|русск(?:ая|ий|ое|ие|ую|ом|ой)?/gi, 'Russian'],
        [/британск(?:ая|ий|ое|ие|ую|ом|ой)?|английск(?:ая|ий|ое|ие|ую|ом|ой)?/gi, 'British'],
        [/французск(?:ая|ий|ое|ие|ую|ом|ой)?/gi, 'French'],
        [/итальянск(?:ая|ий|ое|ие|ую|ом|ой)?/gi, 'Italian'],
        [/японск(?:ая|ий|ое|ие|ую|ом|ой)?/gi, 'Japanese'],
        [/американск(?:ая|ий|ое|ие|ую|ом|ой)?/gi, 'American'],
        [/польск(?:ая|ий|ое|ие|ую|ом|ой)?/gi, 'Polish']
    ];

    for (var i = 0; i < phraseMap.length; i++) {
        res = res.replace(phraseMap[i][0], phraseMap[i][1]);
    }
    for (var j = 0; j < adjMap.length; j++) {
        res = res.replace(adjMap[j][0], adjMap[j][1]);
    }

    res = res.replace(/\s+/g, ' ').trim();
    if (res.indexOf('$TAG$') === -1 && res.indexOf('{country}') === -1 && res.indexOf('{tag}') === -1) {
        res += ' $TAG$';
    }
    return res;
}

function mkDefaultPuppetBulkTemplate(overlord) {
    var ov = overlord || 'GER';
    var isSov = (ov === 'SOV');
    return {
        id: 'tmpl_' + Math.random().toString(36).substr(2, 9),
        overlord: ov,
        patternRu: isSov ? 'Советская $TAG$' : 'Германская $TAG$',
        patternEn: isSov ? 'Soviet $TAG$' : 'German $TAG$',
        ideology: 'all',
        mode: 'all', // 'all' (all 439 game countries) or 'custom' (user specified tags)
        customTagsInput: '',
        selectedTags: getCountriesDb().map(function(c) { return c.tag; }),
        tagSearchQuery: '',
        showTagList: false
    };
}

function initPuppetBulkTemplates() {
    if (!puppetBulkTemplates || !puppetBulkTemplates.length) {
        puppetBulkTemplates = [mkDefaultPuppetBulkTemplate('GER')];
    }
}

function formatPuppetTagLoc(pattern, tag) {
    var p = String(pattern || '').trim();
    if (!p) p = '$TAG$';

    if (/\$TAG\$|\{tag\}|\{country\}|\$COUNTRY\$/i.test(p)) {
        return p.replace(/\$TAG\$|\{tag\}|\{country\}|\$COUNTRY\$/gi, '$' + tag + '$');
    }
    return p + ' $' + tag + '$';
}

function getCountryNameByTag(tag, lang) {
    var db = getCountriesDb();
    for (var i = 0; i < db.length; i++) {
        if (db[i].tag === tag) {
            return lang === 'en' ? (db[i].en || tag) : (db[i].ru || tag);
        }
    }
    return tag;
}

function formatPuppetPreviewExample(pattern, tag, lang) {
    var p = String(pattern || '').trim();
    if (!p) p = '$TAG$';
    var countryName = getCountryNameByTag(tag, lang);

    if (/\$TAG\$|\{tag\}|\{country\}|\$COUNTRY\$/i.test(p)) {
        return p.replace(/\$TAG\$|\{tag\}|\{country\}|\$COUNTRY\$/gi, countryName);
    }
    return p + ' ' + countryName;
}

function getEffectiveTags(tmpl) {
    var db = getCountriesDb();
    var ov = String(tmpl.overlord || '').toUpperCase().trim();

    if (tmpl.mode === 'custom') {
        var tags = [];
        // 1. Tags from text input
        if (tmpl.customTagsInput && tmpl.customTagsInput.trim()) {
            var raw = tmpl.customTagsInput.toUpperCase().split(/[\s,;]+/);
            for (var i = 0; i < raw.length; i++) {
                var t = raw[i].trim();
                if (t && t !== ov && tags.indexOf(t) === -1) {
                    tags.push(t);
                }
            }
        }
        // 2. Tags from interactive checkboxes
        if (tmpl.selectedTags && tmpl.selectedTags.length) {
            for (var j = 0; j < tmpl.selectedTags.length; j++) {
                var st = tmpl.selectedTags[j];
                if (st && st !== ov && tags.indexOf(st) === -1) {
                    tags.push(st);
                }
            }
        }
        return tags;
    }

    // Default mode 'all': return all 439 countries from game files (excluding overlord)
    var all = [];
    for (var k = 0; k < db.length; k++) {
        var cTag = db[k].tag;
        if (cTag && cTag !== ov) {
            all.push(cTag);
        }
    }
    return all;
}

function renderPuppetBulkSection() {
    var box = document.getElementById('puppet-bulk-container');
    if (!box) return;
    box.innerHTML = '';
    initPuppetBulkTemplates();

    var isRu = (window.currentLang !== 'english');
    var db = getCountriesDb();

    for (var i = 0; i < puppetBulkTemplates.length; i++) {
        (function(idx) {
            var tmpl = puppetBulkTemplates[idx];
            // Backward compatibility
            if (!tmpl.patternRu) tmpl.patternRu = tmpl.pattern || 'Германская $TAG$';
            if (!tmpl.patternEn || tmpl.patternEn === '{country} (Puppet)' || tmpl.patternEn === '{adj} {country}') {
                tmpl.patternEn = autoDeriveEnglishPattern(tmpl.patternRu, tmpl.overlord);
            }
            if (!tmpl.mode) tmpl.mode = 'all';
            if (!tmpl.selectedTags || !tmpl.selectedTags.length) {
                tmpl.selectedTags = db.map(function(c) { return c.tag; });
            }

            var card = document.createElement('div');
            card.className = 'dynamic-card puppet-bulk-card';

            // 1. Header
            var hdr = document.createElement('div');
            hdr.className = 'dynamic-card-header';
            var hLeft = document.createElement('div');
            hLeft.style.display = 'flex';
            hLeft.style.alignItems = 'center';
            hLeft.style.gap = '10px';

            var titleSt = document.createElement('strong');
            titleSt.className = 'dynamic-card-title';
            titleSt.textContent = (isRu ? 'Шаблон марионеток #' : 'Puppet Template #') + (idx + 1) + ' (' + (tmpl.overlord || 'GER') + ')';
            hLeft.appendChild(titleSt);

            var countBadge = document.createElement('span');
            countBadge.className = 'dim-pill';
            hLeft.appendChild(countBadge);

            hdr.appendChild(hLeft);

            if (puppetBulkTemplates.length > 1) {
                var delBtn = document.createElement('button');
                delBtn.type = 'button';
                delBtn.className = 'secondary-btn danger-btn';
                delBtn.textContent = isRu ? 'Удалить шаблон' : 'Remove Template';
                delBtn.onclick = function() {
                    puppetBulkTemplates.splice(idx, 1);
                    if (typeof window.saveData === 'function') window.saveData();
                    renderPuppetBulkSection();
                };
                hdr.appendChild(delBtn);
            }
            card.appendChild(hdr);

            // 2. Controls Grid
            var grid = document.createElement('div');
            grid.className = 'dynamic-grid four-col';

            // Overlord Tag
            var ovGrp = document.createElement('div');
            ovGrp.className = 'input-group';
            var ovLbl = document.createElement('label');
            ovLbl.textContent = isRu ? 'Тег сюзерена (напр. GER, SOV):' : 'Overlord Tag (e.g. GER, SOV):';
            var ovInp = document.createElement('input');
            ovInp.type = 'text';
            ovInp.className = 'input-field';
            ovInp.value = tmpl.overlord || '';
            ovInp.placeholder = 'GER';
            ovInp.oninput = function() {
                var oldOv = tmpl.overlord;
                tmpl.overlord = this.value.toUpperCase().trim();
                titleSt.textContent = (isRu ? 'Шаблон марионеток #' : 'Puppet Template #') + (idx + 1) + ' (' + (tmpl.overlord || 'GER') + ')';
                if (!tmpl.patternEn || tmpl.patternEn === autoDeriveEnglishPattern(tmpl.patternRu, oldOv)) {
                    tmpl.patternEn = autoDeriveEnglishPattern(tmpl.patternRu, tmpl.overlord);
                    patEnInp.value = tmpl.patternEn;
                }
                updateAll();
                if (typeof window.saveData === 'function') window.saveData();
            };
            ovGrp.appendChild(ovLbl);
            ovGrp.appendChild(ovInp);
            grid.appendChild(ovGrp);

            // Ideology Selector
            var ideoGrp = document.createElement('div');
            ideoGrp.className = 'input-group';
            var ideoLbl = document.createElement('label');
            ideoLbl.textContent = isRu ? 'Идеология марионетки:' : 'Puppet Ideology:';
            var ideoSel = document.createElement('select');
            ideoSel.className = 'input-field';

            var ideoOpts = [
                { val: 'all', textRu: 'Все идеологии (универсально)', textEn: 'All Ideologies (Universal)' },
                { val: 'fascism', textRu: 'Только Фашизм', textEn: 'Fascism only' },
                { val: 'communism', textRu: 'Только Коммунизм', textEn: 'Communism only' },
                { val: 'democratic', textRu: 'Только Демократия', textEn: 'Democratic only' },
                { val: 'neutrality', textRu: 'Только Нейтралитет', textEn: 'Non-Aligned only' }
            ];

            ideoOpts.forEach(function(io) {
                var opt = document.createElement('option');
                opt.value = io.val;
                opt.textContent = isRu ? io.textRu : io.textEn;
                if (tmpl.ideology === io.val) opt.selected = true;
                ideoSel.appendChild(opt);
            });

            ideoSel.onchange = function() {
                tmpl.ideology = this.value;
                updateAll();
                if (typeof window.saveData === 'function') window.saveData();
            };
            ideoGrp.appendChild(ideoLbl);
            ideoGrp.appendChild(ideoSel);
            grid.appendChild(ideoGrp);

            // Pattern Input (RU)
            var patRuGrp = document.createElement('div');
            patRuGrp.className = 'input-group';
            var patRuLbl = document.createElement('label');
            patRuLbl.textContent = isRu ? 'Шаблон названия (RU):' : 'Puppet Name Pattern (RU):';
            var patRuInp = document.createElement('input');
            patRuInp.type = 'text';
            patRuInp.className = 'input-field';
            patRuInp.value = tmpl.patternRu || '';
            patRuInp.placeholder = 'Германская $TAG$';
            patRuInp.oninput = function() {
                var oldRu = tmpl.patternRu;
                tmpl.patternRu = this.value;
                tmpl.pattern = this.value;
                var wasGeneric = (!patEnInp.value || patEnInp.value === '{country} (Puppet)' || patEnInp.value === '{adj} {country}' || patEnInp.value === autoDeriveEnglishPattern(oldRu, tmpl.overlord));
                if (wasGeneric) {
                    tmpl.patternEn = autoDeriveEnglishPattern(tmpl.patternRu, tmpl.overlord);
                    patEnInp.value = tmpl.patternEn;
                }
                updateAll();
                if (typeof window.saveData === 'function') window.saveData();
            };
            patRuGrp.appendChild(patRuLbl);
            patRuGrp.appendChild(patRuInp);
            grid.appendChild(patRuGrp);

            // Pattern Input (EN)
            var patEnGrp = document.createElement('div');
            patEnGrp.className = 'input-group';
            var patEnHdr = document.createElement('div');
            patEnHdr.style.display = 'flex';
            patEnHdr.style.justifyContent = 'space-between';
            patEnHdr.style.alignItems = 'center';

            var patEnLbl = document.createElement('label');
            patEnLbl.textContent = isRu ? 'Шаблон (EN для англичан):' : 'Puppet Name Pattern (EN):';
            patEnHdr.appendChild(patEnLbl);

            var btnAutoTrans = document.createElement('button');
            btnAutoTrans.type = 'button';
            btnAutoTrans.className = 'puppet-trans-btn';
            btnAutoTrans.innerHTML = isRu ? 'Авто-перевод' : 'Auto-translate';
            btnAutoTrans.title = isRu ? 'Перевести русское название на английский' : 'Translate Russian name to English';
            btnAutoTrans.onclick = function() {
                tmpl.patternEn = autoDeriveEnglishPattern(tmpl.patternRu, tmpl.overlord);
                patEnInp.value = tmpl.patternEn;
                updateAll();
                if (typeof window.saveData === 'function') window.saveData();
            };
            patEnHdr.appendChild(btnAutoTrans);
            patEnGrp.appendChild(patEnHdr);

            var patEnInp = document.createElement('input');
            patEnInp.type = 'text';
            patEnInp.className = 'input-field';
            patEnInp.value = tmpl.patternEn || '';
            patEnInp.placeholder = 'German $TAG$';
            patEnInp.oninput = function() {
                tmpl.patternEn = this.value;
                updateAll();
                if (typeof window.saveData === 'function') window.saveData();
            };
            patEnGrp.appendChild(patEnInp);
            grid.appendChild(patEnGrp);

            card.appendChild(grid);

            // 3. Country Tags Selection Mode & Direct Input
            var tagsWrap = document.createElement('div');
            tagsWrap.className = 'puppet-tags-section';

            var tagsBar = document.createElement('div');
            tagsBar.className = 'puppet-tag-mode-bar';

            var btnModeAll = document.createElement('button');
            btnModeAll.type = 'button';
            btnModeAll.className = 'puppet-mode-btn' + (tmpl.mode === 'all' ? ' active' : '');
            btnModeAll.textContent = isRu ? 'Все страны из игры (' + db.length + ' стран)' : 'All Game Countries (' + db.length + ')';
            btnModeAll.onclick = function() {
                tmpl.mode = 'all';
                btnModeAll.className = 'puppet-mode-btn active';
                btnModeCustom.className = 'puppet-mode-btn';
                customTagsBlock.style.display = 'none';
                updateAll();
                if (typeof window.saveData === 'function') window.saveData();
            };
            tagsBar.appendChild(btnModeAll);

            var btnModeCustom = document.createElement('button');
            btnModeCustom.type = 'button';
            btnModeCustom.className = 'puppet-mode-btn' + (tmpl.mode === 'custom' ? ' active' : '');
            btnModeCustom.textContent = isRu ? 'Выбранные страны / свой список тегов' : 'Specific Tags / Selection';
            btnModeCustom.onclick = function() {
                tmpl.mode = 'custom';
                btnModeCustom.className = 'puppet-mode-btn active';
                btnModeAll.className = 'puppet-mode-btn';
                customTagsBlock.style.display = 'block';
                updateAll();
                if (typeof window.saveData === 'function') window.saveData();
            };
            tagsBar.appendChild(btnModeCustom);

            tagsWrap.appendChild(tagsBar);

            // Custom tags block
            var customTagsBlock = document.createElement('div');
            customTagsBlock.className = 'puppet-custom-tags-box';
            customTagsBlock.style.display = (tmpl.mode === 'custom') ? 'block' : 'none';

            // Manual tag input field
            var manTagGrp = document.createElement('div');
            manTagGrp.className = 'input-group';
            manTagGrp.style.marginBottom = '10px';
            var manTagLbl = document.createElement('label');
            manTagLbl.textContent = isRu
                ? 'Укажите теги вручную через запятую или пробел (например: HUN, FRA, POL, UKR, BLR, D01):'
                : 'Enter tags separated by comma or space (e.g. HUN, FRA, POL, UKR, BLR, D01):';
            var manTagInp = document.createElement('input');
            manTagInp.type = 'text';
            manTagInp.className = 'input-field';
            manTagInp.placeholder = 'HUN, FRA, POL, ROM, YUG, CZE, D01';
            manTagInp.value = tmpl.customTagsInput || '';
            manTagInp.oninput = function() {
                tmpl.customTagsInput = this.value;
                updateAll();
                if (typeof window.saveData === 'function') window.saveData();
            };
            manTagGrp.appendChild(manTagLbl);
            manTagGrp.appendChild(manTagInp);
            customTagsBlock.appendChild(manTagGrp);

            // Toggleable tag picker button
            var pickerToggleBtn = document.createElement('button');
            pickerToggleBtn.type = 'button';
            pickerToggleBtn.className = 'secondary-btn-sm';
            pickerToggleBtn.textContent = isRu ? 'Раскрыть список всех 439 стран с чекбоксами' : 'Open full country list with checkboxes';

            var pickerContainer = document.createElement('div');
            pickerContainer.className = 'puppet-picker-container';
            pickerContainer.style.display = tmpl.showTagList ? 'block' : 'none';

            pickerToggleBtn.onclick = function() {
                tmpl.showTagList = !tmpl.showTagList;
                pickerContainer.style.display = tmpl.showTagList ? 'block' : 'none';
                pickerToggleBtn.textContent = tmpl.showTagList
                    ? (isRu ? '▲ Скрыть список стран' : '▲ Hide country list')
                    : (isRu ? 'Раскрыть список всех 439 стран с чекбоксами' : 'Open full country list with checkboxes');
            };
            customTagsBlock.appendChild(pickerToggleBtn);

            // Search and quick action toolbar inside picker
            var pSearchRow = document.createElement('div');
            pSearchRow.className = 'puppet-tags-search-wrap';

            var sInp = document.createElement('input');
            sInp.type = 'search';
            sInp.className = 'puppet-search-input';
            sInp.placeholder = isRu ? 'Поиск страны или тега...' : 'Search country or tag...';
            sInp.value = tmpl.tagSearchQuery || '';
            sInp.oninput = function() {
                tmpl.tagSearchQuery = this.value.toLowerCase().trim();
                renderCountryPills();
            };
            pSearchRow.appendChild(sInp);

            var btnSelAll = document.createElement('button');
            btnSelAll.type = 'button';
            btnSelAll.className = 'secondary-btn-sm';
            btnSelAll.textContent = isRu ? 'Выбрать все' : 'Select All';
            btnSelAll.onclick = function() {
                tmpl.selectedTags = db.map(function(c) { return c.tag; });
                renderCountryPills();
                updateAll();
                if (typeof window.saveData === 'function') window.saveData();
            };
            pSearchRow.appendChild(btnSelAll);

            var btnClearAll = document.createElement('button');
            btnClearAll.type = 'button';
            btnClearAll.className = 'secondary-btn-sm';
            btnClearAll.textContent = isRu ? 'Снять все' : 'Deselect All';
            btnClearAll.onclick = function() {
                tmpl.selectedTags = [];
                renderCountryPills();
                updateAll();
                if (typeof window.saveData === 'function') window.saveData();
            };
            pSearchRow.appendChild(btnClearAll);
            pickerContainer.appendChild(pSearchRow);

            var pillsGrid = document.createElement('div');
            pillsGrid.className = 'puppet-tags-grid';
            pickerContainer.appendChild(pillsGrid);

            function renderCountryPills() {
                pillsGrid.innerHTML = '';
                var q = tmpl.tagSearchQuery || '';
                var ov = tmpl.overlord;

                var filtered = db.filter(function(c) {
                    if (c.tag === ov) return false;
                    if (!q) return true;
                    var tagOk = c.tag.toLowerCase().indexOf(q) !== -1;
                    var ruOk = (c.ru || '').toLowerCase().indexOf(q) !== -1;
                    var enOk = (c.en || '').toLowerCase().indexOf(q) !== -1;
                    return tagOk || ruOk || enOk;
                });

                if (!filtered.length) {
                    var emptyDiv = document.createElement('div');
                    emptyDiv.style.gridColumn = '1 / -1';
                    emptyDiv.style.color = 'var(--text-muted)';
                    emptyDiv.style.fontSize = '12px';
                    emptyDiv.style.padding = '8px';
                    emptyDiv.textContent = isRu ? 'Страны не найдены' : 'No countries found';
                    pillsGrid.appendChild(emptyDiv);
                    return;
                }

                filtered.forEach(function(c) {
                    var isSelected = (tmpl.selectedTags.indexOf(c.tag) !== -1);
                    var item = document.createElement('label');
                    item.className = 'puppet-tag-checkbox-item' + (isSelected ? ' selected' : '');

                    var chk = document.createElement('input');
                    chk.type = 'checkbox';
                    chk.checked = isSelected;
                    chk.onchange = function() {
                        if (this.checked) {
                            if (tmpl.selectedTags.indexOf(c.tag) === -1) tmpl.selectedTags.push(c.tag);
                            item.className = 'puppet-tag-checkbox-item selected';
                        } else {
                            tmpl.selectedTags = tmpl.selectedTags.filter(function(t) { return t !== c.tag; });
                            item.className = 'puppet-tag-checkbox-item';
                        }
                        updateAll();
                        if (typeof window.saveData === 'function') window.saveData();
                    };
                    item.appendChild(chk);

                    var tSpan = document.createElement('span');
                    tSpan.className = 'puppet-chip-tag';
                    tSpan.textContent = c.tag;
                    item.appendChild(tSpan);

                    var nSpan = document.createElement('span');
                    nSpan.className = 'puppet-tag-name-label';
                    nSpan.textContent = isRu ? c.ru : c.en;
                    item.appendChild(nSpan);

                    pillsGrid.appendChild(item);
                });
            }

            renderCountryPills();
            customTagsBlock.appendChild(pickerContainer);
            tagsWrap.appendChild(customTagsBlock);
            card.appendChild(tagsWrap);

            // 4. Instructions & Help Box (Bilingual)
            var helpBox = document.createElement('div');
            helpBox.className = 'puppet-help-box';
            if (isRu) {
                helpBox.innerHTML =
                    '<div class="puppet-help-title">Что можно указать в названии:</div>' +
                    '<p class="puppet-help-desc">' +
                    'Вставьте <code>$TAG$</code> туда, где должно стоять название страны. ' +
                    'Движок HoI4 автоматически подставит в игре реальное название страны: <b>на русском языке</b> в русском клиенте и <b>на английском языке</b> в английском клиенте!' +
                    '</p>' +
                    '<div class="puppet-examples-grid">' +
                        '<div class="puppet-example-item">RU: <code>Германская $TAG$</code> | EN: <code>German $TAG$</code> -> в игре: <b>Германская Венгрия</b> / <b>German Hungary</b></div>' +
                        '<div class="puppet-example-item">RU: <code>Советская $TAG$</code> | EN: <code>Soviet $TAG$</code> -> в игре: <b>Советская Польша</b> / <b>Soviet Poland</b></div>' +
                        '<div class="puppet-example-item">RU: <code>Германская авт. область $TAG$</code> | EN: <code>German Autonomous Oblast of $TAG$</code></div>' +
                        '<div class="puppet-example-item">RU: <code>Рейхскомиссариат $TAG$</code> | EN: <code>Reichskommissariat $TAG$</code> -> в игре: <b>Рейхскомиссариат Украина</b></div>' +
                        '<div class="puppet-example-item">RU: <code>Протекторат $TAG$</code> | EN: <code>Protectorate of $TAG$</code> -> в игре: <b>Протекторат Богемия</b></div>' +
                        '<div class="puppet-example-item">RU: <code>$TAG$ (Марионетка)</code> | EN: <code>$TAG$ (Puppet)</code> -> в игре: <b>Франция (Марионетка)</b> / <b>France (Puppet)</b></div>' +
                    '</div>' +
                    '<div class="puppet-help-note">Примечание: <i>Если вы не укажете <code>$TAG$</code>, тег страны автоматически добавится в конец. Поле EN генерирует названия для игроков с английским клиентом.</i></div>';
            } else {
                helpBox.innerHTML =
                    '<div class="puppet-help-title">What you can specify in the naming patterns:</div>' +
                    '<p class="puppet-help-desc">' +
                    'Insert <code>$TAG$</code> where the country name should appear. ' +
                    'The HoI4 engine automatically inserts the localized country name: <b>in English</b> for English players and <b>in Russian</b> for Russian players!' +
                    '</p>' +
                    '<div class="puppet-examples-grid">' +
                        '<div class="puppet-example-item">RU: <code>Германская $TAG$</code> | EN: <code>German $TAG$</code> -> in game: <b>German Hungary</b> / <b>Германская Венгрия</b></div>' +
                        '<div class="puppet-example-item">RU: <code>Советская $TAG$</code> | EN: <code>Soviet $TAG$</code> -> in game: <b>Soviet Poland</b> / <b>Советская Польша</b></div>' +
                        '<div class="puppet-example-item">RU: <code>Германская авт. область $TAG$</code> | EN: <code>German Autonomous Oblast of $TAG$</code></div>' +
                        '<div class="puppet-example-item">RU: <code>Рейхскомиссариат $TAG$</code> | EN: <code>Reichskommissariat $TAG$</code> -> in game: <b>Reichskommissariat Ukraine</b></div>' +
                        '<div class="puppet-example-item">RU: <code>Протекторат $TAG$</code> | EN: <code>Protectorate of $TAG$</code> -> in game: <b>Protectorate of Bohemia</b></div>' +
                        '<div class="puppet-example-item">RU: <code>$TAG$ (Марионетка)</code> | EN: <code>$TAG$ (Puppet)</code> -> in game: <b>France (Puppet)</b></div>' +
                    '</div>' +
                    '<div class="puppet-help-note">Примечание: <i>If you omit <code>$TAG$</code>, the country tag will be automatically appended to the end. The EN template is exported to countries_cosmetic_l_english.yml for English clients.</i></div>';
            }
            card.appendChild(helpBox);

            // 5. Live Preview Chips (Showing both RU and EN)
            var prevWrap = document.createElement('div');
            prevWrap.className = 'puppet-preview-box';

            var prevTitle = document.createElement('div');
            prevTitle.className = 'puppet-preview-title';
            prevTitle.innerHTML = '' + (isRu ? 'Наглядный пример отображения в игре (RU и EN):' : 'In-game preview (RU and EN):');
            prevWrap.appendChild(prevTitle);

            var chipsBox = document.createElement('div');
            chipsBox.className = 'puppet-preview-chips';
            prevWrap.appendChild(chipsBox);

            card.appendChild(prevWrap);

            // 6. Footer with YAML code preview
            var foot = document.createElement('div');
            foot.className = 'puppet-bulk-footer';

            var btnYml = document.createElement('button');
            btnYml.type = 'button';
            btnYml.className = 'secondary-btn';
            btnYml.innerHTML = '' + (isRu ? 'Показать пример YAML локализации' : 'View YAML Snippet');

            var codeBox = document.createElement('pre');
            codeBox.className = 'puppet-code-preview';
            codeBox.style.display = 'none';

            btnYml.onclick = function() {
                if (codeBox.style.display === 'none') {
                    codeBox.textContent = generateTemplateYamlPreview(tmpl);
                    codeBox.style.display = 'block';
                    btnYml.innerHTML = '' + (isRu ? 'Скрыть пример YAML' : 'Hide YAML Snippet');
                } else {
                    codeBox.style.display = 'none';
                    btnYml.innerHTML = '' + (isRu ? 'Показать пример YAML локализации' : 'View YAML Snippet');
                }
            };
            foot.appendChild(btnYml);
            card.appendChild(foot);
            card.appendChild(codeBox);

            function updateAll() {
                var effTags = getEffectiveTags(tmpl);
                countBadge.textContent = '' + effTags.length + ' ' + (isRu ? 'стран' : 'countries');

                // Update Preview Chips
                chipsBox.innerHTML = '';
                var sampleTags = ['HUN', 'FRA', 'POL', 'ROM', 'D01'];
                if (tmpl.mode === 'custom' && effTags.length > 0) {
                    sampleTags = effTags.slice(0, 5);
                }

                sampleTags.forEach(function(tg) {
                    var chip = document.createElement('div');
                    chip.className = 'puppet-chip';

                    var tagBadge = document.createElement('span');
                    tagBadge.className = 'puppet-chip-tag';
                    tagBadge.textContent = tg;
                    chip.appendChild(tagBadge);

                    var arrow = document.createElement('span');
                    arrow.className = 'puppet-chip-arrow';
                    arrow.textContent = '->';
                    chip.appendChild(arrow);

                    var valRu = document.createElement('span');
                    valRu.className = 'puppet-chip-val';
                    valRu.innerHTML = '<b>RU:</b> ' + formatPuppetPreviewExample(tmpl.patternRu, tg, 'ru');
                    chip.appendChild(valRu);

                    var sep = document.createElement('span');
                    sep.style.color = 'var(--text-muted)';
                    sep.textContent = '|';
                    chip.appendChild(sep);

                    var valEn = document.createElement('span');
                    valEn.className = 'puppet-chip-val';
                    valEn.innerHTML = '<b>EN:</b> ' + formatPuppetPreviewExample(tmpl.patternEn, tg, 'en');
                    chip.appendChild(valEn);

                    chipsBox.appendChild(chip);
                });

                if (codeBox.style.display !== 'none') {
                    codeBox.textContent = generateTemplateYamlPreview(tmpl);
                }
            }

            updateAll();
            box.appendChild(card);
        })(i);
    }
}

function addPuppetBulkTemplate() {
    initPuppetBulkTemplates();
    var nextOv = puppetBulkTemplates.length === 1 ? 'SOV' : (puppetBulkTemplates.length === 2 ? 'RUS' : 'ENG');
    puppetBulkTemplates.push(mkDefaultPuppetBulkTemplate(nextOv));
    if (typeof window.saveData === 'function') window.saveData();
    renderPuppetBulkSection();
}

function generateTemplateYamlPreview(tmpl) {
    var ov = tmpl.overlord || 'GER';
    var patRu = tmpl.patternRu || 'Германская $TAG$';
    var patEn = tmpl.patternEn || 'German $TAG$';
    var effTags = getEffectiveTags(tmpl);
    var sampleTags = effTags.slice(0, 6);

    var lines = [
        '# countries_cosmetic_l_russian.yml',
        'l_russian:'
    ];
    sampleTags.forEach(function(tg) {
        var sRu = formatPuppetTagLoc(patRu, tg);
        lines.push(' ' + tg + '_' + ov + ':0 "' + sRu + '"');
        lines.push(' ' + tg + '_' + ov + '_DEF:0 "' + sRu + '"');
        if (tmpl.ideology === 'all') {
            lines.push(' ' + tg + '_' + ov + '_fascism:0 "' + sRu + '"');
            lines.push(' ' + tg + '_' + ov + '_democratic:0 "' + sRu + '"');
        } else {
            lines.push(' ' + tg + '_' + ov + '_' + tmpl.ideology + ':0 "' + sRu + '"');
        }
    });

    lines.push('');
    lines.push('# countries_cosmetic_l_english.yml');
    lines.push('l_english:');
    sampleTags.forEach(function(tg) {
        var sEn = formatPuppetTagLoc(patEn, tg);
        lines.push(' ' + tg + '_' + ov + ':0 "' + sEn + '"');
        lines.push(' ' + tg + '_' + ov + '_DEF:0 "' + sEn + '"');
        if (tmpl.ideology === 'all') {
            lines.push(' ' + tg + '_' + ov + '_fascism:0 "' + sEn + '"');
            lines.push(' ' + tg + '_' + ov + '_democratic:0 "' + sEn + '"');
        } else {
            lines.push(' ' + tg + '_' + ov + '_' + tmpl.ideology + ':0 "' + sEn + '"');
        }
    });

    if (effTags.length > 6) {
        lines.push(' # ... и ещё ' + (effTags.length - 6) + ' стран (всего ' + effTags.length + ')');
    }
    return lines.join('\n');
}

/**
 * Directly writes bulk puppet localization into cosmetic localization arrays in milliseconds.
 * Fast, lightweight, and generates only ~120 KB total.
 */
function applyPuppetBulkLoc(cosmeticLocRu, cosmeticLocEn) {
    var list = (_g.puppetBulkTemplates && _g.puppetBulkTemplates.length) ? _g.puppetBulkTemplates : puppetBulkTemplates;
    if (!list || !list.length) return false;
    var hasAny = false;

    for (var i = 0; i < list.length; i++) {
        var tmpl = list[i];
        var ov = String(tmpl.overlord || '').toUpperCase().trim();
        if (!ov) continue;
        hasAny = true;

        var patRu = tmpl.patternRu || tmpl.pattern || (ov === 'SOV' ? 'Советская $TAG$' : 'Германская $TAG$');
        var patEn = tmpl.patternEn || (ov === 'SOV' ? 'Soviet $TAG$' : 'German $TAG$');
        var ideo = tmpl.ideology || 'all';

        var ovVariants = [ov];
        if (ov === 'EUR' && ovVariants.indexOf('EUR_UNIFIED') === -1) ovVariants.push('EUR_UNIFIED');
        if (ov === 'EUR_UNIFIED' && ovVariants.indexOf('EUR') === -1) ovVariants.push('EUR');

        var tags = getEffectiveTags(tmpl);

        for (var t = 0; t < tags.length; t++) {
            var tg = tags[t];
            if (tg === ov) continue;
            var locStrRu = formatPuppetTagLoc(patRu, tg);
            var locStrEn = formatPuppetTagLoc(patEn, tg);

            for (var v = 0; v < ovVariants.length; v++) {
                var oTag = ovVariants[v];
                var k = tg + '_' + oTag;

                if (ideo === 'all') {
                    cosmeticLocRu.push(
                        ' ' + k + ':0 "' + locStrRu + '"',
                        ' ' + k + '_DEF:0 "' + locStrRu + '"',
                        ' ' + k + '_fascism:0 "' + locStrRu + '"',
                        ' ' + k + '_fascism_DEF:0 "' + locStrRu + '"',
                        ' ' + k + '_democratic:0 "' + locStrRu + '"',
                        ' ' + k + '_democratic_DEF:0 "' + locStrRu + '"',
                        ' ' + k + '_communism:0 "' + locStrRu + '"',
                        ' ' + k + '_communism_DEF:0 "' + locStrRu + '"',
                        ' ' + k + '_neutrality:0 "' + locStrRu + '"',
                        ' ' + k + '_neutrality_DEF:0 "' + locStrRu + '"'
                    );
                    cosmeticLocEn.push(
                        ' ' + k + ':0 "' + locStrEn + '"',
                        ' ' + k + '_DEF:0 "' + locStrEn + '"',
                        ' ' + k + '_fascism:0 "' + locStrEn + '"',
                        ' ' + k + '_fascism_DEF:0 "' + locStrEn + '"',
                        ' ' + k + '_democratic:0 "' + locStrEn + '"',
                        ' ' + k + '_democratic_DEF:0 "' + locStrEn + '"',
                        ' ' + k + '_communism:0 "' + locStrEn + '"',
                        ' ' + k + '_communism_DEF:0 "' + locStrEn + '"',
                        ' ' + k + '_neutrality:0 "' + locStrEn + '"',
                        ' ' + k + '_neutrality_DEF:0 "' + locStrEn + '"'
                    );
                } else {
                    cosmeticLocRu.push(
                        ' ' + k + '_' + ideo + ':0 "' + locStrRu + '"',
                        ' ' + k + '_' + ideo + '_DEF:0 "' + locStrRu + '"'
                    );
                    cosmeticLocEn.push(
                        ' ' + k + '_' + ideo + ':0 "' + locStrEn + '"',
                        ' ' + k + '_' + ideo + '_DEF:0 "' + locStrEn + '"'
                    );
                }
            }
        }
    }
    return hasAny;
}

/**
 * Backward compatibility helper
 */
function getPuppetBulkExportEntries() {
    var res = [];
    var list = (_g.puppetBulkTemplates && _g.puppetBulkTemplates.length) ? _g.puppetBulkTemplates : puppetBulkTemplates;
    if (!list || !list.length) return res;

    for (var i = 0; i < list.length; i++) {
        var tmpl = list[i];
        var ov = String(tmpl.overlord || '').toUpperCase().trim();
        if (!ov) continue;
        var patRu = tmpl.patternRu || 'Германская $TAG$';
        var patEn = tmpl.patternEn || 'German $TAG$';
        var ideos = (tmpl.ideology === 'all')
            ? ['fascism', 'democratic', 'communism', 'neutrality']
            : [tmpl.ideology];
        var tags = getEffectiveTags(tmpl);

        for (var t = 0; t < tags.length; t++) {
            var tg = tags[t];
            if (tg === ov) continue;
            var locStrRu = formatPuppetTagLoc(patRu, tg);
            var locStrEn = formatPuppetTagLoc(patEn, tg);
            res.push({
                overlord: ov,
                tag: tg,
                ideologies: ideos,
                nameRu: locStrRu,
                nameEn: locStrEn
            });
        }
    }
    return res;
}

_g.puppetBulkTemplates = puppetBulkTemplates;
_g.renderPuppetBulkSection = renderPuppetBulkSection;
_g.addPuppetBulkTemplate = addPuppetBulkTemplate;
_g.applyPuppetBulkLoc = applyPuppetBulkLoc;
_g.getPuppetBulkExportEntries = getPuppetBulkExportEntries;
_g.getEffectiveTags = getEffectiveTags;
_g.mkDefaultPuppetBulkTemplate = mkDefaultPuppetBulkTemplate;
_g.autoDeriveEnglishPattern = autoDeriveEnglishPattern;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCountriesDb: getCountriesDb,
        getEffectiveTags: getEffectiveTags,
        formatPuppetTagLoc: formatPuppetTagLoc,
        applyPuppetBulkLoc: applyPuppetBulkLoc,
        getPuppetBulkExportEntries: getPuppetBulkExportEntries,
        autoDeriveEnglishPattern: autoDeriveEnglishPattern
    };
}
