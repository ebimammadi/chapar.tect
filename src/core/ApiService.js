import Vue from "vue"
import axios from "axios"

import Store from "../store/index"
import router from "../router/router"

const ApiService = {
  init() {
    Vue.prototype.$http = axios

    axios.defaults.baseURL = Store.getters.settings.remote_api_base_url
    axios.defaults.timeout = Store.getters.settings.axios_timeout
    axios.defaults.withCredentials = true

    axios.interceptors.request.use(
      config => {
        //TODO disable overlayShow in case of needed
        Store.dispatch({ type: "setAlert", message: "" })
        Store.commit("changeOverlayShow", true)
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )

    axios.interceptors.response.use(
      config => {
        Store.commit("changeOverlayShow", false)
        //console.log("interceptor");
        return config
      },
      err => {
        Store.commit("changeOverlayShow", false)
        //console.log(`there is an error status:`,err.response.status)
        if (err.response.status == 403) {
          //! err.response.status =>400 a more strick rule
          //!TODO: this chunk of code should be revised and developed 2020-0617
          if (!["login", "register"].includes(router.currentRoute.name))
            router.push("/login")
          //return;
        }
        return Promise.reject(err)
      }
    )
  },

  get(resource) {
    return axios.get(resource)
  },

  post(resource, params) {
    return axios.post(`${resource}`, params)
  },

  put(resource, params) {
    return axios.put(`${resource}`, params)
  },

  delete(resource) {
    return axios.delete(resource)
  }
}

export default ApiService
