---
title: 'cocos creator 快速替换所有字体'
description: 'cocos creator 快速替换所有字体'
pubDate: '2023-07-23'
heroImage: '/blog-placeholder-4.jpg'
---

1. 首先将带系统字体的label拉出prefab 将prefab放进代码编辑器
```js
"_N$file": null,
"_isSystemFontUsed": true,
```

2. 将新字体的label拉出成prefab,放入代码编辑器
```js
"_N$file": {
      "__uuid__": "ec95d2e3-d546-4d80-821e-002d51dd3c3a"
    },
    "_isSystemFontUsed": false,
```
3. 将1的这段代码更改成2的代码，查看是否更改成功

4. 全局替换