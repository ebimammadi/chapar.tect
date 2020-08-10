<template>
  <div class="entrance-jumbotron bg-ultra-light-gray">
    <p class="align-center"><logo/></p>
    <h5 class="mt-2 align-center">Forget Password?</h5>
    <b-form @submit.prevent="onSubmit" class="mt-4">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter email address"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-button type="submit" variant="success">Send Recovery Link</b-button>
      </b-form-group>
      <b-form-group class="mt-10 align-center">
        Back to the <router-link to="/login">Sign In</router-link> page
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import ApiService from "@/core/ApiService"
import JwtService from "@/core/JwtService"

import Logo from "@/components/Logo.vue"

export default {
  components: { Logo },
  data() {
    return {
      email: ""
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    onSubmit: function() {
      ApiService.post("/users/forget-password", { email: this.email })
        .then(response => {
          this.email = ""
          this.setAlert({
            message: response.data.message,
            variant: response.data.response_type
          })
        })
        .catch(error => {
          this.email = ""
          this.setAlert({ message: error.data.message })
        })
    }
  },
  created() {
    if (JwtService.getToken()) return this.$router.push("/app")
  }
}
</script>
