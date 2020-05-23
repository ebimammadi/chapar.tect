import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/base.vue")
        },
        {
            path: "/about",
            name: "about",
            component: () => import("@/views/about.vue")
        },
        {
            path: "*",
            redirect: "/404"
        },
        {
            // the 404 route, when none of the above matches
            path: "/404",
            name: "404",
            component: () => import("@/views/error.vue")
        }
    ]
})
