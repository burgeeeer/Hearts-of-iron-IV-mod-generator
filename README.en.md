# Hearts of Iron IV Mod Generator

[🇷🇺 Русский](README.md) | 🇬🇧 **English**

**Hearts of Iron IV Mod Generator** is a user-friendly, visual tool for quickly generating modifications for **Hearts of Iron IV**. It eliminates the need for manual Paradox Clausewitz scripting by allowing you to customize country names, upload flags with automatic TGA conversion, set dynamic puppet names across autonomy levels, and configure dynamic state/city renames based on controlling nations.

Available both **online in your browser** and as a **standalone desktop executable (`.exe`)**.

---

## 🌐 Links

- 🌍 **Online Generator**: [https://burgeeeer.github.io/Hearts-of-iron-IV-mod-generator/](https://burgeeeer.github.io/Hearts-of-iron-IV-mod-generator/)
- 🛠️ **Steam Workshop Mod**: [Steam Workshop Link](https://steamcommunity.com/sharedfiles/filedetails/?id=3780620332)
- 💻 **Source Code Repository**: [GitHub Repository](https://github.com/burgeeeer/Hearts-of-iron-IV-mod-generator)


---

## ✨ Features

### 1. 🏳️ Country Names & Cosmetic Tags
- Support for both standard (`Normal Tag`) and cosmetic tags (`Cosmetic Tag`).
- Custom naming for all 4 primary ideologies:
  - **Fascism**
  - **Democratic**
  - **Communism**
  - **Non-Aligned**
- Separate fields matching HoI4 engine requirements:
  - **Base Name (UI)**: displayed on the map and country list (`TAG_ideology`).
  - **Definite Name (DEF)**: used in event popups, treaties, and capitulation messages (`TAG_ideology_DEF`).
  - **Adjective (ADJ)**: army, navy, and equipment nationality descriptors (`TAG_ideology_ADJ`).

### 2. 🎨 Automatic Flag Resizing & TGA Conversion
- Upload custom flags directly as **PNG** files.
- Automatically resized and converted into all 3 required HoI4 TGA sizes:
  - **Standard** (`gfx/flags/` — 82×52 px)
  - **Medium** (`gfx/flags/medium/` — 41×26 px)
  - **Small** (`gfx/flags/small/` — 10×7 px)
- Generates a base fallback flag for country stability regardless of ideology changes.

### 3. 👑 Puppet System & Autonomy Levels
- Customizable naming relationships between **Overlord Tag** and **Puppet Tag**.
- **Two naming modes**:
  - **Short**: a single uniform name applied across all autonomy levels.
  - **Expanded**: tailored names for each of the 11 autonomy tiers:
    - *Reichskommissariat*
    - *Reichsprotectorate*
    - *Satellite*
    - *Puppet*
    - *Dominion*
    - *Colony*
    - *Integrated Puppet*
    - *TPC Minimal*
    - *Subjugated*
    - *Supervised State*
    - *Protectorate*
- Custom flags for puppets with automatic generation of `common/on_actions/custom_puppets.txt`.

### 4. 🗺️ Dynamic State Names by Controller
- Rename any state (`State ID`) when controlled by a specific nation (`Controller Tag`).
- *Example:* State `39` controlled by `GER` automatically becomes `Krakau`.
- Automatically restores original historical name when control shifts to another country.
- Generates `common/on_actions/custom_state_names.txt` and `states_names_l_russian.yml`.

### 5. 🏙️ Dynamic City & Victory Point Names
- Rename victory points by `State ID` + `Province ID` + `Controller Tag`.
- *Example:* Province `6376` occupied by `GER` automatically renames to `Danzig`.
- Generates `victory_points_l_russian.yml` with proper triggers.

### 6. 💾 Local Auto-save Draft
- All input data (countries, puppets, flags, renames) is stored continuously in `localStorage`.
- No progress lost if the window or application is accidentally closed.

### 7. 🌐 Dual-language Interface
- Complete UI translation with quick **RU / EN** toggle button in the top-right corner.

---

## 📁 Generated Mod Structure

The generator bundles everything into a ready-to-use `.zip` archive matching the Clausewitz directory layout:

```text
Mod_Name/
├── descriptor.mod                                # Mod launcher descriptor
├── Mod_Name.mod                                  # Documents mod loader pointer
├── localisation/
│   ├── russian/
│   │   ├── countries_l_russian.yml               # Normal tag localization (UTF-8 BOM)
│   │   ├── countries_cosmetic_l_russian.yml      # Cosmetic tag localization
│   │   ├── states_names_l_russian.yml            # Dynamic state names
│   │   └── victory_points_l_russian.yml          # Dynamic victory point names
│   └── english/
│       └── ..._l_english.yml
├── gfx/
│   └── flags/
│       ├── [TAG]_[ideology].tga                  # Large flags (82x52)
│       ├── medium/                               # Medium flags (41x26)
│       └── small/                                # Small flags (10x7)
└── common/
    └── on_actions/
        ├── custom_puppets.txt                    # Puppet cosmetic tag triggers
        └── custom_state_names.txt                # State & city rename triggers
```

> **Note**: All YAML localization files are encoded in **UTF-8 with BOM**, preventing character corruption and game crashes.

---

## 📖 How to Use

1. **Enter a Mod Name** (English letters and numbers, e.g. `MyAwesomeMod`).
2. **Add Countries**:
   - Provide a 3-letter tag (e.g., `SOV`, `GER`, `RUS` or a custom new tag).
   - Select `Normal Tag` or `Cosmetic Tag`.
   - Fill in Base, Definite, and Adjective names for the desired ideologies.
   - Upload PNG flags if needed.
3. **Configure Puppets** *(optional)*:
   - Expand the «Puppet Names» section.
   - Set Overlord and Puppet tags.
   - Choose Short or Expanded mode and fill in names/flags.
4. **Configure State & City Renaming** *(optional)*:
   - Specify State / Province IDs, Controller Tag, and the new names.
5. Click **«Generate Mod»** (Сгенерировать мод).
6. Save the downloaded `.zip` file.

---

## 🛠️ Installation into Hearts of Iron IV

1. Extract the downloaded archive into the Hearts of Iron IV mod folder:
   - **Path**: `C:\Users\<Your_Username>\Documents\Paradox Interactive\Hearts of Iron IV\mod\`
2. Verify that the folder contains:
   - The mod directory (e.g. `MyAwesomeMod/`)
   - The descriptor file (e.g. `MyAwesomeMod.mod`)
3. Launch the Paradox / Hearts of Iron IV launcher.
4. Go to **Playsets**, enable your new mod, and start the game!

---

## 🖥️ Standalone Desktop Application

For users who prefer running the generator offline without a web browser:

- Use [**`HoI4_Mod_Generator.exe`**](HoI4_Mod_Generator.exe) in the root directory.
- **Highlights**:
  - Instant 1-second launch in a clean, dedicated window.
  - Fully offline (all scripts and libraries bundled).
  - Powered by system WebView2 with built-in persistent storage.
