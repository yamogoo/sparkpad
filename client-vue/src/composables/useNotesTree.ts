import { HierarchyTree, type HierarchyRootNode } from "./useHierarchyTree";

import { useNotesStore, type Note } from "@/stores/notes";

export const useNotesTree = (): HierarchyRootNode<Note> => {
  const notesStore = useNotesStore();
  const notes = notesStore.allNotes;

  return HierarchyTree.createHierarchyTree(notes);
};
