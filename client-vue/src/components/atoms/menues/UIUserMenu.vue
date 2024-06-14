<template lang="pug">
div.user-menu(
  data-testid="user-menu"
)
  div.user-menu__body
    UIActionButton(
      data-testid="menu-button"
      :icon-name="Symbols.MENU"
      aria-label="toggle navigator"
      :isActive="navigatorRoute.path === NavigatorRoutes.MINIMIZE"
      @click="() => { navigatorRouter.push({ path: NavigatorRoutes.MINIMIZE }); onMinimize(true); }"
    )
    UIActionButton(
      data-testid="navigator-menu"
      :icon-name="Symbols.DIR"
      aria-label="navigator menu"
      :isActive="navigatorRoute.path === NavigatorRoutes.HIERARCHY_MENU"
      @click="() => { navigatorRouter.push({ path: NavigatorRoutes.HIERARCHY_MENU }); onMinimize(false); }"
    )
    UIActionButton(
      data-testid="search-button"
      :icon-name="Symbols.SEARCH"
      aria-label="search in navigator"
      :isActive="navigatorRoute.path === NavigatorRoutes.SEARCH"
      @click="() => { navigatorRouter.push({ path: NavigatorRoutes.SEARCH }); onMinimize(false); }"
    )
    UIActionButton(
      data-testid="favorites-button"
      :icon-name="Symbols.FAVORITES"
      aria-label="open favorites"
      :isActive="navigatorRoute.path === NavigatorRoutes.FAVORITES"
      @click="() => { navigatorRouter.push({ path: NavigatorRoutes.FAVORITES }); onMinimize(false); }"
    )
  div.user-menu__footer
    UIModalView(
      v-if="isSettingsOpen"
      :show="isSettingsOpen"
      @close="onSettingsClose"
    )
        
      UISettingsModal
    UIActionButton(
      data-testid="user-button"
      :icon-name="Symbols.USER_THUMBNAIL"
      aria-label="user settings"
      @click="onUserPage"
    )
    UIActionButton(
      data-testid="settings-button"
      :icon-name="Symbols.SETTINGS"
      aria-label="settings"
      @click="onOpenSettings"
    )
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  useSettingsRouter,
  Routes as SettingsRoutes,
} from "@/components/moleculas/modals/settings/settingsRouter";

import {
  useNavigatorRouter,
  useNavigatorRoute,
  Routes as NavigatorRoutes,
} from "@/components/moleculas/navigator/navigatorRouter";

import { useSettingsStore } from "@/stores/settings";

import { Symbols } from "@/components/atoms/base/icons/UIIcon.vue";
import UIModalView from "@/components/atoms/modals/UIModalView.vue";
import UISettingsModal from "@/components/moleculas/modals/settings/UISettingsModal.vue";
import UIActionButton from "@/components/atoms/base/buttons/UIActionButton.vue";

const settingsRouter = useSettingsRouter();
const navigatorRouter = useNavigatorRouter();
const navigatorRoute = useNavigatorRoute();

const settingsStore = useSettingsStore();

const isMainMenuMinimized = computed(() => settingsStore.isMainMenuMinimized);
const isSettingsOpen = ref(false);

const onMinimize = (isMinimized: boolean): void => {
  settingsStore.setIsMainMenuMinimized(isMinimized);
};

const onOpenSettings = (): void => {
  isSettingsOpen.value = true;
};

const onSettingsClose = (): void => {
  isSettingsOpen.value = false;
  settingsRouter.push({ path: SettingsRoutes.ABOUT });
};

const onUserPage = (): void => {
  settingsRouter.push({ path: SettingsRoutes.USER });
  isSettingsOpen.value = true;
};
</script>

<style lang="scss">
$__section-gap: 12px;

.user-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 56px;
  height: 100%;

  @include themify($themes) {
    border-right: 1px solid themed("border", "primary");
  }

  &__body,
  &__footer {
    display: flex;
    flex-direction: column;
    gap: $__section-gap;
    align-items: center;
    padding: 10px 8px;

    .action-button {
      width: 100%;
      @include padding-h(auto);
    }
  }

  &__body {
    justify-content: space-between;
    width: 100%;
  }

  &__footer {
    height: max-content;
    padding-bottom: 20px;
  }

  .icon {
    @include themify($themes) {
      fill: themed("text", "primary");
    }
  }
}
</style>
