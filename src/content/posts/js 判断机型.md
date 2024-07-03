---
title: "js 判断机型浏览器平台"
published: 2023-11-28
draft: false
description: "js 判断机型浏览器平台 "
tags: ["js"]
category: "代码"
---

### 判断手机机型

```js
function judgeBrand() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var isIphone = sUserAgent.match(/iphone/i) == "iphone";
  var isHuawei = sUserAgent.match(/huawei/i) == "huawei";
  var isHonor = sUserAgent.match(/honor/i) == "honor";
  var isOppo = sUserAgent.match(/oppo/i) == "oppo";
  var isOppoR15 = sUserAgent.match(/pacm00/i) == "pacm00";
  var isVivo = sUserAgent.match(/vivo/i) == "vivo";
  var isXiaomi = sUserAgent.match(/mi\s/i) == "mi ";
  var isXiaomi2s = sUserAgent.match(/mix\s/i) == "mix ";
  var isRedmi = sUserAgent.match(/redmi/i) == "redmi";
  var isSamsung = sUserAgent.match(/sm-/i) == "sm-";

  if (isIphone) {
    return "iphone";
  } else if (isHuawei || isHonor) {
    return "huawei";
  } else if (isOppo || isOppoR15) {
    return "oppo";
  } else if (isVivo) {
    return "vivo";
  } else if (isXiaomi || isRedmi || isXiaomi2s) {
    return "xiaomi";
  } else if (isSamsung) {
    return "samsung";
  } else {
    return "default";
  }
}
```

### 判断微信

```js
function isWeChat() {
  var ua = navigator.userAgent.toLowerCase();
  return /micromessenger/.test(ua) ? true : false;
}
```

### 判断是在什么平台打开 pad 、pc 、mobile phone

```js
function checkAgent() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

  if (
    !(
      bIsIphoneOs ||
      bIsMidp ||
      bIsUc7 ||
      bIsUc ||
      bIsAndroid ||
      bIsCE ||
      bIsWM ||
      bIsIpad
    )
  ) {
    return "pc";
  } else if (bIsIpad) {
    return "pad";
  } else {
    return "phone";
  }
}
```
