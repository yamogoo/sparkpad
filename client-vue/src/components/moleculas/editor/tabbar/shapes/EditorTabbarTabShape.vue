<template lang="pug">
div.editor-tabbar-tab__shape
  EditorTabbarTabShapeSide(
    style="transform: scaleX(-1);"
  )
  div.editor-tabbar-tab__shape--center
    slot
  EditorTabbarTabShapeSide
</template>

<script setup lang="ts">
import EditorTabbarTabShapeSide from "./EditorTabbarTabShapeSide.vue";
</script>

<style lang="scss">
.editor-tabbar-tab__shape {
  display: flex;
  @include box(100%);

  &--center {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 36px;
    overflow: hidden;
  }
}
</style>
