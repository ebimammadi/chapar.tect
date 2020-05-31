import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import ApiService from './core/ApiService'

import "./plugins/bootstrap-vue";
import './assets/custom.scss'


//plugins

ApiService.init();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

