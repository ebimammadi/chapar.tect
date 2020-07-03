<template>
  <div class="enterance-jumbotron bg-ultra-light-gray">
    <app-logo />
    <h5 class="mt-2 align-center">Forget Password?</h5>
    <b-form @submit.prevent="onSubmit" class="mt-4">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email address"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-button type="submit" variant="success">Send Log In Link</b-button>
      </b-form-group>

      <b-form-group class="mt-10 align-center">
        Back to the <router-link to="/login">Sign In</router-link> page
      </b-form-group>
    </b-form>

    <!-- <b-button variant="primary" href="#">More Info</b-button> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ApiService from "@/core/ApiService";
import JwtService from "@/core/JwtService";

import Logo from "@/components/Logo.vue";

export default {
  components: {
    "app-logo": Logo
  },
  data() {
    return {
      form: {
        email: ""
      }
    };
  },
  methods: {
    ...mapActions(["setAlert"]),
    onSubmit: function() {
      ApiService.post("/users/forget-password", { email: this.form.email })
        .then(response => {
          this.form.email = "";
          this.setAlert({
            message: response.data.message,
            variant: response.data.response_type
          });
        })
        .catch(error => {
          this.form.email = "";
          console.log(error);
          this.setAlert({ message: `Network Error!` });
        });
    }
  },
  created() {
    //if we have logged-in before
    if (JwtService.getToken()) return this.$router.push("/");
  }
};
</script>
