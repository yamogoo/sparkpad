<template lang="pug">
div.task-box
  div.task-box--container
    p.task-box__author(v-if="author") {{ author.toUpperCase() }}
    p.task-box__class-name(v-if="className") {{ className.toUpperCase() }}
    p.task-box__task-name(v-if="taskName") {{ taskName.toUpperCase() }}
    p.task-box__version(v-if="version") v{{ version.toUpperCase() }}
</template>

<script setup lang="ts">
interface Props {
  author?: string;
  className?: string;
  taskName?: string;
  version?: string;
}

withDefaults(defineProps<Props>(), {
  author: import.meta.env.APP_AUTHOR,
  taskName: import.meta.env.APP_NAME,
  className: import.meta.env.APP_DESCRIPTION,
  version: import.meta.env.APP_VERSION,
});
</script>

<style lang="scss">
$__border-radius: $border-radius;

.task-box {
  display: block;
  padding: 4px;

  &--container {
    display: block;
    padding: 16px 20px;
    border-radius: calc($__border-radius / 2);
    @extend %transition;

    @include themify($themes) {
      background-color: themed("background", "primary");
    }
  }

  &__task-name {
    @include themify($themes) {
      color: themed("text", "primary") !important;
    }
  }

  p {
    font-size: 9px;
    padding: 1px 0px;
    margin: 0;
    @extend %transition;

    @include themify($themes) {
      color: themed("text", "disabled");
    }
  }
}
</style>
