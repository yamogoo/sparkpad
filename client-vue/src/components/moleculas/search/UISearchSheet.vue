<template lang="pug">
UISearchPanel(
    @search="value => { searchedText = value }"
)
UISearchList(
    :data
    :sid
    @select:file="onSelectFile"
)
</template>

<script setup lang="ts">
import { ref, type Ref, computed } from "vue";
import { useRouter } from "vue-router";

import { useNotesStore } from "@/stores/notes";
import { useNoteGroupsStore } from "@/stores/groups";
import { useNotesHistoryStore } from "@/stores/notesHistory";

import { PrivateRoutes } from "@/router";

import { type NodeEmittedData } from "@/components/moleculas/hierarchy/UIHierarchyItem.vue";

import UISearchPanel from "@/components/atoms/bars/search/UISearchPanel.vue";
import UISearchList from "@/components/moleculas/search/UISearchList.vue";

const router = useRouter();

const groupsStore = useNoteGroupsStore();
const notesStore = useNotesStore();
const historyStore = useNotesHistoryStore();

const searchedText = ref("");

const data = computed(() => {
  if (searchedText.value === "") return [];

  return notesStore.all.filter(
    (note) => note.title.indexOf(searchedText.value) !== -1
  );
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
