<template lang="pug">
div.hierarchy-menu
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
import { computed, nextTick } from "vue";
import { useRouter } from "vue-router";

import { PrivateRoutes } from "@/router";

import { useNotesStore } from "@/stores/notes";
import { useNoteGroupsStore } from "@/stores/groups";
import { useNotesHistoryStore } from "@/stores/notesHistory";

import { HierarchyNodeTypes } from "@/typings";
import { HierarchyView } from "@/composables/useHierarchyView";

import HierarchyItem, {
  type NodeEmittedData,
} from "@/components/moleculas/hierarchy/HierarchyItem.vue";

interface Props {
  isScrollToNote: boolean;
  minScrollToNoteOffset?: number;
}

const props = withDefaults(defineProps<Props>(), {
  isScrollToNote: false,
  minScrollToNoteOffset: 36,
});

const router = useRouter();

/* * * Stores * * */

const groupsStore = useNoteGroupsStore();
const notesStore = useNotesStore();
const historyStore = useNotesHistoryStore();

const groupSid = computed(() => groupsStore.sid ?? null);
const noteSid = computed(() => {
  // Scroll to note (navigator menu settings)
  if (props.isScrollToNote) scrollToNote();
  return notesStore.sid;
});

/**
 * @description Scroll to current note
 */
const scrollToNote = async () => {
  await nextTick();

  const container: HTMLDivElement | null =
    document.querySelector(".hierarchy-menu");

  const el: HTMLLIElement | null = document.querySelector(
    ".hierarchy-item.active.file"
  );

  if (container && el) {
    const top = el.offsetTop - props.minScrollToNoteOffset;
    container.scrollTo({ behavior: "smooth", top });
  }
};

const notesTree = computed(() => {
  return HierarchyView.createTree(groupsStore.all, notesStore.all);
});

/* * * Handlers * * */

/**
 * @description Depending on the entity type, sets a specific sid
 */
const onSelect = async ({
  id,
  parentId,
  type,
}: NodeEmittedData): Promise<void> => {
  if (type === HierarchyNodeTypes.DIR) {
    groupsStore.selectById(id);
  } else if (type === HierarchyNodeTypes.FILE) {
    notesStore.selectById(id);
    groupsStore.selectById(parentId);
    historyStore.add(id);
    router.push({ path: `${PrivateRoutes.EDITOR_NOTES}/${id}` });
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
.hierarchy-menu {
  position: relative;
  @include box(100%);
  overflow-x: hidden;
  overflow-y: auto;

  &__body {
    position: relative;
    height: 100%;
    padding: 10px;
    margin: 0;
    list-style: none;
  }
}
</style>
