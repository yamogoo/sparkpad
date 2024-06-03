<template lang="pug">
div.notes-list__item(
  data-test-id="notes-list-item"
  ref="refItem"
  :class="[isActive ? 'active' : 'normal', {'focused': isFocused}]"
  @click="e => onClick(e)"
)
  div.notes-list__item--container
    div.notes-list__item--content
      h5 {{ name }}
      p(
        v-if="description"
        data-test-id="notes-list-item-description"
      ) {{ description }}
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  id: number;
  isActive?: boolean;
  name: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
});

const emits = defineEmits<{
  (e: "open", id: number): void;
}>();

onMounted(() => {
  if (refItem.value) {
    refItem.value.addEventListener("mouseenter", handleOnFocus);
    refItem.value.addEventListener("mouseleave", handleOnLeave);
  }
});

const refItem = ref<HTMLDivElement | null>(null);

const isFocused = ref(false);

/* * * Handlers * * */

const handleOnFocus = (e: MouseEvent): void => {
  e.stopImmediatePropagation();
  isFocused.value = true;
};

const handleOnLeave = (_e: MouseEvent): void => {
  isFocused.value = false;
};

const onClick = (e: MouseEvent | TouchEvent): void => {
  e.preventDefault();
  e.stopPropagation();

  emits("open", props.id);
};
</script>

<style lang="scss">
$__border-radius: calc($border-radius / 2);

.notes-list__item {
  width: 100%;
  padding: 4px 8px;
  cursor: pointer;
  @extend %transition;
  user-select: none;

  &--container {
    @include padding-v(16px);
    transition: inherit;
    border-radius: $__border-radius;
  }

  &--content {
    @include padding-h(16px);
    transition: inherit;
  }

  h5 {
    font-size: 16px;
    font-weight: 400;
    padding: 0;
    margin: 0;
    transition: inherit;

    @include themify($themes) {
      color: themed("text", "primary");
    }
  }
  p {
    font-size: 13px;
    font-weight: 400;
    padding: 0;
    margin: 0;
    transition: inherit;

    @include themify($themes) {
      color: themed("text", "secondary");
    }
  }

  &.normal {
    .notes-list__item--container {
      @include themify($themes) {
        border-bottom: 1px solid rgba(themed("border", "primary"), 0.35);
      }
    }
  }

  &.focused {
    .notes-list__item--container {
      @include themify($themes) {
        background-color: themed("button", "focus");
        border-bottom: 1px solid transparent;
      }
    }
  }

  &.active {
    .notes-list__item--container {
      @include themify($themes) {
        background-color: themed("button", "hover");
        border-bottom: 1px solid transparent;
      }
    }
  }
}
</style>
