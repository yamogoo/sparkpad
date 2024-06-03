import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { createPinia, setActivePinia } from "pinia";

import UISettingsMenu from "./UISettingsMenu.vue";

const pinia = createPinia();

describe("UISettingsMenu", () => {
  setActivePinia(pinia);

  test("should render SimpleMenu DOM element", () => {
    const wrapper = mount(UISettingsMenu);

    const menu = wrapper.find('[data-test-id="simple-menu"]');
    const isMenuExists = menu.exists();

    expect(isMenuExists).toBe(true);
    expect(isMenuExists).toMatchSnapshot();
  });

  test("should render UserButton (CellButton) DOM element", () => {
    const wrapper = mount(UISettingsMenu);

    const userButton = wrapper.find('[data-test-id="cell-button"]');
    const isUserButton = userButton.exists();

    expect(isUserButton).toBe(true);
    expect(isUserButton).toMatchSnapshot();
  });
});
