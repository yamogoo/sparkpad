<template lang="pug">
div.app--container(
    :class="[`theme-${theme}`]"
)
  div.app--content
    RouterView
    UITaskBox(
      style="position: fixed; bottom: 0; left: 0;"
    )
    UIThemeProvider(
      style="position: fixed; top: 0; right: 0;"
    )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView } from "vue-router";

import { useConfigStore } from "@/stores/config";

import UITaskBox from "@/components/atoms/base/task/UITaskBox.vue";
import UIThemeProvider from "@/components/atoms/base/UIThemeProvider.vue";

const configStore = useConfigStore();

const theme = computed(() => {
  return configStore.getTheme.theme;
});
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;

  *::selection {
    background-color: $c-app-selection;
  }
}

#app {
  position: relative;
  font-family: "Caros";
  letter-spacing: 0.03em;
  @include box(100vw, 100vh);
}

.app--container {
  position: relative;
  @include box(100%);
}

.app--content {
  position: relative;
  @include box(100%);

  @include themify($themes) {
    background-color: themed("background", "secondary");
  }
}
</style>
