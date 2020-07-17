import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Store from "@/store/index.js";
import JwtService from "@/core/JwtService";

import appRoutes from "@/router/routes/app";
import entranceRoutes from "@/router/routes/auth";

const baseRoutes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
    meta: {
      isPublic: true
    }
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const routes = baseRoutes.concat(entranceRoutes, appRoutes);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "active-link",
  routes: routes
});

// router.beforeEach((to, from, next) => {
// 	Store.commit('changeMessage', '');
// 	console.log('called beforeEach route')
// 	next();
// });

router.beforeEach((to, from, next) => {
  Store.dispatch({ type: "setAlert", message: "" });
  if (to.matched.some(path => path.meta.requiresAuth)) {
    if (!JwtService.isValidToken()) {
      //! store redirect set
      next({
        name: "login"
        //query: { redirect: to.fullPath}
      });
    } else next();
  } else next();
});

export default router;
