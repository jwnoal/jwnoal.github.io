---
title: "vue 滑动头部渐变背景"
published: 2024-04-02
draft: false
description: "vue 滑动头部渐变背景"
tags: ["vue"]
category: "代码"
---

```vue
<template>
  <div class="home-head">
    <div class="bg" :style="{ opacity: opacity }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const opacity = ref(0);
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
function handleScroll() {
  const scrollTop = window.scrollY;
  const top = 20;
  if (scrollTop > top) {
    opacity.value = (scrollTop - top) / 100;
    opacity.value = opacity.value > 1 ? 1 : opacity.value;
  } else {
    opacity.value = 0;
  }
}
</script>

<style lang="scss">
.home-head {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #090817;
    z-index: -1;
  }
}
</style>
```
