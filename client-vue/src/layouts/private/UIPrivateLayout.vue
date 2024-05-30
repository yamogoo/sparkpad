<template lang="pug">
div.main-layout
  UIMainHeader(
    :isLoggedin="false"
  )
  RouterView
  UIMainFooter
</template>

<script setup lang="ts">
import UIMainFooter from "@/components/atoms/navigations/UIMainFooter.vue";
import UIMainHeader from "@/components/atoms/navigations/UIMainHeader.vue";
</script>

<style lang="scss">
.main-layout {
  position: relative;
  display: block;
  @include box(100%);
}
</style>
