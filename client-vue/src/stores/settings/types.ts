import type { ResizableBoundings } from "@/typings";

/* * * App * * */

interface SettingsApp {
  themes: SettingsStoreThemes;
}

interface SettingsStoreThemes {
  themes: Array<string>;
  current: string;
}

/* * * Navigator: Menu * * */

interface SettingsNavigatorMenu {
  boundings: ResizableBoundings;
}

interface SettingsNavigator {
  menu: SettingsNavigatorMenu;
}

export type SettingsEditorGenerallMenuNotesListModes = "list" | "card";
interface SettingsEditorGenerallMenuNotesListMode {
  mode: SettingsEditorGenerallMenuNotesListModes;
  modes: Array<SettingsEditorGenerallMenuNotesListModes>;
}
interface SettingsEditorGenerallMenu {
  notesListMode: SettingsEditorGenerallMenuNotesListMode;
  isPlacedNoteNextDuringCreation: boolean;
  isFocusedOnFirstNoteOnStart: boolean;
}

/* * * Tabbar * * */

interface SettingsEditorGeneralTabbar {
  maxOpenedTabs: number;
  isFocusedOnNewTab: boolean;
}

/* * * Content * * */

interface OptionSize {
  sizes: Array<number>;
  size: number;
}

interface SettingsEditorGeneralContentFont extends OptionSize {}

interface SettingsEditorGeneralContent {
  mode: any;
  font: SettingsEditorGeneralContentFont;
}

/* * * Store * * */

interface SettingsEditorGeneral {
  tabbar: SettingsEditorGeneralTabbar;
  menu: SettingsEditorGenerallMenu;
  content: SettingsEditorGeneralContent;
}
interface SettingsEditor {
  general: SettingsEditorGeneral;
}

export interface SettingsStoreState {
  app: SettingsApp;
  navigator: SettingsNavigator;
  editor: SettingsEditor;
}
