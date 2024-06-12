import { defineStore } from "pinia";

import type { SettingsStoreState } from "./types";
import type { ResizableBoundings } from "@/typings";

export enum Themes {
  DARK = "dark",
  LIGHT = "light",
}

const defaults = {
  theme: localStorage.getItem("theme") ?? Themes.DARK,
};

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsStoreState => ({
    app: {
      themes: {
        themes: [Themes.LIGHT, Themes.DARK],
        current: defaults.theme,
      },
    },
    mainMenu: {
      isMinimized: false,
    },
    navigator: {
      show: true,
      boundings: {
        width: 420,
        minWidth: 240,
        maxWidth: 540,
      },
      hierarchyMenu: {
        isScrollToNoteEnabled: true,
      },
    },
    editor: {
      general: {
        menu: {
          notesListMode: {
            mode: "list",
            modes: ["list", "card"],
          },
          isPlacedNoteNextDuringCreation: true,
          isFocusedOnFirstNoteOnStart: false,
        },
        tabbar: {
          maxOpenedTabs: 6,
          isFocusedOnNewTab: true,
        },
        content: {
          mode: "add mode",
          font: {
            sizes: [0, 1, 2],
            size: 1,
          },
        },
      },
    },
  }),
  getters: {
    /**
     * @description The current theme of the app
     */
    appTheme(state): { theme: string; id: number } {
      const id = this.app.themes.themes.findIndex(
        (el) => el === this.app.themes.current
      );
      return { theme: state.app.themes.current, id };
    },

    /* * * Main Menu * * */

    /**
     * @description Main sidebar view state
     */
    isMainMenuMinimized: (state) => {
      return state.mainMenu.isMinimized;
    },

    /* * * Navigator * * */

    /**
     * @description Current navigator window width
     */
    navigatorWidth: (state): number => {
      console.log("get width: ", state.navigator.boundings.width);
      return state.navigator.boundings.width;
    },

    isHierarchyScrollToNoteEnabled: (state): boolean => {
      return state.navigator.hierarchyMenu.isScrollToNoteEnabled;
    },

    /**
     * @description Current navigator window rect boundings
     */
    navigatorBoundings: (state): ResizableBoundings => {
      return state.navigator.boundings;
    },

    /* * * Modal Menu * * */

    IsPlacedNoteNextDuringCreation: (state): boolean => {
      return state.editor.general.menu.isPlacedNoteNextDuringCreation;
    },

    isFocusedOnFirstNoteOnStart: (state): boolean => {
      return state.editor.general.menu.isFocusedOnFirstNoteOnStart;
    },

    isNoteListMode: (state): boolean => {
      const mode = state.editor.general.menu.notesListMode.mode;
      return mode === "list";
    },

    /* * * Tabbar * * */

    maxOpenedTabs: (state): number => {
      return state.editor.general.tabbar.maxOpenedTabs;
    },

    isFocusedOnNewTab: (state): boolean => {
      return state.editor.general.tabbar.isFocusedOnNewTab;
    },

    contentFontSizeSid: (state) => {
      const sizes = state.editor.general.content.font.sizes;
      const size = state.editor.general.content.font.size;

      return sizes.findIndex((s) => s === size);
    },
  },
  actions: {
    /* * * App * * */

    /**
     * @description Set the app theme
     */
    setAppTheme(state: boolean): void {
      const theme = this.app.themes.themes[Number(state)];
      this.app.themes.current = theme;
      localStorage.setItem("theme", theme);
    },

    /* * * Main Menu * * */

    /**
     * @description Set main sidebar view state
     */
    setIsMainMenuMinimized(isMinimized: boolean): boolean {
      console.log(isMinimized);
      this.mainMenu.isMinimized = isMinimized;
      return this.mainMenu.isMinimized;
    },

    /* * * Navigator * * */

    setNavigatorWidth(width: number): void {
      console.log("store width: ", width);
      this.navigator.boundings.width = width;
    },

    setIsHierarchyScrollToNoteEnabled(isEnabled: boolean): void {
      this.navigator.hierarchyMenu.isScrollToNoteEnabled = isEnabled;
    },

    /* * * Menu * * */

    seiIsPlacedNoteNextDuringCreation(isEnabled: boolean): void {
      this.editor.general.menu.isPlacedNoteNextDuringCreation = isEnabled;
    },

    setIsFocusedOnFirstNoteOnStart(isEnabled: boolean): void {
      this.editor.general.menu.isFocusedOnFirstNoteOnStart = isEnabled;
    },

    /* * * Tabbar * * */

    setIsFocusedOnNewTab(isEnabled: boolean): void {
      this.editor.general.tabbar.isFocusedOnNewTab = isEnabled;
    },

    /* * * Editor * * */

    setEditorGeneralContentMode(mode: any): void {
      this.editor.general.content.mode = mode;
    },

    setEditorGeneralContentFontSize(size: number): void {
      this.editor.general.content.font.size = size;
    },
  },
});
