import { useNotesHistoryStore } from "@/stores/notesHistory";
import { useNotesStore, type Note } from "@/stores/notes";
import { computed } from "vue";

const notesHistoryStore = useNotesHistoryStore();
const notesStore = useNotesStore();

export type NoteHistoryTab = Pick<Note, "uid" | "name">;
export type NoteHistoryTabs = Array<NoteHistoryTab>;

const notes = computed(() => notesStore.allNotes);
const tabs = computed(() => notesHistoryStore.allKeys);

export const useNotesHistory = (): NoteHistoryTabs => {
  const history: NoteHistoryTabs = [];

  tabs.value.forEach((key) => {
    notes.value.forEach((note) => {
      if (note.uid === key) {
        const { uid, name } = note;
        history.push({ uid, name });
      }
    });
  });

  return history;
};
