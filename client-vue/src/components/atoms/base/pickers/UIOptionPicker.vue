<template lang="pug">
div.ui-option-picker
  button.ui-option-picker__value(
    @click="onOpenMenu"
  )
    span {{ initOption.label }}
  ul.ui-option-picker__menu(role="menu")
    li.ui-option-picker__option(
      v-for="option, idx in options"
      :key="idx"
      :tabindex="0"
      :aria-label="option.label"
    ) {{ option.label }}
</template>

<script setup lang="ts">
interface Props {
  options: PickerOption[];
  initOption: PickerOption;
}

withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (e: "update:option", option: PickerOption): void;
}>();

const onOpenMenu = () => {};
</script>

<script lang="ts">
export interface PickerOption<T = any> {
  label: string;
  value: T;
}
</script>

<style lang="scss">
.option-picker {
  @include box(auto, max-content);

  &__value {
    cursor: pointer;
  }

  &__menu,
  ul {
    position: absolute;
    cursor: pointer;
  }

  //   &__option {}
}
</style>
