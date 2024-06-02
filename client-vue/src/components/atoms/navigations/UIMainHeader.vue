<template lang="pug">
header.main-header(
  data-test-id="main-header"
)
  div.main-header__section
    UILogo(
      @click="onClickLogo"
    )
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import UILogo from "@/components/atoms/base/logos/UILogo.vue";

const router = useRouter();

const onClickLogo = () => {
  router.push({ path: "/private" });
};
</script>

<style lang="scss">
$main-header: (
  height: (
    sm: 44px,
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
