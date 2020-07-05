import Vue from "vue";
import App from "./App.vue";

import router from "@/router/router.js";
import store from "@/store/index.js";
import ApiService from "@/core/ApiService.js";
ApiService.init();

import "@/plugins/bootstrap-vue.js";
import "@/assets/custom.scss";

//plugins

Vue.config.productionTip = true;

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
