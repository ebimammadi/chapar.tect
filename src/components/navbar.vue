<template>
  <b-navbar toggleable="lg" type="dark" :variant="isInAppPanel ? 'warning': 'dark' ">
    <b-navbar-brand>
      <app-logo />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="!isInAppPanel">
        <b-nav-item>
          <router-link :to="'/products'">
            Products
          </router-link>
        </b-nav-item>
        <b-nav-item >
          <router-link :to="'/suppliers'">
            Suppliers
          </router-link>
        </b-nav-item>
        <b-nav-item >
          <router-link :to="'/about'">
            About Us
          </router-link>
        </b-nav-item>
        <b-nav-item >
          <router-link :to="'/contact'">
            Contact Us
          </router-link>
        </b-nav-item>
        <b-nav-item >
          <router-link :to="'/app'">
            App Panel <b-icon-gear />
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="isInAppPanel">
        <b-nav-item>
          <router-link :to="'/app/products'">
            Products
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link :to="'/app/support'">
            Support
          </router-link>
        </b-nav-item>
        <b-nav-item v-if="isAdmin">
          <router-link :to="'/app/users'">
            Users
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
      
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!isSignedIn" right>
          <router-link :to="'/app'">
            <b-avatar :src="profilePhoto" alt="Login" />
          </router-link>
        </b-nav-item>
        <b-nav-item-dropdown v-if="isSignedIn" text="User" right > 
          <template v-slot:button-content>
            <b-avatar :src="profilePhoto" />
          </template>
          <b-dropdown-item :to="'/app/profile'">
            Profile
          </b-dropdown-item>
          <b-dropdown-item :to="'/app/profile/address'">
            Address
          </b-dropdown-item>
          <b-dropdown-item href="#" v-on:click="singOut">
            Sign Out <b-icon-box-arrow-right />
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Logo from "@/components/Logo.vue"
import { mapActions, mapGetters } from "vuex"

import JwtService from "@/core/JwtService"
import ApiService from "@/core/ApiService"
export default {
  components: {
    "app-logo": Logo
  },
  methods: {
    ...mapActions(["setAlert", "setProfilePhotoUrl"]),
    singOut: function() {
      JwtService.deleteToken()
      ApiService.get(`/users/logout`)
        .then( () => this.$router.push("/login"))
        .catch(error => {
          console.log(error)
          //if (!err.status) this.setAlert({ message: error.data.message })
          this.$router.push("/login")
        })
        .finally( () => {
          this.setProfilePhotoUrl('') 
          const [ , , domain, ] = process.env.VUE_APP_API.split("/")
          document.cookie = `x-auth-token=; path=/ domain=${domain}; expires=Thu, 01 Jan 1970 00:00:01 GMT` //delete the cookie
        })
    }
  },
  computed: {
    ...mapGetters( ["userInfo","profilePhotoUrl", "settings"]),
    requiresAuth: function() {
      return this.$route.meta.requiresAuth
    },
    isAdmin: function() {
      try{
        const { userRole } = JwtService.decodeToken()
        if (userRole === "admin") return true
        return false
      }catch(_){
        return false
      }
    },
    isSignedIn: function(){
      try {
        const decoded = JwtService.decodeToken()
        if (decoded.email) return true
        return false
      }catch(_){
        return false
      }
    },
    isInAppPanel: function(){
      return this.$route.path.startsWith('/app')
    },
    profilePhoto: function() {
      return this.profilePhotoUrl
    }
  }
}
</script>
