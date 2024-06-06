<template lang="pug">
div.main-viewport
  UIMainViewportTabbar
  //- div.main-viewport__tools
  //-   UIMainMenu
  div.main-viewport__content
    RouterView
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import UIMainViewportTabbar from "./tabbar/UIMainViewportTabbar.vue";
// import UIEditorMenu from "./tabbar/content-menu/UIEditorMenu.vue";
</script>

<style lang="scss">
.main-viewport {
  display: flex;
  flex-direction: column;
  @include box(100%);

  &-tabbar {
    flex-grow: 1;
  }

  &__tools {
    .editor-menu {
      min-height: 44px;
    }
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
