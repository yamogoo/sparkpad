import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import { nextTick } from "vue";
import { createPinia, setActivePinia } from "pinia";

import UIRegisterForm from "./UIRegisterForm.vue";

const pinia = createPinia();

vi.mock("vue-router");

describe("UIRegisterForm", () => {
  test("should render Register form", async () => {
    setActivePinia(pinia);

    const wrapper = mount(UIRegisterForm);

    // after first tick (after isMounted token)
    await nextTick();

    const registerForm = wrapper.find('[data-test-id="register-form"]');
    const isRegisterFormExists = registerForm.exists();

    expect(isRegisterFormExists).toBe(true);
    expect(isRegisterFormExists).toMatchSnapshot();
  });
});
