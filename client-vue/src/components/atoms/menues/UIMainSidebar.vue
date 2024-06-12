<template lang="pug">
div.main-sidebar
  UIUserMenu
  div.main-sidebar--content(
     v-if="showContent"
  )
    UINotes
</template>

<script setup lang="ts">
import UINotes from "@/components/moleculas/notes/UINotes.vue";
import UIUserMenu from "./UIUserMenu.vue";

interface Props {
  showContent?: boolean;
}

withDefaults(defineProps<Props>(), {
  showContent: true,
});
</script>

<style lang="scss">
.main-sidebar {
  position: relative;
  display: flex;
  flex-direction: row;
  @include box(100%);
  overflow: hidden;

  &--content {
    position: relative;
    display: flex;
    flex-direction: row;
    @include box(100%);
  }
}
</style>
