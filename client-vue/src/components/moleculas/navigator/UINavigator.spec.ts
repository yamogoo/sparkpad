import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

import { useNavigatorRouter, Routes } from "./navigatorRouter";
import { initRouter, router } from "@/router/mock";

import UINavigator from "./UINavigator.vue";

describe("UINavigator", () => {
  initRouter();

  test("should render UINavigator DOM element", async () => {
    const navigationRouter = useNavigatorRouter();
    navigationRouter.push({ path: Routes.SEARCH });

    const wrapper = mount(UINavigator, {
      global: {
        plugins: [router],
      },
    });

    await vi.dynamicImportSettled();

    const searchSheet = wrapper.find('[data-testid="search-panel"]');
    const isSearchSheetExists = searchSheet.exists();

    expect(isSearchSheetExists).toBe(true);
    expect(isSearchSheetExists).toMatchSnapshot();
  });

  test("should render UIHierarchyMenuControlBar DOM element", async () => {
    const navigationRouter = useNavigatorRouter();
    navigationRouter.push({ path: Routes.HIERARCHY_MENU });

    const wrapper = mount(UINavigator, {
      global: {
        plugins: [router],
      },
    });

    await vi.dynamicImportSettled();

    const hierarchySheet = wrapper.find('[data-teestid="hierarchy"]');
    const isHierarchySheetExists = hierarchySheet.exists();

    expect(isHierarchySheetExists).toBe(true);
    expect(isHierarchySheetExists).toMatchSnapshot();
  });
});
