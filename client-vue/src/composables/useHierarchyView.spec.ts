import { describe, expect, test } from "vitest";
import type { HierarchyNode, HierarchyNodeTree } from "../typings";
import { HierarchyView } from "./useHierarchyView";

const dirs: Array<HierarchyNode> = [
  {
    id: "dir 1",
    parentId: "2",
  },
  {
    id: "dir 2",
    parentId: "1",
  },
];

const files: Array<HierarchyNode> = [
  {
    id: "file 1",
    parentId: null,
  },
  {
    id: "file 2",
    parentId: "dir 1",
  },
];

const result: HierarchyNodeTree = [
  {
    id: "file 1",
    parentId: null,
  },
  {
    children: [
      {
        id: "file 2",
        parentId: "dir 1",
      },
    ],
    id: "dir 1",
    parentId: "2",
  },
  {
    children: [],
    id: "dir 2",
    parentId: "1",
  },
];

describe("useHierarchyView", () => {
  test("should create tree of nodes (dirs and files)", () => {
    const tree = HierarchyView.createTree(dirs, files);

    expect(tree).toMatchObject(result);
    expect(tree).toMatchSnapshot();
  });
});
