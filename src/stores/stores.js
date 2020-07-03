import Vue from "vue";
import Vuex from "vuex";

//// import stores
import overlay from "./modules/overlayLoader";
import setting from "./modules/settings";
import alertBox from "./modules/alertBox";
import credentials from "./modules/credentials";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    setting,
    overlay,
    credentials,
    alertBox
  }
});
