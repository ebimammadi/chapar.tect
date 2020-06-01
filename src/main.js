import Vue from 'vue';
import App from './App.vue';

import router from './router/router.js';
import store from './stores/stores.js';
import ApiService from './core/ApiService';

//scss files
import "./plugins/bootstrap-vue";
import './assets/custom.scss';

//plugins

ApiService.init();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

