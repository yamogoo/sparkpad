<template lang="pug">
TransitionProvider(
  :show
  :animation-before-enter="animationBeforeEnter"
  :animation-enter="animationEnter"
  :animation-leave="animationLeave"
  :autohide="true"
  :autohide-timer="3000"
  @update:show="onUpdateShow"
)
  div.form-error
    div.form-error--container(
      v-bind="$attrs"
    )
      h6.form-error__title(
        data-test-id="form-error-message-title"
      ) {{ message }}
      p.form-error__description(
        v-if="description"
        data-test-id="form-error-message-description"
      ) {{ description }}
</template>
<script setup lang="ts">
import TransitionProvider from "@/components/atoms/base/animations/TransitionProvider.vue";

defineOptions({ inheritAttrs: false });

interface Props {
  message?: string;
  description?: string;
  show?: boolean;
}

defineProps<Props>();

const emits = defineEmits<{
  (e: "update:show", state: boolean): void;
}>();

const onUpdateShow = (state: boolean): void => {
  emits("update:show", state);
};

/* * * Animations * * */

const animationBeforeEnter: gsap.TweenVars = {
  opacity: 0,
  y: -44,
};

const animationEnter: gsap.TweenVars = {
  opacity: 1,
  y: 0,
  duration: 0.25,
  ease: "power4.out",
};

const animationLeave: gsap.TweenVars = {
  ...animationBeforeEnter,
  duration: 0.25,
  ease: "power4.out",
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
.form-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  // @include padding-v(16px);
  @include padding-h(16px);
  z-index: 9999;
  cursor: pointer;

  @include themify($themes) {
    color: themed("error", "text");
    background-color: themed("error", "background");
  }

  &--container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include box(100%);
  }

  * {
    text-align: center;
    margin: 0;
    padding: 0;
  }

  &__title {
    font-size: 16px;
    font-weight: 400;
    color: inherit;
  }

  $__border-radius: $border-radius;

  // & {
  //   // width: fit-content;
  //   // min-height: 32px;
  //   // padding: 20px;
  //   // border-radius: $__border-radius;
  //   // overflow: hidden;

  //   @include themify($themes) {
  //     color: themed("text", "error");
  //     background-color: themed("background", "error-overlay");
  //   }

  //   * {
  //     text-align: center;
  //   }
  // }
}
</style>
