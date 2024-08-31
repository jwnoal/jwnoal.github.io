---
title: "uniapp 和 unicloud 完成小程序微信支付功能"
published: 2024-08-31
draft: false
description: "uniapp 和 unicloud 完成小程序微信支付功能"
tags: ["uniapp"]
category: "代码"
---

目的：想要实现小程序的微信支付功能。

文档地址：[https://doc.dcloud.net.cn/uniCloud/uni-pay/uni-app.html](https://doc.dcloud.net.cn/uniCloud/uni-pay/uni-app.html)

插件市场地址：[https://ext.dcloud.net.cn/plugin?name=uni-pay](https://ext.dcloud.net.cn/plugin?name=uni-pay)

![](https://cdn.jiangwei.zone/blog/a.png)

#### 配置

推荐先导入示例项目进行配置，可以后再导入自己项目。

![](https://cdn.jiangwei.zone/blog/20240831162255.png)

一定要记得将小程序 appid 配置到示例项目的`manifest.json`文件中！！！！

按照文档进行配置，uniCloud/cloudfunctions/common/uni-config-center/uni-pay/config.js 配置比较重要。

```js

"notifyUrl": {
		// 测试环境服务空间-支付回调地址
		// 线上环境服务空间-支付回调地址（如果只有一个服务空间，则只需要配置线上环境服务空间即可）
		"mp-499e2a37-0c77-418a-82aa-3e5820ecb057": "https://fc-mp-499e2a37-0c77-418a-82aa-3e5820ecb057.next.bspapp.com/uni-pay-co",
	},
```

在 unicloud 的 WEB 控制台总览中可以看到，key 为 SpaceId，value: 云函数->uni-pay-co->详情->复制路径

![](https://cdn.jiangwei.zone/blog/20240831163242.png)

![](https://cdn.jiangwei.zone/blog/20240831163139.png)

```js
// 32位，随便输
"notifyKey":"5FB2CD73C7B53918728417C50762E6D45FB2CD73C7B53918728417C50762E6D4"
```

```js
// 微信支付相关
	"wxpay": {
		"enable": true, // 是否启用微信支付
		// 微信 - 小程序支付
		"mp": {
			"appId": "", // 小程序的appid 小程序后台获取
			"secret": "", // 小程序的secret 小程序后台获取
			"mchId": "", // 商户id 微信支付商户平台获取
			"key": "", // v2的api key  微信支付商户平台自己设置的key
			"pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // v2需要用到的证书  证书是自己申请的，也在微信商户平台
			"v3Key": "", // v3的api key
			"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
			"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
			"version": 2, // 启用支付的版本 2代表v2版本 3 代表v3版本
		},
  }
```

云函数更改都得上传，记得将小程序重新运行下。

此时配置应该能成功了。

然后将插件装到项目里。

![](https://cdn.jiangwei.zone/blog/20240831163819.png)

配置和上面一样。

前端代码：

```vue
<template>
  <view class="content">
    <button @click="handdle">支付</button>
    <!-- 统一支付组件，注意：vue3下ref不可以等于组件名，因此这里ref="pay" 而不能是 ref="uniPay" -->
    <uni-pay
      ref="pay"
      height="70vh"
      logo="/static/logo.png"
      @success="onSuccess"
      @create="onCreate"
      @fail="onFail"
    ></uni-pay>

    <!-- 还有一些其他参数在示例中看 -->
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref<string>("Hello");
const pay = ref(null);
function handdle() {
  createOrder();
}

function createOrder() {
  const order_no = `test` + Date.now();
  // 发起支付
  pay.value.createOrder({
    provider: "wxpay", // 支付供应商
    total_fee: 1, // 支付金额，单位分 100 = 1元
    order_no: "202401", // 业务系统订单号（即你自己业务系统的订单表的订单号）
    description: "21天打卡", // 支付描述
    type: "test", // 支付回调类型 在云函数uni-pay-co/notify/test.js中写逻辑
    // out_trade_no: out_trade_no, // 插件支付单号
    // custom: this.custom, // 自定义数据
  });
}

// 监听事件 - 支付订单创建成功（此时用户还未支付）
function onCreate(res: any) {
  console.log("create: ", res);
  // 如果只是想生成支付二维码，不需要组件自带的弹窗，则在这里可以获取到支付二维码 qr_code_image
}
// 监听事件 - 支付成功
function onSuccess(res: any) {
  console.log("success: ", res);
  if (res.user_order_success) {
    // 代表用户已付款，且你自己写的回调成功并正确执行了
  } else {
    // 代表用户已付款，但你自己写的回调执行失败（通常是因为你的回调代码有问题）
  }
}
function onFail(err: any) {
  console.log("err: ", err);
}
</script>
```
