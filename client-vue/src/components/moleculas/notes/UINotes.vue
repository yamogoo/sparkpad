<template lang="pug">
div.notes(
  data-test-id="notes"
)
  UINotesControlBar(
    @create:note="onCreateNote"
    @delete:note="onDeleteNote"
    @search:note="onSearchNote"
  )
  div.notes--container
    UINotesList(
      v-if="isNoteListMode"
      :sid="_sid"
      :notes
      @select:note="onSelectNote"
    )
    UINotesThumbnailList(
      v-if="!isNoteListMode"
      :sid="_sid"
      :notes
      @select:note="onSelectNote"
    )
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useNotesStore, createNote } from "@/stores/notes";

import { useSettingsStore } from "~/src/stores/settings";

import UINotesControlBar from "./UINotesControlBar.vue";
import UINotesList from "./UINotesList.vue";
import UINotesThumbnailList from "./UINotesThumbnailList.vue";

const notesStore = useNotesStore();

const notes = computed(() => notesStore.getAllNotes);

const _sid = computed(() => notesStore.getSid ?? -1);

/* * * Mode * * */

const settingsStore = useSettingsStore();

const isNoteListMode = computed(() => settingsStore.getIsNoteListMode);

onMounted(async () => {
  notesStore.fetchAllNotes();
});

const onSelectNote = (_id: number): void => {
  notesStore.selectCurrentNoteById(_id);
};

let i = 0;

const onCreateNote = (): void => {
  const defaultNote = createNote(`${i++}`);
  notesStore.createNote(defaultNote);
};

const onDeleteNote = (): void => {
  notesStore.deleteNote(_sid.value);
};

const onSearchNote = (): void => {};
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
