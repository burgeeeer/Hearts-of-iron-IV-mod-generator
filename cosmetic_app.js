/* =============================================
   HoI4 Cosmetic Tag Creator — app.js
   Full single-page layout matching burgeeeer/mod-generator:
   - 4 canonical HoI4 ideologies (Democratic, Fascism, Communism, Neutrality)
   - Auto TGA flag converter (82x52, 41x26, 10x7)
   - Decision scope: single country or all countries
   - Decision category: default form_country_category or custom
   - Triggers cheat-sheet modal with 1-click insert
   - Project manager (.json save/load, browser library, auto-save on change and exit)
   - HoI4 1.19.*
   ============================================= */

(function() {
'use strict';

// ─── TRANSLATIONS ─────────────────────────────
const I18N = {
  ru: {
    header_sub: 'Генератор модов со сменой названий, флагов и решений',
    proj_label: 'Проект:',
    autosave_on: '● Сохранено',
    btn_save_proj: 'Сохранить в файл',
    btn_load_proj: 'Загрузить из файла',
    btn_lib_proj: 'Мои проекты',
    btn_new_proj: '+ Новый',
    step4_title: 'Сборка и файлы мода',
    s1_head: 'Данные мода',
    s1_desc: 'Параметры дескриптора для лаунчера Hearts of Iron IV',
    f_modname: 'Название мода',
    f_modname_h: 'Отображается в списке модов лаунчера HoI4',
    f_ver: 'Версия мода',
    f_author: 'Автор',
    f_hoi4ver: 'Версия HoI4',
    f_hoi4ver_h: 'Актуальная поддерживаемая версия: 1.19.*',
    f_moddesc: 'Описание мода',
    f_moddesc_ph: 'Краткое описание мода для лаунчера...',
    f_cosm_loc_filename: 'Файл локализации решений и косметики',
    f_cosm_loc_filename_h: 'Полное имя файла локализации (например: strana.yml или mod_l_russian.yml). По умолчанию: [id_мода]_l_russian.yml.',
    s2_scope_head: 'Доступность решения (Для кого)',
    s2_scope_desc: 'Выберите, кто может принять решение о создании страны: одна страна, несколько стран или любая страна мира',
    scope_specific_t: 'Выбранные страны (одна или несколько)',
    scope_specific_d: 'Решение появится у указанных стран (например: POL или POL, LIT, BLR)',
    scope_single_t: 'Выбранные страны (одна или несколько)',
    scope_single_d: 'Решение появится у указанных стран (например: POL или POL, LIT, BLR)',
    scope_all_t: 'У всех стран мира',
    scope_all_d: 'Решение доступно любой державе, выполнившей территориальные условия',
    f_owner: 'Теги стран-владельцев (одна или несколько через запятую/пробел)',
    f_owner_h: 'Укажите 3-буквенные теги стран через запятую или пробел (например: POL или POL, LIT или GEO, ARM, AZR)',
    f_cosmetic: 'Косметический тег (Новый тег)',
    f_cosmetic_h: 'Идентификатор косметического тега (например, POL_LITHUANIA, GEO_TRANSCAUCASIA)',
    s2_cat_head: 'Категория решений',
    s2_cat_desc: 'Где отобразится решение в интерфейсе решений игры',
    cat_form_t: 'Категория «Создание государств» (По умолчанию)',
    cat_form_d: 'Стандартная категория HoI4 (form_country_category) для объединения земель и реставрации империй',
    cat_custom_t: 'Создать отдельную новую категорию',
    cat_custom_d: 'Выделит решение в персональную категорию с собственным заголовком',
    f_custom_cat_id: 'ID новой категории',
    f_custom_cat_name: 'Название категории (в игре)',
    s2_dec_head: 'Параметры и требования решения',
    s2_dec_desc: 'Название, описание, затраты политической силы и условия',
    f_cost: 'Стоимость (PP)',
    f_days: 'Дней на выполнение (0 = мгновенно)',
    f_removedays: 'Отменяется через (дней, 0 = нет)',
    f_decname: 'Название решения',
    f_decname_ph: 'Например: Восстановить Речь Посполитую',
    f_decdesc: 'Описание решения',
    f_decdesc_ph: 'Текст описания в меню решений...',
    s2_trig_head: 'Требования к выполнению (Триггеры)',
    s2_trig_desc: 'Условия, которые должна выполнить страна для нажатия кнопки решения',
    btn_add_trigger: '+ Добавить условие вручную',
    btn_show_cheat: 'Все доступные требования (справочник HoI4)',
    s2_rewards_head: 'Награды и эффекты после выполнения (Баффы)',
    s2_rewards_desc: 'Что произойдет после принятия решения: национализация территорий, перенос столицы, бонусы и эффекты',
    f_core_states: 'Национальные регионы (Core States IDs)',
    f_core_states_h: 'Укажите ID регионов через запятую или пробел (например: 10, 11, 85, 110, 142). Все они станут нац. территориями (add_core_of = ROOT).',
    f_new_capital: 'Новая столица (State ID, опционально)',
    f_new_capital_h: 'ID региона, куда перенесется столица (set_capital = { state = ID }). Оставьте пустым, если не нужно.',
    f_quick_buffs_head: 'Быстрые бонусы и ресурсы',
    f_reward_pp: 'Политическая сила (PP)',
    f_reward_stab: 'Стабильность (+% / -%)',
    f_reward_ws: 'Поддержка войны (+% / -%)',
    f_reward_mp: 'Призывники (Manpower)',
    f_custom_eff_head: 'Дополнительные эффекты и награды',
    btn_add_effect: '+ Добавить эффект вручную',
    btn_show_cheat_effects: 'Все доступные награды и баффы (справочник HoI4)',
    effects_modal_title: 'Доступные награды и эффекты (HoI4 Effects)',
    s3_color_head: 'Цвет страны на карте',
    s3_color_desc: 'Цвет границ и территории при принятии косметического тега',
    f_r: 'Красный (0–255)',
    f_g: 'Зелёный (0–255)',
    f_b: 'Синий (0–255)',
    s3_ideo_head: 'Названия и флаги по 4 идеологиям HoI4',
    s3_ideo_desc: 'В Hearts of Iron IV строго 4 идеологии: Демократия, Фашизм, Коммунизм и Нейтралитет. Задайте названия и загрузите флаги (PNG/JPG). Сайт автоматически конвертирует их в 32-битный TGA и подгонит под все 3 разрешения: 82×52, 41×26 и 10×7!',
    f_cname_dem: 'Демократическое название',
    f_cadj_dem: 'Демократическое прилагательное',
    flag_upload_dem: 'Загрузить флаг демократии (PNG/JPG)',
    f_cname_fas: 'Фашистское название',
    f_cadj_fas: 'Фашистское прилагательное',
    flag_upload_fas: 'Загрузить флаг фашизма (PNG/JPG)',
    f_cname_com: 'Коммунистическое название',
    f_cadj_com: 'Коммунистическое прилагательное',
    flag_upload_com: 'Загрузить флаг коммунизма (PNG/JPG)',
    f_cname_neu: 'Нейтральное / монархическое название',
    f_cadj_neu: 'Нейтральное прилагательное',
    flag_upload_neu: 'Загрузить флаг нейтралитета (PNG/JPG)',
    flag_upload_hint: 'Автоматически масштабируется и конвертируется в TGA',
    btn_clear_flag: 'Удалить флаг',
    s3_pic_head: 'Иконка решения (Опционально)',
    s3_pic_desc: 'Иконка в меню решений HoI4 (по умолчанию: generic_form_nation)',
    f_picname: 'Имя спрайта или иконки',
    f_picname_h: 'По умолчанию: generic_form_nation. Картинка автоматически масштабируется в 32×32 TGA и регистрируется в .gfx',
    f_picupload: 'Загрузить картинку иконки (PNG/JPG)',
    btn_clear_dec_img: 'Удалить иконку',
    btn_generate: 'Сгенерировать файлы мода',
    btn_download: 'Скачать ZIP-архив с флагами',
    tab_summary: 'Сводка',
    tab_struct: 'Структура архива',
    btn_copy: 'Копировать',
    sum_empty: '← Нажмите «Сгенерировать файлы мода», чтобы выполнить сборку и просмотреть код',
    footer_text: 'Hearts of Iron IV Mod Generator · Cosmetic Tag Creator · Version 1.19.*',
    cheat_modal_title: 'Доступные требования (Триггеры HoI4)',
    lib_modal_title: 'Мои сохранённые проекты',
    lib_modal_desc: 'Локальная библиотека проектов в вашем браузере',
    btn_save_to_lib: '+ Сохранить текущий проект в библиотеку',
    btn_close: 'Закрыть',
    copied_toast: 'Скопировано в буфер обмена!',
    saved_toast: 'Проект сохранён в файл!',
    lib_saved_toast: 'Проект добавлен в библиотеку!',
    loaded_toast: 'Проект успешно загружен!',
    generated_toast: 'Мод успешно сгенерирован!',
    download_toast: 'ZIP-архив скачивается...',
    val_modname: 'Название мода',
    val_owner: 'Укажите хотя бы один 3-буквенный тег страны-владельца (например: POL или POL, LIT)',
    val_cosmetic: 'Косметический тег',
    val_decname: 'Название решения',
    val_custom_cat: 'ID новой категории',
    val_ideo_one: 'Укажите название хотя бы для одной из 4 идеологий'
  },
  en: {
    header_sub: 'Mod generator with country names, flags, and decisions',
    proj_label: 'Project:',
    autosave_on: '● Saved',
    btn_save_proj: 'Save to File',
    btn_load_proj: 'Load from File',
    btn_lib_proj: 'My Projects',
    btn_new_proj: '+ New',
    step4_title: 'Build & Mod Files',
    s1_head: 'Mod Information',
    s1_desc: 'Descriptor metadata for the Hearts of Iron IV launcher',
    f_modname: 'Mod Name',
    f_modname_h: 'Displayed in the HoI4 launcher mod list',
    f_ver: 'Mod Version',
    f_author: 'Author',
    f_hoi4ver: 'HoI4 Version',
    f_hoi4ver_h: 'Current supported game version: 1.19.*',
    f_moddesc: 'Mod Description',
    f_moddesc_ph: 'Short description for the launcher...',
    s2_scope_head: 'Decision Scope (Who can form it)',
    s2_scope_desc: 'Choose whether specified nation(s) or any nation worldwide can enact this decision',
    scope_specific_t: 'Selected Countries (one or multiple)',
    scope_specific_d: 'The decision appears for specified nations (e.g. POL or POL, LIT, BLR)',
    scope_single_t: 'Selected Countries (one or multiple)',
    scope_single_d: 'The decision appears for specified nations (e.g. POL or POL, LIT, BLR)',
    scope_all_t: 'All Nations (Any Country)',
    scope_all_d: 'Available to any country in the world that fulfills the territorial requirements',
    f_owner: 'Owner Country Tags (one or multiple separated by comma/space)',
    f_owner_h: 'Enter 3-letter country tags separated by comma or space (e.g. POL or POL, LIT or GEO, ARM, AZR)',
    f_cosmetic: 'Cosmetic Tag ID',
    f_cosmetic_h: 'Cosmetic identifier (e.g. POL_LITHUANIA, GEO_TRANSCAUCASIA)',
    s2_cat_head: 'Decision Category',
    s2_cat_desc: 'Where the decision appears in the in-game decision tab',
    cat_form_t: 'Formable Nations Category (Default)',
    cat_form_d: 'Standard HoI4 category (form_country_category) for unifications and empire restorations',
    cat_custom_t: 'Create a Separate New Category',
    cat_custom_d: 'Places the decision inside a dedicated category with its own title',
    f_custom_cat_id: 'New Category ID',
    f_custom_cat_name: 'Category Name (in-game)',
    s2_dec_head: 'Decision Settings & Triggers',
    s2_dec_desc: 'Title, description, political power cost and conditions',
    f_cost: 'Cost (PP)',
    f_days: 'Days to Complete (0 = instant)',
    f_removedays: 'Cancels After (days, 0 = never)',
    f_decname: 'Decision Name',
    f_decname_ph: 'e.g. Restore the Polish-Lithuanian Commonwealth',
    f_decdesc: 'Decision Description',
    f_decdesc_ph: 'Description text seen in the decisions menu...',
    s2_trig_head: 'Completion Requirements (Triggers)',
    s2_trig_desc: 'Requirements needed for the country to enact the decision',
    btn_add_trigger: '+ Add Condition Manually',
    btn_show_cheat: 'All Available Requirements (HoI4 Cheat-Sheet)',
    s2_rewards_head: 'Rewards & Buffs Upon Enactment',
    s2_rewards_desc: 'What happens after enacting the decision: national cores, capital move, stat buffs and custom effects',
    f_core_states: 'National Core States (IDs)',
    f_core_states_h: 'Enter state IDs separated by comma or space (e.g. 10, 11, 85, 110, 142). All will become cores of ROOT.',
    f_new_capital: 'New Capital (State ID, optional)',
    f_new_capital_h: 'State ID where capital will be relocated (set_capital = { state = ID }). Leave empty if unchanged.',
    f_quick_buffs_head: 'Quick Buffs & Resources',
    f_reward_pp: 'Political Power (PP)',
    f_reward_stab: 'Stability (+% / -%)',
    f_reward_ws: 'War Support (+% / -%)',
    f_reward_mp: 'Manpower',
    f_custom_eff_head: 'Additional Effects & Rewards',
    btn_add_effect: '+ Add Effect Manually',
    btn_show_cheat_effects: 'All Available Rewards & Buffs (HoI4 Cheat-Sheet)',
    effects_modal_title: 'Available Rewards & Buffs (HoI4 Effects)',
    s3_color_head: 'Country Map Color',
    s3_color_desc: 'Color of territory and borders on the political map',
    f_r: 'Red (0–255)',
    f_g: 'Green (0–255)',
    f_b: 'Blue (0–255)',
    s3_ideo_head: 'Names & Flags for the 4 HoI4 Ideologies',
    s3_ideo_desc: 'Hearts of Iron IV has strictly 4 ideologies: Democratic, Fascism, Communism and Neutrality. Enter names and upload flags (PNG/JPG). The site automatically converts them to 32-bit TGA in all 3 HoI4 dimensions: 82×52, 41×26 and 10×7!',
    f_cname_dem: 'Democratic Name',
    f_cadj_dem: 'Democratic Adjective',
    flag_upload_dem: 'Upload Democratic Flag (PNG/JPG)',
    f_cname_fas: 'Fascist Name',
    f_cadj_fas: 'Fascist Adjective',
    flag_upload_fas: 'Upload Fascist Flag (PNG/JPG)',
    f_cname_com: 'Communist Name',
    f_cadj_com: 'Communist Adjective',
    flag_upload_com: 'Upload Communist Flag (PNG/JPG)',
    f_cname_neu: 'Neutral / Monarchist Name',
    f_cadj_neu: 'Neutral Adjective',
    flag_upload_neu: 'Upload Neutral Flag (PNG/JPG)',
    flag_upload_hint: 'Automatically scaled and converted into 32-bit TGA',
    btn_clear_flag: 'Remove Flag',
    s3_pic_head: 'Decision Icon (Optional)',
    s3_pic_desc: 'Icon shown in the HoI4 decisions tab (default: generic_form_nation)',
    f_picname: 'Icon or Sprite Name',
    f_picname_h: 'Default: generic_form_nation. Uploaded image is automatically resized to 32×32 TGA and registered in .gfx',
    f_picupload: 'Upload Icon Image (PNG/JPG)',
    btn_clear_dec_img: 'Remove Icon',
    btn_generate: 'Generate Mod Files',
    btn_download: 'Download ZIP with TGA Flags',
    tab_summary: 'Summary',
    tab_struct: 'Archive Structure',
    btn_copy: 'Copy',
    sum_empty: '← Click "Generate Mod Files" to assemble the mod and inspect code',
    footer_text: 'Hearts of Iron IV Mod Generator · Cosmetic Tag Creator · Version 1.19.*',
    cheat_modal_title: 'Available Requirements (HoI4 Triggers Cheat-Sheet)',
    lib_modal_title: 'Saved Projects Library',
    lib_modal_desc: 'Local browser storage for your projects',
    btn_save_to_lib: '+ Save Current Project to Library',
    btn_close: 'Close',
    copied_toast: 'Copied to clipboard!',
    saved_toast: 'Project saved to JSON file!',
    lib_saved_toast: 'Project added to library!',
    loaded_toast: 'Project loaded successfully!',
    generated_toast: 'Mod generated successfully!',
    download_toast: 'Downloading ZIP archive...',
    val_modname: 'Mod Name',
    val_owner: 'Please specify at least one valid 3-letter owner tag (e.g. POL or POL, LIT)',
    val_cosmetic: 'Cosmetic Tag ID',
    val_decname: 'Decision Name',
    val_custom_cat: 'New Category ID',
    val_ideo_one: 'Please fill in a country name for at least one of the 4 ideologies'
  }
};

// ─── TRIGGERS CHEAT-SHEET DATA ────────────────
const CHEAT_TRIGGERS = [
  {
    "category": {
      "ru": "Территории, регионы и границы",
      "en": "Territories, States & Borders"
    },
    "items": [
      {
        "code": "controls_state = 123",
        "desc": {
          "ru": "Контролирует регион с ID 123",
          "en": "Controls state with ID 123"
        }
      },
      {
        "code": "owns_state = 123",
        "desc": {
          "ru": "Владеет регионом с ID 123 (де-юре)",
          "en": "Owns state with ID 123"
        }
      },
      {
        "code": "all_core_state = { controls_state = yes }",
        "desc": {
          "ru": "Контролирует все свои национальные регионы",
          "en": "Controls all of its core states"
        }
      },
      {
        "code": "has_full_control_of_state = 123",
        "desc": {
          "ru": "Полный контроль над регионом 123 (без оккупантов)",
          "en": "Has full control of state 123"
        }
      },
      {
        "code": "controls_province = 456",
        "desc": {
          "ru": "Контролирует конкретную провинцию 456",
          "en": "Controls province 456"
        }
      },
      {
        "code": "owns_province = 456",
        "desc": {
          "ru": "Владеет конкретной провинцией 456",
          "en": "Owns province 456"
        }
      },
      {
        "code": "123 = { is_core_of = ROOT }",
        "desc": {
          "ru": "Регион 123 является национальным (core) для ROOT",
          "en": "State 123 is a core of ROOT"
        }
      },
      {
        "code": "123 = { is_claimed_by = ROOT }",
        "desc": {
          "ru": "ROOT имеет претензию (claim) на регион 123",
          "en": "ROOT has a claim on state 123"
        }
      },
      {
        "code": "123 = { is_coastal = yes }",
        "desc": {
          "ru": "Регион 123 имеет выход к морю (прибрежный)",
          "en": "State 123 has coastal access"
        }
      },
      {
        "code": "num_of_controlled_states > 15",
        "desc": {
          "ru": "Контролирует более 15 регионов",
          "en": "Controls more than 15 states"
        }
      },
      {
        "code": "num_of_owned_states > 15",
        "desc": {
          "ru": "Владеет более чем 15 регионами",
          "en": "Owns more than 15 states"
        }
      },
      {
        "code": "capital_scope = { state = 123 }",
        "desc": {
          "ru": "Столица государства находится в регионе 123",
          "en": "Capital of the country is in state 123"
        }
      },
      {
        "code": "any_neighbor_country = { tag = GER }",
        "desc": {
          "ru": "Граничит со страной с тегом GER",
          "en": "Directly neighbors country GER"
        }
      },
      {
        "code": "123 = { infrastructure > 3 }",
        "desc": {
          "ru": "Инфраструктура региона 123 выше 3 уровня",
          "en": "State 123 infrastructure is above level 3"
        }
      },
      {
        "code": "123 = { resistance < 10 }",
        "desc": {
          "ru": "Сопротивление в регионе 123 ниже 10%",
          "en": "State 123 resistance is below 10%"
        }
      },
      {
        "code": "123 = { compliance > 50 }",
        "desc": {
          "ru": "Подчинение населения в регионе 123 выше 50%",
          "en": "State 123 compliance is above 50%"
        }
      }
    ]
  },
  {
    "category": {
      "ru": "Политика, идеология и суверенитет",
      "en": "Politics, Ideology & Sovereignty"
    },
    "items": [
      {
        "code": "is_puppet = no",
        "desc": {
          "ru": "Не является марионеткой (независимое государство)",
          "en": "Is not a puppet"
        }
      },
      {
        "code": "is_subject = no",
        "desc": {
          "ru": "Не является чьим-либо субъектом",
          "en": "Is not a subject"
        }
      },
      {
        "code": "is_puppet = yes",
        "desc": {
          "ru": "Является марионеткой",
          "en": "Is a puppet"
        }
      },
      {
        "code": "is_puppet_of = GER",
        "desc": {
          "ru": "Является марионеткой конкретной державы (GER)",
          "en": "Is a puppet of GER"
        }
      },
      {
        "code": "has_government = democratic",
        "desc": {
          "ru": "Правящая партия — Демократия",
          "en": "Ruling party is Democratic"
        }
      },
      {
        "code": "has_government = fascism",
        "desc": {
          "ru": "Правящая партия — Фашизм",
          "en": "Ruling party is Fascism"
        }
      },
      {
        "code": "has_government = communism",
        "desc": {
          "ru": "Правящая партия — Коммунизм",
          "en": "Ruling party is Communism"
        }
      },
      {
        "code": "has_government = neutrality",
        "desc": {
          "ru": "Правящая партия — Нейтралитет / авторитаризм",
          "en": "Ruling party is Neutrality / Non-aligned"
        }
      },
      {
        "code": "democratic > 0.50",
        "desc": {
          "ru": "Популярность демократии выше 50%",
          "en": "Democratic popularity > 50%"
        }
      },
      {
        "code": "fascism > 0.50",
        "desc": {
          "ru": "Популярность фашизма выше 50%",
          "en": "Fascism popularity > 50%"
        }
      },
      {
        "code": "communism > 0.50",
        "desc": {
          "ru": "Популярность коммунизма выше 50%",
          "en": "Communism popularity > 50%"
        }
      },
      {
        "code": "neutrality > 0.50",
        "desc": {
          "ru": "Популярность нейтралитета выше 50%",
          "en": "Neutrality popularity > 50%"
        }
      },
      {
        "code": "has_stability > 0.60",
        "desc": {
          "ru": "Стабильность государства выше 60%",
          "en": "Stability is greater than 60%"
        }
      },
      {
        "code": "has_war_support > 0.50",
        "desc": {
          "ru": "Поддержка войны выше 50%",
          "en": "War support is greater than 50%"
        }
      },
      {
        "code": "has_political_power > 100",
        "desc": {
          "ru": "Запас политической силы (PP) более 100",
          "en": "Has more than 100 political power"
        }
      },
      {
        "code": "has_command_power > 50",
        "desc": {
          "ru": "Запас командного ресурса (CP) более 50",
          "en": "Has more than 50 command power"
        }
      },
      {
        "code": "has_country_flag = my_custom_flag",
        "desc": {
          "ru": "У страны установлен флаг my_custom_flag",
          "en": "Country has flag my_custom_flag"
        }
      },
      {
        "code": "has_global_flag = world_war_two",
        "desc": {
          "ru": "Установлен глобальный флаг world_war_two",
          "en": "Global flag world_war_two is set"
        }
      },
      {
        "code": "has_idea = neutrality_idea",
        "desc": {
          "ru": "Активен национальный дух / закон neutrality_idea",
          "en": "Has active idea neutrality_idea"
        }
      },
      {
        "code": "has_completed_focus = army_reform",
        "desc": {
          "ru": "Завершён национальный фокус army_reform",
          "en": "Completed national focus army_reform"
        }
      },
      {
        "code": "has_civil_war = no",
        "desc": {
          "ru": "В стране отсутствует гражданская война",
          "en": "Country is not in a civil war"
        }
      },
      {
        "code": "is_major = yes",
        "desc": {
          "ru": "Является великой державой (мажором)",
          "en": "Country is a major power"
        }
      }
    ]
  },
  {
    "category": {
      "ru": "Война, альянсы, дипломатия и напряжённость",
      "en": "War, Factions, Diplomacy & Tension"
    },
    "items": [
      {
        "code": "has_war = no",
        "desc": {
          "ru": "Страна находится в состоянии мира (нет войн)",
          "en": "Country is at peace"
        }
      },
      {
        "code": "has_war = yes",
        "desc": {
          "ru": "Страна находится в состоянии войны",
          "en": "Country is at war"
        }
      },
      {
        "code": "has_war_with = SOV",
        "desc": {
          "ru": "Ведёт войну против державы SOV",
          "en": "Is at war with SOV"
        }
      },
      {
        "code": "is_in_faction = no",
        "desc": {
          "ru": "Не состоит ни в одном альянсе",
          "en": "Is not in any faction"
        }
      },
      {
        "code": "is_in_faction = yes",
        "desc": {
          "ru": "Состоит в альянсе (фракции)",
          "en": "Is a member of a faction"
        }
      },
      {
        "code": "is_faction_leader = yes",
        "desc": {
          "ru": "Является лидером своего альянса",
          "en": "Is the faction leader"
        }
      },
      {
        "code": "is_in_faction_with = ENG",
        "desc": {
          "ru": "Состоит в одном альянсе с ENG",
          "en": "Is in the same faction as ENG"
        }
      },
      {
        "code": "has_defensive_war = yes",
        "desc": {
          "ru": "Ведёт оборонительную войну (подверглась нападению)",
          "en": "Is in a defensive war"
        }
      },
      {
        "code": "has_offensive_war = yes",
        "desc": {
          "ru": "Ведёт наступательную войну (агрессор)",
          "en": "Is in an offensive war"
        }
      },
      {
        "code": "surrender_progress < 0.05",
        "desc": {
          "ru": "Прогресс капитуляции меньше 5%",
          "en": "Surrender progress is under 5%"
        }
      },
      {
        "code": "has_capitulated = no",
        "desc": {
          "ru": "Страна не капитулировала",
          "en": "Country has not capitulated"
        }
      },
      {
        "code": "threat > 0.25",
        "desc": {
          "ru": "Мировая напряженность выше 25% (0.25)",
          "en": "World tension is above 25%"
        }
      },
      {
        "code": "has_non_aggression_pact_with = GER",
        "desc": {
          "ru": "Заключён пакт о ненападении с GER",
          "en": "Has non-aggression pact with GER"
        }
      },
      {
        "code": "has_guaranteed = POL",
        "desc": {
          "ru": "Гарантирует независимость Польши (POL)",
          "en": "Has guaranteed independence of POL"
        }
      },
      {
        "code": "is_guaranteed_by = FRA",
        "desc": {
          "ru": "Независимость гарантирована Францией (FRA)",
          "en": "Independence is guaranteed by FRA"
        }
      },
      {
        "code": "has_military_access_to = ITA",
        "desc": {
          "ru": "Имеет военный проход через Италию (ITA)",
          "en": "Has military access to ITA"
        }
      }
    ]
  },
  {
    "category": {
      "ru": "Промышленность, заводы и ресурсы",
      "en": "Industry, Factories & Resources"
    },
    "items": [
      {
        "code": "num_of_factories > 50",
        "desc": {
          "ru": "Общее число фабрик и заводов более 50",
          "en": "Total factory count is greater than 50"
        }
      },
      {
        "code": "num_of_civilian_factories > 30",
        "desc": {
          "ru": "Более 30 гражданских фабрик",
          "en": "Has more than 30 civilian factories"
        }
      },
      {
        "code": "num_of_military_factories > 25",
        "desc": {
          "ru": "Более 25 военных заводов",
          "en": "Has more than 25 military factories"
        }
      },
      {
        "code": "num_of_naval_factories > 10",
        "desc": {
          "ru": "Более 10 верфей",
          "en": "Has more than 10 dockyards"
        }
      },
      {
        "code": "num_of_available_civilian_factories > 15",
        "desc": {
          "ru": "Свободных фабрик для стройки/торговли > 15",
          "en": "Available civilian factories > 15"
        }
      },
      {
        "code": "has_fuel > 100000",
        "desc": {
          "ru": "Запас топлива в хранилищах более 100 000",
          "en": "Fuel reserves greater than 100,000"
        }
      },
      {
        "code": "has_resources_in_country = { resource = oil amount > 20 }",
        "desc": {
          "ru": "Добыча нефти внутри страны более 20 ед.",
          "en": "Domestic oil production > 20"
        }
      },
      {
        "code": "has_resources_in_country = { resource = steel amount > 40 }",
        "desc": {
          "ru": "Добыча стали внутри страны более 40 ед.",
          "en": "Domestic steel production > 40"
        }
      },
      {
        "code": "has_resources_in_country = { resource = aluminium amount > 20 }",
        "desc": {
          "ru": "Добыча алюминия внутри страны более 20 ед.",
          "en": "Domestic aluminium production > 20"
        }
      },
      {
        "code": "has_resources_in_country = { resource = tungsten amount > 15 }",
        "desc": {
          "ru": "Добыча вольфрама внутри страны более 15 ед.",
          "en": "Domestic tungsten production > 15"
        }
      },
      {
        "code": "has_resources_in_country = { resource = rubber amount > 10 }",
        "desc": {
          "ru": "Добыча резины внутри страны более 10 ед.",
          "en": "Domestic rubber production > 10"
        }
      },
      {
        "code": "has_resources_in_country = { resource = chromium amount > 15 }",
        "desc": {
          "ru": "Добыча хрома внутри страны более 15 ед.",
          "en": "Domestic chromium production > 15"
        }
      }
    ]
  },
  {
    "category": {
      "ru": "Армия, Флот, Авиация и Склады",
      "en": "Military, Fleet, Air & Equipment"
    },
    "items": [
      {
        "code": "has_army_manpower = { size > 250000 }",
        "desc": {
          "ru": "Армия на фронте насчитывает более 250 000 бойцов",
          "en": "Fielded army manpower > 250,000"
        }
      },
      {
        "code": "manpower > 100000",
        "desc": {
          "ru": "Свободный пул призывников более 100 000",
          "en": "Manpower reserve > 100,000"
        }
      },
      {
        "code": "num_divisions > 24",
        "desc": {
          "ru": "В строю более 24 дивизий",
          "en": "Division count > 24"
        }
      },
      {
        "code": "army_experience > 50",
        "desc": {
          "ru": "Опыт сухопутных войск более 50",
          "en": "Army experience > 50"
        }
      },
      {
        "code": "navy_experience > 50",
        "desc": {
          "ru": "Опыт военно-морского флота более 50",
          "en": "Navy experience > 50"
        }
      },
      {
        "code": "air_experience > 50",
        "desc": {
          "ru": "Опыт военно-воздушных сил более 50",
          "en": "Air experience > 50"
        }
      },
      {
        "code": "num_ships > 30",
        "desc": {
          "ru": "Количество боевых кораблей более 30",
          "en": "Total warships > 30"
        }
      },
      {
        "code": "num_planes > 500",
        "desc": {
          "ru": "Количество боевых самолетов более 500",
          "en": "Total military planes > 500"
        }
      },
      {
        "code": "has_equipment = { infantry_equipment > 5000 }",
        "desc": {
          "ru": "Винтовок на складе более 5 000",
          "en": "Infantry weapons in stockpile > 5,000"
        }
      },
      {
        "code": "has_equipment = { artillery_equipment > 500 }",
        "desc": {
          "ru": "Артиллерии на складе более 500",
          "en": "Artillery in stockpile > 500"
        }
      },
      {
        "code": "has_equipment = { motorized_equipment > 1000 }",
        "desc": {
          "ru": "Грузовиков на складе более 1 000",
          "en": "Motorized trucks in stockpile > 1,000"
        }
      },
      {
        "code": "has_equipment = { medium_tank_chassis > 200 }",
        "desc": {
          "ru": "Средних танков на складе более 200",
          "en": "Medium tanks in stockpile > 200"
        }
      }
    ]
  },
  {
    "category": {
      "ru": "Наука, Технологии и Календарь",
      "en": "Science, Technology & Date"
    },
    "items": [
      {
        "code": "date > 1939.9.1",
        "desc": {
          "ru": "Наступила дата 1 сентября 1939 года",
          "en": "Date is after 1939.9.1"
        }
      },
      {
        "code": "date > 1941.6.22",
        "desc": {
          "ru": "Наступила дата 22 июня 1941 года",
          "en": "Date is after 1941.6.22"
        }
      },
      {
        "code": "amount_research_slots > 3",
        "desc": {
          "ru": "Количество ячеек исследований более 3",
          "en": "Research slots count > 3"
        }
      },
      {
        "code": "has_tech = atomic_research",
        "desc": {
          "ru": "Изучены ядерные исследования",
          "en": "Has researched atomic technology"
        }
      },
      {
        "code": "has_tech = nukes",
        "desc": {
          "ru": "Изучено создание ядерных бомб",
          "en": "Has researched nuclear weapons"
        }
      },
      {
        "code": "num_of_nukes > 0",
        "desc": {
          "ru": "В наличии хотя бы 1 готовая ядерная бомба",
          "en": "Has at least 1 nuclear bomb"
        }
      },
      {
        "code": "has_tech = basic_train",
        "desc": {
          "ru": "Изучены поезда (базовая логистика)",
          "en": "Has researched trains"
        }
      },
      {
        "code": "has_tech = interwar_artillery",
        "desc": {
          "ru": "Изучена межвоенная артиллерия",
          "en": "Has researched interwar artillery"
        }
      },
      {
        "code": "has_tech = support_weapons",
        "desc": {
          "ru": "Изучено пехотное оружие поддержки",
          "en": "Has researched support weapons"
        }
      }
    ]
  }
];

// ─── EFFECTS / REWARDS CHEAT-SHEET DATA ───────
const CHEAT_EFFECTS = [
  {
    category: { ru: 'Территории, столица и национализация', en: 'Territories, Capital & Coring' },
    items: [
      { code: '123 = { add_core_of = ROOT }', desc: { ru: 'Сделать регион 123 национальной территорией (core)', en: 'Make state 123 a core territory of ROOT' } },
      { code: 'set_capital = { state = 123 }', desc: { ru: 'Перенести столицу державы в регион 123', en: 'Relocate the nation capital to state 123' } },
      { code: '123 = { add_claim_by = ROOT }', desc: { ru: 'Добавить претензию (claim) на регион 123', en: 'Add a claim on state 123' } },
      { code: 'transfer_state = 123', desc: { ru: 'Мгновенно передать контроль и владение регионом 123', en: 'Instantly transfer control and ownership of state 123' } }
    ]
  },
  {
    category: { ru: 'Политическая власть, стабильность и идеология', en: 'Politics, Stability & Ideology' },
    items: [
      { code: 'add_political_power = 150', desc: { ru: 'Добавить 150 очков политической силы (PP)', en: 'Add 150 political power' } },
      { code: 'add_stability = 0.15', desc: { ru: 'Увеличить базовую стабильность на +15%', en: 'Increase stability by +15%' } },
      { code: 'add_war_support = 0.15', desc: { ru: 'Увеличить поддержку войны на +15%', en: 'Increase war support by +15%' } },
      { code: 'add_popularity = { ideology = fascism popularity = 0.20 }', desc: { ru: 'Увеличить популярность фашизма на +20%', en: 'Increase fascist popularity by +20%' } },
      { code: 'add_popularity = { ideology = democratic popularity = 0.20 }', desc: { ru: 'Увеличить популярность демократии на +20%', en: 'Increase democratic popularity by +20%' } },
      { code: 'add_popularity = { ideology = communism popularity = 0.20 }', desc: { ru: 'Увеличить популярность коммунизма на +20%', en: 'Increase communist popularity by +20%' } },
      { code: 'add_popularity = { ideology = neutrality popularity = 0.20 }', desc: { ru: 'Увеличить популярность нейтралитета на +20%', en: 'Increase neutrality popularity by +20%' } }
    ]
  },
  {
    category: { ru: 'Промышленность, заводы и ячейки', en: 'Industry, Factories & Slots' },
    items: [
      { code: 'add_offsite_building = { type = industrial_complex level = 2 }', desc: { ru: 'Добавить 2 внекартовые гражданские фабрики', en: 'Add 2 offsite civilian factories' } },
      { code: 'add_offsite_building = { type = arms_factory level = 2 }', desc: { ru: 'Добавить 2 внекартовых военных завода', en: 'Add 2 offsite military factories' } },
      { code: 'add_offsite_building = { type = dockyard level = 2 }', desc: { ru: 'Добавить 2 внекартовые верфи', en: 'Add 2 offsite dockyards' } },
      { code: '123 = { add_extra_state_shared_building_slots = 2 }', desc: { ru: 'Добавить 2 ячейки для строительства в регион 123', en: 'Add 2 building slots to state 123' } },
      { code: '123 = { add_building_construction = { type = industrial_complex level = 2 instant_build = yes } }', desc: { ru: 'Мгновенно построить 2 гражданские фабрики в регионе 123', en: 'Instantly construct 2 civilian factories in state 123' } },
      { code: '123 = { add_building_construction = { type = arms_factory level = 2 instant_build = yes } }', desc: { ru: 'Мгновенно построить 2 военных завода в регионе 123', en: 'Instantly construct 2 military factories in state 123' } },
      { code: '123 = { add_building_construction = { type = infrastructure level = 1 instant_build = yes } }', desc: { ru: 'Увеличить инфраструктуру региона 123 на +1 (макс. 5)', en: 'Increase infrastructure in state 123 by +1 (max 5)' } }
    ]
  },
  {
    category: { ru: 'Армия, опыт и людские ресурсы', en: 'Military, Experience & Manpower' },
    items: [
      { code: 'add_manpower = 100000', desc: { ru: 'Добавить 100 000 людских ресурсов (призывников)', en: 'Add 100,000 manpower' } },
      { code: 'army_experience = 50', desc: { ru: 'Добавить +50 опыта армии', en: 'Add +50 army experience' } },
      { code: 'navy_experience = 50', desc: { ru: 'Добавить +50 опыта флота', en: 'Add +50 navy experience' } },
      { code: 'air_experience = 50', desc: { ru: 'Добавить +50 опыта авиации', en: 'Add +50 air experience' } },
      { code: 'add_command_power = 30', desc: { ru: 'Добавить 30 командной силы', en: 'Add 30 command power' } },
      { code: 'add_equipment_to_stockpile = { type = infantry_equipment_1 amount = 5000 producer = ROOT }', desc: { ru: 'Добавить 5 000 единиц базового оружия на склад', en: 'Add 5,000 infantry weapons to stockpile' } }
    ]
  },
  {
    category: { ru: 'Исследования и технологии', en: 'Research & Technology' },
    items: [
      { code: 'add_research_slot = 1', desc: { ru: 'Добавить +1 дополнительную ячейку исследований', en: 'Add +1 research slot' } },
      { code: 'add_tech_bonus = { name = industrial_bonus bonus = 1.0 uses = 1 category = industry }', desc: { ru: '100% бонус на следующее исследование промышленности', en: '100% research bonus for 1 industrial technology' } },
      { code: 'add_tech_bonus = { name = land_doc_bonus bonus = 1.0 uses = 1 category = land_doctrine }', desc: { ru: '100% бонус к сухопутной доктрине', en: '100% research bonus for land doctrine' } }
    ]
  }
];

// 4 Canonical HoI4 Ideologies
const IDEOLOGIES = ['democratic', 'fascism', 'communism', 'neutrality'];

// ─── STATE ────────────────────────────────────
let currentLang = 'ru';
let currentScope = 'specific'; // 'specific' | 'all'
let currentCategoryMode = 'formation'; // 'formation' | 'custom'

// Ideology flags stored as dataURLs
const flagsData = {
  democratic: null,
  fascism: null,
  communism: null,
  neutrality: null
};

let decisionImageData = null;
let decisionImageTga = null;
let decisionImagePreviewUrl = null;
let generatedFiles = null;
let autoSaveTimer = null;

// ─── INITIALIZATION ───────────────────────────
function initApp(lang) {
  currentLang = (lang === 'en' || lang === 'ru') ? lang : 'ru';
  localStorage.setItem('hoi4_cosm_lang', currentLang);

  const langScreen = document.getElementById('lang-screen');
  if (langScreen) langScreen.style.display = 'none';
  const appEl = document.getElementById('app');
  if (appEl) appEl.style.display = 'block';

  const switchBtn = document.getElementById('lang-switch-btn');
  if (switchBtn) switchBtn.textContent = currentLang === 'ru' ? 'EN' : 'RU';

  applyTranslations();
  updateColorPreview();
  renderTriggersCheat();
  renderEffectsCheat();

  // Restore draft if available
  restoreDraft();
  handleOwnerTagsInput(val('owner-tag'));
  handleCoreStatesInput(val('core-states'));
}

function switchLang() {
  const nextLang = currentLang === 'ru' ? 'en' : 'ru';
  initApp(nextLang);
}

function t(key) {
  const dict = I18N[currentLang] || I18N['ru'];
  return dict[key] !== undefined ? dict[key] : key;
}

function applyTranslations() {
  const dict = I18N[currentLang] || I18N['ru'];

  document.querySelectorAll('[data-t]').forEach(el => {
    const k = el.getAttribute('data-t');
    if (dict[k] !== undefined) el.innerHTML = dict[k];
  });

  document.querySelectorAll('[data-t-ph]').forEach(el => {
    const k = el.getAttribute('data-t-ph');
    if (dict[k] !== undefined) el.setAttribute('placeholder', dict[k]);
  });

  renderTriggersCheat();
  renderEffectsCheat();
  if (document.getElementById('cosm_projectsModal').style.display === 'flex') {
    renderProjectsList();
  }
}

// ─── TOAST NOTIFICATIONS ──────────────────────
function showToast(msg, duration = 2600) {
  const el = (document.getElementById('toastNotification') || document.getElementById('toast'));
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.display = 'none'; }, duration);
}

// ─── SCOPE SWITCHER ───────────────────────────
function setScope(scope) {
  if (scope === 'single') scope = 'specific';
  currentScope = scope;
  const cardSpecific = document.getElementById('card-scope-specific') || document.getElementById('card-scope-single');
  const cardAll = document.getElementById('card-scope-all');
  if (cardSpecific) cardSpecific.classList.toggle('selected', scope === 'specific');
  if (cardAll) cardAll.classList.toggle('selected', scope === 'all');
  
  const radio = document.querySelector('input[name="decision_scope"][value="' + scope + '"]');
  if (radio) radio.checked = true;

  const ownerField = document.getElementById('owner-tag-field');
  if (ownerField) {
    ownerField.style.opacity = scope === 'specific' ? '1' : '0.4';
    ownerField.style.pointerEvents = scope === 'specific' ? 'auto' : 'none';
  }
  onFieldChange();
}

// ─── OWNER TAGS PARSER & BADGES ───────────────
function parseOwnerTags(rawStr) {
  if (!rawStr) return [];
  const tokens = rawStr.toUpperCase().split(/[^A-Z0-9]+/).filter(t => t.length > 0);
  const unique = [];
  tokens.forEach(t => {
    if (t.length === 3 && !unique.includes(t)) {
      unique.push(t);
    }
  });
  return unique;
}

function handleOwnerTagsInput(val) {
  const tags = parseOwnerTags(val);
  const container = document.getElementById('owner-tags-badges');
  if (!container) return;
  if (tags.length === 0) {
    container.innerHTML = '';
    return;
  }
  container.innerHTML = tags.map(t => `<span class="tag-badge">${t}</span>`).join('');
}

// ─── CORE STATES PARSER & BADGES ──────────────
function parseStateIds(rawStr) {
  if (!rawStr) return [];
  const matches = String(rawStr).match(/\d+/g);
  if (!matches) return [];
  const unique = [];
  matches.forEach(m => {
    const id = parseInt(m, 10);
    if (!isNaN(id) && id > 0 && !unique.includes(id)) {
      unique.push(id);
    }
  });
  return unique;
}

function handleCoreStatesInput(val) {
  const states = parseStateIds(val);
  const container = document.getElementById('core-states-badges');
  if (!container) return;
  if (states.length === 0) {
    container.innerHTML = '';
    return;
  }
  container.innerHTML = states.map(s => `<span class="core-badge">State ${s}</span>`).join('');
}

// ─── CATEGORY SWITCHER ────────────────────────
function setCategoryMode(mode) {
  currentCategoryMode = mode;
  document.getElementById('card-cat-formation').classList.toggle('selected', mode === 'formation');
  document.getElementById('card-cat-custom').classList.toggle('selected', mode === 'custom');
  document.querySelector('input[name="category_mode"][value="' + mode + '"]').checked = true;

  const customBox = document.getElementById('custom-cat-box');
  if (customBox) {
    customBox.style.display = mode === 'custom' ? 'grid' : 'none';
  }
  onFieldChange();
}

// ─── TRIGGERS ─────────────────────────────────
function sanitizeTrigger(rawTr) {
  if (!rawTr || typeof rawTr !== 'string') return '';
  let tr = rawTr.trim();
  // Sanitize stability (HoI4 uses 0.00 to 1.00)
  tr = tr.replace(/has_stability\s*(>|>=|<|<=|=)\s*(\d+(\.\d+)?)/g, (match, op, numStr) => {
    let num = parseFloat(numStr);
    if (num > 1) {
      num = (num / 100).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
    }
    return `has_stability ${op} ${num}`;
  });
  // Sanitize war support (HoI4 uses 0.00 to 1.00)
  tr = tr.replace(/has_war_support\s*(>|>=|<|<=|=)\s*(\d+(\.\d+)?)/g, (match, op, numStr) => {
    let num = parseFloat(numStr);
    if (num > 1) {
      num = (num / 100).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
    }
    return `has_war_support ${op} ${num}`;
  });
  // Sanitize surrender progress (HoI4 uses 0.00 to 1.00)
  tr = tr.replace(/surrender_progress\s*(>|>=|<|<=|=)\s*(\d+(\.\d+)?)/g, (match, op, numStr) => {
    let num = parseFloat(numStr);
    if (num > 1) {
      num = (num / 100).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
    }
    return `surrender_progress ${op} ${num}`;
  });
  return tr;
}

function addTrigger(value = '') {
  const list = document.getElementById('triggers-list');
  if (!list) return;

  const row = document.createElement('div');
  row.className = 'trigger-row';
  row.innerHTML = `
    <input type="text" class="inp" placeholder="controls_state = 123" value="${value.replace(/"/g, '&quot;')}" oninput="onFieldChange()" />
    <button type="button" class="trigger-del-btn" onclick="this.parentElement.remove(); onFieldChange();" title="Удалить"></button>
  `;
  list.appendChild(row);
  onFieldChange();
}

function getTriggers() {
  return Array.from(document.querySelectorAll('#triggers-list .trigger-row input'))
    .map(i => i.value.trim())
    .filter(v => v.length > 0);
}

function openTriggersModal() {
  const inp = document.getElementById('triggerSearchInput');
  if (inp) inp.value = '';
  renderTriggersCheat('');
  const m = document.getElementById('triggersModal');
  if (m) {
    m.style.display = 'flex';
    if (window.MotionFX && typeof window.MotionFX.animateModalOpen === 'function') {
      window.MotionFX.animateModalOpen(m);
    }
  }
}

function closeTriggersModal() {
  const m = document.getElementById('triggersModal');
  if (m) {
    if (window.MotionFX && typeof window.MotionFX.animateModalClose === 'function') {
      window.MotionFX.animateModalClose(m, () => { m.style.display = 'none'; });
    } else {
      m.style.display = 'none';
    }
  }
}

function renderTriggersCheat(filter = '') {
  const container = document.getElementById('triggersCheatBody');
  if (!container) return;

  const q = (filter || '').toLowerCase().trim();
  let html = '';
  CHEAT_TRIGGERS.forEach(cat => {
    const title = cat.category[currentLang] || cat.category.ru;
    const filteredItems = cat.items.filter(item => {
      if (!q) return true;
      const desc = (item.desc[currentLang] || item.desc.ru).toLowerCase();
      const code = item.code.toLowerCase();
      return desc.includes(q) || code.includes(q) || title.toLowerCase().includes(q);
    });

    if (filteredItems.length === 0) return;

    html += `<div class="cheat-category">`;
    html += `<div class="cheat-category-title">${title} (${filteredItems.length})</div>`;
    filteredItems.forEach(item => {
      const desc = item.desc[currentLang] || item.desc.ru;
      html += `
        <div class="cheat-item">
          <div class="cheat-info">
            <div class="cheat-code">${item.code}</div>
            <div class="cheat-desc">${desc}</div>
          </div>
          <button type="button" class="btn-sm" onclick="insertTriggerFromCheat('${item.code.replace(/'/g, "\\'")}')">
            + Вставить
          </button>
        </div>
      `;
    });
    html += `</div>`;
  });

  if (!html) {
    html = `<div style="text-align:center; padding:24px; color:var(--text-muted)">Ничего не найдено по запросу «${filter}»</div>`;
  }
  container.innerHTML = html;
}

function insertTriggerFromCheat(code) {
  addTrigger(code);
  showToast('' + code);
}

// ─── REWARDS & EFFECTS ────────────────────────
function addCustomEffect(value = '') {
  const list = document.getElementById('effects-list');
  if (!list) return;

  const row = document.createElement('div');
  row.className = 'trigger-row';
  row.innerHTML = `
    <input type="text" class="inp" placeholder="add_research_slot = 1" value="${value.replace(/"/g, '&quot;')}" oninput="onFieldChange()" />
    <button type="button" class="trigger-del-btn" onclick="this.parentElement.remove(); onFieldChange();" title="Удалить"></button>
  `;
  list.appendChild(row);
  onFieldChange();
}

function getCustomEffects() {
  return Array.from(document.querySelectorAll('#effects-list .trigger-row input'))
    .map(i => i.value.trim())
    .filter(v => v.length > 0);
}

function openEffectsModal() {
  const inp = document.getElementById('effectSearchInput');
  if (inp) inp.value = '';
  renderEffectsCheat('');
  const m = document.getElementById('effectsModal');
  if (m) {
    m.style.display = 'flex';
    if (window.MotionFX && typeof window.MotionFX.animateModalOpen === 'function') {
      window.MotionFX.animateModalOpen(m);
    }
  }
}

function closeEffectsModal() {
  const m = document.getElementById('effectsModal');
  if (m) {
    if (window.MotionFX && typeof window.MotionFX.animateModalClose === 'function') {
      window.MotionFX.animateModalClose(m, () => { m.style.display = 'none'; });
    } else {
      m.style.display = 'none';
    }
  }
}

function renderEffectsCheat(filter = '') {
  const container = document.getElementById('effectsCheatBody');
  if (!container) return;

  const allCats = (window.HOI4_ALL_EFFECTS && window.HOI4_ALL_EFFECTS.length)
    ? window.HOI4_ALL_EFFECTS
    : CHEAT_EFFECTS;

  const q = (filter || '').toLowerCase().trim();
  let html = '';
  allCats.forEach(cat => {
    const title = cat.category[currentLang] || cat.category.ru;
    const filteredItems = cat.items.filter(item => {
      if (!q) return true;
      const desc = (item.desc[currentLang] || item.desc.ru).toLowerCase();
      const code = item.code.toLowerCase();
      return desc.includes(q) || code.includes(q) || title.toLowerCase().includes(q);
    });

    if (filteredItems.length === 0) return;

    html += `<div class="cheat-category">`;
    html += `<div class="cheat-category-title">${title} (${filteredItems.length})</div>`;
    filteredItems.forEach(item => {
      const desc = item.desc[currentLang] || item.desc.ru;
      html += `
        <div class="cheat-item">
          <div class="cheat-info">
            <div class="cheat-code">${item.code}</div>
            <div class="cheat-desc">${desc}</div>
          </div>
          <button type="button" class="btn-sm" onclick="insertEffectFromCheat('${item.code.replace(/'/g, "\\'")}')">
            + Вставить
          </button>
        </div>
      `;
    });
    html += `</div>`;
  });

  if (!html) {
    html = `<div style="text-align:center; padding:24px; color:var(--text-muted)">Ничего не найдено по запросу «${filter}»</div>`;
  }
  container.innerHTML = html;
}

function insertEffectFromCheat(code) {
  addCustomEffect(code);
  showToast('' + code);
}

// ─── INTERACTIVE HOI4 STATES MAP (1081 STATES) ──────────
const REGION_COUNTRY_TAGS = {
  EUROPE: new Set(['GER','FRA','ENG','ITA','POL','CZE','ROM','YUG','HUN','SWE','NOR','FIN','DEN','HOL','BEL','LUX','SPR','POR','GRE','BUL','ALB','LIT','LAT','EST','IRE','SWI','AUS','ICE']),
  SOVIET: new Set(['SOV','TAN','MON']),
  ASIA: new Set(['JAP','CHI','PRC','MAN','MEN','XSM','SIK','GXC','YUN','SHX','TIB','NEP','BHU','SIA','PHI','INS','MAL','RAJ','AFG','PER']),
  AMERICA: new Set(['USA','CAN','MEX','CUB','HAI','DOM','GUA','HON','ELS','NIC','COS','PAN','COL','VEN','ECU','PRU','BOL','PAR','CHL','ARG','URU','BRA']),
  AFRICA: new Set(['ETH','LIB','SAF']),
  MIDDLE_EAST: new Set(['TUR','IRQ','SAU','YEM','OMA','PAL','JOR','SYR','LEB']),
  OCEANIA: new Set(['AST','NZL'])
};

const COUNTRY_NAMES_RU = {
  SOV: 'СССР (SOV)', GER: 'Германия (GER)', FRA: 'Франция (FRA)', ENG: 'Великобритания (ENG)',
  ITA: 'Италия (ITA)', USA: 'США (USA)', JAP: 'Япония (JAP)', POL: 'Польша (POL)',
  CZE: 'Чехословакия (CZE)', ROM: 'Румыния (ROM)', YUG: 'Югославия (YUG)', HUN: 'Венгрия (HUN)',
  TUR: 'Турция (TUR)', SWE: 'Швеция (SWE)', FIN: 'Финляндия (FIN)', NOR: 'Норвегия (NOR)',
  DEN: 'Дания (DEN)', HOL: 'Нидерланды (HOL)', BEL: 'Бельгия (BEL)', LUX: 'Люксембург (LUX)',
  SPR: 'Испания (SPR)', POR: 'Португалия (POR)', GRE: 'Греция (GRE)', BUL: 'Болгария (BUL)',
  ALB: 'Албания (ALB)', LIT: 'Литва (LIT)', LAT: 'Латвия (LAT)', EST: 'Эстония (EST)',
  IRE: 'Ирландия (IRE)', SWI: 'Швейцария (SWI)', AUS: 'Австрия (AUS)', CAN: 'Канада (CAN)',
  MEX: 'Мексика (MEX)', BRA: 'Бразилия (BRA)', ARG: 'Аргентина (ARG)', CHL: 'Чили (CHL)',
  COL: 'Колумбия (COL)', VEN: 'Венесуэла (VEN)', PER: 'Перу (PRU)', BOL: 'Боливия (BOL)',
  AST: 'Австралия (AST)', NZL: 'Новая Зеландия (NZL)', RAJ: 'Брит. Индия (RAJ)',
  CHI: 'Китай (CHI)', PRC: 'КНР (PRC)', MAN: 'Маньчжоу-го (MAN)', MEN: 'Мэнцзян (MEN)',
  SIK: 'Синьцзян (SIK)', TIB: 'Тибет (TIB)', SAF: 'ЮАС (SAF)', ETH: 'Эфиопия (ETH)',
  IRQ: 'Ирак (IRQ)', IRN: 'Иран/Персия (PER)', PER: 'Персия (PER)', SAU: 'Сауд. Аравия (SAU)'
};

let mapTargetType = 'core'; // 'core' | 'trigger'
let selectedMapStateIds = new Set();
let mapActiveRegion = 'ALL';
let mapActiveCountry = '';
let mapSearchText = '';

function openStatesMap(target = 'core') {
  mapTargetType = target;
  mapActiveRegion = 'ALL';
  mapActiveCountry = '';
  mapSearchText = '';

  const searchInp = document.getElementById('mapStateSearchInput');
  if (searchInp) searchInp.value = '';

  // Pre-load currently selected IDs if target is core states
  selectedMapStateIds.clear();
  if (target === 'core') {
    const curVal = (document.getElementById('core-states') || {}).value || '';
    curVal.split(/[,\s]+/).forEach(v => {
      const id = parseInt(v.trim(), 10);
      if (!isNaN(id) && id > 0) selectedMapStateIds.add(id);
    });
  }

  // Update header text based on target
  const titleEl = document.getElementById('statesMapTitle');
  const subEl = document.getElementById('statesMapSub');
  const btnApply = document.getElementById('btnApplyStatesToTarget');

  if (target === 'core') {
    if (titleEl) titleEl.textContent = 'Интерактивная карта — Национальные регионы (Core States)';
    if (subEl) subEl.textContent = 'Кликайте по регионам для выбора. Список автоматически обновит национальные регионы (add_core_of = ROOT)';
    if (btnApply) btnApply.textContent = 'Применить в Core States';
  } else {
    if (titleEl) titleEl.textContent = 'Интерактивная карта — Контроль регионов (controls_state)';
    if (subEl) subEl.textContent = 'Выберите необходимые регионы для победы или создания государства. Они добавятся в список условий (controls_state)';
    if (btnApply) btnApply.textContent = 'Добавить в Условия (controls_state)';
  }

  populateCountrySelect();
  updateRegionPillsUI();
  updateDockUI();
  updateMapSvgFilter();

  const modal = document.getElementById('statesMapModal');
  if (modal) {
    modal.style.display = 'flex';
    if (window.MotionFX) window.MotionFX.animateModalOpen(modal);
    // Initialize MapChart interactive SVG map
    setTimeout(() => {
      initMapChartInteractiveSvg();
    }, 50);
  }
}

// ─── MAPCHART-STYLE HOI4 INTERACTIVE SVG MAP ───────────────
let mapChartSvgInited = false;
let mapChartCurViewBox = { x: 0, y: 0, w: 1400.16, h: 600 };
let mapChartIsDragging = false;
let mapChartHasDragged = false;
let mapChartDragStart = { x: 0, y: 0 };
let mapChartDragViewBoxStart = { x: 0, y: 0 };

function initMapChartInteractiveSvg() {
  const container = document.getElementById('mapInteractiveContainer');
  if (!container) return;

  if (!mapChartSvgInited) {
    if (window.HOI4_MAP_SVG_STRING) {
      container.innerHTML = window.HOI4_MAP_SVG_STRING;
      mapChartSvgInited = true;
      setupMapChartEvents();
    }
  }

  updateMapSvgSelections();
}

function setupMapChartEvents() {
  const container = document.getElementById('mapInteractiveContainer');
  const svg = container ? container.querySelector('svg') : null;
  const tooltip = document.getElementById('mapStateTooltip');
  if (!svg) return;

  svg.setAttribute('viewBox', `${mapChartCurViewBox.x} ${mapChartCurViewBox.y} ${mapChartCurViewBox.w} ${mapChartCurViewBox.h}`);

  // 1. Click to Select State (ignoring drag releases)
  svg.addEventListener('click', (e) => {
    if (mapChartHasDragged) return;
    const path = e.target.closest('.hoi4-map-state-path');
    if (!path) return;
    const sid = parseInt(path.dataset.stateId, 10);
    if (!isNaN(sid)) {
      toggleState(sid);
    }
  });

  // 2. Hover Tooltip
  svg.addEventListener('mousemove', (e) => {
    const path = e.target.closest('.hoi4-map-state-path');
    if (path && tooltip) {
      const sid = path.dataset.stateId || '?';
      const ru = path.dataset.ru || '';
      const en = path.dataset.en || path.id || '';
      const tag = path.dataset.tag || '';
      tooltip.innerHTML = `<strong>${ru || en}</strong> (${en}) <span class="tooltip-tag">#${sid} • ${tag}</span>`;
      tooltip.style.display = 'block';

      const wrap = document.getElementById('mapSvgWrap');
      if (wrap) {
        const wrapRect = wrap.getBoundingClientRect();
        const left = e.clientX - wrapRect.left;
        const top = e.clientY - wrapRect.top - 12;
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
      }
    } else if (tooltip && !path) {
      tooltip.style.display = 'none';
    }
  });

  svg.addEventListener('mouseleave', () => {
    if (tooltip) tooltip.style.display = 'none';
  });

  // 3. Mouse Pan / Drag
  svg.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    mapChartIsDragging = true;
    mapChartHasDragged = false;
    mapChartDragStart = { x: e.clientX, y: e.clientY };
    mapChartDragViewBoxStart = { x: mapChartCurViewBox.x, y: mapChartCurViewBox.y };
  });

  window.addEventListener('mousemove', (e) => {
    if (!mapChartIsDragging) return;
    const dx = e.clientX - mapChartDragStart.x;
    const dy = e.clientY - mapChartDragStart.y;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      mapChartHasDragged = true;
    }

    const svgRect = svg.getBoundingClientRect();
    const scaleX = mapChartCurViewBox.w / svgRect.width;
    const scaleY = mapChartCurViewBox.h / svgRect.height;

    mapChartCurViewBox.x = mapChartDragViewBoxStart.x - dx * scaleX;
    mapChartCurViewBox.y = mapChartDragViewBoxStart.y - dy * scaleY;
    svg.setAttribute('viewBox', `${mapChartCurViewBox.x} ${mapChartCurViewBox.y} ${mapChartCurViewBox.w} ${mapChartCurViewBox.h}`);
  });

  window.addEventListener('mouseup', () => {
    setTimeout(() => { mapChartIsDragging = false; }, 20);
  });

  // 4. Mouse Wheel Zoom centered on cursor
  svg.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.85 : 1.18;
    zoomMapAt(e.clientX, e.clientY, zoomFactor);
  }, { passive: false });

  // 5. Touch support for Mobile
  let touchStartDist = 0;
  let touchStartCenter = { x: 0, y: 0 };

  svg.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      mapChartIsDragging = true;
      mapChartHasDragged = false;
      mapChartDragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      mapChartDragViewBoxStart = { x: mapChartCurViewBox.x, y: mapChartCurViewBox.y };
    } else if (e.touches.length === 2) {
      mapChartIsDragging = false;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      touchStartDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      touchStartCenter = { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
    }
  }, { passive: true });

  svg.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && mapChartIsDragging) {
      const dx = e.touches[0].clientX - mapChartDragStart.x;
      const dy = e.touches[0].clientY - mapChartDragStart.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) mapChartHasDragged = true;
      const svgRect = svg.getBoundingClientRect();
      const scaleX = mapChartCurViewBox.w / svgRect.width;
      const scaleY = mapChartCurViewBox.h / svgRect.height;
      mapChartCurViewBox.x = mapChartDragViewBoxStart.x - dx * scaleX;
      mapChartCurViewBox.y = mapChartDragViewBoxStart.y - dy * scaleY;
      svg.setAttribute('viewBox', `${mapChartCurViewBox.x} ${mapChartCurViewBox.y} ${mapChartCurViewBox.w} ${mapChartCurViewBox.h}`);
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const curDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      if (touchStartDist > 0 && curDist > 0) {
        const factor = touchStartDist / curDist;
        zoomMapAt(touchStartCenter.x, touchStartCenter.y, factor);
        touchStartDist = curDist;
      }
    }
  }, { passive: true });

  svg.addEventListener('touchend', () => {
    mapChartIsDragging = false;
    touchStartDist = 0;
  });
}

function zoomMapAt(clientX, clientY, factor) {
  const container = document.getElementById('mapInteractiveContainer');
  const svg = container ? container.querySelector('svg') : null;
  if (!svg) return;

  const rect = svg.getBoundingClientRect();
  const mouseX = clientX - rect.left;
  const mouseY = clientY - rect.top;

  const svgX = mapChartCurViewBox.x + (mouseX / rect.width) * mapChartCurViewBox.w;
  const svgY = mapChartCurViewBox.y + (mouseY / rect.height) * mapChartCurViewBox.h;

  const newW = Math.max(120, Math.min(2000, mapChartCurViewBox.w * factor));
  const newH = Math.max(60, Math.min(900, mapChartCurViewBox.h * factor));

  mapChartCurViewBox.x = svgX - (mouseX / rect.width) * newW;
  mapChartCurViewBox.y = svgY - (mouseY / rect.height) * newH;
  mapChartCurViewBox.w = newW;
  mapChartCurViewBox.h = newH;

  svg.setAttribute('viewBox', `${mapChartCurViewBox.x} ${mapChartCurViewBox.y} ${mapChartCurViewBox.w} ${mapChartCurViewBox.h}`);
}

function cosm_mapZoomIn() {
  const container = document.getElementById('mapInteractiveContainer');
  const svg = container ? container.querySelector('svg') : null;
  if (!svg) return;
  const rect = svg.getBoundingClientRect();
  zoomMapAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 0.72);
}

function cosm_mapZoomOut() {
  const container = document.getElementById('mapInteractiveContainer');
  const svg = container ? container.querySelector('svg') : null;
  if (!svg) return;
  const rect = svg.getBoundingClientRect();
  zoomMapAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 1.38);
}

function cosm_mapZoomReset() {
  mapChartCurViewBox = { x: 0, y: 0, w: 1400.16, h: 600 };
  const container = document.getElementById('mapInteractiveContainer');
  const svg = container ? container.querySelector('svg') : null;
  if (svg) svg.setAttribute('viewBox', '0 0 1400.16 600');
}

function updateMapSvgSelections() {
  const paths = document.querySelectorAll('.hoi4-map-state-path');
  paths.forEach(p => {
    const sid = parseInt(p.dataset.stateId, 10);
    p.classList.toggle('selected', selectedMapStateIds.has(sid));
  });
}

function closeStatesMap() {
  const modal = document.getElementById('statesMapModal');
  if (modal) {
    if (window.MotionFX && typeof window.MotionFX.animateModalClose === 'function') {
      window.MotionFX.animateModalClose(modal, () => { modal.style.display = 'none'; });
    } else {
      modal.style.display = 'none';
    }
  }
}

function populateCountrySelect() {
  const select = document.getElementById('mapCountrySelect');
  if (!select) return;

  const dataset = (window.HOI4_STATES_DB && window.HOI4_STATES_DB.length) ? window.HOI4_STATES_DB : [];
  const tagCounts = {};
  dataset.forEach(s => {
    if (s.tag) tagCounts[s.tag] = (tagCounts[s.tag] || 0) + 1;
  });

  const sortedTags = Object.keys(tagCounts).sort((a,b) => (COUNTRY_NAMES_RU[a] || a).localeCompare(COUNTRY_NAMES_RU[b] || b, 'ru'));

  let html = `<option value="">Все страны мира (${dataset.length} регионов)</option>`;
  sortedTags.forEach(tag => {
    const label = COUNTRY_NAMES_RU[tag] || tag;
    const count = tagCounts[tag];
    html += `<option value="${tag}">${label} [${count}]</option>`;
  });
  select.innerHTML = html;
  select.value = mapActiveCountry;
}

function selectMapRegion(regionKey) {
  mapActiveRegion = regionKey;
  updateRegionPillsUI();
  updateMapSvgFilter();

  // Region ViewBox Presets
  const regionViewBoxes = {
    ALL: { x: 0, y: 0, w: 1400.16, h: 600 },
    EUROPE: { x: 440, y: 30, w: 390, h: 260 },
    SOVIET: { x: 530, y: 20, w: 580, h: 320 },
    ASIA: { x: 740, y: 130, w: 460, h: 330 },
    AMERICA: { x: 60, y: 40, w: 440, h: 520 },
    AFRICA: { x: 440, y: 190, w: 340, h: 320 },
    MIDDLE_EAST: { x: 590, y: 160, w: 260, h: 190 },
    OCEANIA: { x: 860, y: 300, w: 420, h: 280 }
  };

  const targetVB = regionViewBoxes[regionKey] || regionViewBoxes.ALL;
  mapChartCurViewBox = { ...targetVB };
  const container = document.getElementById('mapInteractiveContainer');
  const svg = container ? container.querySelector('svg') : null;
  if (svg) {
    if (window.MotionFX && typeof window.anime === 'function') {
      const currentRaw = (svg.getAttribute('viewBox') || '0 0 1400.16 600').split(' ');
      const vbObj = {
        x: parseFloat(currentRaw[0]) || 0,
        y: parseFloat(currentRaw[1]) || 0,
        w: parseFloat(currentRaw[2]) || 1400.16,
        h: parseFloat(currentRaw[3]) || 600
      };
      window.anime({
        targets: vbObj,
        x: targetVB.x,
        y: targetVB.y,
        w: targetVB.w,
        h: targetVB.h,
        duration: 450,
        easing: 'easeOutCubic',
        update: function() {
          svg.setAttribute('viewBox', `${vbObj.x} ${vbObj.y} ${vbObj.w} ${vbObj.h}`);
        }
      });
    } else {
      svg.setAttribute('viewBox', `${targetVB.x} ${targetVB.y} ${targetVB.w} ${targetVB.h}`);
    }
  }
}

function updateRegionPillsUI() {
  const pills = document.querySelectorAll('#mapRegionPills .region-tab');
  pills.forEach(pill => {
    const onclickAttr = pill.getAttribute('onclick') || '';
    pill.classList.toggle('active', onclickAttr.includes("'" + mapActiveRegion + "'"));
  });
}

function onMapCountryChange(tag) {
  mapActiveCountry = tag || '';
  renderStatesGrid();
}

function filterStatesMap() {
  const inp = document.getElementById('mapStateSearchInput');
  mapSearchText = (inp ? inp.value : '').toLowerCase().trim();
  updateMapSvgFilter();
}

function clearStateSearch() {
  mapSearchText = '';
  const inp = document.getElementById('mapStateSearchInput');
  if (inp) inp.value = '';
  updateMapSvgFilter();
}

function updateMapSvgFilter() {
  const filtered = getFilteredStates();
  const filteredSet = new Set(filtered.map(s => s.id));
  const isFiltering = !!(mapActiveCountry || mapActiveRegion !== 'ALL' || mapSearchText);

  const paths = document.querySelectorAll('.hoi4-map-state-path');
  paths.forEach(p => {
    const sid = parseInt(p.dataset.stateId, 10);
    const isMatch = filteredSet.has(sid);
    p.classList.toggle('map-match', isMatch && isFiltering);
    p.classList.toggle('map-dimmed', !isMatch && isFiltering);
  });

  const hintEl = document.getElementById('mapFilteredHint');
  if (hintEl) {
    if (isFiltering) {
      hintEl.textContent = `Найдено ${filtered.length} регионов на карте`;
    } else {
      hintEl.textContent = 'Всего 1081 регион • Кликните по региону для выбора';
    }
  }

  // If search matches 1 state, auto-zoom to it
  if (mapSearchText && filtered.length === 1) {
    const targetPath = document.querySelector(`.hoi4-map-state-path[data-state-id="${filtered[0].id}"]`);
    if (targetPath) {
      try {
        const bbox = targetPath.getBBox();
        const padding = 50;
        const targetVB = {
          x: Math.max(0, bbox.x - padding),
          y: Math.max(0, bbox.y - padding),
          w: Math.max(120, bbox.width + padding * 2),
          h: Math.max(80, bbox.height + padding * 2)
        };
        const svg = document.querySelector('#mapInteractiveContainer svg');
        if (svg) {
          svg.setAttribute('viewBox', `${targetVB.x} ${targetVB.y} ${targetVB.w} ${targetVB.h}`);
          mapChartCurViewBox = targetVB;
        }
      } catch(e) {}
    }
  }
}

function getFilteredStates() {
  const dataset = (window.HOI4_STATES_DB && window.HOI4_STATES_DB.length) ? window.HOI4_STATES_DB : [];
  return dataset.filter(state => {
    // 1. Country filter
    if (mapActiveCountry && state.tag !== mapActiveCountry) return false;

    // 2. Region filter
    if (mapActiveRegion !== 'ALL') {
      const allowedTags = REGION_COUNTRY_TAGS[mapActiveRegion];
      if (allowedTags && !allowedTags.has(state.tag)) return false;
    }

    // 3. Text search
    if (mapSearchText) {
      const idStr = String(state.id);
      const tagStr = (state.tag || '').toLowerCase();
      const ruStr = (state.ru || '').toLowerCase();
      const enStr = (state.en || '').toLowerCase();
      return idStr === mapSearchText || idStr.includes(mapSearchText) ||
             tagStr.includes(mapSearchText) ||
             ruStr.includes(mapSearchText) ||
             enStr.includes(mapSearchText);
    }
    return true;
  });
}

function renderStatesGrid() {
  const container = document.getElementById('mapStatesGrid');
  if (!container) return;

  const filtered = getFilteredStates();
  const counterEl = document.getElementById('mapFilteredCount');
  if (counterEl) {
    counterEl.textContent = `Показано ${filtered.length} регионов`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="map-no-results">По вашему запросу регионы не найдены. Попробуйте сбросить фильтры.</div>`;
    return;
  }

  // Render cards (fast DOM batching)
  let html = '';
  filtered.forEach(state => {
    const isSelected = selectedMapStateIds.has(state.id);
    html += `
      <div class="state-card ${isSelected ? 'selected' : ''}" onclick="cosm_toggleState(${state.id})" id="stateCard_${state.id}" title="#${state.id} ${state.ru} (${state.en})">
        <div class="state-card-top">
          <span class="state-card-id">#${state.id}</span>
          <span class="state-card-tag">${state.tag || '???'}</span>
        </div>
        <div class="state-card-name-ru">${state.ru || 'Безымянный регион'}</div>
        <div class="state-card-name-en">${state.en || ''}</div>
        <div class="state-card-check">${isSelected ? '' : '+'}</div>
      </div>
    `;
  });
  container.innerHTML = html;
  if (window.MotionFX && typeof window.MotionFX.animateCardsEntrance === 'function') {
    window.MotionFX.animateCardsEntrance(container);
  }
}

function toggleState(id) {
  if (selectedMapStateIds.has(id)) {
    selectedMapStateIds.delete(id);
  } else {
    selectedMapStateIds.add(id);
  }

  const isSelected = selectedMapStateIds.has(id);

  // Quick DOM toggle for state card
  const card = document.getElementById('stateCard_' + id);
  if (card) {
    card.classList.toggle('selected', isSelected);
    const checkEl = card.querySelector('.state-card-check');
    if (checkEl) checkEl.textContent = isSelected ? '' : '+';
    if (window.MotionFX) window.MotionFX.animateStateCard(card, isSelected);
  }

  // Quick DOM toggle for SVG Map path
  const svgPath = document.querySelector(`.hoi4-map-state-path[data-state-id="${id}"]`);
  if (svgPath) {
    svgPath.classList.toggle('selected', isSelected);
  }

  updateDockUI();
  if (window.MotionFX) window.MotionFX.animateCounterBump(document.getElementById('dockSelectedCount'));
}

function selectAllFilteredStates() {
  const filtered = getFilteredStates();
  filtered.forEach(s => selectedMapStateIds.add(s.id));
  updateMapSvgSelections();
  updateMapSvgSelections();
  updateDockUI();
  showToast(`Добавлено ${filtered.length} регионов в выборку`);
}

function deselectAllFilteredStates() {
  const filtered = getFilteredStates();
  filtered.forEach(s => selectedMapStateIds.delete(s.id));
  updateMapSvgSelections();
  updateMapSvgSelections();
  updateDockUI();
  showToast('Снято выделение с показанных регионов');
}

function clearSelectedStates() {
  selectedMapStateIds.clear();
  updateMapSvgSelections();
  updateMapSvgSelections();
  updateDockUI();
  showToast('Выборка очищена');
}

function updateDockUI() {
  const countEl = document.getElementById('dockSelectedCount');
  const previewEl = document.getElementById('dockTagsPreview');
  const size = selectedMapStateIds.size;

  if (countEl) countEl.textContent = size;

  if (!previewEl) return;
  if (size === 0) {
    previewEl.innerHTML = `<span class="dock-placeholder">Нажмите на карточки регионов выше, чтобы добавить их в выборку</span>`;
    return;
  }

  const sortedIds = Array.from(selectedMapStateIds).sort((a,b) => a - b);
  const dataset = (window.HOI4_STATES_DB && window.HOI4_STATES_DB.length) ? window.HOI4_STATES_DB : [];
  const stateMap = {};
  dataset.forEach(s => { stateMap[s.id] = s; });

  let chipsHtml = '';
  // Show up to first 30 chips
  sortedIds.slice(0, 30).forEach(id => {
    const s = stateMap[id];
    const name = s ? s.ru : ('ID ' + id);
    chipsHtml += `
      <span class="dock-chip" onclick="cosm_toggleState(${id})" title="Нажмите, чтобы удалить из выборки">
        #${id} ${name} &times;
      </span>
    `;
  });

  if (sortedIds.length > 30) {
    chipsHtml += `<span class="dock-chip-more">+ еще ${sortedIds.length - 30}...</span>`;
  }

  previewEl.innerHTML = chipsHtml;
}

function copySelectedStateIds() {
  if (selectedMapStateIds.size === 0) {
    showToast('Сначала выберите хотя бы один регион!');
    return;
  }
  const sortedIds = Array.from(selectedMapStateIds).sort((a,b) => a - b);
  const text = sortedIds.join(', ');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Скопировано ${sortedIds.length} ID: ` + text);
    });
  } else {
    showToast(`IDs: ` + text);
  }
}

function applySelectedStatesToTarget() {
  if (selectedMapStateIds.size === 0) {
    showToast('Сначала выберите хотя бы один регион!');
    return;
  }
  const sortedIds = Array.from(selectedMapStateIds).sort((a,b) => a - b);

  if (mapTargetType === 'core') {
    const coreInp = document.getElementById('core-states');
    if (coreInp) {
      coreInp.value = sortedIds.join(', ');
      handleCoreStatesInput(coreInp.value);
      onFieldChange();
    }
    showToast(`Назначено ${sortedIds.length} национальных регионов!`);
  } else {
    // Add controls_state triggers
    sortedIds.forEach(id => {
      addTrigger(`controls_state = ${id}`);
    });
    onFieldChange();
    showToast(`Добавлено ${sortedIds.length} условий controls_state!`);
  }

  closeStatesMap();
}



// ─── 4 IDEOLOGIES TABS ────────────────────────
function showIdeology(ideo) {
  IDEOLOGIES.forEach(id => {
    const btn = document.getElementById('btn-tab-' + id);
    const panel = document.getElementById('ideo-panel-' + id);
    if (btn) btn.classList.toggle('active', id === ideo);
    if (panel) panel.classList.toggle('active', id === ideo);
  });
}

// ─── TGA CONVERTER & FLAG RESIZER ─────────────
// Exact 32-bit uncompressed TGA generator for Hearts of Iron IV
function canvasToTGA(canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const px = ctx.getImageData(0, 0, w, h).data;
  const buf = new ArrayBuffer(18 + px.length);
  const dv = new DataView(buf);
  const u8 = new Uint8Array(buf);

  dv.setUint8(2, 2); // Uncompressed true-color
  dv.setUint16(12, w, true);
  dv.setUint16(14, h, true);
  dv.setUint8(16, 32); // 32 bits per pixel (BGRA)
  dv.setUint8(17, 0);  // Bottom-up orientation

  let off = 18;
  for (let y = h - 1; y >= 0; y--) {
    for (let x = 0; x < w; x++) {
      const pi = (y * w + x) * 4;
      u8[off++] = px[pi + 2]; // Blue
      u8[off++] = px[pi + 1]; // Green
      u8[off++] = px[pi];     // Red
      u8[off++] = px[pi + 3]; // Alpha
    }
  }
  return buf;
}

function renderImageToCanvas(img, canvasId, w, h) {
  const c = document.getElementById(canvasId);
  if (!c) return;
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
}

function handleFlagUpload(ideo, event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    flagsData[ideo] = dataUrl;
    applyFlagDataToCanvases(ideo, dataUrl);
    onFieldChange();
  };
  reader.readAsDataURL(file);
}

function applyFlagDataToCanvases(ideo, dataUrl) {
  const img = new Image();
  img.onload = function() {
    renderImageToCanvas(img, `cv-${ideo}-82`, 82, 52);
    renderImageToCanvas(img, `cv-${ideo}-41`, 41, 26);
    renderImageToCanvas(img, `cv-${ideo}-10`, 10, 7);

    const prevGrid = document.getElementById(`flag-previews-${ideo}`);
    if (prevGrid) prevGrid.style.display = 'flex';
  };
  img.src = dataUrl;
}

function clearFlag(ideo) {
  flagsData[ideo] = null;
  const prevGrid = document.getElementById(`flag-previews-${ideo}`);
  if (prevGrid) prevGrid.style.display = 'none';

  const inp = document.getElementById(`flag-input-${ideo}`);
  if (inp) inp.value = '';

  ['82', '41', '10'].forEach(sz => {
    const c = document.getElementById(`cv-${ideo}-${sz}`);
    if (c) {
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, c.width, c.height);
    }
  });

  onFieldChange();
}

function handleDecisionImageUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    const img = new Image();
    img.onload = function() {
      // Create off-screen canvas 32x32 (standard HoI4 decision icon dimensions)
      const cv = document.createElement('canvas');
      cv.width = 32;
      cv.height = 32;
      const ctx = cv.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, 32, 32);
      ctx.drawImage(img, 0, 0, 32, 32);

      // Convert to 32-bit TGA (BGRA)
      decisionImageTga = canvasToTGA(cv);
      decisionImagePreviewUrl = cv.toDataURL('image/png');
      decisionImageData = {
        name: file.name.replace(/\.[^/.]+$/, "") + ".tga",
        rawName: file.name
      };

      // Update preview canvas in UI
      const prevCanvas = document.getElementById('cv-decision-icon');
      if (prevCanvas) {
        prevCanvas.width = 32;
        prevCanvas.height = 32;
        const pCtx = prevCanvas.getContext('2d');
        pCtx.imageSmoothingEnabled = true;
        pCtx.imageSmoothingQuality = 'high';
        pCtx.clearRect(0, 0, 32, 32);
        pCtx.drawImage(img, 0, 0, 32, 32);
      }
      const prevEl = document.getElementById('decision-img-preview');
      if (prevEl) prevEl.style.display = 'flex';

      onFieldChange();
    };
    img.src = dataUrl;
  };
  reader.readAsDataURL(file);
}

function clearDecisionImage() {
  decisionImageData = null;
  decisionImageTga = null;
  decisionImagePreviewUrl = null;
  const inp = document.getElementById('decision-img-input');
  if (inp) inp.value = '';
  const prevCanvas = document.getElementById('cv-decision-icon');
  if (prevCanvas) {
    const pCtx = prevCanvas.getContext('2d');
    pCtx.clearRect(0, 0, 32, 32);
  }
  const prevEl = document.getElementById('decision-img-preview');
  if (prevEl) prevEl.style.display = 'none';
  onFieldChange();
}

// ─── MAP COLOR PREVIEW ────────────────────────
function updateColorPreview() {
  const rEl = document.getElementById('color-r');
  const gEl = document.getElementById('color-g');
  const bEl = document.getElementById('color-b');
  if (!rEl || !gEl || !bEl) return;

  const r = clamp(parseInt(rEl.value, 10) || 0, 0, 255);
  const g = clamp(parseInt(gEl.value, 10) || 0, 0, 255);
  const b = clamp(parseInt(bEl.value, 10) || 0, 0, 255);

  const swatch = document.getElementById('color-swatch');
  const picker = document.getElementById('color-picker');
  if (swatch) swatch.style.background = `rgb(${r},${g},${b})`;
  if (picker) picker.value = rgbToHex(r, g, b);
}

function syncColorFromPicker() {
  const picker = document.getElementById('color-picker');
  if (!picker) return;

  const hex = picker.value;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  document.getElementById('color-r').value = r;
  document.getElementById('color-g').value = g;
  document.getElementById('color-b').value = b;

  const swatch = document.getElementById('color-swatch');
  if (swatch) swatch.style.background = `rgb(${r},${g},${b})`;
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

// ─── FORM VALUE EXTRACTORS ────────────────────
function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9а-яё_\- ]/gi, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 45) || 'cosmetic_mod';
}

function escapePds(str) {
  return (str || '').replace(/"/g, '\\"');
}

// ─── COLLECT STATE OBJECT ─────────────────────
function collectProjectData() {
  const modName = val('mod-name') || 'MyCosmeticMod';
  return {
    version: '2.1',
    app: 'HoI4CosmeticTagCreator',
    savedAt: new Date().toISOString(),
    lang: currentLang,

    modName: modName,
    modVersion: val('mod-version') || '1.0.0',
    author: val('mod-author'),
    hoi4version: val('hoi4-version') || '1.19.*',
    modDescription: val('mod-description'),
    customLocFileName: val('cosm-loc-filename'),

    scope: currentScope === 'single' ? 'specific' : currentScope,
    ownerTag: val('owner-tag').toUpperCase(),
    ownerTags: parseOwnerTags(val('owner-tag')),
    cosmeticTag: val('cosmetic-tag').toUpperCase(),

    categoryMode: currentCategoryMode,
    customCatId: val('custom-cat-id'),
    customCatName: val('custom-cat-name'),

    cost: parseInt(val('decision-cost'), 10) || 50,
    days: parseInt(val('decision-days'), 10) || 0,
    removeDays: parseInt(val('decision-remove-days'), 10) || 0,
    decisionName: val('decision-name'),
    decisionDesc: val('decision-desc'),
    triggers: getTriggers(),

    // Rewards & Buffs
    coreStates: val('core-states'),
    newCapital: val('new-capital'),
    rewardPP: val('reward-pp'),
    rewardStability: val('reward-stability'),
    rewardWarSupport: val('reward-war-support'),
    rewardManpower: val('reward-manpower'),
    customEffects: getCustomEffects(),

    colorR: clamp(parseInt(val('color-r'), 10) || 180, 0, 255),
    colorG: clamp(parseInt(val('color-g'), 10) || 50, 0, 255),
    colorB: clamp(parseInt(val('color-b'), 10) || 50, 0, 255),

    ideologies: {
      democratic: {
        name: val('name-democratic'),
        adj: val('adj-democratic'),
        flag: flagsData.democratic
      },
      fascism: {
        name: val('name-fascism'),
        adj: val('adj-fascism'),
        flag: flagsData.fascism
      },
      communism: {
        name: val('name-communism'),
        adj: val('adj-communism'),
        flag: flagsData.communism
      },
      neutrality: {
        name: val('name-neutrality'),
        adj: val('adj-neutrality'),
        flag: flagsData.neutrality
      }
    },

    decisionPictureName: val('decision-picture-name'),
    decisionImageData: decisionImageData,
    decisionImagePreviewUrl: decisionImagePreviewUrl
  };
}

function populateFormFromData(d) {
  if (!d) return;

  const setVal = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.value = v !== undefined && v !== null ? v : '';
  };

  setVal('mod-name', d.modName);
  setVal('mod-version', d.modVersion || '1.0.0');
  setVal('mod-author', d.author);
  setVal('hoi4-version', d.hoi4version || '1.19.*');
  setVal('mod-description', d.modDescription);
  setVal('cosm-loc-filename', d.customLocFileName);

  setScope(d.scope === 'single' ? 'specific' : (d.scope || 'specific'));
  const tagVal = d.ownerTag !== undefined && d.ownerTag !== null
    ? d.ownerTag
    : (Array.isArray(d.ownerTags) ? d.ownerTags.join(', ') : '');
  setVal('owner-tag', tagVal);
  handleOwnerTagsInput(tagVal);
  setVal('cosmetic-tag', d.cosmeticTag);

  setCategoryMode(d.categoryMode || 'formation');
  setVal('custom-cat-id', d.customCatId);
  setVal('custom-cat-name', d.customCatName);

  setVal('decision-cost', d.cost !== undefined ? d.cost : 50);
  setVal('decision-days', d.days !== undefined ? d.days : 0);
  setVal('decision-remove-days', d.removeDays !== undefined ? d.removeDays : 0);
  setVal('decision-name', d.decisionName);
  setVal('decision-desc', d.decisionDesc);

  // Triggers
  const trigList = document.getElementById('triggers-list');
  if (trigList) {
    trigList.innerHTML = '';
    if (Array.isArray(d.triggers)) {
      d.triggers.forEach(tr => addTrigger(tr));
    }
  }

  // Rewards & Buffs
  setVal('core-states', d.coreStates || '');
  handleCoreStatesInput(d.coreStates || '');
  setVal('new-capital', d.newCapital || '');
  setVal('reward-pp', d.rewardPP !== undefined ? d.rewardPP : '');
  setVal('reward-stability', d.rewardStability !== undefined ? d.rewardStability : '');
  setVal('reward-war-support', d.rewardWarSupport !== undefined ? d.rewardWarSupport : '');
  setVal('reward-manpower', d.rewardManpower !== undefined ? d.rewardManpower : '');

  const effList = document.getElementById('effects-list');
  if (effList) {
    effList.innerHTML = '';
    if (Array.isArray(d.customEffects)) {
      d.customEffects.forEach(ef => addCustomEffect(ef));
    }
  }

  // Colors
  setVal('color-r', d.colorR !== undefined ? d.colorR : 180);
  setVal('color-g', d.colorG !== undefined ? d.colorG : 50);
  setVal('color-b', d.colorB !== undefined ? d.colorB : 50);
  updateColorPreview();

  // 4 Ideologies
  const ideos = d.ideologies || {};
  IDEOLOGIES.forEach(i => {
    const obj = ideos[i] || {};
    setVal(`name-${i}`, obj.name);
    setVal(`adj-${i}`, obj.adj);
    if (obj.flag) {
      flagsData[i] = obj.flag;
      applyFlagDataToCanvases(i, obj.flag);
    } else {
      clearFlag(i);
    }
  });

  setVal('decision-picture-name', d.decisionPictureName);
  decisionImageData = d.decisionImageData || null;
  decisionImagePreviewUrl = d.decisionImagePreviewUrl || null;
  if (decisionImagePreviewUrl) {
    const img = new Image();
    img.onload = function() {
      const cv = document.createElement('canvas');
      cv.width = 32;
      cv.height = 32;
      const ctx = cv.getContext('2d');
      ctx.drawImage(img, 0, 0, 32, 32);
      decisionImageTga = canvasToTGA(cv);

      const prevCanvas = document.getElementById('cv-decision-icon');
      if (prevCanvas) {
        prevCanvas.width = 32;
        prevCanvas.height = 32;
        const pCtx = prevCanvas.getContext('2d');
        pCtx.imageSmoothingEnabled = true;
        pCtx.imageSmoothingQuality = 'high';
        pCtx.clearRect(0, 0, 32, 32);
        pCtx.drawImage(img, 0, 0, 32, 32);
      }
      const prevEl = document.getElementById('decision-img-preview');
      if (prevEl) prevEl.style.display = 'flex';
    };
    img.src = decisionImagePreviewUrl;
  } else {
    clearDecisionImage();
  }

  updateProjectToolbar();
}

// ─── AUTO-SAVE ON CHANGE & EXIT ───────────────
function onFieldChange() {
  updateProjectToolbar();

  const status = document.getElementById('autoSaveStatus');
  if (status) status.textContent = '...';

  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    saveDraft();
  }, 400);
}

function updateProjectToolbar() {
  const nameDisplay = document.getElementById('cosm_projectActiveName');
  const modName = val('mod-name');
  if (nameDisplay) {
    nameDisplay.textContent = modName || 'MyCosmeticMod';
  }
}

function saveDraft() {
  try {
    const data = collectProjectData();
    localStorage.setItem('hoi4_cosm_current_draft', JSON.stringify(data));
    const status = document.getElementById('autoSaveStatus');
    if (status) status.textContent = t('autosave_on');
  } catch (e) {}
}

function restoreDraft() {
  try {
    const raw = localStorage.getItem('hoi4_cosm_current_draft');
    if (raw) {
      const data = JSON.parse(raw);
      populateFormFromData(data);
    }
  } catch (e) {}
}

window.addEventListener('beforeunload', () => {
  saveDraft();
});

// ─── PROJECTS MANAGEMENT (JSON & LIBRARY) ─────
function saveProjectToFile() {
  const d = collectProjectData();
  const jsonStr = JSON.stringify(d, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${slugify(d.modName)}_project.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(t('saved_toast'));
}

function triggerLoadProjectFile() {
  const inp = document.getElementById('cosm_projectFileInput');
  if (inp) {
    inp.value = '';
    inp.click();
  }
}

function handleProjectFileUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const d = JSON.parse(e.target.result);
      populateFormFromData(d);
      saveDraft();
      showToast(t('loaded_toast'));
    } catch (err) {
      alert('Ошибка при чтении файла проекта: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function createNewProject() {
  if (!confirm('Создать новый проект? Несохраненные изменения текущего проекта будут очищены.')) return;
  localStorage.removeItem('hoi4_cosm_current_draft');
  window.location.reload();
}

function getStoredProjectsList() {
  try {
    return JSON.parse(localStorage.getItem('hoi4_cosm_projects_lib')) || [];
  } catch (e) {
    return [];
  }
}

function openProjectsModal() {
  renderProjectsList();
  const m = document.getElementById('cosm_projectsModal');
  if (m) {
    m.style.display = 'flex';
    if (window.MotionFX && typeof window.MotionFX.animateModalOpen === 'function') {
      window.MotionFX.animateModalOpen(m);
    }
  }
}

function closeProjectsModal() {
  const m = document.getElementById('cosm_projectsModal');
  if (m) {
    if (window.MotionFX && typeof window.MotionFX.animateModalClose === 'function') {
      window.MotionFX.animateModalClose(m, () => { m.style.display = 'none'; });
    } else {
      m.style.display = 'none';
    }
  }
}

function saveCurrentToLibrary() {
  const d = collectProjectData();
  const list = getStoredProjectsList();
  const item = {
    id: 'proj_' + Date.now(),
    name: d.modName,
    date: new Date().toLocaleString(),
    cosmeticTag: d.cosmeticTag,
    data: d
  };
  list.unshift(item);
  try {
    localStorage.setItem('hoi4_cosm_projects_lib', JSON.stringify(list));
    renderProjectsList();
    showToast(t('lib_saved_toast'));
  } catch (e) {
    alert('Память браузера переполнена! Сохраните проект в .json файл.');
  }
}

function renderProjectsList() {
  const container = document.getElementById('cosm_projectsListContainer');
  if (!container) return;

  const list = getStoredProjectsList();
  if (list.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted)">В библиотеке пока нет сохраненных проектов</div>`;
    return;
  }

  let html = '';
  list.forEach(p => {
    html += `
      <div class="project-item">
        <div>
          <div class="project-item-title">${p.name || 'CustomMod'}</div>
          <div class="project-item-meta">${p.date} · Tag: ${p.cosmeticTag || '—'}</div>
        </div>
        <div style="display:flex; gap:8px">
          <button type="button" class="btn-sm" onclick="loadProjectFromLibrary('${p.id}')">Загрузить</button>
          <button type="button" class="btn-sm danger-btn" onclick="deleteProjectFromLibrary('${p.id}')"></button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function loadProjectFromLibrary(id) {
  const list = getStoredProjectsList();
  const item = list.find(x => x.id === id);
  if (item && item.data) {
    populateFormFromData(item.data);
    saveDraft();
    closeProjectsModal();
    showToast(t('loaded_toast'));
  }
}

function deleteProjectFromLibrary(id) {
  if (!confirm('Удалить проект из библиотеки?')) return;
  let list = getStoredProjectsList();
  list = list.filter(x => x.id !== id);
  localStorage.setItem('hoi4_cosm_projects_lib', JSON.stringify(list));
  renderProjectsList();
}

// ─── TABS IN EXPORT SECTION ───────────────────
function showTab(name) {
  document.querySelectorAll('.code-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === 'tab-btn-' + name);
  });
  document.querySelectorAll('.code-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + name);
  });
}

// ─── VALIDATION ───────────────────────────────
function validate() {
  const errs = [];
  if (!val('mod-name')) errs.push(t('val_modname'));
  if (currentScope === 'specific') {
    const parsedTags = parseOwnerTags(val('owner-tag'));
    if (parsedTags.length === 0) {
      errs.push(t('val_owner'));
    }
  }
  if (!val('cosmetic-tag')) errs.push(t('val_cosmetic'));
  if (!val('decision-name')) errs.push(t('val_decname'));
  if (currentCategoryMode === 'custom' && !val('custom-cat-id')) {
    errs.push(t('val_custom_cat'));
  }

  // Check at least one ideology has a name
  const hasAnyName = IDEOLOGIES.some(i => val(`name-${i}`));
  if (!hasAnyName) {
    errs.push(t('val_ideo_one'));
  }

  return errs;
}

// ─── GENERATE PARADOX SCRIPT FILES ────────────
function generateMod() {
  const errs = validate();
  if (errs.length > 0) {
    alert('Пожалуйста, заполните обязательные поля:\n\n• ' + errs.join('\n• '));
    return;
  }

  const data = collectProjectData();
  const modSlug = slugify(data.modName);
  const cosTag = data.cosmeticTag;
  const ownerTags = parseOwnerTags(data.ownerTag);
  let decId = '';
  if (currentScope === 'all') {
    decId = `all_form_${cosTag.toLowerCase()}`;
  } else {
    const firstTag = ownerTags[0] ? ownerTags[0].toLowerCase() : 'custom';
    if (cosTag.toLowerCase().startsWith(firstTag + '_') || cosTag.toLowerCase().startsWith('form_')) {
      decId = `form_${cosTag.toLowerCase()}`;
    } else {
      decId = `${firstTag}_form_${cosTag.toLowerCase()}`;
    }
  }

  // 1. Determine Category ID and localized titles
  const ideos = data.ideologies;
  const firstIdeoWithData = IDEOLOGIES.find(i => ideos[i].name) || 'democratic';
  const baseName = ideos[firstIdeoWithData].name || cosTag;
  const baseAdj = ideos[firstIdeoWithData].adj || baseName;

  const categoryId = currentCategoryMode === 'custom'
    ? (data.customCatId || 'custom_decisions').toLowerCase()
    : `form_${cosTag.toLowerCase()}_category`;

  const categoryTitleRu = currentCategoryMode === 'custom'
    ? (data.customCatName || categoryId)
    : `Создание: ${baseName}`;
  const categoryTitleEn = currentCategoryMode === 'custom'
    ? (data.customCatName || categoryId)
    : `Form: ${baseName}`;

  // 2. Allowed & Visible blocks for Decision
  let decAllowedBlock = '';
  let decVisibleBlock = '';

  const notCosmetics = [
    `\t\tNOT = { has_cosmetic_tag = ${cosTag} }`,
    `\t\tNOT = { has_cosmetic_tag = ${cosTag}_democratic }`,
    `\t\tNOT = { has_cosmetic_tag = ${cosTag}_fascism }`,
    `\t\tNOT = { has_cosmetic_tag = ${cosTag}_communism }`,
    `\t\tNOT = { has_cosmetic_tag = ${cosTag}_neutrality }`,
    `\t\tNOT = { has_country_flag = ${cosTag}_formed }`
  ].join('\n');

  if (currentScope === 'all') {
    decAllowedBlock = '\t\talways = yes';
    decVisibleBlock = `${notCosmetics}`;
  } else if (ownerTags.length === 1) {
    decAllowedBlock = `\t\toriginal_tag = ${ownerTags[0]}`;
    decVisibleBlock = `\t\toriginal_tag = ${ownerTags[0]}\n${notCosmetics}`;
  } else {
    const orLines = ownerTags.map(t => `\t\t\toriginal_tag = ${t}`).join('\n');
    decAllowedBlock = `\t\tOR = {\n${orLines}\n\t\t}`;
    decVisibleBlock = `\t\tOR = {\n${orLines}\n\t\t}\n${notCosmetics}`;
  }

  // 3. Category Definition File (00_${modSlug}_categories.txt - pure definition, NO banner picture)
  const catContent = `${categoryId} = {
\ticon = generic_formable_nations
\tpriority = 90
}
`;

  // 4. Decision Icon & GFX Registration (Standard 32x32 TGA)
  let decisionIcon = 'generic_form_nation';
  let gfxFileContent = null;
  let customIconFileName = null;

  if (decisionImageTga) {
    const cleanPicName = (data.decisionPictureName || `decision_${cosTag.toLowerCase()}`).replace(/[^a-zA-Z0-9_]/g, '');
    const spriteName = cleanPicName.startsWith('GFX_') ? cleanPicName : `GFX_${cleanPicName}`;
    customIconFileName = `${cleanPicName}.tga`;
    decisionIcon = spriteName;

    gfxFileContent = `spriteTypes = {
\tspriteType = {
\t\tname = "${spriteName}"
\t\ttexturefile = "gfx/interface/decisions/${customIconFileName}"
\t}
}
`;
  } else if (data.decisionPictureName && data.decisionPictureName.trim() !== '') {
    const cleanName = data.decisionPictureName.trim();
    if (cleanName.startsWith('GFX_') || cleanName.startsWith('generic_')) {
      decisionIcon = cleanName;
    } else {
      decisionIcon = `GFX_${cleanName}`;
      gfxFileContent = `spriteTypes = {
\tspriteType = {
\t\tname = "GFX_${cleanName}"
\t\ttexturefile = "gfx/interface/decisions/${cleanName}.dds"
\t}
}
`;
    }
  }

  // 5. Decision File (common/decisions/)
  const costLine = data.cost > 0 ? `\n\t\tcost = ${data.cost}` : '';
  const daysLine = data.days > 0 ? `\n\t\tdays_mission_timeout = ${data.days}` : '';
  const removeLine = data.removeDays > 0 ? `\n\t\tdays_remove = ${data.removeDays}` : '';

  let availableBlock = `\t\tis_subject = no`;
  if (data.triggers.length > 0) {
    data.triggers.forEach(tr => {
      const sanitized = sanitizeTrigger(tr);
      if (sanitized) {
        availableBlock += `\n\t\t${sanitized}`;
      }
    });
  }

  // 5b. Assemble complete_effect lines (Canonical HoI4 base cosmetic tag application)
  let completeEffectLines = [
    `\t\t\tset_cosmetic_tag = ${cosTag}`,
    `\t\t\tset_country_flag = ${cosTag}_formed`
  ];

  const capState = parseInt(data.newCapital, 10);
  if (!isNaN(capState) && capState > 0) {
    completeEffectLines.push(`\t\t\tset_capital = { state = ${capState} }`);
  }

  const coreStates = parseStateIds(data.coreStates);
  if (coreStates.length > 0) {
    coreStates.forEach(stId => {
      completeEffectLines.push(`\t\t\t${stId} = { add_core_of = ROOT }`);
    });
  }

  const ppVal = parseInt(data.rewardPP, 10);
  if (!isNaN(ppVal) && ppVal !== 0) {
    completeEffectLines.push(`\t\t\tadd_political_power = ${ppVal}`);
  }

  const stabVal = parseFloat(data.rewardStability);
  if (!isNaN(stabVal) && stabVal !== 0) {
    const sFormatted = (stabVal / 100).toFixed(2);
    completeEffectLines.push(`\t\t\tadd_stability = ${sFormatted}`);
  }

  const wsVal = parseFloat(data.rewardWarSupport);
  if (!isNaN(wsVal) && wsVal !== 0) {
    const wsFormatted = (wsVal / 100).toFixed(2);
    completeEffectLines.push(`\t\t\tadd_war_support = ${wsFormatted}`);
  }

  const mpVal = parseInt(data.rewardManpower, 10);
  if (!isNaN(mpVal) && mpVal !== 0) {
    completeEffectLines.push(`\t\t\tadd_manpower = ${mpVal}`);
  }

  if (Array.isArray(data.customEffects) && data.customEffects.length > 0) {
    data.customEffects.forEach(eff => {
      completeEffectLines.push(`\t\t\t${eff}`);
    });
  }

  completeEffectLines.push(`\t\t\tcustom_effect_tooltip = ${decId}_tooltip`);
  const completeEffectBlock = completeEffectLines.join('\n');

  const decContent = `${categoryId} = {
\t${decId} = {
\t\ticon = ${decisionIcon}${costLine}${daysLine}${removeLine}
\t\tfire_only_once = yes

\t\tallowed = {
${decAllowedBlock}
\t\t}

\t\tvisible = {
${decVisibleBlock}
\t\t}

\t\tavailable = {
${availableBlock}
\t\t}

\t\tcomplete_effect = {
${completeEffectBlock}
\t\t}

\t\tai_will_do = {
\t\t\tfactor = 200
\t\t}
\t}
}
`;

  // 6. Cosmetic Tag Colors (MANDATORY: common/countries/cosmetic.txt)
  const baseVanillaCosmetic = (typeof window !== 'undefined' && window.VANILLA_COSMETIC_TXT) ? window.VANILLA_COSMETIC_TXT.trim() : '';
  const cosmeticContent = `${baseVanillaCosmetic}

${cosTag} = {
\tcolor = rgb { ${data.colorR} ${data.colorG} ${data.colorB} }
\tcolor_ui = rgb { ${data.colorR} ${data.colorG} ${data.colorB} }
}

${cosTag}_democratic = {
\tcolor = rgb { ${data.colorR} ${data.colorG} ${data.colorB} }
\tcolor_ui = rgb { ${data.colorR} ${data.colorG} ${data.colorB} }
}

${cosTag}_fascism = {
\tcolor = rgb { ${data.colorR} ${data.colorG} ${data.colorB} }
\tcolor_ui = rgb { ${data.colorR} ${data.colorG} ${data.colorB} }
}

${cosTag}_communism = {
\tcolor = rgb { ${data.colorR} ${data.colorG} ${data.colorB} }
\tcolor_ui = rgb { ${data.colorR} ${data.colorG} ${data.colorB} }
}

${cosTag}_neutrality = {
\tcolor = rgb { ${data.colorR} ${data.colorG} ${data.colorB} }
\tcolor_ui = rgb { ${data.colorR} ${data.colorG} ${data.colorB} }
}
`;

  // 7. Localisations (Russian & English)
  let locRuLines = [
    `\uFEFFl_russian:`,
    ` ${cosTag}: "${escapePds(baseName)}"`,
    ` ${cosTag}_DEF: "${escapePds(baseName)}"`,
    ` ${cosTag}_ADJ: "${escapePds(baseAdj)}"`
  ];

  let locEnLines = [
    `\uFEFFl_english:`,
    ` ${cosTag}: "${escapePds(baseName)}"`,
    ` ${cosTag}_DEF: "${escapePds(baseName)}"`,
    ` ${cosTag}_ADJ: "${escapePds(baseAdj)}"`
  ];

  // Specific 4 ideologies
  IDEOLOGIES.forEach(i => {
    const iName = ideos[i].name || baseName;
    const iAdj = ideos[i].adj || baseAdj;
    locRuLines.push(` ${cosTag}_${i}: "${escapePds(iName)}"`);
    locRuLines.push(` ${cosTag}_${i}_DEF: "${escapePds(iName)}"`);
    locRuLines.push(` ${cosTag}_${i}_ADJ: "${escapePds(iAdj)}"`);

    locEnLines.push(` ${cosTag}_${i}: "${escapePds(iName)}"`);
    locEnLines.push(` ${cosTag}_${i}_DEF: "${escapePds(iName)}"`);
    locEnLines.push(` ${cosTag}_${i}_ADJ: "${escapePds(iAdj)}"`);
  });

  // Category localization
  locRuLines.push(` ${categoryId}: "${escapePds(categoryTitleRu)}"`);
  locRuLines.push(` ${categoryId}_desc: "Специальные решения для создания и реорганизации государства."`);

  locEnLines.push(` ${categoryId}: "${escapePds(categoryTitleEn)}"`);
  locEnLines.push(` ${categoryId}_desc: "Special decisions regarding nation formation and reorganization."`);

  // Decision localization
  const decTitle = data.decisionName || `Создать ${baseName}`;
  const decDesc = data.decisionDesc || `Провозглашает создание ${baseName}.`;

  locRuLines.push(` ${decId}: "${escapePds(decTitle)}"`);
  locRuLines.push(` ${decId}_desc: "${escapePds(decDesc)}"`);
  locRuLines.push(` ${decId}_tooltip: "§GСтрана принимает флаг, название и символику §Y${escapePds(baseName)}§!.§!"`);

  locEnLines.push(` ${decId}: "${escapePds(decTitle)}"`);
  locEnLines.push(` ${decId}_desc: "${escapePds(decDesc)}"`);
  locEnLines.push(` ${decId}_tooltip: "§GThe nation adopts the cosmetic tag, flag and name of §Y${escapePds(baseName)}§!.§!"`);

  const locRuContent = locRuLines.join('\n') + '\n';
  const locEnContent = locEnLines.join('\n') + '\n';

  // 8. Descriptors (Internal without path=, External with path=)
  const commonDependencies = `dependencies={
\t"Paint_it"
\t"Colored Puppets"
\t"Always Color Puppets"
\t"Country Customizer - Change Name & Flag In-Game"
\t"The Road to 56"
\t"Kaiserreich"
\t"Millennium Dawn: Modern Day Mod"
\t"awxe's Formable Nations"
\t"Formable Nations"
\t"Red Flood"
\t"Russia Reworked Complete Update"
\t"Troubles in Robloxia"
}
`;

  const internalDescContent = `version="${escapePds(data.modVersion)}"
tags={
\t"Alternative History"
\t"Decisions"
\t"National Focuses"
\t"Events"
}
name="${escapePds(data.modName)}"
supported_version="${escapePds(data.hoi4version)}"
${commonDependencies}`;

  const externalModContent = `version="${escapePds(data.modVersion)}"
tags={
\t"Alternative History"
\t"Decisions"
\t"National Focuses"
\t"Events"
}
name="${escapePds(data.modName)}"
supported_version="${escapePds(data.hoi4version)}"
path="mod/${modSlug}"
${commonDependencies}`;

  // 9. Store files for ZIP
  const customLoc = (data.customLocFileName || '').trim();
  const locRuFile = customLoc ? (customLoc.endsWith('.yml') || customLoc.endsWith('.yaml') ? customLoc : `${customLoc}.yml`) : `${modSlug}_l_russian.yml`;
  const locEnFile = customLoc ? (customLoc.includes('_l_russian') ? customLoc.replace('_l_russian', '_l_english') : `${locRuFile.replace(/\.ya?ml$/, '')}_l_english.yml`) : `${modSlug}_l_english.yml`;

  // Update tabs labels
  const fpLocRuEl = document.getElementById('fp-loc-ru');
  if (fpLocRuEl) fpLocRuEl.textContent = `localisation/russian/${locRuFile} (UTF-8 BOM)`;
  const fpLocEnEl = document.getElementById('fp-loc-en');
  if (fpLocEnEl) fpLocEnEl.textContent = `localisation/english/${locEnFile} (UTF-8 BOM)`;

  generatedFiles = {
    text: {
      [`${modSlug}/common/decisions/categories/00_${modSlug}_categories.txt`]: catContent,
      [`${modSlug}/common/decisions/${modSlug}_decisions.txt`]: decContent,
      [`${modSlug}/common/countries/cosmetic.txt`]: cosmeticContent,
      [`${modSlug}/localisation/${locRuFile}`]: locRuContent,
      [`${modSlug}/localisation/${locEnFile}`]: locEnContent,
      [`${modSlug}/localisation/russian/${locRuFile}`]: locRuContent,
      [`${modSlug}/localisation/english/${locEnFile}`]: locEnContent,
      [`${modSlug}/descriptor.mod`]: internalDescContent,
      [`${modSlug}.mod`]: externalModContent,
      [`${modSlug}/README.md`]: `# ${data.modName}\n\nGenerated with HoI4 Cosmetic Tag Creator for HoI4 ${data.hoi4version}.\n\nInstallation:\n1. Copy the '${modSlug}' folder AND the '${modSlug}.mod' file into:\n   Documents/Paradox Interactive/Hearts of Iron IV/mod/\n2. Enable the mod in the Paradox Launcher 'Playsets' tab.\n`
    },
    tgaFlags: {}
  };

  if (gfxFileContent) {
    generatedFiles.text[`${modSlug}/interface/${modSlug}_decisions.gfx`] = gfxFileContent;
  }

  if (decisionImageTga && customIconFileName) {
    generatedFiles.tgaFlags[`${modSlug}/gfx/interface/decisions/${customIconFileName}`] = decisionImageTga;
  }

  // Convert uploaded flags of the 4 ideologies into TGA binaries
  let firstTga82 = null;
  let firstTga41 = null;
  let firstTga10 = null;

  IDEOLOGIES.forEach(i => {
    if (flagsData[i]) {
      const cv82 = document.getElementById(`cv-${i}-82`);
      const cv41 = document.getElementById(`cv-${i}-41`);
      const cv10 = document.getElementById(`cv-${i}-10`);

      if (cv82 && cv41 && cv10) {
        const tga82 = canvasToTGA(cv82);
        const tga41 = canvasToTGA(cv41);
        const tga10 = canvasToTGA(cv10);

        if (!firstTga82) {
          firstTga82 = tga82;
          firstTga41 = tga41;
          firstTga10 = tga10;
        }

        generatedFiles.tgaFlags[`${modSlug}/gfx/flags/${cosTag}_${i}.tga`] = tga82;
        generatedFiles.tgaFlags[`${modSlug}/gfx/flags/medium/${cosTag}_${i}.tga`] = tga41;
        generatedFiles.tgaFlags[`${modSlug}/gfx/flags/small/${cosTag}_${i}.tga`] = tga10;
      }
    }
  });

  // Base fallback flags
  if (firstTga82) {
    generatedFiles.tgaFlags[`${modSlug}/gfx/flags/${cosTag}.tga`] = firstTga82;
    generatedFiles.tgaFlags[`${modSlug}/gfx/flags/medium/${cosTag}.tga`] = firstTga41;
    generatedFiles.tgaFlags[`${modSlug}/gfx/flags/small/${cosTag}.tga`] = firstTga10;
  }

  // UI Updates
  const elCat = document.getElementById('code-categories');
  if (elCat) elCat.textContent = catContent;
  const elDec = document.getElementById('code-decisions');
  if (elDec) elDec.textContent = decContent;
  const elCosm = document.getElementById('code-cosmetic');
  if (elCosm) elCosm.textContent = cosmeticContent;
  const elLocRu = document.getElementById('code-loc-ru');
  if (elLocRu) elLocRu.textContent = locRuContent;
  const elLocEn = document.getElementById('code-loc-en');
  if (elLocEn) elLocEn.textContent = locEnContent;
  const elDesc = document.getElementById('code-descriptor');
  if (elDesc) elDesc.textContent = internalDescContent;

  const fpCat = document.getElementById('fp-categories');
  if (fpCat) fpCat.textContent = `common/decisions/categories/00_${modSlug}_categories.txt`;
  const fpDec = document.getElementById('fp-decisions');
  if (fpDec) fpDec.textContent = `common/decisions/${modSlug}_decisions.txt`;

  buildSummary(baseName);
  buildFileTree(modSlug, cosTag, Boolean(gfxFileContent), customIconFileName);

  document.getElementById('btn-download').style.display = 'inline-flex';
  showToast(t('generated_toast'));
  showTab('summary');

  // Scroll to results
  document.getElementById('panel-summary').scrollIntoView({ behavior: 'smooth' });
}

// ─── SUMMARY & FILE TREE ──────────────────────
function buildSummary(baseName) {
  const d = collectProjectData();
  const container = document.getElementById('summary-content');
  if (!container) return;

  const flagCount = Object.values(flagsData).filter(Boolean).length;
  const ownerTags = parseOwnerTags(d.ownerTag);

  const scopeVal = currentScope === 'all'
    ? (currentLang === 'ru' ? 'Все страны мира' : 'All Nations Worldwide')
    : (ownerTags.length > 1
        ? (currentLang === 'ru' ? `Страны (${ownerTags.length}): ${ownerTags.join(', ')}` : `Countries (${ownerTags.length}): ${ownerTags.join(', ')}`)
        : (currentLang === 'ru' ? `Только ${ownerTags[0] || d.ownerTag || '—'}` : `Only ${ownerTags[0] || d.ownerTag || '—'}`));

  const categoryId = currentCategoryMode === 'custom'
    ? (d.customCatId || 'custom_decisions').toLowerCase()
    : `form_${(d.cosmeticTag || 'custom').toLowerCase()}_category`;

  const coreStates = parseStateIds(d.coreStates);
  const coreVal = coreStates.length > 0
    ? (currentLang === 'ru' ? `${coreStates.length} шт. (${coreStates.join(', ')})` : `${coreStates.length} (${coreStates.join(', ')})`)
    : (currentLang === 'ru' ? 'Не заданы' : 'None');

  const capState = parseInt(d.newCapital, 10);
  const capVal = (!isNaN(capState) && capState > 0)
    ? (currentLang === 'ru' ? `Регион ${capState}` : `State ${capState}`)
    : (currentLang === 'ru' ? 'Без изменений' : 'Unchanged');

  const buffsList = [];
  if (d.rewardPP) buffsList.push(`${d.rewardPP > 0 ? '+' : ''}${d.rewardPP} PP`);
  if (d.rewardStability) buffsList.push(`${d.rewardStability > 0 ? '+' : ''}${d.rewardStability}% Stab`);
  if (d.rewardWarSupport) buffsList.push(`${d.rewardWarSupport > 0 ? '+' : ''}${d.rewardWarSupport}% WS`);
  if (d.rewardManpower) buffsList.push(`+${d.rewardManpower} MP`);
  if (Array.isArray(d.customEffects) && d.customEffects.length > 0) {
    buffsList.push(`+${d.customEffects.length} ${currentLang === 'ru' ? 'эфф.' : 'effects'}`);
  }
  const buffsVal = buffsList.length > 0 ? buffsList.join(', ') : (currentLang === 'ru' ? 'Стандартные' : 'Standard');

  const items = [
    [currentLang === 'ru' ? 'Мод' : 'Mod', d.modName],
    [currentLang === 'ru' ? 'Версия' : 'Version', d.modVersion],
    [currentLang === 'ru' ? 'Версия HoI4' : 'HoI4 Version', d.hoi4version],
    [currentLang === 'ru' ? 'Доступность' : 'Scope', scopeVal],
    ['Cosmetic Tag', d.cosmeticTag],
    [currentLang === 'ru' ? 'Категория решений' : 'Category', categoryId],
    [currentLang === 'ru' ? 'Стоимость' : 'Cost', `${d.cost} PP`],
    [currentLang === 'ru' ? 'Нац. регионы (Cores)' : 'National Cores', coreVal],
    [currentLang === 'ru' ? 'Новая столица' : 'New Capital', capVal],
    [currentLang === 'ru' ? 'Награды и бонусы' : 'Rewards & Buffs', buffsVal],
    [currentLang === 'ru' ? 'Основное имя' : 'Base Name', baseName || '—'],
    [currentLang === 'ru' ? 'Цвет на карте' : 'Map Color', `RGB(${d.colorR}, ${d.colorG}, ${d.colorB})`],
    [currentLang === 'ru' ? 'Флагов создано' : 'Flags Created', `${flagCount} (× 3 ${currentLang === 'ru' ? 'размера' : 'sizes'} = ${flagCount * 3 + (flagCount > 0 ? 3 : 0)} TGA)`]
  ];

  container.innerHTML = `
    <div class="summary-grid">
      ${items.map(([l, v]) => `
        <div class="summary-card">
          <div class="summary-card-title">${l}</div>
          <div class="summary-card-value">${v}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function buildFileTree(modSlug, cosTag, hasGfx = false, customIconFileName = null) {
  const container = document.getElementById('tree-content');
  if (!container) return;

  let flagEntries = '';
  IDEOLOGIES.forEach(i => {
    if (flagsData[i]) {
      flagEntries += `│   ├── <span class="tree-f">${cosTag}_${i}.tga</span> <span class="tree-sub">(82×52 TGA 32-bit)</span>\n`;
    }
  });

  const hasFlags = Object.values(flagsData).some(Boolean);
  if (hasFlags) {
    flagEntries = `│   ├── <span class="tree-f">${cosTag}.tga</span> <span class="tree-sub">(базовый fallback 82×52)</span>\n` + flagEntries;
  }

  const gfxEntry = hasGfx
    ? `├── <span class="tree-dir">interface/</span>\n│   └── <span class="tree-f">${modSlug}_decisions.gfx</span> <span class="tree-sub">(регистрация спрайта иконки)</span>\n`
    : '';

  const decIconEntry = (decisionImageTga && customIconFileName)
    ? `│   ├── <span class="tree-dir">interface/</span>\n│   │   └── <span class="tree-dir">decisions/</span>\n│   │       └── <span class="tree-f">${customIconFileName}</span> <span class="tree-sub">(32×32 TGA)</span>\n`
    : '';

  container.innerHTML = `
<div class="file-tree-view">
<span class="tree-dir">${modSlug}/</span>
├── <span class="tree-dir">common/</span>
│   ├── <span class="tree-dir">decisions/</span>
│   │   ├── <span class="tree-dir">categories/</span>
│   │   │   └── <span class="tree-f">00_${modSlug}_categories.txt</span> <span class="tree-sub">(определение категории)</span>
│   │   └── <span class="tree-f">${modSlug}_decisions.txt</span> <span class="tree-sub">(само решение)</span>
│   ├── <span class="tree-dir">countries/</span>
│   │   └── <span class="tree-f">cosmetic.txt</span> <span class="tree-sub">(цвета косметического тега)</span>
├── <span class="tree-dir">localisation/</span>
│   ├── <span class="tree-f">${locRuFile}</span>
│   ├── <span class="tree-f">${locEnFile}</span>
│   ├── <span class="tree-dir">russian/</span>
│   │   └── <span class="tree-f">${locRuFile}</span>
│   └── <span class="tree-dir">english/</span>
│       └── <span class="tree-f">${locEnFile}</span>
${gfxEntry}├── <span class="tree-dir">gfx/</span>
${decIconEntry}│   └── <span class="tree-dir">flags/</span>
${flagEntries || '│       └── (флаги не загружались)\n'}
│       ├── <span class="tree-dir">medium/</span> <span class="tree-sub">(41×26 TGA)</span>
│       └── <span class="tree-dir">small/</span> <span class="tree-sub">(10×7 TGA)</span>
├── <span class="tree-f">descriptor.mod</span> <span class="tree-sub">(внутри папки мода, без path=)</span>
└── <span class="tree-f">README.md</span>

<span class="tree-f">${modSlug}.mod</span> <span class="tree-sub">(файл дескриптора с path="mod/${modSlug}", кладется в папку mod)</span>
</div>
`;
}

// ─── ZIP DOWNLOAD ─────────────────────────────
async function downloadMod() {
  if (!generatedFiles) return;

  showToast(t('download_toast'));
  const zip = new JSZip();

  // Add text files
  for (const [path, content] of Object.entries(generatedFiles.text)) {
    zip.file(path, content);
  }

  // Add binary TGA files (flags and 32x32 decision icons)
  for (const [path, tgaBuf] of Object.entries(generatedFiles.tgaFlags)) {
    zip.file(path, tgaBuf);
  }

  const modSlug = slugify(val('mod-name'));
  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${modSlug}_hoi4_1.19.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── COPY HELPER ──────────────────────────────
function copyCode(elemId) {
  const el = document.getElementById(elemId);
  if (!el) return;
  const text = el.textContent;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast(t('copied_toast')));
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(t('copied_toast'));
  }
}

// ─── STARTUP ──────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('hoi4_cosm_lang');
  if (savedLang === 'en' || savedLang === 'ru') {
    currentLang = savedLang;
  }
  updateColorPreview();
});


// ─── QUICK PRESETS (1-CLICK TEMPLATES) ────────
const COSMETIC_PRESETS = {
  pol_lithuania: {
    modName: 'Polish-Lithuanian Commonwealth',
    scope: 'specific',
    ownerTag: 'POL, LIT, BLR',
    cosmeticTag: 'POL_LITHUANIA',
    categoryMode: 'formation',
    decisionName: 'Восстановить Речь Посполитую',
    decisionDesc: 'Объединить земли Королевства Польского и Великого княжества Литовского в единую мощную державу.',
    cost: 50,
    coreStates: '10, 11, 85, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 110, 188, 189, 190, 191',
    newCapital: '110',
    rewardPP: 100,
    rewardStability: 10,
    rewardWarSupport: 10,
    rewardManpower: 50000,
    colorR: 176, colorG: 81, colorB: 111,
    triggers: [
      'controls_state = 10',
      'controls_state = 11',
      'controls_state = 85',
      'controls_state = 110',
      'is_subject = no'
    ],
    ideologies: {
      democratic: { name: 'Речь Посполитая', adj: 'польско-литовский' },
      fascism: { name: 'Великая Речь Посполитая', adj: 'польско-литовский' },
      communism: { name: 'Содружество Наций', adj: 'содружественный' },
      neutrality: { name: 'Королевство Польско-Литовское', adj: 'польско-литовский' }
    }
  },
  geo_transcaucasia: {
    modName: 'Transcaucasian Federation',
    scope: 'specific',
    ownerTag: 'GEO, ARM, AZR',
    cosmeticTag: 'GEO_TRANSCAUCASIA',
    categoryMode: 'formation',
    decisionName: 'Провозгласить Закавказскую Федерацию',
    decisionDesc: 'Объединить народы Кавказа в единое федеративное государство.',
    cost: 50,
    coreStates: '230, 231, 232, 233, 539',
    newCapital: '231',
    rewardPP: 75,
    rewardStability: 15,
    rewardWarSupport: 10,
    rewardManpower: 35000,
    colorR: 204, colorG: 102, colorB: 0,
    triggers: [
      'controls_state = 230',
      'controls_state = 231',
      'controls_state = 232',
      'is_subject = no'
    ],
    ideologies: {
      democratic: { name: 'Закавказская Демократическая Федеративная Республика', adj: 'закавказский' },
      fascism: { name: 'Кавказская Империя', adj: 'кавказский' },
      communism: { name: 'Закавказская Социалистическая Федерация', adj: 'закавказский' },
      neutrality: { name: 'Закавказская Конфедерация', adj: 'закавказский' }
    }
  },
  ger_empire: {
    modName: 'German Empire Restoration',
    scope: 'specific',
    ownerTag: 'GER',
    cosmeticTag: 'GER_EMPIRE',
    categoryMode: 'formation',
    decisionName: 'Восстановить Германскую Империю',
    decisionDesc: 'Возродить великую Германскую Империю и восстановить исторические границы.',
    cost: 75,
    coreStates: '5, 42, 64, 67, 68',
    newCapital: '64',
    rewardPP: 120,
    rewardStability: 15,
    rewardWarSupport: 15,
    rewardManpower: 100000,
    colorR: 128, colorG: 128, colorB: 128,
    triggers: [
      'controls_state = 64',
      'controls_state = 5',
      'has_government = neutrality',
      'is_subject = no'
    ],
    ideologies: {
      democratic: { name: 'Германская Федеративная Империя', adj: 'германский' },
      fascism: { name: 'Великий Германский Рейх', adj: 'германский' },
      communism: { name: 'Германская Народная Республика', adj: 'германский' },
      neutrality: { name: 'Германская Империя', adj: 'имперский' }
    }
  },
  sov_empire: {
    modName: 'Russian Empire Restoration',
    scope: 'specific',
    ownerTag: 'SOV',
    cosmeticTag: 'SOV_EMPIRE',
    categoryMode: 'formation',
    decisionName: 'Возродить Российскую Империю',
    decisionDesc: 'Восстановить историческую Российскую Империю и восстановить престол.',
    cost: 100,
    coreStates: '195, 208, 219, 237, 243',
    newCapital: '195',
    rewardPP: 150,
    rewardStability: 20,
    rewardWarSupport: 15,
    rewardManpower: 200000,
    colorR: 64, colorG: 128, colorB: 0,
    triggers: [
      'controls_state = 195',
      'controls_state = 219',
      'has_government = neutrality',
      'is_subject = no'
    ],
    ideologies: {
      democratic: { name: 'Российская Республика', adj: 'российский' },
      fascism: { name: 'Всероссийская Империя', adj: 'российский' },
      communism: { name: 'Союз Советских Республик', adj: 'советский' },
      neutrality: { name: 'Российская Империя', adj: 'имперский' }
    }
  }
};

function cosm_applyPreset(key) {
  const p = COSMETIC_PRESETS[key];
  if (!p) return;
  populateFormFromData(p);
  onFieldChange();
  showToast(currentLang === 'ru' ? 'Шаблон применён: ' + p.modName : 'Preset applied: ' + p.modName);
}
window.cosm_applyPreset = cosm_applyPreset;

// ─── EXPOSE NON-COLLIDING GLOBAL HANDLERS ─────
window.cosm_setScope = setScope;
window.cosm_handleOwnerTagsInput = handleOwnerTagsInput;
window.cosm_handleCoreStatesInput = handleCoreStatesInput;
window.cosm_setCategoryMode = setCategoryMode;
window.cosm_addTrigger = addTrigger;
window.cosm_getTriggers = getTriggers;
window.cosm_openTriggersModal = openTriggersModal;
window.cosm_closeTriggersModal = closeTriggersModal;
window.cosm_renderTriggersCheat = renderTriggersCheat;
window.cosm_insertTriggerFromCheat = insertTriggerFromCheat;
window.cosm_addCustomEffect = addCustomEffect;
window.cosm_getCustomEffects = getCustomEffects;
window.cosm_openEffectsModal = openEffectsModal;
window.cosm_closeEffectsModal = closeEffectsModal;
window.cosm_renderEffectsCheat = renderEffectsCheat;
window.cosm_filterTriggers = renderTriggersCheat;
window.cosm_filterEffects = renderEffectsCheat;
window.cosm_insertEffectFromCheat = insertEffectFromCheat;
// State Map Exports
window.cosm_openStatesMap = openStatesMap;
window.cosm_closeStatesMap = closeStatesMap;
window.cosm_filterStatesMap = filterStatesMap;
window.cosm_clearStateSearch = clearStateSearch;
window.cosm_selectMapRegion = selectMapRegion;
window.cosm_onMapCountryChange = onMapCountryChange;
window.cosm_toggleState = toggleState;
window.cosm_selectAllFilteredStates = selectAllFilteredStates;
window.cosm_deselectAllFilteredStates = deselectAllFilteredStates;
window.cosm_clearSelectedStates = clearSelectedStates;
window.cosm_copySelectedStateIds = copySelectedStateIds;
window.cosm_applySelectedStatesToTarget = applySelectedStatesToTarget;
window.cosm_mapZoomIn = cosm_mapZoomIn;
window.cosm_mapZoomOut = cosm_mapZoomOut;
window.cosm_mapZoomReset = cosm_mapZoomReset;

window.cosm_showIdeology = showIdeology;
window.cosm_handleFlagUpload = handleFlagUpload;
window.cosm_clearFlag = clearFlag;
window.cosm_handleDecisionImageUpload = handleDecisionImageUpload;
window.cosm_clearDecisionImage = clearDecisionImage;
window.cosm_updateColorPreview = updateColorPreview;
window.cosm_syncColorFromPicker = syncColorFromPicker;
window.cosm_onFieldChange = onFieldChange;
window.cosm_saveProjectToFile = saveProjectToFile;
window.cosm_triggerLoadProjectFile = triggerLoadProjectFile;
window.cosm_handleProjectFileUpload = handleProjectFileUpload;
window.cosm_createNewProject = createNewProject;
window.cosm_openProjectsModal = openProjectsModal;
window.cosm_closeProjectsModal = closeProjectsModal;
window.cosm_saveCurrentToLibrary = saveCurrentToLibrary;
window.cosm_renderProjectsList = renderProjectsList;
window.cosm_loadProjectFromLibrary = loadProjectFromLibrary;
window.cosm_deleteProjectFromLibrary = deleteProjectFromLibrary;
window.cosm_showTab = showTab;
window.cosm_generateMod = generateMod;
window.cosm_downloadMod = downloadMod;
window.cosm_copyCode = copyCode;

window.CosmeticCreator = {
  init: function(lang) {
    initApp(lang);
  },
  applyLang: function(lang) {
    currentLang = (lang === 'en' || lang === 'ru') ? lang : 'ru';
    applyTranslations();
  },
  onActivate: function() {
    updateColorPreview();
    updateProjectToolbar();
  },
  getProjectData: collectProjectData
};

})();
