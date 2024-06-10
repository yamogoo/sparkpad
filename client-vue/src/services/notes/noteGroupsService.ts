import {
  isNoteGroup,
  isNoteGroupDeletedAttributes,
  isNoteGroups,
  type ApiMethod,
  type NoteGroup,
  type NoteGroupCreation,
  type NoteGroupDeletedAttributes,
  type NoteGroups,
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
    path: () => `${BASE_URL}/groups`,
    method: "GET",
  },
  getOne: {
    path: (id: string) => `${BASE_URL}/groups/${id}`,
    method: "GET",
  },
  create: {
    path: () => `${BASE_URL}/groups/`,
    method: "POST",
  },
  delete: {
    path: (id: string) => `${BASE_URL}/groups/${id}`,
    method: "DELETE",
  },
  update: {
    path: (id: string) => {
      return `${BASE_URL}/groups/${id}`;
    },
    method: "PUT",
  },
  deleteAll: {
    path: () => `${BASE_URL}/groups`,
    method: "DELETE",
  },
};

export class NoteGroupService {
  public async getOne(): Promise<ServiceResponse<NoteGroup>> {
    const res = await fetchData({
      method: api.getAll.method,
      headers: { ...authHeader() },
      url: api.getAll.path(),
    });

    if (!isNoteGroup(res.payload)) return { error: res.error };

    const { error, payload } = res;
    return { payload, error };
  }

  public async getAll(): Promise<ServiceResponse<NoteGroups>> {
    const res = await fetchData({
      method: api.getAll.method,
      headers: { ...authHeader() },
      url: api.getAll.path(),
    });

    if (!isNoteGroups(res.payload)) return { error: res.error };

    const { error, payload } = res;
    return { payload, error };
  }

  public async create(
    noteGroup: NoteGroupCreation
  ): Promise<ServiceResponse<NoteGroup>> {
    const res = await fetchData({
      method: api.create.method,
      headers: { ...authHeader() },
      url: api.create.path(),
      body: noteGroup,
    });

    if (!isNoteGroup(res.payload)) return { error: res.error };

    const { error, payload } = res;
    return { payload, error };
  }

  public async delete(
    id: string
  ): Promise<ServiceResponse<NoteGroupDeletedAttributes>> {
    const res = await fetchData({
      method: api.delete.method,
      headers: { ...authHeader() },
      url: api.delete.path(id),
    });

    if (!isNoteGroupDeletedAttributes(res.payload)) return { error: res.error };
    console.log(res.payload);
    const { error, payload } = res;
    return { payload, error };
  }

  public async deleteAll(): Promise<ServiceResponse<NoteGroups>> {
    const res = await fetchData({
      method: api.deleteAll.method,
      headers: { ...authHeader() },
      url: api.deleteAll.path(),
    });

    if (!isNoteGroups(res.payload)) return { error: res.error };

    const { error, payload } = res;
    return { payload, error };
  }
}

export const noteGroupService = new NoteGroupService();
