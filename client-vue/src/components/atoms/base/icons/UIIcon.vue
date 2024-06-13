<template lang="pug">
div.icon(v-if="name")
  UISymbol(:name :size)
</template>

<script setup lang="ts">
import UISymbol from "./UISymbol.vue";
import type { SymbolProps } from "./types";

interface Props extends SymbolProps {
  size?: number | string;
}

withDefaults(defineProps<Props>(), {
  size: 16,
});
</script>

<script lang="ts">
export { Symbols } from "./Symbols";
</script>

<style lang="scss">
.icon {
  display: flex;
  align-items: center;
  justify-content: center;

  @include themify($themes) {
    fill: themed("icon", "primary");
  }
}
</style>
