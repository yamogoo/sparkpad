<template lang="pug">
div.notes(
  data-testid="notes"
)
  UINotesControlBar(
    @create:note="onCreateNote"
    @create:dir="onCreateDir"
    @delete:item="onDeleteItem"
    @delete:all="onDeleteAll"
    @search:note="onSearchNote"
  )
  div.notes--container
    HierarchyMenu(
      v-if="isNoteListMode"
    )
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { v4 } from "uuid";

import { useSettingsStore } from "@/stores/settings";
import { useNotesStore } from "@/stores/notes";
import { useNoteGroupsStore } from "@/stores/groups";

import { type NoteCreation, type NoteGroupCreation } from "@/typings";

import UINotesControlBar from "./UINotesControlBar.vue";
import HierarchyMenu from "@/components/moleculas/hierarchy/HierarchyMenu.vue";

/* * * Stores * * */

const groupsStore = useNoteGroupsStore();
const notesStore = useNotesStore();
const settingsStore = useSettingsStore();

/* * * Notes * * */

const groupSid = computed(() => groupsStore.sid ?? null);

/* * * Mode * * */

const isNoteListMode = computed(() => settingsStore.getIsNoteListMode);

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
    description: "",
    parentId: groupSid.value,
  };
  groupsStore.create(initGroup);
};

const onDeleteItem = (): void => {
  // if (noteSid.value) notesStore.deleteById(noteSid.value);
};

const onDeleteAll = (): void => {
  notesStore.deleteAll(groupSid.value);
};

const onSearchNote = (): void => {};

/* * * Init * * */

onMounted(() => {
  groupsStore.fetchAll().then(() => {
    notesStore.fetchAll();
  });
});
</script>

<style lang="scss">
.notes {
  display: grid;
  grid-template-rows: auto 1fr;
  @include box(100%);

  &--container {
    position: relative;
    @include box(100%);
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.hierarchy-menu__body {
  height: 100%;
  padding: 10px;
  margin: 0;
  list-style: none;
}
</style>
