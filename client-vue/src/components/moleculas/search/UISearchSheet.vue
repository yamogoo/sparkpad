<template lang="pug">
UISearchPanel(
  ref="refSearchPanel"
  @search="value => { searchedValue = value }"
)
UISearchList(
  :data
  :sid
  @select:file="onSelectFile"
)
</template>

<script setup lang="ts">
import { ref, type Ref, computed, onMounted, type ComputedRef } from "vue";
import { useRouter } from "vue-router";

import { useNotesStore } from "@/stores/notes";
import { useNoteGroupsStore } from "@/stores/groups";
import { useNotesHistoryStore } from "@/stores/notesHistory";

import { PrivateRoutes } from "@/router";

import { type NodeEmittedData } from "@/components/moleculas/hierarchy/UIHierarchyItem.vue";

import UISearchPanel from "@/components/atoms/bars/search/UISearchPanel.vue";
import UISearchList from "@/components/moleculas/search/UISearchList.vue";

import { findAllSegments } from "@/utils";
import type { SearchedNode } from "~/src/typings";

const router = useRouter();

const groupsStore = useNoteGroupsStore();
const notesStore = useNotesStore();
const historyStore = useNotesHistoryStore();

const searchedValue = ref("");

const refSearchPanel = ref<InstanceType<typeof UISearchPanel>>();

onMounted(() => {
  if (refSearchPanel.value) refSearchPanel.value.onFocus(true);
});

const data: ComputedRef<Array<SearchedNode>> = computed(() => {
  if (searchedValue.value === "") return [];

  const searchedNotes = notesStore.all.filter(
    (note) => note.title.indexOf(searchedValue.value) !== -1
  );

  return searchedNotes.map(({ id, title, parentId }) => {
    const segments = findAllSegments(title, searchedValue.value, true);

    let template = "";

    segments.forEach((segment) => {
      template += segment.match
        ? `<span>${segment.value}</span>`
        : segment.value;
    });

    return {
      id,
      parentId,
      template: `<p>${template}</p>`,
      segments,
    };
  });
});

const sid: Ref<string | null> = ref(null);

const onSelectFile = async ({
  id,
  parentId,
}: NodeEmittedData): Promise<void> => {
  sid.value = id;
  notesStore.selectById(id);
  groupsStore.selectById(parentId);
  historyStore.add(id);
  router.push({ path: `${PrivateRoutes.EDITOR_NOTES}/${id}` });
};
</script>

<style lang="scss"></style>
