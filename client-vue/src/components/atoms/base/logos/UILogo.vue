<template lang="pug">
div.main-logo
  UIIcon.main-logo__image(
    data-testid="logo"
    :name="Symbols.LOGO"
    style="cursor: pointer;"
    width="18"
    height="100%"
  )
  div.main-logo__descriptor--container
    Transition(
      :css="false"
      @enter="onEnter"
    )
      UIIcon.main-logo__descriptor(
        v-if="!isMinimized"
        data-testid="logo"
        :name="Symbols.LOGO_DESCRIPTOR"
        style="cursor: pointer;"
        :width="`${DESCRIPTOR_WIDTH}`"
        height="100%"
      )
</template>

<script setup lang="ts">
import g from "gsap";

import UIIcon, { Symbols } from "@/components/atoms/base/icons/UIIcon.vue";

const DESCRIPTOR_WIDTH = 84;

interface Props {
  isMinimized?: boolean;
}

withDefaults(defineProps<Props>(), {
  isMinimized: false,
});

const onEnter = (el: Element, done: () => void): void => {
  g.fromTo(
    el,
    {
      x: -DESCRIPTOR_WIDTH,
      opacity: 0.0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.35,
      ease: "power4.out",
      onComplete: done,
    }
  );
};
</script>

<style lang="scss">
.main-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  &__descriptor--container {
    position: relative;
    height: max-content;
    overflow: hidden;
  }
}

.logo--sm {
  @include themify($themes) {
    fill: themed("background", "primary--invert") !important;
  }
}
</style>
