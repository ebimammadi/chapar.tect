<template>
  <div id="vueApp">
    <overlay-loader />
    <nav-bar v-if="isGuarded && loaded" />
    <bread-crumb v-if="isGuarded && loaded" />
    <alert-box />
    <router-view v-if="loaded" />
  </div>
</template>

<script>
import Vue from "vue"
import moment from "moment"

//todo apply timezone in dateTime
Vue.filter('titleize', (str) => str.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase()) ) 
Vue.filter('localTimeFormat', (date) => {
  const localTime = moment.utc(date).local().format()
  return  localTime.split("T")[0] + ',' + (localTime.split("T")[1]).slice(0,5)
})
Vue.filter('localTime', (date) => moment.utc(date).local().format())
Vue.filter('dateTime', (date) => date.split("T")[0] + ',' + (date.split("T")[1]).slice(0,5) )

import ApiService from "@/core/ApiService"
import Navbar from "@/components/Navbar"
import AlertBox from "@/components/AlertBox"
import OverlayLoader from "@/components/OverlayLoader"
import BreadCrumb from "@/components/BreadCrumb"

import { mapActions } from 'vuex'

export default {
  name: "App",
  data() {
    return {
      loaded: false
    }
  },
  components: {
    OverlayLoader,
    "nav-bar": Navbar,
    AlertBox,
    BreadCrumb
  },
  computed: {
    isGuarded: function() {
      return !this.$route.meta.isPublic
    }
  },
  mounted(){
    ApiService.get("/users/me") //todo improve refreshed me!
      .then( response => this.setProfilePhotoUrl(response.data.profilePhotoUrl) )
      .catch( error => this.setAlert({ message: error.data.message }) )
      .finally( () => this.loaded = true )
  },
  methods: {
    ...mapActions(["setAlert", "setProfilePhotoUrl"])
  }
}
</script>
