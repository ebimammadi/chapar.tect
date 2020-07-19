<template>
  <div class="logo">
    <a href="/" target="_self" :title="appName">
      <span class="color-chapar-blue">
        chapar<span class="color-chapar-green">.tech</span>
      </span>
    </a>
  </div>
</template>

<script>
import Store from "@/store/index.js"
export default {
  computed: {
    appName: () => Store.getters.settings.app_name
  }
}
</script>

<style scoped>
a {
  opacity: 0.9;
}

a:hover {
  text-decoration: none;
  opacity: 1;
  transform: scale(4.5);
  transition: all 0.5s ease;
}

span {
  font-size: 1.7rem;

  margin: 0px auto;
}

.logo {
  text-align: center;
}
</style>
