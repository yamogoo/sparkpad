import type { Note, NoteGroup } from "@/stores/notes";
import type { ApiMethod } from "../types";

import authHeader from "@/services/auth/authHeader";

const HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const VERSION = import.meta.env.VITE_SERVER_API_VERSION;

const BASE_URL = `http://${HOST}:${PORT}/${VERSION}`;

type APIKeys =
  // Groups
  | "getNoteGroups"
  | "createNoteGroup"
  | "updateNoteGroup"
  | "deleteNoteGroup"
  | "deleteAllNoteGroups"
  // Notes
  | "getNotes"
  | "createNote"
  | "updateNote"
  | "deleteNote"
  | "deleteAllNotes";

export const api: Record<APIKeys, ApiMethod> = {
  // Groups
  getNoteGroups: {
    path: `${BASE_URL}/note-groups`,
    method: "GET",
  },
  createNoteGroup: {
    path: `${BASE_URL}/note-groups`,
    method: "POST",
  },
  deleteNoteGroup: {
    path: `${BASE_URL}/note-groups`,
    method: "DELETE",
  },
  updateNoteGroup: {
    path: `${BASE_URL}/note-groups`,
    method: "PUT",
  },
  deleteAllNoteGroups: {
    path: `${BASE_URL}/note-groups`,
    method: "DELETE",
  },
  // Notes
  getNotes: {
    path: `${BASE_URL}/notes`,
    method: "GET",
  },
  createNote: {
    path: `${BASE_URL}/notes`,
    method: `POST`,
  },
  updateNote: {
    path: `${BASE_URL}/notes`,
    method: "PUT",
  },
  deleteNote: {
    path: `${BASE_URL}/notes`,
    method: "DELETE",
  },
  deleteAllNotes: {
    path: `${BASE_URL}/notes`,
    method: "DELETE",
  },
};

export class NotesService {
  public async createGroup({
    id,
    uid,
    path,
    name,
    description,
  }: Partial<NoteGroup>) {
    const InitRequest = {
      method: api.createNoteGroup.method,
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({
        id,
        uid,
        path,
        name,
        description,
      }),
    };

    const res = await fetch(api.createNote.path, InitRequest);
    const json = await res.json();
    console.log(json);
  }

  public async createNote({ id, uid, path, name, content }: Partial<Note>) {
    const InitRequest = {
      method: api.createNote.method,
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({
        id,
        uid,
        path,
        name,
        content,
      }),
    };

    const res = await fetch(api.createNote.path, InitRequest);
    const json = await res.json();
    console.log(json);
  }

  public async deleteNote(uid: string) {
    console.log(uid);
    const InitRequest = {
      method: api.deleteNote.method,
      headers: { "Content-Type": "application/json", ...authHeader() },
    };

    const res = await fetch(`${api.deleteNote.path}/${uid}`, InitRequest);
    const json = await res.json();
    console.log(json);
  }

  public async getAllNotes(): Promise<Note[]> {
    const InitRequest = {
      method: api.getNotes.method,
      headers: { "Content-Type": "application/json", ...authHeader() },
    };

    const res = await fetch(api.getNotes.path, InitRequest);
    const json: any = await res.json();

    // !!! FIX
    console.log(json);
    const { notes } = json;
    return notes;
  }
}
// const isNote = (note: unknown): Note => {
//   return (note && 'name' in note && 'content' in note)
// }

export const notesService = new NotesService();
