export interface NoteAttributes {
  id: number;
  uid: string;
  path: string;
  title: string;
  content: string;
  noteGroupId: number;
  userId: string;
}

export interface NoteCreationAttributes extends NoteAttributes {}

export type Note = Omit<NoteAttributes, "userId">;
export type NoteUid = Pick<NoteAttributes, "uid">;

export type Notes = Array<Note>;
