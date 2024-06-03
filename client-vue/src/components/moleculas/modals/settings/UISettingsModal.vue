<template lang="pug">
div.settings-view
  UISettingsMenu
  div.settings-view__content
    UISettingsAboutPage(
      v-if="route.path === Routes.ABOUT"
    )
    UISettingsGeneralPage(
      v-if="route.path === Routes.GENERAL"
    )
    UISettingsEditorPage(
      v-if="route.path === Routes.EDITOR"
    )
</template>

<script setup lang="ts">
import { useSettingsRoute, Routes } from "./settingsRouter";

import UISettingsMenu from "@/components/moleculas/modals/settings/UISettingsMenu.vue";
import UISettingsAboutPage from "./pages/UISettingsAboutPage.vue";
import UISettingsEditorPage from "./pages/UISettingsEditorPage.vue";
import UISettingsGeneralPage from "./pages/UISettingsGeneralPage.vue";

const route = useSettingsRoute();
</script>

<style lang="scss">
.settings-view {
  display: flex;
  flex-direction: row;
  gap: 0px;
  @include box(100%);

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    @include box(100%);

    p {
      font-size: 15px;
      letter-spacing: 0.3px;

      @include themify($themes) {
        color: themed("text", "secondary");
      }
    }
  }
}

.content-group-v {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}
</style>
