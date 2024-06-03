<template lang="pug">
div.auth-provider
  Transition(
    :css="false"
  )
    UIFormProvider.login-form(
      v-if="isMounted"
      :show-error="false"
      :error-message="''"
      @update:show-error="onUpdateShowError"
    )
      template(#navigation)
        RouterView
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import UIFormProvider from "@/components/atoms/forms/UIFormProvider.vue";

const isMounted = ref(false);

onMounted(() => (isMounted.value = true));

const onUpdateShowError = (): void => {};
</script>

<style lang="scss">
.auth-provider {
  position: relative;
  overflow: hidden;
  @include transition(all, 125ms, ease-out);
  // @extend %transition;
  @include themify($themes) {
    background-color: themed("background", "primary");
  }

  @include respond-above(md) {
    width: 640px !important;
    @include padding-h(60px);
    @include padding-v(40px);
    border-radius: 16px;
  }

  @include respond-below(md) {
    width: 100% !important;
    @include padding-h(20px);
    border-radius: 0px;
  }

  // &__header {}

  // &__body {}

  .form-error {
    height: 44px;
  }
}
</style>
