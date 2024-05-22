---
title: 'androd打包免费生产证书'
pubDate: 2024-05-07
draft: false
description: "androd打包免费生产证书"
tags: ["android"]
---

地址：
[https://www.yunedit.com/createcert](https://www.yunedit.com/createcert)

备案：
登录阿里云，上传包，检测一下会有公钥和md5

或
```
brew install jadx
jadx-gui
```

或  
```
keytool -list -v -keystore steamcool.keystore
```

应用宝认领包  
``` shell
# 最后一个是别名
jarsigner -verbose -keystore steamcool.keystore -signedjar steamcool_signed.apk steamcool.apk com.steamcool
```