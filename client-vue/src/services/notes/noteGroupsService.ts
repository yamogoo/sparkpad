import {
  isNoteGroup,
  isNoteGroups,
  isNoteGroupUid,
  type ApiMethod,
  type NoteGroup,
  type NoteGroupCreation,
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
  getOne: {
    path: (uid: string) => `${BASE_URL}/note-groups/${uid}`,
    method: "GET",
  },
  getAll: {
    path: () => `${BASE_URL}/note-groups`,
    method: "GET",
  },
  create: {
    path: () => `${BASE_URL}/note-groups`,
    method: "POST",
  },
  delete: {
    path: (uid: string) => `${BASE_URL}/note-groups/${uid}`,
    method: "DELETE",
  },
  update: {
    path: (uid: string) => {
      return `${BASE_URL}/note-groups/${uid}`;
    },
    method: "PUT",
  },
  deleteAll: {
    path: () => `${BASE_URL}/note-groups`,
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

  public async createGroup(
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

  public async deleteGroup(
    uid: NoteGroupCreation
  ): Promise<ServiceResponse<Pick<NoteGroup, "uid">>> {
    const res = await fetchData({
      method: api.delete.method,
      headers: { ...authHeader() },
      url: api.delete.path(uid),
    });

    if (!isNoteGroupUid(res.payload)) return { error: res.error };

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
