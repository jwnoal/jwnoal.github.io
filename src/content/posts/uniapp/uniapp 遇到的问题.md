---
title: "uniapp 遇到的问题"
published: 2024-02-22
draft: false
description: "uniapp 遇到的问题"
tags: ["uniapp"]
category: "代码"
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

#### 测试环正常，在生产就不正常了
因为测试环境有些权限可以跳过的，可以关闭调试面板试试
生产环境可能需要配置白名单，比如图片上传需要配置uploadFile合法域名 （小程序后台/开发管理/服务器域名）