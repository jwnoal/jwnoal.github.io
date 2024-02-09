<template>
  <div ref="waline" id="waline" class="mydiv"></div>
</template>

<script setup lang="ts">
import { init } from "@waline/client";
import "@waline/client/dist/waline.css";
import { ref, onMounted } from "vue";

interface Props {
  title: string;
}

const waline = ref(null);
const props = defineProps<Props>();

onMounted(() => {
  init({
    el: waline.value,
    serverURL: "https://waline.jiangwei.zone/",
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
