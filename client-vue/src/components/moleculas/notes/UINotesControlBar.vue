<template lang="pug">
div.notes-control-bar(
  data-testid="notes-control-bar"
)
  div.notes-control-bar__section
    UIActionButton(
      :icon-name="Symbols.SEARCH"
      aria-label="search"
      @press="onSearch"
    )
  div.notes-control-bar__section
    UIActionButton(
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
import { Symbols } from "@/components/atoms/base/icons/Symbols";
import UIActionButton from "@/components/atoms/base/buttons/UIActionButton.vue";

const emits = defineEmits<{
  (e: "create:note"): void;
  (e: "create:dir"): void;
  (e: "delete:note"): void;
  (e: "search:note"): void;
}>();

const onCreateFile = () => {
  emits("create:note");
};

const onCreateDir = () => {
  emits("create:dir");
};

const onDeleteItem = () => {
  emits("delete:note");
};

const onSearch = () => {
  emits("search:note");
};
</script>

<style lang="scss">
.notes-control-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  height: 60px;
  @include padding-h(8px);

  @include themify($themes) {
    // border-bottom: 1px solid themed("border", "primary");
  }

  &__section {
    display: flex;
    flex-direction: row;
    gap: 2px;
  }
}
</style>
