import type { EncodedNodePath } from "@/composables/useHierarchyTree";
import type { HierarchyNodeTypes } from "@/composables/useHierarchyTree";

export interface NotestStoreState {
  _notes: Array<Note>;
  _currentNote: Note | null;
}

export interface NoteGroup {
  id: number;
  uid: string;
  path: EncodedNodePath;
  name: string;
  description: string;
}

export interface Note {
  id: number;
  uid: string;
  path: EncodedNodePath;
  name: string;
  content: string;
}

export type Notes = Array<Note>;

export type NoteTypes = HierarchyNodeTypes;
