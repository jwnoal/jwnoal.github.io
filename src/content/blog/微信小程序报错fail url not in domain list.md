---
title: "微信小程序报错fail url not in domain list"
pubDate: 2023-11-04
draft: false
description: "微信小程序报错fail url not in domain list"
tags: ["微信小程序", "uniapp"]
---

开发环境没问题，上线之后发现小程序报错：fail url not in domain list

小程序管理后台：开发管理/开发设置/服务器域名/request 合法域名配置下  
微信开发者工具/详情/本地设置中取消勾选不校验合法域名，查看报错信息，哪个域名没有配置。

```
https://api.next.bspapp.com
```

![](https://cdn.jiangwei.zone/blog/202311042137458.png)
