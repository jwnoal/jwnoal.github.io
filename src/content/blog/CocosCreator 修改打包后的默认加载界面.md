---
title: 'CocosCreator 修改打包后的默认加载界面'
pubDate: 2022-07-01
draft: false
description: "This is the first post of my new Astro blog."
tags: ["cocos creator"]
---

以web-mobile发布网页端为例子

1.  在项目目录下创建build-templates/web-mobile
2.  构建一次项目，并复制发布目录build/web-mobile下main.js和index.html，css到这个文件夹,修改代码即可

cocos 会在编译的时候把build-templates/web-mobile中的文件拷贝过去