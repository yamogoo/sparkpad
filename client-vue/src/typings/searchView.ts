import type { HierarchyNodeCreationAttributes } from "./hierarchyView";

export interface SubstrIndex {
  start: number;
  end: number;
}

export type SubstrIndexes = Array<SubstrIndex>;

export interface SearchedSubstringItem {
  value: string;
  position: SubstrIndex | undefined;
  match?: string;
}

export interface SearchedNode extends HierarchyNodeCreationAttributes {
  template: string;
  segments: SearchedSubstringItem[];
}
