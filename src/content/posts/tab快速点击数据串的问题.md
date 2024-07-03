---
title: "tab快速点击数据串的问题"
published: 2024-05-22
draft: false
description: "tab快速点击数据串的问题"
tags: ["vue"]
category: "代码"
---

### 问题描述

tab 连续快速切换的时候，由于数据请求是异步的，所以导致数据可能是上个 tab 的数据

### 解决方案

#### 1. 使用 axios cancel

#### 2. 每个 tab 都用一个变量来储存，切换时候不请求数据

#### 3. 判断下当前 tab 索引是否为请求时候的索引

```js
function getData() {
  const tab = tab.value;
  a().then(() => {
    if (tab != tab.value) return;
  });
}
function switchTab(index) {
  tab.value = index;
  getData();
}
```
