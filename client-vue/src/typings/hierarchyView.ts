export enum HierarchyNodeTypes {
  DIR = 0x00,
  FILE = 0x01,
}

export type HierarchyNodeType = HierarchyNodeTypes;

export type HierarchyNodeParentId = string | null;
export type HierarchyNodeSid = string | null;

export interface HierarchyNodeCreationAttributes {
  id: string;
  parentId: HierarchyNodeParentId;
}

export interface HierarchyNode extends HierarchyNodeCreationAttributes {
  [key: string]: any;
  children?: Array<HierarchyNode>;
}

export type HierarchyNodeTree = Array<HierarchyNode>;
