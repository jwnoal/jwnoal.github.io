<template>
  <div ref="waline" id="waline" class="mydiv"></div>
</template>

<script setup lang="ts">
import { init, pageviewCount } from "@waline/client";
import "@waline/client/style";
import { ref, onMounted } from "vue";

interface Props {
  title: string;
}

const waline = ref(null);
const props = defineProps<Props>();



onMounted(() => {
  init({
    el: waline.value,
    serverURL: "https://waline.jump.icu/",
    reaction: true,
    path: props.title,
    dark: true,
    pageview: true,
  });
});
</script>

<style scoped>
#waline {
  width: 100%;
  max-width: 100ch;
}
</style>
