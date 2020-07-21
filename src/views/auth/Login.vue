<template>
  <div class="entrance-jumbotron bg-ultra-light-gray">
    <app-logo />
    <h5 class="mt-2 align-center">Sign In</h5>
    <b-form @submit.prevent="onSubmit" class="mt-4">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          v-focus
          type="email"
          required
          placeholder="Enter email address"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-button type="submit" variant="success">Log In</b-button>
      </b-form-group>

      <b-form-group class="mt-10 align-center ">
        <router-link to="/forget-password">Forget Password?</router-link>
      </b-form-group>
      <b-form-group class="mt-20 align-center">
        Don't have an account? <router-link to="/register">Sign Up</router-link>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import _ from "lodash"
import { mapActions } from "vuex"

import Logo from "@/components/Logo.vue"
import ApiService from "@/core/ApiService"
import JwtService from "@/core/JwtService"
import Store from "@/store/index"

export default {
  name: "login",
  components: {
    "app-logo": Logo
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    ...mapActions(["setAlert", "setSingInStatus", "setProfilePhotoUrl"]),
    onSubmit: function() {
      const data = _.pick(this.form, ["email", "password"])
      ApiService.post("/users/login", data)
        .then(response => {
          if (response.data.message)
            return this.setAlert({ message: response.data.message })
          this.setAlert({ message: "" })
          const token = response.headers["x-auth-token"]
          JwtService.setToken(token)
          const { profilePhotoUrl } = JwtService.decodeToken()
          this.setProfilePhotoUrl(profilePhotoUrl)
          this.setSingInStatus(true)
          this.$router.push("/app")
        })
        .catch(
          error =>
            this.setAlert({ message: `Network Error!` }) && console.log(error)
        )
    }
  },
  created() {
    Store.commit("changeProfilePhotoUrl", '')
    //if we have logged in before
    //Todo update this chunk
    //console.log(`login JwtService.getToken()`, JwtService.isValidToken())
    JwtService.deleteToken() //!
    if (JwtService.isValidToken()) return this.$router.push("/")
  },
  mounted() {
    //JwtService.deleteToken(); //remove the tokens
  }
}
</script>

<style>
.entrance-jumbotron {
  max-width: 400px;
  margin: 20px auto;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 20px;
  text-align: left;
}
</style>
