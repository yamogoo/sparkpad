<template lang="pug">
div.search-panel(
  ref="refRoot"
  data-testid="search-panel"
  :class="[{[Classes.FOCUSED]: isFocused}]"
)
  div.search-panel--container
    div.search-panel__search-button(
      @click="() => { refInput && refInput.focus() }"
    )
      UISymbol(
        :name="Symbols.SEARCH"
      )
    input.--md(
      type="text"
      ref="refInput"
      data-testid="search-panel-input"
      v-model="modelValue"
      aria-label="search"
      @input="onSearch"
    )
    UIActionButton.search-panel__clear-button(
      v-if="modelValue !== ''"
      data-testid="search-panel-clear-button"
      :icon-name="Symbols.CROSS_FILL"
      aria-label="clear"
      @press="onClear"
    )
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from "vue";

import { useClickOutside } from "@/composables/useClickOutside";

import UISymbol, { Symbols } from "@/components/atoms/base/icons/UISymbol.vue";
import UIActionButton from "@/components/atoms/base/buttons/UIActionButton.vue";

const emits = defineEmits<{
  (e: "search", value: string): void;
}>();

const modelValue = ref("");

const refRoot: Ref<HTMLDivElement | null> = ref(null);
const refInput: Ref<HTMLInputElement | null> = ref(null);

const isFocused = ref(false);

onMounted(() => {
  if (refRoot.value) refRoot.value.addEventListener("pointerdown", onPress);
  document.addEventListener("keydown", onKeydownClear);
});

onUnmounted(() => {
  if (refRoot.value) refRoot.value.removeEventListener("pointerdown", onPress);
  document.removeEventListener("keydown", onKeydownClear);
});

const onPress = (): void => {
  onFocus(true);
};

/**
 * @description Focus on field
 */
const onFocus = (_isFocused: boolean): void => {
  if (refInput.value) {
    if (!_isFocused) {
      isFocused.value = _isFocused;
      return;
    }

    isFocused.value = _isFocused;
    refInput.value.focus();
  }
};

useClickOutside(refRoot, () => {
  onFocus(false);
});

const onSearch = (e: Event): void => {
  const value = (e.target as HTMLInputElement).value;
  emits("search", value);
};

/**
 * @description Clear input value
 */
const onClear = (): void => {
  modelValue.value = "";
  onFocus(true);
  emits("search", modelValue.value);
};

const onKeydownClear = (e: KeyboardEvent): void => {
  const { key } = e;

  if (key === "Escape") onClear();
};

defineExpose({
  refInput,
  onFocus,
});
</script>

<script lang="ts">
export enum Classes {
  FOCUSED = "focused",
}
</script>

<style lang="scss">
$__border-radius: $border-radius--input;

$search-panel: (
  height: 44px,
);

.search-panel {
  padding: 10px;

  &--container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0px;
    height: get("height", $search-panel);
    padding: 0px 3px;
    border-style: solid;
    border-width: 1px;
    border-radius: $__border-radius;

    @include themify($themes) {
      border-color: themed("border", "primary");
    }
  }

  &.focused {
    .search-panel--container {
      @include themify($themes) {
        background-color: themed("background", "primary");
        border-color: themed("border", "accent");
      }
    }
  }

  &__search-button {
    @include padding-h(12px);
    cursor: text;

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

  input {
    @extend %input;
    @include box(100%);
    background: none;
  }
}
</style>
