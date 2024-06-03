import type { BadRequest } from "../types";
import type { Note } from "@/stores/notes";

type NoteCreated = Note;

export type NoteResponse =
  | (Omit<Response, "json"> & {
      status: 201;
      json: () => NoteCreated | PromiseLike<NoteCreated>;
    })
  | (Omit<Response, "json"> & {
      status: 400;
      json: () => BadRequest | PromiseLike<BadRequest>;
    });
