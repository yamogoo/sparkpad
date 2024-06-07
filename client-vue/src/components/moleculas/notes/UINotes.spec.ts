import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { createPinia, setActivePinia } from "pinia";

import { nextTick } from "vue";
import UINotes from "./UINotes.vue";

const pinia = createPinia();

describe("UINotes", () => {
  test("should render UINotes DOM element", async () => {
    setActivePinia(pinia);

    const wrapper = mount(UINotes);

    await nextTick();

    const list = wrapper.find('[data-testid="notes-list"]');
    const isListExists = list.exists();

    expect(isListExists).toBe(true);
    expect(isListExists).toMatchSnapshot();
  });

  test("should render UINotesControlBar DOM element", async () => {
    setActivePinia(pinia);

    const wrapper = mount(UINotes);

    await nextTick();

    const controlBar = wrapper.find('[data-testid="notes-control-bar"]');
    const isControlBarExists = controlBar.exists();

    expect(isControlBarExists).toBe(true);
    expect(isControlBarExists).toMatchSnapshot();
  });
});
