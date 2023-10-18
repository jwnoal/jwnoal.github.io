---
title: "Svelte的写法记录"
pubDate: 2022-07-01
draft: false
description: "This is the first post of my new Astro blog."
tags: ["js", "svelte"]
---

app.svelte

```js
<script lang="ts">
  import { onMount, tick } from "svelte";
  import Demo from "@/components/Demo.svelte";
  // 打包环境变量
  console.log(import.meta.env.VITE_PROJECT_ENV);
  // 生命周期
  onMount(() => {
    console.log("onMount");
  });
  // 普通变量
  let name = "你好";
  // HTML变量
  const htmlStr = "<b>blod</b>";
  // 计算属性
  $: name3 = name + " world!";
  const name2 = name;
  // watch
  $: if (name) {
    console.log("新：", name, "旧", name2);
  }
  // nextTick
  console.log("nextTick前", document.getElementsByClassName("act")[0]);
  tick().then(() => {
    console.log("nextTick", document.getElementsByClassName("act")[0]);
  });
  // v-if
  let show = true;
  // v-for
  let arr = [1, 2, 3];
  // :style
  const color = "blue";
  const message = (res: CustomEvent) => {
    console.log(`子组件触发父组件方法，参数为${res.detail}`);
  };

  setTimeout(() => {
    console.log("1秒后");
    name = "hello";
    arr.push(4);
    arr = arr;
    show = false;
  }, 1000);
</script>

<main>
  svelte
  <div>{name}</div>
  <div>{@html htmlStr}</div>
  <div>{name3}</div>
  <!-- sif -->
  {#if show}
    <div>show</div>
  {/if}
  <!-- each -->
  {#each arr as item, i (i)}
    <div>{item}=={i}</div>
  {/each}
  <div class:act={show}>:class</div>
  <div style={`color: ${color}`}>:style</div>
  {#if show}
    <Demo name="demo" on:message={message} />
  {/if}
</main>

<style lang="less">
  .act {
    color: red;
  }
</style>

```

demo.svelte

```js
<script lang="ts">
  import { onDestroy, createEventDispatcher } from "svelte";
  export let name;
  onDestroy(() => {
    console.log("onDestroy");
  });
  const dispatch = createEventDispatcher();
  const emit = () => {
    dispatch("message", "demoMsg");
  };
</script>

<div>{name}组件</div>
<button on:click={emit}>demo按钮</button>
```
