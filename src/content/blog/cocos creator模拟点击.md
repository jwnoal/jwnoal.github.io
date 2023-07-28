---
title: 'cocos creator模拟点击'
description: 'cocos creator模拟点击'
pubDate: '2023-07-23'
heroImage: '/blog-placeholder-4.jpg'
---

```js
const event = new cc.Event.EventCustom("touchstart", true);
this.node.dispatchEvent(event);
```