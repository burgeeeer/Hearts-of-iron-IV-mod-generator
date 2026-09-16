/*
 * Compatibility / gameplay fixes for the HoI4 Mod Generator.
 *
 * Kept separate from app.js so future UI edits do not accidentally remove
 * the gameplay-specific fixes below.
 */
(function () {
    var COMMON_AUTONOMY_LEVELS = [
        'integrated_puppet',
        'puppet',
        'colony',
        'dominion'
    ];

    var SPECIAL_AUTONOMY = {
        GER: [
            'satellite',
            'reichsprotectorate',
            'reichskommissariat'
        ],
        JAP: [
            'wtt_imperial_subject',
            'wtt_imperial_protectorate',
            'wtt_imperial_associate'
        ]
    };

    var SPECIAL_LABELS = {
        english: {
            satellite: 'Name (Satellite):',
            reichsprotectorate: 'Name (Reichsprotectorate):',
            reichskommissariat: 'Name (Reichskommissariat):',
            wtt_imperial_subject: 'Name (Imperial Subject):',
            wtt_imperial_protectorate: 'Name (Imperial Protectorate):',
            wtt_imperial_associate: 'Name (Imperial Associate):',
            commonAutonomyTitle: 'Common autonomy levels',
            specialAutonomyTitle: 'Country-specific autonomy levels',
            germanySpecial: 'Germany-specific levels',
            japanSpecial: 'Japan-specific levels',
            specialHint: 'These fields appear only for overlords that use a special autonomy system.'
        },
        russian: {
            satellite: 'Название (Сателлит):',
            reichsprotectorate: 'Название (Рейхспротекторат):',
            reichskommissariat: 'Название (Рейхскомиссариат):',
            wtt_imperial_subject: 'Название (Имперский субъект):',
            wtt_imperial_protectorate: 'Название (Имперский протекторат):',
            wtt_imperial_associate: 'Название (Имперский ассоциированный):',
            commonAutonomyTitle: 'Общие уровни автономии',
            specialAutonomyTitle: 'Уникальные уровни автономии',
            germanySpecial: 'Уникальные уровни Германии',
            japanSpecial: 'Уникальные уровни Японии',
            specialHint: 'Эти поля появляются только для сюзеренов с особой системой автономии.'
        }
    };

    var legacySpecialKeys = [
        'satellite',
        'reichsprotectorate',
        'reichskommissariat',
        'wtt_imperial_subject',
        'wtt_imperial_protectorate',
        'wtt_imperial_associate',
        'subjugated',
        'supervised_state',
        'protectorate'
    ];

    function ensureSpecialStorage() {
        for (var pi = 0; pi < puppetRules.length; pi++) {
            var p = puppetRules[pi];
            if (!p || !p.ideologies) continue;
            for (var ii = 0; ii < ideologies.length; ii++) {
                var id = ideologies[ii];
                if (!p.ideologies[id]) {
                    p.ideologies[id] = { name: '', img: null, autonomy: {} };
                }
                if (!p.ideologies[id].autonomy) p.ideologies[id].autonomy = {};
                if (!p.ideologies[id].specialAutonomy) p.ideologies[id].specialAutonomy = {};
            }
        }
    }

    function migrateLegacySpecialValues(savedData) {
        ensureSpecialStorage();
        var savedPuppets = savedData && savedData.puppetRules ? savedData.puppetRules : [];

        for (var pi = 0; pi < puppetRules.length; pi++) {
            var saved = savedPuppets[pi] || {};
            var savedIdeologies = saved.ideologies || {};

            for (var ii = 0; ii < ideologies.length; ii++) {
                var id = ideologies[ii];
                var target = puppetRules[pi].ideologies[id];
                var source = savedIdeologies[id] || {};
                var oldAuto = source.autonomy || {};

                if (!target.specialAutonomy) target.specialAutonomy = {};

                // Preserve values from the old 10-field UI.
                for (var li = 0; li < legacySpecialKeys.length; li++) {
                    var key = legacySpecialKeys[li];
                    if (!target.specialAutonomy[key] && oldAuto[key]) {
                        target.specialAutonomy[key] = oldAuto[key];
                    }
                }

                // Also preserve the explicit new format when present.
                var explicit = source.specialAutonomy || {};
                for (var ek in explicit) {
                    if (Object.prototype.hasOwnProperty.call(explicit, ek) && explicit[ek]) {
                        target.specialAutonomy[ek] = explicit[ek];
                    }
                }
            }
        }
    }

    function getSpecialLevels(overlord) {
        var key = String(overlord || '').toUpperCase().trim();
        return SPECIAL_AUTONOMY[key] ? SPECIAL_AUTONOMY[key].slice() : [];
    }

    function getLabel(lang, key) {
        var group = SPECIAL_LABELS[lang] || SPECIAL_LABELS.english;
        return group[key] || key;
    }

    // The generic autonomy system is shared by democratic, communist and
    // non-aligned subjects. Germany and Japan have their own special systems.
    // This keeps the expanded UI small and accurate.
    autonomyLevels = COMMON_AUTONOMY_LEVELS.slice();

    var baseLoadSaved = window.loadSaved;
    window.loadSaved = function (d) {
        baseLoadSaved(d);
        migrateLegacySpecialValues(d);
    };

    var baseSaveData = window.saveData;
    window.saveData = function () {
        ensureSpecialStorage();
        baseSaveData();

        try {
            var saved = JSON.parse(localStorage.getItem('hoi4modData') || '{}');
            saved.puppetRules = saved.puppetRules || [];

            for (var pi = 0; pi < puppetRules.length; pi++) {
                if (!saved.puppetRules[pi]) saved.puppetRules[pi] = {};
                saved.puppetRules[pi].ideologies = saved.puppetRules[pi].ideologies || {};

                for (var ii = 0; ii < ideologies.length; ii++) {
                    var id = ideologies[ii];
                    var src = puppetRules[pi].ideologies[id] || {};
                    saved.puppetRules[pi].ideologies[id] = saved.puppetRules[pi].ideologies[id] || {};
                    saved.puppetRules[pi].ideologies[id].specialAutonomy = src.specialAutonomy || {};
                }
            }

            localStorage.setItem('hoi4modData', JSON.stringify(saved));
        } catch (e) {}
    };

    function renderSpecialAutonomyGroup(body, idx, ideo, data, levels, title) {
        if (!levels.length) return;

        var t = i18n[currentLang];
        var wrap = document.createElement('div');

        var head = document.createElement('div');
        head.className = 'puppet-autonomy-title special-autonomy-title';
        head.textContent = title;
        wrap.appendChild(head);

        var hint = document.createElement('div');
        hint.className = 'section-note puppet-special-hint';
        hint.textContent = getLabel(currentLang, 'specialHint');
        wrap.appendChild(hint);

        var grid = document.createElement('div');
        grid.className = 'dynamic-grid two-col';

        if (!data.specialAutonomy) data.specialAutonomy = {};

        for (var ai = 0; ai < levels.length; ai++) {
            (function (level) {
                var label = getLabel(currentLang, level);
                grid.appendChild(mkGrp(label, data.specialAutonomy[level] || '', function (v) {
                    if (!puppetRules[idx].ideologies[ideo].specialAutonomy) {
                        puppetRules[idx].ideologies[ideo].specialAutonomy = {};
                    }
                    puppetRules[idx].ideologies[ideo].specialAutonomy[level] = v;
                    saveData();
                }));
            })(levels[ai]);
        }

        wrap.appendChild(grid);
        body.appendChild(wrap);
    }

    function renderCommonAutonomyGroup(body, idx, ideo, data) {
        var t = i18n[currentLang];
        var title = document.createElement('div');
        title.className = 'puppet-autonomy-title';
        title.textContent = (SPECIAL_LABELS[currentLang] || SPECIAL_LABELS.english).commonAutonomyTitle;
        body.appendChild(title);

        var grid = document.createElement('div');
        grid.className = 'dynamic-grid two-col';

        for (var ai = 0; ai < COMMON_AUTONOMY_LEVELS.length; ai++) {
            (function (al) {
                var alKey = 'autonomy' + al.charAt(0).toUpperCase() + al.slice(1);
                var alLabel = t[alKey] || al;
                grid.appendChild(mkGrp(alLabel, (data.autonomy && data.autonomy[al]) || '', function (v) {
                    if (!puppetRules[idx].ideologies[ideo].autonomy) {
                        puppetRules[idx].ideologies[ideo].autonomy = {};
                    }
                    puppetRules[idx].ideologies[ideo].autonomy[al] = v;
                    saveData();
                }));
            })(COMMON_AUTONOMY_LEVELS[ai]);
        }

        body.appendChild(grid);
    }

    // Replace the expanded puppet renderer with the smaller common + special UI.
    window.renderPuppetRules = function () {
        var box = document.getElementById('puppet-rules-container');
        if (!box) return;
        ensureSpecialStorage();
        box.innerHTML = '';
        var t = i18n[currentLang];

        for (var i = 0; i < puppetRules.length; i++) {
            (function (idx) {
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
                    rb.onclick = function () { removePuppetRule(idx); };
                    hdr.appendChild(rb);
                }
                card.appendChild(hdr);

                var metaGrid = document.createElement('div');
                metaGrid.className = 'dynamic-grid three-col';
                metaGrid.appendChild(mkGrp(t.puppetOverlord, r.overlord, function (v) {
                    puppetRules[idx].overlord = v.toUpperCase();
                    ensureSpecialStorage();
                    saveData();
                    renderPuppetRules();
                }));
                metaGrid.appendChild(mkGrp(t.puppetTag, r.tag, function (v) {
                    puppetRules[idx].tag = v.toUpperCase();
                    saveData();
                }));

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
                optE.selected = r.mode === 'expanded';
                optS.selected = !optE.selected;
                modeSel.appendChild(optS);
                modeSel.appendChild(optE);
                modeSel.onchange = function () {
                    puppetRules[idx].mode = this.value;
                    saveData();
                    renderPuppetRules();
                };
                modeGrp.appendChild(modeLabel);
                modeGrp.appendChild(modeSel);
                metaGrid.appendChild(modeGrp);
                card.appendChild(metaGrid);

                if (r.mode === 'short' || !r.mode) {
                    for (var ii = 0; ii < ideologies.length; ii++) {
                        (function (ideo) {
                            var data = r.ideologies[ideo] || { name: '', img: null, autonomy: {}, specialAutonomy: {} };
                            var ideoTitle = document.createElement('div');
                            ideoTitle.className = 'puppet-ideo-head';
                            ideoTitle.textContent = t[ideo];
                            card.appendChild(ideoTitle);

                            card.appendChild(mkGrp(t.puppetShortName, data.name || '', function (v) {
                                puppetRules[idx].ideologies[ideo].name = v;
                                puppetRules[idx].shortName = v;
                                saveData();
                            }));

                            addPuppetIdeologyFlag(card, idx, ideo, r, t);
                        })(ideologies[ii]);
                    }
                } else {
                    var specialLevels = getSpecialLevels(r.overlord);

                    for (var jj = 0; jj < ideologies.length; jj++) {
                        (function (ideo) {
                            var data = r.ideologies[ideo] || { name: '', img: null, autonomy: {}, specialAutonomy: {} };
                            if (!data.autonomy) data.autonomy = {};
                            if (!data.specialAutonomy) data.specialAutonomy = {};

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
                            head.onclick = function () { sec.classList.toggle('collapsed'); };

                            body.appendChild(mkGrp(t.puppetNameForIdeology, data.name || '', function (v) {
                                puppetRules[idx].ideologies[ideo].name = v;
                                saveData();
                            }));
                            addPuppetIdeologyFlag(body, idx, ideo, r, t);

                            renderCommonAutonomyGroup(body, idx, ideo, data);

                            if (specialLevels.length) {
                                var specialTitle = specialLevels[0] === 'satellite'
                                    ? (SPECIAL_LABELS[currentLang] || SPECIAL_LABELS.english).germanySpecial
                                    : (SPECIAL_LABELS[currentLang] || SPECIAL_LABELS.english).japanSpecial;
                                renderSpecialAutonomyGroup(body, idx, ideo, data, specialLevels, specialTitle);
                            }

                            sec.appendChild(head);
                            sec.appendChild(body);
                            card.appendChild(sec);
                        })(ideologies[jj]);
                    }
                }

                box.appendChild(card);
            })(i);
        }
    };

    // Correct the ROOT / FROM.FROM usage and reset behaviour for dynamic state
    // and victory-point names. In this on_action ROOT is the new controller and
    // FROM.FROM is the state object.
    window.buildOnActions = function (sRules, cRules) {
        var states = {};
        var cities = {};

        for (var i = 0; i < sRules.length; i++) {
            var sr = sRules[i];
            var sid = String(sr.stateId || '').trim();
            var tag = String(sr.controllerTag || '').toUpperCase().trim();
            var name = String(sr.name || '').trim();
            if (!/^\d+$/.test(sid) || !tag || !name) continue;
            if (!states[sid]) states[sid] = [];
            states[sid].push({ tag: tag, loc: tag + '_STATE_' + sid });
        }

        for (var j = 0; j < cRules.length; j++) {
            var cr = cRules[j];
            var csid = String(cr.stateId || '').trim();
            var pid = String(cr.provinceId || '').trim();
            var ctag = String(cr.controllerTag || '').toUpperCase().trim();
            var cname = String(cr.name || '').trim();
            if (!/^\d+$/.test(csid) || !/^\d+$/.test(pid) || !ctag || !cname) continue;
            if (!cities[csid]) cities[csid] = {};
            if (!cities[csid][pid]) cities[csid][pid] = [];
            cities[csid][pid].push({ tag: ctag, loc: ctag + '_VICTORY_POINTS_' + pid });
        }

        var stateIds = Object.keys(states);
        var cityStateIds = Object.keys(cities);
        if (!stateIds.length && !cityStateIds.length) return '';

        var lines = [
            'on_actions = {',
            '    on_state_control_changed = {',
            '        effect = {'
        ];

        var allStateIds = {};
        for (var a = 0; a < stateIds.length; a++) allStateIds[stateIds[a]] = true;
        for (var b = 0; b < cityStateIds.length; b++) allStateIds[cityStateIds[b]] = true;

        var allIds = Object.keys(allStateIds);
        for (var si = 0; si < allIds.length; si++) {
            var stateId = allIds[si];
            lines.push('            # State ' + stateId);
            lines.push('            if = {');
            lines.push('                limit = { FROM.FROM = { state = ' + stateId + ' } }');

            // State name: one matching controller, otherwise restore vanilla name.
            if (states[stateId] && states[stateId].length) {
                for (var ri = 0; ri < states[stateId].length; ri++) {
                    var rule = states[stateId][ri];
                    lines.push('                if = {');
                    lines.push('                    limit = { tag = ' + rule.tag + ' }');
                    lines.push('                    FROM.FROM = { set_state_name = ' + rule.loc + ' }');
                    lines.push('                }');
                }
                lines.push('                else = { FROM.FROM = { reset_state_name = yes } }');
            }

            // City name: group each province so only a non-matching controller
            // resets that province. This avoids a later rule wiping out a match.
            var provinceIds = cities[stateId] ? Object.keys(cities[stateId]) : [];
            for (var ci = 0; ci < provinceIds.length; ci++) {
                var provinceId = provinceIds[ci];
                var cityRules = cities[stateId][provinceId];
                for (var mi = 0; mi < cityRules.length; mi++) {
                    var cityRule = cityRules[mi];
                    lines.push('                if = {');
                    lines.push('                    limit = { tag = ' + cityRule.tag + ' }');
                    lines.push('                    FROM.FROM = { set_province_name = { id = ' + provinceId + ' name = ' + cityRule.loc + ' } }');
                    lines.push('                }');
                }
                lines.push('                else = { FROM.FROM = { reset_province_name = ' + provinceId + ' } }');
            }

            lines.push('            }');
        }

        lines.push('        }');
        lines.push('    }');
        lines.push('}');
        return lines.join('\n');
    };

    // Inject country-specific autonomy names into the existing generator only
    // while it builds the ZIP. The UI still shows just the common four levels,
    // while GER/JAP fields are emitted using the actual HoI4 autonomy IDs.
    var baseGenerateMod = window.generateMod;
    window.generateMod = function () {
        ensureSpecialStorage();
        var oldLevels = autonomyLevels.slice();
        var used = {};
        var levels = COMMON_AUTONOMY_LEVELS.slice();

        for (var pi = 0; pi < puppetRules.length; pi++) {
            var p = puppetRules[pi];
            var specials = getSpecialLevels(p.overlord);
            for (var si = 0; si < specials.length; si++) used[specials[si]] = true;
            for (var ii = 0; ii < ideologies.length; ii++) {
                var id = ideologies[ii];
                var data = p.ideologies[id];
                if (!data) continue;
                if (!data.autonomy) data.autonomy = {};
                if (!data.specialAutonomy) data.specialAutonomy = {};
                for (var li = 0; li < specials.length; li++) {
                    var key = specials[li];
                    data.autonomy[key] = data.specialAutonomy[key] || '';
                }
            }
        }

        for (var key in used) {
            if (Object.prototype.hasOwnProperty.call(used, key)) levels.push(key);
        }
        autonomyLevels = levels;

        return Promise.resolve(baseGenerateMod()).finally(function () {
            autonomyLevels = oldLevels;
            // Keep the actual special values in their dedicated storage and do
            // not leave temporary generator fields behind.
            for (var pi2 = 0; pi2 < puppetRules.length; pi2++) {
                for (var ii2 = 0; ii2 < ideologies.length; ii2++) {
                    var d = puppetRules[pi2].ideologies[ideologies[ii2]];
                    if (!d || !d.specialAutonomy) continue;
                    for (var sk in d.specialAutonomy) {
                        if (Object.prototype.hasOwnProperty.call(d.specialAutonomy, sk)) {
                            if (d.autonomy) delete d.autonomy[sk];
                        }
                    }
                }
            }
        });
    };
})();
