<template lang="pug">
div.main-viewport__tabbar(
  data-testid="main-viewport-tabbar"
)
  UIMainViewportTabbarTab(
    v-for="tab, idx in history"
    :key="String(tab)"
    :id="idx"
    :title="tab.title"
    :is-active="idx == sid"
    @open="onOpen(tab.id)"
    @close="onClose(idx)"
    @update:idx="onUpdateId"
  )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useNotesStore } from "@/stores/notes";
import { useNotesHistoryStore } from "~/src/stores/notesHistory";

import { useNotesHistory } from "@/composables/useNotesHystory";

import UIMainViewportTabbarTab from "@/components/moleculas/viewport/tabbar/UIMainViewportTabbarTab.vue";

const router = useRouter();

const notesStore = useNotesStore();
const notesHistoryStore = useNotesHistoryStore();

const sid = computed(() => notesHistoryStore.sid);
const history = computed(() => useNotesHistory());

const onOpen = (id: string): void => {
  notesStore.selectById(id);
  notesHistoryStore.setSidByKey(id);

  router.push({ params: { noteId: id.toString() } });
};

const onClose = (idx: number): void => {
  notesHistoryStore.deleteByIdx(idx);
  const newIdx = notesHistoryStore.sid;
  const newId = notesHistoryStore.getItemByIdx(newIdx ?? 0);
  notesStore.selectById(newId ?? "");
};

const onUpdateId = (newIdx: number, oldIdx: number): void => {
  notesHistoryStore.changePosition(newIdx, oldIdx);
};
</script>

<style lang="scss">
.main-viewport__tabbar {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 8px;
  width: 100%;
  min-width: 136px;
  height: 48px;
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;

  @include themify($themes) {
    background-color: themed("background", "secondary");
  }
}
</style>
