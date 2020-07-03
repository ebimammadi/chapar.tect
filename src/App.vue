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
//import Rou
import Navbar from "./components/navbar";
import AlertBox from "./components/AlertBox";
import OverlayLoader from "./components/OverlayLoader";
import BreadCrumb from "./components/BreadCrumb";
export default {
  name: "App",
  components: {
    OverlayLoader,
    "nav-bar": Navbar,
    AlertBox,
    BreadCrumb
  },
  computed: {
    isGuarded: function() {
      return !this.$route.meta.isPublic;
    }
  }
};
</script>

<style lang="scss">
//TODO: i am not sure if this css identifier is really requiered!
#vueApp {
  // text-align: center;
}
</style>
