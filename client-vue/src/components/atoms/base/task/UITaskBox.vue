<template lang="pug">
div.task-box
  div.task-box--container(data-testid="task-box-content")
    p.task-box__author(
      v-if="author" data-testid="task-box-author") {{ author.toUpperCase() }}
    p.task-box__description(
      v-if="description"
     data-testid="task-box-description") {{ description.toUpperCase() }}
    p.task-box__name(
      v-if="name"
      data-testid="task-box-name") {{ name.toUpperCase() }}
    p.task-box__version(
      v-if="version" data-testid="task-box-version") v{{ version.toUpperCase() }}
</template>

<script setup lang="ts">
interface Props {
  author?: string;
  description?: string;
  name?: string;
  version?: string;
}

withDefaults(defineProps<Props>(), {
  author: import.meta.env.APP_AUTHOR,
  // name: import.meta.env.APP_NAME,
  description: import.meta.env.APP_DESCRIPTION,
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
      color: themed("text", "secondary");
    }
  }
}
</style>
