<template lang="pug">
div.main-sidebar
  UIUserMenu
  div.main-sidebar--content
    
    UINotes
</template>

<script setup lang="ts">
import UINotes from "@/components/moleculas/notes/UINotes.vue";
import UIUserMenu from "./UIUserMenu.vue";
</script>

<style lang="scss">
.main-sidebar {
  position: relative;
  display: flex;
  flex-direction: row;
  @include box(100%);

  &--content {
    position: relative;
    display: flex;
    flex-direction: row;
    @include box(100%);
  }
}
</style>
