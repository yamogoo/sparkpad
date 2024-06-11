<template lang="pug">
div.editor-menu__group
  slot
  div.editor-menu__group__separator(v-if="showPane")
</template>

<script setup lang="ts">
interface Props {
  showPane?: boolean;
}

withDefaults(defineProps<Props>(), {
  showPane: true,
});
</script>

<style lang="scss">
.editor-menu__group {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 4px;
  @include box(auto, 100%);

  &__separator {
    margin: 4px;
    height: 100%;

    &::before {
      content: "";
      display: block;
      @include box(100%);

      @include themify($themes) {
        border-left: 1px solid themed("border", "primary");
      }
    }
  }
}
</style>
