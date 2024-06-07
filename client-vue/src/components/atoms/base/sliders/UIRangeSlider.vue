<template lang="pug">
div.range-slider
    input(type="range" :min :max :step :value)
    div.range-slider__track
        div.range-slider__track-progress
        div.range-slider__rangebar(
            v-if="showRangebar"
            data-testid="range-slider__rangebar"
        )
          div.range-slider__rangebar-dot(
                data-testid="range-slider__rangebar-dot"
                v-for="idx in (max - (min || 0))"
                :key="idx"
          )
    div.range-slider__knob
    //- span.range-slider__value(
    //-   type="number"
    //-   role="textbox"
    //-   contenteditable
    //-   :size="5"
    //- )
    //- input.range-slider__value(
    //-   type="number"
    //-   contenteditable
    //-   :size="5"
    //- )
</template>

<script setup lang="ts">
interface Props {
  value: number;
  min?: number;
  max: number;
  step?: number;
  showRangebar?: boolean;
}

withDefaults(defineProps<Props>(), {
  step: 1,
  minValue: 0,
  showRangebar: false,
});
</script>

<style lang="scss">
$__track-height: 10px;
$__knob-size: 20px;
$__dot_border-radius: 3px;

.range-slider {
  display: flex;
  align-items: center;
  width: 180px;
  height: 20px;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0;
  }

  &__track {
    position: relative;
    width: 100%;
    height: $__track-height;
    border-radius: calc($__track-height / 2);
    margin: auto;

    @include themify($themes) {
      background-color: themed("background", "secondary--active");
    }

    &-progress {
      width: 32px;
      height: 100%;
      background-color: red;
    }
  }

  &__rangebar {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    @include box(100%);
    margin: auto;

    &-dot {
      @include box($__dot_border-radius);
      border-radius: calc($__dot_border-radius / 2);

      @include themify($themes) {
        background-color: themed("background", "secondary");
      }

      &:first-child,
      &:last-child {
        opacity: 0;
      }
    }

    &__dot:first-child,
    &__dot:last-child {
      opacity: 0;
    }
  }

  &__knob {
    position: absolute;
    display: block;
    @include box($__knob-size);
    border-radius: calc($__knob-size / 2);

    @include themify($themes) {
      background-color: themed("background", "secondary");
      border: 2px solid themed("background", "secondary--active");
    }
  }

  // &__value,
  // input {
  //   // min-width: 32px;
  //   // width: 64px;
  // }
}
</style>
