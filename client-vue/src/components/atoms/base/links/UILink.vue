<template lang="pug">
a.link(
  :href="to"
  @click="onClick"
)
  UISymbol(
    v-if="iconName"
    :name="iconName"
  )
  span.link__label(v-if="label") {{ label }}
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import UISymbol from "@/components/atoms/base/icons/UISymbol.vue";
import type { Symbols } from "@/components/atoms/base/icons/Symbols";

const router = useRouter();

interface Props {
  to: string;
  label?: string;
  iconName?: Symbols;
}

const props = defineProps<Props>();

const onClick = (e: MouseEvent | TouchEvent): void => {
  e.preventDefault();

  router.push({ path: props.to });
};
</script>

<style lang="scss">
.link {
  font-size: 16px;
  cursor: pointer;

  &__label {
    @extend %transition;

    @include themify($themes) {
      color: themed("text", "primary");
    }

    &:hover {
      opacity: 0.5;
      @include themify($themes) {
        color: themed("text", "accent") !important;
      }
    }
  }

  &.md {
    font-size: 18px;
  }
}
</style>
