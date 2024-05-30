<template lang="pug">
UIRegisterForm(
  @submit:data="onRegister"
)
</template>

<script setup lang="ts">
import { reactive } from "vue";
import UIRegisterForm from "@/components/moleculas/login/UIRegisterForm.vue";

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const formValue = reactive({
  login: "",
  password: "",
});

const onRegister = () => {};
</script>

<style lang="scss"></style>
