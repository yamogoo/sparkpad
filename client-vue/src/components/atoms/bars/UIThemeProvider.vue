<template lang="pug">
div.theme-provider(
  data-testid="theme-provider"
)
  p.theme-provider__label(
    data-testid="theme-label"
  ) {{ theme }}
  UISwitch(
    :state="themeState"
    @update:state="onUpdateTheme"
  )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/stores/settings";

import UISwitch from "@/components/atoms/base/switches/UISwitch.vue";

const configStore = useSettingsStore();

const theme = computed(() => {
  return configStore.appTheme.theme;
});

const themeState = computed(() => {
  return !!configStore.appTheme.id;
});

const onUpdateTheme = (state: boolean) => {
  configStore.setAppTheme(state);
};
</script>

<style lang="scss">
.theme-provider {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  &__label {
    font-size: 14px;
    @extend %transition;

    @include themify($themes) {
      color: themed("text", "disabled");
    }
  }
}
</style>
