<template lang="pug">
div.editor-tabbar
  //- UIEditorTabbarTab(
  //-   v-for="tab in history"
  //-   :key="String(tab)"
  //-   :id="tab"
  //-   :title="tab.label"
  //-   :is-active="tab.id === sid"
  //-   @open="onOpen(tab.id)"
  //-   @close="onClose(tab.id)"
  //- )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useNotesStore } from "@/stores/notes";

// import UIEditorTabbarTab from "@/components/moleculas/editor/tabbar/UIEditorTabbar.vue";

const router = useRouter();
const notesStore = useNotesStore();

const sid = computed(() => notesStore._history.peek);
const history = computed(() => notesStore._history.all);

const onOpen = (id: string): void => {
  router.replace({ params: { id } });
};

const onClose = (id: string): void => {
  // notesStore.closeNoteById(id);
};
</script>

<style lang="scss">
.editor-tabbar {
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 8px;
  width: 100%;
  height: 48px;
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;

  @include themify($themes) {
    background-color: themed("background", "accent");
  }
}
</style>
