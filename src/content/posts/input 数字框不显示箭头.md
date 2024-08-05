---
title: "input 数字框不显示箭头"
published: 2024-08-05
draft: false
description: "input 数字框不显示箭头"
tags: ["css"]
category: "代码"
---

```css
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
input[type="number"] {
  appearance: textfield;
  -moz-appearance:textfield;
}
```