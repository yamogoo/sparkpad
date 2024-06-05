<template lang="pug">
div.notes(
  data-test-id="notes"
)
  UINotesControlBar(
    @create:note="onCreateNote"
    @create:dir="onCreateDir"
    @delete:note="onDeleteNote"
    @search:note="onSearchNote"
  )
  div.notes--container
    UINotesList(
      v-if="isNoteListMode"
      :sid="currentId"
      :notes
      @select:note="onSelectNote"
    )
    //- UINotesThumbnailList(
    //-   v-if="!isNoteListMode"
    //-   :sid="_sid"
    //-   :notes
    //-   @select:note="onSelectNote"
    //- )
</template>

<script setup lang="ts">
import { onMounted, computed, type Ref, ref } from "vue";
import { v4 } from "uuid";

import { useSettingsStore } from "@/stores/settings";
import { createHierarchyTree } from "@/stores/notes/utils";

import { useNotesStore, type Note } from "@/stores/notes";

import UINotesControlBar from "./UINotesControlBar.vue";
import UINotesList from "./UINotesList.vue";

/* * * Stores * * */

const notesStore = useNotesStore();
const settingsStore = useSettingsStore();

/* * * Notes * * */

const sid: Ref<number | null> = ref(null);

const notes = computed(() => {
  const notes = notesStore.allNotes;
  return createHierarchyTree(notes);
});

const currentId = computed(() => notesStore.currentNoteId ?? "");

/* * * Mode * * */

const isNoteListMode = computed(() => settingsStore.getIsNoteListMode);

const onSelectNote = (idx: number, note: Note): void => {
  const { id } = note;

  sid.value = idx;
  console.log(sid.value);

  // gen usePath

  notesStore.selectCurrentNoteById(id);
};

const onCreateDir = (): void => {};

const onCreateNote = (): void => {
  const initNote: Note = {
    id: v4(),
    path: `${notesStore.notesLength}`,
    name: `New ${(Math.random() * 100_000).toFixed(0)}`,
    content: "",
  };
  notesStore.createNote(initNote);
};

const onDeleteNote = (): void => {
  notesStore.deleteNoteById(currentId.value);
};

const onSearchNote = (): void => {};

/* * * Init * * */

onMounted(() => notesStore.fetchAllNotes());
</script>

<style lang="scss">
.notes {
  @include box(100%);

  &--container {
    position: relative;
    @include box(100%);
    overflow: hidden;
  }
}
</style>
