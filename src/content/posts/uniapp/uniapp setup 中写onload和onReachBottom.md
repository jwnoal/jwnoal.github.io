---
title: "uniapp setup 中写onload,onReachBottom等"
published: 2024-07-28
draft: false
description: "uniapp setup 中写onload和onReachBottom"
tags: ["uniapp"]
category: "代码"
---

<script setup lang="ts">
  import { onLoad,onReachBottom } from '@dcloudio/uni-app';
  onReachBottom(() => {
		console.log('页面滚动到底部了');
	});
</script>
