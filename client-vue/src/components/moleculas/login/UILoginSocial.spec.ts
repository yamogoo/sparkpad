import { describe, expect, test, vi } from "vitest";

import UILoginSocial from "./UILoginSocial.vue";
import { mount } from "@vue/test-utils";

describe("UILoginSocial", () => {
  test(`should render 2 buttons by default`, async () => {
    const wrapper = mount(UILoginSocial);

    await vi.dynamicImportSettled();

    const buttons = wrapper.findAll('[data-test-id="form-social-button"]');
    const length = buttons.length;

    expect(length).toBe(2);
    expect(length).toMatchSnapshot();
  });
});
