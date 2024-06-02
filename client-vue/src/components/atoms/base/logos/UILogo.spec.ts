import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import { Symbols } from "@/components/atoms/base/icons/Symbols";
import UILogo from "./UILogo.vue";

describe("UILogo", () => {
  test("should render UIIcon nested component", async () => {
    const wrapper = mount(UILogo, {
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
