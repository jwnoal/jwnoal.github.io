<template>
  <div>{{ a }}</div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
const a = ref('demo component');
</script>
