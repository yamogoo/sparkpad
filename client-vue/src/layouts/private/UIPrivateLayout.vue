<template lang="pug">
div.main-layout
  div.main-layout__menu-view
    UIExpandableBox(
      :width="420"
      :min-width="240"
      :max-width="640"
    )
      div.main-layout__menu-view--container
        UIMainHeader
        UIMainSidebar
  div.main-layout__content-view
    div.main-layout__content-view--container
      UIEditor
</template>

<script setup lang="ts">
import UIMainHeader from "@/components/atoms/navigations/UIMainHeader.vue";
// import UIMainFooter from "@/components/atoms/navigations/UIMainFooter.vue";
import UIExpandableBox from "@/components/atoms/base/boundings/UIResizableBox.vue";
import UIMainSidebar from "@/components/atoms/menues/UIMainSidebar.vue";
import UIEditor from "@/components/moleculas/editor/UIEditor.vue";
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
