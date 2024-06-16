import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { initRouter, router } from "@/router/mock";

import UIPublicLayout from "./UIPublicLayout.vue";

describe("UIPublicLayout", () => {
  initRouter();

  test("should render ThemeProvider", () => {
    const wrapper = mount(UIPublicLayout, {
      global: {
        plugins: [router],
      },
    });

    const themeProvider = wrapper.find('[data-testid="theme-provider"]');
    const isThemeProviderExists = themeProvider.exists();

    expect(isThemeProviderExists).toBe(true);
    expect(isThemeProviderExists).toMatchSnapshot();
  });

  /* * * !!!TEST RouterView * * */
});
