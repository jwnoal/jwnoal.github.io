<template>
  <VueLive
    :code="`<demo />`"
    :components="registeredComponents"
    @error="(e) => handleError(e)"
  />
</template>

<script>
import { VueLive } from "vue-live";
// import the css separately for easier SSR
// import "vue-live/lib/vue-live.esm.css";
import Demo from "./Demo.vue?raw";
import { markRaw } from "vue";

export default {
  components: { VueLive },
  data() {
    return {
      registeredComponents: {
        Demo: markRaw(Demo),
      },
    };
  },
};
</script>
