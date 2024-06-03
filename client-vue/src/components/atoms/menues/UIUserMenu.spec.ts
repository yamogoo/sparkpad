import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import { createPinia, setActivePinia } from "pinia";

import UIUserMenu from "./UIUserMenu.vue";

const pinia = createPinia();

const components = [
  ["menu button", '[data-test-id="menu-button"]'],
  ["user button", '[data-test-id="user-button"]'],
  ["settings button", '[data-test-id="settings-button"]'],
];

describe("UIMainSidebar", () => {
  test.each(components)(
    "should render (%s) component",
    async (_name, component) => {
      setActivePinia(pinia);

      const wrapper = mount(UIUserMenu);

      await vi.dynamicImportSettled();

      const el = wrapper.find(component);
      const isElExists = el.exists();

      expect(isElExists).toBe(true);
      expect(isElExists).toMatchSnapshot();
    }
  );

  test('should open settings menu (modal) by clicking on "settings button"', async () => {
    setActivePinia(pinia);

    const wrapper = mount(UIUserMenu);

    await vi.dynamicImportSettled();

    const settingsButton = wrapper.find('[data-test-id="settings-button"]');
    await settingsButton.trigger("click");

    const settingsModalView = wrapper.find(
      '[data-test-id="settings-modal-view"]'
    );
    const isSettingsModalViewExists = settingsModalView.exists();

    expect(isSettingsModalViewExists).toBe(true);
    expect(isSettingsModalViewExists).toMatchSnapshot();
  });
});
