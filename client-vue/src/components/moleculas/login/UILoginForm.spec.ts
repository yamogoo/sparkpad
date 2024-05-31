import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import { nextTick } from "vue";

import UILoginForm from "./UILoginForm.vue";

describe("UILoginForm", () => {
  test("should render Login form", async () => {
    const wrapper = mount(UILoginForm);

    // after first tick (after isMounted token)
    await nextTick();

    const loginForm = wrapper.find('[data-test-id="login-form"]');
    const isLoginFormExists = loginForm.exists();

    expect(isLoginFormExists).toBe(true);
    expect(isLoginFormExists).toMatchSnapshot();
  });
});
