import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { nextTick } from "vue";

import UIRegisterPage from "./UIRegisterPage.vue";

describe("UIRegisterPage", () => {
  test("should render Register form", async () => {
    const wrapper = mount(UIRegisterPage);

    await nextTick();

    const registerForm = wrapper.find('[data-testid="register-form"]');
    const isRegisterFormExists = registerForm.exists();

    expect(isRegisterFormExists).toBe(true);
    expect(isRegisterFormExists).toMatchSnapshot();
  });
});
