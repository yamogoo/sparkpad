<template lang="pug">
textarea(:value="JSON.stringify(note)").editor-area
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useNotesStore } from "@/stores/notes";

const route = useRoute();

const notesStore = useNotesStore();

const id = computed(() => {
  const params = route.params.noteId;
  if (typeof params === "string") return params;
  return "";
});
const note = computed(() => notesStore.getNote(id.value));
</script>

<style lang="scss">
.editor-area {
  font-size: 16px;
  font-weight: 400;
  @include box(100%);
  outline: none;
  border: none;

  @include themify($themes) {
    color: themed("text", "primary");
    background-color: themed("background", "primary");
  }
}
</style>
