import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import UILoginSocial from "./UILoginSocial.vue";

describe("UILoginSocial", () => {
  test(`should render 2 buttons by default`, async () => {
    const wrapper = mount(UILoginSocial);

    await vi.dynamicImportSettled();

    const buttons = wrapper.findAll('[data-testid="form-social-button"]');
    const length = buttons.length;

    expect(length).toBe(2);
    expect(length).toMatchSnapshot();
  });
});
