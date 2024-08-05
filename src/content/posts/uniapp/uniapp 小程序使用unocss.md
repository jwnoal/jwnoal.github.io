---
title: "uniapp 小程序使用unocss"
published: 2024-08-05
draft: false
description: "uniapp 小程序使用unocss"
tags: ["uniapp"]
category: "代码"
---

项目用``npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project``创建的。

#### 安装unocss
```zsh
pnpm add unocss unocss-applet -D
```

vite.config.ts

```zsh
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'

export default async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return defineConfig({
    plugins: [
      Uni(),
      UnoCSS()
    ]
  })
}
```

uno.config.ts

```zsh
import { defineConfig } from 'unocss'
import { presetApplet, presetRemRpx } from 'unocss-applet'

export default defineConfig({
	presets: [
		presetApplet(),
		presetRemRpx({
			baseFontSize: 4,
			screenWidth: 750,
		}),
	]
})
```

main.ts

```ts
import 'uno.css';
```