---
title: 'cocos creator模拟点击'
pubDate: 2022-07-01
draft: false
description: "This is the first post of my new Astro blog."
tags: ["astro", "blogging", "learning in public"]
---

```js
const event = new cc.Event.EventCustom("touchstart", true);
this.node.dispatchEvent(event);
```