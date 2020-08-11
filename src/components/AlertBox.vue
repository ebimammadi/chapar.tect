<template>
  <div class="alert-box">
    <b-alert :show="message.length>0 " :variant="variant" dismissible fade @dismissed="clearMessage">
      {{ message }}
    </b-alert>
  </div>
</template>

<script>
import Store from "@/store/index.js"

export default {
  data(){
    return {
      clearText: ''
    }
  },
  computed: {
    message: () => Store.getters.getMessage || '',
    variant: () => Store.getters.getVariant,
  },
  methods: {
    clearMessage() {
      Store.commit("changeAlert", {message : ''})
    } 
  }
}
</script>

<style scoped>
.alert-box {
  max-width: 400px;
  margin: 10px auto;
  padding: 10px;
}
</style>
