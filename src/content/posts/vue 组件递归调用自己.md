---
title: "vue 组件递归调用自己"
published: 2022-07-01
draft: false
description: "vue 组件递归调用自己"
tags: ["vue"]
---

```js
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "MyComponent",
})
export default class MyComponent extends Vue {}
```

```js
export default {
  name: "MyComponet",
};
```

```
<MyComponet v-if=""></MyComponet>
```
