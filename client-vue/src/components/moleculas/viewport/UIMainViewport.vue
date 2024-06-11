<template lang="pug">
div.main-viewport
  UIMainViewportTabbar
  div.main-viewport__content
    UIMDXEditor
</template>

<script setup lang="ts">
import UIMainViewportTabbar from "./tabbar/UIMainViewportTabbar.vue";
import UIMDXEditor from "@/components/moleculas/mdxEditor/UIMDXEditor.vue";
</script>

<style lang="scss">
.main-viewport {
  display: flex;
  flex-direction: column;
  @include box(100%);

  &-tabbar {
    flex-grow: 1;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    @include box(100%);

    @include themify($themes) {
      background-color: themed("background", "primary");
    }

    p {
      @include themify($themes) {
        color: themed("text", "primary");
      }
    }
  }
}
</style>
