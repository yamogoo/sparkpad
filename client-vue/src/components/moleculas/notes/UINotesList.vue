<template lang="pug">
div.notes-list(
  data-test-id="notes-list"
)
  UINoteListItem(
    v-for="{name, content}, idx in notes"
    :key="idx"
    :id="idx"
    :name
    :description="content"
    :is-active="sid===idx"
    @open="onClick"
  )
</template>

<script setup lang="ts">
import type { Note } from "@/stores/notes/types";

import UINoteListItem from "./UINoteListItem.vue";

interface Props {
  sid: number;
  notes: Array<Note>;
}

defineProps<Props>();

const emits = defineEmits<{
  (e: "select:note", id: number): void;
}>();

const onClick = (id: number): void => {
  emits("select:note", id);
};
</script>

<style lang="scss">
.notes-list {
  @include box(100%);
}
</style>
