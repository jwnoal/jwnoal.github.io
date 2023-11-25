---
title: 'vue svg组件(webpack)'
pubDate: 2022-07-01
draft: false
description: "vue svg组件(webpack)"
tags: ["vue", "svg"]
---

#### 安装svg-sprite-loader
```
npm install svg-sprite-loader -D
```

#### 创建存放svg图标的目录 /src/assets/svg

#### vue.config.js写配置
```js
const path = require('path')
function resolve(dir) {
 return path.join(__dirname, './', dir)
}

chainWebpack: (config) => {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/svg"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  }
```

#### svg组件 components/common/SvgIcon.vue
```vue
<template>
  <svg
    :class="className"
    aria-hidden="true"
    :width="width"
    :height="height"
    :style="styleVar"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class SvgIcon extends Vue {
  @Prop() path?: string
  @Prop() className?: string
  @Prop() width?: number
  @Prop() height?: number
  @Prop() fill?: string
  @Prop() stroke?: string

  styleVar: any = {
    '--fill': 'white',
    '--stroke': 'white',
  }

  get iconName() {
    return `#icon-${this.path}`
  }

  created() {
    this.styleVar['--fill'] = this.fill
    this.styleVar['--stroke'] = this.stroke
  }

  @Watch('fill')
  changeFill(v: string) {
    this.styleVar['--fill'] = this.fill
  }

  @Watch('stroke')
  changeStroke(v: string) {
    this.styleVar['--stroke'] = this.stroke
  }
}
</script>

<style lang="scss">
#__SVG_SPRITE_NODE__ {
  vertical-align: -0.15em;
  overflow: hidden;
  path {
    fill: var(--fill);
    stroke: var(--stroke);
  }
}
</style>


```


#### svg图片自动导入 utils/svgConfig.ts
```js
// 全局引入 svgIcon 组件
import Vue from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
Vue.component("svg-icon", SvgIcon);

// 让 图片自动导入，而不是每次手动导入
const req = require.context("@/assets/svg", false, /\.svg$/);
req.keys().map(req);

```

#### main.ts 引入 svgConfig.ts
```js
import "@/utils/svgConfig";
```

#### 组件调用
```
<svg-icon
	class="pointer"
	path="head-share"
	width="20"
	height="20"
	:fill="menuAct ? '#1D2129' : '#fff'"
></svg-icon>
```

