---
title: "uniapp 使用unibest搭建项目框架"
published: 2024-08-04
draft: false
description: "uniapp 使用unibest搭建项目框架"
tags: ["uniapp"]
category: "代码"
---

文档地址[https://codercup.github.io/unibest-docs/base/1-introduction](https://codercup.github.io/unibest-docs/base/1-introduction)

由于我项目中用了 unicloud，只能用 hbx 的 base 模板

```zsh
pnpm create unibest my-project -t hbx-base
```

文档:[https://github.com/codercup/unibest-hbx](https://github.com/codercup/unibest-hbx)

按照教程安装会发生报错：
```js
SyntaxError: Cannot use import statement outside a module
```
解决方案：
package.json 新增 "type": "module"

然后报
```
Uni is not a function
```

解决方案：
vite.config.ts中 plugins：Uni() 改为 Uni.default()