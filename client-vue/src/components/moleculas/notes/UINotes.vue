<template lang="pug">
div.notes
  UINotesControlBar(
    @create:note="onCreateNote"
    @delete:note="onDeleteNote"
    @search:note="onSearchNote"
  )
  div.notes--container
    UINotesList(
      :sid="_sid"
      :notes
      @select:note="onSelectNote"
    )
    UINotesThumbnailList(
      :sid="_sid"
      :notes
      @select:note="onSelectNote"
    )
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useNotesStore, createNote } from "@/stores/notes";

import UINotesControlBar from "./UINotesControlBar.vue";
import UINotesList from "./UINotesList.vue";
import UINotesThumbnailList from "./UINotesThumbnailList.vue";

const notesStore = useNotesStore();

const notes = computed(() => notesStore.getAllNotes);

const _sid = computed(() => notesStore.getSid ?? -1);

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
  }
}
</style>
