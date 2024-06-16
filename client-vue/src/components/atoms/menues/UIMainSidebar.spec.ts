import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import { initRouter, router } from "@/router/mock";

import UIMainSidebar from "./UIMainSidebar.vue";

const components = [
  ["UserMenu", '[data-testid="user-menu"]'],
  ["UINavigator", '[data-testid="navigator"]'],
];

describe("UIMainSidebar", () => {
  initRouter();

  test.each(components)(
    "should render (%s) component",
    async (_name, component) => {
      const wrapper = mount(UIMainSidebar, {
        global: {
          plugins: [router],
        },
      });

      await vi.dynamicImportSettled();

      const el = wrapper.find(component);
      const isElExists = el.exists();

      expect(isElExists).toBe(true);
      expect(isElExists).toMatchSnapshot();
    }
  );
});
