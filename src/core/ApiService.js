import Vue from "vue"
import axios from "axios"

import Store from "../store/index"
import router from "../router/router"

const ApiService = {
  init() {
    Vue.prototype.$http = axios

    axios.defaults.baseURL = process.env.VUE_APP_API + "/api"
    axios.defaults.timeout = 30000 
    axios.defaults.withCredentials = true

    axios.interceptors.request.use(
      config => {
        //todo improvement: disable overlayShow in case of needed
        Store.dispatch({ type: "setAlert", message: "" })
        Store.commit("changeOverlayShow", true)
        return config
      },
      err => Promise.reject(err)
    )

    axios.interceptors.response.use(
      config => {
        Store.commit("changeOverlayShow", false)
        return config
      },
      err => {
        const costumeErr = { data: { message: 'Network Error'} }
        // ? https://github.com/axios/axios#handling-errors
        Store.commit("changeOverlayShow", false)
        //Store.dispatch({ type: "setAlert", message: "Network Error!" })
        if (err.response) {
          if (err.response.status >= 500) {
            return Promise.reject(err.response)
          }
          if (err.response.status == 403) { // err.response.status =>400 a more strick rule
            if (!["login", "register"].includes(router.currentRoute.name))
              router.push("/login")
            return Promise.reject(err.response)
          }
        } else if (err.request) {
          err.request
          return Promise.reject(costumeErr)
        } else {
          err.message
          return Promise.reject(costumeErr)
        }
        err.config
        return Promise.reject(costumeErr)
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
