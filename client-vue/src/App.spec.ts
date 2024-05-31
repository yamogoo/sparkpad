import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { nextTick } from "vue";
import { createPinia, setActivePinia } from "pinia";

import { Themes, useConfigStore } from "./stores/config";
import App from "./App.vue";

const pinia = createPinia();

const THEME_PREFIX = "theme-";
const pattern = new RegExp(`^${THEME_PREFIX}`);

describe("App", () => {
  test("app container should contain a default theme name", () => {
    setActivePinia(pinia);

    const wrapper = mount(App);

    const classes = wrapper.find('[data-test-id="app-container"]').classes();

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
      setActivePinia(pinia);

      const wrapper = mount(App);

      const configStore = useConfigStore();
      configStore.setTheme(isLightTheme);

      await nextTick();

      const classes = wrapper.find('[data-test-id="app-container"]').classes();

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
