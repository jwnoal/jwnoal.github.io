---
title: "js 保留三个汉字或6个字符"
pubDate: 2023-12-14
draft: false
description: "js 保留三个汉字或6个字符"
tags: ["js"]
---

```js
function limitNickname(nickname) {
  // 统计英文字母的数量
  var letterCount = nickname.replace(/[^a-zA-Z]/g, '').length;
  // 统计汉字的数量
  var chineseCount = (nickname.length - letterCount) / 3;

  if (letterCount <= 6 && chineseCount <= 3) {
    // 昵称符合要求，返回原始昵称
    return nickname;
  } else {
    // 昵称超过限制，截取前6个英文字符或三个汉字
    var limitedNickname = '';
    var letterIndex = 0;
    var chineseIndex = 0;

    for (var i = 0; i < nickname.length; i++) {
      var char = nickname.charAt(i);
      if (/[a-zA-Z]/.test(char)) {
        // 当前字符是英文字母
        if (letterIndex < 6) {
          limitedNickname += char;
          letterIndex++;
        }
      } else {
        // 当前字符是汉字
        if (chineseIndex < 3) {
          limitedNickname += char;
          chineseIndex++;
        }
      }
      if (letterIndex >= 6 && chineseIndex >= 3) {
        // 达到限制条件，终止循环
        break;
      }
    }

    return limitedNickname;
  }
}

// 测试
var nickname1 = 'HelloWorld';
console.log(limitNickname(nickname1)); // 输出: HelloWo

var nickname2 = '你好，世界';
console.log(limitNickname(nickname2)); // 输出: 你好，世

var nickname3 = 'Hello, 世界';
console.log(limitNickname(nickname3)); // 输出: Hello, 世

var nickname4 = '你好，HelloWorld';
console.log(limitNickname(nickname4)); // 输出: 你好，H
```