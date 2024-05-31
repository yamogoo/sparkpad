<template lang="pug">
div.user-bar
    UIAvatarThumbnail
    p {{ title }}
    p {{ description }}
</template>

<script setup lang="ts">
import UIAvatarThumbnail from "@/components/atoms/base/thumbnails/UIAvatarThumbnail.vue";

interface Props {
  title: string;
  description?: string;
}

defineProps<Props>();
</script>

<style lang="scss">
.user-bar {
  display: inline-block;
  height: 100%;
  @extend %transition;

  @include themify($themes) {
    background-color: themed("background", "primary");
  }
}
</style>
