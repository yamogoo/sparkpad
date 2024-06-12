import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import { createPinia, setActivePinia } from "pinia";

import UIMainViewport from "./UIMainViewport.vue";

const pinia = createPinia();
vi.mock("vue-router");

describe("UIMainViewport", () => {
  setActivePinia(pinia);

  test("should render tabbar", () => {
    const wrapper = mount(UIMainViewport);

    const tabbar = wrapper.find('[data-testid="main-viewport-tabbar"]');
    const isTabbarExists = tabbar.exists();

    expect(isTabbarExists).toBe(true);
    expect(isTabbarExists).toMatchSnapshot();
  });

  setActivePinia(pinia);

  test("should render editor", () => {
    const wrapper = mount(UIMainViewport, {
      global: {
        mocks: { $router: { push: vi.fn(), beforeEach: vi.fn() } },
      },
    });

    const tabbar = wrapper.find('[data-testid="mdx-editor"]');
    const isTabbarExists = tabbar.exists();

    expect(isTabbarExists).toBe(true);
    expect(isTabbarExists).toMatchSnapshot();
  });
});
