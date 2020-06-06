import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Store from '@/stores/stores';
import JwtService from '@/core/JwtService';

const router = new Router({
	mode: 'history',
	linkExactActiveClass: 'active-link',
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/Home.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/About.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/Login.vue"),
			meta: {
				isPublic: true
			}
		},
		{
			path: "/register",
			name: "register",
			component: () => import("../views/Register.vue"),
			meta: {
				isPublic: true
			}
		},
		{
			path: "/404",
			name: "404",
			component: () => import("../views/404.vue"),
			meta: {
				isPublic: true
			}
		},
		{
			path: "*",
			redirect: "/404"
		}
	]
});

router.beforeEach((to, from, next) => {
	Store.commit('changeMessage', '');
	next();
});

router.beforeEach((to, from, next) => {
	if ( to.matched.some(path => path.meta.requiresAuth) ){
		console.log(JwtService.getToken())
		//if ( JwtService.getToken()!== '')
		if ( !Store.getters.isSinged )
			next({
				name: "login",
				//query: { redirec: to.fullPath}
			})
		else next();
	}
	else next();
});

export default router;
