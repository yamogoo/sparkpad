<template lang="pug">
div.editor-view
  //- UIEditorTabbar
  //- div.editor-view__tools
  //-   UIEditorMenu
  div.editor-view__content
    RouterView
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import UIEditorTabbar from "./tabbar/UIEditorTabbar.vue";
// import UIEditorMenu from "./tabbar/content-menu/UIEditorMenu.vue";
</script>

<style lang="scss">
.editor-view {
  display: flex;
  flex-direction: column;
  @include box(100%);

  .editor-tabbar {
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
