<template lang="pug">
div.error-overlay
Transition(
  :css="false"
  @enter="onErrorEnter"
  @leave="onErrorLeave"
)
  UIErrorMessage(
    v-if="showError"
    v-bind="$attrs"
  )
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import g from "gsap";

import UIErrorMessage from "./UIErrorMessage.vue";

defineOptions({
  inheritAttrs: false,
});

interface Props {
  message?: string;
  description?: string;
  show?: boolean;
}

withDefaults(defineProps<Props>(), {
  show: true,
});

const showError = ref(false);

onMounted(() => {
  showError.value = true;
});

/* * * Animations * * */

const errorPositionYOut = 80;
const errorScaleOut = 0.95;

const onErrorEnter = (el: Element, done: () => void): void => {
  g.fromTo(
    el,
    {
      opacity: 0,
      y: errorPositionYOut,
      scale: errorScaleOut,
    },
    {
      y: 0,
      scale: 1.0,
      opacity: 1,
      duration: 0.25,
      ease: "power4.out",
      onComplete: () => {
        setTimeout(() => {
          onErrorLeave(el, done);
          showError.value = false;
        }, 2000);
      },
    }
  );
};

const onErrorLeave = (el: Element, done: () => void): void => {
  g.to(el, {
    opacity: 0,
    y: errorPositionYOut,
    scale: errorScaleOut,
    duration: 0.25,
    ease: "power4.in",
    onComplete: done,
  });
};
</script>

<script lang="ts">
export interface ErrorContent {
  show: boolean;
  title?: string;
  description?: string;
}
</script>

<style lang="scss">
.error-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding-bottom: 40px;

  .error-message {
    margin: auto;
  }
}
</style>
