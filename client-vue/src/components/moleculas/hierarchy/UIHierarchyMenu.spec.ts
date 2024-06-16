import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import { initRouter, router } from "@/router/mock";

import { type HierarchyNode, HierarchyNodeTypes } from "@/typings";

import UIHierarchyMenu from "./UIHierarchyMenu.vue";

const data: Array<HierarchyNode> = [
  {
    id: "0",
    parentId: null,
    type: HierarchyNodeTypes.DIR,
  },
  {
    id: "1",
    parentId: null,
    type: HierarchyNodeTypes.DIR,
  },
];

const nodesTree: Array<HierarchyNode> = [
  {
    id: "0",
    parentId: null,
    type: HierarchyNodeTypes.DIR,
  },
  {
    id: "1",
    parentId: "0",
    type: HierarchyNodeTypes.DIR,
  },
  {
    id: "2",
    parentId: "1",
    type: HierarchyNodeTypes.DIR,
  },
  {
    id: "3",
    parentId: "2",
    type: HierarchyNodeTypes.DIR,
  },
  {
    id: "4",
    parentId: "2",
    type: HierarchyNodeTypes.FILE,
  },
];

describe("UIHierarchyMenu", () => {
  initRouter();

  test("should render 2 items", () => {
    const wrapper = mount(UIHierarchyMenu, {
      props: {
        data,
        isScrollToNote: false,
      },
      global: {
        plugins: [router],
      },
    });

    const items = wrapper.findAll('[data-testid="hierarchy-item"]');
    const length = items.length;

    expect(length).toBe(data.length);
    expect(length).toMatchSnapshot();
  });

  test("should render tree of nodes", () => {
    const wrapper = mount(UIHierarchyMenu, {
      props: {
        data: nodesTree,
        isScrollToNote: false,
      },
      global: {
        plugins: [router],
      },
    });

    const items = wrapper.findAll('[data-testid="hierarchy-item"]');
    const length = items.length;

    expect(length).toBe(items.length);
    expect(length).toMatchSnapshot();
  });
});
