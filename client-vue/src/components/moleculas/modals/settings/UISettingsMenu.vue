<template lang="pug">
div.settings-menu(
  data-test-id="settings-menu"
)
  UICellButton(
    :title="isAuthenticated ? user?.login : 'login'"
    :description="user?.email"
    :show-description="false"
    :default-symbol="Symbols.USER_THUMBNAIL"
    @open="onLogin"
  )
  UISimpleMenu(
    v-slot="{ item }"
    title="options"
    :items
    :sid="menuSid"
    @open="onOpen"
  )
    h6 {{ item.name }}
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Routes, useSettingsRouter } from "./settingsRouter";

import { Symbols } from "@/components/atoms/base/icons/Symbols";

import UISimpleMenu from "@/components/atoms/base/menues/UISimpleMenu.vue";
import UICellButton from "@/components/atoms/base/cells/UICellButton.vue";

const router = useSettingsRouter();

/* * * Auth * * */

const authStore = useAuthStore();
const menuSid = ref(0);

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

const items = ref([
  { name: "About", path: Routes.ABOUT },
  { name: "General", path: Routes.GENERAL },
  { name: "Editor", path: Routes.EDITOR },
]);

const onOpen = (idx: number) => {
  menuSid.value = idx;
  router.push({ path: items.value[idx].path });
};

const onLogin = () => {
  menuSid.value = -1;
  router.push({ path: Routes.USER });
};
</script>

<style lang="scss">
.settings-menu {
  width: 280px;
  height: 100%;
  padding: 12px;

  @include themify($themes) {
    background-color: themed("background", "accent");
    border-right: 1px solid themed("border", "window");
  }

  .simple-menu {
    margin-top: 24px;
  }

  .simple-menu__header {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 15px;
      font-weight: 400;
      padding: 0px;
      margin: 0px;

      @include themify($themes) {
        color: themed("text", "secondary");
        opacity: 0.4;
      }
    }
  }
}
</style>
