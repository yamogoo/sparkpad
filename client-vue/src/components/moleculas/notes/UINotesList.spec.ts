import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import { createPinia, setActivePinia } from "pinia";

import UINotesList from "./UINotesList.vue";

const pinia = createPinia();

enum Emits {
  SELECT_NOTE = "select:note",
}

const notes: Array<any> = [
  {
    id: 1,
    name: "First Note",
  },
  {
    id: 1,
    name: "First Note",
  },
  {
    id: 1,
    name: "First Note",
  },
];

describe("UINotesList", () => {
  test(`should contain ${notes.length} items`, () => {
    setActivePinia(pinia);

    const wrapper = mount(UINotesList, {
      props: {
        sid: 0,
        notes,
      },
    });

    const items = wrapper.findAll('[data-test-id="notes-list-item"]');
    const length = items.length;

    expect(length).toBe(notes.length);
    expect(length).toMatchSnapshot();
  });

  test(`should emit "select:note" event`, async () => {
    const wrapper = mount(UINotesList, {
      props: {
        sid: 0,
        notes,
      },
    });

    const itemEls = wrapper.findAll('[data-test-id="notes-list-item"]');
    const itemEl = itemEls[0];

    await itemEl.trigger("click");

    expect(wrapper.emitted()).toHaveProperty(Emits.SELECT_NOTE);
    expect(wrapper.emitted(Emits.SELECT_NOTE)).toMatchSnapshot();
  });
});
