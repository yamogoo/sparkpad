import type { EncodedNodePath } from "./utils";
import { History } from "./history";
import type { HierarchyNodeTypes } from "@/stores/notes/hierarchyTree";

export type NoteHistoryItem = Pick<Note, "uid" | "name" | "path">;

export interface NotestStoreState {
  _notes: Array<Note>;
  _history: History<NoteHistoryItem>;
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
