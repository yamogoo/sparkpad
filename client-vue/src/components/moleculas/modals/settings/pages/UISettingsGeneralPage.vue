<template lang="pug">
UISheet
    UICellOption(
        title="Adaptive theme"
        description="Depending on the time of day, a light or dark theme is automatically activated"
        :show-description="true"
    )
        UISwitch(
            :state="isAdaptiveTheme"
            @update:state="onToggleTheme"
        )
    UICellOption(
        v-if="!isAdaptiveTheme"
        title="Default theme"
        :show-description="true"
    )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/stores/settings";

import UICellOption from "@/components/atoms/base/cells/UICellOption.vue";
import UISheet from "@/components/atoms/views/UISheet.vue";
import UISwitch from "@/components/atoms/base/switches/UISwitch.vue";

const settingsStore = useSettingsStore();

const isAdaptiveTheme = computed(() => !!settingsStore.getTheme.id);

const onToggleTheme = (state: boolean): void => {
  settingsStore.setTheme(state);
};
</script>

<style lang="scss"></style>
