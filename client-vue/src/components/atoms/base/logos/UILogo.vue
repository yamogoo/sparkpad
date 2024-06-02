<template lang="pug">
UIIcon.logo--sm(
  data-test-id="logo"
  :name="Symbols.LOGO_WITH_DESCRIPTOR_SM"
  style="cursor: pointer;"
  size="120"
)
</template>

<script setup lang="ts">
import UIIcon, { Symbols } from "@/components/atoms/base/icons/UIIcon.vue";
</script>

<style lang="scss">
.logo--sm {
  @include themify($themes) {
    fill: themed("background", "primary--invert") !important;
  }
}
</style>
