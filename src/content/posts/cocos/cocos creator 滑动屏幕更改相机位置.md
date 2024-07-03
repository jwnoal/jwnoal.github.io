---
title: "cocos creator 滑动屏幕更改相机位置"
published: 2022-07-01
draft: false
description: "cocos creator 滑动屏幕更改相机位置"
tags: ["cocos creator"]
category: "代码"
---

```ts
const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchMove extends cc.Component {
  @property({ type: cc.Node, tooltip: "背景" })
  private bgNode: cc.Node = null;

  @property({ type: cc.Node, tooltip: "相机" })
  private cameraNode: cc.Node = null;

  onLoad() {
    this.bgNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
  }

  start() {}

  update(deltaTime: number) {}

  onTouchMove(event) {
    const delta = event.getDelta();
    const position = this.cameraNode.position.add(new cc.Vec3(-delta.x, 0, 0));
    // 设置边界
    const w1 = this.bgNode.width / 2; // 背景图的一半
    const w2 = cc.find("Canvas").width / 2; // 相机的一半
    if (position.x < -w1 + w2) {
      position.x = -w1 + w2;
    }
    if (position.x > w1 - w2) {
      position.x = w1 - w2;
    }
    this.cameraNode.setPosition(position);
  }

  // update (dt) {}
}
```
