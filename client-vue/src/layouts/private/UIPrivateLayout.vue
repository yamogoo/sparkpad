<template lang="pug">
div.main-layout
  div.main-layout__menu-view
    UIResizableBox(
      :width="isMainMenuMinimized ? 54 : navigatorBoundings.width"
      :min-width="navigatorBoundings.minWidth"
      :max-width="navigatorBoundings.maxWidth"
      :is-disabled="isMainMenuMinimized"
      @update:width="onUpdateMenuWidth"
    )
      div.main-layout__menu-view--container
        UIMainHeader
        UIMainSidebar
  div.main-layout__content-view
    div.main-layout__content-view--container
      UIMainViewport
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/stores/settings";

import UIMainHeader from "@/components/atoms/navigations/UIMainHeader.vue";
import UIResizableBox from "@/components/atoms/base/boundings/UIResizableBox.vue";
import UIMainSidebar from "@/components/atoms/menues/UIMainSidebar.vue";
import UIMainViewport from "@/components/moleculas/viewport/UIMainViewport.vue";

const settingsStore = useSettingsStore();

const navigatorBoundings = computed(() => settingsStore.navigatorBoundings);
const isMainMenuMinimized = computed(() => settingsStore.isMainMenuMinimized);

const onUpdateMenuWidth = (width: number): void => {
  settingsStore.setNavigatorWidth(width);
};
</script>

<style lang="scss">
$__base-padding: 8px;
$__border-radius: $border-radius;

.main-layout {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 0px;
  @include box(100%);

  &__menu-view {
    position: relative;
    height: 100%;
    padding: $__base-padding 0px $__base-padding $__base-padding;

    &--container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0px;
      @include box(100%);
      border-radius: $__border-radius;
      overflow: hidden;

      @include themify($themes) {
        background-color: themed("background", "primary");
        border: 1px solid themed("border", "window");
      }
    }

    .main-header {
      flex-grow: 1;
    }
  }

  &__content-view {
    position: relative;
    flex-grow: 1;
    padding: $__base-padding;

    &--container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0px;
      @include box(100%);
      border-radius: $__border-radius;
      overflow: hidden;

      @include themify($themes) {
        background-color: themed("background", "primary");
        border: 1px solid themed("border", "window");
      }
    }
  }
}
</style>
