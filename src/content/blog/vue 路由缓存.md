---
title: "vue 路由缓存"
pubDate: 2024-04-09
draft: false
description: "vue 路由缓存"
tags: ["vue"]
---

*遇到的坑 /home/index.vue 不生效 /home/home.vue 生效*

```ts
<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="includeList">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
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
```

router.ts

```ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
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
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
});

export default router;
```
