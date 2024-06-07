import { describe, expect, test, vi } from "vitest";

import { type SimpleMenuItem } from "./UISimpleMenuItem.vue";
import { mount } from "@vue/test-utils";
import UISimpleMenu from "./UISimpleMenu.vue";

const routes: SimpleMenuItem[] = [
  {
    name: "First Item",
    path: "/first",
  },
  {
    name: "Second Item",
    path: "/second",
  },
];

vi.mock("vue-router");

describe("UISimpleMenu", () => {
  test.each([[routes]])("menu should have ", (items) => {
    const wrapper = mount(UISimpleMenu, {
      props: {
        sid: 0,
        items,
      },
      global: {
        mocks: {
          $router: { push: vi.fn() },
        },
      },
    });

    const menuItems = wrapper.findAll('[data-testid="simple-menu-item"]');
    const itemsLength = menuItems.length;

    expect(itemsLength).toBe(items.length);
    expect(itemsLength).toMatchSnapshot();
  });

  test.each(["<p>Slot Content</p>"])(
    "should render slot content (%s)",
    (slot) => {
      const wrapper = mount(UISimpleMenu, {
        props: {
          sid: 0,
          items: routes,
        },
        slots: {
          default: slot,
        },
        global: {
          mocks: {
            $router: { push: vi.fn() },
          },
        },
      });

      const menuItems = wrapper.findAll('[data-testid="simple-menu-item"]');
      const html = menuItems[0].html();

      expect(html).toContain(slot);
      expect(html).toMatchSnapshot();
    }
  );
});
