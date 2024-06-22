---
title: "移动端最新适配方案pxtoviewport"
published: 2023-12-21
draft: false
description: "移动端最新适配方案"
tags: ["h5"]
---

[参考博客](https://juejin.cn/post/7213537146362658875)

### 最新：postcss-px-to-viewport-8-plugin

安装插件：

```js
npm install postcss-px-to-viewport-8-plugin --save-dev
```

在 postcss.config.js 文件中配置 postcss-px-to-viewport-8-plugin

```js
// vite.config.ts
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';

css: {
    postcss: {
      plugins: [
        postcsspxtoviewport8plugin({
          unitToConvert: 'px',
          viewportWidth: file => {
            let num = 750;
            //van是375
            if (file.indexOf('van')>0) {
              num = 375;
            }
            return num;
          },
          unitPrecision: 5, // 单位转换后保留的精度
          propList: ['*'], // 能转化为vw的属性列表
          viewportUnit: 'vw', // 希望使用的视口单位
          fontViewportUnit: 'vw', // 字体使用的视口单位
          selectorBlackList: ['ignore-'], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
          minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
          mediaQuery: true, // 媒体查询里的单位是否需要转换单位
          replace: true, //  是否直接更换属性值，而不添加备用属性
          exclude: [], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
          landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
          landscapeUnit: 'vw', // 横屏时使用的单位
          landscapeWidth: 1628, // 横屏时使用的视口宽度
        }),
      ]
    }
  },
```
