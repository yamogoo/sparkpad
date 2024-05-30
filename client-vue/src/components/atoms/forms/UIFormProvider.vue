<template lang="pug">
div.form-provider
  slot
</template>

<script setup lang="ts"></script>

<style lang="scss">
.form-provider {
  @extend %transition;
  @include themify($themes) {
    background-color: themed("background", "primary");
  }

  @include respond-above(md) {
    width: 540px !important;
    @include padding-h(60px);
    @include padding-v(40px);
    border-radius: 16px;
  }

  @include respond-below(md) {
    width: 100% !important;
    @include padding-h(20px);
    border-radius: 0px;
  }

  &__header {
  }

  &__body {
  }
}
</style>
