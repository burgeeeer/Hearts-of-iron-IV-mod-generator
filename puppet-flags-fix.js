/* Add autonomy-specific copies of uploaded puppet flags. */
(function () {
    var baseGenerate = window.generateMod;
    var originalSaveAs = window.saveAs;

    var specialLevels = {
        GER: ['satellite', 'reichsprotectorate', 'reichskommissariat'],
        JAP: ['wtt_imperial_subject', 'wtt_imperial_protectorate', 'wtt_imperial_associate']
    };

    function levelsFor(overlord) {
        var key = String(overlord || '').toUpperCase().trim();
        return specialLevels[key] || [];
    }

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
            var flags = zip.folder(rootName).folder('gfx/flags');
            var medium = zip.folder(rootName).folder('gfx/flags/medium');
            var small = zip.folder(rootName).folder('gfx/flags/small');

            for (var pi = 0; pi < puppetRules.length; pi++) {
                var p = puppetRules[pi];
                var ov = String(p.overlord || '').toUpperCase().trim();
                var tag = String(p.tag || '').toUpperCase().trim();
                if (!ov || !tag) continue;

                var levels = ['integrated_puppet', 'puppet', 'colony', 'dominion'].concat(levelsFor(ov));
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

                    for (var li = 0; li < levels.length; li++) {
                        var suffix = '_autonomy_' + levels[li];
                        flags.file(tag + '_' + ov + '_' + ideology + suffix + '.tga', bytes);
                        if (medBytes) medium.file(tag + '_' + ov + '_' + ideology + suffix + '.tga', medBytes);
                        if (smallBytes) small.file(tag + '_' + ov + '_' + ideology + suffix + '.tga', smallBytes);
                    }
                }
            }

            var result = await zip.generateAsync({ type: 'blob' });
            originalSaveAs(result, capturedName);
        } catch (e) {
            // Never block normal mod generation if the optional flag-copy step fails.
            originalSaveAs(captured, capturedName);
        }
    };
})();
