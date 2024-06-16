<template lang="pug">
header.main-header(
  data-testid="main-header"
)
  div.main-header__section
    UILogo(
      :isMinimized
      @click="onClickLogo"
    )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { PrivateRoutes } from "@/router";

import { useSettingsStore } from "@/stores/settings";

import UILogo from "@/components/atoms/base/logos/UILogo.vue";

const router = useRouter();

const settingsStore = useSettingsStore();

const isMinimized = computed(() => settingsStore.isMainMenuMinimized);

const onClickLogo = () => {
  router.push({ path: PrivateRoutes.EDITOR });
};
</script>

<style lang="scss">
$main-header: (
  height: (
    sm: 48px,
    md: 64px,
    lg: 64px,
  ),
);

.main-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 4px 12px;
  padding-left: 20px;

  @extend %transition;
  @include themify($themes) {
    background-color: themed("background", "primary");
    border-bottom: 1px solid themed("border", "primary");
  }

  @include respond-above(lg) {
    height: get("height.lg", $main-header);
  }

  @include respond-between(md, lg) {
    height: get("height.md", $main-header);
  }

  @include respond-below(md) {
    height: get("height.sm", $main-header);
  }

  &__section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>
