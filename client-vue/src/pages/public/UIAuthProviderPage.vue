<template lang="pug">
Transition(
  :css="false"
)
  UIFormProvider.login-form(
    v-if="isMounted"
    :show-error="false"
    :error-message="''"
    @update:show-error="onUpdateShowError"
  )
    template(#navigation)
      UITabbar(
        :items="navigationItems"
        @open="onOpenTabLink"
      )
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import UIFormProvider from "@/components/atoms/forms/UIFormProvider.vue";
import UITabbar, {
  type TabbarItem,
} from "@/components/atoms/bars/tabbar/UITabbar.vue";

const navigationItems: Array<TabbarItem> = [
  { name: "Sign in", path: "/public/login" },
  { name: "Sign out", path: "/public/register" },
];

const isMounted = ref(false);

onMounted(() => (isMounted.value = true));

const onOpenTabLink = (item: TabbarItem): void => {
  console.log(item);
};

const onUpdateShowError = (): void => {};
</script>
