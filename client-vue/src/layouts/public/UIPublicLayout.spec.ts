import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { h } from "vue";

import UIPublicLayout from "./UIPublicLayout.vue";

describe("UIPublicLayout", () => {
  test("should render ThemeProvider", () => {
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
