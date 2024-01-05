---
title: "cocos creator 弹幕"
pubDate: 2024-01-05
draft: false
description: "cocos creator 弹幕"
tags: ["cocos creator"]
---

新建对象池

```js
GameData.barragePool = new cc.NodePool();
```

创建弹幕容器BarrageCont.ts

```js
import { GameData } from "../DataManager/Constants";
import { GameEmit } from "../DataManager/EmitData";
import MessageBus from "../MessageManager/MessageBus";
import Barrage from "./Barrage";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BarrageCont extends cc.Component {
  @property(cc.Prefab)
  barrage_Prefab: cc.Prefab = null;

  msg = 0;

  async onLoad() {
    MessageBus.on(GameEmit.ADDBARRAGE, this.addBarrage, this);
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.addBarrage(i);
      }, Math.random() * 3000);
    }
  }

  start() {}

  addBarrage(line: number) {
    let node: cc.Node;
    if (GameData.barragePool.size() > 0) {
      node = GameData.barragePool.get();
    } else {
      node = cc.instantiate(this.barrage_Prefab);
    }
    node.getComponent(Barrage).init(line, this.msg);
    this.node.addChild(node);
    this.msg++;
  }
}
```

创建弹幕预制体Barrage.ts  

```js
import { GameData } from "../DataManager/Constants";
import { GameEmit } from "../DataManager/EmitData";
import MessageBus from "../MessageManager/MessageBus";
import UiTool from "../Utils/UiTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Barrage extends cc.Component {
  startX = 0;
  allShowX = 0;
  allHideX = 0;
  flag = true;
  line = 0;
  async onLoad() {}
  start() {}
  init(line: number, msg: number) {
    this.line = line;
    this.flag = true;
    this.startX = this.node.width / 2 + 70;
    this.allShowX = this.startX - (this.node.width + 70);
    this.allHideX = this.allShowX - cc.winSize.width;
    this.node.x = this.startX;
    this.node.y = -80 * line;
    UiTool.loadImgByUrl(
      UiTool.getChildByPath(this.node, "hd"),
      "https://img.gmblgamefi.com/images/2091375f9129d096a5d14d934af0949f_1702054417.jpeg",
      "png",
      false
    );
    UiTool.getChildByPath(
      this.node,
      "msg",
      cc.RichText
    ).string = `<color=#ffca71>小灰灰</c><color=#ffffff>许愿早点发工资${msg}</color>`;
    cc.tween(this.node)
      .by(16, { x: -cc.winSize.width * 3 }) //设置速度，x尽可能大
      .call(() => {
        GameData.barragePool.put(this.node);
      })
      .start();
  }
  protected update(_dt: number): void {
    if (this.node.x <= this.allHideX) {
      // console.log("完全消失，进行回收");
      cc.Tween.stopAllByTarget(this.node);
      GameData.barragePool.put(this.node);
    }
    if (!this.flag) return;
    if (this.node.x <= this.allShowX - 80) {
      // console.log("全部展示，发起下一个通知");
      this.flag = false;
      MessageBus.emit(GameEmit.ADDBARRAGE, this.line);
    }
  }
}

```
