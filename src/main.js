import Vue from "vue";
import App from "./App.vue";

import router from "@/router/router.js";
import store from "@/stores/stores.js";
import ApiService from "@/core/ApiService";
ApiService.init();

//scss files
import "@/plugins/bootstrap-vue";
import "@/assets/custom.scss";

//plugins

//import Vuelidate from 'vuelidate';
//Vue.use(Vuelidate);

Vue.config.productionTip = false;

Vue.directive("focus", {
  inserted: function(el) {
    el.focus();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
