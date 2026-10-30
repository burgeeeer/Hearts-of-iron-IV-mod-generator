# Hearts of Iron IV Mod Generator

[Русский](README.md) | **English**

Hearts of Iron IV Mod Generator is a professional visual development studio and mod generator for **Hearts of Iron IV** (Clausewitz Engine 1.14.* — 1.19.*+).

This tool completely removes the need to write Paradox Clausewitz scripting by hand, assemble UTF-8 BOM localization files, calculate color vectors, or manually scale and convert flags to 32-bit uncompressed TGA.

Available as both a **web application** and a **standalone desktop executable (Desktop .exe)**.

---

## Links

- Online Generator: https://burgeeeer.github.io/Hearts-of-iron-IV-mod-generator/
- Steam Workshop Mod: https://steamcommunity.com/sharedfiles/filedetails/?id=3780620332
- GitHub Source Repository: https://github.com/burgeeeer/Hearts-of-iron-IV-mod-generator

---

## Studio Architecture & Core Features

The generator integrates two specialized modding studios in one unified interface:

### 1. General Mod Studio (Countries, Puppets, States & Cities)
- **Country Creation and Cosmetic Tags:**
  - Full support for standard 3-letter tags (`SOV`, `GER`, `USA`) and cosmetic tags (`TAG_cosmetic`).
  - Distinct naming setup for all 4 primary ideologies: Fascism, Democratic, Communism, Non-Aligned.
  - Strict Clausewitz engine naming compliance:
    - Base Name (`TAG_ideology`): displayed on the world map and in diplomacy menus.
    - Definite Name (`TAG_ideology_DEF`): used in treaties, event popups, and capitulation logs.
    - Adjective (`TAG_ideology_ADJ`): nationality descriptors for divisions, fleets, air wings, and commanders.
- **Automated TGA Flag Processing & Scaling:**
  - Upload original flags in PNG or JPG format.
  - Automatic compilation into 32-bit uncompressed TGA with alpha channel.
  - Generates the complete set of required HoI4 UI resolutions:
    - Standard flag (`gfx/flags/` — 82x52 px)
    - Medium flag (`gfx/flags/medium/` — 41x26 px)
    - Small flag (`gfx/flags/small/` — 10x7 px)
  - Automatic generation of base fallback flags to prevent graphical glitches when ideology flips.
- **Advanced Puppet System across 11 Autonomy Levels:**
  - Configure Overlord-Puppet relationships for regular and cosmetic tags.
  - Short Mode (one uniform name across all autonomy tiers) or Expanded Mode (tailored names for all 11 tiers: Reichskommissariat, Reichsprotectorate, Satellite, Puppet, Dominion, Colony, Integrated Puppet, TPC Minimal, Subjugated, Supervised State, Protectorate).
  - Custom autonomy flag assignment with automated `common/on_actions/custom_puppets.txt` triggers.
- **Dynamic State & City Renaming (Victory Points):**
  - Dynamic state renaming by State ID when controlled by a target country.
  - Dynamic city and victory point renaming by Province ID and controller tag (e.g. Stalingrad, Danzig, or Warsaw renames on occupation).

### 2. Formable Nations & Decisions Studio
- **Custom Decision Authoring:**
  - Configure decision IDs, categories (create custom or attach to vanilla categories), completion days, and Political Power (PP) costs.
  - Fine-tune visibility (`visible`), availability (`available`), map highlights (`highlight_states`), and AI weights (`ai_will_do`).
- **Clausewitz Modifiers, Triggers & Effects Database (250+ entries):**
  - Integrated library of Paradox condition triggers (state control, alliances, world tension, capitulation, factories, national focuses, etc.).
  - Integrated library of rewards and buffs (`add_core_of`, capital relocation, resources, national spirits, off-map factories, military buffs).
  - Instant full-text search with syntax explanations and code insertion.
- **Interactive MapChart Vector SVG World Map (1081 States):**
  - Vector world map of all 1081 HoI4 states with smooth Pan and Zoom (via mouse wheel or UI buttons).
  - Macro-region filtering (Europe, USSR & East, Asia, America, Africa, Middle East, Oceania) and 1936 historical country selector.
  - Instant search by state name (English and Russian), State ID, or historical tag.
  - Automatic centering and focus zoom when a state is searched.
  - One-click bulk selection to insert State IDs into triggers (`controls_state`) or national core rewards (`add_core_of = ROOT`).
- **Cosmetic Tag Color Palette Generator:**
  - Interactive RGB color picker converted automatically into Clausewitz script format (`color = rgb { r g b }`).
- **Live Script Inspector:**
  - Multi-tab live preview of all generated Paradox script files (`decisions.txt`, `cosmetic.txt`, `localisation.yml`) before downloading.

---

## User Interface & Design System

- **Dual Tactical Color Palettes:**
  - Dark Command Theme: military dark aesthetic (`#0c1017`, tactical accents `#38bdf8` and `#34d399`).
  - Soft Military Sand Light Theme: softened field sand palette (`#f4f6f8`, `#e2e8f0` without blinding white glare).
- **Physics-Driven Motion Design:**
  - Anime.js transitions between views, modals, and dynamic lists.
- **Mobile & Tablet Touch Support:**
  - Ergonomic touch targets (>= 44px) across all buttons, selects, and inputs.
  - Responsive single-column layouts and full-screen touch modal sheets for phones.
- **100% Bilingual Interface (EN / RU):**
  - Instant header language toggle with complete interface synchronization and persistent preference saving.

---

## Generated Mod Structure

The downloaded ZIP archive is structured following the official Clausewitz engine standards:

```
[Mod_Name]/
├── descriptor.mod                                # Launcher metadata
├── common/
│   ├── countries/
│   │   ├── colors.txt                            # Country map colors
│   │   └── cosmetic.txt                          # Cosmetic tag colors
│   ├── country_tags/
│   │   └── custom_tags.txt                       # 3-letter tag registration
│   ├── decisions/
│   │   ├── categories/
│   │   │   └── custom_categories.txt             # Decision categories
│   │   └── custom_decisions.txt                  # Formable nation decisions
│   └── on_actions/
│       ├── custom_puppets.txt                    # Puppet naming and flag triggers
│       └── custom_state_names.txt                # Dynamic state and city triggers
├── gfx/
│   └── flags/
│       ├── [TAG]_[ideology].tga                  # Large flags (82x52, 32-bit TGA)
│       ├── medium/                               # Medium flags (41x26, 32-bit TGA)
│       └── small/                                # Small flags (10x7, 32-bit TGA)
└── localisation/
    ├── english/
    │   ├── countries_l_english.yml               # UTF-8 BOM country localization
    │   ├── countries_cosmetic_l_english.yml      # UTF-8 BOM cosmetic localization
    │   ├── decisions_l_english.yml               # UTF-8 BOM decision descriptions
    │   ├── states_names_l_english.yml            # UTF-8 BOM state names
    │   └── victory_points_l_english.yml          # UTF-8 BOM victory points
    └── russian/
        └── ..._l_russian.yml                     # Russian localization (UTF-8 BOM)
```

> **Important:** All generated YAML localization files are encoded strictly in **UTF-8 with BOM (Byte Order Mark)** to ensure compatibility with Paradox games and avoid font corruption.

---

## Mod Installation Guide

1. Click **"Generate Mod"** (or **"Download Ready Mod (.zip)"**) and save the ZIP archive.
2. Extract the archive into your Hearts of Iron IV mod folder:
   - Default Windows path:
     `C:\Users\<Your_Username>\Documents\Paradox Interactive\Hearts of Iron IV\mod\`
3. Ensure the `mod/` directory contains:
   - The mod folder (e.g. `mod/MyCustomMod/`)
   - The companion `.mod` descriptor file (e.g. `mod/MyCustomMod.mod`)
4. Open the Hearts of Iron IV launcher.
5. In the **Playsets** tab, add and activate your newly generated mod.
6. Launch the game.

---

## Standalone Desktop Application

For offline use without a web browser:
- Executable: `HoI4_Mod_Generator.exe`
- Features:
  - Runs in a clean native Windows window.
  - Powered by Microsoft Edge WebView2.
  - Full offline functionality without network dependencies.
  - Local state and project persistence.

---

## Contributing

To report bugs, submit modifier updates, or propose features:
1. Open an [Issue](https://github.com/burgeeeer/Hearts-of-iron-IV-mod-generator/issues).
2. Or submit a [Pull Request](https://github.com/burgeeeer/Hearts-of-iron-IV-mod-generator/pulls).
