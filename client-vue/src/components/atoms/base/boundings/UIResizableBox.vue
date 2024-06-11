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

const props = withDefaults(defineProps<Props>(), {
  initWidth: 320,
  minWidth: 0,
  maxWidth: 480,
});

const emits = defineEmits<{
  (e: "update:width", width: number): void;
}>();

const refRoot = ref<HTMLDivElement | null>(null);
const refPane = ref<HTMLDivElement | null>(null);

const isSplitterShown = ref(false);

onMounted(() => {
  if (refPane.value) {
    refPane.value.addEventListener("mouseenter", onMouseEnter.bind(null, true));
    refPane.value.addEventListener(
      "mouseleave",
      onMouseEnter.bind(null, false)
    );

    refPane.value.addEventListener("pointerdown", onDragStart);
  }
});

onUnmounted(() => {
  if (refPane.value) {
    refPane.value.removeEventListener(
      "mouseenter",
      onMouseEnter.bind(null, true)
    );
    refPane.value.removeEventListener(
      "mouseleave",
      onMouseEnter.bind(null, false)
    );

    refPane.value.removeEventListener("pointerdown", onDragStart);
  }
});

const onMouseEnter = (state: boolean): void => {
  if (!(state === false && isResizing)) {
    isSplitterShown.value = state;
  }
};

let isResizing = false;
let currentPosX = 0;
let width = props.width;

const onDragStart = (e: PointerEvent): void => {
  e.preventDefault();
  e.stopPropagation();

  isResizing = true;
  onMouseEnter(true);

  const onDragMove = (e: PointerEvent): void => {
    if (isResizing && refRoot.value) {
      const rootBoundings = refRoot.value.getBoundingClientRect();

      currentPosX = e.clientX;
      width = currentPosX - rootBoundings.left;

      if (width > props.minWidth && width < props.maxWidth) {
        // refRoot.value.style.width = `${width}px`;
        // refRoot.value.style.minWidth = `${width}px`;
        emits("update:width", width);
      }
    }
  };

  const onDragEnd = (e: PointerEvent): void => {
    isResizing = false;
    onMouseEnter(false);
  };

  document.addEventListener("pointermove", onDragMove);
  document.addEventListener("pointerup", onDragEnd);
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
    position: absolute;
    display: block;
    right: 0;
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
