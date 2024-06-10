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
        :sid
        :label="item.title"
        :type="HierarchyView.getNodeType(item)"
        :children="item.children"
        @update="onUpdate"
        @select="onSelect"
        @delete="onDelete"
    )
</template>

<script setup lang="ts">
import { computed, type Ref, ref } from "vue";

import { useNotesStore } from "@/stores/notes";
import { useNoteGroupsStore } from "@/stores/groups";

import { HierarchyNodeTypes, type HierarchyNodeSid } from "@/typings";
import { HierarchyView } from "@/composables/useHierarchyView";

import HierarchyItem, {
  type NodeEmittedData,
} from "@/components/moleculas/hierarchy/HierarchyItem.vue";

/* * * Stores * * */

const groupsStore = useNoteGroupsStore();
const notesStore = useNotesStore();

/* * * Notes * * */

const sid: Ref<HierarchyNodeSid> = ref(null);

const notesTree = computed(() => {
  return HierarchyView.createTree(groupsStore.all, notesStore.all);
});

/* * * Handlers * * */

const onSelect = ({ id, parentId, type }: NodeEmittedData): void => {
  if (type === HierarchyNodeTypes.DIR) {
    sid.value = id;
    groupsStore.selectById(id);
  } else if (type === HierarchyNodeTypes.FILE) {
    sid.value = id;
    notesStore.selectById(id);
    if (parentId) groupsStore.selectById(parentId);
  }
};

const onDelete = ({ id, parentId, type }: NodeEmittedData): void => {
  if (type === HierarchyNodeTypes.DIR) {
    groupsStore.deleteById(id);
    groupsStore.selectById(parentId);
  } else if (type === HierarchyNodeTypes.FILE) {
    notesStore.deleteById(parentId, id);
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
