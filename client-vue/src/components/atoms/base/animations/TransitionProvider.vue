<template lang="pug">
Transition(
  :css="false"
  @enter="onEnter"
  @leave="OnLeave"
)
  template(v-if="show")
    slot
</template>

<script setup lang="ts">
import { watch } from "vue";
import g from "gsap";

interface Props {
  show: boolean;
  autohide?: boolean;
  autohideTimer?: number;
  animationBeforeEnter?: gsap.TweenTarget;
  animationEnter?: gsap.TweenVars;
  animationLeave?: gsap.TweenVars;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  autohide: false,
  autoHideTimer: 4000,
});

const emits = defineEmits<{
  (e: "update:show", state: boolean): void;
}>();

let timerId: ReturnType<typeof setTimeout> | undefined = undefined;

/* * * Animations * * */

const onEnterComplete = () => {
  if (props.autohideTimer)
    timerId = setTimeout(() => {
      emits("update:show", false);
    }, props.autohideTimer);
};

watch(
  () => props.show,
  () => {
    if (!props.show && props.autohideTimer) timerId = undefined;
  }
);

const onEnter = (el: Element, done: () => void): void => {
  g.fromTo(
    el,
    {
      ...props.animationLeave,
    },
    {
      ...props.animationEnter,
      onComplete: onEnterComplete,
    }
  );
};

const OnLeave = (el: Element, done: () => void): void => {
  g.to(el, {
    ...props.animationLeave,
    onComplete: done,
  });
};
</script>
