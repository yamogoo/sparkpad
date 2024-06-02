<template lang="pug">
div.content-group-v
    UILogoLarge
    p Version: {{ version }}
    p Author: Misha Grebennikov
</template>

<script setup lang="ts">
import UILogoLarge from "@/components/atoms/base/logos/UILogoLarge.vue";

const version = import.meta.env.APP_VERSION;
</script>

<style lang="scss"></style>
