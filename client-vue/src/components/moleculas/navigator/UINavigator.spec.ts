import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { nextTick } from "vue";
import UINavigator from "./UINavigator.vue";

describe("UINavigator", () => {
  test("should render UINavigator DOM element", async () => {
    const wrapper = mount(UINavigator);

    await nextTick();

    const list = wrapper.find('[data-testid="hierarhy-list"]');
    const isListExists = list.exists();

    expect(isListExists).toBe(true);
    expect(isListExists).toMatchSnapshot();
  });

  test("should render UIHierarchyMenuControlBar DOM element", async () => {
    const wrapper = mount(UINavigator);

    await nextTick();

    const controlBar = wrapper.find('[data-testid="hierarhy-control-bar"]');
    const isControlBarExists = controlBar.exists();

    expect(isControlBarExists).toBe(true);
    expect(isControlBarExists).toMatchSnapshot();
  });
});
