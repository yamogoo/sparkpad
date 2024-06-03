<template lang="pug">
div.notes-thumbnail-list
  div.notes-thumbnail-list(
    v-for="{ name, content }, idx in notes"
    :key="idx"
  )
    div.notes-thumbnail-list--container
      h5 {{ name ? name : 'Empty' }}
      p(v-if="content") {{ content }}
</template>

<script setup lang="ts">
import type { Note } from "@/stores/notes/types";

interface Props {
  notes: Array<Note>;
}

defineProps<Props>();
</script>

<style lang="scss">
.notes-thumbnail-list {
  @include box(100%);

  &__item {
    width: 100%;
    @include padding-h(12px);
    cursor: pointer;

    &--container {
      @include padding-v(12px);
      @include themify($themes) {
        border-bottom: 1px solid themed("border", "primary");
      }
    }

    h5 {
      font-size: 22px;
      font-weight: 400;
      padding: 0;
      margin: 0;
    }
    p {
      font-size: 16px;
      font-weight: 400;
      padding: 0;
      margin: 0;
    }
  }
}
</style>
