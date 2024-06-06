import { defineStore } from "pinia";

import type {
  Note,
  NoteGroup,
  NoteHistoryItem,
  NotestStoreState,
} from "./types";
import { History } from "./history";

import { notesService } from "@/services/nots/notesService";

const _history = new History<NoteHistoryItem>(16);

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

    currentNoteUID: (state) => state._currentNote?.uid,

    lastNoteId: (state) => state._notes.length - 1,

    notesLength: (state) => state._notes.length,
  },
  actions: {
    async createNoteGroup(noteGroup: NoteGroup) {
      const { uid } = noteGroup;

      // this._notes.push(noteGroup);
    },
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

      await notesService.createNote(note);
    },

    async deleteNoteByUID(uid: string) {
      if (this.notesLength <= 0 || !this.createNote) return;

      // Remove note
      const idx = this._notes.findIndex((note) => note.uid === uid);
      this._notes.splice(idx, 1);
      this._history.remove(uid);

      /* * * Post Sync with DataBase * * */

      if (uid) await notesService.deleteNote(uid);
    },

    /* * * Client * * */

    selectCurrentNoteByUID(uid: string): void {
      const idx = this._notes.findIndex((el) => el.uid === uid);
      this._currentNote = this._notes[idx];
    },

    /* * * History * * */

    addHistoryItem(note: Note): void {
      if (!note) return;

      const { uid, path, name } = note;
      this._history.add({
        uid,
        data: { uid, path, name },
      });
    },
  },
});

export * from "./types";
