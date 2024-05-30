<template lang="pug">
label.checkbox(
  :class="[state ? 'active' : 'normal']"
)
  input(
    v-bind="$attrs"
    type="checkbox"
    v-model="modelValue"
    @change="onToggle"
  )
  div.checkbox__track
    div.checkbox__flag
  span.checkbox__label(v-if="label") {{ label }}
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  state: boolean;
}

defineOptions({
  inheritAttrs: false,
});

const modelValue = defineModel();

defineProps<Props>();

const emits = defineEmits<{
  (e: "update:state", state: boolean): void;
}>();

const onToggle = (e: Event): void => {
  const state = (e.target as HTMLInputElement).checked;
  emits("update:state", state);
};
</script>

<style lang="scss">
$__size: 12px;

.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.75;
  }

  &__track {
    position: relative;
    @include box($__size);
    border-radius: 4px;
    padding: 0px;

    @include themify($themes) {
      border: 1px solid themed("border", "primary");
    }
  }

  &__flag {
    @include box(100%);
    border-radius: 3px;
    @extend %transition;
    @include themify($themes) {
      background-color: themed("background", "accent-primary");
    }
  }

  &.active {
    .checkbox__flag {
      opacity: 1;
    }
  }

  &.normal {
    .checkbox__flag {
      opacity: 0;
    }
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  &__label {
    font-size: 16px;
    @extend %transition;

    @include themify($themes) {
      color: themed("text", "secondary");
    }
  }
}
</style>
