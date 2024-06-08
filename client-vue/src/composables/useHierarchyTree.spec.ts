import { describe, expect, test } from "vitest";

import { HierarchyNodeTypes, type HierarchyRootNode } from "@/typings";

import { HierarchyTree } from "./useHierarchyTree";

interface SomeData {
  id: string;
  path: string;
}

const data: Array<SomeData> = [
  {
    id: "qwdefw23e23edwdewded",
    path: "0",
  },
  {
    id: "wedlkpow23ioedjlkwed",
    path: "0/0",
  },
  {
    id: "deewdewdqwedewewdwed",
    path: "0/0/0",
  },
  {
    id: "ewdwer24rfwrewdqw",
    path: "0/0/0/0",
  },
];

const result: HierarchyRootNode<SomeData> = [
  {
    data: {
      id: "qwdefw23e23edwdewded",
      path: "0",
    },
    children: [
      {
        data: {
          id: "wedlkpow23ioedjlkwed",
          path: "0/0",
        },
        children: [
          {
            data: {
              id: "deewdewdqwedewewdwed",
              path: "0/0/0",
            },
            children: [
              {
                data: {
                  id: "ewdwer24rfwrewdqw",
                  path: "0/0/0/0",
                },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const nodeTypes: [string, HierarchyNodeTypes][] = [
  ["0/0/0", HierarchyNodeTypes.FILE],
  ["0/0/0/", HierarchyNodeTypes.DIR],
];

describe("hierarchyTree", () => {
  describe("HierarchyTree", () => {
    describe("createHierarchyTree", () => {
      test("should create tree of nodes", () => {
        const root = HierarchyTree.createHierarchyTree<SomeData>(data);

        expect(root).toMatchObject(result);
        expect(root).toMatchSnapshot();
      });
    });

    // describe("checkType", () => {
    //   test.each(nodeTypes)("should return %s type", (path, result) => {
    //     const type = HierarchyTree.checkType(path);

    //     expect(type).toBe(result);
    //     expect(type).toMatchSnapshot();
    //   });
    // });
  });
});
