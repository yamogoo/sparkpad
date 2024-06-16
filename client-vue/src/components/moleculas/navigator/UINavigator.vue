<template lang="pug">
div.navigator(
  data-testid="navigator"
)
  UISearchSheet(v-if="route.path === Routes.SEARCH")
  UIHierarchySheet(v-if="route.path === Routes.HIERARCHY_MENU")
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useNoteGroupsStore } from "@/stores/groups";

import UISearchSheet from "@/components/moleculas/search/UISearchSheet.vue";
import UIHierarchySheet from "@/components/moleculas/hierarchy/UIHierarchySheet.vue";

import { useNavigatorRoute, Routes } from "./navigatorRouter";

const route = useNavigatorRoute();

/* * * Stores * * */

const groupsStore = useNoteGroupsStore();

/* * * Init * * */

onMounted(() => {
  groupsStore.fetchHierarchy();
});
</script>

<style lang="scss">
.navigator {
  display: grid;
  grid-template-rows: auto 1fr;
  @include box(100%);

  &--sheet {
    position: relative;
    @include box(100%);
    overflow-x: hidden;
  }
}
</style>
