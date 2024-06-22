<template>
  <VueLive
    :editorProps="{ lineNumbers: true }"
    :code="Demo"
    @error="(e) => handleError(e)"
  />
</template>

<script lang="ts" setup>
import { markRaw } from "vue";
import { VueLive } from "vue-live";
import Demo from "./Demo.vue?raw";
</script>

<style scoped lang="scss">
@import url("./vue-live.scss");
</style>
