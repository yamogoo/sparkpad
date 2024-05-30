<template lang="pug">
button.button(
  :aria-label="label"
  @click="onClick"
)
  span.button__label(
    v-if="label"
  ) {{ label }}
  UIIcon(
    v-if="iconName"
    :name="iconName"
  )
</template>

<script setup lang="ts">
import UIIcon from "@/components/atoms/base/icons/UIIcon.vue";
import type { Symbols } from "@/components/atoms/base/icons/Symbols";

interface Props {
  id?: number;
  label?: string;
  iconName?: Symbols;
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
});

const emits = defineEmits<{
  (e: "press", id: number): void;
}>();

const onClick = (e: MouseEvent | TouchEvent): void => {
  e.preventDefault();
  emits("press", props.id);
};
</script>

<style lang="scss">
.button {
  height: 44px;
  @include padding-h(20px);
  box-sizing: content-box;
  border-radius: 6px;
  @extend %transition;

  @include themify($themes) {
    background-color: themed("background", "accent-primary");
  }

  &:hover {
    @include themify($themes) {
      background-color: darken(
        themed("background", "accent-primary"),
        6%
      ) !important;
    }
  }

  &:active {
    @include themify($themes) {
      background-color: darken(
        themed("background", "accent-primary"),
        16%
      ) !important;
    }
  }

  &__label {
    @extend %transition;
    color: $c-text-primary--invert;
  }
}
</style>
