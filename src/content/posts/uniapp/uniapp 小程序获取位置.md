---
title: "uniapp 小程序获取位置"
published: 2024-09-03
draft: false
description: "uniapp 小程序获取位置"
tags: ["uniapp"]
category: "代码"
---
需要在 “小程序管理后台 -「开发」-「开发管理」-「接口设置」” 中完成权限申请；

manifest.json

```json
"permission": {
  "scope.userLocation": {
    "desc": "您的位置信息将用于小程序位置接口的效果展示"
  },
  "scope.userFuzzyLocation": {
    "desc": "您的位置信息将用于小程序位置接口的效果展示"
  }
},
"requiredPrivateInfos": [
  "chooseLocation",
  "getLocation"
],
```

授权后

```js
uni.getLocation({
  type: "wgs84",
  success: function (res) {
    console.log("当前位置的经度：" + res.longitude);
    console.log("当前位置的纬度：" + res.latitude);
  },
});
```

未授权
```js
<button @click="getLocation">获取位置</button>

function getLocation() {
  // 获取用户是否开启 授权获取当前的地理位置、速度的权限。
  uni.getSetting({
    success(res) {
      // 如果没有授权
      if (!res.authSetting["scope.userLocation"]) {
        // 则拉起授权窗口
        uni.authorize({
          scope: "scope.userLocation",
          success() {
            //点击允许后--就一直会进入成功授权的回调 就可以使用获取的方法了
            uni.getLocation({
              type: "wgs84",
              success: function (res) {
                console.log("进行授权", res);
                console.log("当前位置的经度：" + res.longitude);
                console.log("当前位置的纬度：" + res.latitude);
                uni.showToast({
                  title:
                    "当前位置的经纬度：" + res.longitude + "," + res.latitude,
                  icon: "success",
                  mask: true,
                });
              },
              fail(error) {
                console.log("失败", error);
              },
            });
          },
          fail(error) {
            //点击了拒绝授权后--就一直会进入失败回调函数--此时就可以在这里重新拉起授权窗口
            console.log("拒绝授权", error);
            uni.showModal({
              title: "提示",
              content: "若点击不授权，将无法使用位置功能",
              cancelText: "不授权",
              cancelColor: "#999",
              confirmText: "授权",
              confirmColor: "#f94218",
              success(res) {
                console.log(res);
                if (res.confirm) {
                  // 选择弹框内授权
                  uni.openSetting({
                    success(res) {
                      console.log(res.authSetting);
                    },
                  });
                } else if (res.cancel) {
                  // 选择弹框内 不授权
                  console.log("用户点击不授权");
                }
              },
            });
          },
        });
      } else {
        // 有权限则直接获取
        uni.getLocation({
          type: "wgs84",
          success: function (res) {
            console.log("有权限", res);
            console.log("当前位置的经度：" + res.longitude);
            console.log("当前位置的纬度：" + res.latitude);
            uni.showToast({
              title: "当前位置的经纬度：" + res.longitude + "," + res.latitude,
              icon: "success",
              mask: true,
            });
          },
          fail(error) {
            uni.showToast({
              title: "请勿频繁调用！",
              icon: "none",
            });
            console.log("失败", error);
          },
        });
      }
    },
  });
}
```
