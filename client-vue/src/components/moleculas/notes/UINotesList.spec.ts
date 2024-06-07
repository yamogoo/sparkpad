import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import { createPinia, setActivePinia } from "pinia";

import UINotesList from "./UINotesList.vue";

import { HierarchyTree } from "@/composables/useHierarchyTree";
import type { Notes } from "@/stores/notes";

const pinia = createPinia();

enum Emits {
  SELECT_NOTE = "select:note",
}

const data: Notes = [
  {
    id: 1,
    uid: "wedlkqwed",
    path: "0",
    name: "First Note",
    content: "",
  },
  {
    id: 2,
    uid: "dfedklfds",
    path: "2",
    name: "Second Note",
    content: "",
  },
  {
    id: 3,
    uid: "wekdjjow",
    path: "3",
    name: "Third Note",
    content: "",
  },
];

const notes = HierarchyTree.createHierarchyTree(data);

describe("UINotesList", () => {
  test(`should contain ${notes.length} items`, () => {
    setActivePinia(pinia);

    const wrapper = mount(UINotesList, {
      props: {
        sid: "0",
        notes,
      },
    });

    const items = wrapper.findAll('[data-testid="notes-list-item"]');
    const length = items.length;

    expect(length).toBe(notes.length);
    expect(length).toMatchSnapshot();
  });

  test(`should emit "select:note" event`, async () => {
    const wrapper = mount(UINotesList, {
      props: {
        sid: "0",
        notes,
      },
    });

    const itemEls = wrapper.findAll('[data-testid="notes-list-item"]');
    const itemEl = itemEls[0];

    await itemEl.trigger("click");

    expect(wrapper.emitted()).toHaveProperty(Emits.SELECT_NOTE);
    expect(wrapper.emitted(Emits.SELECT_NOTE)).toMatchSnapshot();
  });
});
