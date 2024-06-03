interface OptionSize {
  sizes: Array<number>;
  size: number;
}

interface SettingsEditorGeneralContentFont extends OptionSize {}

interface SettingsEditorGeneralContent {
  mode: any;
  font: SettingsEditorGeneralContentFont;
}

interface SettingsEditorGeneralTabbar {
  isFocusedOnNewTab: boolean;
  isFocusedOnFirstTabOnStart: boolean;
}
interface SettingsEditorGeneral {
  tabbar: SettingsEditorGeneralTabbar;
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
