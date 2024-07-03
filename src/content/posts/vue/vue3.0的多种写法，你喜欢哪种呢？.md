---
title: "vue3.0的多种写法，你喜欢哪种呢？"
published: 2022-07-01
draft: false
description: "vue3.0的多种写法，你喜欢哪种呢？"
tags: ["vue"]
category: "代码"
---

#### 第一种写法：

```js
<template>
  <div>defineComponent</div>
  <div>{{ topinset }}</div>
  <div>{{ doubleCount }}</div>
  <div>{{ list }}</div>
</template>

<script lang="ts">
interface STATE {
  topinset: number;
}
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  nextTick,
  computed,
  watch
} from "vue";

export default defineComponent({
  name: "App",
  props: ["list"],
  emits: ["openAgain"],
  components: {},
  setup(prop, context) {
    // emit
    // context.emit("openAgain");
    // prop
    // prop.list
    const state = reactive<STATE>({
      topinset: 0
    });
    const doubleCount = computed(() => state.topinset + "1");
    onMounted(() => {
      console.log("onMounted");
    });
    nextTick(() => {
      console.log("nextTick");
    });
    setTimeout(() => {
      state.topinset = 3;
    }, 1000);
    watch(
      () => state.topinset,
      (newValue: any) => {
        console.log("watch");
      }
    );
    return {
      doubleCount,
      ...toRefs(state)
    };
  }
});
</script>
```

#### 第二种写法

```js
<template>
  <div>
    classComponent
    <div>{{ balance }} {{ balance1 }}</div>
    <img src="@/assets/bg.png" alt="" />
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from "vue-class-component";
class Props {
  public list = prop<number>({ default: 0 });
}
@Options({
  components: {},
  watch: {
    balance: function (val) {
      console.log("watch");
    }
  }
})
export default class Cla extends Vue.with(Props) {
  balance: string = "0.00";

  created() {
    console.log("created");

	//this.$emit("close");

    setTimeout(() => {
      this.balance = "123";
    }, 1000);

    this.$nextTick(() => {
      console.log("nextTick");
    });
  }

  get balance1() {
    return this.balance + "2342";
  }

  mounted() {
    console.log("mounted");
  }
}
</script>

```

#### 第三种写法

vue3.2 之后的版本

```js
<template>
  <div>setup</div>
  <div>{{ a }}</div>
  <div>{{ ab }}</div>
  <HelloWorld :a="ab" :b="a" />
</template>

<script lang="ts" setup>
import { ref, nextTick, computed, watch } from "vue";
// 组件直接import
import HelloWorld from "@/components/HelloWorld.vue";
// defineProps<{ a: string; b: string }>();
// defineEmits
let a = ref("小明");
const ab = computed(() => a.value + "1");
nextTick(() => {
  console.log("nextTick");
});
setTimeout(() => {
  a.value = "kkkk";
}, 1000);
watch(
  () => a.value,
  (newValue: any) => {
    console.log("watch", newValue);
  }
);
</script>

```

#### 项目地址

https://github.com/jwnoal/vite_vue3
