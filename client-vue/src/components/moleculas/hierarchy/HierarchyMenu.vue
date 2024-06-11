<template lang="pug">
ul.hierarchy-menu__body(
  data-testid="notes-list"
)
  HierarchyItem.hierarchy-menu__item(
    v-for="item, idx in notesTree"
    :key="idx"
    :idx
    :id="item.id"
    :parentId="item.parentId"
    :dir-sid="groupSid"
    :file-sid="noteSid"
    :label="item.title"
    :type="HierarchyView.getNodeType(item)"
    :children="item.children"
    @update="onUpdate"
    @select="onSelect"
    @delete="onDelete"
  )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useNotesStore } from "@/stores/notes";
import { useNoteGroupsStore } from "@/stores/groups";
import { useNotesHistoryStore } from "@/stores/notesHistory";

import { HierarchyNodeTypes } from "@/typings";
import { HierarchyView } from "@/composables/useHierarchyView";

import HierarchyItem, {
  type NodeEmittedData,
} from "@/components/moleculas/hierarchy/HierarchyItem.vue";

const router = useRouter();

/* * * Stores * * */

const groupsStore = useNoteGroupsStore();
const notesStore = useNotesStore();
const historyStore = useNotesHistoryStore();

const groupSid = computed(() => groupsStore.sid ?? null);
const noteSid = computed(() => notesStore.sid);

/**
 * @description Formation of a tree of nodes
 */
const notesTree = computed(() => {
  return HierarchyView.createTree(groupsStore.all, notesStore.all);
});

/* * * Handlers * * */

/**
 * @description Depending on the entity type, sets a specific sid
 */
const onSelect = ({ id, parentId, type }: NodeEmittedData): void => {
  if (type === HierarchyNodeTypes.DIR) {
    groupsStore.selectById(id);
  } else if (type === HierarchyNodeTypes.FILE) {
    notesStore.selectById(id);
    historyStore.add(id);
    groupsStore.selectById(parentId);

    router.push({ params: { noteId: id.toString() } });
  }
};

/**
 * @description Deletes a note or group depending on the object type.
 */
const onDelete = ({ id, parentId, type }: NodeEmittedData): void => {
  if (type === HierarchyNodeTypes.DIR) {
    groupsStore.deleteById(id);
    groupsStore.selectById(parentId);
  } else if (type === HierarchyNodeTypes.FILE) {
    notesStore.deleteById(parentId, id);
    historyStore.deleteById(id);
  }
};

const onUpdate = (id: string): void => {};
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
