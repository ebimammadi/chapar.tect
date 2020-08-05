<template>
  <div class="entrance-jumbotron bg-ultra-light-gray">
    <app-logo />
    <h5 class="mt-2 align-center">Email Verification</h5>
    <b-form >
      <b-form-group v-if="verified" class="mt-5">
        <b-icon-check-all variant="success"/> Thank you for your confirmation. Your email address has been verified successfully.
      </b-form-group>
      <b-form-group class="mt-5">
        Go to the
        <router-link to="/app">App Panel</router-link> 
        or visit the <router-link to="/">Home Page</router-link>.
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import ApiService from "@/core/ApiService"
import Logo from "@/components/Logo.vue"

export default {
  components: {
    "app-logo": Logo
  },
  data() {
    return {
      verified: false
    }
  },
  methods: {
    ...mapActions(["setAlert"])
  },
  created() {
    ApiService.get(`/users/verify-email/${this.$route.params.code}`)
      .then( response => {
        if ( response.data.response_type == "success") this.verified = true
        this.setAlert(response.data)
      })
      .catch( error => this.setAlert( { message: error.data.message } ))
  }
}
</script>
