import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { createPinia, setActivePinia } from "pinia";
import UIPublicLayout from "./UIPublicLayout.vue";

const pinia = createPinia();

describe("UIPublicLayout", () => {
  test("should render ThemeProvider", () => {
    setActivePinia(pinia);

    const wrapper = mount(UIPublicLayout);

    const themeProvider = wrapper.find('[data-test-id="theme-provider"]');
    const isThemeProviderExists = themeProvider.exists();

    expect(isThemeProviderExists).toBe(true);
    expect(isThemeProviderExists).toMatchSnapshot();
  });

  /* * * !!!TEST RouterView * * */
});
