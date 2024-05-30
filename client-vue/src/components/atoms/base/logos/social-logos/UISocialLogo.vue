<template lang="pug">
component(:is="component")
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { SocialLogos } from "./Logos";

interface Props {
  name: SocialLogos;
}

const props = defineProps<Props>();

const component = defineAsyncComponent(() => {
  return import(`./symbols/${props.name}Logo.vue`);
});
</script>

<script lang="ts">
export { SocialLogos } from "./Logos";
</script>
