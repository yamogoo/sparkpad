import { defineStore } from "pinia";
import type {
  NoteGroup,
  NoteGroupCreation,
  NoteGroupParentId,
  NoteGroupProps,
  NoteGroups,
} from "@/typings";

import { noteGroupService } from "@/services/notes/noteGroupsService";
import { useNotesStore } from "../notes";
import { notesService } from "@/services/notes/notesService";

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

    async fetchHierarchy(): Promise<any> {
      const data = await Promise.all([
        noteGroupService.getAll(),
        notesService.getAll(),
      ]);

      const [groups, notes] = data;

      if (!groups.error && groups.payload && !notes.error && notes.payload) {
        const notesStore = useNotesStore();

        this._groups = groups.payload;
        notesStore._notes = notes.payload;
      }
    },

    async create(group: NoteGroupCreation) {
      const res = await noteGroupService.create(group);
      const { payload, error } = res;

      if (error) console.log(error);
      else if (payload && !error) {
        const { id } = payload;
        if (id) this._groups.push(payload);
      }
    },

    /**
     * @description Select group and ID
     */
    selectById(id: string | null): void {
      if (!id) {
        this._currentGroup = null;
      } else {
        const idx = this._groups.findIndex((group) => group.id === id);
        this._currentGroup = this._groups[idx];
      }
    },

    /**
     * @description Delete group and all nested objects by ParentID and ID
     */
    async deleteById(id: string) {
      if (this.length <= 0 || !this.create) return;

      if (id) {
        const res = await noteGroupService.delete(id);
        const { payload, error } = res;

        if (error) console.warn(error);
        else if (payload && !error) {
          this.fetchHierarchy();
        }
      }
    },

    /**
     * @description Update group props by ParentID and ID
     */
    async updateById(
      parentId: NoteGroupParentId,
      id: string,
      props: Partial<NoteGroupProps>
    ) {
      const { payload, error } = await noteGroupService.update({
        parentId,
        id,
        ...props,
      });

      if (payload && !error) {
        const idx = this._groups.findIndex((group) => group.id === payload.id);
        this._groups[idx].title = payload.title;
      }
    },
  },
});
