import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import { initRouter, router } from "@/router/mock";

import UIMainViewport from "./UIMainViewport.vue";

describe("UIMainViewport", () => {
  initRouter();

  test("should render tabbar", async () => {
    const wrapper = mount(UIMainViewport, {
      global: {
        plugins: [router],
      },
    });

    await vi.dynamicImportSettled();

    const tabbar = wrapper.find('[data-testid="main-viewport-tabbar"]');
    const isTabbarExists = tabbar.exists();

    expect(isTabbarExists).toBe(true);
    expect(isTabbarExists).toMatchSnapshot();
  });
});
