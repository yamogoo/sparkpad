<template lang="pug">
UISheet
  UICellOption(
    title="Editing mode"
    :show-description="true"
  )
    UIOptionPicker(
      :init-option="modes[0]"
      :options="modes"
    )
    UICellOption(
      title="Font size"
      :show-description="true"
    )
      UIRangeSlider(
        :max="contentFontSizes.length"
        :value="contentFontSizeSid"
        :step="1"
        :showRangebar="true"
      )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/stores/settings";

import UICellOption from "@/components/atoms/base/cells/UICellOption.vue";
import UISheet from "@/components/atoms/views/UISheet.vue";
import UIRangeSlider from "@/components/atoms/base/sliders/UIRangeSlider.vue";
import UIOptionPicker, {
  type PickerOption,
} from "@/components/atoms/base/pickers/UIOptionPicker.vue";

const settingsStore = useSettingsStore();

const contentFontSizes = computed(
  () => settingsStore.editor.general.content.font.sizes
);
const contentFontSizeSid = computed(() => settingsStore.getContentFontSizeSid);

const modes: PickerOption<number>[] = [
  { label: "Editing View", value: 1 },
  { label: "Reading View", value: 2 },
];

const onUpdateContentFontSize = (size: number): void => {
  settingsStore.setEditorGeneralContentFontSize(size);
};

const onUpdateContentMode = (mode: any): void => {
  settingsStore.setEditorGeneralContentMode(mode);
};
</script>

<style lang="scss"></style>
