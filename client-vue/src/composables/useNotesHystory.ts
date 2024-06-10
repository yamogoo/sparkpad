import { computed } from "vue";

import type { Note } from "@/typings";

import { useNotesHistoryStore } from "@/stores/notesHistory";
import { useNotesStore } from "@/stores/notes";

const notesHistoryStore = useNotesHistoryStore();
const notesStore = useNotesStore();

export type NoteHistoryTab = Pick<Note, "id" | "title">;
export type NoteHistoryTabs = Array<NoteHistoryTab>;

const notes = computed(() => notesStore.all);
const tabs = computed(() => notesHistoryStore.allKeys);

export const useNotesHistory = (): NoteHistoryTabs => {
  const history: NoteHistoryTabs = [];

  tabs.value.forEach((key) => {
    notes.value.forEach((note) => {
      if (note.id === key) {
        const { id, title } = note;
        history.push({ id, title });
      }
    });
  });

  return history;
};
