<template lang="pug">
ul.hierarchy__list.search-list(
  data-testid="search-list"
)
  li.hierarchy-item(
    v-for="{id, template, parentId, segments} in data"
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
      div.hierarchy-item__body__label(
        v-html="template"
      )
      span.hierarchy-item__body__info {{ segments.filter(el => el.match).length }}
</template>

<script setup lang="ts">
import { HierarchyNodeTypes, type SearchedNode } from "@/typings";
import { type NodeEmittedData } from "@/components/moleculas/hierarchy/UIHierarchyItem.vue";

import UIIcon, { Symbols } from "@/components/atoms/base/icons/UIIcon.vue";

interface Props {
  data: Array<SearchedNode>;
}

defineProps<Props>();

defineEmits<{
  (e: "select:file", args: NodeEmittedData): void;
}>();
</script>

<style lang="scss">
.search-list {
  .hierarchy-item__body__label {
    span {
      display: inline;
      // background-color: $c-app-selection;
      background-color: #fff97042;
      // color: black !important;
    }
  }
}
</style>
