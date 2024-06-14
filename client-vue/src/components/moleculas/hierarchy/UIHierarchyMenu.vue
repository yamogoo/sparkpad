<template lang="pug">
div.hierarchy(
  @click="onClickOutside"
)
  ul.hierarchy__list(
    data-testid="hierarchy-list"
  )
    UIHierarchyItem.hierarchy__item(
      v-for="item in data"
      :key="item.id"
      :id="item.id"
      :sid="sid"
      :parentId="item.parentId"
      :label="item.title ?? ''"
      :type="item.type"
      :children="item.children"
      @update="onUpdate"
      @select="onSelect"
      @delete="onDelete"
    )
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, type Ref } from "vue";
import { useRouter } from "vue-router";

import { PrivateRoutes } from "@/router";

import { useNotesStore } from "@/stores/notes";
import { useNoteGroupsStore } from "@/stores/groups";
import { useNotesHistoryStore } from "@/stores/notesHistory";

import { HierarchyNodeTypes, type HierarchyNode } from "@/typings";

import UIHierarchyItem, {
  type NodeEmittedData,
} from "@/components/moleculas/hierarchy/UIHierarchyItem.vue";

interface Props {
  data: Array<HierarchyNode>;
  isScrollToNote: boolean;
  minScrollToNoteOffset?: number;
}

withDefaults(defineProps<Props>(), {
  isScrollToNote: false,
  minScrollToNoteOffset: 36,
});

const router = useRouter();

/* * * Stores * * */

const groupsStore = useNoteGroupsStore();
const notesStore = useNotesStore();
const historyStore = useNotesHistoryStore();

const groupSid = computed(() => {
  // if (props.isScrollToNote) scrollToNote();
  return groupsStore.sid ?? null;
});
const noteSid = computed(() => {
  // Scroll to note (navigator menu settings)
  // if (props.isScrollToNote) scrollToNote();
  return notesStore.sid;
});

const sid: Ref<string | null> = ref(null);

/**
 * @description Scroll to current note
 */
// const scrollToNote = async () => {
//   await nextTick();

//   const container: HTMLDivElement | null =
//     document.querySelector(".hierarchy-menu");

//   const el: HTMLLIElement | null = document.querySelector(
//     ".hierarchy-item.active.file"
//   );

//   if (container && el) {
//     const top = el.offsetTop - props.minScrollToNoteOffset;
//     container.scrollTo({ behavior: "smooth", top });
//   }
// };

watchEffect(() => {
  groupSid.value;
  noteSid.value;
});

/* * * Handlers * * */

const onClickOutside = (e: MouseEvent): void => {
  groupsStore.selectById(null);
  sid.value = null;
};

/**
 * @description Depending on the entity type, sets a specific sid
 */
const onSelect = async ({
  id,
  parentId,
  type,
}: NodeEmittedData): Promise<void> => {
  if (type === HierarchyNodeTypes.DIR) {
    sid.value = id;
    groupsStore.selectById(id);
  } else if (type === HierarchyNodeTypes.FILE) {
    sid.value = id;
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
.hierarchy {
  position: relative;
  @include box(100%);
  overflow-x: hidden;
  overflow-y: auto;

  &__list {
    position: relative;
    height: 100%;
    padding: 10px;
    margin: 0;
    list-style: none;
  }
}
</style>
