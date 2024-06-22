---
title: "vite 打包上线后文件因缓存报错"
published: 2024-05-21
draft: false
description: "vite 打包上线后文件因缓存报错"
tags: ["vue", "vite", "报错"]
---

vite 打包上线后 html 文件会被缓存，而引用的文件则被改了 hash，导致报错

```js
const app = createApp(App);

const errorHandler = (error: Error, vm: any, info: string) => {
  console.error("errorHandler", error, vm, info);
  const fetchResourcesErrors = [
    "Failed to fetch dynamically imported module",
    "Importing a module script failed",
  ];
  if (
    fetchResourcesErrors.some(
      (item) => error?.message && error.message?.includes(item)
    )
  ) {
    window.location.reload();
  }
};

(app as any).config.errorHandler = errorHandler;

```

#### 错误边界 ErrorBoundary

可以使用 vue-error-boundary 组件，它可以捕获子组件抛出的错误，并渲染出一个错误界面。
