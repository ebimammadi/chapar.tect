<template>
  <div id="vueApp" v-cloak>
    <overlay-loader />
    <nav-bar v-if="isGuarded" />
    <bread-crumb v-if="isGuarded" />
    <alert-box />
    <router-view></router-view>
  </div>
</template>

<script>
import ApiService from '@/core/ApiService'
import Navbar from "@/components/Navbar"
import AlertBox from "@/components/AlertBox"
import OverlayLoader from "@/components/OverlayLoader"
import BreadCrumb from "@/components/BreadCrumb"

import { mapActions } from 'vuex'

export default {
  name: "App",
  components: {
    OverlayLoader,
    "nav-bar": Navbar,
    AlertBox,
    BreadCrumb
  },
  computed: {
    //!TODO need to refactor this part
    isGuarded: function() {
      return !this.$route.meta.isPublic
    }
  },
  mounted(){
    ApiService.get("/users/me")
      .then(response =>{
        const url = (response.data.profilePhotoUrl === undefined) ? "" : response.data.profilePhotoUrl
        this.setProfilePhotoUrl(url)
      })
      .catch(
        error =>
          this.setAlert({ message: `Network Error!` }) && console.log(error)
      )
  },
  methods: {
    ...mapActions(["setAlert", "setProfilePhotoUrl"])
  }
}
</script>

<style lang="scss">
//? I am not sure if this css identifier is really required!
// #vueApp {
// }
</style>
