<template lang="pug">
footer.main-footer(
    data-test-id="main-footer"
)
</template>

<script setup lang="ts"></script>

<style lang="scss">
$main-header: (
  height: (
    sm: 60px,
    md: 60px,
    lg: 80px,
  ),
);

.main-footer {
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
}
</style>
