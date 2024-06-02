<template lang="pug">
div.input(
  :class="[{'error': isError}]"
)
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

const props = withDefaults(defineProps<Props>(), {
  verificationTimer: 100,
});

const emits = defineEmits<{
  (e: "update:value", value: string): void;
  (e: "verify:value"): void;
}>();

const modelValue = ref(props.value);

let timerId: ReturnType<typeof setTimeout> | undefined = undefined;

const onInput = (e: Event) => {
  clearTimeout(timerId);
  const value = (e.target as HTMLInputElement).value;
  emits("update:value", value);

  timerId = setTimeout(() => {
    emits("verify:value");
  }, props.verificationTimer);
};

/* * * Animations * * */
</script>

<script lang="ts">
export interface Props {
  label?: string;
  placeholder?: string;
  value: string;
  verificationTimer?: number;
  isError: boolean;
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
    outline: none;
    @extend %transition;

    @include themify($themes) {
      color: themed("text", "primary");
      border: 1px solid themed("border", "primary");
      background-color: themed("background", "primary");
    }
  }

  &.error {
    input {
      @include themify($themes) {
        color: themed("text", "error");
        border: 1px solid themed("border", "error");
      }
    }
  }
}
</style>
