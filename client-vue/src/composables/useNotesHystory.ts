import { computed } from "vue";

import type { Note } from "@/typings";

import { useNotesHistoryStore } from "@/stores/notesHistory";
import { useNotesStore } from "@/stores/notes";

const notesHistoryStore = useNotesHistoryStore();
const notesStore = useNotesStore();

export type NoteHistoryTab = Pick<Note, "uid" | "title">;
export type NoteHistoryTabs = Array<NoteHistoryTab>;

const notes = computed(() => notesStore.allNotes);
const tabs = computed(() => notesHistoryStore.allKeys);

export const useNotesHistory = (): NoteHistoryTabs => {
  const history: NoteHistoryTabs = [];

  tabs.value.forEach((key) => {
    notes.value.forEach((note) => {
      if (note.uid === key) {
        const { uid, title } = note;
        history.push({ uid, title });
      }
    });
  });

  return history;
};
