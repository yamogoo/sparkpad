<template lang="pug">
UIHierarchyMenuControlBar(
  :dir-sid="groupSid"
  :file-sid="noteSid"
  @create:note="onCreateNote"
  @create:dir="onCreateDir"
  @delete:item="onDeleteItem"
  @delete:all="onDeleteAll"
)
UIHierarchyMenu(
  v-if="isNoteListMode"
  :data="notesTree"
  :is-scroll-to-note="isScrollToNoteEnabled"
)
</template>

<script setup lang="ts">
import { computed } from "vue";
import { v4 } from "uuid";

import { useSettingsStore } from "@/stores/settings";
import { useNotesStore } from "@/stores/notes";
import { useNoteGroupsStore } from "@/stores/groups";
import { useNotesHistoryStore } from "@/stores/notesHistory";

import {
  type Note,
  type NoteCreation,
  type NoteGroup,
  type NoteGroupCreation,
} from "@/typings";

import { HierarchyView } from "@/composables/useHierarchyView";

import UIHierarchyMenuControlBar from "./UIHierarchyMenuControlBar.vue";
import UIHierarchyMenu from "@/components/moleculas/hierarchy/UIHierarchyMenu.vue";

/* * * Stores * * */

const groupsStore = useNoteGroupsStore();
const notesStore = useNotesStore();
const historyStore = useNotesHistoryStore();
const settingsStore = useSettingsStore();

const groupSid = computed(() => groupsStore.sid ?? null);
const noteSid = computed(() => notesStore.sid ?? null);

/* * * Tree * * */

const notesTree = computed(() => {
  return HierarchyView.createTree<NoteGroup, Note>(
    groupsStore.all,
    notesStore.all
  );
});

const isScrollToNoteEnabled = computed(
  () => settingsStore.isHierarchyScrollToNoteEnabled
);

const isNoteListMode = computed(() => settingsStore.isNoteListMode);

/* * * Handlers * * */

const onCreateNote = (): void => {
  const initNote: NoteCreation = {
    id: v4(),
    title: `new Note ${(Math.random() * 100_000).toFixed(0)}`,
    content: "",
    parentId: groupSid.value,
  };
  notesStore.create(initNote);
};

const onCreateDir = (): void => {
  const initGroup: NoteGroupCreation = {
    id: v4(),
    title: `new Dir ${(Math.random() * 100_000).toFixed(0)}`,
    parentId: groupSid.value,
  };
  groupsStore.create(initGroup);
};

const onDeleteItem = (): void => {
  if (noteSid.value) {
    notesStore.deleteById(groupSid.value, noteSid.value);
    historyStore.deleteById(noteSid.value);
  }
};

const onDeleteAll = (): void => {
  notesStore.deleteAll(groupSid.value);
};
</script>

<style lang="scss">
.navigator {
  display: grid;
  grid-template-rows: auto 1fr;
  @include box(100%);

  &--sheet {
    position: relative;
    @include box(100%);
    overflow-x: hidden;
  }
}
</style>
