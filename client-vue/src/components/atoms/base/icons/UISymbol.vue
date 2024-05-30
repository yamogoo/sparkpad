<template lang="pug">
components.symbol(:is="component")
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

import { type SymbolProps } from "./types";

const props = defineProps<SymbolProps>();

const component = defineAsyncComponent(() => {
  return import(`./symbols/${props.name}Icon.vue`);
});
</script>

<script lang="ts">
export { Symbols } from "./Symbols";
</script>

<style lang="scss">
.symbol {
  fill: inherit;

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
