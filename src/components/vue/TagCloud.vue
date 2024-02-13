<template>
  <div ref="tagCloudRef" class="tag-cloud">
    <div
      v-for="tag in tags"
      :key="tag"
      class="tag"
      :style="{ color: randomHexColorCode() }"
    >
      <a :href="`./tag/${tag}`">
        {{ tag }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { randomHexColorCode } from "../../utils/util";
const props = defineProps({
  tags: {
    type: Array,
    required: false,
  },
});

const tagCloudRef = ref(null);

onMounted(() => {
  nextTick(() => {
    const tagCloudEl = tagCloudRef.value;
    const tags = tagCloudEl.querySelectorAll(".tag");

    //根据标签数量和半径计算标签的分布
    let tagCloud = {};
    tagCloud.item = tags;
    tagCloud.radius = 200;
    tagCloud.initItemLocate = function () {
      let that = this;
      let itemLen = this.item.length;
      return [].slice.call(this.item).map(function (item, index) {
        let k = -1 + (2 * (index + 1) - 1) / itemLen;
        let a = Math.acos(k);
        let b = a * Math.sqrt(itemLen * Math.PI);
        let x = that.radius * Math.sin(a) * Math.cos(b);
        let y = that.radius * Math.sin(a) * Math.sin(b);
        let z = that.radius * Math.cos(a);
        return { item: item, x: x, y: y, z: z };
      });
    };
    tagCloud.fallLength = 500;
    tagCloud.draw = function () {
      let that = this;
      this.itemLocate.map(function (item) {
        let left = item.x + that.radius + "px";
        let top = item.y + that.radius + "px";
        let scale = that.fallLength / (that.fallLength - item.z);
        let alpha = (item.z + that.radius) / (2 * that.radius);
        let fontSize = ~~(20 * scale) + "px";
        let opacity = alpha + 0.5;
        let filter = "alpha(opacity = " + (alpha + 0.5) * 100 + ")";
        let zIndex = parseInt(scale * 100);
        item.item.style.cssText +=
          "left:" +
          left +
          ";top:" +
          top +
          ";font-size" +
          fontSize +
          ";opacity:" +
          opacity +
          ";filter:" +
          filter +
          ";z-index:" +
          zIndex +
          ";";
      });
    };
    tagCloud.angleX = Math.PI / 2000; //设置每次旋转的角度
    tagCloud.angleY = Math.PI / 2000; //设置每次旋转的角度
    tagCloud.animation = function () {
      let that = this;
      that.draw();
      setInterval(function () {
        that.rotateX();
        that.rotateY();
        that.draw();
      }, 17);
    };
    tagCloud.rotateX = function () {
      let angleX = this.angleX;
      this.itemLocate.map(function (item) {
        let yy = item.y * Math.cos(angleX) - item.z * Math.sin(angleX);
        let zz = item.z * Math.cos(angleX) + item.y * Math.sin(angleX);
        item.y = yy;
        item.z = zz;
      });
    };
    tagCloud.rotateY = function () {
      let angleY = this.angleY;
      this.itemLocate.map(function (item) {
        let xx = item.x * Math.cos(angleY) - item.z * Math.sin(angleY);
        let zz = item.z * Math.cos(angleY) + item.x * Math.sin(angleY);
        item.x = xx;
        item.z = zz;
      });
    };
    // tagCloud.onmouseover = function () {
    //   let that = this;
    //   this.tag.addEventListener("mouseover", function (e) {
    //     that.angleY = (Math.abs(e.offsetX) - that.radius) * 0.00003; //根据鼠标的位置更改旋转角度（这里减去半径是因为之前为各标签定位时加了半径，主要是对坐标原点的控制）
    //     that.angleX = (Math.abs(e.offsetY) - that.radius) * 0.00003;
    //   });
    // };
    // tagCloud.onmouseout = function () {
    //   let that = this;
    //   this.tag.addEventListener("mouseout", function (e) {
    //     that.angleX = Math.PI / 2000; // 鼠标移走后恢复原旋转角度
    //     that.angleY = Math.PI / 2000;
    //   });
    // };
    tagCloud.init = function () {
      this.itemLocate = this.initItemLocate();
      this.animation();
      // this.onmouseover();
      // this.onmouseout();
    };
    tagCloud.init();
  });
});
</script>

<style scoped lang="scss">
.tag-cloud {
  position: absolute;
  height: 500px;
  width: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.tag {
  position: absolute;
  white-space: nowrap;
  transform: translateX(-50%);
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
  }
}
</style>
