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
			path: "/profile",
			component: () => import("../views/users/ProfileParent.vue"),
			meta: {
				requiresAuth: true
			},
			children: [
				{
					path: "",
					name: "profile",
					component: () => import("../views/users/Profile.vue"),
					meta: {
						requiresAuth: true
					}
				},
				{
					path: "address",
					name: "address",
					component: () => import("../views/users/Address.vue"),
					meta: {
						requiresAuth: true
					}
				}
			]
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/auth/Login.vue"),
			meta: {
				isPublic: true
			}
		},
		{
			path: "/register",
			name: "register",
			component: () => import("../views/auth/Register.vue"),
			meta: {
				isPublic: true
			}
		},
		{
			path: "/forget-password",
			name: "forget-password",
			component: () => import("../views/auth/ForgetPassword.vue"),
			meta: {
				isPublic: true
			}
		},
		{
			path: "/recover-password/:code",
			name: "recover-password",
			component: () => import("../views/auth/RecoverPassword.vue"),
			meta: {
				isPublic: true
			}
		},
		{
			path: "/verify-email/:code",
			name: "verify-email",
			component: () => import("../views/auth/VerifyEmail.vue"),
			meta: {
				isPublic: true
			}
		},
		{
			path: "/terms",
			name: "terms",
			component: () => import("../views/Terms.vue"),
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

// router.beforeEach((to, from, next) => {
// 	Store.commit('changeMessage', '');
// 	console.log('called beforeeach route')
// 	next();
// });

router.beforeEach((to, from, next) => {
	Store.commit('changeMessage', '');
	if ( to.matched.some(path => path.meta.requiresAuth) ){
		// if ( !JwtService.getToken() )
		if ( !JwtService.isValidToken() )
			next({
				name: "login",
				//query: { redirec: to.fullPath}
			})
		else next();
	}
	else next();
});

export default router;
