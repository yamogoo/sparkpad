import {
  isNote,
  isNotes,
  isNoteUid,
  isNoteUids,
  type ApiMethod,
  type Note,
  type NoteCreation,
  type Notes,
  type ServiceResponse,
} from "@/typings";

import { fetchData } from "../utils";
import authHeader from "../auth/authHeader";

const HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const VERSION = import.meta.env.VITE_SERVER_API_VERSION;

const BASE_URL = `http://${HOST}:${PORT}/${VERSION}`;

type APIKeys =
  | "getOne"
  | "getAll"
  | "create"
  | "delete"
  | "update"
  | "deleteAll";

export const api: Record<APIKeys, ApiMethod> = {
  getAll: {
    path: () => `${BASE_URL}/notes`,
    method: "GET",
  },
  getOne: {
    path: (uid: string) => `${BASE_URL}/notes/${uid}`,
    method: "GET",
  },
  create: {
    path: () => `${BASE_URL}/notes`,
    method: `POST`,
  },
  update: {
    path: (uid: string) => `${BASE_URL}/notes/${uid}`,
    method: "PUT",
  },
  delete: {
    path: (uid: string) => `${BASE_URL}/notes/${uid}`,
    method: "DELETE",
  },
  deleteAll: {
    path: () => `${BASE_URL}/notes`,
    method: "DELETE",
  },
};

export class NotesService {
  public async getOne(uid: string): Promise<ServiceResponse<Note>> {
    const res = await fetchData({
      method: api.getOne.method,
      headers: { ...authHeader() },
      url: api.getOne.path(),
      body: { uid },
    });

    if (!isNote(res.payload)) return { error: res.error };
    const { error, payload } = res;
    return { payload, error };
  }

  public async getAllNotes(): Promise<ServiceResponse<Notes>> {
    const res = await fetchData({
      method: api.getAll.method,
      headers: { ...authHeader() },
      url: api.getAll.path(),
    });

    if (!isNotes(res.payload)) return { error: res.error };
    const { error, payload } = res;
    return { payload, error };
  }

  public async createNote(note: NoteCreation): Promise<ServiceResponse<Note>> {
    const res = await fetchData({
      method: api.create.method,
      headers: { ...authHeader() },
      url: api.create.path(),
      body: note,
    });

    if (!isNote(res.payload)) return { error: res.error };
    const { error, payload } = res;
    return { payload, error };
  }

  public async updateNote(note: NoteCreation): Promise<ServiceResponse<Note>> {
    const { uid } = note;

    const res = await fetchData({
      method: api.update.method,
      headers: { ...authHeader() },
      url: api.update.path(uid),
      body: note,
    });

    if (!isNote(res.payload)) return { error: res.error };
    const { error, payload } = res;
    return { payload, error };
  }

  public async deleteNote(
    uid: string
  ): Promise<ServiceResponse<Pick<Note, "uid">>> {
    const res = await fetchData({
      method: api.delete.method,
      headers: { ...authHeader() },
      url: api.delete.path(uid),
    });

    if (!isNoteUid(res.payload)) return { error: res.error };
    const { error, payload } = res;
    return { payload, error };
  }

  public async deleteAll(): Promise<ServiceResponse<Array<Pick<Note, "uid">>>> {
    const res = await fetchData({
      method: api.deleteAll.method,
      headers: { ...authHeader() },
      url: api.deleteAll.path(),
    });

    if (!isNoteUids(res.payload)) return { error: res.error };

    const { error, payload } = res;
    return { payload, error };
  }
}

export const notesService = new NotesService();
