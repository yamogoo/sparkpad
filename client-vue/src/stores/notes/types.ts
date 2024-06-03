export interface Note {
  _id: number;
  id: string;
  name: string;
  content: string;
  // createdAt: string;
  // updatedAt: string;
}

export type Notes = Array<Note> | [];

export interface NotestStoreState {
  notes: Array<Note>;
  sid: number;
  currentNote: Note | undefined;
}
