# Contributing to Hearts of Iron IV Mod Generator

Thank you for your interest in contributing to the **Hearts of Iron IV Mod Generator**!

## How to Contribute

1. **Fork the Repository**:
   Click the "Fork" button at the top right of the GitHub page.

2. **Clone your Fork**:
   ```bash
   git clone https://github.com/<your-username>/Hearts-of-iron-IV-mod-generator.git
   cd Hearts-of-iron-IV-mod-generator
   ```

3. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/my-new-feature
   ```

4. **Make Your Changes**:
   - Keep scripts modular and Vanilla JS compatible.
   - Maintain strict UTF-8 encoding.
   - Respect Clausewitz engine requirements (BOM for localization files, 32-bit uncompressed TGA flags).
   - Follow the zero-emoji policy across UI and documentation.

5. **Test Your Changes**:
   Verify syntax across all modified JavaScript files:
   ```bash
   node -c app.js
   node -c cosmetic_app.js
   ```

6. **Submit a Pull Request**:
   Push your branch and open a PR against `main` with a clear explanation of what was changed and why.

## Areas for Contribution
- Adding new Clausewitz modifiers, triggers, and effects to `hoi4_effects_data.js`.
- Updating HoI4 State definitions or borders in `hoi4_states_data.js` and `assets/hoi4_map.svg`.
- Adding new localized country presets and historical formable nation templates.
- Improving UI performance, accessibility, and translations.
