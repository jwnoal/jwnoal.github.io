<template>
  <button @click="assCount">Count is: {{ count }}</button>
  <div>{{ newCount }}</div>
  {{ obj }}
  {{ obj.c }}
  {{ calculateBooksMessage() }}
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
const count = ref(1);
setTimeout(() => {
  count.value++;
}, 0);
function assCount() {
  count.value++;
}
// 生命周期钩子
onMounted(() => {
  console.log("onMounted");
});

const obj = ref({ a: 1 });
setTimeout(() => {
  obj.value.b = 2;
  obj.value = { c: 1 };
}, 0);

const newCount = computed(() => {
  return count.value - 1;
});

function calculateBooksMessage() {
  return Date.now();
}

await nextTick();
</script>
