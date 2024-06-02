import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UITabbar from "./UITabbar.vue";

describe("UITabbar", () => {
  const items = [
    { name: "First Item", path: "/first" },
    { name: "Second Item", path: "/second" },
  ];

  const wrapper = mount(UITabbar, {
    props: { items },
  });

  test("should render name", () => {
    const itemEls = wrapper.findAll('[data-test-id="tabbar-item"]');
    const length = itemEls.length;

    expect(length).toBe(items.length);
    expect(items.length).toMatchSnapshot();
  });

  test("should render name", () => {
    const itemEls = wrapper.findAll('[data-test-id="tabbar-item"]');

    itemEls.forEach((el, idx) => {
      const text = el.text();

      expect(text).toContain(items[idx].name);
      expect(text).toMatchSnapshot();
    });
  });

  test("should emit 'open' event", () => {
    const itemEls = wrapper.findAll('[data-test-id="tabbar-item"]');

    itemEls.forEach((el) => {
      el.trigger("click");

      expect(wrapper.emitted()).toHaveProperty("open");
      expect(wrapper.emitted("open")).toMatchSnapshot();
    });
  });
});
