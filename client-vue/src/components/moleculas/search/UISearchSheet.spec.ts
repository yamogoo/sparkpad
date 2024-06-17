import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UISearchSheet from "./UISearchSheet.vue";

describe("UISearchSheet", () => {
  test("should render SearchList", () => {
    const wrapper = mount(UISearchSheet);
    const list = wrapper.find('[data-testid="search-list"]');

    expect(list.exists()).toBeTruthy();
    expect(list.exists()).toMatchSnapshot();
  });

  test("should render SearchPanel", () => {
    const wrapper = mount(UISearchSheet);
    const panel = wrapper.find('[data-testid="search-panel"]');

    expect(panel.exists()).toBeTruthy();
    expect(panel.exists()).toMatchSnapshot();
  });
});
