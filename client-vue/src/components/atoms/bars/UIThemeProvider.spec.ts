import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { createPinia, setActivePinia } from "pinia";

import { Themes, useConfigStore } from "@/stores/config";

import UIThemeProvider from "./UIThemeProvider.vue";
import { nextTick } from "vue";

const pinia = createPinia();

const THEME_PREFIX = "theme-";
const pattern = new RegExp(`^${THEME_PREFIX}`);

describe("UIThemeProvider", () => {
  test("should render theme name", () => {
    setActivePinia(pinia);

    const wrapper = mount(UIThemeProvider);

    const themeLabel = wrapper.find('[data-test-id="theme-label"]');

    expect(themeLabel.text()).toBe(Themes.LIGHT);
    expect(themeLabel.text()).toMatchSnapshot();
  });

  test.each([
    [Themes.LIGHT, false],
    [Themes.DARK, true],
  ])("should contain the %s theme", async (themeName, isLightTheme) => {
    setActivePinia(pinia);

    const wrapper = mount(UIThemeProvider);

    const configStore = useConfigStore();
    configStore.setTheme(isLightTheme);

    await nextTick();

    const themeLabel = wrapper.find('[data-test-id="theme-label"]');
    const theme = themeLabel.text();

    expect(theme).toBe(themeName);
    expect(theme).toMatchSnapshot();
  });

  test("should render switch", async () => {
    const wrapper = mount(UIThemeProvider);

    const switchEl = wrapper.find(".switch");
    const isSwitchExists = switchEl.exists();

    expect(isSwitchExists).toBe(true);
    expect(isSwitchExists).toMatchSnapshot();
  });
});
