import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import { nextTick } from "vue";

import UIRegisterForm from "./UIRegisterForm.vue";

describe("UIRegisterForm", () => {
  test("should render Register form", async () => {
    const wrapper = mount(UIRegisterForm);

    // after first tick (after isMounted token)
    await nextTick();

    const registerForm = wrapper.find('[data-testid="register-form"]');
    const isRegisterFormExists = registerForm.exists();

    expect(isRegisterFormExists).toBe(true);
    expect(isRegisterFormExists).toMatchSnapshot();
  });
});
