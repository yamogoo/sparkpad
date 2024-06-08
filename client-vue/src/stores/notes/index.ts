import { defineStore } from "pinia";

import type { Notes, NoteGroup, Note, NoteCreation } from "@/typings";

import { notesService } from "@/services/notes/notesService";
import { useNotesHistoryStore } from "../notesHistory";

interface NotestStoreState {
  _notes: Array<Note>;
  _currentNote: Note | null;
}

export const useNotesStore = defineStore("notes", {
  state: (): NotestStoreState => ({
    _notes: [],
    _currentNote: null,
  }),
  getters: {
    /* * * Client * * */

    allNotes: (state): Notes => {
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

    currentNoteUID: (state) => state._currentNote?.uid,

    lastNoteId: (state) => state._notes.length - 1,

    notesLength: (state) => state._notes.length,
  },
  actions: {
    async createNoteGroup(noteGroup: NoteGroup) {
      // const { uid } = noteGroup;
      // this._notes.push(noteGroup);
    },
    async fetchAllNotes() {
      const res = await notesService.getAllNotes();
      const { payload, error } = res;

      if (error) {
        console.log(error);
        // ... set global error
      } else if (payload && !error) this._notes = payload;

      // SETTINGS: Selecting first node
      // if <isFocusedOnFirstNoteOnStart> is true
      // const settingsStore = useSettingsStore();
      // const isFocusFirestNodeOnStart =
      //   settingsStore.getIsFocusedOnFirstNoteOnStart;
      // if (isFocusFirestNodeOnStart) this.selectFirstNode();

      return this._notes;
    },

    async createNote(note: NoteCreation) {
      this._notes.push(note);

      this.addHistoryItem(note);

      // SETTINGS: Selecting new node
      // next to the previous if
      // <IsPlacedNoteNextDuringCreation> is true
      // const settingsStore = useSettingsStore();
      // const isPlaceToNext = settingsStore.getIsPlacedNoteNextDuringCreation;

      // if (isPlaceToNext) this.selectNextNode();
      // else this.selectLastNode();

      /* * * Post Sync with DataBase * * */

      const res = await notesService.createNote(note);
      const { payload, error } = res;

      if (error) throw Error(error);
      else if (payload && !error) console.log(payload);
    },

    async deleteNoteByUID(uid: string) {
      if (this.notesLength <= 0 || !this.createNote) return;

      // Remove note
      const idx = this._notes.findIndex((note) => note.uid === uid);
      this._notes.splice(idx, 1);

      const historyStore = useNotesHistoryStore();
      historyStore.remove(idx);

      /* * * Post Sync with DataBase * * */

      if (uid) {
        const res = await notesService.deleteNote(uid);
        const { payload, error } = res;

        if (error) throw Error(error);
        else if (payload && !error) console.log(payload);
      }
    },

    async deleteAll() {
      const res = await notesService.deleteAll();
      const { payload, error } = res;

      if (error) throw Error(error);
      else if (payload && !error) {
        console.log(payload);
        this._notes = [];
      }
    },

    /* * * Client * * */

    selectCurrentNoteByUID(uid: string): void {
      const idx = this._notes.findIndex((el) => el.uid === uid);
      this._currentNote = this._notes[idx];

      // this.addHistoryItem(this._currentNote);

      const historyStore = useNotesHistoryStore();
      historyStore.add(uid);
    },

    /* * * History * * */

    addHistoryItem(note: Note): void {
      if (!note) return;

      const { uid } = note;
      const historyStore = useNotesHistoryStore();
      historyStore.add(uid);
    },
  },
});
