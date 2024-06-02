<template lang="pug">
div.symbol(
  data-test-id="symbol"
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
import { defineAsyncComponent } from "vue";

import { type SymbolProps } from "./types";

const props = withDefaults(defineProps<SymbolProps>(), {});

const component = defineAsyncComponent(() => {
  return import(`./symbols/${props.name}.vue`);
});
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
