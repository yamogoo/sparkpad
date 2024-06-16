import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import { HierarchyNodeTypes, type Note } from "@/typings";

import UISearchList from "./UISearchList.vue";

const data: Array<Note> = [
  {
    id: "0",
    parentId: null,
    title: "",
    content: "",
  },
  {
    id: "1",
    parentId: "0",
    title: "",
    content: "",
  },
  {
    id: "2",
    parentId: "1",
    title: "",
    content: "",
  },
  {
    id: "3",
    parentId: "2",
    title: "",
    content: "",
  },
  {
    id: "4",
    parentId: "2",
    title: "",
    content: "",
  },
];

describe("UISearchList", () => {
  test("should render items", () => {
    const wrapper = mount(UISearchList, {
      props: { data },
    });

    const items = wrapper.findAll('[data-testid="hierarchy-item"]');
    const length = items.length;

    expect(length).toBe(data.length);
    expect(length).toMatchSnapshot();
  });

  test("should render node icon", () => {
    const wrapper = mount(UISearchList, {
      props: { data },
    });

    const nodeIcon = wrapper.findAll(
      '[data-testid="hierarchy-item-node-icon"]'
    )[0];
    const isNodeIconExists = nodeIcon.exists();

    expect(isNodeIconExists).toBe(true);
    expect(isNodeIconExists).toMatchSnapshot();
  });
});
