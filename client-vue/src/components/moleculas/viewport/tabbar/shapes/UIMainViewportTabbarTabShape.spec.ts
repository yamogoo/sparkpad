import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UIMainViewportTabbarTabShape from "./UIMainViewportTabbarTabShape.vue";

describe("UIMainViewportTabbarTabShape", () => {
  test("should render side shapes", () => {
    const wrapper = mount(UIMainViewportTabbarTabShape);

    const shapes = wrapper.findAll('[data-testid="tabbar-tab-shape-side"]');
    const length = shapes.length;

    expect(length).toBe(2);
    expect(length).toMatchSnapshot();
  });

  test.each([`<p data-testid="slot">Slot Content</p>`])(
    "should render slot (%s)",
    (slot) => {
      const wrapper = mount(UIMainViewportTabbarTabShape, {
        slots: {
          default: slot,
        },
      });

      const el = wrapper.find('[data-testid="slot"]');
      const html = el.html();

      expect(html).toContain(slot);
      expect(html).toMatchSnapshot();
    }
  );
});
