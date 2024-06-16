import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import UIMainSidebar from "./UIMainSidebar.vue";

const components = [
  ["UserMenu", '[data-testid="user-menu"]'],
  ["Notes", '[data-testid="notes"]'],
];

describe("UIMainSidebar", () => {
  test.each(components)(
    "should render (%s) component",
    async (_name, component) => {
      const wrapper = mount(UIMainSidebar);

      await vi.dynamicImportSettled();

      const el = wrapper.find(component);
      const isElExists = el.exists();

      expect(isElExists).toBe(true);
      expect(isElExists).toMatchSnapshot();
    }
  );
});
