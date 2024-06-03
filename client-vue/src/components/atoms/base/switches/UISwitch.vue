<template lang="pug">
label.switch(
  :class="[state? 'active' : 'normal']"
)
  input(
    v-bind="$attrs"
    type="checkbox"
    :checked="props.state"
    @change="onChange"
  )
  div.switch__track
    span.switch__knob(
      ref="refKnob"
    )
  span.switch__label(v-if="label") {{ label }}
</template>

<script setup lang="ts">
import { onMounted, ref, useAttrs, watch } from "vue";
import g from "gsap";

defineOptions({
  inheritAttrs: false,
});

useAttrs();

interface Props {
  state: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits<{
  (e: "update:state", state: any): void;
}>();

const refKnob = ref<HTMLDivElement | null>(null);

const onChange = (e: Event): void => {
  const state = (e.target as HTMLInputElement).checked;
  emits("update:state", state);
};

/* * * Animations * * */

const onAnimateKnob = (duration = 0.25): void => {
  if (refKnob.value) {
    const knobPosX = props.state ? 24 : 0;

    g.to(refKnob.value, {
      x: knobPosX,
      duration,
      ease: "power4.out",
    });
  }
};

onMounted(() => {
  if (refKnob.value) {
    onAnimateKnob(0.0);
  }
});

watch(
  () => props.state,
  () => {
    onAnimateKnob();
  }
);
</script>

<style lang="scss">
$__width: 48px;
$__height: 24px;
$__knob-size: 16px;

.switch {
  cursor: pointer;
  box-sizing: border-box;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  &__track {
    @include box($__width, $__height);
    border-radius: $__height;
    padding: 4px;
    overflow: hidden;
    @extend %transition;
  }

  &__knob {
    display: block;
    @include box($__knob-size);
    border-radius: $__knob-size;
    @extend %transition;

    @include themify($themes) {
      background-color: themed("background", "secondary");
    }
  }

  &.active {
    .switch__track {
      @include themify($themes) {
        background-color: themed("background", "secondary--active");
      }
    }
  }

  &.normal {
    .switch__track {
      @include themify($themes) {
        background-color: themed("background", "secondary--disabled");
      }
    }
  }

  &__label {
    font-size: 12px;

    @include themify($themes) {
      color: themed("text", "secondary");
    }
  }
}
</style>
