<template lang="pug">
ul.hierarchy__list.search-list
  li.hierarchy-item(
    v-for="{id, title, content, parentId} in data"
    :key="id"
    data-testid="hierarchy-item"
  )
    div.hierarchy-item__body(
      ref="refBody"
      data-testid="hierarchy-item-body"
      @click="$emit('select:file', {id, parentId, type: HierarchyNodeTypes.FILE})"
    )
      UIIcon(
        data-testid="hierarchy-item-node-icon"
        :name="Symbols.FILE"
        size="18"
      )
      div.hierarchy-item__body__label {{ title }}
</template>

<script setup lang="ts">
import { HierarchyNodeTypes } from "@/typings";
import { type NodeEmittedData } from "@/components/moleculas/hierarchy/UIHierarchyItem.vue";

import UIIcon, { Symbols } from "@/components/atoms/base/icons/UIIcon.vue";

interface Props {
  data: any;
}

defineProps<Props>();

defineEmits<{
  (e: "select:file", args: NodeEmittedData): void;
}>();
</script>

<style lang="scss">
// .search-list {}
</style>
