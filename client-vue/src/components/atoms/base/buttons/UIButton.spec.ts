import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UIButton from "./UIButton.vue";
import { Symbols } from "@/components/atoms/base/icons/Symbols";

describe("UIButton", () => {
  test('should have the "disabled" class when button is inactive', () => {
    const wrapper = mount(UIButton, {
      props: {
        isDisabled: true,
      },
    });

    const className = wrapper.classes("disabled");

    expect(className).toBe(true);
    expect(className).toMatchSnapshot();
  });

  test('should have [aria-label] attr with "label" value', () => {
    const LABEL = "Button Label";

    const wrapper = mount(UIButton, {
      props: {
        label: LABEL,
      },
    });

    const areaLabel = wrapper.attributes("aria-label");

    expect(areaLabel).toBe(LABEL);
    expect(areaLabel).toMatchSnapshot();
  });

  test('should emit "press" event when clicking on the root "button" DOM element', () => {
    const wrapper = mount(UIButton, {
      props: {
        iconName: Symbols.ARROW_RIGHT,
        isDisabled: false,
      },
    });

    wrapper.find(".button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("press");
    expect(wrapper.emitted("press"));
  });
});
