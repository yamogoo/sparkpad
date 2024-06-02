import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UIRangeSlider from "./UIRangeSlider.vue";

describe("UIRangeSlider", () => {
  test('should render the "rangebar" DOM element if showRangebar: true', () => {
    const wrapper = mount(UIRangeSlider, {
      props: {
        value: 0,
        max: 1,
        showRangebar: true,
      },
    });

    const rangebar = wrapper.find('[data-test-id="range-slider__rangebar"]');
    const isRangebarShow = rangebar.exists();

    expect(isRangebarShow).toBe(true);
    expect(isRangebarShow).toMatchSnapshot();
  });

  test.each([
    [0, 1, 0, 1],
    [0, 5, 0, 1],
    [3, 6, 0, 1],
  ])("should render min: %i, max: %i, step: %i", (min, max, step, value) => {
    const wrapper = mount(UIRangeSlider, {
      props: {
        min,
        max,
        value,
        step,
        showRangebar: true,
      },
    });

    const dots = wrapper.findAll('[data-test-id="range-slider__rangebar-dot"]');
    const length = dots.length;

    const expectedDotsCount = max - min;
    expect(length).toBe(expectedDotsCount);
    expect(dots.length).toMatchSnapshot();
  });
});
