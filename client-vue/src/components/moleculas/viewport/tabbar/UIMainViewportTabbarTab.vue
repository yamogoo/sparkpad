<template lang="pug">
div.main-viewport__tabbar-tab(
  ref="refRoot"
  :class="[{'active': isActive}]"
)
  div.main-viewport__tabbar-tab--container
    EditorTabbarTabShape
      span.main-viewport__tabbar-tab__label {{ title.length > 15 ? `${title.slice(0, 15)}...` : title }}
      UIIcon(
        v-if="isActive"
        :name="Symbols.CROSS"
        @click="onClose"
      )
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import g from "gsap";

import EditorTabbarTabShape from "./shapes/UIMainViewportTabbarTabShape.vue";
import UIIcon, { Symbols } from "@/components/atoms/base/icons/UIIcon.vue";

interface Props {
  id: number;
  title?: string;
  isActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "empty",
});

const emits = defineEmits<{
  (e: "open", id: number): void;
  (e: "close", id: number): void;
  (e: "update:idx", newIdx: number, oldIdx: number): void;
}>();

const onClose = (e: MouseEvent): void => {
  e.preventDefault();
  e.stopPropagation();
  emits("close", props.id);
};

/* * * Draggable * * */

const refRoot = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (refRoot.value) refRoot.value.addEventListener("pointerdown", onDragStart);
});

let startPosX = 0;
let currentPosX = 0;
let offsetPosX = 0;
let prevIdx = props.id;

const onDragStart = (e: PointerEvent): void => {
  emits("open", props.id);

  const el = e.currentTarget as HTMLDivElement;
  startPosX = e.clientX;
  offsetPosX = e.offsetX;

  const width = el.clientWidth;

  const onDragMove = (e: PointerEvent): void => {
    if (el) {
      currentPosX = e.clientX;
      const deltaPosX = currentPosX - startPosX;

      el.style.transform = `translateX(${deltaPosX}px)`;
      el.style.zIndex = "1";

      const newIdx = Math.round(deltaPosX / width);

      if (prevIdx !== newIdx) emits("update:idx", newIdx, props.id);
      prevIdx = newIdx;
    }
  };

  const onDragEnd = (): void => {
    if (el) {
      g.to(el, {
        x: 0,
        duration: 0.25,
        ease: "power4.out",
        onComplete: () => {
          el.style.zIndex = "0";
        },
      });
    }

    document.removeEventListener("pointermove", onDragMove);
    document.removeEventListener("pointerup", onDragEnd);
  };

  document.addEventListener("pointermove", onDragMove);
  document.addEventListener("pointerup", onDragEnd);
};
</script>

<style lang="scss">
.main-viewport__tabbar-tab {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0px;
  width: 100%;
  max-width: 180px;
  height: auto;
  user-select: none;
  cursor: pointer;

  &--container {
    @include box(100%);
    overflow: hidden;

    @include themify($themes) {
      color: themed("text", "primary");
    }
  }

  &__label {
    font-size: 13px;
    font-weight: 300;
    color: inherit;
    opacity: 0.75;
    white-space: nowrap;
  }

  .symbol {
    position: absolute;
    right: 20px;
    @include box(12px);
    @include themify($themes) {
      fill: themed("icon", "primary");
    }

    svg {
      width: inherit;
      height: inherit;
    }
  }

  .main-viewport__tabbar-tab__shape {
    @include themify($themes) {
      fill: none;
    }
  }

  .main-viewport__tabbar-tab__shape--center {
    @include themify($themes) {
      background-color: none;
    }
  }

  &.active {
    .main-viewport__tabbar-tab__shape {
      @include themify($themes) {
        fill: themed("background", "primary");
      }
    }

    .main-viewport__tabbar-tab__shape--center {
      @include themify($themes) {
        background-color: themed("background", "primary");
      }
    }

    .main-viewport__tabbar-tab__label {
      opacity: 1;
    }
  }

  &:hover {
    @include themify($themes) {
      color: themed("text", "primary");
      fill: themed("background", "primary");
    }

    .main-viewport__tabbar-tab__label {
      opacity: 1;
    }
  }
}
</style>
