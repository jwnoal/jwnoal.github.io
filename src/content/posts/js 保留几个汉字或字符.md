---
title: "js 保留几个汉字或字符"
published: 2023-12-14
draft: false
description: "js 保留几个汉字或字符"
tags: ["js"]
category: "代码"
---

```js
export function truncateNickname(nickname: string, len = 6): string {
  let truncated = nickname;

  // 计算字符长度，一个汉字占用多个字符
  const length = Array.from(nickname).reduce((count, char) => {
    return count + (char.codePointAt(0)! > 255 ? 2 : 1);
  }, 0);

  // 检查长度是否超过限制
  if (length > len * 2 || length / 2 > len) {
    let count = 0; // 记录当前字符数
    let index = 0; // 记录要截取的索引位置

    // 遍历昵称并计算字符数，找到要截取的位置
    for (let i = 0; i < nickname.length; i++) {
      const char = nickname[i];
      const charLength = char.codePointAt(0)! > 255 ? 2 : 1; // 汉字占用多个字符

      if (count + charLength > len * 2 && count / 2 + 1 > len) {
        break; // 超过限制，停止遍历
      }

      count += charLength;
      index = i + 1;
    }

    truncated = nickname.substring(0, index);
  }

  return truncated;
}
```
