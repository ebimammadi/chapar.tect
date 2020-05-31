import Vue from "vue";
import axios from "axios";
//import JwtSer
import APP_SETTINGS from "../settings.js";


const ApiService = {
    init() {   
        Vue.prototype.$http = axios;
        axios.defaults.baseURL = APP_SETTINGS.remote_api_base_url;
    },

    //TODO I need to add the set header in case of adding jwt
    setHeader() {

    },

    get(resource) {
        return axios.get(resource, {        crossDomain: true});
    },

    post(resource, params) {
        return axios.post(`${resource}`,params);
    },

    put(resource, params) {
        return axios.put(`${resource}`,params);
    },

    delete(resource) {
        return axios.delete(resource);
    }
}

export default ApiService;