---
title: "准时的setTimeout"
published: 2024-06-11
draft: false
description: "准时的setTimeout"
tags: ["js"]
category: "代码"
---

```js
function timer() {
  var speed = 500,
    counter = 1,
    start = new Date().getTime();

  function instance() {
    var real = counter * speed,
      ideal = new Date().getTime() - start;

    counter++;

    var diff = ideal - real;
    form.diff.value = diff;

    window.setTimeout(function () {
      instance();
    }, speed - diff); // 通过系统时间进行修复
  }

  window.setTimeout(function () {
    instance();
  }, speed);
}
```
