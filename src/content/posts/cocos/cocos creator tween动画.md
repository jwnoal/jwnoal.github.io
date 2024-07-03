---
title: "cocos creator tween动画"
published: 2023-12-12
draft: false
description: "cocos creator tween动画"
tags: ["cocos creator"]
category: "代码"
---

cocos creator 在 tween 运动中加入到对象池的时候，再次展示是 tween 动画未停止，可以使用 stopAllByTarget 停止

```js
cc.Tween.stopAllByTarget(node);
```

```
stopAll 停止所有缓动
stopAllByTag 停止所有指定标签的缓动
stopAllByTarget 停止所有指定对象的缓动
then 插入一个 action 或者 tween 到队列中
target 设置 tween 的 target
start 运行当前 tween
stop 停止当前 tween
tag 设置缓动的标签
clone 克隆当前 tween
union 将之前所有的 action 整合为一个 action。
bezierTo 按照贝塞尔路径设置目标的 position 属性。
bezierBy 按照贝塞尔路径设置目标的 position 属性。
flipX 翻转目标的 scaleX 属性
flipY 翻转目标的 scaleY 属性
blink 通过设置目标的 opacity 属性达到闪烁效果
to 添加一个对属性进行绝对值计算的 action
by 添加一个对属性进行相对值计算的 action
set 直接设置 target 的属性
delay 添加一个延时 action
call 添加一个回调 action
hide 添加一个隐藏 action
show 添加一个显示 action
removeSelf 添加一个移除自己 action
sequence 添加一个队列 action
parallel 添加一个并行 action
repeat 添加一个重复 action，这个 action 会将前一个动作作为他的参数。
repeatForever 添加一个永久重复 action，这个 action 会将前一个动作作为他的参数。
reverseTime 添加一个倒置时间 action，这个 action 会将前一个动作作为他的参数。
```
