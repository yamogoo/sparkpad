<template lang="pug">
div.main-viewport__tabbar
  UIMainViewportTabbarTab(
    v-for="tab, idx in history"
    :key="String(tab)"
    :id="idx"
    :title="tab.data.name"
    :is-active="idx === sid"
    @open="onOpen(tab.uid)"
    @close="onClose(tab.uid)"
  )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useNotesStore } from "@/stores/notes";

import UIMainViewportTabbarTab from "@/components/moleculas/viewport/tabbar/UIMainViewportTabbarTab.vue";

const router = useRouter();
const notesStore = useNotesStore();

const sid = computed(() => notesStore._history.sid);
const history = computed(() => notesStore._history.all);

const onOpen = (id: string): void => {
  router.replace({ params: { id } });
};

const onClose = (id: string): void => {
  // notesStore.closeNoteById(id);
};
</script>

<style lang="scss">
.main-viewport__tabbar {
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
    background-color: themed("background", "secondary");
  }
}
</style>
