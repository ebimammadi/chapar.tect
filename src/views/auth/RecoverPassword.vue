<template>
  <div class="enterance-jumbotron bg-ultra-light-gray">
    <app-logo />
    <h5 class="mt-2 align-center">Recover Your Password</h5>
    <b-form @submit.prevent="onSubmit" class="mt-4">

      <b-form-group label="Email address:" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          disabled
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="New Password"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Repeat Password:" label-for="repeat-password">
        <b-form-input
          id="repeat-password"
          v-model="form.repeatPassword"
          type="password"
          required
          placeholder="Repeat New Password"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-button type="submit" variant="success">Set Password</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>

import ApiService from "@/core/ApiService";
import JwtService from "@/core/JwtService";
import Store from "@/stores/stores";
import Logo from "@/components/Logo.vue";

export default {
  name: "recover-password",
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
      const data = { password: this.form.password, code: this.$route.params.code };
      ApiService.post("/users/recover-password", data)
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
    if (JwtService.getToken()) return this.$router.push("/");  //if we have loged in before

    ApiService.get(`/users/recover-password-verify-code/${this.$route.params.code}`)
      .then( response => {
        if (!response.data.email){
          Store.commit('changeMessage', response.data.message );
          Store.commit('changeVariant','warning');
        }else{
          this.form.email = response.data.email;
          Store.commit('changeMessage', response.data.message );
          Store.commit('changeVariant','success');
        }
      })
      .catch( err => {
        console.log(err);
        if (!err.status)
          Store.commit('changeMessage', 'Network Error!');
      });
  }
};
</script>