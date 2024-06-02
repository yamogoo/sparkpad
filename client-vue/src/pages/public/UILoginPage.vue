<template lang="pug">
UILoginForm(
  @submit:data="onLogin"
)
</template>

<script setup lang="ts">
import { reactive } from "vue";
import UILoginForm from "@/components/moleculas/auth/UILoginForm.vue";

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const formValue = reactive({
  login: "",
  password: "",
});

const onLogin = () => {};
</script>

<style lang="scss"></style>
