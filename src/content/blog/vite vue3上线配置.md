---
title: "vite vue3上线配置"
pubDate: 2025-06-02
draft: false
description: "vite vue3上线配置"
tags: ["vite", "vue3"]
---

vite.config.ts
```js
defineConfig({
    base: '/'
})
```

nginx.conf
```shell
server {
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

注意： 访问的时候不能是 /index.html    是 /