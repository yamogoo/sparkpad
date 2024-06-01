import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UIErrorMessage from "./UIErrorMessage.vue";

const DEFAULT_MESSAGE = "Error";

describe("UIErrorMessage", () => {
  test("should show default message value", () => {
    const wrapper = mount(UIErrorMessage);

    const message = wrapper.find('[data-test-id="error-message-title"]').text();

    expect(message).toBe(DEFAULT_MESSAGE);
    expect(message).toMatchSnapshot();
  });

  test("should render description", () => {
    const wrapper = mount(UIErrorMessage, {
      props: {
        description: "Error description",
      },
    });

    const description = wrapper.find(
      '[data-test-id="error-message-description"]'
    );

    const isDescriptionsExists = description.exists();

    expect(isDescriptionsExists).toBe(true);
    expect(isDescriptionsExists).toMatchSnapshot();
  });

  test("should not render description", () => {
    const wrapper = mount(UIErrorMessage);

    const description = wrapper.find(
      '[data-test-id="error-message-description"]'
    );

    const isDescriptionsExists = description.exists();

    expect(isDescriptionsExists).toBe(false);
    expect(isDescriptionsExists).toMatchSnapshot();
  });
});
