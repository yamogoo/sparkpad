import type { EncodedNodePath } from "./utils";
import { History } from "./history";

export interface NotestStoreState {
  _notes: Array<Note>;
  _history: History;
  _currentNote: Note | null;
}

export interface Note {
  id: string;
  path: EncodedNodePath;
  name: string;
  content: string;
}

export type Notes = Array<Note>;
