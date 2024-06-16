<template lang="pug">
div.editor-menu(
    data-testid="editor-content-menu"
)
    MDXEditorMenuGroup
        UIActionButton(
            :icon-name="Symbols.EDITOR_UNDO_BUTTON"
            :is-disabled="true"
            aria-label="undo"
            @on-click="onUndo"
        )
        UIActionButton(
            :icon-name="Symbols.EDITOR_RENDO_BUTTON"
            :is-disabled="true"
            aria-label="rendo"
            @on-click="onRendo"
        )
    MDXEditorMenuGroup
        UIActionButton(
            :icon-name="Symbols.EDITOR_STYLE_BOLD"
            :is-disabled="true"
            aria-label="bold"
        )
        UIActionButton(
            :icon-name="Symbols.EDITOR_STYLE_ITALIC"
            :is-disabled="true"
            aria-label="italic"
        )
        UIActionButton(
            :icon-name="Symbols.EDITOR_STYLE_UNDERLINE"
            :is-disabled="true"
            aria-label="underline"
        )
        UIActionButton(
            :icon-name="Symbols.EDITOR_FORMAT_CODE"
            :is-disabled="true"
            aria-label="code format"
        )
        UIActionButton(
            :icon-name="Symbols.EDITOR_FORMAT_LIST"
            :is-disabled="true"
            aria-label="list format"
        )
</template>

<script setup lang="ts">
import { Symbols } from "@/components/atoms/base/icons/Symbols";

import MDXEditorMenuGroup from "./MDXEditorMenuGroup.vue";
import UIActionButton from "@/components/atoms/base/buttons/UIActionButton.vue";

const onUndo = () => {
  console.log("on undo");
};

const onRendo = () => {
  console.log("on rendo");
};
</script>

<style lang="scss">
.editor-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 4px 20px;

  @include themify($themes) {
    border-bottom: 1px solid themed("border", "primary");
  }
}
</style>
