<template>
  <div class="alert-box">
    <b-alert 
      :show="message.length>0 " 
      :variant="variant" 
      dismissible
      fade @dismissed="clearMessage"
      
    >
      {{ message }}
    </b-alert>
    <!-- style="z-index: 1000;" -->
  </div>
</template>

<script>
import Store from "@/store/index.js"

export default {
  computed: {
    message: () => Store.getters.getMessage || '',
    variant: () => Store.getters.getVariant,
  },
  methods: {
    clearMessage() {
      Store.commit("changeAlert", {message : ''})
    } 
  },
  watch: {
    message: function(){
      if (this.message.length>0)
        this.$bvToast.toast(this.message, {
          title: `${this.variant.toUpperCase()}:`,
          variant: this.variant,
          autoHideDelay: 3000,
          toaster: 'b-toaster-top-right', //'b-toaster-top-center'
          appendToast: true
        })
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
