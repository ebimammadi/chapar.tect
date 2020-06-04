<template>
  <div class="enterance-jumbotron bg-ultra-light-gray" >
    <app-logo />
    <h5 class="mt-5 danger">Register under construciton</h5>
    <b-form-group class="mt-20 align-center">
      <p>
        By signing up, you agree to our Terms. 
        Learn how we collect, use and share your data in our
         Data Policy and how we use cookies and similar technology in our Cookies Policy.
      </p>
        Have an account? <router-link to="/login">Log In</router-link>
      </b-form-group> 
  </div>
</template>

<script>
//import Store from '@/stores/stores';
import Logo from '@/components/Logo.vue';

export default {
  name: 'login',
  components:{
    'app-logo': Logo
  },
}
</script>

<style>
</style>