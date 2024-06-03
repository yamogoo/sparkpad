import { defineStore } from "pinia";
import type { Note, NotestStoreState } from "./types";
import { notesService } from "@/services/nots/notesService";
import { v4 } from "uuid";
import { useSettingsStore } from "../settings";

export const useNotesStore = defineStore("notes", {
  state: (): NotestStoreState => ({
    notes: [],
    sid: -1,
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

    getLastId: (state) => state.notes.length - 1,

    getLength: (state) => state.notes.length,
  },
  actions: {
    async fetchAllNotes() {
      const notes = await notesService.getAllNotes();
      this.notes = notes;

      // SETTINGS: Selecting first node
      // if <isFocusedOnFirstNoteOnStart> is true
      const settingsStore = useSettingsStore();
      const isFocusFirestNodeOnStart =
        settingsStore.getIsFocusedOnFirstNoteOnStart;
      if (isFocusFirestNodeOnStart) this.selectFirstNode();

      return notes;
    },

    async createNote(note: Note) {
      const id = v4();
      this.notes.push({ ...note, id });

      // SETTINGS: Selecting new node
      // next to the previous if
      // <IsPlacedNoteNextDuringCreation> is true
      const settingsStore = useSettingsStore();
      const isPlaceToNext = settingsStore.getIsPlacedNoteNextDuringCreation;

      if (isPlaceToNext) this.selectNextNode();
      else this.selectLastNode();

      /* * * Post Sync with DataBase * * */

      const { name, content } = note;
      await notesService.createNote({ id, name, content });
    },

    async deleteNote(_id: number) {
      if (this.getLength <= 0 || !this.currentNote) return;

      const id = this.getCurrentNote?.id;

      this.notes.splice(_id, 1);
      this.selectPreviousNode();

      /* * * Post Sync with DataBase * * */

      if (id) await notesService.deleteNote(id);
      else throw Error("Invalid Note ID");
    },

    /* * * Client * * */

    setSid(id: number): void {
      this.sid = id;
    },

    selectCurrentNoteById(_id: number): void {
      this.currentNote = this.notes[_id];
      this.setSid(_id);
    },

    /* * * Current Note * * */

    selectPreviousNode(): void {
      const sid = this.sid;

      if (sid !== 0) {
        this.selectCurrentNoteById(this.sid - 1);
      } else this.selectCurrentNoteById(this.sid);
    },

    selectNextNode(): void {
      const sid = this.sid;
      const lastSid = this.getLastId;

      if ((sid !== 0 && sid !== lastSid) || (sid === 0 && sid < lastSid))
        this.selectCurrentNoteById(this.sid + 1);
      else if (sid === lastSid && lastSid !== 0) {
        this.selectCurrentNoteById(this.sid - 1);
      }
    },

    selectFirstNode(): void {
      this.selectCurrentNoteById(0);
    },

    selectLastNode(): void {
      const lastId = this.getLastId;
      this.selectCurrentNoteById(lastId);
    },
  },
});

export * from "./types";
export * from "./utils";
