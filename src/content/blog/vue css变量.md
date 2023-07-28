---
title: 'vue css变量'
description: 'vue css变量'
pubDate: '2023-07-23'
heroImage: '/blog-placeholder-4.jpg'
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