import { defineStore } from "pinia";
import type { Note, NotestStoreState } from "./types";
import { notesService } from "@/services/nots/notesService";
import { v4 } from "uuid";

export const useNotesStore = defineStore("notes", {
  state: (): NotestStoreState => ({
    notes: [],
    sid: 0,
    currentNote: undefined,
  }),
  getters: {
    /* * * Client * * */

    getAllNotes: (state) => {
      return state.notes;
    },
    getCurrentNote: (state) => {
      return state.currentNote;
    },
    getSid: (state) => state.sid,
  },
  actions: {
    async fetchAllNotes() {
      const notes = await notesService.getAllNotes();
      this.notes = notes;
      return notes;
    },

    async createNote(note: Note) {
      const id = v4();
      this.notes.push({ ...note, id });

      // select (if checked switch)
      this.selectCurrentNoteById(note._id);

      /* * * Post Sync with DataBase * * */
      const { name, content } = note;
      await notesService.createNote({ id, name, content });
      // try if not synced
      // type error on screen if not synced
    },

    async deleteNote() {},

    /* * * Client * * */

    setSid(id: number) {
      this.sid = id;
    },

    selectCurrentNoteById(_id: number) {
      this.setSid(_id);
    },
  },
});

export * from "./types";
export * from "./utils";
