import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import { Symbols } from "./Symbols";
import UIIcon from "./UIIcon.vue";

describe("UIIcon", () => {
  test('should render UIIcon nested component if the "name" prop is specified', async () => {
    const wrapper = mount(UIIcon, {
      props: {
        name: Symbols.CROSS,
      },
    });

    expect(wrapper.getComponent({ name: "UIIcon" }));

    await vi.dynamicImportSettled();

    const svg = wrapper.find("svg");
    const isSvgExists = svg.exists();

    expect(isSvgExists).toBe(true);
    expect(isSvgExists).toMatchSnapshot();
  });
});
