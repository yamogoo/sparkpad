<template lang="pug">
button.cell-button(
  data-test-id="cell-button"
  @click="onClick"
)
  div.cell-button__image(
    v-if="showImage"
    data-test-id="cell-button-image"
  )
    UIImageThumbnail(
      :url="imageUrl"
      :default-symbol
    )
  div.cell-button__content
    h5.cell-button__title(
      v-if="showTitle && title"
      data-test-id="cell-button-title"
    ) {{ title }}
    p.cell-button__description(
      v-if="showDescription && description"
      data-test-id="cell-button-description"
    ) {{ description }}
</template>

<script setup lang="ts">
import { Symbols } from "@/components/atoms/base/icons/Symbols";
import UIImageThumbnail from "@/components/atoms/base/thumbnails/UIImageThumbnail.vue";

interface Props {
  title?: string;
  showTitle?: boolean;
  description?: string;
  showDescription?: boolean;
  imageUrl?: string;
  defaultSymbol?: Symbols;
  showImage?: boolean;
}

withDefaults(defineProps<Props>(), {
  showTitle: true,
  showDescription: true,
  showImage: true,
});

const emits = defineEmits<{
  (e: "open"): void;
}>();

const onClick = (e: MouseEvent): void => {
  e.preventDefault();
  e.stopPropagation();
  emits("open");
};
</script>

<style lang="scss">
$border: $border-radius;

.cell-button {
  display: flex;
  align-items: center;
  gap: 10px;
  @include box(100%, 54px);
  padding: 0px 10px;
  border-radius: $border;
  overflow: hidden;

  @include themify($themes) {
    background-color: themed("background", "primary");
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 6px;
  }

  &__title,
  &__description {
    display: block;
    padding: 0;
    margin: 0;
  }

  &__title {
    font-size: 14px;
    font-weight: 400;

    @include themify($themes) {
      color: themed("text", "primary");
    }
  }

  &__description {
    font-size: 11px;
    font-weight: 400;

    @include themify($themes) {
      color: themed("text", "secondary");
    }
  }

  &:hover {
    @include themify($themes) {
      background-color: darken(themed("background", "primary"), 2%);
    }
  }
}
</style>
