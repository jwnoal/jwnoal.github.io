<template>
  <div ref="list" class="v-scroll" @scroll="scrollEvent">
    <div class="infinite-list" :style="{ height: listHeight + 'px' }"></div>

    <div class="scroll-list" :style="{ transform: getTransform }">
      <p
        ref="items"
        class="scroll-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }"
      >
        {{ item.msg }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from "vue";

const listdata = [];
for (let i = 1; i <= 10000; i++) {
  listdata.push({
    id: i,
    msg: `${i}:${Math.floor(Math.random() * 10000)}`,
  });
}

const start = ref(0);
const end = ref(0);
const startOffset = ref(0);
const itemHeight = ref(60);
const listHeight = ref(listdata.length * itemHeight.value);
const list = ref(null); //获取节点

//可视区域高度
const screenHeight = 600;
//可显示的列表项数
const visibleCount = Math.ceil(screenHeight / itemHeight.value); //多放3个

onMounted(() => {
  start.value = 0;
  end.value = start.value + visibleCount;
});

//偏移量对应的style
const getTransform = computed(() => {
  return `translate3d(0,${startOffset.value}px,0)`;
});
//获取真实显示列表数据
const visibleData = computed(() => {
  return listdata.slice(start.value, Math.min(end.value, listdata.length));
});

function scrollEvent() {
  //当前滚动位置
  const scrollTop = list.value.scrollTop;
  //此时的开始索引
  start.value = Math.floor(scrollTop / itemHeight.value);
  //此时的结束索引
  end.value = start.value + visibleCount;
  //此时的偏移量
  startOffset.value = scrollTop - (scrollTop % itemHeight.value);
}
</script>

<style scoped>
.v-scroll {
  height: 600px;
  width: 400px;
  border: 3px solid #000;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  color: rgb(26, 199, 124);
}

.infinite-list {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.scroll-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.scroll-item {
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
