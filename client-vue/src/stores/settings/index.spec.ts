import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from "vitest";

import { useSettingsStore } from ".";

const pinia = createPinia();

describe("useSettingsStore", () => {
  setActivePinia(pinia);

  test('should toggle "is main menu minimized"', () => {
    const settingsStore = useSettingsStore();

    const isMainMenuMinimized = settingsStore.isMainMenuMinimized;
    const toggledIsMainMenuMinimized =
      settingsStore.setIsMainMenuMinimized(!isMainMenuMinimized);

    expect(toggledIsMainMenuMinimized).not.toEqual(isMainMenuMinimized);
    expect(toggledIsMainMenuMinimized).toMatchSnapshot();
  });
});
