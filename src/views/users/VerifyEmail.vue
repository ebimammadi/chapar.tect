<template>
  <div class="enterance-jumbotron bg-ultra-light-gray">
    <app-logo />
    <h5 class="mt-2 align-center">Verify Email</h5>
    <b-form class="mt-4">
      <b-form-group v-if="verified" >
          Your email have been verified!
      </b-form-group>

      <b-form-group class="mt-4">

      </b-form-group>

      <b-form-group class="mt-10 align-center">
        Go to the
        <router-link to="/login">Sign In</router-link> page
      </b-form-group>
    </b-form>

    <!-- <b-button variant="primary" href="#">More Info</b-button> -->
  </div>
</template>

<script>
import ApiService from "@/core/ApiService";
//import JwtService from "@/core/JwtService";

import Store from "@/stores/stores";
import Logo from "@/components/Logo.vue";

export default {
  components: {
    "app-logo": Logo
  },
  data() {
    return {
      verified: false
    };
  },
  created() {
    //if we have logged-in before
    //if (JwtService.getToken()) return this.$router.push("/");
    ApiService.get(`/users/verify-email/${this.$route.params.code}`)
      .then( response => {
        if (response.data.message !== "ok"){
          Store.commit('changeMessage', 'There is an error!' );
          Store.commit('changeVariant','warning');
          this.verified = false;
        }else{
          Store.commit('changeMessage', response.data.message );
          Store.commit('changeVariant','success');
          this.verified = true;
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
