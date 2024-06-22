---
title: "vue css变量"
published: 2022-07-01
draft: false
description: "vue css变量"
tags: ["vue", "css"]
---

```js
<template>
  <div  :style="styleVar">123</div>
</template>

<script lang="ts">
	//声明变量
	styleVar: any = {
		"--color": "white",
	};
</script>

<style lang="scss">
div {
	color : var(--color);
}
</style>
```
