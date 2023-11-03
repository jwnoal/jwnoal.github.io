---
title: "uniapp开发的微信小程序获取头像昵称"
pubDate: 2023-11-03
draft: false
description: "uniapp开发的微信小程序获取头像昵称"
tags: ["uniapp", "微信小程序"]
---

自 2022 年 10 月 25 日 24 时后，用户头像昵称获取规则将进行如下调整：  
wx.getUserProfile 接口将被收回  
wx.getUserInfo 接口获取用户昵称头像将被收回

最新获取头像昵称的方式是输入头像和昵称:
[文档地址](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html)

所以我在小程序首页进行引导：  
![图片](https://cdn.jump.icu/blog/20231103182100.png)
点击进入小程序，进行弹框：  
![图片](https://cdn.jump.icu/blog/20231103182645.png)

弹框的代码：

```js
<uni-popup ref="popup" type="bottom">
    <view class="panal">
        <view class="bold">设置你的头像、昵称</view>
        <view class="border-b small">方便快速在个人中心展示你的信息</view>
        <view class="iptdiv border-b">
            <text class="bold">头像</text>
            <view>
                <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                    <view v-if="!avatarUrl">点击设置微信头像</view>
                    <image v-else class="avatar" :src="avatarUrl"></image>
                    <uni-icons type="right" size="16"></uni-icons>
                </button>
            </view>
        </view>
        <view class="iptdiv border-b">
            <text class="bold">昵称</text>
            <view class="fc">
                <input v-model="nickName" type="nickname" class="weui-input" placeholder="请输入昵称" />
                <uni-icons type="right" size="16"></uni-icons>
            </view>
        </view>
        <view class="btndiv">
            <button @click="closePopup" class="cancel-btn">拒绝</button>
            <button @click="goHome" class="confirm-btn" :class="{ opc: !canClick }" :disabled="!canClick">确认</button>
        </view>
    </view>
</uni-popup>
```

主要代码为：

```js
<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
    <view v-if="!avatarUrl">点击设置微信头像</view>
    <image v-else class="avatar" :src="avatarUrl"></image>
</button>

 <input v-model="nickName" type="nickname" class="weui-input" placeholder="请输入昵称" />
```

![图片](https://cdn.jump.icu/blog/20231103175725.png)

输入后获得`avatarUrl,nickName`

此时的 avatarUrl 为临时地址，所以需要在合适的时候将他放入 uniapp 云存储中:

```js
const result = await uniCloud.uploadFile({
  filePath: avatarUrl.value,
  cloudPath: `avatar-${uni.getStorageSync("xzs-openId")}.png`,
});
console.log(result.fileID);
```

fileID 就是可以使用的外链

将头像昵称使用 uniapp 的云函数上传到云数据库中

```js
const obj = {
  avatarUrl: result.fileID,
  nickName: nickName.value,
};

uniCloud
  .callFunction({
    name: "create-user",
    data: {
      openId: uni.getStorageSync("xzs-openId"),
      avatarUrl: obj.avatarUrl,
      nickName: obj.nickName,
    },
  })
  .then((res) => {
    console.log("create-user==>", res.result);
    if (res.result.code == 0) {
      //
    } else {
      uni.showToast({
        icon: "none",
        title: res.result.msg,
      });
    }
  });
```

云函数：

```js
"use strict";
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log("event : ", event);
  const db = uniCloud.database();
  const collection = db.collection("user");
  const list = await collection
    .where({
      openId: event.openId,
    })
    .get();

  if (list.data.length > 0) {
    return {
      code: 0,
    };
  }

  const indexNum = (await collection.get()).data.length;

  const data = {
    openId: event.openId,
    userInfo: {
      nickName: event.nickName,
      avatarUrl: event.avatarUrl,
      signature: null,
      sex: 1,
      age: 0,
      area: null,
      occupation: null,
      hobby: null,
      privateId: null,
    },
    createNum: indexNum + 1,
    createTime: new Date().getTime(),
    updateTime: new Date().getTime(),
  };

  const result = await collection.add(data);

  if (result) {
    return {
      code: 0,
    };
  } else {
    return {
      code: -1,
      msg: "网络异常",
    };
  }
};
```
