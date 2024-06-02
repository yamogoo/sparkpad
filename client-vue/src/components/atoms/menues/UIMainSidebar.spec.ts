import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UIMainSidebar from "./UIMainSidebar.vue";

describe("UIMainSidebar", () => {
  test("should render UserMenu", () => {
    const wrapper = mount(UIMainSidebar);

    const userMenu = wrapper.find('[data-test-id="user-menu"]');
    const isUserMenuExists = userMenu.exists();

    expect(isUserMenuExists).toBe(true);
    expect(isUserMenuExists).toMatchSnapshot();
  });
});
