<template lang="pug">
div.main-sidebar
  UIUserMenu
  div.main-sidebar--content(
     v-if="showContent"
  )
    UINavigator
</template>

<script setup lang="ts">
import UINavigator from "@/components/moleculas/navigator/UINavigator.vue";
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
