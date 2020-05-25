import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../components/home.vue")
        },
        {
            path: "/about",
            name: "about",
            component: () => import("../components/about.vue")
        },
        
        {
            // the 404 route, when none of the above matches
            path: "/404",
            name: "404",
            component: () => import("../components/404.vue")
        },
        {
            path: "*",
            redirect: "/404"
        }
    ]
})
