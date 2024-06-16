import { computed } from "vue";

import type { Note } from "@/typings";

import { useNotesHistoryStore } from "@/stores/notesHistory";
import { useNotesStore } from "@/stores/notes";

export type NoteHistoryTab = Pick<Note, "id" | "title">;
export type NoteHistoryTabs = Array<NoteHistoryTab>;

export const useNotesHistory = (): NoteHistoryTabs => {
  const notesHistoryStore = useNotesHistoryStore();
  const notesStore = useNotesStore();

  const notes = computed(() => notesStore.all);
  const tabs = computed(() => notesHistoryStore.allKeys);

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
