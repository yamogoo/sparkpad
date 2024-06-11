<template lang="pug">
li.hierarchy-item(
  :class="[{'focused': isFocused, 'active': isActive && !isEditMode, 'edit': isEditMode}]"
)
  div.hierarchy-item__body(
    ref="refBody"
    tabindex="0"
    @click="e => { onClick(e, {id, parentId, type}) }"
    @keyup.enter="onEdit"
  )
    div.hierarchy-item__body__icon(
      ref="refIcon"
      @click="onExpand"
    )
      UIIcon(
        v-if="type === HierarchyNodeTypes.DIR"
        :name="Symbols.ARROW_BOTTOM"
      )
    div.hierarchy-item__body__label(
      v-if="!isEditMode"
    ) {{ label }}
    UIInput(
      v-if="isEditMode"
      ref="refInput"
      :value="props.label"
      :isError="false"
      @update:value="onUpdateName"
    )
    UIActionButton(
      v-if="isActive"
      :icon-name="Symbols.DELETE_ITEM"
      aria-label="delete"
      @press="e => { onDelete({id, parentId, type}) }"
    )
  div.hierarchy-item__footer(
    v-if="children && children.length > 0 && isExpaned"
  )
    div.hierarchy-item__footer__tail
    ul.hierarchy-item__footer__container
      HierarchyItem(
        v-if="children.length > 0"
        v-for="item, idx in children"
        :key="idx"
        :idx
        :id="item.id"
        :parentId="item.parentId"
        :dirSid
        :fileSid
        :type="HierarchyView.getNodeType(item)"
        :label="item.title"
        :children="item.children"
        @select="onSelect"
        @delete="onDelete"
        @update="onUpdate"
      )
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import g from "gsap";

import {
  type HierarchyNodeCreationAttributes,
  type HierarchyNode,
  HierarchyNodeTypes,
  type HierarchyNodeParentId,
  type HierarchyNodeSid,
} from "@/typings";

import { useClickOutside } from "@/composables/useClickOutside";

import { HierarchyView } from "@/composables/useHierarchyView";

import HierarchyItem from "@/components/moleculas/hierarchy/HierarchyItem.vue";
import UIIcon, { Symbols } from "@/components/atoms/base/icons/UIIcon.vue";
import UIInput from "@/components/atoms/base/inputs/UIInput.vue";
import UIActionButton from "@/components/atoms/base/buttons/UIActionButton.vue";

interface Props {
  idx: number;
  id: string;
  parentId: HierarchyNodeParentId;
  fileSid: HierarchyNodeSid;
  dirSid: HierarchyNodeSid;
  label: string;
  type: HierarchyNodeTypes;
  children?: Array<HierarchyNode>;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (e: "select", args: NodeEmittedData): void;
  (e: "update", value: string, args: NodeEmittedData): void;
  (e: "delete", args: NodeEmittedData): void;
}>();

interface BaseInputComponent extends HTMLInputElement {
  onFocus(): void;
}

const refBody = ref<HTMLDivElement | null>(null);
const refIcon = ref<HTMLDivElement | null>(null);
const refInput = ref<BaseInputComponent>();

const isFocused = ref(false);
const isExpaned = ref(true);
const isEditMode = ref(false);

const isActive = computed({
  get() {
    return (
      (props.type === HierarchyNodeTypes.DIR && props.id === props.dirSid) ||
      (props.type === HierarchyNodeTypes.FILE && props.id === props.fileSid)
    );
  },
  set(state) {
    return state;
  },
});

onMounted(() => {
  if (refBody.value) {
    refBody.value.addEventListener("mouseenter", handleOnFocus);
    refBody.value.addEventListener("mouseleave", handleOnLeave);
  }
  animateIcon();
});

const handleOnFocus = (e: MouseEvent): void => {
  e.stopImmediatePropagation();
  isFocused.value = true;
};

const handleOnLeave = (_e: MouseEvent): void => {
  isFocused.value = false;
};

const onUpdateName = (value: string): void => {
  emit("update", value, {
    id: props.id,
    parentId: props.parentId,
    type: props.type,
  });
};

const onClick = (e: MouseEvent, args: NodeEmittedData): void => {
  e.stopPropagation();
  isActive.value = !isActive.value;

  onSelect(args);
};

const onEdit = (_e: KeyboardEvent): void => {
  isEditMode.value = !isEditMode.value;

  nextTick(() => {
    if (refInput.value) {
      refInput.value.onFocus();
    }
  });
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
  () => [props.dirSid, props.fileSid],
  () => {
    if (props.dirSid !== props.id || props.fileSid !== props.id) {
      isEditMode.value = false;
    }

    isActive.value = props.dirSid === props.id || props.fileSid === props.id;
  }
);

/* * * Animations * * */

const animateIcon = () => {
  const angle = isExpaned.value ? 0 : -90;

  if (refIcon.value)
    g.to(refIcon.value, {
      rotation: angle,
      duration: 0.15,
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
    height: 36px;
    gap: 8px;
    padding: 0px $tab-offset-x;
    border-radius: calc($__border-radius / 3);
    outline: none;

    &__label {
      font-size: 15px;
      font-weight: 300;
      width: 100%;
      height: 20px;
      white-space: nowrap;

      @include themify($themes) {
        color: themed("text", "primary");
      }
    }

    input {
      font-size: 16px;
      height: 20px;
      background: none;
      border: none;
      padding: 0px;

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
