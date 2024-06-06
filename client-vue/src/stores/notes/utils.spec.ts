import { describe, expect, test } from "vitest";

import { createHierarchyTree, type HierarchyRootNode } from "./utils";

interface SomeData {
  id: string;
  path: string;
  [key: string]: any;
}

const data: Array<SomeData> = [
  {
    id: "qwdefw23e23edwdewded",
    content: "some Content",
    path: "0",
  },
  {
    id: "wedlkpow23ioedjlkwed",
    path: "2",
  },
  // {
  //   id: "deewdewdqwedewewdwed",
  //   path: "0/0/0",
  // },
  // {
  //   id: "ewdwer24rfwrewdqw",
  //   path: "0/0/0/0",
  // },
];

// const result: HierarchyRootNode<SomeData> = [
//   {
//     data: {
//       id: "qwdefw23e23edwdewded",
//       path: "0",
//     },
//     children: [
//       {
//         data: {
//           id: "wedlkpow23ioedjlkwed",
//           path: "0/0",
//         },
//         children: [
//           {
//             data: {
//               id: "deewdewdqwedewewdwed",
//               path: "0/0/0",
//             },
//             children: [
//               {
//                 data: {
//                   id: "ewdwer24rfwrewdqw",
//                   path: "0/0/0/0",
//                 },
//                 children: [],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

describe("utils", () => {
  test("createNodesTree", () => {
    const root = createHierarchyTree<SomeData>(data);

    // expect(root).toMatchObject(result);
    expect(root).toMatchSnapshot();
  });
});

/* * * NodePath * * */

import { NodePath, type DecodedNodePath, type EncodedNodePath } from "./utils";

const PATHES_ENCODE: [EncodedNodePath, DecodedNodePath][] = [
  ["0/0/0/1", [0, 0, 0, 1]],
  ["0", [0]],
  ["1/", [1]],
  ["/", []],
];

const PATHES_DECODE: [DecodedNodePath, EncodedNodePath][] = [
  [[0, 0, 0, 1], "0/0/0/1"],
  [[0], "0"],
  [[1], "1"],
];

const INCREMENT_PATH: DecodedNodePath[][] = [
  [
    [0, 0, 3],
    [0, 0, 4],
  ],
];

const DECREMENT_PATH: DecodedNodePath[][] = [
  [
    [0, 0, 3],
    [0, 0, 2],
  ],
  [
    [0, 0, 0],
    [0, 0],
  ],
];

const IS_PATH_DECODED: DecodedNodePath[] = [[0, 0, 3], [0]];

describe("utils", () => {
  describe("decodePath", () => {
    test.each(PATHES_ENCODE)(
      "should return parsed path array of levels (%s)",
      (encoded, decoded) => {
        const DecodedNodePath = NodePath.decode(encoded);

        expect(DecodedNodePath).toMatchObject(decoded);
        expect(DecodedNodePath).toMatchSnapshot();
      }
    );

    test.each(INCREMENT_PATH)(
      "should increment last id in DecodedPath (%s)",
      (path: DecodedNodePath, result: DecodedNodePath) => {
        const incremented = NodePath.increment(path);

        expect(incremented).toMatchObject(result);
        expect(incremented).toMatchSnapshot();
      }
    );

    test.each([IS_PATH_DECODED])(
      "should check if path is Decoded (%)",
      (path: DecodedNodePath) => {
        const isDecoded = NodePath.isDecoded(path);

        expect(isDecoded).toBe(true);
        expect(isDecoded).toMatchSnapshot();
      }
    );

    test.each(INCREMENT_PATH)(
      "should add node (increment last node) to path (%s)",
      (path: DecodedNodePath, result: DecodedNodePath) => {
        const isDecoded = NodePath.addNode(path);

        expect(isDecoded).toMatchObject(result);
        expect(isDecoded).toMatchSnapshot();
      }
    );

    test.each(DECREMENT_PATH)(
      "should remove node (decrement last node) from path (%s)",
      (path: DecodedNodePath, result: DecodedNodePath) => {
        const isDecoded = NodePath.removeNode(path);

        expect(isDecoded).toMatchObject(result);
        expect(isDecoded).toMatchSnapshot();
      }
    );

    test.each([[[0, 0, 1], 12, [0, 0, 12]]])(
      "should change last node in path (%s) on (%s)",
      (path: DecodedNodePath, id: number, result: DecodedNodePath) => {
        const isDecoded = NodePath.incrementById(path, id);

        expect(isDecoded).toMatchObject(result);
        expect(isDecoded).toMatchSnapshot();
      }
    );
  });

  describe("encodePath", () => {
    test.each(PATHES_DECODE)(
      "should return encoded path string (%s)",
      (decoded, encoded) => {
        const EncodedNodePath = NodePath.encode(decoded);

        expect(EncodedNodePath).toMatchObject(encoded);
        expect(EncodedNodePath).toMatchSnapshot();
      }
    );
  });
});
