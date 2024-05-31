import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { nextTick } from "vue";
import { createPinia, setActivePinia } from "pinia";

import UILoginPage from "./UILoginPage.vue";

const pinia = createPinia();

describe("UILoginPage", () => {
  test("should render Login form", async () => {
    setActivePinia(pinia);

    const wrapper = mount(UILoginPage);

    await nextTick();

    const loginForm = wrapper.find('[data-test-id="login-form"]');
    const isLoginFormExists = loginForm.exists();

    expect(isLoginFormExists).toBe(true);
    expect(isLoginFormExists).toMatchSnapshot();
  });
});