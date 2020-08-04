import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

// import setting from "./modules/settings"
import overlay from "./modules/overlayLoader"
import alertBox from "./modules/alertBox"
import credentials from "./modules/credentials"
import routeTo from "./modules/routeTo"

export default new Vuex.Store({
  modules: {
    // setting,
    overlay,
    credentials,
    alertBox,
    routeTo
  }
})
