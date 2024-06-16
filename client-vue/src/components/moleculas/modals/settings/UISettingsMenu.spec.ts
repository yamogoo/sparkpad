import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UISettingsMenu from "./UISettingsMenu.vue";

describe("UISettingsMenu", () => {
  test("should render SimpleMenu DOM element", () => {
    const wrapper = mount(UISettingsMenu);

    const menu = wrapper.find('[data-testid="simple-menu"]');
    const isMenuExists = menu.exists();

    expect(isMenuExists).toBe(true);
    expect(isMenuExists).toMatchSnapshot();
  });

  test("should render UserButton (CellButton) DOM element", () => {
    const wrapper = mount(UISettingsMenu);

    const userButton = wrapper.find('[data-testid="cell-button"]');
    const isUserButton = userButton.exists();

    expect(isUserButton).toBe(true);
    expect(isUserButton).toMatchSnapshot();
  });
});
