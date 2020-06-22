<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand>
      <app-logo />


    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item >
          <router-link :to="'/'">
            Home
          </router-link>
        </b-nav-item>
        <b-nav-item >
          <router-link :to="'/about'">
            About
          </router-link>
        </b-nav-item>

      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">SE</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item :to="'/profile'">
            Profile
          </b-dropdown-item>
          <b-dropdown-item href="#" :click="singOut">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Logo from '@/components/Logo.vue';
import Store from '@/stores/stores';

import JwtService from '@/core/JwtService';
import ApiService from '@/core/ApiService';
export default {
  name: 'Navbar',
  components: {
    'app-logo': Logo
  },
  methods: {
    singOut: function() {

      console.log('called singOut ')
      ApiService.get(`/users/logout`)
      .then( () => {
        console.log('called logout')
        this.$router.push('/login');
      })
      .catch( err => {
        console.log(err);
        if (!err.status)
          Store.commit('changeMessage', 'Network Error!');
        this.$router.push('/login');
      });
      JwtService.deleteToken();
      //this.$router.push('/login');
    }
  }

}
</script>
