<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand>
      <!-- <a href="" target="_self">{{ appName }}</a> -->
      <!-- <a href="" target="_self" :title='appName'> -->
      <app-logo />
      
      <!-- <router-link :to="'/'">
        {{ appName }}
      </router-link>   -->
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

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">       
        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">SE</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#" v-on:click="singOut">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Logo from '@/components/Logo.vue';
import Store from '@/stores/stores';
export default {
  name: 'Navbar',
  components: {
    'app-logo': Logo
  },
  computed: {
    appName: () => Store.getters.settings.app_name,
  },
  methods: {
    singOut: function() {
      console.error('I Should remove the jwt here!');
      this.$router.push('/login')
    }
  }

}
</script>
