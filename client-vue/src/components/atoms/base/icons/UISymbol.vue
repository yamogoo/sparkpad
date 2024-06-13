<template lang="pug">
div.symbol(
  data-testid="symbol"
  :data-test="name"
)
  component(
    v-if="!size"
    :is="component"
  )
  component(
    v-if="size"
    :is="component"
    :width="size"
    :height="size"
  )
</template>

<script setup lang="ts">
import { watch, defineAsyncComponent } from "vue";

import { type SymbolProps } from "./types";

const props = withDefaults(defineProps<SymbolProps>(), {});

let component: null = null;

const loadComponent = (name: string | undefined): void => {
  component = defineAsyncComponent(() => {
    return import(`./symbols/${name}.vue`);
  });
};

watch(
  () => props.name,
  () => {
    loadComponent(props.name);
  },
  { immediate: true }
);
</script>

<script lang="ts">
export { Symbols } from "./Symbols";
</script>

<style lang="scss">
.symbol {
  display: flex;
  @extend %transition;

  svg {
    fill: inherit;
    stroke: inherit;

    path {
      fill: inherit;
      stroke: inherit;

      g {
        fill: inherit;
        stroke: inherit;
      }
    }
  }
}
</style>
