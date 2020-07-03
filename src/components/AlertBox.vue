<template>
  <div class="alert-box">
    <b-alert :show="showAlert" :variant="variant" dismissible fade>
      {{ message }}
    </b-alert>
  </div>
</template>

<script>
import Store from "../stores/stores";

export default {
  props: {},
  computed: {
    showAlert: function() {
      if (Store.getters.getMessage.length > 0) return true;
      return false;
    },
    message: function() {
      return Store.getters.getMessage;
    },
    variant: function() {
      return Store.getters.getVariant || "warning";
    }
  }
};
</script>
<style scoped>
.alert-box {
  max-width: 400px;
  margin: 10px auto;
  padding: 10px;
}
</style>
