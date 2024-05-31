<template lang="pug">
header.main-header
    div.main-header__section
        UILogo
    div.main-header__section
        UIUserBar(
            title="user name"
            description="email"
        )
</template>

<script setup lang="ts">
import UILogo from "@/components/atoms/base/logos/UILogo.vue";
import UIUserBar from "@/components/atoms/bars/UIUserBar.vue";

interface Props {
  isLoggedin: boolean;
}

defineProps<Props>();
</script>

<style lang="scss">
$main-header: (
  height: (
    sm: 60px,
    md: 60px,
    lg: 80px,
  ),
);

.main-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  @extend %transition;
  @include themify($themes) {
    background-color: themed("background", "primary");
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
