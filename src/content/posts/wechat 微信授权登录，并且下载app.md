---
title: "wechat 微信授权登录，并且下载app"
published: 2023-12-07
draft: false
description: "wechat 微信授权登录，并且下载app"
tags: ["wechat"]
---

1. 引入 微信 jssdk

```js
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
```

2. wx.config

```js
wxConfig = {
  appId: res.data.appId,
  timestamp: res.data.timestamp,
  nonceStr: res.data.nonceStr,
  signature: res.data.signature,
};
wx.config({
  ...wxConfig,
  jsApiList: ["checkJsApi", "login", "getUserInfo"], // 需要使用的微信 API 列表
});
```

3. 跳转微信 authorize，在重定向 url 参数中可以获取 code

```js
document.querySelector("#loginBtn").addEventListener("click", function () {
  console.log("跳转authorize");
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxConfig.appId}&redirect_uri=${window.location.href}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
});
```

4. 安卓在微信无法直接下载 apk，需要引导在默认浏览器打开

5. ios 打开 app store 链接，需要注意的是，扫二维码可以唤起，如果是聊天链接则不能唤起，（重定向后的链接带有 code，从默认浏览器打开，会打开原始页面，没带参数）
