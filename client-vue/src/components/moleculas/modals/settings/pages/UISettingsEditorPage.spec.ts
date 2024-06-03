import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import { createPinia, setActivePinia } from "pinia";

import UISettingsEditorPage from "./UISettingsEditorPage.vue";

const pinia = createPinia();

const options = [
  ["place new note at the end", '[data-test-id="place-note-next"]'],
  ["place new note at the end (Control)", '[data-test-id="place-note-next"]'],

  ["open first note on startup", '[data-test-id="open-first-on-startup"]'],
  [
    "open first note on startup (Control)",
    '[data-test-id="open-first-on-startup-control"]',
  ],

  ["open new on creation", '[data-test-id="open-new-on-creation"]'],
  [
    "open new on creation (Control)",
    '[data-test-id="open-new-on-creation-control"]',
  ],
];

describe("UISettingsEditorPage", () => {
  test.each(options)('should render "%s" option', (_name, attr) => {
    setActivePinia(pinia);

    const wrapper = mount(UISettingsEditorPage);

    const el = wrapper.find(attr);
    const isElExists = el.exists();

    expect(isElExists).toBe(true);
    expect(isElExists).toMatchSnapshot();
  });
});
