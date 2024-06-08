export enum HierarchyNodeTypes {
  DIR = 0x00,
  FILE = 0x01,
}

export type HierarchyNodeType = HierarchyNodeTypes;
export interface HierarchyNode<T> {
  data: T;
  children: HierarchyNodeChildren<T>;
}

export type HierarchyNodeChildren<T> = Array<HierarchyNode<T>>;
export type HierarchyRootNode<T> = HierarchyNodeChildren<T>;

export interface RawNodeElement {
  [key: string]: any;
  path: string;
}

export type EncodedNodePath = string;
export type DecodedNodePath = Array<number>;
