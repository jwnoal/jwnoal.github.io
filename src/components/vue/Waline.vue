<template>
  <div id="waline" class="mydiv"></div>
</template>

<script setup lang="ts">
import { init } from "@waline/client";
import "@waline/client/style";
import { onMounted, ref } from "vue";

onMounted(() => {
  setTimeout(() => {
    init({
      el: "#waline",
      serverURL: "https://waline.jump.icu",
      comment: true,
      reaction: true,
      dark: true,
      pageview: false,
    });
  }, 200);
});
</script>

<style scoped>
#waline {
  width: 100%;
  max-width: 100ch;
}
:deep(.wl-reaction-title) {
  color: #999 !important;
}
</style>
