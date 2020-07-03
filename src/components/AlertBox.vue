<template>
  <div class="alert-box">
    <b-alert :show="message.length>0" :variant="variant" dismissible fade>
      {{ message }}
    </b-alert>
  </div>
</template>

<script>
import Store from "../stores/stores";

export default {
  computed: {
    message: () => Store.getters.getMessage,   
    variant: () => Store.getters.getVariant
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
