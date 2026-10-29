// Complete HoI4 Buffs, Debuffs, Idea Modifiers & Effects Database
// Extracted from Clausewitz engine & Hearts of Iron IV game files

const HOI4_ALL_EFFECTS = [
  {
    category: { ru: "🎁 Прямые команды решений (Direct Effects)", en: "🎁 Direct Decision Effects" },
    items: [
      { code: "add_political_power = 150", desc: { ru: "Добавить 150 очков политической силы (PP)", en: "Add 150 political power" } },
      { code: "add_stability = 0.15", desc: { ru: "Увеличить стабильность на +15%", en: "Add +15% stability" } },
      { code: "add_war_support = 0.15", desc: { ru: "Увеличить поддержку войны на +15%", en: "Add +15% war support" } },
      { code: "add_manpower = 50000", desc: { ru: "Добавить 50 000 призывников в пул", en: "Add 50,000 manpower" } },
      { code: "add_command_power = 50", desc: { ru: "Добавить 50 очков командного ресурса (CP)", en: "Add 50 command power" } },
      { code: "add_research_slot = 1", desc: { ru: "Добавить +1 постоянную ячейку исследований", en: "Add +1 permanent research slot" } },
      { code: "army_experience = 50", desc: { ru: "Добавить 50 очков опыта армии", en: "Add 50 army experience" } },
      { code: "air_experience = 50", desc: { ru: "Добавить 50 очков опыта авиации", en: "Add 50 air experience" } },
      { code: "navy_experience = 50", desc: { ru: "Добавить 50 очков опыта флота", en: "Add 50 navy experience" } },
      { code: "add_nukes = 1", desc: { ru: "Добавить 1 ядерную бомбу в арсенал", en: "Add 1 nuclear weapon" } },
      { code: "add_offsite_building = { type = industrial_complex level = 2 }", desc: { ru: "Добавить 2 внекартовые фабрики (вечные фабрики)", en: "Add 2 off-site civilian factories" } },
      { code: "add_offsite_building = { type = arms_factory level = 2 }", desc: { ru: "Добавить 2 внекартовых военных завода", en: "Add 2 off-site military factories" } },
      { code: "add_offsite_building = { type = dockyard level = 2 }", desc: { ru: "Добавить 2 внекартовые верфи", en: "Add 2 off-site dockyards" } },
      { code: "add_threat = -10", desc: { ru: "Снизить мировую напряженность на -10%", en: "Decrease world tension by -10%" } },
      { code: "add_threat = 10", desc: { ru: "Увеличить мировую напряженность на +10%", en: "Increase world tension by +10%" } },
      { code: "set_rule = { can_create_factions = yes }", desc: { ru: "Разрешить стране создавать альянсы (фракции)", en: "Allow country to create factions" } },
      { code: "set_rule = { can_puppet = yes }", desc: { ru: "Разрешить делать другие страны марионетками", en: "Allow country to puppet" } },
      { code: "set_rule = { can_send_volunteers = yes }", desc: { ru: "Разрешить отправку добровольцев", en: "Allow sending volunteers" } }
    ]
  },
  {
    category: { ru: "🏭 Промышленность и Строительство (Баффы)", en: "🏭 Industry & Construction (Buffs)" },
    items: [
      { code: "industrial_capacity_factory = 0.15", desc: { ru: "Производительность фабрик и военных заводов: +15%", en: "Factory output: +15%" } },
      { code: "industrial_capacity_dockyard = 0.20", desc: { ru: "Производительность верфей: +20%", en: "Dockyard output: +20%" } },
      { code: "consumer_goods_factor = -0.05", desc: { ru: "Товары народного потребления (ТНП): -5% (больше свободных фабрик)", en: "Consumer goods factor: -5%" } },
      { code: "production_factory_max_efficiency_factor = 0.10", desc: { ru: "Максимальная эффективность производства: +10%", en: "Max production efficiency: +10%" } },
      { code: "production_factory_efficiency_gain_factor = 0.20", desc: { ru: "Скорость роста эффективности производства: +20%", en: "Production efficiency growth: +20%" } },
      { code: "line_change_production_efficiency_factor = 0.25", desc: { ru: "Сохранение эффективности при смене производства: +25%", en: "Production efficiency retention: +25%" } },
      { code: "production_speed_buildings_factor = 0.15", desc: { ru: "Общая скорость строительства всех сооружений: +15%", en: "General construction speed: +15%" } },
      { code: "production_speed_industrial_complex_factor = 0.20", desc: { ru: "Скорость строительства гражданских фабрик: +20%", en: "Civilian factory construction speed: +20%" } },
      { code: "production_speed_arms_factory_factor = 0.20", desc: { ru: "Скорость строительства военных заводов: +20%", en: "Military factory construction speed: +20%" } },
      { code: "production_speed_dockyard_factor = 0.20", desc: { ru: "Скорость строительства верфей: +20%", en: "Dockyard construction speed: +20%" } },
      { code: "production_speed_infrastructure_factor = 0.25", desc: { ru: "Скорость строительства инфраструктуры: +25%", en: "Infrastructure construction speed: +25%" } },
      { code: "production_speed_bunker_factor = 0.30", desc: { ru: "Скорость постройки наземных укреплений: +30%", en: "Land fort construction speed: +30%" } },
      { code: "production_speed_coastal_bunker_factor = 0.30", desc: { ru: "Скорость постройки береговых укреплений: +30%", en: "Coastal fort construction speed: +30%" } },
      { code: "production_speed_anti_air_building_factor = 0.25", desc: { ru: "Скорость постройки стационарного ПВО: +25%", en: "Anti-air construction speed: +25%" } },
      { code: "production_speed_synthetic_refinery_factor = 0.25", desc: { ru: "Скорость постройки НПЗ (синтетики): +25%", en: "Synthetic refinery construction speed: +25%" } },
      { code: "production_speed_rail_way_factor = 0.30", desc: { ru: "Скорость строительства железных дорог: +30%", en: "Railway construction speed: +30%" } },
      { code: "conversion_cost_civ_to_mil_factor = -0.30", desc: { ru: "Стоимость конверсии фабрик в военные заводы: -30%", en: "Civ to mil conversion cost: -30%" } },
      { code: "conversion_cost_mil_to_civ_factor = -0.30", desc: { ru: "Стоимость конверсии заводов в фабрики: -30%", en: "Mil to civ conversion cost: -30%" } },
      { code: "global_building_slots_factor = 0.20", desc: { ru: "Дополнительные ячейки строительства в регионах: +20%", en: "Building slots in states: +20%" } },
      { code: "repair_speed_factor = 0.30", desc: { ru: "Скорость ремонта повреждённых сооружений: +30%", en: "Construction repair speed: +30%" } }
    ]
  },
  {
    category: { ru: "⚔️ Армия и Сухопутные войска (Баффы)", en: "⚔️ Army & Land Combat (Buffs)" },
    items: [
      { code: "army_attack_factor = 0.10", desc: { ru: "Атака всех сухопутных дивизий: +10%", en: "Division attack: +10%" } },
      { code: "army_defence_factor = 0.10", desc: { ru: "Оборона всех сухопутных дивизий: +10%", en: "Division defence: +10%" } },
      { code: "army_org_factor = 0.10", desc: { ru: "Максимальная организация дивизий: +10%", en: "Division max organisation: +10%" } },
      { code: "army_org_regain = 0.15", desc: { ru: "Скорость восстановления организации: +15%", en: "Division org recovery: +15%" } },
      { code: "army_morale_factor = 0.15", desc: { ru: "Боевой дух армии: +15%", en: "Army recovery rate / morale: +15%" } },
      { code: "army_speed_factor = 0.10", desc: { ru: "Скорость передвижения сухопутных войск: +10%", en: "Army speed: +10%" } },
      { code: "army_core_attack_factor = 0.15", desc: { ru: "Атака дивизий на национальной территории: +15%", en: "Attack on core territory: +15%" } },
      { code: "army_core_defence_factor = 0.15", desc: { ru: "Оборона дивизий на национальной территории: +15%", en: "Defence on core territory: +15%" } },
      { code: "planning_speed = 0.25", desc: { ru: "Скорость накопления плана наступления: +25%", en: "Planning speed: +25%" } },
      { code: "max_planning = 0.25", desc: { ru: "Максимальный бонус планирования: +25%", en: "Max planning bonus: +25%" } },
      { code: "dig_in_speed_factor = 0.30", desc: { ru: "Скорость окапывания дивизий: +30%", en: "Entrenchment speed: +30%" } },
      { code: "max_dig_in = 5", desc: { ru: "Максимальный уровень окопанности дивизий: +5", en: "Max entrenchment level: +5" } },
      { code: "attrition = -0.20", desc: { ru: "Небоевые потери от местности и погоды: -20%", en: "Army attrition: -20%" } },
      { code: "supply_consumption_factor = -0.15", desc: { ru: "Потребление снабжения дивизиями: -15%", en: "Supply consumption: -15%" } },
      { code: "out_of_supply_factor = -0.25", desc: { ru: "Штрафы от отсутствия снабжения: -25%", en: "Out of supply penalty: -25%" } },
      { code: "experience_gain_army_factor = 0.25", desc: { ru: "Скорость получения армейского опыта в боях: +25%", en: "Army experience gain: +25%" } },
      { code: "special_forces_cap = 0.05", desc: { ru: "Доля дивизий спецназа в армии: +5%", en: "Special forces capacity: +5%" } },
      { code: "special_forces_attack_factor = 0.15", desc: { ru: "Атака спецвойск (ВДВ, морпехи, горняки): +15%", en: "Special forces attack: +15%" } },
      { code: "special_forces_defence_factor = 0.15", desc: { ru: "Оборона спецвойск: +15%", en: "Special forces defence: +15%" } },
      { code: "training_time_army_factor = -0.15", desc: { ru: "Время обучения новых дивизий: -15%", en: "Division training time: -15%" } },
      { code: "recon_factor = 0.20", desc: { ru: "Эффективность разведки в бою: +20%", en: "Combat reconnaissance: +20%" } }
    ]
  },
  {
    category: { ru: "✈️ Авиация и Воздушные силы (Баффы)", en: "✈️ Air Force & Air Combat (Buffs)" },
    items: [
      { code: "air_superiority_factor = 0.15", desc: { ru: "Эффективность превосходства в воздухе: +15%", en: "Air superiority effectiveness: +15%" } },
      { code: "air_cas_efficiency = 0.20", desc: { ru: "Урон непосредственной поддержки с воздуха (CAS): +20%", en: "Close air support (CAS) efficiency: +20%" } },
      { code: "air_range_factor = 0.20", desc: { ru: "Дальность действия самолётов: +20%", en: "Aircraft operational range: +20%" } },
      { code: "air_accidents_factor = -0.30", desc: { ru: "Вероятность лётных происшествий: -30%", en: "Air accident rate: -30%" } },
      { code: "air_mission_efficiency = 0.15", desc: { ru: "Эффективность всех воздушных заданий: +15%", en: "Air mission efficiency: +15%" } },
      { code: "air_ace_generation_chance_factor = 0.30", desc: { ru: "Шанс появления воздушных асов: +30%", en: "Air ace generation chance: +30%" } },
      { code: "experience_gain_air_factor = 0.25", desc: { ru: "Прирост опыта авиации: +25%", en: "Air experience gain: +25%" } },
      { code: "air_nav_efficiency = 0.20", desc: { ru: "Эффективность морской бомбардировки флота: +20%", en: "Naval strike mission efficiency: +20%" } },
      { code: "air_strategic_bomber_bombing_factor = 0.20", desc: { ru: "Урон стратегических бомбардировок фабрик: +20%", en: "Strategic bombing damage: +20%" } },
      { code: "air_interception_efficiency = 0.20", desc: { ru: "Эффективность перехвата вражеских самолётов: +20%", en: "Interception mission efficiency: +20%" } },
      { code: "air_weather_penalty = -0.25", desc: { ru: "Штрафы от плохой погоды для авиации: -25%", en: "Air weather penalty: -25%" } }
    ]
  },
  {
    category: { ru: "⚓ Военно-морской флот (Баффы)", en: "⚓ Navy & Naval Warfare (Buffs)" },
    items: [
      { code: "navy_max_range_factor = 0.25", desc: { ru: "Дальность плавания военных кораблей: +25%", en: "Naval operational range: +25%" } },
      { code: "naval_speed_factor = 0.10", desc: { ru: "Скорость всех кораблей флота: +10%", en: "Navy speed: +10%" } },
      { code: "navy_screen_attack_factor = 0.15", desc: { ru: "Атака кораблей охранения (эсминцы, крейсеры): +15%", en: "Screen ship attack: +15%" } },
      { code: "navy_capital_attack_factor = 0.15", desc: { ru: "Атака тяжелых кораблей (линкоры, крейсеры): +15%", en: "Capital ship attack: +15%" } },
      { code: "navy_carrier_air_attack_factor = 0.20", desc: { ru: "Урон палубной авиации авианосцев: +20%", en: "Carrier aircraft attack: +20%" } },
      { code: "sub_attack_factor = 0.20", desc: { ru: "Урон торпедных атак подводных лодок: +20%", en: "Submarine attack factor: +20%" } },
      { code: "sub_detection = 0.25", desc: { ru: "Обнаружение подводных лодок противника: +25%", en: "Submarine detection: +25%" } },
      { code: "navy_anti_air_attack_factor = 0.25", desc: { ru: "Зенитная стрельба кораблей (ПВО флота): +25%", en: "Fleet anti-air attack: +25%" } },
      { code: "convoy_escort_efficiency = 0.30", desc: { ru: "Эффективность эскорта торговых конвоев: +30%", en: "Convoy escort efficiency: +30%" } },
      { code: "convoy_raiding_efficiency_factor = 0.30", desc: { ru: "Эффективность перехвата и охоты на конвои: +30%", en: "Convoy raiding efficiency: +30%" } },
      { code: "amphibious_invasion_speed_factor = 0.30", desc: { ru: "Скорость морской десантной операции: +30%", en: "Amphibious invasion speed: +30%" } },
      { code: "invasion_preparation = -0.30", desc: { ru: "Время подготовки морского десанта: -30%", en: "Invasion preparation time: -30%" } },
      { code: "naval_hit_chance = 0.10", desc: { ru: "Точность стрельбы морской артиллерии: +10%", en: "Naval gun hit chance: +10%" } },
      { code: "experience_gain_navy_factor = 0.25", desc: { ru: "Прирост опыта флота: +25%", en: "Navy experience gain: +25%" } }
    ]
  },
  {
    category: { ru: "👥 Призывники, Людские ресурсы и Население", en: "👥 Manpower, Conscription & Population" },
    items: [
      { code: "conscription_factor = 0.15", desc: { ru: "Доля военнообязанного населения: +15%", en: "Recruitable population factor: +15%" } },
      { code: "conscription = 0.02", desc: { ru: "Базовый призывной контингент: +2.0% от населения", en: "Base recruitable population: +2.0%" } },
      { code: "monthly_population = 0.20", desc: { ru: "Ежемесячный прирост населения страны: +20%", en: "Monthly population growth: +20%" } },
      { code: "non_core_manpower = 0.05", desc: { ru: "Призывники с ненациональных территорий: +5%", en: "Non-core recruitable population: +5%" } },
      { code: "mobilization_speed = 0.30", desc: { ru: "Скорость мобилизации резервистов: +30%", en: "Mobilization speed: +30%" } },
      { code: "training_time_factor = -0.15", desc: { ru: "Общее время обучения войск: -15%", en: "Unit training time: -15%" } }
    ]
  },
  {
    category: { ru: "🔬 Наука, Исследования и Доктрины", en: "🔬 Research, Technology & Doctrines" },
    items: [
      { code: "research_speed_factor = 0.10", desc: { ru: "Общая скорость всех исследований: +10%", en: "General research speed: +10%" } },
      { code: "industry_research_speed_factor = 0.15", desc: { ru: "Скорость исследований промышленности: +15%", en: "Industry research speed: +15%" } },
      { code: "electronics_research_speed_factor = 0.15", desc: { ru: "Скорость исследований электроники и вычислителей: +15%", en: "Electronics research speed: +15%" } },
      { code: "infantry_research_speed_factor = 0.15", desc: { ru: "Скорость исследований пехотного снаряжения: +15%", en: "Infantry research speed: +15%" } },
      { code: "armor_research_speed_factor = 0.15", desc: { ru: "Скорость исследований танков и бронетехники: +15%", en: "Armor research speed: +15%" } },
      { code: "artillery_research_speed_factor = 0.15", desc: { ru: "Скорость исследований артиллерии и ПВО: +15%", en: "Artillery research speed: +15%" } },
      { code: "air_equipment_research_speed_factor = 0.15", desc: { ru: "Скорость исследований авиационной техники: +15%", en: "Air equipment research speed: +15%" } },
      { code: "naval_equipment_research_speed_factor = 0.15", desc: { ru: "Скорость исследований кораблей и верфей: +15%", en: "Naval equipment research speed: +15%" } },
      { code: "land_doctrine_cost_factor = -0.25", desc: { ru: "Стоимость изучения сухопутных доктрин: -25%", en: "Land doctrine cost: -25%" } },
      { code: "air_doctrine_cost_factor = -0.25", desc: { ru: "Стоимость изучения воздушных доктрин: -25%", en: "Air doctrine cost: -25%" } },
      { code: "naval_doctrine_cost_factor = -0.25", desc: { ru: "Стоимость изучения морских доктрин: -25%", en: "Naval doctrine cost: -25%" } },
      { code: "nuclear_research_speed_factor = 0.25", desc: { ru: "Скорость ядерных исследований и реакторов: +25%", en: "Nuclear research speed: +25%" } }
    ]
  },
  {
    category: { ru: "⛽ Топливо, Сырьё и Ресурсы", en: "⛽ Fuel, Oil & Strategic Resources" },
    items: [
      { code: "local_resources_factor = 0.20", desc: { ru: "Эффективность добычи местных ресурсов: +20%", en: "Local resource extraction: +20%" } },
      { code: "fuel_gain_factor = 0.25", desc: { ru: "Прирост и переработка топлива: +25%", en: "Fuel gain: +25%" } },
      { code: "max_fuel_factor = 0.30", desc: { ru: "Вместимость хранилищ топлива в стране: +30%", en: "Fuel storage capacity: +30%" } },
      { code: "fuel_cost_factor = -0.15", desc: { ru: "Расход топлива дивизиями, кораблями и авиацией: -15%", en: "Army/Navy/Air fuel consumption: -15%" } },
      { code: "synthetic_refinery_fuel_gain_factor = 0.30", desc: { ru: "Выработка синтетического топлива на заводах: +30%", en: "Refinery fuel production: +30%" } },
      { code: "trade_opinion_factor = 0.30", desc: { ru: "Торговое мнение других стран: +30%", en: "Trade opinion: +30%" } }
    ]
  },
  {
    category: { ru: "🕊️ Дипломатия, Война и Напряженность", en: "🕊️ Diplomacy, Wargoals & Tension" },
    items: [
      { code: "justify_war_goal_time = -0.30", desc: { ru: "Время фабрикации цели войны: -30%", en: "Justify wargoal duration: -30%" } },
      { code: "generate_wargoal_tension = -0.50", desc: { ru: "Порог мировой напряженности для объявления войны: -50%", en: "Generate wargoal tension limit: -50%" } },
      { code: "join_faction_tension = -0.40", desc: { ru: "Порог мировой напряженности для вступления в альянс: -40%", en: "Join faction tension limit: -40%" } },
      { code: "take_states_cost_factor = -0.25", desc: { ru: "Стоимость забора регионов на мирной конференции: -25%", en: "Peace conference take states cost: -25%" } },
      { code: "puppet_cost_factor = -0.30", desc: { ru: "Стоимость создания марионетки на конференции: -30%", en: "Peace conference puppet cost: -30%" } },
      { code: "liberate_cost_factor = -0.30", desc: { ru: "Стоимость освобождения государств на конференции: -30%", en: "Peace conference liberate cost: -30%" } },
      { code: "send_volunteer_divisions_required = -0.50", desc: { ru: "Требуемое число дивизий для отправки добровольцев: -50%", en: "Volunteers requirement threshold: -50%" } }
    ]
  },
  {
    category: { ru: "🛡️ Оккупация, Подчинение и Сопротивление", en: "🛡️ Occupation, Compliance & Resistance" },
    items: [
      { code: "compliance_growth = 0.20", desc: { ru: "Скорость роста подчинения оккупированных земель: +20%", en: "Compliance growth speed: +20%" } },
      { code: "resistance_growth = -0.25", desc: { ru: "Скорость роста подпольного сопротивления: -25%", en: "Resistance growth speed: -25%" } },
      { code: "resistance_target = -0.15", desc: { ru: "Целевой порог активности сопротивления: -15%", en: "Resistance target level: -15%" } },
      { code: "resistance_decay = 0.25", desc: { ru: "Скорость затухания восстаний и сопротивления: +25%", en: "Resistance decay speed: +25%" } },
      { code: "garrison_damage = -0.25", desc: { ru: "Потери гарнизонов при подавлении сопротивления: -25%", en: "Garrison casualties: -25%" } },
      { code: "garrison_manpower_need = -0.20", desc: { ru: "Потребность гарнизонов в призывниках: -20%", en: "Garrison manpower required: -20%" } }
    ]
  },
  {
    category: { ru: "🕵️ Шпионаж, Разведка и Шифры (LaR)", en: "🕵️ Intelligence, Cryptology & Espionage" },
    items: [
      { code: "operative_slot = 1", desc: { ru: "Дополнительная ячейка для агента/шпиона: +1", en: "Operative slot: +1" } },
      { code: "crypto_strength = 2", desc: { ru: "Стойкость криптографического шифра: +2", en: "Cryptographic defense level: +2" } },
      { code: "decryption_power = 25", desc: { ru: "Скорость взлома вражеских шифров: +25", en: "Decryption power: +25" } },
      { code: "own_operative_detection_chance_factor = -0.25", desc: { ru: "Шанс обнаружения и захвата наших агентов: -25%", en: "Operative detection risk: -25%" } },
      { code: "enemy_operative_detection_chance_factor = 0.30", desc: { ru: "Шанс поимки вражеских шпионов контрразведкой: +30%", en: "Counter-intelligence detection: +30%" } },
      { code: "intel_from_operatives_factor = 0.25", desc: { ru: "Разведданные, получаемые агентурной сетью: +25%", en: "Intel network efficiency: +25%" } }
    ]
  },
  {
    category: { ru: "⚠️ Популярные дебаффы (Debuffs для баланса и кризисов)", en: "⚠️ Common Debuffs (Balance & Hard Mode)" },
    items: [
      { code: "consumer_goods_factor = 0.10", desc: { ru: "ШТРАФ: Товары народного потребления (ТНП) +10% (забирает фабрики)", en: "DEBUFF: Consumer goods +10%" } },
      { code: "production_speed_buildings_factor = -0.20", desc: { ru: "ШТРАФ: Скорость любого строительства снижена на -20%", en: "DEBUFF: Construction speed -20%" } },
      { code: "industrial_capacity_factory = -0.15", desc: { ru: "ШТРАФ: Производительность заводов и фабрик снижена на -15%", en: "DEBUFF: Factory output -15%" } },
      { code: "army_org_factor = -0.15", desc: { ru: "ШТРАФ: Организация всех дивизий снижена на -15%", en: "DEBUFF: Division organization -15%" } },
      { code: "army_attack_factor = -0.10", desc: { ru: "ШТРАФ: Атака сухопутных войск снижена на -10%", en: "DEBUFF: Army attack -10%" } },
      { code: "army_defence_factor = -0.10", desc: { ru: "ШТРАФ: Оборона сухопутных войск снижена на -10%", en: "DEBUFF: Army defence -10%" } },
      { code: "supply_consumption_factor = 0.25", desc: { ru: "ШТРАФ: Потребление припасов войсками увеличено на +25%", en: "DEBUFF: Supply consumption +25%" } },
      { code: "attrition = 0.25", desc: { ru: "ШТРАФ: Небоевые потери и износ техники увеличены на +25%", en: "DEBUFF: Attrition rate +25%" } },
      { code: "research_speed_factor = -0.15", desc: { ru: "ШТРАФ: Скорость всех исследований замедлена на -15%", en: "DEBUFF: Research speed -15%" } },
      { code: "conscription_factor = -0.20", desc: { ru: "ШТРАФ: Доступный призывной контингент снижен на -20%", en: "DEBUFF: Recruitable population -20%" } },
      { code: "stability_weekly = -0.005", desc: { ru: "ШТРАФ: Еженедельное падение стабильности на -0.5%", en: "DEBUFF: Weekly stability loss -0.5%" } },
      { code: "war_support_weekly = -0.005", desc: { ru: "ШТРАФ: Еженедельное падение поддержки войны на -0.5%", en: "DEBUFF: Weekly war support loss -0.5%" } },
      { code: "political_power_factor = -0.25", desc: { ru: "ШТРАФ: Прирост политической силы снижен на -25%", en: "DEBUFF: Political power gain -25%" } },
      { code: "resistance_growth = 0.30", desc: { ru: "ШТРАФ: Бунты и рост сопротивления ускорены на +30%", en: "DEBUFF: Resistance growth +30%" } }
    ]
  }
];

if (typeof window !== "undefined") {
  window.HOI4_ALL_EFFECTS = HOI4_ALL_EFFECTS;
}

if (typeof window !== 'undefined') window.HOI4_ALL_EFFECTS = HOI4_ALL_EFFECTS;
if (typeof globalThis !== 'undefined') globalThis.HOI4_ALL_EFFECTS = HOI4_ALL_EFFECTS;
if (typeof module !== 'undefined' && module.exports) module.exports = HOI4_ALL_EFFECTS;
