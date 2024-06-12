<template lang="pug">
UISheet
  UICellOption(
    data-testid="place-note-next"
    :title="`Always place new note at the end`"
    :description="placedNoteNextDuringCreationDescription"
    :show-description="true"
  )
    UISwitch(
      data-testid="place-note-next-control"
      :state="isPlacedNoteNextDuringCreation"
      @update:state="onPlaceNoteToTheEndDuringCreation"
    )
  UICellOption(
    data-testid="open-first-on-startup"
    :title="`Always open first note on startup`"
    :description="focusOnFirstNoteOnStartup"
    :show-description="true"
  )
    UISwitch(
      data-testid="open-first-on-startup-control"
      :state="isFocusedOnFirstNoteOnStart"
      @update:state="onFocusedOnFirstNoteOnStart"
    )
  UICellOption(
    data-testid="open-new-on-creation"
    :title="`Always open a new note after creation`"
    :show-description="true"
  )
    UISwitch(
      data-testid="open-new-on-creation-control"
      :state="isFocusedOnNewTab"
      @update:state="onFocusedOnNewTab"
    )
  UICellOption(
    data-testid="scroll-to-note"
    :title="`Scroll to current note`"
    :description="'In list view, always scroll to current note'"
    :show-description="true"
  )
    UISwitch(
      data-testid="open-new-on-creation-control"
      :state="isHierarchyScrollToNoteEnabled"
      @update:state="onScrollToCurrentNote"
    )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/stores/settings";

import UICellOption from "@/components/atoms/base/cells/UICellOption.vue";
import UISheet from "@/components/atoms/views/UISheet.vue";
import UISwitch from "@/components/atoms/base/switches/UISwitch.vue";

const content = {
  placedNoteNextDuringCreation: {
    true: {
      description:
        "The new note will be placed next to the previous selected note in the navigation list once created.",
    },
    false: {
      description:
        "The new note will be placed at the end of the navigation list once created.",
    },
  },
  focusOnFirstNoteOnStartup: {
    true: {
      description: "When the application starts, the first tab will open.",
    },
    false: {
      description: "When the application starts, no tab will be open.",
    },
  },
};

const settingsStore = useSettingsStore();

/* * * Menu * * */

const isPlacedNoteNextDuringCreation = computed(() => {
  return settingsStore.IsPlacedNoteNextDuringCreation;
});

const placedNoteNextDuringCreationDescription = computed(() => {
  return isPlacedNoteNextDuringCreation.value
    ? content.placedNoteNextDuringCreation.true.description
    : content.placedNoteNextDuringCreation.false.description;
});

const onPlaceNoteToTheEndDuringCreation = (state: boolean): void => {
  settingsStore.seiIsPlacedNoteNextDuringCreation(state);
};

const isFocusedOnFirstNoteOnStart = computed(() => {
  return settingsStore.isFocusedOnFirstNoteOnStart;
});

const focusOnFirstNoteOnStartup = computed(() => {
  return isFocusedOnFirstNoteOnStart.value
    ? content.focusOnFirstNoteOnStartup.true.description
    : content.focusOnFirstNoteOnStartup.false.description;
});

const onFocusedOnFirstNoteOnStart = (state: boolean): void => {
  settingsStore.setIsFocusedOnFirstNoteOnStart(state);
};

const isHierarchyScrollToNoteEnabled = computed(() => {
  return settingsStore.isHierarchyScrollToNoteEnabled;
});

const onScrollToCurrentNote = (isEnabled: boolean): void => {
  settingsStore.setIsHierarchyScrollToNoteEnabled(isEnabled);
};

/* * * Tabbar * * */

const isFocusedOnNewTab = computed(() => settingsStore.isFocusedOnNewTab);

// const contentFontSizes = computed(
//   () => settingsStore.editor.general.content.font.sizes
// );
// const contentFontSizeSid = computed(() => settingsStore.contentFontSizeSid);

/* * * Handlers * * */

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
