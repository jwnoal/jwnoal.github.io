---
title: "uniapp 支付宝授权登录（提现）"
pubDate: 2024-01-15
draft: false
description: "uniapp 支付宝授权登录（提现）"
tags: ["uniapp"]
---

[云插件地址：https://ext.dcloud.net.cn/plugin?id=13888](https://ext.dcloud.net.cn/plugin?id=13888)

1. 购买插件（免费）  
2. manifest 的 app 原生插件配置中勾选模块  
3. manifest配置 APP常用其他设置/UrlSchemes    
4. 编写代码  

![图片](https://cdn.jiangwei.zone/blog/20240115144225.png)  

```js
bind() {
  const AlipayAuth = uni.requireNativePlugin('DHQ-AlipayAuth');
  AlipayAuth.login({
    appId: 'xxx', //你在支付宝平台申请的App ID
    scheme: 'com.miman.michao', // 需要传到支付宝SDK的scheme,注意需要在manifest.json-->App其他常用配置-->UrlSchemes中配置Android和iOS的
  },
  (res) => {
    console.log('原生授权返回res', res);
    //客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
    if (res.result_code == 'SUCCESS') {
      // 调用自己的接口进行绑定auth_code
      this.$http
        .post(bindAlipay, {
          identity: res.auth_code,
          nickname: '',
          head_portrait: '',
        })
        .then((res) => {
          console.log('bindAlipay', res);
          uni.navigateBack();
        })
        .catch((res) => {
          console.error(res);
        });
      }
    }
  );
}
```
