import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { nextTick } from "vue";
import { initRouter, router } from "@/router/mock";

import UIRegisterPage from "./UIRegisterPage.vue";

describe("UIRegisterPage", () => {
  initRouter();

  test("should render Register form", async () => {
    const wrapper = mount(UIRegisterPage, {
      global: {
        plugins: [router],
      },
    });

    await nextTick();

    const registerForm = wrapper.find('[data-testid="register-form"]');
    const isRegisterFormExists = registerForm.exists();

    expect(isRegisterFormExists).toBe(true);
    expect(isRegisterFormExists).toMatchSnapshot();
  });
});
