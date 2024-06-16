<template lang="pug">
div.app--container(
  data-testid="app-container"
  :class="[`theme-${theme}`]"
)
  div.app--content
    RouterView
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useSettingsStore } from "@/stores/settings";

const configStore = useSettingsStore();

const theme = computed(() => {
  return configStore.appTheme.theme;
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

  p {
    margin: 0;
  }
}

#app {
  position: relative;
  letter-spacing: 0.03em;
  @include box(100vw, 100vh);

  * {
    font-family: "Caros";
    box-sizing: border-box;
  }
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
