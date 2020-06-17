import Vue from "vue";
import axios from "axios";

//import JwtSer
import Store from "../stores/stores";
//import { mapGetters } from "vuex";
import router from '../router/router';
const ApiService = {
	init() {
		Vue.prototype.$http = axios;
		axios.defaults.baseURL = Store.getters.settings.remote_api_base_url;
		axios.defaults.timeout = Store.getters.settings.axios_timeout;
		axios.defaults.withCredentials = true;

		axios.interceptors.request.use(function(config) {
			Store.commit('changeMessage', '');				//reset to its default
			Store.commit('changeVariant', 'warning');	//reset to its default
			Store.commit('changeOverlayShow', true);
			return config;
		}, function(err) {
			return Promise.reject(err);
		});

		axios.interceptors.response.use(function(config) {
			Store.commit('changeOverlayShow', false);
			console.log('interceptor')
			return config;
		}, function(err) {
			Store.commit('changeOverlayShow', false);
			//console.log(`there is an error status:`,err.response.status)
			if (err.response.status >= 400 ){
				if (!['login','register'].includes(router.currentRoute.name) ) {
					router.push('/login')
				}
				//return;
			}
			return Promise.reject(err);
		});
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
