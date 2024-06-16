import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import UISettingsEditorPage from "./UISettingsEditorPage.vue";

const options = [
  ["place new note at the end", '[data-testid="place-note-next"]'],
  ["place new note at the end (Control)", '[data-testid="place-note-next"]'],

  ["open first note on startup", '[data-testid="open-first-on-startup"]'],
  [
    "open first note on startup (Control)",
    '[data-testid="open-first-on-startup-control"]',
  ],

  ["open new on creation", '[data-testid="open-new-on-creation"]'],
  [
    "open new on creation (Control)",
    '[data-testid="open-new-on-creation-control"]',
  ],
];

describe("UISettingsEditorPage", () => {
  test.each(options)('should render "%s" option', (_name, attr) => {
    const wrapper = mount(UISettingsEditorPage);

    const el = wrapper.find(attr);
    const isElExists = el.exists();

    expect(isElExists).toBe(true);
    expect(isElExists).toMatchSnapshot();
  });
});
