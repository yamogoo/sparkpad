<template lang="pug">
div.error-message
    div.error-message__title(
        data-test-id="error-message-title"
    ) {{ message }}
    div.error-message__description(
        v-if="description"
        data-test-id="error-message-description"
    ) {{ description }}
</template>

<script setup lang="ts">
interface Props {
  message?: string;
  description?: string;
}

withDefaults(defineProps<Props>(), {
  message: "Error",
});
</script>

<style lang="scss">
$__border-radius: $border-radius;

.error-message {
  width: fit-content;
  min-height: 32px;
  padding: 20px;
  border-radius: $__border-radius;
  overflow: hidden;

  @include themify($themes) {
    color: themed("text", "error");
    background-color: themed("background", "error-overlay");
  }

  * {
    text-align: center;
  }
}
</style>
