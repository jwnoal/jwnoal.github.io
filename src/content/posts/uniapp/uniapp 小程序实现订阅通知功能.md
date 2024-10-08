---
title: "uniapp 小程序实现订阅通知功能"
published: 2024-08-03
draft: false
description: "uniapp 小程序实现订阅通知功能"
tags: ["uniapp"]
category: "代码"
---

目的：想要实现小程序的每日打卡通知功能。

![](https://cdn.jiangwei.zone/blog/20240803122705.png)
![](https://cdn.jiangwei.zone/blog/IMG_0381.PNG.JPG)

#### 配置

1. 首先需要在微信小程序公众后台，申请订阅消息模板
2. uniCloud 配置
   文档地址 [https://doc.dcloud.net.cn/uniCloud/uni-subscribemsg.html](https://doc.dcloud.net.cn/uniCloud/uni-subscribemsg.html)  
   配置 uni-open-bridge
   文档地址 [https://doc.dcloud.net.cn/uniCloud/uni-open-bridge.html#uni-open-bridge%E7%9A%84%E4%BD%BF%E7%94%A8%E6%B5%81%E7%A8%8B](https://doc.dcloud.net.cn/uniCloud/uni-open-bridge.html#uni-open-bridge%E7%9A%84%E4%BD%BF%E7%94%A8%E6%B5%81%E7%A8%8B)

3. 下载插件 uni-open-bridge 到项目中。
4. uni-config-center 的 uni-id 下配置固定凭据
   如果你没有 appid 和 secret ，需要先向微信申请

在项目的 uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json 文件中配置(没有就创建)
uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json

```json
{
  "dcloudAppid": "__UNI__xxxxxx",
  "mp-weixin": {
    "tokenExpiresIn": 259200,
    "oauth": {
      "weixin": {
        "appid": "",
        "appsecret": ""
      }
    }
  }
}
```

在 uni-config-center 目录下新建子目录 uni-open-bridge, 新增 config.json，配置 dcloudAppid ，详情见下面的示例代码
uniCloud/cloudfunctions/common/uni-config-center/uni-open-bridge/config.json

```json
{
  "schedule": {
    "__UNI__xxxxxx": {
      "enable": true,
      "weixin-mp": {
        "enable": true,
        "tasks": ["accessToken"]
      }
    }
  },
  "ipWhiteList": ["0.0.0.0"]
}
```

#### 实现步骤

1. 必须要有点击事件，只有用户操作行为才能掉起微信的授权弹框

```vue
<template>
  <view
    v-if="!item.openSubscribe"
    @click.stop="laqi(index)"
    class="notification"
  >
    <uni-icons type="notification" size="24" color="#fff"></uni-icons>
  </view>
  <view v-else class="notification" @click.stop="cancelSubscribe(item)">
    <uni-icons type="notification-filled" size="24" color="#fff"></uni-icons>
    <text>{{ item.time }}</text>
  </view>

  <!-- 一开始使用picker，后来发现change事件不能拉起订阅弹框，必须点击 -->
  <uni-popup ref="popup2" class="popupbottom" type="bottom">
    <div class="cont2">
      <div class="h">
        <div @click="cancel" class="red">取消</div>
        <div @click="confirm" class="blue">确定</div>
      </div>
      <picker-view @change="bindChange" class="picker-view">
        <picker-view-column>
          <view class="item" v-for="(item, index) in hour" :key="index">{{
            item
          }}</view>
        </picker-view-column>
        <picker-view-column>
          <view class="item" v-for="(item, index) in minute" :key="index">{{
            item
          }}</view>
        </picker-view-column>
      </picker-view>
    </div>
  </uni-popup>
</template>
<style lang="scss" scoped>
.popupbottom {
  .cont2 {
    background: #fff;
    height: 500rpx;
    margin-bottom: -68rpx;

    .h {
      display: flex;
      justify-content: space-between;
      padding: 30rpx 40rpx;

      .blue {
        color: #1d8acc;
      }

      .red {
        color: red;
      }
    }
  }

  .picker-view {
    width: 750rpx;
    height: 400rpx;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
```

2. 在事件中首先发送订阅事件，弹起弹框，让用户同意

```vue
<script setup lang="ts">
import { ref } from "vue";

const hour = ref([]);
const minute = ref([]);
const popup2 = ref(null); //弹框
const i = ref(); //获取点击的是哪个打卡按钮

for (let i = 0; i < 24; i++) {
  hour.value.push(i.toString().padStart(2, "0"));
}
for (let i = 0; i < 60; i++) {
  minute.value.push(i.toString().padStart(2, "0"));
}

function laqi(index: number) {
  uni.showLoading();
  uni.getSetting({
    withSubscriptions: true,
    success(res) {
      console.log(res);
      if (!res.subscriptionsSetting.mainSwitch) {
        // uni.openSetting({
        // 	//打开设置页
        // 	// success(res) {}
        // });
        console.log("没有开启权限");
        uni.showToast({
          icon: "none",
          title:
            "您没有开启权限,请点击右上角三个点，点击设置，点击订阅消息，开启开关",
        });
      } else {
        uni.requestSubscribeMessage({
          tmplIds: ["zcdi3QqihqCgMZLj6exxxx"], // 订阅消息模板ID, 在微信小程序公众后台，订阅消息->模板消息->选择模板->复制模板ID
          success(res) {
            uni.hideLoading();
            if (res["zcdi3QqihqCgMZLj6exxxx"] == "accept") {
              console.log("订阅成功", res);
              popup2.value?.open();
              i.value = index;
            }
          },
          fail(err) {
            uni.hideLoading();
            console.log("requestSubscribeMessage err", err);
            uni.showToast({
              icon: "none",
              title: "订阅失败",
            });
          },
        });
      }
    },
    fail(err) {
      console.log("getSetting err", err);
      uni.hideLoading();
      uni.showToast({
        icon: "none",
        title: "获取设置信息失败",
      });
    },
  });
}
</script>
```

![](https://cdn.jiangwei.zone/blog/20240803123945.png)
（这是开发者工具的弹框样式，手机的不一样）

3. 用户弹出时间选择框，选择时间
   ![](https://cdn.jiangwei.zone/blog/20240803124709.png)

4. 将打卡列表的按钮状态更改，并添加记录到新的表
   打卡列表的按钮状态不详细介绍
   添加记录到新的表：
   ![](https://cdn.jiangwei.zone/blog/20240803124508.png)
   （这样的结构）
   云函数：

```js
"use strict";
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log("event : ", event);
  const db = uniCloud.database();
  const collection = db.collection("clockInList");
  const collection2 = db.collection("subscribeList");

  const data = {
    time: event.time,
    openSubscribe: event.openSubscribe,
  };

  await collection.doc(event.id).update(data);

  const data2 = {
    openId: event.openId,
    clockinId: event.id,
    title: event.title,
    time: event.time,
  };
  if (event.openSubscribe) {
    await collection2.add(data2);
  } else {
    await collection2
      .where({
        clockinId: event.id,
      })
      .remove();
  }

  return {
    code: 0,
    data: {},
  };
};
```

5. 定时任务，每分钟定时检查是否有打卡记录，有则发送通知
   云函数：

```js
"use strict";
const UniSubscribemsg = require("uni-subscribemsg");
const moment = require("moment");

exports.main = async (event, context) => {
  // 引入uni-subscribemsg公共模块
  // 初始化实例
  let uniSubscribemsg = new UniSubscribemsg({
    dcloudAppid: "__UNI__7E3Exxx",
    provider: "weixin-mp",
  });

  const db = uniCloud.database();

  const time =
    new Date().getTimezoneOffset() == 0
      ? moment().add(8, "hours").format("HH:mm")
      : moment().format("HH:mm");

  const collection2 = db.collection("subscribeList");

  const res = await collection2
    .where({
      time: time,
    })
    .get();

  console.log(res);
  const arr = [
    "立志不坚，终不济事。",
    "凿不休则沟深，斧不止则薪多。",
    "只要功夫深，铁棒磨成针。",
    "成功之因，在于不屈不挠。",
    "所谓天才，就是努力的力量。",
    "耐心和恒心总会得到报酬的。",
    "不经一翻彻骨寒，怎得梅花扑鼻香。",
    "最难做的事是把容易做的事持之以恒。",
    "读不在三更五鼓，功只怕一曝十寒。",
    "黑发不知勤学早，白首方恨读书迟。",
    "道足以忘物之得春，志足以一气之盛衰。",
    "一日一钱，千日千钱，绳锯木断，水滴石穿。",
    "奋斗这一件事是自有人类以来天天不息的。",
    "日日行，不怕千万里；常常做，不怕千万事。",
    "锲而舍之，朽木不折；锲而不舍，金石可镂。",
  ];
  const msg = arr[Math.floor(Math.random() * arr.length)];
  console.log(msg);

  for (let item of res.data) {
    // 发送订阅消息
    console.log(item.openId, item.title);
    const res = await uniSubscribemsg.sendSubscribeMessage({
      touser: item.openId,
      template_id: "zcdi3QqihqCgMZLj6epP3DDhbsZ90xxx",
      page: "pages/clockIn/index", // 小程序页面地址
      miniprogram_state: "formal", // 跳转小程序类型：developer为开发版；trial为体验版；formal为正式版；默认为正式版
      lang: "zh_CN",
      data: {
        thing4: {
          value: item.title,
        },
        thing3: {
          // value: arr[index]
          value: msg,
        },
      },
    });
    console.log("sendSubscribeMessage==>", item.openId, res);
  }
  return {
    code: 0,
    data: {},
  };
};
```

注意：
在此云函数目录运行 npm install moment

设置定时：uniapp web 控制台-云函数/详情/定时器触发

```js
["0 0/1 * * * ?"];
```

```js
// 发送文字大于20个字会报错
result: {
  errcode: 47003,
  errmsg: 'argument invalid! data.thing3.value invalid rid: 66ae1a59-1fd52776-679954c5'
}
```

```js
// 需要重新订阅
result: {
  errcode: 43101,
  errmsg: 'user refuse to accept the msg rid: 66bb66e4-101034a6-4ea10941'
}
```

如果云函数接口没有 await,可能会发生测试环境有效，生产环境出问题的情况。
