import { defineStore } from "pinia";

import type {
  Notes,
  Note,
  NoteCreation,
  NoteParentId,
  NoteProps,
} from "@/typings";

import { notesService } from "@/services/notes/notesService";
import { useNotesHistoryStore } from "../notesHistory";
import { useNoteGroupsStore } from "../groups";

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
    /**
     * @description Returns all notes
     */
    all: (state): Notes => {
      return state._notes;
    },

    /**
     * @description Returns one note based on the provided id
     */
    getNote: (state) => {
      return (id: string): Note | undefined => {
        return state._notes.find((note) => note.id === id);
      };
    },

    /**
     * @description Selected ID
     */
    sid: (state): string | null => {
      return state._currentNote?.id ?? null;
    },

    /**
     * @description Selected Index
     */
    sidx: (state) => {
      const id = state._currentNote?.id;
      return state._notes.findIndex((note) => note.id === id);
    },

    /**
     * @description Returns the current note
     */
    currentNote: (state) => {
      return state._currentNote;
    },

    lastId: (state) => state._notes.length - 1,

    /**
     * @description Size of notes
     */
    notesLength: (state) => state._notes.length,
  },
  actions: {
    /**
     * @description Queries all notes of user
     */
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
      //   settingsStore.isFocusedOnFirstNoteOnStart;
      // if (isFocusFirestNodeOnStart) this.selectFirstNode();
      return this._notes;
    },

    /**
     * @description Creates an element and adds (if it does not exist)
     * a new element to the history
     */
    async create(note: NoteCreation) {
      const res = await notesService.create(note);
      const { payload, error } = res;

      if (error) throw Error(error);
      else if (payload && !error) {
        // console.log(payload);
        this._notes.push(payload);
        this.selectById(payload.id);
        this.addHistoryItem(payload);
      }

      // SETTINGS: Selecting new node
      // next to the previous if
      // <IsPlacedNoteNextDuringCreation> is true
      // const settingsStore = useSettingsStore();
      // const isPlaceToNext = settingsStore.IsPlacedNoteNextDuringCreation;

      // if (isPlaceToNext) this.selectNextNode();
      // else this.selectLastNode();

      /* * * Post Sync with DataBase * * */
    },

    /**
     * @description Delete note by id and parentId
     */
    async deleteById(parentId: string | null, id: string) {
      if (this.notesLength <= 0) return;

      const res = await notesService.delete(parentId, id);
      const { payload, error } = res;

      if (error) throw Error(error);
      else if (payload && !error) {
        const { id } = payload;

        const idx = this._notes.findIndex((note) => note.id === id);
        this._notes.splice(idx, 1);
      }
    },

    /**
     * @description Delete all notes in the group (by parentId)
     */
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

    /**
     * @description Delete all notes by provided map.
     * Can remove elements that are children of different root groups
     */
    deleteAllByMap(map: Array<{ id: string }>): void {
      console.log(map);
      map.forEach((deletedId) => {
        const idx = this._notes.findIndex((note) => note.id === deletedId.id);
        this._notes.splice(idx, 1);
      });
    },

    /**
     * @description Sets the current note and parent group
     */
    selectById(id: string): void {
      const idx = this._notes.findIndex((el) => el.id === id);
      this._currentNote = this._notes[idx];

      const groupsStore = useNoteGroupsStore();

      const parentId = this.currentNote?.parentId ?? null;
      groupsStore.selectById(parentId);
    },

    /**
     * @description Update note props by ParentID and ID
     */
    async updateById(
      parentId: NoteParentId,
      id: string,
      props: Partial<NoteProps>
    ) {
      const { payload, error } = await notesService.update({
        parentId,
        id,
        ...props,
      });

      if (payload && !error) {
        const idx = this._notes.findIndex((note) => note.id === payload.id);
        this._notes[idx].title = payload.title;
      }
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
