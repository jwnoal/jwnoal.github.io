---
title: "cocos creator模拟点击"
published: 2022-07-01
draft: false
description: "cocos creator模拟点击"
tags: ["cocos creator"]
category: "代码"
---

```js
const event = new cc.Event.EventCustom("touchstart", true);
this.node.dispatchEvent(event);
```
