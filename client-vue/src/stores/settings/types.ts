interface OptionSize {
  sizes: Array<number>;
  size: number;
}

interface SettingsEditorGeneralContentFont extends OptionSize {}

interface SettingsEditorGeneralContent {
  mode: any;
  font: SettingsEditorGeneralContentFont;
}

interface SettingsEditorGenearlMenu {
  isPlacedNoteNextDuringCreation: boolean;
  isFocusedOnFirstNoteOnStart: boolean;
}

interface SettingsEditorGeneralTabbar {
  isFocusedOnNewTab: boolean;
}
interface SettingsEditorGeneral {
  tabbar: SettingsEditorGeneralTabbar;
  menu: SettingsEditorGenearlMenu;
  content: SettingsEditorGeneralContent;
}
export interface SettingsEditor {
  general: SettingsEditorGeneral;
}

interface SettingsApp {
  themes: SettingsStoreThemes;
}

interface SettingsStoreThemes {
  themes: Array<string>;
  current: string;
}

export interface SettingsStoreState {
  editor: SettingsEditor;
  app: SettingsApp;
}
