---
title: "CocosCreator 修改打包后的默认加载界面"
published: 2022-07-01
draft: false
description: "CocosCreator 修改打包后的默认加载界面"
tags: ["cocos creator"]
category: "代码"
---

以 web-mobile 发布网页端为例子

1.  在项目目录下创建 build-templates/web-mobile
2.  构建一次项目，并复制发布目录 build/web-mobile 下 main.js 和 index.html，css 到这个文件夹,修改代码即可

cocos 会在编译的时候把 build-templates/web-mobile 中的文件拷贝过去
