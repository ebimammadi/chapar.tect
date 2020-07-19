<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand>
      <app-logo />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="!isSignedIn">
        
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
            About
          </router-link>
        </b-nav-item>
        <b-nav-item >
          <router-link :to="'/contact-us'">
            Contact Us
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="isSignedIn">
        
        <b-nav-item>
          <router-link :to="'/app/products'">
            Products
          </router-link>
        </b-nav-item>
        <b-nav-item v-if="isAdmin">
          <router-link :to="'/app/users'">
            Users!
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
            Sign Out
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
    ...mapActions(["setAlert"]),
    singOut: function() {
      JwtService.deleteToken()
      ApiService.get(`/users/logout`)
        .then( () => this.$router.push("/login"))
        .catch(err => {
          console.log(err)
          if (!err.status) this.setAlert({ message: `Network Error!` })
          this.$router.push("/login")
        })
    }
  },
  computed: {
    ...mapGetters( ["userInfo"]),
    isGuarded2: function() {
      return !this.$route.meta.isPublic
    },
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
    profilePhoto: function() {
      try {
        const { profilePhotoUrl } = JwtService.decodeToken()
        return profilePhotoUrl
      }catch(_){
        return ''
      }
    }
  }
}
</script>
