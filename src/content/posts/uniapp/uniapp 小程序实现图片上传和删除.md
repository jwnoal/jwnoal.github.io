---
title: "uniapp和unicloud实现小程序图片上传和删除"
published: 2024-07-28
draft: false
description: "uniapp和unicloud实现小程序图片上传和删除"
tags: ["uniapp"]
category: "代码"
---

1. 使 uni-ui 组件：uni-file-picker 组件支持上传图片功能，并将图片上传到云端。

```vue
<template>
  <uni-file-picker
    ref="filePicker"
    fileMediatype="image"
    mode="grid"
    @select="select"
    @progress="progress"
    @success="success"
    @fail="fail"
    @delete="del"
  />
</template>

<script setup lang="ts">
let imgList = [];

// 获取上传状态
const select = (e: any) => {
  console.log("选择文件：", e);
};

// 获取上传进度
const progress = (e: any) => {
  console.log("上传进度：", e);
};

// 上传成功
const success = (e: any) => {
  console.log("上传成功", e);
  imgList = [...imgList, ...e.tempFilePaths];
  console.log(imgList);
};

// 上传失败
const fail = (e: any) => {
  console.log("上传失败：", e);
};

// 删除
const del = (e: any) => {
  console.log("删除成功：", e);
  deleteFile(e.tempFilePath);
  const index = imgList.indexOf(e.tempFilePath);
  imgList.splice(index, 1);
  console.log(imgList);
};
</script>
```

```js
//删除图片
export function deleteFile(path: string) {
  return new Promise((resolve) => {
    uniCloud
      .callFunction({
        name: "delete-cloudFile",
        data: {
          path,
        },
      })
      .then((res) => {
        resolve(res);
      });
  });
}
```

<!-- 云函数delete-cloudFile -->

```js
"use strict";
exports.main = async (event, context) => {
  console.log(event.path);
  const res = await uniCloud
    .deleteFile({
      fileList: [event.path],
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(res);

  return {
    code: 0,
    data: {},
  };
};
```

#### 注意：

1. 需要在小程序后台设置域名白名单 开发管理/开发设置/服务器域名/uploadFile 合法域名和 downloadFile 合法域名。
如果用的是 unicloud，登录 web 控制台，点击总览，找到内置云存储上传域名和内置云存储下载域名。

2. unicloud 云存储设置 Referer 白名单。允许空Referer：关闭。（云存储/CDN流量报表及防刷设置）
unicloud.dcloud.net.cn,servicewechat.com
