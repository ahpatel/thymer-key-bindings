# Thymer Keyboard Shortcuts Plugin

A visual editor for browsing, searching, and customizing Thymer keyboard shortcuts — replacing the manual "Cmd+P → Change Keyboard Shortcuts" workflow with a full GUI.

## Features

- **Browse/Search all shortcuts** organized by category (Command Palette, Panels, Editor, Tasks, etc.) and searchable by action name or key combo.
- **Edit shortcuts** by clicking the edit button and pressing your desired key combination
- **Conflict detection** — warns if a combo is already in use before saving
- **Reset** individual shortcuts or all at once back to defaults
- **Cross-platform** — displays ⌘/Ctrl, ⌥/Alt, ⇧/Shift correctly per platform
- **Theme-aware** — adapts to your Thymer theme via CSS custom properties

## Installation

1. Open Thymer → Cmd+P → "Plugins" → "Create Plugin"
2. In the **Configuration** tab, paste the contents of `plugin.json`
3. In the **Custom Code** tab, paste the contents of `plugin.js`

## Usage

1. **Open the editor**: Click "Keyboard Shortcuts" in the sidebar, or use Cmd+P → "Keyboard Shortcuts"
2. **Search**: Type in the search bar to filter by action name or key combo
3. **Edit a shortcut**: Hover over a shortcut row and click the ✏️ button
4. **Press your new keys**: The plugin captures your key press and validates it
5. **Conflict check**: If the combo is already used, you'll see a warning — press a different combo or Esc to cancel
6. **Auto-save**: Valid shortcuts are saved immediately to the plugin config
7. **Reset**: Click ↺ on a customized shortcut to restore the default, or use "Reset All"

## How It Works

The plugin stores custom shortcut overrides in its `plugin.json` configuration under `custom.shortcuts`. It serves as a **visual reference and conflict checker** — after customizing shortcuts here, apply them in Thymer via **My Preferences → Change Keyboard Shortcuts** in the command palette.

Custom shortcuts are stored as platform-agnostic key strings (e.g., `Meta+Shift+KeyK`) and displayed with the correct symbols for your OS.

## File Structure

| File | Purpose |
|------|---------|
| `plugin.js` | Main plugin code — panel rendering, key capture, conflict detection |
| `plugin.json` | Plugin configuration and custom shortcut storage |
| `README.md` | This file |
