---
title: "移动端适配方案pxtorem"
pubDate: 2024-06-17
draft: false
description: "移动端适配方案pxtorem"
tags: ["h5"]
---

```shell
npm install postcss-pxtorem --save-dev
```

vite.config.ts

```ts
import postCssPxToRem from "postcss-pxtorem";

css: {
  postcss: {
    plugins: [
      postCssPxToRem({
        // 自适应，px>rem转换
        rootValue: ({ file }: any) => {
          return file.indexOf("vant") !== -1 ? 37.5 : 75;
        },
        propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
        selectorBlackList: [".ignore"], // 过滤掉".ignore"开头的class，不进行rem转换
        exclude: "", // 忽略包文件转换rem 因vant css 在 moudle中
      }),
    ];
  }
}
```

flexible.js
```js
(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    const maxWidth = 80; // 设置最大宽度为 600px，可以根据需要调整
    let rem = "";
    let w =
      docEl.clientWidth < docEl.clientHeight
        ? docEl.clientWidth
        : docEl.clientHeight;
    rem = w / 10;
    rem = rem > maxWidth ? maxWidth : rem;
    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);

```

main.ts 引用 flexible.js
```ts
import "./flexible.js";
```