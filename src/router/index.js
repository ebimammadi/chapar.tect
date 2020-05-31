import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
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
            // the 404 route, when none of the above matches
            path: "/404",
            name: "404",
            component: () => import("../views/404.vue")
        },
        {
            path: "*",
            redirect: "/404"
        }
    ]
})
