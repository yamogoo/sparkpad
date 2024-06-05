export interface HierarchyNode<T> {
  data: T;
  children: HierarchyNodeChildren<T>;
}

export type HierarchyNodeChildren<T> = Array<HierarchyNode<T>>;
export type HierarchyRootNode<T> = HierarchyNodeChildren<T>;

interface RawNodeElement {
  [key: string]: any;
  path: string;
}

export function createHierarchyTree<T extends RawNodeElement>(
  linearData: Array<T> = []
): HierarchyRootNode<T> {
  const root: HierarchyRootNode<T> = [];
  const nodeMap: { [key: string]: HierarchyNode<T> } = {};

  for (const item of linearData) {
    const pathSegments = item.path.split("/");
    const node: HierarchyNode<T> = { data: item, children: [] };

    nodeMap[item.path] = node;

    if (pathSegments.length === 1) {
      root.push(node);
    } else {
      const parentPath = pathSegments.slice(0, -1).join("/");
      const parentNode = nodeMap[parentPath];

      if (parentNode) {
        parentNode.children.push(node);
      }
    }
  }

  return root;
}

export type EncodedNodePath = string;
export type DecodedNodePath = Array<number>;

export class NodePath {
  static decode(
    encoded: EncodedNodePath,
    decoded: DecodedNodePath = [],
    delimiter = "/"
  ): DecodedNodePath {
    const arr = encoded.split(delimiter);

    arr.forEach((str) => {
      const p = parseInt(str, 10);
      if (!isNaN(p)) decoded.push(p);
    });

    return decoded;
  }

  static encode(decoded: DecodedNodePath, delimiter = "/") {
    let str = "";

    for (let i = 0; i < decoded.length; i++) {
      const isLast = i === decoded.length - 1;

      if (!isLast) str += `${decoded[i]}${delimiter}`;
      else str += `${decoded[i]}`;
    }
    return str;
  }

  static isDecoded(path: DecodedNodePath | EncodedNodePath): boolean {
    if (typeof path === "string") return false;
    else if (typeof path === "object") return true;
    throw Error("Invalid NodePath");
  }

  static increment(path: DecodedNodePath, i: -1 | 1 = 1): DecodedNodePath {
    const newPath = [...path];
    let lastId = newPath[newPath.length - 1];
    if (i === -1 && lastId === 0) {
      newPath.pop();
    } else {
      newPath[newPath.length - 1] = lastId += i;
    }
    return newPath;
  }

  static incrementById(path: DecodedNodePath, id: number): DecodedNodePath {
    const newPath = [...path];
    newPath[newPath.length - 1] = id;
    return newPath;
  }

  static addNode(path: DecodedNodePath): DecodedNodePath {
    return NodePath.increment(path);
  }

  static removeNode(path: DecodedNodePath): DecodedNodePath {
    return NodePath.increment(path, -1);
  }
}

export const pathParser = new NodePath();
