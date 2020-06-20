<template>
  <div class="enterance-jumbotron bg-ultra-light-gray" >
    <app-logo />
    <h5 class="mt-2 align-center">Sign In</h5>
    <b-form @submit.prevent="onSubmit" class="mt-4" >
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
import _ from 'lodash';

import ApiService from '@/core/ApiService';
import JwtService from '@/core/JwtService';
import Store from '@/stores/stores';
import Logo from '@/components/Logo.vue';

export default {
  name: 'login',
  components:{
    'app-logo': Logo
  },
  data(){
    return {
      form : {
        email: '',
        password: ''
      }
    }
  },
  methods:{
    onSubmit: function() {
      const data = _.pick(this.form, ['email','password']);
      ApiService.post('/users/login', data)
      .then( response => {
        Store.commit('changeMessage', '');
        const token = response.headers["x-auth-token"];
        JwtService.setToken(token);
        Store.commit('changeSingInStatus', true);
        this.$router.push("/");
      })
      .catch( error => {
        if (!error.response)
          return Store.commit('changeMessage', 'Network Error!');
        Store.commit('changeMessage', `Error: ${error.response.data.message}`);
      });

    }
  },
  created() {
    //if we have loged in before
    if (JwtService.getToken()) return this.$router.push('/')
  },
   mounted() {
    JwtService.deleteToken();//remove the tokens
  }
}
</script>

<style>
.enterance-jumbotron{
  max-width:400px;
  margin:20px auto;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 20px;
  text-align: left;
}

</style>
