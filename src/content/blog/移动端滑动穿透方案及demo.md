---
title: '移动端滑动穿透方案及demo'
pubDate: 2022-07-01
draft: false
description: "This is the first post of my new Astro blog."
tags: ["h5",'js']
---

# 移动端滑动穿透方案及 demo

### 移动端滑动穿透问题通常出现在弹框出现时，上下滑动屏幕，背景也跟着滑动了

解决的办法有：
1、 加 overflow:hidden

```
html, body {
   overflow: hidden;
}
```

（在移动端无效）

2、 弹窗出现时将背景设置成 fixed,并记录坐标，关闭时恢复位置
（背景位置会有个跳动）

3、阻止 body 的默认滚动？

```
document.ontouchmove = e => {
	e.preventDefault();
};
```

(该方案好像在 Android 中不生效？)

#### 下面就针对第三种方法进行优化

参考文章 [龙喵](http://ailongmiao.com/read/529.html) [张鑫旭](https://www.zhangxinxu.com/wordpress/2016/12/web-mobile-scroll-prevent-window-js-css/)

我们监听 touchmove 事件时，在之前是有一个小延迟触发的，因为浏览器不知道我们是否要 preventDefault，所以等到大概 200ms 左右才能真正收到监听回调。

chrome 在 56 版本将 addEventListner 默认的 passive 置为 true，具体请参见这里，这样浏览器就能知道这个 addEventListner 是不用 preventDefault 的，立即可触发滚动事件。

在 Android 的手 q 和微信中使用的是 X5 内核，它是基于 blink 内核的，因此同样有关于 passiveevent 的优化。所以我们需要加入 addEventListner 的第三个参数：

```
document.addEventListener(
	'touchmove',
	e => {
		e.preventDefault();
	},
	{ passive: false },
);
```

这样就解决了 android 不生效的问题，不过此时所有滑动都被禁止了，即使弹框中有超出内容，我们需要进行滑动查看。

那么，我们需要增加一个可以滚动的元素：

```
document.addEventListener(
  'touchmove',
  e => {
	const excludeEl = document.querySelectorAll('.can-scroll');
	const isExclude = [].some.call(excludeEl, (el: HTMLElement) =>
	  el.contains(e.target),
	);
	if (isExclude) {
	  return true;
	}
	e.preventDefault();
},
{ passive: false },
```

如此就解决了内容滑动的问题，可是，当滑动超出了边界时，又会触发默认的滚动穿透，这时我们又需要添加边界条件来阻止滚动：

```
elScroll = e.target.offsetParent || e.target
// 当前的滚动高度
scrollTop = elScroll.scrollTop;
events = e.touches[0] || e;
distanceY = events.pageY - posY;
//上下边缘检测
distanceY > 0 && scrollTop == 0
//下边缘检测
distanceY < 0 && scrollTop + 1 >= maxscroll
```

后来又发现要是有多个可滑动的弹框，又出现滚动穿透的问题

so, 直接上 demo:

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    html {
      touch-action: none;
    }
    .mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.4);
    }
    .can-scroll {
      height: 200px;
      overflow: auto;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      border-radius: 8px;
      background: #fff;
      -webkit-overflow-scrolling: touch;
    }
  </style>
</head>

<body>
  <div>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
    <p>background</p>
  </div>
  <div class="mask">
    <div class="can-scroll">
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
    </div>
  </div>

  <script>
    let posY = '';
    let maxscroll = '';
    let scrollTop = "";
    document.addEventListener("touchstart", eventStart, { passive: false });
    document.addEventListener("touchmove", eventMove, { passive: false });
    function eventMove(e) {
      const excludeEl = document.querySelectorAll(".can-scroll");
      const isExclude = [].some.call(excludeEl, el => el.contains(e.target));
      if (isExclude) {
        let elScroll = e.target.offsetParent || e.target
        // 当前的滚动高度
        scrollTop = elScroll.scrollTop;
        // 现在移动的垂直位置，用来判断是往上移动还是往下
        let events = e.touches[0] || e;
        // 移动距离
        let distanceY = events.pageY - posY;
        // 上下边缘检测
        if (distanceY > 0 && scrollTop == 0) {
          // 往上滑，并且到头
          // 禁止滚动的默认行为
          e.preventDefault();
          return;
        }
        // 下边缘检测
        if (distanceY < 0 && scrollTop + 1 >= maxscroll) {
          // 往下滑，并且到头
          // 禁止滚动的默认行为
          e.preventDefault();
          return;
        }
        return true;
      }
      e.preventDefault();
    }
    function eventStart(e) {
      let elScroll = e.target.offsetParent || e.target
      let events = e.touches[0] || e;
      posY = events.pageY;
      maxscroll = elScroll.scrollHeight - elScroll.clientHeight;
      scrollTop = elScroll.scrollTop;
    }
  </script>
</body>
```

上面两篇参考文章写的非常好，推荐！
