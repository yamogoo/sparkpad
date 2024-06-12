import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import UIMainHeader from "./UIMainHeader.vue";
import { createPinia, setActivePinia } from "pinia";

const pinia = createPinia();

vi.mock("vue-router");

describe("UIMainHeader", () => {
  setActivePinia(pinia);

  test("header should render logo", async () => {
    const wrapper = mount(UIMainHeader);

    await vi.dynamicImportSettled();

    const logo = wrapper.find('[data-testid="logo"]');
    const isLogoExists = logo.exists();

    expect(isLogoExists).toBe(true);
    expect(logo).toMatchSnapshot();
  });
});
