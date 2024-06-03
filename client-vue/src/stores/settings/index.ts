import { defineStore } from "pinia";
import type {
  SettingsEditorGenerallMenuNotesListModes,
  SettingsStoreState,
} from "./types";

export enum Themes {
  DARK = "dark",
  LIGHT = "light",
}

const defaults = {
  theme: localStorage.getItem("theme") ?? Themes.LIGHT,
};

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsStoreState => ({
    app: {
      themes: {
        themes: [Themes.LIGHT, Themes.DARK],
        current: defaults.theme,
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
    getTheme(state): { theme: string; id: number } {
      const id = this.app.themes.themes.findIndex(
        (el) => el === this.app.themes.current
      );
      return { theme: state.app.themes.current, id };
    },

    /* * * Menu * * */

    getIsPlacedNoteNextDuringCreation: (state): boolean => {
      return state.editor.general.menu.isPlacedNoteNextDuringCreation;
    },

    getIsFocusedOnFirstNoteOnStart: (state): boolean => {
      return state.editor.general.menu.isFocusedOnFirstNoteOnStart;
    },

    getIsNoteListMode: (state): boolean => {
      const mode = state.editor.general.menu.notesListMode.mode;
      return mode === "list";
    },

    /* * * Tabbar * * */

    getIsFocusedOnNewTab: (state): boolean => {
      return state.editor.general.tabbar.isFocusedOnNewTab;
    },

    getContentFontSizeSid: (state) => {
      const sizes = state.editor.general.content.font.sizes;
      const size = state.editor.general.content.font.size;

      return sizes.findIndex((s) => s === size);
    },
  },
  actions: {
    /* * * App * * */

    setTheme(state: boolean): void {
      const theme = this.app.themes.themes[Number(state)];
      this.app.themes.current = theme;
      localStorage.setItem("theme", theme);
    },

    /* * * Menu * * */
    // ++
    seiIsPlacedNoteNextDuringCreation(state: boolean): void {
      this.editor.general.menu.isPlacedNoteNextDuringCreation = state;
    },

    // ++
    setIsFocusedOnFirstNoteOnStart(state: boolean): void {
      this.editor.general.menu.isFocusedOnFirstNoteOnStart = state;
    },

    /* * * Tabbar * * */

    // --
    setIsFocusedOnNewTab(state: boolean): void {
      this.editor.general.tabbar.isFocusedOnNewTab = state;
    },

    /* * * Editor * * */

    // --
    setEditorGeneralContentMode(mode: any): void {
      this.editor.general.content.mode = mode;
    },

    // --
    setEditorGeneralContentFontSize(size: number): void {
      this.editor.general.content.font.size = size;
    },
  },
});
