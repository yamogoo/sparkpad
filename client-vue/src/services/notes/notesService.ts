import {
  isNote,
  isNotes,
  isNoteIds,
  type ApiMethod,
  type Note,
  type NoteCreation,
  type Notes,
  type ServiceResponse,
  isNoteId,
  type NoteParentId,
  ServiceStatuses,
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
    path: (parentId: string) => `${BASE_URL}/groups/${parentId}/notes/`,
    method: "GET",
  },
  getOne: {
    path: (parentId: string, id: string) =>
      `${BASE_URL}/groups/${parentId}/notes/${id}`,
    method: "GET",
  },
  create: {
    path: (parentId: string) => `${BASE_URL}/groups/${parentId}/notes/`,
    method: `POST`,
  },
  update: {
    path: (parentId: string, id: string) =>
      `${BASE_URL}/groups/${parentId}/notes/${id}`,
    method: "PUT",
  },
  delete: {
    path: (parentId: string, id: string) =>
      `${BASE_URL}/groups/${parentId}/notes/${id}`,
    method: "DELETE",
  },
  deleteAll: {
    path: (parentId: string) => `${BASE_URL}/groups/${parentId}/notes/`,
    method: "DELETE",
  },
};

export class NotesService {
  public async getOne(id: string): Promise<ServiceResponse<Note>> {
    const res = await fetchData({
      method: api.getOne.method,
      headers: { ...authHeader() },
      url: api.getOne.path(),
      body: { id },
    });

    if (!isNote(res.payload)) return { error: res.error };
    const { error, payload } = res;
    return { payload, error };
  }

  public async getAll(): Promise<ServiceResponse<Notes>> {
    const res = await fetchData({
      method: api.getAll.method,
      headers: { ...authHeader() },
      url: api.getAll.path(),
    });

    if (!isNotes(res.payload)) return { error: res.error };
    const { error, payload } = res;
    return { payload, error };
  }

  public async create(note: NoteCreation): Promise<ServiceResponse<Note>> {
    const res = await fetchData({
      method: api.create.method,
      headers: { ...authHeader() },
      url: api.create.path(note.parentId),
      body: note,
    });

    if (!isNote(res.payload)) return { error: res.error };
    const { error, payload } = res;
    return { payload, error };
  }

  public async updateNote(note: NoteCreation): Promise<ServiceResponse<Note>> {
    const { id } = note;

    const res = await fetchData({
      method: api.update.method,
      headers: { ...authHeader() },
      url: api.update.path(id),
      body: note,
    });

    if (!isNote(res.payload)) return { error: res.error };
    const { error, payload } = res;
    return { payload, error };
  }

  public async delete(
    parentId: string | null,
    id: string
  ): Promise<ServiceResponse<Pick<Note, "id">>> {
    const res = await fetchData({
      method: api.delete.method,
      headers: { ...authHeader() },
      url: api.delete.path(parentId, id),
    });

    if (!isNoteId(res.payload)) return { error: res.error };

    const { error, payload } = res;
    return { payload, error };
  }

  public async deleteAll(
    parentId: NoteParentId
  ): Promise<ServiceResponse<Array<Pick<Note, "id">>>> {
    const res = await fetchData({
      method: api.deleteAll.method,
      headers: { ...authHeader() },
      url: api.deleteAll.path(parentId),
    });

    if (!isNoteIds(res.payload))
      return { error: res.error, status: ServiceStatuses.NOT_VALID_DATA };

    const { error, payload } = res;
    return { payload, error };
  }
}

export const notesService = new NotesService();
