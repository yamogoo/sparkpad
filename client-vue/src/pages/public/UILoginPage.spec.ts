import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { nextTick } from "vue";

import UILoginPage from "./UILoginPage.vue";

describe("UILoginPage", () => {
  test("should render Login form", async () => {
    const wrapper = mount(UILoginPage);

    await nextTick();

    const loginForm = wrapper.find('[data-testid="login-form"]');
    const isLoginFormExists = loginForm.exists();

    expect(isLoginFormExists).toBe(true);
    expect(isLoginFormExists).toMatchSnapshot();
  });
});
