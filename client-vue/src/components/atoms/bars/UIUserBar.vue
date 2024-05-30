<template lang="pug">
div.user-bar
    UIAvatarThumbnail
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
  background-color: red;
  height: 100%;
}
</style>
