<template lang="pug">
div.mdx-editor(
  data-testid="mdx-editor"
)
  div.mdx-editor__header
    UIMDXEditorContentMenu
  div.mdx-editor__content
    RouterView
</template>

<script setup lang="ts">
import UIMDXEditorContentMenu from "./content-menu/UIMDXEditorContentMenu.vue";
</script>

<style lang="scss">
.mdx-editor {
  position: relative;
  @include box(100%);

  &__content {
    position: relative;
    @include box(100%);
  }
}
</style>
