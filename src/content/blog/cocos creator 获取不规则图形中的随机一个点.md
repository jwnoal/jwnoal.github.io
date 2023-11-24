---
title: "cocos creator 获取不规则图形中的随机一个点"
pubDate: 2023-11-24
draft: false
description: "cocos creator 获取不规则图形中的随机一个点"
tags: ["cocos creator"]
---

节点中添加Sprite,PolygonCollider  

```js
const worldPoints = node.getComponent(cc.PolygonCollider).world.points;
const randomPoint = this.getRandomPointInPolygon(worldPoints);
console.log(randomPoint);

function getRandomPointInPolygon(points: cc.Vec2[]): cc.Vec2 {
  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let maxY = Number.MIN_VALUE;

  // 获取不规则形状区域的边界框
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    minX = Math.min(minX, point.x);
    minY = Math.min(minY, point.y);
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  }

  let randomX: number, randomY: number;
  let isInsidePolygon = false;

  // 在边界框内生成随机点，并检查是否在不规则形状区域内
  while (!isInsidePolygon) {
    randomX = randomInt(minX, maxX);
    randomY = randomInt(minY, maxY);
    isInsidePolygon = cc.Intersection.pointInPolygon(
      cc.v2(randomX, randomY),
      points
    );
  }

  return cc.v2(randomX, randomY);
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```
