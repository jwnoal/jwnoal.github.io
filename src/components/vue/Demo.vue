<template>
  <div class="hello">
    <h1>Colored Text</h1>
    <input v-model="msg" />
    <div>
      {{ msg }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const msg = ref("Push Me");
</script>
