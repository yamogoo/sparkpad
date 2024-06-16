import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import { nextTick } from "vue";
import { initRouter, router } from "@/router/mock";

import UILoginForm from "./UILoginForm.vue";

describe("UILoginForm", () => {
  initRouter();

  test("should render Login form", async () => {
    const wrapper = mount(UILoginForm, {
      global: {
        plugins: [router],
      },
    });

    // after first tick (after isMounted token)
    await nextTick();

    const loginForm = wrapper.find('[data-testid="login-form"]');
    const isLoginFormExists = loginForm.exists();

    expect(isLoginFormExists).toBe(true);
    expect(isLoginFormExists).toMatchSnapshot();
  });
});
