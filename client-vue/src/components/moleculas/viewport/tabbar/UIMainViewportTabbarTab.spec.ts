import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { nextTick } from "vue";

import UIMainViewportTabbarTab from "./UIMainViewportTabbarTab.vue";

describe("UIMainViewportTabbarTab", () => {
  describe("events", () => {
    test('should emit "open" event', async () => {
      const wrapper = mount(UIMainViewportTabbarTab, {
        props: {
          id: 0,
        },
      });

      await wrapper.trigger("pointerdown");

      expect(wrapper.emitted()).toHaveProperty("open");
      expect(wrapper.emitted("open")).toMatchSnapshot();
    });

    test('should emit "close" event', async () => {
      const wrapper = mount(UIMainViewportTabbarTab, {
        props: {
          id: 0,
          isActive: true,
        },
      });

      const button = wrapper.find('[data-testid="tabbar-tab-close-button"]');
      await button.trigger("click");

      expect(wrapper.emitted()).toHaveProperty("close");
      expect(wrapper.emitted("close")).toMatchSnapshot();
    });
  });

  describe("close button", async () => {
    const wrapper = mount(UIMainViewportTabbarTab, {
      props: {
        id: 0,
        isActive: true,
      },
    });

    test("should render close button", () => {
      const button = wrapper.find('[data-testid="tabbar-tab-close-button"]');
      const isButtonExists = button.exists();

      expect(isButtonExists).toBe(true);
      expect(isButtonExists).toMatchSnapshot();
    });

    test("should note render close button", async () => {
      wrapper.setProps({ isActive: false });
      await nextTick();
      const button = wrapper.find('[data-testid="tabbar-tab-close-button"]');
      const isButtonExists = button.exists();

      expect(isButtonExists).toBe(false);
      expect(isButtonExists).toMatchSnapshot();
    });
  });

  describe("classes", () => {
    const wrapper = mount(UIMainViewportTabbarTab, {
      props: {
        id: 0,
        isActive: true,
      },
    });

    test('should have "active class"', () => {
      const el = wrapper.find('[data-testid="tabbar-tab"]');
      expect(el.classes("active")).toBe(true);
      expect(el.classes()).toMatchSnapshot();
    });

    test('should not have "active class"', async () => {
      wrapper.setProps({ isActive: false });
      await nextTick();

      const el = wrapper.find('[data-testid="tabbar-tab"]');
      expect(el.classes("active")).toBe(false);
      expect(el.classes()).toMatchSnapshot();
    });
  });
});
