import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

import Store from "@/store/index"
import JwtService from "@/core/JwtService"

import appRoutes from "@/router/routes/app"
import entranceRoutes from "@/router/routes/auth"

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
]

const routes = baseRoutes.concat(entranceRoutes, appRoutes)

const router = new Router({
  mode: "history",
  routes: routes,
  linkExactActiveClass: "active-link"
})

//clear AlertBox
router.beforeEach((to, from, next) => {
  Store.dispatch({ type: "setAlert", message: "" })
	next()
})

//control login
router.beforeEach((to, from, next) => {
  if (to.matched.some(path => path.meta.requiresAuth)) {
    if (!JwtService.isValidToken()) {
      //!  redirect set it to store! need to develop
      //query: { redirect: to.fullPath}
      next({ name: "login" })
    } else next()
  } else next()
})

//control admin access
router.beforeEach((to, from, next) => {
  if (to.matched.some(path => path.meta.requiresAdmin)) {
    const { userRole } = JwtService.decodeToken()
    if (userRole !== "admin") next({ name: "home" })
    else next()
  } else next()
})

//TODO control supplier access

export default router
