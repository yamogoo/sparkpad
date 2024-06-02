<template lang="pug">
div.public-layout
  RouterView
  UIThemeProvider(
    style="position: fixed; top: 0; right: 0;"
  )
  UITaskBox(
    style="position: fixed; bottom: 0; left: 0;"
  )
</template>

<script setup lang="ts">
import UIThemeProvider from "@/components/atoms/bars/UIThemeProvider.vue";

import UITaskBox from "@/components/atoms/base/task/UITaskBox.vue";
</script>

<style lang="scss">
.public-layout {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @include box(100%);
}
</style>
