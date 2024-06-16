import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import UISettingsGeneralPage from "./UISettingsGeneralPage.vue";

const options = [
  ["settings theme", '[data-testid="settings-theme"]'],
  ["settings theme (Control)", '[data-testid="settings-theme-control"]'],
];

describe("UISettingsGeneralPage", () => {
  test.each(options)('should render "%s" option', (_name, attr) => {
    const wrapper = mount(UISettingsGeneralPage);

    const el = wrapper.find(attr);
    const isElExists = el.exists();

    expect(isElExists).toBe(true);
    expect(isElExists).toMatchSnapshot();
  });
});
