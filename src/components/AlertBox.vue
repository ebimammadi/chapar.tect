<template>
  <div class="alert-box">
      <b-alert 
        :show="message.length > 0"
        :variant="variant"
        :dismissible="dismissible"
      >
        {{ message }}
      </b-alert>
  </div>
</template>

<script>
import Store from '../stores/stores';

export default {
  props: {
    dismissible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    message: function() {
      return Store.getters.getMessage;
    },
    variant: function() {
      return Store.getters.getVariant || 'warning';
    },
  }
}
</script>
<style scoped>
  .alert-box{
    width:400px;
    margin: 10px auto;
    padding:10px;
  }
</style>