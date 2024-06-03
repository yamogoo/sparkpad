import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import { nextTick } from "vue";
import { createPinia, setActivePinia } from "pinia";

import UIRegisterPage from "./UIRegisterPage.vue";

const pinia = createPinia();

// vi.mock("vue-router");

describe("UIRegisterPage", () => {
  test("should render Register form", async () => {
    setActivePinia(pinia);

    const wrapper = mount(UIRegisterPage);

    await nextTick();

    const registerForm = wrapper.find('[data-test-id="register-form"]');
    const isRegisterFormExists = registerForm.exists();

    expect(isRegisterFormExists).toBe(true);
    expect(isRegisterFormExists).toMatchSnapshot();
  });
});
