import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import { Symbols } from "@/components/atoms/base/icons/Symbols";

import UIActionButton from "./UIActionButton.vue";

describe("UIActionButton", () => {
  test("should render an icon", async () => {
    const wrapper = mount(UIActionButton, {
      props: {
        iconName: Symbols.ARROW_RIGHT,
        isDisabled: true,
      },
    });

    await vi.dynamicImportSettled();

    const isIconExists = wrapper.find("svg").exists();

    expect(wrapper.getComponent({ name: "UISymbol" }));
    expect(isIconExists).toBe(true);
    expect(isIconExists).toMatchSnapshot();
  });

  test('should have the "disabled" class when button is inactive', () => {
    const wrapper = mount(UIActionButton, {
      props: {
        iconName: Symbols.ARROW_RIGHT,
        isDisabled: true,
      },
    });

    const className = wrapper.classes("disabled");

    expect(className).toBe(true);
    expect(className).toMatchSnapshot();
  });

  test('should emit "press" event when clicking on the root "button" DOM element', async () => {
    const wrapper = mount(UIActionButton, {
      props: {
        iconName: Symbols.ARROW_RIGHT,
        isDisabled: false,
      },
    });

    const button = wrapper.find('[data-test-id="action-button"]');

    await button.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("press");
    expect(wrapper.emitted("press")).toMatchSnapshot();
  });
});
