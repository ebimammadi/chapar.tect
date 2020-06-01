import Vue from "vue";
import axios from "axios";


//import JwtSer
import APP_SETTINGS from "../settings.js";
import Store from "../stores/stores";
//import { mapGetters } from "vuex";

const ApiService = {
	init() {   
		Vue.prototype.$http = axios;
		axios.defaults.baseURL = APP_SETTINGS.remote_api_base_url;
		
		axios.interceptors.request.use(function(config) {
			Store.commit('changeOverlayShow', true);
			return config;
		}, function(err) {
			return Promise.reject(err);
		});

		axios.interceptors.response.use(function(config) {
			Store.commit('changeOverlayShow', false);
			return config;
		}, function(err) {
			return Promise.reject(err);
		});
			

	},

	
	//TODO I need to add the set header in case of adding jwt
	setHeader() {

	},

	async get2(resource) {
		return await axios.get(resource);
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