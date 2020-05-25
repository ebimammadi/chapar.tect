import Vue from "vue";
import axios from "axios";
//import JwtSer
import _SETTINGS from "../settings.js";

const ApiService = {
    init() {   
        Vue.use(axios);
        axios.defaults.baseURL = _SETTINGS.remote_api_base_url;
    },

    //TODO I need to add the set header in case of adding jwt
    setHeader() {

    },

    get(resource) {
        return axios.get(resource);
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