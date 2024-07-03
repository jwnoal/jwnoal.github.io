---
title: "cocos creator 快速替换所有字体"
published: 2022-07-01
draft: false
description: "cocos creator 快速替换所有字体"
tags: ["cocos creator"]
category: "代码"
---

1. 首先将带系统字体的 label 拉出 prefab 将 prefab 放进代码编辑器

```js
"_N$file": null,
"_isSystemFontUsed": true,
```

2. 将新字体的 label 拉出成 prefab,放入代码编辑器

```js
"_N$file": {
      "__uuid__": "ec95d2e3-d546-4d80-821e-002d51dd3c3a"
    },
    "_isSystemFontUsed": false,
```

3. 将 1 的这段代码更改成 2 的代码，查看是否更改成功

4. 全局替换
