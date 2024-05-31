<template lang="pug">
div.avatar-thumbnail(
  :class="[]"
)
    image.avatar-thumbnail__image(
        data-test-id="avatar-thumbnail-image"
        v-if="url && useDefaultImage"
        :alt="description" :src="url"
    )
    UISymbol(
        v-if="!url && useDefaultImage"
        :name="defaultSymbol"
    )
    span(
        v-if="!(url && useDefaultImage)"
    ) {{ shortText?.slice(2) }}
</template>

<script setup lang="ts">
import UISymbol, { Symbols } from "@/components/atoms/base/icons/UISymbol.vue";

interface Props {
  url?: string;
  description?: string;
  useDefaultImage?: boolean;
  defaultSymbol?: Symbols;
  shortText?: string;
}

withDefaults(defineProps<Props>(), {
  useDefaultImage: true,
  defaultSymbol: Symbols.AVATAR_DEFAULT,
  description: "thumbnail",
});
</script>

<style lang="scss">
$avatar-thumbnail: (
  size: (
    sm: 32px,
    md: 44px,
    lg: 54px,
  ),
);

.avatar-thumbnail {
  @include box(get("size.md", $avatar-thumbnail));
  border-radius: calc(get("size.md", $avatar-thumbnail) / 2);

  @include themify($themes) {
    background-color: themed("background", "secondary");
  }

  &__image {
    object-fit: cover;
  }
}
</style>
