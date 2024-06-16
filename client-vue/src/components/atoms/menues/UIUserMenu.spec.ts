import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import UIUserMenu from "./UIUserMenu.vue";

const components = [
  ["menu button", '[data-testid="menu-button"]'],
  ["user button", '[data-testid="user-button"]'],
  ["settings button", '[data-testid="settings-button"]'],
];

describe("UIMainSidebar", () => {
  test.each(components)(
    "should render (%s) component",
    async (_name, component) => {
      const wrapper = mount(UIUserMenu);

      await vi.dynamicImportSettled();

      const el = wrapper.find(component);
      const isElExists = el.exists();

      expect(isElExists).toBe(true);
      expect(isElExists).toMatchSnapshot();
    }
  );

  test('should open settings menu (modal) by clicking on "settings button"', async () => {
    const wrapper = mount(UIUserMenu);

    await vi.dynamicImportSettled();

    const settingsButton = wrapper.find('[data-testid="settings-button"]');
    await settingsButton.trigger("click");

    const settingsModalView = wrapper.find(
      '[data-testid="settings-modal-view"]'
    );
    const isSettingsModalViewExists = settingsModalView.exists();

    expect(isSettingsModalViewExists).toBe(true);
    expect(isSettingsModalViewExists).toMatchSnapshot();
  });
});
