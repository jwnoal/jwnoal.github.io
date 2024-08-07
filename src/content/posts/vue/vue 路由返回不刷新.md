---
title: "vue 路由返回不刷新"
published: 2022-07-01
draft: false
description: "vue 路由返回不刷新"
tags: ["vue", "router"]
category: "代码"
---

router 路由配置 router/index.js

```js
const routes = [
  {
    path: "/pageA",
    name: "pageA",
    component: () => import("../views/pageA.vue"),
    meta: {
      title: "我是页面A",
      keepAlive: true,
    },
  },
  {
    path: "/pageB",
    name: "pageB",
    component: () => import("../views/pageB.vue"),
    meta: {
      title: "我的页面B",
      keepAlive: false,
    },
  },
];
const router = new VueRouter({
  routes,
});

Vue.use(VueRouter);
```

```js
<keep-alive>
	<router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
 <router-view v-if="!$route.meta.keepAlive"></router-view>
```

```js
router.back();
```

#### chatgpt

可以在路由配置中添加`{reload: true}`，即可实现前进刷新，后退不刷新的效果。

```javascript
const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        reload: true,
      },
    },
  ],
});
```
