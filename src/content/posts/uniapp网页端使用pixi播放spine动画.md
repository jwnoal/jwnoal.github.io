---
title: "uniapp网页端使用pixi播放spine动画"
published: 2024-01-11
draft: false
description: "uniapp网页端使用pixi播放spine动画"
tags: ["uniapp", "js", "pixi.js"]
---

uniapp 和 h5 的 pixi 使用有些兼容性问题

[pixi.js 下载地址](https://cdn.jiangwei.zone/blog/pixi.js)
[pixi-spine.js 下载地址](https://cdn.jiangwei.zone/blog/pixi-spine.js)

```js
<view id="pixiDom" ref="pixiDom" class="pixiDemo"></view>
```

```js
import * as PIXI from "@/utils/pixi.js";
import "@/utils/pixi-spine.js";

mounted(){
  const dom = document.getElementById("pixiDom");
  let type = "WebGL"
  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
  }
  const app = new PIXI.Application({
    antialias:true,
    resolution:1,
    transparent: true,
    autoResize:true
  });

  dom.appendChild(app.view);
  app.renderer.resize(dom.clientWidth, dom.clientHeight);
  app.loader
  .add("spineCharacter", "/static/spine/cloud/Cloud.json")
  .load(function (loader, resources) {
    const animation = new PIXI.spine.Spine(resources.spineCharacter.spineData);
    animation.x = 200;
    animation.y = 350;
    animation.scale.x = 0.5;
    animation.scale.y = .3;
    animation.state.addAnimation(0, "animation", true);
    app.stage.addChild(animation);
  });
}
```

```css
<style scoped lang="scss">
.pixiDemo {
  height: 600px;
}
</style>
```
