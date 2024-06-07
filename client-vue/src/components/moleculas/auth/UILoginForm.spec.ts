import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import { nextTick } from "vue";
import { createPinia, setActivePinia } from "pinia";

import UILoginForm from "./UILoginForm.vue";

const pinia = createPinia();

describe("UILoginForm", () => {
  test("should render Login form", async () => {
    setActivePinia(pinia);

    const wrapper = mount(UILoginForm);

    // after first tick (after isMounted token)
    await nextTick();

    const loginForm = wrapper.find('[data-testid="login-form"]');
    const isLoginFormExists = loginForm.exists();

    expect(isLoginFormExists).toBe(true);
    expect(isLoginFormExists).toMatchSnapshot();
  });
});
