import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Store from "@/store/index.js";
import JwtService from "@/core/JwtService";

import profileRoutes from "@/router/routes/profile";
import loginGroupRoutes from "@/router/routes/loginGroup";

const baseRoutes = [
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
];

const routes = baseRoutes.concat(profileRoutes, loginGroupRoutes);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "active-link",
  routes: routes
});

// router.beforeEach((to, from, next) => {
// 	Store.commit('changeMessage', '');
// 	console.log('called beforeeach route')
// 	next();
// });

router.beforeEach((to, from, next) => {
  Store.dispatch({ type: "setAlert", message: "" });
  if (to.matched.some(path => path.meta.requiresAuth)) {
    if (!JwtService.isValidToken()) {
      //! store redirect set
      next({
        name: "login"
        //query: { redirec: to.fullPath}
      });
    } else next();
  } else next();
})

export default router;
