<template lang="pug">
div.hierarchy-menu-control-bar(
  data-testid="notes-control-bar"
)
  div.hierarchy-menu-control-bar__section
    //- UIActionButton(
    //-   :icon-name="Symbols.SEARCH"
    //-   aria-label="search"
    //-   @press="onSearch"
    //- )
  div.hierarchy-menu-control-bar__section
    //- UIActionButton(
    //-   :icon-name="Symbols.DELETE_ITEM"
    //-   aria-label="delete all data"
    //-   @press="onDeleteAll"
    //- )
    UIActionButton(
      v-if="fileSid !== null"
      :icon-name="Symbols.DELETE_ITEM"
      aria-label="delete"
      @press="onDeleteItem"
    )
    UIActionButton(
      :icon-name="Symbols.ADD_DIR"
      aria-label="new directory"
      @press="onCreateDir"
    )
    UIActionButton(
      :icon-name="Symbols.ADD_FILE"
      aria-label="new file"
      @press="onCreateFile"
    )
</template>

<script setup lang="ts">
import { type HierarchyNodeSid } from "@/typings";

import { Symbols } from "@/components/atoms/base/icons/Symbols";
import UIActionButton from "@/components/atoms/base/buttons/UIActionButton.vue";

interface Props {
  dirSid: HierarchyNodeSid;
  fileSid: HierarchyNodeSid;
}

defineProps<Props>();

const emits = defineEmits<{
  (e: "create:note"): void;
  (e: "create:dir"): void;
  (e: "delete:item"): void;
  (e: "search", value: string): void;
}>();

const onCreateFile = (): void => {
  emits("create:note");
};

const onCreateDir = (): void => {
  emits("create:dir");
};

const onDeleteItem = (): void => {
  emits("delete:item");
};

// const onDeleteAll = (): void => {
//   emits("delete:all");
// };
</script>

<style lang="scss">
$__height: 48px;

.hierarchy-menu-control-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: $__height;
  @include padding-h(8px);

  @include themify($themes) {
    border-bottom: 1px solid themed("border", "secondary");
  }

  &__section {
    display: flex;
    flex-direction: row;
    gap: 2px;
  }
}
</style>
