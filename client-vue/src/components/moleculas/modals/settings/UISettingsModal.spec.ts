import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { createPinia, setActivePinia } from "pinia";

import UISettingsModal from "./UISettingsModal.vue";

const pinia = createPinia();

describe("UISettingsModal", () => {
  test("should render SettingsMenu DOM element", () => {
    setActivePinia(pinia);

    const wrapper = mount(UISettingsModal);

    const menu = wrapper.find('[data-testid="settings-menu"]');
    const isMenuExists = menu.exists();

    expect(isMenuExists).toBe(true);
    expect(isMenuExists).toMatchSnapshot();
  });

  // Test routes
});
