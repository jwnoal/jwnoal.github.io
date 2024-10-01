---
title: "控制台出现removed in Dart Sass 2.0.0"
published: 2024-05-21
draft: false
description: "DEPRECATION WARNING: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0."
tags: ["vue", "vite", "报错"]
category: "代码"
---

控制台报错

```js
DEPRECATION WARNING: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
```

```js
// vite.config.js
css: {
      preprocessorOptions: {
        scss: {
          additionalData: "",
        },
      },
}
```

或
```js
css: {
    preprocessorOptions: {
        scss: {
            api: 'modern-compiler', // or 'modern'
        },
    },
},
```

如果只想让弃用警告静音，可以使用silenceDeprecations选项：
```js
css: {
    preprocessorOptions: {
        scss: {
            silenceDeprecations: ['legacy-js-api']
        },
    },
},
```