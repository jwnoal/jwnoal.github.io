---
title: "vue3 使用swiper"
published: 2024-07-08
draft: false
description: "vue3 使用swiper"
tags: ["vue"]
category: "代码"
---

文档地址：[https://swiperjs.com/vue#swiper-props](https://swiperjs.com/vue#swiper-props)
demo地址：[https://swiperjs.com/demos](https://swiperjs.com/demos)

安装swiper
```shell
npm install swiper --save
```

```vue
<template>
  <div class="w-1000 b-rd-8 overflow-hidden relative banner">
    <swiper
      slidesPerView="auto"
      :space-between="20"
      :freeMode="true"
      :modules="modules"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      // 如需要自定义宽度就在这里设置，否则 :slidesPerView="3"
      <swiper-slide style="width: 200px;" v-for="(_item, index) in 10" :key="index">
        <div
          class="h-70 bg-cover bg-center bg-no-repeat"
          :style="{
            backgroundImage: `url(https://swiperjs.com/demos/images/nature-1.jpg)`,
          }"
        ></div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Swiper as SwiperType } from "swiper";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const modules = [FreeMode];

const mySwiper: any = ref();
const activeIndex = ref(0);

const onSwiper = (swiper: SwiperType) => {
  // console.log(swiper);
  mySwiper.value = swiper;
};

const onSlideChange = (swiper: SwiperType) => {
  // console.log("slide change", swiper);
  activeIndex.value = swiper.activeIndex;
};

// setTimeout(() => {
//   mySwiper.value?.slideTo(2);
// }, 3000);
</script>

<style lang="scss" scoped></style>

```