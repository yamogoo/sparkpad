import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import { createPinia, setActivePinia } from "pinia";

import UISettingsGeneralPage from "./UISettingsGeneralPage.vue";

const pinia = createPinia();

const options = [
  ["settings theme", '[data-test-id="settings-theme"]'],
  ["settings theme (Control)", '[data-test-id="settings-theme-control"]'],
];

describe("UISettingsGeneralPage", () => {
  test.each(options)('should render "%s" option', (_name, attr) => {
    setActivePinia(pinia);

    const wrapper = mount(UISettingsGeneralPage);

    const el = wrapper.find(attr);
    const isElExists = el.exists();

    expect(isElExists).toBe(true);
    expect(isElExists).toMatchSnapshot();
  });
});
