import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import { Symbols } from "./Symbols";
import UISymbol from "./UISymbol.vue";

describe("UISymbol", () => {
  test.each(Object.values(Symbols))(
    'should render %s icon from "Symbols" data set',
    async (iconName) => {
      const wrapper = mount(UISymbol, {
        props: {
          name: iconName,
        },
      });

      await vi.dynamicImportSettled();

      const res = wrapper.find("svg");
      expect(res.exists()).toBe(true);
      expect(res.exists()).toMatchSnapshot();
    }
  );

  test.each([16, 32, "100%"])(
    "icon should have a custom size = %s (with === height)",
    async (size) => {
      const wrapper = mount(UISymbol, {
        props: {
          name: Symbols.CROSS,
          width: `${size}`,
        },
      });

      await vi.dynamicImportSettled();

      const svg = wrapper.find("svg");
      const attrs = {
        width: svg.attributes("width"),
        height: svg.attributes("height"),
      };
      expect(attrs.width).toBe(String(size));
      expect(attrs.width).toBe(attrs.height);
      expect(attrs).toMatchSnapshot();
    }
  );
});
