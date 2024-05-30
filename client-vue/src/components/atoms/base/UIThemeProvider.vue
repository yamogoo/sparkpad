<template lang="pug">
div.theme-provider
  p.theme-provider__label {{ theme }}
  UISwitch(
    :state="themeState"
    @update:state="onUpdateTheme"
  )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useConfigStore } from "@/stores/config";

import UISwitch from "@/components/atoms/base/switches/UISwitch.vue";

const configStore = useConfigStore();

const theme = computed(() => {
  return configStore.getTheme.theme;
});

const themeState = computed(() => {
  return !!configStore.getTheme.id;
});

const onUpdateTheme = (state: boolean) => {
  configStore.setTheme(state);
};
</script>

<style lang="scss">
.theme-provider {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 40px;

  &__label {
    font-size: 14px;
    @extend %transition;

    @include themify($themes) {
      color: themed("text", "disabled");
    }
  }
}
</style>
