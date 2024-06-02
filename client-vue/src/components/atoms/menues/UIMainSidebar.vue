<template lang="pug">
div.main-sidebar
  UIUserMenu
</template>

<script setup lang="ts">
import UIUserMenu from "./UIUserMenu.vue";
</script>

<style lang="scss">
.main-sidebar {
  @include box(100%);
  // @include themify($themes) {
  //   border-right: 1px solid themed("border", "primary");
  // }

  &__container {
    position: relative;
    @include box(100%);
  }
}
</style>
