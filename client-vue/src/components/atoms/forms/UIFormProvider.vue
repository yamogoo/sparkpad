<template lang="pug">
div.form-provider
  UIFormError(
    :show="showError"
    :message="errorMessage"
    @update:show="onUpdateShowError"
  )
  slot(v-if="$slots.navigation" name="navigation")
  slot
</template>

<script setup lang="ts">
import UIFormError from "./UIFormError.vue";

interface Props {
  showError: boolean;
  errorMessage: string | undefined;
}

withDefaults(defineProps<Props>(), {
  showError: false,
});

const emits = defineEmits<{
  (e: "update:show-error", state: boolean): void;
}>();

const onUpdateShowError = (state: boolean): void => {
  emits("update:show-error", state);
};
</script>

<style lang="scss">
.form-provider {
  position: relative;
  overflow: hidden;
  height: max-content;
  @extend %transition;
  @include themify($themes) {
    background-color: themed("background", "primary");
  }

  @include respond-above(md) {
    // width: 640px !important;
    // @include padding-h(60px);
    // @include padding-v(40px);
    border-radius: 16px;
  }

  @include respond-below(md) {
    // width: 100% !important;
    // @include padding-h(20px);
    border-radius: 0px;
  }

  // &__header {}

  // &__body {}

  .form-error {
    height: 44px;
  }
}
</style>
