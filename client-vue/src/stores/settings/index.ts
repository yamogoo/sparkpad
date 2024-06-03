import { defineStore } from "pinia";
import type { SettingsStoreState } from "./types";

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
        tabbar: {
          isFocusedOnFirstTabOnStart: true,
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

    getIsFocusedOnFirstTabOnStart: (state): boolean => {
      return state.editor.general.tabbar.isFocusedOnFirstTabOnStart;
    },

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

    /* * * Editor * * */

    setIsFocusedOnFirstTabOnStart(state: boolean): void {
      this.editor.general.tabbar.isFocusedOnFirstTabOnStart = state;
    },

    setIsFocusedOnNewTab(state: boolean): void {
      this.editor.general.tabbar.isFocusedOnNewTab = state;
    },

    setEditorGeneralContentMode(mode: any): void {
      this.editor.general.content.mode = mode;
    },

    setEditorGeneralContentFontSize(size: number): void {
      this.editor.general.content.font.size = size;
    },
  },
});
