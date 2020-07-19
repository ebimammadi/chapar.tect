<template>
  <div class="entrance-jumbotron bg-ultra-light-gray">
    <app-logo />
    <h5 class="mt-2 align-center">Email Verification</h5>
    <b-form class="mt-4">
      <b-form-group v-if="verified">
        Thank you for your confirmation. Your email address has been verified
        now, please sign in and start using the application.
      </b-form-group>

      <b-form-group class="mt-4"> </b-form-group>

      <b-form-group class="mt-10 align-center">
        Go to the
        <router-link to="/login">Sign In</router-link> page
      </b-form-group>
    </b-form>

    <!-- <b-button variant="primary" href="#">More Info</b-button> -->
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
      .then(response => {
        return this.setAlert({
          message: response.data.message,
          variant: response.data.response_type
        })
      })
      .catch(
        error =>
          this.setAlert({ message: `Network Error!` }) && console.log(error)
      )
  }
}
</script>
