import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import overlay from "./modules/overlayLoader"
import setting from "./modules/settings"
import alertBox from "./modules/alertBox"
import credentials from "./modules/credentials"

export default new Vuex.Store({
  modules: {
    setting,
    overlay,
    credentials,
    alertBox
  }
})
