---
title: "cocos creator 新增打包自定义扩展"
published: 2022-07-01
draft: false
description: "cocos creator 新增打包自定义扩展"
tags: ["cocos creator"]
category: "代码"
---

需求：打完包后需要将包打成 zip,并新增时间戳在 json 中
cocos creator: 2.4

1. 点击头部扩展 ->点击创建新扩展插件 -> 点击项目专用扩展
   会在 packages 文件夹中创建一个新的文件夹
   main.js 为入口函数

main.js

```js
"use strict";
const { exec } = require("child_process");
const path = require("path");

module.exports = {
  /**
   * 项目路径
   * @type {string}
   */
  projectPath: null,

  load() {
    // execute when package loaded
    this.onBuildFinished = this.onBuildFinished.bind(this);
    Editor.Builder.on("build-finished", this.onBuildFinished);
  },

  unload() {
    // execute when package unloaded
    Editor.Builder.removeListener("build-finished", this.onBuildFinished);
  },

  /**
   * 构建完成回调
   * @param {BuildOptions} options
   * @param {Function} callback
   */
  onBuildFinished(options, callback) {
    // 获取项目路径
    // this.projectPath = Editor.Project.path || Editor.projectPath;
    const scriptPath = path.join(__dirname, "build.sh");
    Editor.log("开始执行zip打包", scriptPath);
    exec(`sh ${scriptPath}`, (error) => {
      if (error) {
        Editor.log(`执行出错: ${error}`);
      }
      Editor.success(`zip包已生成！！！！`);
      callback();
    });
  },
};
```

如果要更改插件执行顺序，在 2.4 中：
编辑器头部菜单点击开发者-》点击 Package Manager,找到插件点击 reload,插件就会排在最后
