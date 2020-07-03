<template>
  <div class="enterance-jumbotron bg-ultra-light-gray">
    <app-logo />
    <h5 class="mt-2 align-center">Sign Up</h5>
    <b-form @submit.prevent="onSubmit" class="mt-4">
      <b-form-group label="Fullname:" label-for="name">
        <b-form-input
          id="name"
          v-model="form.name"
          v-focus
          type="text"
          required
          placeholder="Enter your fullname"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Email address:" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
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
      <b-form-group label="Repeat Password:" label-for="repeat-password">
        <b-form-input
          id="repeat-password"
          v-model="form.repeatPassword"
          type="password"
          required
          placeholder="Repeat Password"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-button type="submit" variant="success">Sign Up</b-button>
      </b-form-group>

      <b-form-group class="mt-20 align-center">
        <p class="align-justify">
          By signing up, you agree to our
          <router-link to="/terms">Terms</router-link>. Learn how we collect,
          use and share your data in our Data Policy and how we use cookies and
          similar technology in our Cookies Policy.
        </p>
        Have an account? <router-link to="/login">Log In</router-link>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import _ from "lodash";

import ApiService from "@/core/ApiService";
import JwtService from "@/core/JwtService";
import Store from "@/stores/stores";
import Logo from "@/components/Logo.vue";

export default {
  name: "register",
  components: {
    "app-logo": Logo
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
      }
    };
  },

  methods: {
    onSubmit: function() {
      //!TODO: validation should be implemeneted using vuelidate
      if (this.form.password.length < 8) {
        Store.commit("changeMessage", "Password is short!");
        Store.commit("changeVariant", "warning");
        return;
      }
      if (this.form.password != this.form.repeatPassword) {
        Store.commit("changeMessage", "Passwords mismatch!");
        Store.commit("changeVariant", "warning");
        return;
      }
      const data = _.pick(this.form, ["name", "email", "password"]);
      ApiService.post("/users/register", data)
        .then(response => {
          Store.commit("changeMessage", "");
          const token = response.headers["x-auth-token"];
          JwtService.setToken(token);
          Store.commit("changeSingInStatus", true);
          this.$router.push("/");
        })
        .catch(error => {
          if (!error.response)
            return Store.commit("changeMessage", "Network Error!");
          Store.commit(
            "changeMessage",
            `Error: ${error.response.data.message}`
          );
        });
    }
  },
  created() {
    //if we have loged in before
    if (JwtService.getToken()) return this.$router.push("/");
  }
};
</script>
