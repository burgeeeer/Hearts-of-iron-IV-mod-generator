/* Puppet cosmetic-tag, flag, and city-name compatibility fix. */
(function () {
    var COMMON_LEVELS = ['integrated_puppet', 'puppet', 'colony', 'dominion'];
    var SPECIAL_LEVELS = {
        GER: ['satellite', 'reichsprotectorate', 'reichskommissariat'],
        JAP: ['wtt_imperial_subject', 'wtt_imperial_protectorate', 'wtt_imperial_associate']
    };

    function levelsFor(overlord) {
        var key = String(overlord || '').toUpperCase().trim();
        return COMMON_LEVELS.concat(SPECIAL_LEVELS[key] || []);
    }

    function addLoc(lines, key, value) {
        lines.push(' ' + key + ':0 "' + String(value).replace(/"/g, '\\"') + '"');
    }

    function allFlagNames(tag, overlord, ideology) {
        var base = tag + '_' + overlord + '_' + ideology;
        var names = [
            base + '.tga',
            tag + '_' + overlord + '.tga',
            tag + '_' + overlord + '_subject.tga',
            base + '_subject.tga'
        ];
        var levels = levelsFor(overlord);
        for (var i = 0; i < levels.length; i++) {
            names.push(tag + '_' + overlord + '_autonomy_' + levels[i] + '.tga');
            names.push(base + '_autonomy_' + levels[i] + '.tga');
            names.push(tag + '_' + overlord + '_subject_autonomy_' + levels[i] + '.tga');
            names.push(base + '_subject_autonomy_' + levels[i] + '.tga');
        }
        return names;
    }

    function buildCosmeticOnActions() {
        var lines = ['on_actions = {'];

        for (var pi = 0; pi < puppetRules.length; pi++) {
            var p = puppetRules[pi];
            var overlord = String(p.overlord || '').toUpperCase().trim();
            var tag = String(p.tag || '').toUpperCase().trim();
            if (!overlord || !tag) continue;

            var levels = levelsFor(overlord);

            lines.push('    on_puppet = {');
            lines.push('        effect = {');
            lines.push('            if = {');
            lines.push('                limit = { AND = { tag = ' + tag + ' FROM = { tag = ' + overlord + ' } } }');
            lines.push('                set_cosmetic_tag = ' + tag + '_' + overlord);
            lines.push('            }');
            lines.push('        }');
            lines.push('    }');

            lines.push('    on_subject_autonomy_level_change = {');
            lines.push('        effect = {');
            lines.push('            if = {');
            lines.push('                limit = { AND = { tag = ' + tag + ' FROM = { tag = ' + overlord + ' } } }');
            for (var li = 0; li < levels.length; li++) {
                lines.push('                if = {');
                lines.push('                    limit = { has_autonomy_state = autonomy_' + levels[li] + ' }');
                lines.push('                    set_cosmetic_tag = ' + tag + '_' + overlord + '_autonomy_' + levels[li]);
                lines.push('                }');
            }
            lines.push('            }');
            lines.push('        }');
            lines.push('    }');

            lines.push('    on_subject_free = {');
            lines.push('        effect = {');
            lines.push('            if = {');
            lines.push('                limit = { AND = { tag = ' + tag + ' FROM = { tag = ' + overlord + ' } } }');
            lines.push('                drop_cosmetic_tag = yes');
            lines.push('            }');
            lines.push('        }');
            lines.push('    }');
        }

        lines.push('}');
        return lines.join('\n');
    }

    function addCityLocalization(root) {
        if (!cityNameRules || !cityNameRules.length) return;

        var lang = currentLang === 'russian' ? 'russian' : 'english';
        var lines = ['l_' + lang + ':'];
        var valid = false;

        for (var i = 0; i < cityNameRules.length; i++) {
            var r = cityNameRules[i];
            var stateId = String(r.stateId || '').trim();
            var provinceId = String(r.provinceId || '').trim();
            var tag = String(r.controllerTag || '').toUpperCase().trim();
            var name = String(r.name || '').trim();
            if (!/^\\d+$/.test(stateId) || !/^\\d+$/.test(provinceId) || !tag || !name) continue;
            addLoc(lines, tag + '_VICTORY_POINTS_' + provinceId, name);
            valid = true;
        }

        if (valid) {
            root.folder('localisation/replace/' + lang).file(
                'victory_points_generated_l_' + lang + '.yml',
                new Blob(['\\uFEFF' + lines.join('\\n') + '\\n'], { type: 'text/plain;charset=utf-8' })
            );
        }
    }

    var baseGenerate = window.generateMod;
    var originalSaveAs = window.saveAs;

    window.generateMod = async function () {
        var captured = null;
        var capturedName = '';

        window.saveAs = function (blob, name) {
            captured = blob;
            capturedName = name || 'CustomMod.zip';
        };

        try {
            await baseGenerate();
        } finally {
            window.saveAs = originalSaveAs;
        }

        if (!captured) return;

        try {
            var zip = await JSZip.loadAsync(captured);
            var rootName = (document.getElementById('modName').value.trim() || 'CustomMod');
            var root = zip.folder(rootName);
            var flags = root.folder('gfx/flags');
            var medium = root.folder('gfx/flags/medium');
            var small = root.folder('gfx/flags/small');

            for (var pi = 0; pi < puppetRules.length; pi++) {
                var p = puppetRules[pi];
                var ov = String(p.overlord || '').toUpperCase().trim();
                var tag = String(p.tag || '').toUpperCase().trim();
                if (!ov || !tag) continue;

                for (var ii = 0; ii < ideologies.length; ii++) {
                    var ideology = ideologies[ii];
                    var baseName = tag + '_' + ov + '_' + ideology + '.tga';
                    var baseFile = flags.file(baseName);
                    if (!baseFile) continue;

                    var bytes = await baseFile.async('uint8array');
                    var medFile = medium.file(baseName);
                    var smallFile = small.file(baseName);
                    var medBytes = medFile ? await medFile.async('uint8array') : null;
                    var smallBytes = smallFile ? await smallFile.async('uint8array') : null;
                    var names = allFlagNames(tag, ov, ideology);

                    for (var ni = 0; ni < names.length; ni++) {
                        var name = names[ni];
                        flags.file(name, bytes);
                        if (medBytes) medium.file(name, medBytes);
                        if (smallBytes) small.file(name, smallBytes);
                    }
                }
            }

            var onActions = buildCosmeticOnActions();
            if (onActions) {
                root.folder('common/on_actions').file('puppet_cosmetic_tags.txt', onActions + '\n');
            }

            // The original generator always wrote city localization to Russian.
            // Add the selected language too, so English mode actually resolves
            // TAG_VICTORY_POINTS_<province> in the generated on_action.
            addCityLocalization(root);

            var result = await zip.generateAsync({ type: 'blob' });
            originalSaveAs(result, capturedName);
        } catch (e) {
            originalSaveAs(captured, capturedName);
        }
    };
})();
