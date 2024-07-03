---
title: "input 的整理"
published: 2022-07-01
draft: false
description: "input 的整理"
tags: ["h5", "input", "js"]
category: "代码"
---

#### input 设置长度

```html
//type="number" maxlength无效
<input type="text" maxlength="10" />
<textarea type="text" maxlength="10"></textarea>
```

#### 自动高度输入框

```html
<template>
  <textarea
    ref="textarea"
    :style="textareaStyles"
    v-model="currentValue"
    placeholder="请输入..."
  ></textarea>
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";

  interface Iautosize {
    minRows: number;
    maxRows: number;
  }

  class Props {
    autosize?: Iautosize;
  }

  @Options({
    components: {},
    watch: {
      currentValue() {
        this.$nextTick(() => {
          this.resizeTextarea();
        });
      },
    },
  })
  export default class AutoHeightInput extends Vue.with(Props) {
    textareaStyles = {};
    currentValue = "";
    hiddenTextarea: null | HTMLTextAreaElement = null;
    HIDDEN_TEXTAREA_STYLE = `
    min-height:0 !important;
    max-height:none !important;
    height:0 !important;
    visibility:hidden !important;
    overflow:hidden !important;
    position:absolute !important;
    z-index:-1000 !important;
    top:0 !important;
    right:0 !important
  `;
    SIZING_STYLE = [
      "letter-spacing",
      "line-height",
      "padding-top",
      "padding-bottom",
      "font-family",
      "font-weight",
      "font-size",
      "text-rendering",
      "text-transform",
      "width",
      "text-indent",
      "padding-left",
      "padding-right",
      "border-width",
      "box-sizing",
    ];
    created(): void {}
    mounted(): void {
      this.resizeTextarea();
    }

    resizeTextarea() {
      let minRows: null | number = null;
      let maxRows: null | number = null;
      if (this.autosize && this.autosize.minRows) {
        minRows = this.autosize.minRows;
      }
      if (this.autosize && this.autosize.minRows) {
        maxRows = this.autosize.maxRows;
      }
      this.textareaStyles = this.calcTextareaHeight(
        this.$refs.textarea,
        minRows,
        maxRows
      );
    }

    calcTextareaHeight(
      uiTextNode,
      minRows: null | number,
      maxRows: null | number
    ) {
      // 新建个隐藏的Textarea为了获取单行高度
      if (!this.hiddenTextarea) {
        this.hiddenTextarea = document.createElement("textarea");
        document.body.appendChild(this.hiddenTextarea);
      }
      const style = window.getComputedStyle(uiTextNode);
      const sizingStyle = this.SIZING_STYLE.map(
        (name) => `${name}:${style.getPropertyValue(name)}`
      ).join(";");
      this.hiddenTextarea.setAttribute(
        "style",
        `${sizingStyle};${this.HIDDEN_TEXTAREA_STYLE}`
      );
      this.hiddenTextarea.value =
        uiTextNode.value || uiTextNode.placeholder || "";
      let minHeight = Number.MIN_SAFE_INTEGER;
      let maxHeight = Number.MAX_SAFE_INTEGER;
      let height = this.hiddenTextarea.scrollHeight;
      const boxSizing =
        style.getPropertyValue("box-sizing") ||
        style.getPropertyValue("-moz-box-sizing") ||
        style.getPropertyValue("-webkit-box-sizing");
      const paddingSize =
        parseFloat(style.getPropertyValue("padding-bottom")) +
        parseFloat(style.getPropertyValue("padding-top"));
      const borderSize =
        parseFloat(style.getPropertyValue("border-bottom-width")) +
        parseFloat(style.getPropertyValue("border-top-width"));
      let overflowY;
      // 计算高度
      if (minRows !== null || maxRows !== null) {
        // measure height of a textarea with a single row
        this.hiddenTextarea.value = " ";
        let singleRowHeight = this.hiddenTextarea.scrollHeight - paddingSize;
        if (minRows !== null) {
          minHeight = singleRowHeight * minRows;
          if (boxSizing === "border-box") {
            minHeight = minHeight + paddingSize + borderSize;
          }
          height = Math.max(minHeight, height);
        }
        if (maxRows !== null) {
          maxHeight = singleRowHeight * maxRows;
          if (boxSizing === "border-box") {
            maxHeight = maxHeight + paddingSize + borderSize;
          }
          overflowY = height > maxHeight ? "" : "hidden";
          height = Math.min(maxHeight, height);
        }
      }
      // 未到最大行数，不滚动
      if (!maxRows) {
        overflowY = "hidden";
      }
      return {
        height: `${height}px`,
        minHeight: `${minHeight}px`,
        maxHeight: `${maxHeight}px`,
        overflowY,
      };
    }
  }
</script>
<style lang="less" scoped>
  textarea {
    line-height: 20px;
    resize: none;
    outline: none;
  }
</style>
```

#### 数字框最大值

使用 watch 监听

#### 数字格式化 （前面加￥）

可以底下一个输入框，字体透明
上面叠一个 div 穿透
input 和 div 设置同样的字体和大小
