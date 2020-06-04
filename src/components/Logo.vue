<template>
  <a href="/" target="_self" :title='appName'>
    <span class="color-chapar-blue" >
      chapar<span class="color-chapar-green">.tech</span>
    </span>
  </a>
</template>

<script>
import Store from '@/stores/stores.js';
export default {
  computed: {
    appName: () => Store.getters.settings.app_name,
  },
}
</script>

<style scoped>
  a:hover{
    text-decoration: none;
  }
  span{
    font-size:1.7rem;
  } 
</style>
