<template lang="pug">
div.main-viewport
  UIMainViewportTabbar
  div.main-viewport__content
    UIWelcomeSheet(v-if="!isCurrentNoteSelected")
    UIMDXEditor(v-if="isCurrentNoteSelected")
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useNotesStore } from "@/stores/notes";

import UIMainViewportTabbar from "./tabbar/UIMainViewportTabbar.vue";
import UIWelcomeSheet from "@/components/moleculas/sheets/UIWelcomeSheet.vue";
import UIMDXEditor from "@/components/moleculas/mdxEditor/UIMDXEditor.vue";

const notesStore = useNotesStore();

const isCurrentNoteSelected = computed(() => notesStore.sid !== null);
</script>

<style lang="scss">
.main-viewport {
  display: flex;
  flex-direction: column;
  @include box(100%);

  &-tabbar {
    flex-grow: 1;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    @include box(100%);

    @include themify($themes) {
      background-color: themed("background", "primary");
    }

    p {
      @include themify($themes) {
        color: themed("text", "primary");
      }
    }
  }
}
</style>
