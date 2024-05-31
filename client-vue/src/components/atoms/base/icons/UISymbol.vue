<template lang="pug">
div.symbol(
  data-test="symbol"
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
  fill: inherit;
  @extend %transition;

  svg {
    @include box(100%);
  }

  svg,
  path,
  g {
    fill: inherit;
  }
}
</style>
