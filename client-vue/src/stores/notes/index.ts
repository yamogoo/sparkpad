import { defineStore } from "pinia";

import type { Note, NotestStoreState } from "./types";
import { History } from "./history";

import { notesService } from "@/services/nots/notesService";

const _history = new History(16);

export const useNotesStore = defineStore("notes", {
  state: (): NotestStoreState => ({
    _notes: [],
    _history,
    _currentNote: null,
  }),
  getters: {
    /* * * Client * * */

    allNotes: (state) => {
      return state._notes;
    },
    currentNote: (state) => {
      return state._currentNote;
    },
    sid: (state) => {
      const id = state._currentNote?.id;
      return state._notes.findIndex((note) => note.id === id);
    },

    currentNotePath: (state) => state._currentNote?.path,

    currentNoteId: (state) => state._currentNote?.id,

    lastNoteId: (state) => state._notes.length - 1,

    notesLength: (state) => state._notes.length,
  },
  actions: {
    async fetchAllNotes() {
      const notes = await notesService.getAllNotes();
      this._notes = notes;

      // SETTINGS: Selecting first node
      // if <isFocusedOnFirstNoteOnStart> is true
      // const settingsStore = useSettingsStore();
      // const isFocusFirestNodeOnStart =
      //   settingsStore.getIsFocusedOnFirstNoteOnStart;
      // if (isFocusFirestNodeOnStart) this.selectFirstNode();

      return notes;
    },

    async createNote(note: Note) {
      const { id } = note;

      this._notes.push(note);
      this._history.add(id);

      // SETTINGS: Selecting new node
      // next to the previous if
      // <IsPlacedNoteNextDuringCreation> is true
      // const settingsStore = useSettingsStore();
      // const isPlaceToNext = settingsStore.getIsPlacedNoteNextDuringCreation;

      // if (isPlaceToNext) this.selectNextNode();
      // else this.selectLastNode();

      /* * * Post Sync with DataBase * * */

      await notesService.createNote(note);
    },

    async deleteNoteById(id: string) {
      if (this.notesLength <= 0 || !this.createNote) return;

      // Remove note
      const idx = this._notes.findIndex((note) => note.id === id);
      this._notes.splice(idx, 1);
      this._history.remove(id);

      /* * * Post Sync with DataBase * * */

      if (id) await notesService.deleteNote(id);
    },

    /* * * Client * * */

    selectCurrentNoteById(id: string): void {
      const idx = this._notes.findIndex((el) => el.id === id);
      this._currentNote = this._notes[idx];
      this._history.add(id);
    },

    /* * * Current Note * * */
  },
});

export * from "./types";
