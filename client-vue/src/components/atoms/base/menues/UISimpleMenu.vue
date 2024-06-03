<template lang="pug">
div.simple-menu(
  data-test-id="simple-menu"
)
  div.simple-menu__header(v-if="title && showTitle")
    h5 {{ title }}
  ul.simple-menu__list
    UISimpleMenuItem(
      v-for="item, idx in items"
      :key="idx"
      :id="idx"
      :is-active="idx === sid"
      @open="onClick"
    )
      slot(:item)
</template>

<script setup lang="ts">
import UISimpleMenuItem from "./UISimpleMenuItem.vue";

interface Props {
  sid: number;
  items: any[];
  title?: string;
  showTitle?: boolean;
}

withDefaults(defineProps<Props>(), {
  showTitle: true,
});

const emits = defineEmits<{
  (e: "open", idx: number): void;
}>();

const onClick = (idx: number): void => {
  emits("open", idx);
};
</script>

<style lang="scss">
$__border-radius: $border-radius;
$__item-padding-h: 12px;

.simple-menu {
  &__header {
    @include padding-h($__item-padding-h);
    padding-bottom: 20px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 14px;
      font-weight: 400;
      padding: 0px;
      margin: 0px;
    }
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    padding: 6px $__item-padding-h;
    margin-bottom: 6px;
    border-radius: calc($__border-radius / 3);
    overflow: hidden;
    cursor: pointer;

    @include themify($themes) {
      color: themed("text", "primary");
    }

    * {
      font-size: 14px;
      font-weight: 400;
      padding: 0px;
      margin: 0px;
    }

    &__chevron {
      position: relative;
      right: 0;
      height: max-content;

      .icon {
        margin: auto;
      }
    }

    &.active {
      @include themify($themes) {
        background-color: themed("background", "primary");
      }

      .symbol {
        @include themify($themes) {
          fill: themed("icon", "primary");
        }
      }
    }

    &:hover {
      @include themify($themes) {
        background-color: themed("button", "hover");
      }
    }

    * {
      font-size: 16px;
      font-weight: 400;
      padding: 0;
      margin: 0;

      @include themify($themes) {
        color: themed("text", "primary");
      }
    }
  }
}
</style>
