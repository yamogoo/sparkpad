<template lang="pug">
div.main-viewport__tabbar-tab__shape
  UIMainViewportTabbarTabShapeSide(
    style="transform: scaleX(-1);"
  )
  div.main-viewport__tabbar-tab__shape--center
    slot
  UIMainViewportTabbarTabShapeSide
</template>

<script setup lang="ts">
import UIMainViewportTabbarTabShapeSide from "./UIMainViewportTabbarTabShapeSide.vue";
</script>

<style lang="scss">
.main-viewport__tabbar-tab__shape {
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
