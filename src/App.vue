//Todo: activate supplier public page
//Todo: activate product pages
//Todo: about this app page
//Todo: tickets page //ticket subject, id, status, customer, create date, last update, updates[{user,date,body,attach}]
//Todo: tickets routes: /app/tickets/ [add, :id]
//Todo: contact us address& contact info& submit form(message, email/mobile)
//Todo: signed URL  S3
<template>
  <div id="vueApp" v-cloak>
    <overlay-loader />
    <nav-bar v-if="isGuarded" />
    <bread-crumb v-if="isGuarded" />
    <alert-box />
    <router-view />
  </div>
</template>

<script>
// import jQuery from "jquery"
// window.jQuery = jQuery

import Vue from "vue"
Vue.filter("dateTime", (date) => date.split("T")[0] + ',' + (date.split("T")[1]).slice(0,5) )
Vue.filter("titleize", (str) => str.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase()) ) 

import ApiService from "@/core/ApiService"
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
