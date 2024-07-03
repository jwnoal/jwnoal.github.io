---
title: "cocos creator 坐标转换"
published: 2023-11-29
draft: false
description: "cocos creator 坐标转换"
tags: ["cocos creator"]
category: "代码"
---

```js
export function convertPoint(
  cur: cc.Node,
  cur_x: number,
  cur_y: number,
  target: cc.Node
) {
  // 将节点坐标系下的一个点转换到世界空间坐标系
  const wPoint = cur.convertToWorldSpaceAR(cc.v2(cur_x, cur_y));
  // 将一个点转换到节点 (局部) 空间坐标系
  return target.convertToNodeSpaceAR(wPoint);
}
```

调用：

```js
convertPoint(area.parent, area.x, area.y, this.node);
```
