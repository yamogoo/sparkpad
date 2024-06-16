import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import { initRouter, router } from "@/router/mock";

import UIMainHeader from "./UIMainHeader.vue";

describe("UIMainHeader", () => {
  initRouter();
  test("header should render logo", async () => {
    const wrapper = mount(UIMainHeader, {
      global: {
        plugins: [router],
      },
    });

    await vi.dynamicImportSettled();

    const logo = wrapper.find('[data-testid="logo"]');
    const isLogoExists = logo.exists();

    expect(isLogoExists).toBe(true);
    expect(logo).toMatchSnapshot();
  });
});
