<template lang="pug">
div.search-panel
  div.search-panel--container
    div.search-panel__search-button
      UISymbol(
        :name="Symbols.SEARCH"
      )
    input.--md(
      type="text"
      v-model="modelValue"
      @input="onSearch"
    )
    UIActionButton.search-panel__clear-button(
      v-if="modelValue !== ''"
      :icon-name="Symbols.CROSS_FILL"
      @press="onClear"
    )
</template>

<script setup lang="ts">
import { ref } from "vue";

import UISymbol, { Symbols } from "@/components/atoms/base/icons/UISymbol.vue";
import UIActionButton from "@/components/atoms/base/buttons/UIActionButton.vue";

const emits = defineEmits<{
  (e: "search", value: string): void;
}>();

const modelValue = ref("");

const onSearch = (e: Event): void => {
  const value = (e.target as HTMLInputElement).value;
  emits("search", value);
};

const onClear = (): void => {
  modelValue.value = "";
  emits("search", modelValue.value);
};
</script>

<style lang="scss">
$__border-radius: $border-radius--input;

$search-panel: (
  height: 44px,
);

.search-panel {
  &--container {
    display: flex;
    flex-direction: row;
    gap: 8px;
    height: get("height", $search-panel);
    border-style: solid;
    border-width: 1px;
    border-radius: $__border-radius;
  }

  &__search-button {
    @include padding-h(12px);

    .symbol {
      @include themify($themes) {
        fill: themed("icon", "primary");
      }
    }
  }

  &__clear-button {
    .symbol {
      @include themify($themes) {
        fill: themed("icon", "primary");
      }
    }
  }

  &--container {
    display: flex;
    flex-direction: row;
    align-items: center;

    @include themify($themes) {
      background-color: themed("background", "primary");
      border-color: themed("border", "secondary");
    }
  }

  input {
    @extend %input;
    @include box(100%);
    background: none;
  }
}
</style>
