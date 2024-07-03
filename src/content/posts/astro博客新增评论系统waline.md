---
title: "astro博客新增评论系统waline"
published: 2023-11-04
draft: false
description: "astro博客新增评论系统waline"
tags: ["astro"]
category: "代码"
---

[文档地址：https://waline.js.org/guide/get-started/](https://waline.js.org/guide/get-started/)

首先跟着文档的快速上手操作

需要注意的是：  
点击顶部的 Settings - Environment Variables 进入环境变量配置页，并配置三个环境变量 LEAN_ID, LEAN_KEY 和 LEAN_MASTER_KEY 。它们的值分别对应上一步在 LeanCloud 中获得的 APP ID, APP KEY, Master Key。
![](https://cdn.jiangwei.zone/blog/202311041612746.png)

具体配置：  
![](https://cdn.jiangwei.zone/blog/202311041614031.png)
在 value 处分别对应填入你的 APP ID, APP KEY, Master Key

然后继续跟着文档操作~~

#### astro 中放入评论组件

安装@waline/client

```js
npm i -D @waline/client
```

可能会报错说少安装了 @waline/api、recaptcha-v3

```js
npm i -D @waline/api recaptcha-v3
```

新建 vue 文件

```vue
<template>
  <div ref="waline" id="waline"></div>
</template>

<script setup lang="ts">
import { init } from "@waline/client";
import "@waline/client/dist/waline.css";
import { ref, onMounted, defineProps } from "vue";

interface Props {
  title: string;
}

const waline = ref(null);
const props = defineProps<Props>();

onMounted(() => {
  init({
    el: waline.value,
    serverURL: "为你在vercel中visit的地址",
    path: props.title, //区分评论路径
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
```

在 astro blog 模板中把组件放进去 (BlogLayout.astro)

```js
import Waline from "../components/vue/Waline.vue";
const { title } = Astro.props;
<Waline title={title} client:load />;
```

解决 vercel 域名被墙问题，使用自定义域名：

将 A 记录从 76.76.21.21 改成 76.223.126.88 官方建议将 cname 从 cname.vercel-dns.com 修改为 cname-china.vercel-dns.com
