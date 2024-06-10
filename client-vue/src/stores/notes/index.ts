import { defineStore } from "pinia";

import type { Notes, Note, NoteCreation, NoteParentId } from "@/typings";

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

    all: (state): Notes => {
      return state._notes;
    },
    currentNote: (state) => {
      return state._currentNote;
    },

    sid: (state): string | null => {
      return state._currentNote?.id ?? null;
    },
    sidx: (state) => {
      const id = state._currentNote?.id;
      return state._notes.findIndex((note) => note.id === id);
    },

    currentNoteUID: (state) => state._currentNote?.id,

    lastNoteId: (state) => state._notes.length - 1,

    notesLength: (state) => state._notes.length,
  },
  actions: {
    async fetchAll() {
      const res = await notesService.getAll();
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

    async create(note: NoteCreation) {
      const res = await notesService.create(note);
      const { payload, error } = res;

      if (error) throw Error(error);
      else if (payload && !error) {
        console.log(payload);
        this._notes.push(note);
        this.addHistoryItem(note);
      }

      // SETTINGS: Selecting new node
      // next to the previous if
      // <IsPlacedNoteNextDuringCreation> is true
      // const settingsStore = useSettingsStore();
      // const isPlaceToNext = settingsStore.getIsPlacedNoteNextDuringCreation;

      // if (isPlaceToNext) this.selectNextNode();
      // else this.selectLastNode();

      /* * * Post Sync with DataBase * * */
    },

    async deleteById(parentId: string | null, id: string) {
      if (this.notesLength <= 0) return;

      const res = await notesService.delete(parentId, id);
      const { payload, error } = res;

      if (error) throw Error(error);
      else if (payload && !error) {
        const { id } = payload;

        const idx = this._notes.findIndex((note) => note.id === id);
        this._notes.splice(idx, 1);

        const historyStore = useNotesHistoryStore();
        historyStore.remove(idx);
      }
    },

    async deleteAll(parentId: NoteParentId) {
      const res = await notesService.deleteAll(parentId);
      const { payload, error } = res;

      if (error) console.warn(error);
      else if (payload && !error) {
        payload.forEach((deletedNote: Pick<Note, "id">) => {
          const idx = this._notes.findIndex(
            (note) => note.id === deletedNote.id
          );
          this._notes.splice(idx, 1);
        });

        this._notes = [];
      }
    },

    deleteAllByMap(map: Array<{ id: string }>): void {
      console.log(map);
      map.forEach((deletedId) => {
        const idx = this._notes.findIndex((note) => note.id === deletedId.id);
        this._notes.splice(idx, 1);
      });
    },

    /* * * Client * * */

    selectById(id: string): void {
      const idx = this._notes.findIndex((el) => el.id === id);
      this._currentNote = this._notes[idx];
      console.log(this._currentNote);

      // this.addHistoryItem(this._currentNote);

      const historyStore = useNotesHistoryStore();
      historyStore.add(id);
    },

    /* * * History * * */

    addHistoryItem(note: Note): void {
      if (!note) return;

      const { id } = note;
      const historyStore = useNotesHistoryStore();
      historyStore.add(id);
    },
  },
});
