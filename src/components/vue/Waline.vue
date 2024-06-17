<template>
  <div id="waline" class="mydiv"></div>
</template>

<script setup lang="ts">
import { init } from "@waline/client";
import "@waline/client/style";
import { ref, onMounted } from "vue";

onMounted(() => {
  init({
    el: "#waline",
    serverURL: "https://waline.jump.icu/",
    comment: true,
    reaction: true,
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
