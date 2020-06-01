<template>
  <div id="app">
    <overlay-loader />
    <nav-bar />
    <!-- <alert-box message="test" variant="warning" /> -->
    <alert-box message="test" variant="warning" />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/navbar';
import AlertBox from './components/AlertBox';
import OverlayLoader from './components/OverlayLoader';


export default {
  name: 'App',
  components: {
    OverlayLoader,
    'nav-bar': Navbar,
    AlertBox
  },
  computed: {
    
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
