import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Store from '@/stores/stores';

const router = new Router({
	mode: 'history',
	linkExactActiveClass: 'active-link',
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/Home.vue")
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/About.vue")
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

export default router;