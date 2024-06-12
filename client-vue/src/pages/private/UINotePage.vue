<template lang="pug">
textarea(:value="note && JSON.stringify(note)").editor-area
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNotesStore } from "@/stores/notes";

const notesStore = useNotesStore();
const note = computed(() => notesStore.currentNote);
</script>

<style lang="scss">
.editor-area {
  font-size: 16px;
  font-weight: 400;
  @include box(100%);
  padding: 30px 24px;
  outline: none;
  border: none;

  @include themify($themes) {
    color: themed("text", "primary");
    background-color: themed("background", "primary");
  }
}
</style>
