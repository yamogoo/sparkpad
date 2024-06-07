<template lang="pug">
li.simple-menu__item(
  :class="[{'active': isActive}]"
  data-testid="simple-menu-item"
  @click="onClick"
)
  slot
  div.simple-menu__item__chevron
    Transition(
      :css="false"
      @enter="onEnter"
    )
      div.simple-menu__item__icon(
        v-if="isActive"
        ref="refIcon"
      )
        UIIcon(
          :name="Symbols.ARROW_RIGHT"
        )
</template>

<script setup lang="ts">
import { ref, Transition } from "vue";
import g from "gsap";

import { Symbols } from "@/components/atoms/base/icons/Symbols";
import UIIcon from "@/components/atoms/base/icons/UIIcon.vue";

interface Props {
  id: number;
  isActive: boolean;
}

const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits<{
  (e: "open", id: number): void;
}>();

const refIcon = ref<HTMLDivElement | null>(null);

const onClick = (e: MouseEvent): void => {
  e.preventDefault();
  e.stopPropagation();

  emits("open", props.id);
};

/* * * Animations * * */

const POS_X_OUT = -10;

const onEnter = (el: Element, done: () => void): void => {
  g.fromTo(
    el,
    {
      x: POS_X_OUT,
      opacity: 0.0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.2,
      ease: "power4.out",
      onComplete: done,
    }
  );
};
</script>

<script lang="ts">
export interface SimpleMenuItem {
  id?: string | number;
  name: string;
  path: string;
}
</script>
