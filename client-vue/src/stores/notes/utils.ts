import type { Note } from "./types";

export const createNote = (name: string): Note => {
  return { id: "", name, content: "" };
};
