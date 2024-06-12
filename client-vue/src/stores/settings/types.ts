import type { ResizableBoundings } from "@/typings";

/* * * App * * */

interface SettingsApp {
  themes: SettingsStoreThemes;
}

interface SettingsStoreThemes {
  themes: Array<string>;
  current: string;
}

/* * * Main Menu * * */

interface MainMenu {
  isMinimized: boolean;
}

/* * * Navigator * * */

interface SettingsNavigatorHierarchyMenu {
  isScrollToNoteEnabled: boolean;
}

interface SettingsNavigator {
  show: boolean;
  boundings: ResizableBoundings;
  hierarchyMenu: SettingsNavigatorHierarchyMenu;
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
  mainMenu: MainMenu;
  navigator: SettingsNavigator;
  editor: SettingsEditor;
}
