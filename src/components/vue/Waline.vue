<template>
  <div ref="waline" id="waline" class="mydiv"></div>
</template>

<script setup lang="ts">
import { init } from "@waline/client";
import "@waline/client/dist/waline.css";
import { ref, onMounted, defineProps } from "vue";

interface Props {
  title: string
}

const waline = ref(null);
const props = defineProps<Props>();

onMounted(() => {
  init({
    el: waline.value,
    serverURL: "https://my-waline-jbsf3fx5k-jwnoal.vercel.app",
    path: props.title,
    dark: true,
  });
});
</script>

<style scoped>
#waline {
  width: 100%;
  max-width: 100ch;
}
</style>
