<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand>
      <app-logo />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link :to="'/app'">
            App
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link :to="'/app/about'">
            APP Panel
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link :to="'/app/users'">
            Users !
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link :to="'/app/products'">
            Products
          </router-link>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">SE</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item :to="'/app/profile'">
            Profile
          </b-dropdown-item>
          <b-dropdown-item :to="'/app/profile/address'">
            Address
          </b-dropdown-item>
          <b-dropdown-item href="#" v-on:click="singOut">
            Sign Out
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Logo from "@/components/Logo.vue";
import { mapActions } from "vuex";

import JwtService from "@/core/JwtService";
import ApiService from "@/core/ApiService";
export default {
  name: "Navbar",
  components: {
    "app-logo": Logo
  },
  methods: {
    ...mapActions(["setAlert"]),
    singOut: function() {
      JwtService.deleteToken();
      ApiService.get(`/users/logout`)
        .then(() => this.$router.push("/login"))
        .catch(err => {
          console.log(err);
          if (!err.status) this.setAlert({ message: `Network Error!` });
          this.$router.push("/login");
        });
    }
  }
};
</script>
