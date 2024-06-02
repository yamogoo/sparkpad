<template lang="pug">
Teleport(to=".app--container")
  Transition(
    :css="false"
    @enter="onOverlayEnter"
    @leave="onOverlayLeave"
  )
    div.modal-overlay
      //- Change To Transition Provider
      Transition(
        :css="false"
        @enter="onModalEnter"
        @leave="onModalLeave"
      )
        div.modal-view(
          v-if="showModal"
          ref="refModalView"
        )
          slot
</template>

<script setup lang="ts">
import { onMounted, ref, Transition, Teleport } from "vue";
import g from "gsap";

import { useClickOutside } from "@/composables/useClickOutside";

interface Props {
  show: boolean;
}

defineProps<Props>();

const emits = defineEmits<{
  (e: "close"): void;
  (e: "open"): void;
}>();

const refModalView = ref<HTMLDivElement | null>(null);

const showModal = ref(false);

onMounted(() => {
  showModal.value = true;
  emits("open");
});

useClickOutside(refModalView, () => {
  onClose();
});

const onClose = (): void => {
  showModal.value = false;
  emits("close");
};

/* * * Animations * * */

const modalPositionYOut = 80;
const modalScaleOut = 0.95;

const onOverlayEnter = (el: Element, done: () => void): void => {
  g.fromTo(
    el,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.25,
      ease: "power4.out",
      onComplete: done,
    }
  );
};

const onOverlayLeave = (el: Element, done: () => void): void => {
  g.to(el, {
    opacity: 0,
    duration: 0.25,
    ease: "power4.in",
    onComplete: done,
  });
};

const onModalEnter = (el: Element, done: () => void): void => {
  g.fromTo(
    el,
    {
      opacity: 0,
      y: modalPositionYOut,
      scale: modalScaleOut,
    },
    {
      y: 0,
      scale: 1.0,
      opacity: 1,
      duration: 0.25,
      ease: "power4.out",
      onComplete: done,
    }
  );
};

const onModalLeave = (el: Element, done: () => void): void => {
  g.to(el, {
    opacity: 0,
    y: modalPositionYOut,
    scale: modalScaleOut,
    duration: 0.25,
    ease: "power4.out",
    onComplete: done,
  });
};
</script>

<style lang="scss">
$__border-radius: $border-radius;

.modal-overlay {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  @include all-bounds();
  @include box(100vw, 100vh);
  z-index: 100;

  @include themify($themes) {
    background-color: themed("background", "overlay");
  }
}

.modal-view {
  position: relative;
  display: flex;
  width: 720px;
  height: 420px;
  border-radius: $__border-radius;
  overflow: hidden;
  z-index: 9999;

  @include themify($themes) {
    border: 1px solid themed("border", "primary");
    background-color: themed("background", "primary");
  }
}
</style>
@/renderer/composables/useClickOutside
@/renderer/src/composables/useClickOutside
