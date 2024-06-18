import { NoteId } from "./note";

export interface NoteGroup {
  id: string;
  title: string;
  description: string;
  parentId: string;
}
export interface NotesGroupAttributes extends NoteGroup {
  userId: string;
}

export type NoteGroupId = Pick<NotesGroupAttributes, "id">;

export type NoteGroupCreationAttributes = Pick<NotesGroupAttributes, "id">;

export type NoteGroups = Array<NoteGroup>;

export interface NoteGroupDeletedAttributes {
  groups: Array<NoteId>;
  notes: Array<NoteGroupId>;
}
