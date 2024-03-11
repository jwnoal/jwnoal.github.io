---
title: "uniapp 遇到的问题"
pubDate: 2024-02-22
draft: false
description: "uniapp 遇到的问题"
tags: ["uniapp"]
---

#### uni-swipe-action-item 报错

使用了 uni-swipe-action 组件，当数据为空时，接口返回后动态更改 list 的值就报错，解决办法：重新安装 uni-swipe-action 组件

#### Uncaught (in promise) Error: DB read action failed, resource exhausted.

阿里云免费次数用完了。解决办法：更改配置，买了 5 块一个月的

#### 想要 model 打开时候 input 自动聚焦

```js
<uni-popup ref="popup" type="center">
    <view class="cont">
        <view class="title">添加打卡分类</view>
        <view class="ipt">
            标题
            <input v-if="iptShow" focus v-model="title" class="uni-input" placeholder="请输入..." />
        </view>
        <view class="line"></view>
        <view>
            <button @click="add" type="primary" :disabled="!canClick">确定</button>
        </view>
    </view>
</uni-popup>

const iptShow = computed(() => {
	return popup.value?.showPopup;
});
```
