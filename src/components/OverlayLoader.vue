<template>
  <loading :active.sync="overlayShow" :is-full-page="overlayShow" color="blue">
  </loading>
</template>

<script>
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

import Store from "@/store/index.js";

export default {
  components: {
    Loading
  },
  computed: {
    overlayShow: function() {
      return Store.getters.overlayShow;
    }
  }
};
</script>
