import { defineStore } from "pinia";
import type { NoteGroup, NoteGroupCreation, NoteGroups } from "@/typings";

import { noteGroupService } from "@/services/notes/noteGroupsService";
import { useNotesStore } from "../notes";

interface NoteGroupStoreState {
  _groups: Array<NoteGroup>;
  _currentGroup: NoteGroup | null;
}

export const useNoteGroupsStore = defineStore("note-groups", {
  state: (): NoteGroupStoreState => ({
    _groups: [],
    _currentGroup: null,
  }),
  getters: {
    all: (state): NoteGroups => {
      return state._groups;
    },

    length: (state) => {
      return state._groups.length;
    },

    sid: (state) => {
      return state._currentGroup?.id;
    },

    sidx: (state) => {
      const id = state._currentGroup?.id;
      return state._groups.findIndex((group) => group.id === id);
    },
  },
  actions: {
    /**
     * @description Queries all groups of user
     */
    async fetchAll() {
      const res = await noteGroupService.getAll();
      const { payload, error } = res;

      if (error) {
        console.log(error);
        // ... set global error
      } else if (payload && !error) this._groups = payload;

      // SETTINGS: Selecting first node
      // if <isFocusedOnFirstNoteOnStart> is true
      // const settingsStore = useSettingsStore();
      // const isFocusFirestNodeOnStart =
      //   settingsStore.isFocusedOnFirstNoteOnStart;
      // if (isFocusFirestNodeOnStart) this.selectFirstNode();

      return this._groups;
    },

    /**
     * @description Delete all groups by provided map.
     * Can remove elements that are children of different root groups
     */
    deleteAllByMap(map: Array<{ id: string }>): void {
      console.log(map);
      map.forEach((deletedId) => {
        const idx = this._groups.findIndex((note) => note.id === deletedId.id);
        this._groups.splice(idx, 1);
      });
    },

    async create(group: NoteGroupCreation) {
      const res = await noteGroupService.create(group);
      const { payload, error } = res;

      if (error) console.log(error);
      else if (payload && !error) {
        const { id } = payload;
        if (id) this._groups.push(group);
      }
    },

    selectById(id: string | null): void {
      if (!id) {
        this._currentGroup = null;
      } else {
        const idx = this._groups.findIndex((group) => group.id === id);
        this._currentGroup = this._groups[idx];
      }
    },

    async deleteById(id: string) {
      if (this.length <= 0 || !this.create) return;

      if (id) {
        const res = await noteGroupService.delete(id);
        const { payload, error } = res;

        if (error) console.warn(error);
        else if (payload && !error) {
          const { groups, notes } = payload;

          const notesStore = useNotesStore();
          notesStore.deleteAllByMap(notes);
          this.deleteAllByMap(groups);
        }
      }
    },
  },
});
