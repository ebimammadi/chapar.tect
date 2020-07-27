import profileRoutes from "@/router/routes/app/profile"
import userRoutes from "@/router/routes/app/users"
import ticketRoutes from "@/routers/routes/app/ticket"

let children = [
  {
    path: "",
    name: "app",
    component: () => import("@/views/app/App.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "about",
    name: "about app",
    component: () => import("@/views/app/About.vue"),
    meta: {
      requiresAuth: true
    }
  }
]

children = children.concat(profileRoutes, userRoutes, ticketRoutes)

const appRoutes = [
  {
    path: "/app",
    component: () => import("@/views/app/AppParent.vue"),
    meta: {
      requiresAuth: true
    },
    children: children
  }
]

export default appRoutes