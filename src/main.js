import Vue from 'vue'
import App from './App.vue'

import router from './core/router'
import ApiService from './core/api'

import "./plugins/bootstrap-vue";
import './assets/custom.scss'


//plugins



ApiService.init();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

