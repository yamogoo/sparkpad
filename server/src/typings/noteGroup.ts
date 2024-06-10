export interface NoteGroup {
  id: string;
  title: string;
  description: string;
  parentId: string;
}

export interface NotesGroupAttributes extends NoteGroup {
  userId: string;
}

export type NoteGroupCreationAttributes = Pick<NotesGroupAttributes, "id">;

export type NoteGroups = Array<NoteGroup>;

export interface NoteGroupDeletedAttributes {
  groups: Array<{ id: string }>;
  notes: Array<{ id: string }>;
}
