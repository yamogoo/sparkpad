export interface NoteAttributes {
  id: string;
  title: string;
  content: string;
  parentId: string;
  userId: string;
}

export interface NoteCreationAttributes extends NoteAttributes {}

export type Note = Omit<NoteAttributes, "userId">;
export type NoteId = Pick<NoteAttributes, "id">;

export type NoteCreationRequestParams = Pick<NoteAttributes, "id" | "parentId">;

export type Notes = Array<Note>;
