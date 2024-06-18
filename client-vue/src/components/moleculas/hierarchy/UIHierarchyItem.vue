<template lang="pug">
li.hierarchy-item(
  data-testid="hierarchy-item"
  :class="[{'focused': isFocused, 'active': isActive && !isEditMode, 'edit': isEditMode, 'file': type === HierarchyNodeTypes.FILE}]"
)
  div.hierarchy-item__body(
    ref="refBody"
    data-testid="hierarchy-item-body"
    tabindex="0"
    @keyup.enter="onEdit"
  )
    div.hierarchy-item__body__section(
      @click="e => { onClick(e, {id, parentId, type}) }"
    )
      div.hierarchy-item__body__icon(
        ref="refIcon"
      )
        UIIcon(
          v-if="type === HierarchyNodeTypes.DIR"
          data-testid="hierarchy-item-arrow-icon"
          :name="Symbols.ARROW_BOTTOM"
          size="12"
        )
      UIIcon(
        data-testid="hierarchy-item-node-icon"
        :name="nodeIcon"
        size="18"
      )
    div.hierarchy-item__body__label(
      v-if="!isEditMode"
      @click="e => {onEditName(e, {id, parentId, type})}"
    )
      span {{ label }}
    input(
      v-if="isEditMode"
      ref="refInput"
      type="text"
      :value="props.label"
      @input="onUpdateName"
    )
    UIActionButton(
      v-if="isActive"
      data-testid="hierarchy-item-delete-button"
      :icon-name="Symbols.DELETE_ITEM"
      aria-label="delete"
      @press="() => { onDelete({id, parentId, type}) }"
    )
  div.hierarchy-item__footer(
    v-if="children && children.length > 0 && isExpaned"
  )
    div.hierarchy-item__footer__tail
    ul.hierarchy-item__footer__container
      UIHierarchyItem(
        v-if="children.length > 0"
        v-for="item, idx in children"
        :key="item.id"
        :id="item.id"
        :sid
        :parentId="item.parentId"
        :type="item.type"
        :label="item.title"
        :children="item.children"
        @select="onSelect"
        @delete="onDelete"
        @update="onUpdate"
      )
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref, computed, watch, onUnmounted } from "vue";
import g from "gsap";

import {
  type HierarchyNodeCreationAttributes,
  type HierarchyNode,
  HierarchyNodeTypes,
  type HierarchyNodeParentId,
  type HierarchyNodeSid,
} from "@/typings";

import { useClickOutside, useDoubleClick } from "@/composables";

import UIHierarchyItem from "@/components/moleculas/hierarchy/UIHierarchyItem.vue";
import UIIcon, { Symbols } from "@/components/atoms/base/icons/UIIcon.vue";
import UIActionButton from "@/components/atoms/base/buttons/UIActionButton.vue";

interface Props {
  id: string;
  parentId: HierarchyNodeParentId;
  sid: HierarchyNodeSid;
  label: string;
  type: HierarchyNodeTypes;
  children?: Array<HierarchyNode>;
  doubleClickStep?: number;
}

const props = withDefaults(defineProps<Props>(), {
  doubleClickStep: 500,
});

const emit = defineEmits<{
  (e: "select", args: NodeEmittedData): void;
  (e: "update", value: string, args: NodeEmittedData): void;
  (e: "delete", args: NodeEmittedData): void;
}>();

const refBody = ref<HTMLDivElement | null>(null);
const refIcon = ref<HTMLDivElement | null>(null);
const refInput = ref<HTMLInputElement>();

const isFocused = ref(false);
const isExpaned = ref(false);
const isEditMode = ref(false);

const nodeIcon = computed(() => {
  if (props.type === HierarchyNodeTypes.DIR)
    return isExpaned.value ? Symbols.DIR_OPEN_FILL : Symbols.DIR_FILL;
  else if (props.type === HierarchyNodeTypes.FILE) return Symbols.FILE;
  return undefined;
});

const isActive = computed({
  get() {
    return props.id === props.sid;
  },
  set(state) {
    return state;
  },
});

onMounted(() => {
  if (refBody.value)
    refBody.value.addEventListener("mouseenter", handleOnFocus);

  animateIcon(0.0);
});

onUnmounted(() => {
  if (refBody.value)
    refBody.value.removeEventListener("mouseenter", handleOnFocus);
});

const handleOnFocus = (e: MouseEvent): void => {
  e.stopImmediatePropagation();

  const el = e.currentTarget as HTMLDivElement;
  isFocused.value = true;

  const handleOnLeave = (_e: MouseEvent): void => {
    isFocused.value = false;
    el.removeEventListener("mouseleave", handleOnLeave);
  };

  el.addEventListener("mouseleave", handleOnLeave);
};

const onUpdateName = (e: Event): void => {
  const value = (e.target as HTMLInputElement).value;

  emit("update", value, {
    id: props.id,
    parentId: props.parentId,
    type: props.type,
  });
};

const onEdit = (): void => {
  isEditMode.value = !isEditMode.value;

  nextTick(() => {
    if (refInput.value) refInput.value.focus();
  });
};

const doubleClick = useDoubleClick(props.doubleClickStep);

const onClick = (e: MouseEvent, args: NodeEmittedData): void => {
  e.preventDefault();
  e.stopPropagation();

  isActive.value = !isActive.value;

  onSelect(args);
  onExpand(e);
};

const onEditName = (e: MouseEvent, args: NodeEmittedData): void => {
  e.preventDefault();
  e.stopPropagation();

  if (!isEditMode.value) {
    // isActive.value = !isActive.value;
    isActive.value = true;
    onSelect(args);
    doubleClick(onEdit);
  }
};

const onSelect = (args: NodeEmittedData): void => {
  emit("select", args);
};

const onDelete = (args: NodeEmittedData): void => {
  emit("delete", args);
};

const onUpdate = (value: string, args: NodeEmittedData): void => {
  emit("update", value, args);
};

const onExpand = (e: MouseEvent): void => {
  e.stopPropagation();
  isExpaned.value = !isExpaned.value;
  animateIcon();
};

useClickOutside(refBody, () => {
  isEditMode.value = false;
});

/**
 * @description Depending on the entity type, sets a specific SID
 */

watch(
  () => props.sid,
  () => {
    if (props.sid !== props.id) {
      isEditMode.value = false;
    }

    isActive.value = props.sid === props.id;
  }
);

/* * * Animations * * */

const animateIcon = (duration = 0.15) => {
  const angle = isExpaned.value ? 0 : -90;

  if (refIcon.value)
    g.to(refIcon.value, {
      rotation: angle,
      duration,
      ease: "power4.out",
    });
};
</script>

<script lang="ts">
export interface NodeEmittedData extends HierarchyNodeCreationAttributes {
  type: HierarchyNodeTypes;
}
</script>

<style lang="scss">
$tab-offset-x: 6px;
$__item-height: 36px;
$__border-radius: $border-radius;

.hierarchy-item {
  width: 100%;
  padding: 4px 0px 0px $tab-offset-x;
  background-color: none;
  @include no-select(none);
  cursor: pointer;

  &__body {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: $__item-height;
    gap: 8px;
    padding: 0px $tab-offset-x;
    border-radius: calc($__border-radius / 3);
    outline: none;

    &__label {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 15px;
      font-weight: 300;
      letter-spacing: 0.3px;
      @include box(100%);
      white-space: nowrap;

      @include themify($themes) {
        color: themed("text", "primary");
      }

      span {
        display: block;
        margin: 0;
      }
    }

    &__info {
      @include themify($themes) {
        color: themed("text", "disabled");
      }
    }

    input {
      font-size: 15px;
      font-weight: 300;
      letter-spacing: 0.3px;
      background: none;
      width: 100%;
      border: none;
      padding: 0px;
      outline: none;

      @include themify($themes) {
        color: themed("text", "primary");
      }
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;

      @include themify($themes) {
        fill: themed("icon", "primary");
      }
    }

    &__section {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 8px;
    }
  }

  &__footer {
    display: flex;
    flex-direction: row;
    gap: 0px;

    &__container {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 0px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__tail {
      width: $tab-offset-x * 2;
      @include themify($themes) {
        border-right: 1px solid themed("border", "primary");
      }
    }
  }

  &:not(.edit) {
    &.focused:not(.active) {
      > .hierarchy-item__body {
        &:hover {
          @include themify($themes) {
            background-color: themed("button", "hover");
          }
        }
      }
    }

    &.focused.active {
      > .hierarchy-item__body {
        &:hover {
          @include themify($themes) {
            background-color: themed("button", "hover");
          }
        }
      }
    }
  }

  &.active {
    > .hierarchy-item__body {
      @include themify($themes) {
        background-color: themed("button", "hover");
      }

      .hierarchy-item__body__label {
        @include themify($themes) {
          color: themed("text", "primary");
        }
      }
      .hierarchy-item__body__icon {
        @include themify($themes) {
          color: themed("icon", "primary");
        }
      }
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      @include box(1px, $__item-height);

      @include themify($themes) {
        background-color: themed("text", "primary");
      }
    }
  }

  &.edit {
    > .hierarchy-item__body {
      @include themify($themes) {
        background-color: rgba(themed("button", "accent"), 0.75);
      }

      .hierarchy-item__body__label {
        @include themify($themes) {
          color: themed("text", "primary");
        }
      }
      .hierarchy-item__body__icon {
        @include themify($themes) {
          color: themed("icon", "primary");
        }
      }
    }
  }
}
</style>
