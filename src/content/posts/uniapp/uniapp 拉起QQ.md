---
title: "uniapp 拉起QQ"
published: 2023-12-08
draft: false
description: "uniapp 检测是否有qq,有则拉起QQ并跳转聊天页面，无则下载"
tags: ["uniapp"]
category: "代码"
---

```js
export function openQQ(str) {
  if (plus.os.name == "Android") {
    if (
      plus.runtime.isApplicationExist({
        pname: "com.tencent.mobileqq",
        action: "mqq://",
      })
    ) {
      // 已安装qq
      const main = plus.android.runtimeMainActivity();
      const Intent = plus.android.importClass("android.content.Intent");
      const Uri = plus.android.importClass("android.net.Uri");
      const intent = new Intent(
        Intent.ACTION_VIEW,
        Uri.parse(`mqqwpa://im/chat?chat_type=wpa&uin=${str}`)
      );
      main.startActivity(intent);
    } else {
      // 未安装qq
      plus.runtime.openURL(
        "https://sj.qq.com/appdetail/com.tencent.mobileqq",
        function (res) {
          console.log("openURL", res);
        }
      );
    }
  }
  if (plus.os.name == "iOS") {
    plus.runtime.launchApplication(
      {
        action: `mqq://im/chat?chat_type=wpa&uin=${str}&version=1&src_type=web`,
      },
      function (e) {
        plus.nativeUI.confirm(
          "检查到您未安装qq，请先到appstore搜索下载？",
          function (i) {
            if (i.index == 0) {
              plus.runtime.launchApplication(
                {
                  action: `itms-apps://itunes.apple.com/cn/app/id444934666?mt=8`,
                },
                function (e) {
                  console.log("打开appstore失败" + e.message);
                }
              );
            }
          }
        );
      }
    );
  }
}
```
