<template lang="pug">
UISheet
  UICellOption(
    :title="`Open first note on startup`"
    :show-description="true"
  )
    UISwitch(
      :state="isFocusedOnFirstTabOnStart"
      @update:state="onFocusedOnFirstTabOnStart"
    )
  UICellOption(
    :title="`Always open a new note after creation`"
    :show-description="true"
  )
    UISwitch(
      :state="isFocusedOnNewTab"
      @update:state="onFocusedOnNewTab"
    )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/stores/settings";

import UICellOption from "@/components/atoms/base/cells/UICellOption.vue";
import UISheet from "@/components/atoms/views/UISheet.vue";
import UISwitch from "@/components/atoms/base/switches/UISwitch.vue";

const settingsStore = useSettingsStore();

const isFocusedOnFirstTabOnStart = computed(
  () => settingsStore.getIsFocusedOnFirstTabOnStart
);

const isFocusedOnNewTab = computed(() => settingsStore.getIsFocusedOnNewTab);

// const contentFontSizes = computed(
//   () => settingsStore.editor.general.content.font.sizes
// );
// const contentFontSizeSid = computed(() => settingsStore.getContentFontSizeSid);

/* * * Handlers * * */

const onFocusedOnFirstTabOnStart = (state: boolean): void => {
  settingsStore.setIsFocusedOnFirstTabOnStart(state);
};

const onFocusedOnNewTab = (state: boolean): void => {
  settingsStore.setIsFocusedOnNewTab(state);
};

// const onUpdateContentFontSize = (size: number): void => {
//   settingsStore.setEditorGeneralContentFontSize(size);
// };

// const onUpdateContentMode = (mode: any): void => {
//   settingsStore.setEditorGeneralContentMode(mode);
// };
</script>

<style lang="scss"></style>
