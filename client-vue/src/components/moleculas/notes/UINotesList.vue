<template lang="pug">
div.notes-list(
  data-testid="notes-list"
)
  UINoteListItem(
    v-for="note, idx in notes"
    :key="idx"
    :id="idx"
    :name="note.data.name"
    :description="note.data.content"
    :is-active="sid===note.data.uid"
    @open="e => onClick(idx, note.data)"
  )
</template>

<script setup lang="ts">
import type { Note } from "@/stores/notes/types";

import UINoteListItem from "./UINoteListItem.vue";
import type { HierarchyRootNode } from "~/src/stores/notes/utils";

interface Props {
  sid: string;
  notes: HierarchyRootNode<Note>;
}

defineProps<Props>();

const emits = defineEmits<{
  (e: "select:note", idx: number, note: Note): void;
}>();

const onClick = (idx: number, note: Note): void => {
  emits("select:note", idx, note);
};
</script>

<style lang="scss">
.notes-list {
  @include box(100%);
}
</style>
