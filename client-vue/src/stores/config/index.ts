import { defineStore } from "pinia";

enum Themes {
  DARK = "dark",
  LIGHT = "light",
}

interface ConfigStoreThemes {
  themes: Array<string>;
  current: string;
}

interface ConfigStoreState {
  themes: ConfigStoreThemes;
}

const defaults = {
  theme: localStorage.getItem("theme") ?? Themes.LIGHT,
};

export const useConfigStore = defineStore("config", {
  state: (): ConfigStoreState => ({
    themes: {
      themes: [Themes.DARK, Themes.LIGHT],
      current: defaults.theme,
    },
  }),
  getters: {
    getTheme(state): { theme: string; id: number } {
      const id = this.themes.themes.findIndex(
        (el) => el === this.themes.current
      );
      return { theme: state.themes.current, id };
    },
  },
  actions: {
    setTheme(state: boolean): void {
      const theme = this.themes.themes[Number(state)];
      this.themes.current = theme;
      localStorage.setItem("theme", theme);
    },
  },
});
