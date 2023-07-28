---
title: 'vue 组件递归调用自己'
description: 'vue 组件递归调用自己'
pubDate: '2023-07-23'
heroImage: '/blog-placeholder-4.jpg'
---

```js
import { Vue, Component } from 'vue-property-decorator';

@Component({
	name: 'MyComponent',
})
export default class MyComponent extends Vue {}
```

```js
export default {
	name: 'MyComponet'
}
```

```
<MyComponet v-if=""></MyComponet>
```