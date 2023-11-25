---
title: 'matter.js实现重力小球'
pubDate: 2022-07-01
draft: false
description: "matter.js实现重力小球"
tags: ["js", "matter.js"]
---

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/matter-js@latest/build/matter.min.js"></script>
    <style>
      html,
      body {
        padding: 0;
        margin: 0;
      }
      #c {
        width: 80%;
        height: 500px;
        background-color: bisque;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      canvas {
        width: 100%;
        height: 100%;
        background-color: thistle !important;
      }
    </style>
  </head>
  <body>
    <div id="c"></div>
    <script>
      const Engine = Matter.Engine;
      const Render = Matter.Render;
      const Bodies = Matter.Bodies;
      const Composite = Matter.Composite;
      const Runner = Matter.Runner;

      // 3. 创建引擎
      const engine = Engine.create();

      // 4. 创建渲染器，并将引擎连接到画布上
      const dom = document.getElementById("c");
      const width = dom.offsetWidth;
      const height = dom.offsetHeight;
      const render = Render.create({
        element: dom, // 绑定页面元素
        engine: engine, // 绑定引擎
        options: {
          width: width,
          height: height,
          wireframes: false,
        },
      });

      // 5-1. 创建小球
      const boxArr = [];
      for (let i = 0; i < 8; i++) {
        const box = Bodies.circle(width / 2, 0, 25, 25);
        box.restitution = 0.8;
        boxArr.push(box);
      }

      // 5-2. 创建地面，将isStatic设为true，表示物体静止 rectangle(x,y,w,h)
      // 上
      const groundt = Bodies.rectangle(width / 2, 0, width, 1, {
        isStatic: true,
      });
      // 下
      const groundb = Bodies.rectangle(width / 2, height, width, 1, {
        isStatic: true,
        render: {
          fillStyle: "#ffffff", // 设置填充颜色为红色
          strokeStyle: "#ffffff", // 设置线条颜色为黑色
          //   lineWidth: 0, // 设置线条宽度为 2
        },
      });
      // 左
      const groundl = Bodies.rectangle(0, height / 2, 1, height, {
        isStatic: true,
      });
      // 右
      const groundr = Bodies.rectangle(width, height / 2, 1, height, {
        isStatic: true,
      });

      // 6. 将所有物体添加到世界中
      Composite.add(engine.world, [
        ...boxArr,
        groundb,
        groundt,
        groundl,
        groundr,
      ]);

      // 7. 执行渲染操作
      Render.run(render);

      // 8. 创建运行方法
      const runner = Runner.create();

      // 9. 运行渲染器
      Runner.run(runner, engine);

      init();

      function init() {
        window.addEventListener("devicemotion", motionHandler, false);
        window.addEventListener("deviceorientation", orientationHandler, false);
      }

      function orientationHandler(e) {
        console.log("orientationHandler", e.alpha, e.beta, e.gamma);
        // 监听设备旋转事件
        // 计算新的引力大小和方向
        var alpha = e.alpha; // 设备绕 z 轴的旋转角度
        var beta = e.beta; // 设备绕 x 轴的旋转角度
        var gamma = e.gamma; // 设备绕 y 轴的旋转角度
        var magnitude = 0.01; // 引力大小

        // 计算新的引力向量
        var force = {
          x: Math.sin((gamma * Math.PI) / 180) * magnitude,
          y: Math.sin((beta * Math.PI) / 180) * magnitude,
        };

        // 将引力向量应用到物体上
        for (let i = 0; i < boxArr.length; i++) {
          Matter.Body.applyForce(boxArr[i], boxArr[i].position, force);
        }
      }

      function motionHandler(event) {
        console.log("motionHandler", event);
      }
    </script>
  </body>
</html>

```