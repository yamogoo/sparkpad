<template lang="pug">
button.action-button(
  :class="[{'disabled': isDisabled, 'active': isActive}]"
  data-testid="action-button"
  @click="onClick"
)
  UISymbol(
    v-if="iconName"
    :name="iconName"
  )
  span {{ label }}
</template>

<script setup lang="ts">
import UISymbol, { Symbols } from "@/components/atoms/base/icons/UISymbol.vue";

interface Props {
  id?: number;
  iconName?: Symbols;
  isActive?: boolean;
  isDisabled?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  isDisabled: false,
});

export interface Emits {
  (e: "press", id: number): void;
}

const emit = defineEmits<Emits>();

const onClick = (e: MouseEvent | TouchEvent): void => {
  e.preventDefault();
  e.stopPropagation();

  if (!props.isDisabled) emit("press", props.id);
};
</script>

<style lang="scss">
$__border-radius: $border-radius;

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  @include padding-v(8px);
  @include padding-h(12px);
  border-radius: calc($__border-radius / 2);
  border: 1px solid transparent;
  overflow: hidden;

  .symbol {
    @include themify($themes) {
      fill: themed("text", "primary");
    }
  }

  &:hover {
    @include themify($themes) {
      background-color: themed("button", "hover");
    }
  }

  &.active {
    // .symbol {
    //   @include themify($themes) {
    //     fill: orange; // themed("button", "accent");
    //   }
    // }
    @include themify($themes) {
      border: 1px solid themed("border", "primary");
      background-color: themed("button", "hover");
    }
  }

  &.disabled {
    opacity: 0.35;
  }
}
</style>
