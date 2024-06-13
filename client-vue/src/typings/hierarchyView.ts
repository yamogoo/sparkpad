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
  [key: string]: any;
}

export interface HierarchyNode extends HierarchyNodeCreationAttributes {
  type: HierarchyNodeTypes;
  children?: Array<HierarchyNode>;
}

export type HierarchyNodeTree = Array<HierarchyNode>;
