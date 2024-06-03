<template lang="pug">
div.content-group-v
    UILogoLarge
    p Version: {{ version }}
    p Author: {{ author }}
    p 2024
</template>

<script setup lang="ts">
import UILogoLarge from "@/components/atoms/base/logos/UILogoLarge.vue";

const version = import.meta.env.APP_VERSION;
const author = import.meta.env.APP_AUTHOR;
</script>

<style lang="scss"></style>
