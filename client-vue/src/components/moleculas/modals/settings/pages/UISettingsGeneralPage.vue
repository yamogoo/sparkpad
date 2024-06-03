<template lang="pug">
UISheet
    UICellOption(
        data-test-id="settings-theme"
        :title="`Theme (${themeName})`"
        description="Selecting the application color theme"
        :show-description="true"
    )
        UISwitch(
            data-test-id="settings-theme-control"
            :state="isLightTheme"
            @update:state="onToggleTheme"
        )
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/stores/settings";

import UICellOption from "@/components/atoms/base/cells/UICellOption.vue";
import UISheet from "@/components/atoms/views/UISheet.vue";
import UISwitch from "@/components/atoms/base/switches/UISwitch.vue";

const settingsStore = useSettingsStore();

const isLightTheme = computed(() => !!settingsStore.getTheme.id);

const themeName = computed(() => settingsStore.getTheme.theme);

const onToggleTheme = (state: boolean): void => {
  settingsStore.setTheme(state);
};
</script>

<style lang="scss"></style>
