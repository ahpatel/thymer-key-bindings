// ============================================================================
// Keyboard Shortcuts — Thymer Plugin
// Visual editor for browsing, searching, and customizing keyboard shortcuts.
// ============================================================================

// ---------------------------------------------------------------------------
// Inline CSS (themed via Thymer CSS variables)
// ---------------------------------------------------------------------------

const css = `
/* Thymer Keyboard Shortcuts Plugin — Themed Styles */
.kb-shortcuts-panel {
  font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  color: var(--color-text, #e0e0e0);
  padding: 24px 32px;
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.5;
}
.kb-shortcuts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
}
.kb-shortcuts-title {
  font-size: 1.25rem;
  font-weight: 600;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
}
.kb-shortcuts-title-icon {
  opacity: 0.6;
}
.kb-search-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
  max-width: 320px;
}
.kb-search-input {
  width: 100%;
  box-sizing: border-box;
  padding: 7px 12px 7px 32px;
  border: 1px solid var(--color-border, rgba(255,255,255,0.12));
  border-radius: 6px;
  background: var(--color-input-bg, rgba(255,255,255,0.06));
  color: var(--color-text, #e0e0e0);
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.15s;
}
.kb-search-input::placeholder {
  color: var(--color-text-muted, rgba(255,255,255,0.35));
}
.kb-search-input:focus {
  border-color: var(--color-accent, #6b8afd);
}
.kb-search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.4;
  pointer-events: none;
  font-size: 0.8rem;
}
.kb-reset-all-btn {
  font-size: 0.75rem;
  padding: 5px 10px;
  border: 1px solid var(--color-border, rgba(255,255,255,0.12));
  border-radius: 5px;
  background: transparent;
  color: var(--color-text-muted, rgba(255,255,255,0.5));
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s, border-color 0.15s;
}
.kb-reset-all-btn:hover {
  color: var(--color-text, #e0e0e0);
  border-color: var(--color-text-muted, rgba(255,255,255,0.3));
}
.kb-copy-config-btn {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid var(--color-border, rgba(255,255,255,0.12));
  background: var(--color-primary, #4a9eff);
  color: #fff;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
}
.kb-copy-config-btn:hover {
  background: var(--color-primary-hover, #3a8eef);
  filter: brightness(1.1);
}
.kb-header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
.kb-category {
  margin-bottom: 8px;
}
.kb-category-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  cursor: pointer;
  user-select: none;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted, rgba(255,255,255,0.5));
  border-bottom: 1px solid var(--color-border, rgba(255,255,255,0.08));
  transition: color 0.15s;
}
.kb-category-header:hover {
  color: var(--color-text, #e0e0e0);
}
.kb-category-chevron {
  font-size: 0.6rem;
  transition: transform 0.2s;
  display: inline-block;
}
.kb-category.collapsed .kb-category-chevron {
  transform: rotate(-90deg);
}
.kb-category-body {
  overflow: hidden;
  transition: max-height 0.25s ease;
}
.kb-category.collapsed .kb-category-body {
  max-height: 0 !important;
  padding: 0;
}
.kb-shortcut-row {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  border-radius: 5px;
  transition: background 0.12s;
  gap: 8px;
}
.kb-shortcut-row:hover {
  background: var(--color-hover, rgba(255,255,255,0.04));
}
.kb-shortcut-action {
  flex: 1;
  font-size: 0.85rem;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.kb-shortcut-keys {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
.kb-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  font-size: 0.75rem;
  font-family: var(--font-family-mono, 'SF Mono', 'Fira Code', 'Consolas', monospace);
  background: var(--color-input-bg, rgba(255,255,255,0.08));
  border: 1px solid var(--color-border, rgba(255,255,255,0.15));
  border-radius: 4px;
  color: var(--color-text, #e0e0e0);
  box-shadow: 0 1px 0 var(--color-border, rgba(255,255,255,0.1));
  white-space: nowrap;
  line-height: 1;
}
.kb-kbd-plus {
  font-size: 0.65rem;
  opacity: 0.4;
  margin: 0 1px;
}
.kb-shortcut-row.kb-customized .kb-kbd {
  background: var(--color-accent-bg, rgba(107,138,253,0.12));
  border-color: var(--color-accent, rgba(107,138,253,0.35));
  color: var(--color-accent, #6b8afd);
}
.kb-shortcut-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.12s;
}
.kb-shortcut-row:hover .kb-shortcut-actions {
  opacity: 1;
}
.kb-action-btn {
  background: none;
  border: none;
  color: var(--color-text-muted, rgba(255,255,255,0.4));
  cursor: pointer;
  padding: 3px 5px;
  border-radius: 4px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.12s, background 0.12s;
}
.kb-action-btn:hover {
  color: var(--color-text, #e0e0e0);
  background: var(--color-hover, rgba(255,255,255,0.08));
}
.kb-action-btn.kb-reset-btn {
  color: var(--color-accent, #6b8afd);
}
.kb-action-btn.kb-reset-btn:hover {
  background: var(--color-accent-bg, rgba(107,138,253,0.12));
}
.kb-shortcut-row.kb-recording {
  background: var(--color-accent-bg, rgba(107,138,253,0.08));
  outline: 1px solid var(--color-accent, rgba(107,138,253,0.3));
  outline-offset: -1px;
}
.kb-recording-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  background: var(--color-accent-bg, rgba(107,138,253,0.15));
  border: 1px dashed var(--color-accent, rgba(107,138,253,0.5));
  color: var(--color-accent, #6b8afd);
  animation: kb-pulse 1.5s ease-in-out infinite;
}
@keyframes kb-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
.kb-recording-hint {
  font-size: 0.7rem;
  color: var(--color-text-muted, rgba(255,255,255,0.4));
  margin-left: 8px;
}
.kb-conflict-msg {
  font-size: 0.75rem;
  color: var(--color-warning, #f59e0b);
  padding: 4px 8px;
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.kb-no-results {
  text-align: center;
  padding: 32px 16px;
  color: var(--color-text-muted, rgba(255,255,255,0.35));
  font-size: 0.85rem;
}
.kb-subcategory-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-text-muted, rgba(255,255,255,0.4));
  padding: 10px 8px 4px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.kb-note {
  font-size: 0.75rem;
  color: var(--color-text-muted, rgba(255,255,255,0.35));
  padding: 2px 8px 6px;
  font-style: italic;
}
.kb-saved-indicator {
  font-size: 0.7rem;
  color: var(--color-success, #22c55e);
  opacity: 0;
  transition: opacity 0.2s;
  margin-left: 4px;
}
.kb-saved-indicator.kb-visible {
  opacity: 1;
}
`;

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

const IS_MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);

// Display symbols per platform
const MOD_DISPLAY = {
    meta:  IS_MAC ? '⌘' : 'Ctrl',
    ctrl:  IS_MAC ? '⌃' : 'Ctrl',
    alt:   IS_MAC ? '⌥' : 'Alt',
    shift: '⇧',
};

const KEY_DISPLAY = {
    ArrowUp:    '↑',
    ArrowDown:  '↓',
    ArrowLeft:  '←',
    ArrowRight: '→',
    Enter:      '↵',
    Backspace:  '⌫',
    Delete:     '⌦',
    Escape:     'Esc',
    Tab:        'Tab',
    ' ':        'Space',
    PageUp:     'PgUp',
    PageDown:   'PgDn',
    Home:       'Home',
    End:        'End',
};

// ---------------------------------------------------------------------------
// Default shortcuts data
// ---------------------------------------------------------------------------

const DEFAULT_SHORTCUTS = [
    // --- Global Actions ---
    { id: 'global.launch_cmdpal',           category: 'Global',             action: 'Open command palette',                keys: 'Meta+KeyP' },
    { id: 'global.launch_cmdpal_jump',      category: 'Global',             action: 'Quick jump / switcher',               keys: 'Meta+KeyK' },
    { id: 'global.search_panel',            category: 'Global',             action: 'Open search panel',                   keys: 'Meta+Shift+KeyF' },
    { id: 'global.new_menu',                category: 'Global',             action: 'New... menu',                         keys: 'Ctrl+KeyN' },
    { id: 'global.option_menu',             category: 'Global',             action: 'Options menu',                        keys: 'Ctrl+KeyO' },
    { id: 'global.panel_switcher',          category: 'Global',             action: 'Panel switcher',                      keys: 'Meta+Period' },
    { id: 'global.go_panel_1',              category: 'Global',             action: 'Focus panel 1',                       keys: 'Meta+Digit1' },
    { id: 'global.go_panel_2',              category: 'Global',             action: 'Focus panel 2',                       keys: 'Meta+Digit2' },
    { id: 'global.go_panel_3',              category: 'Global',             action: 'Focus panel 3',                       keys: 'Meta+Digit3' },
    { id: 'global.go_panel_4',              category: 'Global',             action: 'Focus panel 4',                       keys: 'Meta+Digit4' },
    { id: 'global.go_panel_5',              category: 'Global',             action: 'Focus panel 5',                       keys: 'Meta+Digit5' },
    { id: 'global.go_panel_6',              category: 'Global',             action: 'Focus panel 6',                       keys: 'Meta+Digit6' },
    { id: 'global.focus_sidebar',           category: 'Global',             action: 'Focus sidebar',                       keys: 'Meta+Digit0' },
    { id: 'global.toggle_sidebar',          category: 'Global',             action: 'Toggle sidebar visibility',           keys: 'Meta+Backslash' },
    { id: 'global.close_all_panels',        category: 'Global',             action: 'Close all panels',                    keys: '' },
    { id: 'global.focus_mode',              category: 'Global',             action: 'Toggle focus mode',                   keys: 'Meta+Shift+Enter' },
    { id: 'global.journal_gohome',          category: 'Global',             action: "Go to today's journal",               keys: 'Meta+KeyJ' },
    { id: 'global.toggle_remote_cursors',   category: 'Global',             action: 'Toggle multiplayer cursors',          keys: '' },
    { id: 'global.toggle_offline_mode',     category: 'Global',             action: 'Toggle offline mode',                 keys: '' },
    { id: 'global.undo',                    category: 'Global',             action: 'Undo',                                keys: 'Meta+KeyZ' },
    { id: 'global.redo',                    category: 'Global',             action: 'Redo',                                keys: 'Meta+Shift+KeyZ' },
    { id: 'global.copyMenu',               category: 'Global',             action: 'Copy with format menu',               keys: 'Meta+Shift+KeyC' },
    { id: 'global.copyHTML',               category: 'Global',             action: 'Copy as HTML',                        keys: '' },
    { id: 'global.copyMarkdown',           category: 'Global',             action: 'Copy as Markdown',                    keys: '' },
    { id: 'global.copyText',              category: 'Global',             action: 'Copy as plain text',                  keys: '' },
    { id: 'global.pasteMenu',              category: 'Global',             action: 'Paste with format menu',              keys: 'Meta+Shift+KeyV' },
    { id: 'global.pasteHTML',              category: 'Global',             action: 'Paste as HTML',                       keys: '' },
    { id: 'global.pasteMarkdown',          category: 'Global',             action: 'Paste as Markdown',                   keys: 'Meta+Alt+KeyV' },
    { id: 'global.pasteText',             category: 'Global',             action: 'Paste as plain text',                 keys: '' },
    { id: 'global.workspace_switch_next',   category: 'Global',             action: 'Switch to next workspace',            keys: '' },
    { id: 'global.workspace_switch_previous', category: 'Global',           action: 'Switch to previous workspace',        keys: '' },

    // --- Panel Actions ---
    { id: 'panel.split',                    category: 'Panel',              action: 'Split panel',                         keys: 'Meta+Shift+Backslash' },
    { id: 'panel.close',                    category: 'Panel',              action: 'Close panel',                         keys: '' },
    { id: 'panel.reload',                   category: 'Panel',              action: 'Reload panel',                        keys: '' },
    { id: 'panel.swap',                     category: 'Panel',              action: 'Swap with next panel',                keys: '' },
    { id: 'panel.history_back',             category: 'Panel',              action: 'Navigate back',                       keys: 'Meta+BracketLeft' },
    { id: 'panel.history_forward',          category: 'Panel',              action: 'Navigate forward',                    keys: 'Meta+BracketRight' },
    { id: 'panel.zoom_out',                 category: 'Panel',              action: 'Zoom out (go to parent)',             keys: 'Alt+ArrowUp' },
    { id: 'panel.zoom_in',                  category: 'Panel',              action: 'Zoom in (focus item)',                keys: 'Alt+ArrowDown' },
    { id: 'panel.link_to_new_page',         category: 'Panel',              action: 'Link to new page',                   keys: '' },
    { id: 'panel.record_create',            category: 'Panel',              action: 'Create new page in collection',      keys: '' },
    { id: 'panel.record_trash',             category: 'Panel',              action: 'Move to Trash / Restore from Trash', keys: '' },
    { id: 'panel.record_move',              category: 'Panel',              action: 'Move to Collection...',               keys: '' },
    { id: 'panel.record_rename',            category: 'Panel',              action: 'Set Title & Icon',                    keys: '' },
    { id: 'panel.record_change_banner',     category: 'Panel',              action: 'Change Banner...',                    keys: '' },
    { id: 'panel.record_view_versions',     category: 'Panel',              action: 'View Version History...',             keys: '' },
    { id: 'panel.collection_settings',      category: 'Panel',              action: 'Collection Settings...',              keys: '' },
    { id: 'panel.collection_change_banner', category: 'Panel',              action: 'Change Collection Banner...',         keys: '' },
    { id: 'panel.collection_view_versions', category: 'Panel',              action: 'View Collection Version History...',  keys: '' },
    { id: 'panel.properties_show_all',      category: 'Panel',              action: 'Show all page properties',            keys: '' },
    { id: 'panel.properties_show_default',  category: 'Panel',              action: 'Show default page properties',        keys: '' },
    { id: 'panel.properties_show_none',     category: 'Panel',              action: 'Hide page properties',                keys: '' },
    { id: 'panel.query_show',               category: 'Panel',              action: 'Show query section',                  keys: '' },
    { id: 'panel.query_hide',               category: 'Panel',              action: 'Hide query section',                  keys: '' },

    // --- Settings Actions ---
    { id: 'settings.theme',                 category: 'Settings',           action: 'Change Theme...',                     keys: '' },
    { id: 'settings.toggle_theme',          category: 'Settings',           action: 'Toggle Day/Night Theme',              keys: '' },
    { id: 'settings.locale',                category: 'Settings',           action: 'Date/Time Settings...',               keys: '' },
    { id: 'settings.experiments',           category: 'Settings',           action: 'Experiments...',                      keys: '' },

    // --- Editor Actions ---
    { id: 'editor.bold',                    category: 'Editor',             action: 'Strong (bold)',                       keys: 'Meta+KeyB' },
    { id: 'editor.italic',                  category: 'Editor',             action: 'Emphasize (italic)',                  keys: 'Meta+KeyI' },
    { id: 'editor.code',                    category: 'Editor',             action: 'Inline code',                         keys: 'Meta+KeyE' },
    { id: 'editor.url',                     category: 'Editor',             action: 'Insert link',                         keys: 'Meta+Shift+KeyK' },
    { id: 'editor.toggleCheckbox',          category: 'Editor',             action: 'Toggle task done',                    keys: 'Meta+KeyL' },
    { id: 'editor.toggleCheckboxTriState',  category: 'Editor',             action: 'Cycle task / done / text',            keys: 'Meta+Shift+KeyL' },
    { id: 'editor.scheduleToday',           category: 'Editor',             action: "Schedule on today's journal",         keys: 'Meta+Shift+KeyJ' },
    { id: 'editor.indent',                  category: 'Editor',             action: 'Indent',                              keys: 'Tab' },
    { id: 'editor.dedent',                  category: 'Editor',             action: 'Dedent',                              keys: 'Shift+Tab' },
    { id: 'editor.indentTree',              category: 'Editor',             action: 'Indent with children',                keys: '' },
    { id: 'editor.dedentTree',              category: 'Editor',             action: 'Dedent with children',                keys: '' },
    { id: 'editor.moveSiblingUp',           category: 'Editor',             action: 'Move item up',                        keys: 'Meta+Shift+ArrowUp' },
    { id: 'editor.moveSiblingDown',         category: 'Editor',             action: 'Move item down',                      keys: 'Meta+Shift+ArrowDown' },
    { id: 'editor.insertLineBreak',         category: 'Editor',             action: 'Insert line break',                   keys: 'Meta+Enter' },
    { id: 'editor.deleteToLineStart',       category: 'Editor',             action: 'Delete to line start',                keys: '' },
    { id: 'editor.deleteLine',              category: 'Editor',             action: 'Delete current line',                 keys: '' },
    { id: 'editor.duplicateLine',           category: 'Editor',             action: 'Duplicate current line',              keys: '' },
    { id: 'editor.autocomplete',            category: 'Editor',             action: 'Show autocomplete',                   keys: 'Ctrl+Space' },
    { id: 'editor.save',                    category: 'Editor',             action: 'Save',                                keys: 'Meta+KeyS' },
    { id: 'editor.escape',                  category: 'Editor',             action: 'Escape / deselect',                   keys: 'Escape' },
    { id: 'editor.copyAsText',              category: 'Editor',             action: 'Copy as plain text',                  keys: '' },
    { id: 'editor.copyAsMarkdown',          category: 'Editor',             action: 'Copy as Markdown',                    keys: '' },
    { id: 'editor.copyAsHTML',              category: 'Editor',             action: 'Copy as HTML',                        keys: '' },
    { id: 'editor.copyAsReference',         category: 'Editor',             action: 'Copy as reference',                   keys: '' },
    { id: 'editor.copyAsTransclusion',      category: 'Editor',             action: 'Copy as transclusion',                keys: '' },

    // --- Navigation Actions ---
    { id: 'nav.left',                       category: 'Navigation',         action: 'Move cursor left',                    keys: 'ArrowLeft' },
    { id: 'nav.right',                      category: 'Navigation',         action: 'Move cursor right',                   keys: 'ArrowRight' },
    { id: 'nav.up',                         category: 'Navigation',         action: 'Move cursor up',                      keys: 'ArrowUp' },
    { id: 'nav.down',                       category: 'Navigation',         action: 'Move cursor down',                    keys: 'ArrowDown' },
    { id: 'nav.selectLeft',                 category: 'Navigation',         action: 'Select left',                         keys: 'Shift+ArrowLeft' },
    { id: 'nav.selectRight',                category: 'Navigation',         action: 'Select right',                        keys: 'Shift+ArrowRight' },
    { id: 'nav.selectUp',                   category: 'Navigation',         action: 'Select up',                           keys: 'Shift+ArrowUp' },
    { id: 'nav.selectDown',                 category: 'Navigation',         action: 'Select down',                         keys: 'Shift+ArrowDown' },
    { id: 'nav.wordLeft',                   category: 'Navigation',         action: 'Move by word left',                   keys: 'Alt+ArrowLeft' },
    { id: 'nav.wordRight',                  category: 'Navigation',         action: 'Move by word right',                  keys: 'Alt+ArrowRight' },
    { id: 'nav.selectWordLeft',             category: 'Navigation',         action: 'Select by word left',                 keys: 'Alt+Shift+ArrowLeft' },
    { id: 'nav.selectWordRight',            category: 'Navigation',         action: 'Select by word right',                keys: 'Alt+Shift+ArrowRight' },
    { id: 'nav.home',                       category: 'Navigation',         action: 'Go to line start',                    keys: 'Meta+ArrowLeft' },
    { id: 'nav.end',                        category: 'Navigation',         action: 'Go to line end',                      keys: 'Meta+ArrowRight' },
    { id: 'nav.selectHome',                 category: 'Navigation',         action: 'Select to line start',                keys: 'Meta+Shift+ArrowLeft' },
    { id: 'nav.selectEnd',                  category: 'Navigation',         action: 'Select to line end',                  keys: 'Meta+Shift+ArrowRight' },
    { id: 'nav.docStart',                   category: 'Navigation',         action: 'Go to document start',                keys: 'Meta+ArrowUp' },
    { id: 'nav.docEnd',                     category: 'Navigation',         action: 'Go to document end',                  keys: 'Meta+ArrowDown' },
    { id: 'nav.selectDocStart',             category: 'Navigation',         action: 'Select to document start',            keys: 'Meta+Shift+ArrowUp' },
    { id: 'nav.selectDocEnd',               category: 'Navigation',         action: 'Select to document end',              keys: 'Meta+Shift+ArrowDown' },
    { id: 'nav.pageUp',                     category: 'Navigation',         action: 'Page up',                             keys: 'PageUp' },
    { id: 'nav.pageDown',                   category: 'Navigation',         action: 'Page down',                           keys: 'PageDown' },
    { id: 'nav.selectPageUp',               category: 'Navigation',         action: 'Select page up',                      keys: 'Shift+PageUp' },
    { id: 'nav.selectPageDown',             category: 'Navigation',         action: 'Select page down',                    keys: 'Shift+PageDown' },
    { id: 'nav.selectAll',                  category: 'Navigation',         action: 'Expand selection',                    keys: 'Meta+KeyA' },
    { id: 'nav.openRefMenu',               category: 'Navigation',         action: 'Open menu for link at cursor',        keys: '' },
    { id: 'nav.toggleFold',                 category: 'Navigation',         action: 'Fold individual item',                keys: 'Meta+Slash' },
    { id: 'nav.toggleFoldDescendants',      category: 'Navigation',         action: 'All descendants of item',             keys: 'Meta+Shift+Slash' },
    { id: 'nav.foldChildren',               category: 'Navigation',         action: 'Fold all children',                   keys: 'Meta+Comma' },
    { id: 'nav.unfoldChildren',             category: 'Navigation',         action: 'Unfold all children',                 keys: 'Meta+Period' },
    { id: 'nav.foldCascade',                category: 'Navigation',         action: 'Fold cascade',                        keys: 'Meta+Shift+Comma' },
    { id: 'nav.unfoldCascade',              category: 'Navigation',         action: 'Unfold cascade',                      keys: 'Meta+Shift+Period' },
    { id: 'nav.foldContainer',              category: 'Navigation',         action: 'Fold all items in container',         keys: '' },
    { id: 'nav.unfoldContainer',            category: 'Navigation',         action: 'Unfold all items in container',       keys: '' },
    { id: 'nav.toggleFoldContainer',        category: 'Navigation',         action: 'Toggle fold/unfold for container',    keys: '' },

    // --- Collection Actions ---
    { id: 'collection.trash_record',        category: 'Collection',         action: 'Trash focused row/card',              keys: 'Shift+Backspace' },
    { id: 'collection.clear_cell',          category: 'Collection',         action: 'Clear focused cell value',            keys: '' },
];

// Category display order
const CATEGORY_ORDER = [
    'Global',
    'Panel',
    'Settings',
    'Editor',
    'Navigation',
    'Collection',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse a stored key string like "Meta+Shift+KeyK" into parts.
 * @param {string} keyStr
 * @returns {{meta: boolean, ctrl: boolean, alt: boolean, shift: boolean, key: string}}
 */
function parseKeyString(keyStr) {
    const parts = keyStr.split('+');
    const result = { meta: false, ctrl: false, alt: false, shift: false, key: '' };
    for (const p of parts) {
        if (p === 'Meta')       result.meta = true;
        else if (p === 'Ctrl')  result.ctrl = true;
        else if (p === 'Alt')   result.alt = true;
        else if (p === 'Shift') result.shift = true;
        else                    result.key = p;
    }
    return result;
}

/**
 * Build a display string from a stored key string.
 * @param {string} keyStr
 * @returns {string[]} array of display tokens, e.g. ['⌘', '⇧', 'K']
 */
function keyStringToDisplay(keyStr) {
    const parsed = parseKeyString(keyStr);
    const tokens = [];
    if (parsed.ctrl)  tokens.push(MOD_DISPLAY.ctrl);
    if (parsed.alt)   tokens.push(MOD_DISPLAY.alt);
    if (parsed.shift) tokens.push(MOD_DISPLAY.shift);
    if (parsed.meta)  tokens.push(MOD_DISPLAY.meta);

    // Translate key code to display
    let keyDisplay = parsed.key;
    if (KEY_DISPLAY[parsed.key]) {
        keyDisplay = KEY_DISPLAY[parsed.key];
    } else if (parsed.key.startsWith('Key')) {
        keyDisplay = parsed.key.slice(3);
    } else if (parsed.key.startsWith('Digit')) {
        keyDisplay = parsed.key.slice(5);
    } else {
        // Capitalize first letter for display
        keyDisplay = parsed.key.charAt(0).toUpperCase() + parsed.key.slice(1);
    }
    tokens.push(keyDisplay);
    return tokens;
}

/**
 * Convert a KeyboardEvent into a canonical key string for storage.
 * @param {KeyboardEvent} e
 * @returns {string}
 */
function eventToKeyString(e) {
    const parts = [];
    if (e.ctrlKey && !e.metaKey) parts.push('Ctrl');
    if (e.altKey)                parts.push('Alt');
    if (e.shiftKey)              parts.push('Shift');
    if (e.metaKey)               parts.push('Meta');

    // Ignore standalone modifier presses
    const ignoreCodes = ['ControlLeft', 'ControlRight', 'AltLeft', 'AltRight',
                         'ShiftLeft', 'ShiftRight', 'MetaLeft', 'MetaRight'];
    if (ignoreCodes.includes(e.code)) return '';

    parts.push(e.code);
    return parts.join('+');
}

/**
 * Build display-friendly string for search matching.
 * @param {string} keyStr
 * @returns {string}
 */
function keyStringToSearchable(keyStr) {
    return keyStringToDisplay(keyStr).join('').toLowerCase();
}

// ---------------------------------------------------------------------------
// Config format conversion
// ---------------------------------------------------------------------------

/**
 * Key code to human-readable name for the "Customize Keyboard Shortcuts" config.
 * e.g. "KeyB" -> "B", "Digit1" -> "1", "ArrowUp" -> "Up", "BracketLeft" -> "["
 */
const CODE_TO_CONFIG_KEY = {
    ArrowUp: 'Up', ArrowDown: 'Down', ArrowLeft: 'Left', ArrowRight: 'Right',
    Enter: 'Enter', Backspace: 'Backspace', Delete: 'Delete',
    Escape: 'Escape', Tab: 'Tab', Space: 'Space',
    PageUp: 'PageUp', PageDown: 'PageDown', Home: 'Home', End: 'End',
    Backslash: '\\', Slash: '/', Period: '.', Comma: ',',
    BracketLeft: '[', BracketRight: ']',
    Semicolon: ';', Quote: "'", Backquote: '`',
    Minus: '-', Equal: '=',
};

/**
 * Reverse map: config key name back to internal code.
 */
const CONFIG_KEY_TO_CODE = {};
for (const [code, name] of Object.entries(CODE_TO_CONFIG_KEY)) {
    CONFIG_KEY_TO_CODE[name] = code;
}

/**
 * Convert an internal key string (e.g. "Meta+Shift+KeyF") to the
 * config format (e.g. "Meta+Shift+F").
 * Valid modifiers: Meta, Ctrl, Alt, Shift.
 * @param {string} keyStr
 * @returns {string}
 */
function keyStringToConfigFormat(keyStr) {
    const parsed = parseKeyString(keyStr);
    const parts = [];
    if (parsed.meta)  parts.push('Meta');
    if (parsed.ctrl)  parts.push('Ctrl');
    if (parsed.alt)   parts.push('Alt');
    if (parsed.shift) parts.push('Shift');

    let key = parsed.key;
    if (CODE_TO_CONFIG_KEY[key]) {
        key = CODE_TO_CONFIG_KEY[key];
    } else if (key.startsWith('Key')) {
        key = key.slice(3);
    } else if (key.startsWith('Digit')) {
        key = key.slice(5);
    }
    parts.push(key);
    return parts.join('+');
}

/**
 * Convert a config format string (e.g. "Meta+Shift+F") back to
 * the internal key string (e.g. "Meta+Shift+KeyF").
 * Valid modifiers: Meta, Ctrl, Alt, Shift.
 * @param {string} configStr
 * @returns {string}
 */
function configFormatToKeyString(configStr) {
    const parts = configStr.split('+');
    const result = { meta: false, ctrl: false, alt: false, shift: false, key: '' };
    for (const p of parts) {
        if (p === 'Meta')       result.meta = true;
        else if (p === 'Ctrl')  result.ctrl = true;
        else if (p === 'Alt')   result.alt = true;
        else if (p === 'Shift') result.shift = true;
        else                    result.key = p;
    }

    const outParts = [];
    if (result.ctrl)  outParts.push('Ctrl');
    if (result.alt)   outParts.push('Alt');
    if (result.shift) outParts.push('Shift');
    if (result.meta)  outParts.push('Meta');

    // Convert key back to code
    let code = result.key;
    if (CONFIG_KEY_TO_CODE[code]) {
        code = CONFIG_KEY_TO_CODE[code];
    } else if (code.length === 1 && /[A-Z]/.test(code)) {
        code = 'Key' + code;
    } else if (code.length === 1 && /[0-9]/.test(code)) {
        code = 'Digit' + code;
    }
    outParts.push(code);
    return outParts.join('+');
}

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

class Plugin extends AppPlugin {

    onLoad() {
        this.ui.injectCSS(css);

        // State
        this._sidebarItem = null;
        this._cmdPalItem = null;
        this._panelRef = null;
        this._recording = null; // { id, element, onKey }

        // Register custom panel type
        this.ui.registerCustomPanelType('kb-shortcuts-editor', (panel) => {
            this._renderPanel(panel);
        });

        /* Add sidebar item
        this._sidebarItem = this.ui.addSidebarItem({
            label: 'Keyboard Shortcuts',
            icon: 'keyboard',
            tooltip: 'Browse and customize keyboard shortcuts',
            onClick: () => this._openPanel(),
        });
        */

        // Add command palette command
        this._cmdPalItem = this.ui.addCommandPaletteCommand({
            label: 'Change Keyboard Shortcuts (GUI)',
            icon: 'keyboard',
            onSelected: () => this._openPanel(),
        });
    }

    onUnload() {
        if (this._sidebarItem) this._sidebarItem.remove();
        if (this._cmdPalItem)  this._cmdPalItem.remove();
        this._stopRecording();
    }

    // ------------------------------------------------------------------
    // Panel management
    // ------------------------------------------------------------------

    async _openPanel() {
        const panel = await this.ui.createPanel();
        if (panel) {
            panel.navigateToCustomType('kb-shortcuts-editor');
        }
    }

    // ------------------------------------------------------------------
    // Custom shortcuts persistence
    // ------------------------------------------------------------------

    /**
     * Get custom shortcuts from config.
     * Stored in config format: { "global.undo": "Meta+Z", ... }
     * @returns {Object<string, string>}
     */
    _getCustomShortcuts() {
        const conf = this.getConfiguration();
        return (conf && conf.custom && conf.custom.shortcuts) || {};
    }

    /**
     * Save a custom shortcut override.
     * Converts internal key string to config format before saving.
     * @param {string} id - e.g. "global.undo"
     * @param {string} keyStr - internal format, e.g. "Meta+KeyZ"
     */
    async _saveCustomShortcut(id, keyStr) {
        const conf = this.getConfiguration();
        if (!conf.custom) conf.custom = {};
        if (!conf.custom.shortcuts) conf.custom.shortcuts = {};
        conf.custom.shortcuts[id] = keyStringToConfigFormat(keyStr);
        const pluginGuid = this.getGuid();
        const plugin = this.data.getPluginByGuid(pluginGuid);
        if (plugin) {
            await plugin.saveConfiguration(conf);
        }
    }

    async _removeCustomShortcut(id) {
        const conf = this.getConfiguration();
        if (conf && conf.custom && conf.custom.shortcuts && conf.custom.shortcuts[id]) {
            delete conf.custom.shortcuts[id];
            const pluginGuid = this.getGuid();
            const plugin = this.data.getPluginByGuid(pluginGuid);
            if (plugin) {
                await plugin.saveConfiguration(conf);
            }
        }
    }

    async _resetAllShortcuts() {
        const conf = this.getConfiguration();
        if (conf && conf.custom) {
            conf.custom.shortcuts = {};
            const pluginGuid = this.getGuid();
            const plugin = this.data.getPluginByGuid(pluginGuid);
            if (plugin) {
                await plugin.saveConfiguration(conf);
            }
        }
    }

    /**
     * Build the config JSON object for all customized shortcuts.
     * Uses valid Thymer modifiers: Meta, Ctrl, Alt, Shift.
     * Only includes shortcuts from the DEFAULT_SHORTCUTS list.
     * @returns {Object<string, string>}
     */
    _buildConfigJSON() {
        const custom = this._getCustomShortcuts();
        const validIds = new Set(DEFAULT_SHORTCUTS.map(s => s.id));
        const result = {};
        for (const [id, configVal] of Object.entries(custom)) {
            if (validIds.has(id)) {
                result[id] = configVal;
            }
        }
        return result;
    }

    /**
     * Copy the customized shortcuts config JSON to the clipboard.
     */
    _copyConfigToClipboard() {
        const config = this._buildConfigJSON();
        const json = JSON.stringify(config, null, 2);
        navigator.clipboard.writeText(json).then(() => {
            const count = Object.keys(config).length;
            this.ui.addToaster({
                title: 'Config copied to clipboard',
                message: count + ' customized shortcut' + (count !== 1 ? 's' : '') + ' — paste into Thymer\'s "Change Keyboard Shortcuts" page',
                dismissible: true,
                autoDestroyTime: 4000,
            });
        }).catch(() => {
            this.ui.addToaster({
                title: 'Failed to copy',
                message: 'Clipboard access denied. Try copying manually.',
                dismissible: true,
                autoDestroyTime: 3000,
            });
        });
    }

    /**
     * Get the effective key string for a shortcut (custom override or default).
     * Custom shortcuts are stored in config format — convert back to internal.
     * @param {string} id
     * @returns {string} internal key string
     */
    _getEffectiveKeys(id) {
        const custom = this._getCustomShortcuts();
        if (custom[id]) return configFormatToKeyString(custom[id]);
        const def = DEFAULT_SHORTCUTS.find(s => s.id === id);
        return def ? def.keys : '';
    }

    /**
     * Check if a key string conflicts with any other shortcut.
     * @param {string} keyStr
     * @param {string} excludeId - shortcut id to exclude from check
     * @returns {string|null} - conflicting action name or null
     */
    _findConflict(keyStr, excludeId) {
        if (!keyStr) return null;
        for (const sc of DEFAULT_SHORTCUTS) {
            if (sc.id === excludeId) continue;
            const effective = this._getEffectiveKeys(sc.id);
            if (effective === keyStr) return sc.action;
        }
        return null;
    }

    // ------------------------------------------------------------------
    // Recording
    // ------------------------------------------------------------------

    _stopRecording() {
        if (this._recording) {
            if (this._recording.onKey) {
                document.removeEventListener('keydown', this._recording.onKey, true);
            }
            if (this._recording.element) {
                this._recording.element.classList.remove('kb-recording');
            }
            this._recording = null;
        }
    }

    // ------------------------------------------------------------------
    // Panel rendering
    // ------------------------------------------------------------------

    _renderPanel(panel) {
        const el = panel.getElement();
        if (!el) return;
        panel.setTitle('Keyboard Shortcuts');

        const root = document.createElement('div');
        root.className = 'kb-shortcuts-panel';
        el.appendChild(root);

        let searchQuery = '';

        const render = () => {
            root.innerHTML = '';

            // --- Header ---
            const header = document.createElement('div');
            header.className = 'kb-shortcuts-header';

            const title = document.createElement('div');
            title.className = 'kb-shortcuts-title';
            title.innerHTML = '<span class="kb-shortcuts-title-icon">⌨</span> Keyboard Shortcuts';
            header.appendChild(title);

            // Search
            const searchWrap = document.createElement('div');
            searchWrap.className = 'kb-search-wrap';
            const searchIcon = document.createElement('span');
            searchIcon.className = 'kb-search-icon';
            searchIcon.textContent = '🔍';
            searchWrap.appendChild(searchIcon);
            const searchInput = document.createElement('input');
            searchInput.className = 'kb-search-input';
            searchInput.type = 'text';
            searchInput.placeholder = 'Search shortcuts...';
            searchInput.value = searchQuery;
            searchInput.addEventListener('input', () => {
                searchQuery = searchInput.value;
                render();
                // Re-focus the search input after re-render
                const newInput = root.querySelector('.kb-search-input');
                if (newInput) {
                    newInput.focus();
                    newInput.setSelectionRange(searchQuery.length, searchQuery.length);
                }
            });
            searchWrap.appendChild(searchInput);
            header.appendChild(searchWrap);

            // Header action buttons
            const customShortcuts = this._getCustomShortcuts();
            const hasCustom = Object.keys(customShortcuts).length > 0;

            if (hasCustom) {
                const actionsWrap = document.createElement('div');
                actionsWrap.className = 'kb-header-actions';

                // Copy Config button
                const copyBtn = document.createElement('button');
                copyBtn.className = 'kb-copy-config-btn';
                copyBtn.textContent = '📋 Copy Config';
                copyBtn.title = 'Copy customized shortcuts as JSON for Thymer\'s "Change Keyboard Shortcuts" page';
                copyBtn.addEventListener('click', () => {
                    this._copyConfigToClipboard();
                });
                actionsWrap.appendChild(copyBtn);

                // Reset All button
                const resetAllBtn = document.createElement('button');
                resetAllBtn.className = 'kb-reset-all-btn';
                resetAllBtn.textContent = 'Reset All';
                resetAllBtn.addEventListener('click', async () => {
                    await this._resetAllShortcuts();
                    render();
                    this.ui.addToaster({
                        title: 'All shortcuts reset to defaults',
                        dismissible: true,
                        autoDestroyTime: 2000,
                    });
                });
                actionsWrap.appendChild(resetAllBtn);

                header.appendChild(actionsWrap);
            }

            root.appendChild(header);

            // --- Filter shortcuts ---
            const q = searchQuery.toLowerCase().trim();
            const filtered = q
                ? DEFAULT_SHORTCUTS.filter(sc => {
                    const effective = this._getEffectiveKeys(sc.id);
                    return sc.action.toLowerCase().includes(q)
                        || sc.category.toLowerCase().includes(q)
                        || keyStringToSearchable(effective).includes(q)
                        || keyStringToDisplay(effective).join('+').toLowerCase().includes(q);
                })
                : DEFAULT_SHORTCUTS;

            if (filtered.length === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'kb-no-results';
                noResults.textContent = 'No shortcuts found matching "' + searchQuery + '"';
                root.appendChild(noResults);
                return;
            }

            // --- Group by category ---
            const grouped = new Map();
            for (const sc of filtered) {
                if (!grouped.has(sc.category)) grouped.set(sc.category, []);
                grouped.get(sc.category).push(sc);
            }

            // Sort categories by defined order
            const sortedCategories = [...grouped.keys()].sort((a, b) => {
                const ia = CATEGORY_ORDER.indexOf(a);
                const ib = CATEGORY_ORDER.indexOf(b);
                return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
            });

            for (const cat of sortedCategories) {
                const shortcuts = grouped.get(cat);
                root.appendChild(this._renderCategory(cat, shortcuts, render));
            }
        };

        render();
    }

    /**
     * @param {string} categoryName
     * @param {Array} shortcuts
     * @param {Function} rerender
     * @returns {HTMLElement}
     */
    _renderCategory(categoryName, shortcuts, rerender) {
        const section = document.createElement('div');
        section.className = 'kb-category';

        // Header (collapsible)
        const header = document.createElement('div');
        header.className = 'kb-category-header';
        const chevron = document.createElement('span');
        chevron.className = 'kb-category-chevron';
        chevron.textContent = '▼';
        header.appendChild(chevron);
        const label = document.createElement('span');
        label.textContent = categoryName;
        header.appendChild(label);

        const countBadge = document.createElement('span');
        countBadge.style.cssText = 'margin-left:auto; opacity:0.4; font-size:0.65rem;';
        countBadge.textContent = shortcuts.length;
        header.appendChild(countBadge);

        header.addEventListener('click', () => {
            section.classList.toggle('collapsed');
        });
        section.appendChild(header);

        // Body
        const body = document.createElement('div');
        body.className = 'kb-category-body';

        for (const sc of shortcuts) {
            body.appendChild(this._renderShortcutRow(sc, rerender));
        }

        section.appendChild(body);
        return section;
    }

    /**
     * @param {Object} sc - shortcut definition
     * @param {Function} rerender
     * @returns {HTMLElement}
     */
    _renderShortcutRow(sc, rerender) {
        const custom = this._getCustomShortcuts();
        const isCustomized = !!custom[sc.id];
        const effectiveKeys = this._getEffectiveKeys(sc.id);

        const row = document.createElement('div');
        row.className = 'kb-shortcut-row' + (isCustomized ? ' kb-customized' : '');
        row.dataset.id = sc.id;

        // Action name
        const actionEl = document.createElement('div');
        actionEl.className = 'kb-shortcut-action';
        actionEl.textContent = sc.action;
        row.appendChild(actionEl);

        // Key badges
        const keysEl = document.createElement('div');
        keysEl.className = 'kb-shortcut-keys';
        this._renderKbdBadges(keysEl, effectiveKeys);
        row.appendChild(keysEl);

        // Action buttons
        const actionsEl = document.createElement('div');
        actionsEl.className = 'kb-shortcut-actions';

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'kb-action-btn';
        editBtn.title = 'Change shortcut';
        editBtn.textContent = '✏️';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this._startRecording(sc, row, keysEl, rerender);
        });
        actionsEl.appendChild(editBtn);

        // Reset button (only if customized)
        if (isCustomized) {
            const resetBtn = document.createElement('button');
            resetBtn.className = 'kb-action-btn kb-reset-btn';
            resetBtn.title = 'Reset to default';
            resetBtn.textContent = '↺';
            resetBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                await this._removeCustomShortcut(sc.id);
                rerender();
                this.ui.addToaster({
                    title: 'Shortcut reset',
                    message: sc.action + ' → ' + keyStringToConfigFormat(sc.keys),
                    dismissible: true,
                    autoDestroyTime: 2000,
                });
            });
            actionsEl.appendChild(resetBtn);
        }

        row.appendChild(actionsEl);
        return row;
    }

    /**
     * Render kbd badges into a container.
     * @param {HTMLElement} container
     * @param {string} keyStr
     */
    _renderKbdBadges(container, keyStr) {
        container.innerHTML = '';
        const tokens = keyStringToDisplay(keyStr);
        tokens.forEach((token, i) => {
            if (i > 0) {
                const plus = document.createElement('span');
                plus.className = 'kb-kbd-plus';
                plus.textContent = '';
                container.appendChild(plus);
            }
            const kbd = document.createElement('span');
            kbd.className = 'kb-kbd';
            kbd.textContent = token;
            container.appendChild(kbd);
        });
    }

    // ------------------------------------------------------------------
    // Key recording
    // ------------------------------------------------------------------

    _startRecording(sc, rowEl, keysEl, rerender) {
        // Stop any existing recording
        this._stopRecording();

        rowEl.classList.add('kb-recording');

        // Replace key badges with recording indicator
        keysEl.innerHTML = '';
        const badge = document.createElement('span');
        badge.className = 'kb-recording-badge';
        badge.textContent = 'Press keys...';
        keysEl.appendChild(badge);

        const hint = document.createElement('span');
        hint.className = 'kb-recording-hint';
        hint.textContent = 'Esc to cancel';
        keysEl.appendChild(hint);

        // Conflict message placeholder
        let conflictEl = null;

        const onKey = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            // Escape cancels
            if (e.key === 'Escape') {
                this._stopRecording();
                rerender();
                return;
            }

            const keyStr = eventToKeyString(e);
            if (!keyStr) return; // Modifier-only press

            // Display the captured combo
            badge.textContent = '';
            badge.className = 'kb-recording-badge';
            const tokens = keyStringToDisplay(keyStr);
            tokens.forEach((token, i) => {
                if (i > 0) {
                    const plus = document.createElement('span');
                    plus.className = 'kb-kbd-plus';
                    plus.textContent = ' ';
                    badge.appendChild(plus);
                }
                const span = document.createElement('span');
                span.textContent = token;
                badge.appendChild(span);
            });

            // Check for conflicts
            const conflict = this._findConflict(keyStr, sc.id);

            // Remove old conflict message
            if (conflictEl) {
                conflictEl.remove();
                conflictEl = null;
            }

            if (conflict) {
                conflictEl = document.createElement('div');
                conflictEl.className = 'kb-conflict-msg';
                conflictEl.textContent = '⚠ Already used by: ' + conflict;
                rowEl.appendChild(conflictEl);
                // Don't save — let user try again or press Esc
                return;
            }

            // No conflict — save and finish
            this._stopRecording();
            this._saveCustomShortcut(sc.id, keyStr).then(() => {
                rerender();
                this.ui.addToaster({
                    title: 'Shortcut updated',
                    message: sc.action + ' → ' + keyStringToConfigFormat(keyStr),
                    dismissible: true,
                    autoDestroyTime: 2000,
                });
            });
        };

        document.addEventListener('keydown', onKey, true);

        this._recording = {
            id: sc.id,
            element: rowEl,
            onKey: onKey,
        };
    }
}
