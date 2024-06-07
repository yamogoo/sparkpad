import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import { h } from "vue";

import { createPinia, setActivePinia } from "pinia";

import UIPublicLayout from "./UIPublicLayout.vue";

const pinia = createPinia();

vi.mock("vue-router");

describe("UIPublicLayout", () => {
  test("should render ThemeProvider", () => {
    setActivePinia(pinia);

    const wrapper = mount(UIPublicLayout, {
      global: {
        components: { RouterView: h("div") },
      },
    });

    const themeProvider = wrapper.find('[data-testid="theme-provider"]');
    const isThemeProviderExists = themeProvider.exists();

    expect(isThemeProviderExists).toBe(true);
    expect(isThemeProviderExists).toMatchSnapshot();
  });

  /* * * !!!TEST RouterView * * */
});
