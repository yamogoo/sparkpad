import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import { createPinia, setActivePinia } from "pinia";

import UIMainSidebar from "./UIMainSidebar.vue";

const pinia = createPinia();

describe("UIMainSidebar", () => {
  test("should render UserMenu", async () => {
    setActivePinia(pinia);

    const wrapper = mount(UIMainSidebar);

    await vi.dynamicImportSettled();

    const userMenu = wrapper.find('[data-test-id="user-menu"]');
    const isUserMenuExists = userMenu.exists();

    expect(isUserMenuExists).toBe(true);
    expect(isUserMenuExists).toMatchSnapshot();
  });
});
