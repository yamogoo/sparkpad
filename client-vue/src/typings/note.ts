import type {
  HierarchyNodeParentId,
  HierarchyNodeTypes,
} from "./hierarchyView";

export interface Note {
  id: string;
  title: string;
  content: string;
  parentId: NoteParentId;
}

export type NoteParentId = HierarchyNodeParentId;

export type NoteCreation = Pick<Note, "id" | "title" | "content" | "parentId">;

export type NoteTypes = HierarchyNodeTypes;
export type Notes = Array<Note>;

export const isNote = (note: any): note is Note => {
  return (
    note !== null &&
    typeof note === "object" &&
    typeof note.id === "string" &&
    typeof note.title === "string" &&
    typeof note.content === "string" &&
    (note.parentId === null || typeof note.parentId === "string")
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

export const isNoteId = (res: any): res is Pick<Note, "id"> => {
  return res !== null && typeof res === "object" && typeof res.id === "string";
};

export const isNoteParentId = (res: any): res is Pick<Note, "parentId"> => {
  return res !== null && typeof res === "object" && typeof res.uid === "string";
};

export const isNoteCreationIds = (
  res: any
): res is Pick<Note, "id" | "parentId"> => {
  return (
    res !== null &&
    res !== undefined &&
    typeof res === "object" &&
    typeof res.id === "string" &&
    (res.parentId === null || typeof res.parentId === "string")
  );
};

export const isNoteIds = (res: any): res is Array<Pick<Note, "id">> => {
  return (
    res !== null &&
    res !== undefined &&
    Array.isArray(res) &&
    res.every(isNoteId)
  );
};
