import { mount, shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UIMainViewport from "./UIMainViewport.vue";

describe("UIMainViewport", () => {
  test("should render tabbar", () => {
    const wrapper = shallowMount(UIMainViewport);

    const tabbar = wrapper.find('[data-testid="main-viewport-tabbar"]');
    const isTabbarExists = tabbar.exists();

    expect(isTabbarExists).toBe(true);
    expect(isTabbarExists).toMatchSnapshot();
  });

  test("should render editor", () => {
    const wrapper = mount(UIMainViewport);

    const tabbar = wrapper.find('[data-testid="mdx-editor"]');
    const isTabbarExists = tabbar.exists();

    expect(isTabbarExists).toBe(true);
    expect(isTabbarExists).toMatchSnapshot();
  });
});
