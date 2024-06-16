import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import { initRouter, router } from "@/router/mock";

import UIPrivateLayout from "./UIPrivateLayout.vue";

describe("UIPrivateLayout", () => {
  initRouter();

  test("should render MainHeader", async () => {
    const wrapper = mount(UIPrivateLayout, {
      global: {
        plugins: [router],
      },
    });

    await vi.dynamicImportSettled();

    const header = wrapper.find('[data-testid="main-header"]');
    const isHeaderExists = header.exists();

    expect(isHeaderExists).toBe(true);
    expect(isHeaderExists).toMatchSnapshot();
  });

  test("should render MainFooter", () => {
    const wrapper = mount(UIPrivateLayout, {
      global: {
        plugins: [router],
      },
    });

    const footer = wrapper.find('[data-testid="main-footer"]');
    const isFooterExists = footer.exists();

    expect(isFooterExists).toBe(true);
    expect(isFooterExists).toMatchSnapshot();
  });

  /* * * !!!TEST RouterView * * */
});
