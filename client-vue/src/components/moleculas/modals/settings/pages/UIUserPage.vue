<template lang="pug">
UIButton(
    :label="`Logout`"
    aria-label="logout"
    @press="onLogout"
)
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import { PublicRoutes } from "@/router";

import UIButton from "@/components/atoms/base/buttons/UIButton.vue";

const router = useRouter();

const authStore = useAuthStore();

const onLogout = (): void => {
  authStore.logout();
  router.push({ path: PublicRoutes.LOGIN });
};
</script>

<style lang="scss"></style>
