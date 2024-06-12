import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from "vitest";
import { useSettingsStore } from ".";

const pinia = createPinia();
const settingsStore = useSettingsStore();

describe("useSettingsStore", () => {
  setActivePinia(pinia);

  test('should toggle "is main menu minimized"', () => {
    const isMainMenuMinimized = settingsStore.isMainMenuMinimized;
    const toggledIsMainMenuMinimized =
      settingsStore.setIsMainMenuMinimized(!isMainMenuMinimized);

    expect(toggledIsMainMenuMinimized).not.toEqual(isMainMenuMinimized);
  });
});
