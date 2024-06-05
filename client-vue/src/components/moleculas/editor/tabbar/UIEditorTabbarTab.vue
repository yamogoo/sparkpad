<template lang="pug">
div.editor-tabbar-tab(
  :class="[{'active': isActive}]"
  @click="onClick"
)
  EditorTabbarTabShape
    span.editor-tabbar-tab__label {{ title.length > 15 ? `${title.slice(0, 15)}...` : title }}
    UIIcon(
      v-if="isActive"
      :name="Symbols.CROSS"
      @click="onClose"
    )
</template>

<script setup lang="ts">
import EditorTabbarTabShape from "./shapes/EditorTabbarTabShape.vue";
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
}>();

const onClick = (e: MouseEvent): void => {
  e.preventDefault();
  e.stopPropagation();
  emits("open", props.id);
};

const onClose = (e: MouseEvent): void => {
  e.preventDefault();
  e.stopPropagation();
  emits("close", props.id);
};
</script>

<style lang="scss">
.editor-tabbar-tab {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0px;
  width: 136px;
  min-width: 180px;
  height: auto;
  cursor: pointer;

  @include themify($themes) {
    color: themed("text", "primary");
  }

  &__label {
    font-size: 13px;
    color: inherit;
    opacity: 0.75;
  }

  .ui-icon {
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

  .editor-tabbar-tab__shape {
    @include themify($themes) {
      fill: none;
    }
  }

  .editor-tabbar-tab__shape--center {
    @include themify($themes) {
      background-color: none;
    }
  }

  &.active {
    .editor-tabbar-tab__shape {
      @include themify($themes) {
        fill: themed("background", "primary");
      }
    }

    .editor-tabbar-tab__shape--center {
      @include themify($themes) {
        background-color: themed("background", "primary");
      }
    }

    .editor-tabbar-tab__label {
      opacity: 1;
    }
  }

  &:hover {
    @include themify($themes) {
      color: themed("text", "primary");
      fill: themed("background", "primary");
    }

    .editor-tabbar-tab__label {
      opacity: 1;
    }
  }
}
</style>
