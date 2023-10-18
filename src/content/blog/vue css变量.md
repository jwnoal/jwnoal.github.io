---
title: 'vue css变量'
pubDate: 2022-07-01
draft: false
description: "This is the first post of my new Astro blog."
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