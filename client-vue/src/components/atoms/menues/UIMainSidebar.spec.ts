import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import { createPinia, setActivePinia } from "pinia";

import UIMainSidebar from "./UIMainSidebar.vue";

const pinia = createPinia();

const components = [
  ["UserMenu", '[data-testid="user-menu"]'],
  ["Notes", '[data-testid="notes"]'],
];

describe("UIMainSidebar", () => {
  test.each(components)(
    "should render (%s) component",
    async (_name, component) => {
      setActivePinia(pinia);

      const wrapper = mount(UIMainSidebar);

      await vi.dynamicImportSettled();

      const el = wrapper.find(component);
      const isElExists = el.exists();

      expect(isElExists).toBe(true);
      expect(isElExists).toMatchSnapshot();
    }
  );
});
