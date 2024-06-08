import type { EncodedNodePath, HierarchyNodeTypes } from "./hierarchyTree";

export interface Note {
  id: number;
  uid: string;
  path: EncodedNodePath;
  title: string;
  content: string;
  noteGroupId: number;
}

export type NoteCreation = Pick<
  Note,
  "id" | "uid" | "title" | "content" | "path" | "noteGroupId"
>;

export type NoteTypes = HierarchyNodeTypes;
export type Notes = Array<Note>;

export const isNote = (note: any): note is Note => {
  return (
    note !== null &&
    typeof note === "object" &&
    typeof note.id === "number" &&
    typeof note.uid === "string" &&
    typeof note.path === "string" &&
    typeof note.title === "string" &&
    typeof note.content === "string"
  );
};

export const isNotes = (notes: any): notes is Notes => {
  return (
    notes !== null &&
    typeof notes === "object" &&
    Array.isArray(notes) &&
    notes.every(isNote)
  );
};

export const isNoteUid = (res: any): res is Pick<Note, "uid"> => {
  return res !== null && typeof res === "object" && typeof res.uid === "string";
};

export const isNoteUids = (uids: any): uids is Array<Pick<Note, "uid">> => {
  return (
    uids !== null &&
    uids !== undefined &&
    Array.isArray(uids) &&
    uids.every(isNoteUid)
  );
};
