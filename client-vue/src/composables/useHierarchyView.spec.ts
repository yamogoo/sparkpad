import { describe, expect, test } from "vitest";
import {
  HierarchyNodeTypes,
  type HierarchyNode,
  type HierarchyNodeTree,
} from "../typings";
import { HierarchyView } from "./useHierarchyView";

const dirs: Array<HierarchyNode> = [
  {
    id: "dir 1",
    parentId: "2",
    type: HierarchyNodeTypes.DIR,
  },
  {
    id: "dir 2",
    parentId: "1",
    type: HierarchyNodeTypes.DIR,
  },
];

const files: Array<HierarchyNode> = [
  {
    id: "file 1",
    parentId: null,
    type: HierarchyNodeTypes.FILE,
  },
  {
    id: "file 2",
    parentId: "dir 1",
    type: HierarchyNodeTypes.FILE,
  },
];

const result: HierarchyNodeTree = [
  {
    id: "file 1",
    parentId: null,
    type: HierarchyNodeTypes.FILE,
  },
  {
    children: [
      {
        id: "file 2",
        parentId: "dir 1",
        type: HierarchyNodeTypes.FILE,
      },
    ],
    id: "dir 1",
    parentId: "2",
    type: HierarchyNodeTypes.DIR,
  },
  {
    children: [],
    id: "dir 2",
    parentId: "1",
    type: HierarchyNodeTypes.DIR,
  },
];

describe("useHierarchyView", () => {
  test("should create tree of nodes (dirs and files)", () => {
    const tree = HierarchyView.createTree(dirs, files);

    expect(tree).toMatchObject(result);
    expect(tree).toMatchSnapshot();
  });
});
