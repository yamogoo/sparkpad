<template lang="pug">
div.key-tooltip(
  data-testid="key-tooltip"
)
  span {{ content }}
</template>

<script setup lang="ts">
interface Props {
  content: string;
}

defineProps<Props>();
</script>

<script lang="ts">
export { KeyboardSymbols } from "@/components/atoms/base/icons/Symbols";
</script>

<style lang="scss">
$__border-radius: 4px;

.key-tooltip {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $__border-radius;
  border-style: solid;
  border-width: 1px;
  @include padding-h(10px);
  @include box(max-content, 28px);

  @include themify($themes) {
    color: themed("text", "disabled");
    border-color: themed("border", "primary");
    background-color: themed("background", "primary");
  }

  * {
    display: block;
    white-space: nowrap;
    @include box(max-content);
  }
}
</style>
