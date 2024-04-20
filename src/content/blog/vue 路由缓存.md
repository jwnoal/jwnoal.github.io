---
title: "vue 路由缓存+过渡效果"
pubDate: 2024-04-09
draft: false
description: "vue 路由缓存+过渡效果"
tags: ["vue"]
---

遇到的坑 /home/index.vue 不生效 /home/home.vue 生效

```ts
<template>
<router-view v-slot="{ Component }">
  <transition name="fade" mode="out-in">
    <keep-alive :include="includeList">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </transition>
</router-view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { RouteLocationNormalized, useRoute } from "vue-router";

const route = useRoute();
const includeList = ref<string[]>([]);
watch(route, (to: RouteLocationNormalized) => {
  if (
    to.meta.keepAlive &&
    includeList.value.indexOf(String(to.name)) === -1
  ) {
    includeList.value.push(String(to.name));
  }
});
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

router.ts

```ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/home.vue"),
    meta: { keepAlive: true, tabbar: true },
  },
  {
    path: "/gamelist",
    name: "gamelist",
    component: () => import("@/views/game/gamelist.vue"),
    meta: { keepAlive: true, tabbar: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
});

//layout 为overflow:auto的节点
router.beforeEach((to, from, next) => {
  // 记录滚动条位置
  if (from.meta.keepAlive) {
    const scrollTop = (document.getElementById("layout") as HTMLElement)
      .scrollTop;
    useGlobalStore().setSavedPosition(String(from.name), scrollTop);
  }
  if (to.meta.keepAlive) {
    const scrollTop = useGlobalStore().savedPosition[String(to.name)];
    console.log(scrollTop, document.getElementById("layout"));
    setTimeout(() => {
      (document.getElementById("layout") as any).scrollTop = scrollTop;
    }, 300);
  }
  next();
});

export default router;
```
