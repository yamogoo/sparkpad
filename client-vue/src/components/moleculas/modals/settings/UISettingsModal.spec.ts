import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UISettingsModal from "./UISettingsModal.vue";

describe("UISettingsModal", () => {
  test("should render SettingsMenu DOM element", () => {
    const wrapper = mount(UISettingsModal);

    const menu = wrapper.find('[data-testid="settings-menu"]');
    const isMenuExists = menu.exists();

    expect(isMenuExists).toBe(true);
    expect(isMenuExists).toMatchSnapshot();
  });

  // Test routes
});
