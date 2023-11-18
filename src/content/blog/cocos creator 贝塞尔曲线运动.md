---
title: 'cocos creator贝塞尔曲线运动'
pubDate: 2023-11-18
draft: false
description: "cocos creator贝塞尔曲线运动"
tags: ["cocos creator"]
---

```
const { ccclass, property } = cc._decorator;

@ccclass
export class BezierMovement extends cc.Component {
  start() {
    this.runBezierAction();
  }

  runBezierAction() {
    const time = 0.1;

    // 贝塞尔曲线的控制点
    const controlPoints = [
      cc.v2(0, 0), // 起点
      cc.v2(100, 100), // 控制点1
      cc.v2(200, 0), // 终点
    ];

    // 创建一个贝塞尔曲线动作
    const bezierTo = cc.bezierTo(time, controlPoints);

    // 执行动作
    const action = cc.sequence(
      bezierTo
      cc.callFunc(this.onBezierActionEnd, this)
    );

    // 将动作附加到目标节点
    this.node.runAction(action);
  }

  onBezierActionEnd() {
    // console.log("贝塞尔曲线运动结束");
  }
}

```