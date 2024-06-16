import { DOMWrapper, mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import UISearchPanel from "./UISearchPanel.vue";
import { nextTick } from "vue";

describe("UISearchPanel", () => {
  test('should emit "search" event', () => {
    const wrapper = mount(UISearchPanel);

    const input: DOMWrapper<HTMLInputElement> = wrapper.find(
      '[data-testid="search-panel-input"]'
    );

    if (input) input.trigger("input");

    expect(wrapper.emitted()).toHaveProperty("search");
    expect(wrapper.emitted("search")).toMatchSnapshot();
  });

  test("should render search icon", async () => {
    const wrapper = mount(UISearchPanel);

    await vi.dynamicImportSettled();

    const searchIcon = wrapper.find('[data-test="SearchIcon"]');
    const isSearchIconExists = searchIcon.exists();

    expect(isSearchIconExists).toBe(true);
    expect(isSearchIconExists).toMatchSnapshot();
  });

  test("should render clear button", async () => {
    const wrapper = mount(UISearchPanel);

    await vi.dynamicImportSettled();

    const input: DOMWrapper<HTMLInputElement> = wrapper.find(
      '[data-testid="search-panel-input"]'
    );

    if (input) {
      input.element.value = "value";
      await input.trigger("input");
    }

    const clearButton = wrapper.find(
      '[data-testid="search-panel-clear-button"]'
    );
    const isClearButtonExists = clearButton.exists();

    expect(isClearButtonExists).toBe(true);
    expect(isClearButtonExists).toMatchSnapshot();
  });

  test('should have "focused" class name', async () => {
    const wrapper = mount(UISearchPanel);

    const serachPanel = wrapper.find('[data-testid="search-panel"]');
    await serachPanel.trigger("pointerdown");

    expect(serachPanel.classes("focused"));
    expect(serachPanel.classes()).toMatchSnapshot();
  });
});
