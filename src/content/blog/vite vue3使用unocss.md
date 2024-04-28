---
title: "vite vue3使用unocss"
pubDate: 2024-04-28
draft: false
description: "vite vue3使用unocss"
tags: ["vite css unocss"]
---

### 安装unocss
```shell
pnpm add unocss -D
```

vite.config.ts

```ts 
import UnoCSS from "unocss/vite";

plugins: [UnoCSS()]
```

main.ts

```ts
import 'virtual:uno.css';
```

安装@unocss/preset-rem-to-px
```shell
pnpm add @unocss/preset-rem-to-px -D
```

uno.config.js
```js
import { defineConfig, presetAttributify, presetUno } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetRemToPx({
      baseFontSize: 4,
    }),
  ],
});

```


```vue
<h1 class="text-24 font-bold m-10 mt-20 w-50">Hello world!</h1>
```

localhost:5173/__unocss