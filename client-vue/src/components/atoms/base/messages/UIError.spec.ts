import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import { nextTick } from "vue";
import UIError from "./UIError.vue";

describe("UIError", () => {
  test("should show ErrorMessage component", async () => {
    const wrapper = mount(UIError);

    // after showMessage token:
    await nextTick();

    const errorMessage = wrapper.find(".error-message");
    const isErrorMessageExists = errorMessage.exists();

    expect(isErrorMessageExists).toBe(true);
    expect(isErrorMessageExists).toMatchSnapshot();
  });
});
