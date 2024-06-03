<template lang="pug">
div.user-menu(
  data-test-id="user-menu"
)
  div.user-menu__body
    UIActionButton(
      :icon-name="Symbols.MENU"
      aria-label="toggle navigator"
      @click="onToggleMenu"
    )
    div.user-menu__footer
      UIModalView(
        v-if="isSettingsOpen"
        :show="isSettingsOpen"
        @close="onSettingsClose"
      )
          
        UISettingsModal
      UIActionButton(
        :icon-name="Symbols.USER_THUMBNAIL"
        aria-label="user settings"
        @click="onUserPage"
      )
      UIActionButton(
        :icon-name="Symbols.SETTINGS"
        aria-label="settings"
        @click="onOpenSettings"
      )
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSettingsRouter } from "@/components/moleculas/modals/settings/settingsRouter";

import { Symbols } from "@/components/atoms/base/icons/UIIcon.vue";

import UIModalView from "@/components/atoms/modals/UIModalView.vue";
import UISettingsModal from "@/components/moleculas/modals/settings/UISettingsModal.vue";
import UIActionButton from "@/components/atoms/base/buttons/UIActionButton.vue";

const settingsRouter = useSettingsRouter();

const isSettingsOpen = ref(false);

const onToggleMenu = (): void => {};

const onOpenSettings = (): void => {
  isSettingsOpen.value = true;
};

const onSettingsClose = (): void => {
  isSettingsOpen.value = false;
  settingsRouter.push({ path: "/about" });
};

const onUserPage = (): void => {
  settingsRouter.push({ path: "/user" });
  isSettingsOpen.value = true;
};
</script>

<style lang="scss">
.user-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 56px;
  height: 100%;

  @include themify($themes) {
    border-right: 1px solid themed("border", "primary");
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    @include box(100%);
    padding: 10px;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    height: auto;
    padding: 10px;
    padding-bottom: 20px;
  }

  .icon {
    @include themify($themes) {
      fill: themed("text", "primary");
    }
  }
}
</style>
