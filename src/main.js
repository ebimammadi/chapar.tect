import Vue from "vue";
import App from "./App.vue";

import "@/plugins/bootstrap-vue.js";
import "@/assets/custom.scss";

import router from "@/router/router.js";
import store from "@/store/index.js";
import ApiService from "@/core/ApiService.js";
ApiService.init();

//other plugins would be added here...

Vue.config.productionTip = false;

Vue.directive("focus", {
  inserted: el => el.focus()
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
