---
title: "h5使用pixi播放spine动画"
pubDate: 2024-01-05
draft: false
description: "h5使用pixi播放spine动画"
tags: ["js", "pixi.js"]
---

安装 pixi

```js
npm i --save pixi.js
```

安装 pixi-spine

```js
npm i --save pixi-spine
```

```js
"dependencies": {
  "pixi-spine": "^4.0.4",
  "pixi.js": "^7.3.3",
  "vue": "^3.3.11"
},
```

App.vue

```js
<template>
  <div id="pixiDom" class="pixiDemo"></div>
</template>

<script setup lang="ts">
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import { onMounted } from "vue";
onMounted(() => {
  const app: any = new PIXI.Application({
    background: "#1099bb",
    // backgroundAlpha: 0,
    resizeTo: window,
  });
  const dom = document.getElementById("pixiDom");
  dom.appendChild(app.view);
  app.renderer.resize(dom.clientWidth, dom.clientHeight);

  PIXI.Assets.load(
    "https://sbfkcel.github.io/pixi-spine-debug/assets/spine/spineboy-pro.json"
  ).then((resource) => {
    const animation = new Spine(resource.spineData);
    console.log(animation);

    animation.x = 200;
    animation.y = 350;
    animation.scale.x = 0.5;
    animation.scale.y = 0.5;
    animation.state.setAnimation(0, "run", true);
    app.stage.addChild(animation);
  });
});
</script>

<style scoped lang="scss">
.pixiDemo {
  height: 600px;
}
</style>

```
