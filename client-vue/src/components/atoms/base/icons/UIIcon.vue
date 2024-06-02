<template lang="pug">
div.icon
  UISymbol(:name)
</template>

<script setup lang="ts">
import UISymbol from "./UISymbol.vue";
import type { SymbolProps } from "./types";

interface Props extends SymbolProps {
  size?: number | string;
}

defineProps<Props>();
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
