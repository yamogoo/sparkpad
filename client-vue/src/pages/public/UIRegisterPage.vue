<template lang="pug">
UIRegisterForm
</template>

<script setup lang="ts">
import { reactive } from "vue";
import UIRegisterForm from "@/components/moleculas/auth/UIRegisterForm.vue";

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const formValue = reactive({
  login: "",
  password: "",
});

const onRegister = () => {};
</script>

<style lang="scss"></style>
