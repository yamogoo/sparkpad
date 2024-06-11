import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import UISimpleMenuItem from "./UISimpleMenuItem.vue";

describe("UISimpleMenuItem", () => {
  test("should render chevron icon", async () => {
    const wrapper = mount(UISimpleMenuItem, {
      props: {
        id: 0,
        isActive: true,
      },
    });

    await vi.dynamicImportSettled();

    const svg = wrapper.find("svg");
    const isSvgExists = svg.exists();

    expect(isSvgExists).toBe(true);
    expect(svg).toMatchSnapshot();
  });

  test.fails("should not render chevron icon", async () => {
    const wrapper = mount(UISimpleMenuItem, {
      props: {
        id: 0,
        isActive: false,
      },
    });

    await vi.dynamicImportSettled();

    const svg = wrapper.find("svg");
    const isSvgExists = svg.exists();

    expect(isSvgExists).toBe(true);
  });

  test("should have the 'active' class", () => {
    const wrapper = mount(UISimpleMenuItem, {
      props: { id: 0, isActive: true },
    });

    const classes = wrapper.find('[data-testid="simple-menu-item"]').classes();

    expect(classes).toContain("active");
    expect(classes).toMatchSnapshot();
  });

  test("should not have an 'active' class", () => {
    const wrapper = mount(UISimpleMenuItem, {
      props: { id: 0, isActive: false },
    });

    const el = wrapper.find('[data-testid="simple-menu-item"]');
    const isActive = el.classes("active");

    expect(isActive).toBe(false);
    expect(isActive).toMatchSnapshot();
  });

  test('should emit "open" event', async () => {
    const wrapper = mount(UISimpleMenuItem, {
      props: { id: 0, isActive: false },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("open");
    expect(wrapper.emitted("open")).toMatchSnapshot();
  });

  test.each(['<p data-testid="slot">Slot Content</p>'])(
    "should render slot (%s)",
    (slot) => {
      const wrapper = mount(UISimpleMenuItem, {
        props: { id: 0, isActive: false },
        slots: { default: slot },
      });

      const el = wrapper.find('[data-testid="slot"]');
      const html = el.html();

      expect(html).toContain(slot);
      expect(html).toMatchSnapshot();
    }
  );
});
