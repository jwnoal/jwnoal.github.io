---
title: "uniapp 接阿里的人脸认证"
pubDate: 2023-12-14
draft: false
description: "uniapp 接阿里的人脸认证"
tags: ["uniapp"]
---

[阿里云参考文档：https://help.aliyun.com/zh/id-verification/financial-grade-id-verification/uniapp-integration-2](https://help.aliyun.com/zh/id-verification/financial-grade-id-verification/uniapp-integration-2)

1. 下载金融级实人认证 UniApp SDK，解压到项目中的 nativePlugins 目录下。 [AP-FaceDetectModule](https://cn-shanghai-aliyun-cloudauth.oss-cn-shanghai.aliyuncs.com/cloudauth_sdk/identity_toyger/UniApp/UniApp-FinancialFaceVerify-20231018.zip)

2. 导入本地插件。  
   在 manifest.json 文件下，单击 App 原生插件配置。  
   在 App 原生插件配置区域，单击选择本地插件。

3. 配置基座包。  
   制作自定义调试基座。在 manifest.json 文件，选择运行 > 运行到手机或模拟器 > 制作自定义调试基座。  
   设置自定义调试基座。在 manifest.json 文件，选择运行 > 运行到手机或模拟器，单击运行到 Android App 基座或运行到 iOS App 基座，勾选使用自定义基座运行。

### 代码开发

1. 首先获取 metaInfo

```js
// 加载金融级实人认证插件
const aliyunVerify = uni.requireNativePlugin("AP-FaceDetectModule");

export default {
  onLoad() {
    // 调用getMetaInfo获取MetaInfo数据
    var metaInfo = aliyunVerify.getMetaInfo();
    let p = uni.getSystemInfoSync().platform;
    if (p === "ios") {
      metaInfo = JSON.stringify(metaInfo);
    }

    uni.showToast({
      title: "返回的内容" + metaInfo,
      icon: "none",
    });

    console.log(metaInfo);
  },
};
```

2. 用 metaInfo 作为参数调用自己服务端接口获取 certifyId

3. 开始认证

```js
aliyunVerify.verify({
    "certifyId":"xxx",		// 填写从服务端获取的certifyId
  },
  function(response){

  }
);

// response返回格式
{
    code:1000,							// 错误码
    message:"CODE_VERIFY_SUCCESS"		// 错误码描述
}
```

错误码 | 错误码文案 | 错误码描述
1000 | 刷脸成功 | 代表刷脸成功，该结果仅供参考，可通过调用服务端 DescribeFaceVerify 接口获取最终认证结果。
1001|系统错误|表示系统错误。
1003|验证中断|表示验证中断。
2002|网络错误|表示网络错误。
2003|客户端设备时间错误|表示客户端设备时间错误。
2006|刷脸失败|表示刷脸失败，如需获取更详细的失败原因，需调用服务端 DescribeFaceVerify 接口获取。 


####  以上的uniapp包在 uniapp manifest.json/App常用其他设置targetSdkVersion：30 正常，31以上打打包失败，可以用下面的包试试  
[包地址](https://cdn.jiangwei.zone/blog/AP-FaceDetectModule.zip)