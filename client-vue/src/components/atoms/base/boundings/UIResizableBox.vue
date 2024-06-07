<template lang="pug">
div.resizaable-box(
  ref="refRoot"
  :style="`width: ${width}px;`"
)
  div.resizaable-box__container
    slot
  div.resizaable-box__pane
    div.resizaable-box__pane__splitter(
      ref="refPane"
      data-testid="resizaable-box-pane-splitter"
      :class="[isSplitterShown ? 'show' : 'hide']"
    )
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

export interface Props {
  width: number;
  minWidth: number;
  maxWidth: number;
}

withDefaults(defineProps<Props>(), {
  width: 320,
  minWidth: 0,
  maxWidth: 480,
});

const refRoot = ref<HTMLDivElement | null>(null);
const refPane = ref<HTMLDivElement | null>(null);

const isEnter = ref(false);
const isSplitterShown = ref(false);

onMounted(() => {
  if (refPane.value) {
    refPane.value.addEventListener(
      "mouseenter",
      handleMouseEnter.bind(null, true)
    );
    refPane.value.addEventListener(
      "mouseleave",
      handleMouseEnter.bind(null, false)
    );
  }
});

onUnmounted(() => {
  if (refPane.value) {
    refPane.value.removeEventListener(
      "mouseenter",
      handleMouseEnter.bind(null, true)
    );
    refPane.value.removeEventListener(
      "mouseleave",
      handleMouseEnter.bind(null, false)
    );
  }
});

const handleMouseEnter = (state: boolean): void => {
  isEnter.value = state;
  isSplitterShown.value = state;
};

defineExpose({ refRoot });
</script>

<style lang="scss">
$__show-color: $c-accent-primary--light;
$__pressed-color: rgba(54, 85, 225, 0.443);

.resizaable-box {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;

  &__container {
    position: relative;
    display: block;
    width: 100%;
  }

  &__pane {
    position: relative;
    display: block;
    width: 1px;
    height: 100%;
    z-index: 1;
    cursor: ew-resize;

    &__splitter {
      position: absolute;
      display: block;
      left: -50%;
      width: 4px;
      height: 100%;
      z-index: 0;

      &.show {
        background-color: $__show-color;
      }

      &.pressed {
        background-color: $__pressed-color;
      }
    }
  }
}
</style>
