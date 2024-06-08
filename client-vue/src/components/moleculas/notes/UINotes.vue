<template lang="pug">
div.notes(
  data-testid="notes"
)
  UINotesControlBar(
    @create:note="onCreateNote"
    @create:dir="onCreateDir"
    @delete:note="onDeleteNote"
    @delete:all="onDeleteAll"
    @search:note="onSearchNote"
  )
  div.notes--container
    UINotesList(
      v-if="isNoteListMode"
      :sid="currentUID"
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
import { useNotesStore } from "@/stores/notes";
import type { Note, NoteCreation } from "@/typings";

import UINotesControlBar from "./UINotesControlBar.vue";
import UINotesList from "./UINotesList.vue";
import { useNotesTree } from "~/src/composables/useNotesTree";

/* * * Stores * * */

const notesStore = useNotesStore();

const settingsStore = useSettingsStore();

/* * * Notes * * */

const sid: Ref<number | null> = ref(null);

const notes = computed(() => useNotesTree());

const currentUID = computed(() => notesStore.currentNoteUID ?? "");

/* * * Mode * * */

const isNoteListMode = computed(() => settingsStore.getIsNoteListMode);

const onSelectNote = (idx: number, note: Note): void => {
  const { uid } = note;
  sid.value = idx;

  // gen usePath

  notesStore.selectCurrentNoteByUID(uid);
};

const onCreateDir = (): void => {
  const initNote: NoteCreation = {
    id: 0,
    uid: v4(),
    path: `${notesStore.notesLength}/`,
    title: `New Dir ${(Math.random() * 100_000).toFixed(0)}`,
    content: "",
    noteGroupId: 0,
  };
  notesStore.createNote(initNote);
};

const onCreateNote = (): void => {
  const initNote: NoteCreation = {
    id: 0,
    uid: v4(),
    path: `0/${notesStore.notesLength}`,
    title: `New ${(Math.random() * 100_000).toFixed(0)}`,
    content: "",
    noteGroupId: 0,
  };
  notesStore.createNote(initNote);
};

const onDeleteNote = (): void => {
  notesStore.deleteNoteByUID(currentUID.value);
};

const onDeleteAll = (): void => {
  notesStore.deleteAll();
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
