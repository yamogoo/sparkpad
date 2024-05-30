<template lang="pug">
div.input
  div.input--container
    label.input__placeholder(v-if="label") {{ label }}
    input(
      type="text"
      v-model="modelValue"
      @input="onInput"
    )
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits<{
  (e: "update:value", value: string): void;
}>();

const modelValue = ref(props.value);

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emits("update:value", value);
};

/* * * Animations * * */
</script>

<script lang="ts">
export interface Props {
  label?: string;
  placeholder?: string;
  value: string;
}
</script>

<style lang="scss">
.input {
  &--container {
    @include box(100%);
  }

  &__placeholder {
    display: block;
    font-size: 14px;
    font-weight: 300;
    @include padding-v(2px, 12px);
    @extend %transition;

    @include themify($themes) {
      color: themed("text", "disabled");
    }
  }

  input {
    font-size: 18px;
    font-weight: 400;
    @include box(100%, 44px);
    @include padding-h(12px);
    box-sizing: border-box;
    border-radius: 6px;
    user-select: all;
    @extend %transition;

    @include themify($themes) {
      color: themed("text", "primary");
      border: 1px solid themed("border", "primary");
      outline-color: themed("border", "accent");
      background-color: themed("background", "primary");
    }
  }
}
</style>
