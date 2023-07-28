---
title: 'vue全局toast组件'
description: 'vue全局toast组件'
pubDate: '2023-07-23'
heroImage: '/blog-placeholder-4.jpg'
---

记一个全局toast 组件

main.ts
```
import Toast from "./components/toast/index"; //全局组件
app.config.globalProperties.$toast = Toast.msg;
```

新建global.d.ts  （为了this.$toast 的时候不报错）
```
import "@vue/runtime-core";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $toast: (key: string) => void;
  }
}

```

toast 组件:
/components/toast/index.ts
```
// 第一步：引入需要的组件与方法
import toast from "./Toast.vue";
import { createApp } from "vue";

// 第二步：挂载到你想要的dom身上
// 创建app实例，此时处于游荡阶段
const app = createApp(toast);
// 这样会挂在到toast这个dom上（项目中有个public文件，在里面的index.html中写入该dom
// 或者你也可以像下面那样创建一个dom元素，然后挂载到body身上，到时候再处理）
// const instant:any = app.mount("#toast");

// 当然你可以试试链式操作
const dom = document.createElement("div");
document.body.appendChild(dom);
// 这个是为了获取组件实例，方便后面对组件变量动态操作
const instant: any = app.mount(dom);

// 写内部实现方法
class Toast {
  msg(msg: string) {
    instant.setMessage(msg);
  }
}

export default new Toast();

```
/components/toast/Toast.vue
```
<template>
  <transition name="fade">
    <div v-show="visible">{{ message }}</div>
  </transition>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class Toast extends Vue {
  visible = false;
  message = "";
  timmer: number | null = null;
  setMessage(msg = "", time = 1500) {
    if (this.timmer) {
      clearTimeout(this.timmer);
    }
    this.message = msg;
    this.visible = true;
    this.timmer = window.setTimeout(() => {
      this.visible = false;
    }, time);
  }
}
</script>

<style lang="less" scoped>
div {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 5px 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  text-align: center;
  transform: translate(-50%, -50%);
}
/* vue动画过渡效果设置 */
.fade-enter-active {
  animation: opcIn ease-in-out 0.4s;
}
.fade-leave-active {
  animation: opcOut ease-in-out 0.4s;
}
@keyframes opcIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes opcOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

```
