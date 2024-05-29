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
  });

  pageviewCount({
    serverURL: "https://waline.jump.icu",
    path: window.location.pathname,

    // 可选的，用于自定选择器，默认为 `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // 可选的，是否在获取时增加访问量，默认为 `true`
    update: false,
  });
});
</script>

<style scoped>
#waline {
  width: 100%;
  max-width: 100ch;
}
</style>
