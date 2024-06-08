import type { HierarchyRootNode, Note } from "@/typings";

import { HierarchyTree } from "./useHierarchyTree";
import { useNotesStore } from "@/stores/notes";

export const useNotesTree = (): HierarchyRootNode<Note> => {
  const notesStore = useNotesStore();
  const notes = notesStore.allNotes;

  return HierarchyTree.createHierarchyTree(notes);
};
