---
title: "vite 打包图片压缩插件"
pubDate: 2023-12-21
draft: false
description: "vite 打包图片压缩插件"
tags: ["vite"]
---

vite-plugin-imagemin 有点慢，换成 unplugin-imagemin/vite  
地址：[https://github.com/unplugin/unplugin-imagemin](https://github.com/unplugin/unplugin-imagemin)

```js
pnpm add unplugin-imagemin@latest -D
```

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import imagemin from "unplugin-imagemin/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), imagemin()],
});
```
