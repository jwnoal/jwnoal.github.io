---
title: '配置astro markdown code 主题'
pubDate: 2023-10-16
draft: false
description: "配置astro markdown code 主题"
tags: ["astro", "markdown", "Shiki", "Prism"]
---

在astro.config.mjs文件中配置markdown

```js
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://jump.icu',
  integrations: [],
  markdown: {
    shikiConfig: {
      // 选择 Shiki 内置的主题（或添加你自己的主题）
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'one-dark-pro',
      // 添加自定义语言
      // 注意：Shiki 内置了无数语言，包括 .astro！
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // 启用自动换行，以防止水平滚动
      wrap: true,
    },
  },
});
```

[文档链接](https://docs.astro.build/zh-cn/guides/markdown-content/#%E8%AF%AD%E6%B3%95%E9%AB%98%E4%BA%AE)