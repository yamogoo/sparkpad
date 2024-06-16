import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { nextTick } from "vue";

import { Themes, useSettingsStore } from "@/stores/settings";

import UIThemeProvider from "./UIThemeProvider.vue";

describe("UIThemeProvider", () => {
  test("should render theme name", () => {
    const wrapper = mount(UIThemeProvider);

    const themeLabel = wrapper.find('[data-testid="theme-label"]');

    expect(themeLabel.text()).toBe(Themes.DARK);
    expect(themeLabel.text()).toMatchSnapshot();
  });

  test.each([
    [Themes.LIGHT, false],
    [Themes.DARK, true],
  ])("should contain the %s theme", async (themeName, isLightTheme) => {
    const wrapper = mount(UIThemeProvider);

    const configStore = useSettingsStore();
    configStore.setAppTheme(isLightTheme);

    await nextTick();

    const themeLabel = wrapper.find('[data-testid="theme-label"]');
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
