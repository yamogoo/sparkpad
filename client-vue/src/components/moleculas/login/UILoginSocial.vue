<template lang="pug">
div.social-logos
  div.social-logos__header
    h6 Or connect with
  div.social-logos__body
    UISocialLogo.social-logo(
      v-for="button in buttons"
      :key="button.id"
      :name="button.symbol"
      style="width: 28px; height: 28px;"
      @click="e => {onClick(e, button.id)}"
    )
</template>

<script setup lang="ts">
import UISocialLogo, {
  SocialLogos,
} from "@/components/atoms/base/logos/social-logos/UISocialLogo.vue";

interface Button {
  id: number;
  symbol: SocialLogos;
}

const buttons: Button[] = [
  {
    id: 1,
    symbol: SocialLogos.GOOGLE,
  },
  {
    id: 2,
    symbol: SocialLogos.TWITTER,
  },
];

const emits = defineEmits<{
  (e: "open", id: number): void;
}>();

const onClick = (e: MouseEvent | TouchEvent, id: number): void => {
  e.preventDefault();
  e.stopPropagation();

  emits("open", id);
};
</script>

<style lang="scss">
.social-logos {
  width: 100%;
  padding-top: 10px;
  margin-top: 20px;
  @extend %transition;

  @include themify($themes) {
    border-top: 1px solid themed("border", "primary");
  }

  .social-logo {
    cursor: pointer;
  }

  &__body {
    display: flex;
    flex-direction: row;
    gap: 30px;
    width: max-content;
    margin: auto;
  }

  &__header {
    h6 {
      display: block;
      font-size: 16px;
      font-weight: 300;
      width: max-content;
      margin: 16px auto;
      padding-bottom: 12px;
      @extend %transition;

      @include themify($themes) {
        color: themed("text", "disabled");
      }
    }
  }
}
</style>
