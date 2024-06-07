<template lang="pug">
div.image-thumbnail(
  data-testid="image-thumbnail"
)
  img(
    v-if="url"
    :src="url"
    :alt="metaDescription"
  )
  UIIcon(
    v-if="url === undefined && defaultSymbol"
    :size="'100%'"
    :name="defaultSymbol"
  )
</template>

<script setup lang="ts">
import UIIcon, { Symbols } from "@/components/atoms/base/icons/UISymbol.vue";

interface Props {
  url?: string;
  defaultSymbol?: Symbols;
  metaDescription?: string;
}

withDefaults(defineProps<Props>(), {
  url: undefined,
  metaDescription: "",
});
</script>

<style lang="scss">
.image-thumbnail {
  display: block;
  @include box(36px);
  border-radius: 18px;
  overflow: hidden;

  @include themify($themes) {
    background-color: rgba(#ffffff, 0.07); //themed('background', 'primary');
  }

  .icon {
    @include themify($themes) {
      fill: themed("background", "app");
    }
  }
}
</style>
