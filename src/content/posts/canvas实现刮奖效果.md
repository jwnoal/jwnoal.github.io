---
title: "canvas实现刮奖效果"
published: 2022-07-01
draft: false
description: "canvas实现刮奖效果"
tags: ["js", "canvas"]
---

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html,
      body {
        background: #eee;
        margin: 0;
        padding: 0;
      }
      #myCanvas {
        position: absolute;
        left: 20%;
        top: 400px;
      }
    </style>
  </head>
  <body>
    <canvas id="myCanvas" width="200" height="100"></canvas>
    <script>
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");

      // 绘制一个矩形
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 设置 globalCompositeOperation 属性为 destination-out
      ctx.globalCompositeOperation = "destination-out";

      // 监听鼠标事件
      canvas.addEventListener("touchmove", (event) => {
        // 阻止默认事件，避免页面滚动
        event.preventDefault();

        // 获取坐标
        var x = event.touches[0].pageX - canvas.offsetLeft;
        var y = event.touches[0].pageY - canvas.offsetTop;

        // 绘制一个圆形，擦除矩形区域
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI);
        ctx.fill();
      });
    </script>
  </body>
</html>

```
