import type { Note } from "@/stores/notes";
import type { ApiMethod } from "../types";

import authHeader from "@/services/auth/authHeader";
import type { NoteResponse } from "./types";

const HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const VERSION = import.meta.env.VITE_SERVER_API_VERSION;

const BASE_URL = `http://${HOST}:${PORT}/${VERSION}`;

export const api: Record<
  "getNotes" | "createNote" | "updateNote" | "deleteNote" | "deleteAllNotes",
  ApiMethod
> = {
  getNotes: {
    path: `${BASE_URL}/notes`,
    method: "GET",
  },
  createNote: {
    path: `${BASE_URL}/notes`,
    method: `POST`,
  },
  updateNote: {
    path: `${BASE_URL}/notes/:id`,
    method: "PUT",
  },
  deleteNote: {
    path: `${BASE_URL}/notes/:id`,
    method: "DELETE",
  },
  deleteAllNotes: {
    path: `${BASE_URL}/notes`,
    method: "DELETE",
  },
};

export class AuthService {
  public async createNote({ id, name, content }: Partial<Note>) {
    const InitRequest = {
      method: api.createNote.method,
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({
        id,
        name,
        content,
      }),
    };

    const res = await fetch(api.createNote.path, InitRequest);
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
    const { notes } = json;
    return notes;
  }
}
// const isNote = (note: unknown): Note => {
//   return (note && 'name' in note && 'content' in note)
// }

export const notesService = new AuthService();