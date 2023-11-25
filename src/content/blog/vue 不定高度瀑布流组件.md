---
title: 'vue 不定高度瀑布流组件'
pubDate: 2022-07-01
draft: false
description: "vue 不定高度瀑布流组件"
tags: ["js", "vue"]
---

市面上知道高度的瀑布流插件有很多，不定高度，动态加载的瀑布流插件比较少，根据项目需求，自己写了一个

#### 创建瀑布流插件
```vue
<template>
  <div class="time">
    <div ref="col1" class="col">
      <slot name="left" :list="list1"></slot>
    </div>
    <div ref="col2" class="col">
      <slot name="right" :list="list2"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class Time extends Vue {
  @Prop({ type: Array, default: [] }) list
  list1 = []
  list2 = []
  leftRefHeight = 0
  rightRefHeight = 0
  newList = []
  renderOver = false

  @Watch('list')
  change(cur, old) {
    if (cur.length == 0) {
      this.newList = []
      this.list1 = []
      this.list2 = []
    } else {
      this.newList = this.list.slice(old.length, cur.length)
      this.addData()
    }
  }

  addData(arg = 0) {
    this.renderOver = false
    setTimeout(() => {
      this.leftRefHeight = (this.$refs.col1 as HTMLElement).offsetHeight
      this.rightRefHeight = (this.$refs.col2 as HTMLElement).offsetHeight
      // 获取所有数据的长度，以便于终止循环
      const length = this.newList.length
      let index = arg
      if (index < length) {
        // 放左边
        if (this.leftRefHeight <= this.rightRefHeight) {
          this.list1.push(this.newList[index])
        } else {
          this.list2.push(this.newList[index])
        }
        index++
        this.addData(index)
      } else {
        this.renderOver = true
      }
    }, 210)
  }
</script>

<style lang="scss" scoped>
.time {
  position: relative;
  .col {
    flex: 1;
    display: inline-flex;
    vertical-align: top;
    flex-direction: column;
    width: calc(50% - 4px);
    &:first-child {
      margin-right: 8px;
    }
    > div {
      margin-bottom: 8px;
    }
  }
}
</style>

```

#### 调用
```
    <div
      class="contain opc0"
      :class="{ opc1: tab == 1 }"
      @scroll="handleScroll"
    >
      <WaterFall :list="recommendList">
        <template v-slot:left="slotProps">
          <RecommendItem
            v-for="(item, index) in slotProps.list"
            :key="index"
            :item="item"
          ></RecommendItem>
        </template>
        <template v-slot:right="slotProps">
          <RecommendItem
            v-for="(item, index) in slotProps.list"
            :key="index"
            :item="item"
          ></RecommendItem>
        </template>
      </WaterFall>
    </div>
```

#### 思路
dom:
在一个div中创建两个竖着的div（使用flex 布局）,往每个div中分别塞入数据

如果高度固定，直接通过计算即可
如果不固定，则使用定时器一个一个添加，并且获取单列的高度，将新数据放入短的那列
*dom不能为隐藏状态，会获取不到dom高度





