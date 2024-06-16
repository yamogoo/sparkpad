import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { nextTick } from "vue";

import { Themes, useSettingsStore } from "@/stores/settings";
import { initRouter, router } from "@/router/mock";

import App from "./App.vue";

const THEME_PREFIX = "theme-";
const pattern = new RegExp(`^${THEME_PREFIX}`);

describe("App", () => {
  initRouter();

  test("app container should contain a default theme name", () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    const classes = wrapper.find('[data-testid="app-container"]').classes();

    const expectTheme = (theme: Themes) => {
      expect(theme).toBe(theme);
      expect(theme).toMatchSnapshot();
    };

    classes.forEach((className) => {
      if (pattern.test(className)) {
        const theme = className.replace(THEME_PREFIX, "");

        switch (theme) {
          case Themes.LIGHT:
            expectTheme(Themes.LIGHT);
            break;
          case Themes.DARK:
            expectTheme(Themes.DARK);
            break;
        }
      }
    });
  });

  test.each([
    [Themes.LIGHT, false],
    [Themes.DARK, true],
  ])(
    "app container should contain the %s theme",
    async (themeName, isLightTheme) => {
      const wrapper = mount(App, {
        global: {
          plugins: [router],
        },
      });

      const configStore = useSettingsStore();
      configStore.setAppTheme(isLightTheme);

      await nextTick();

      const classes = wrapper.find('[data-testid="app-container"]').classes();

      let theme;
      classes.forEach((className) => {
        if (pattern.test(className)) {
          theme = className.replace(THEME_PREFIX, "");
        }
      });

      expect(theme).toBe(themeName);
      expect(theme).toMatchSnapshot();
    }
  );
});
