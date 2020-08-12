import profileRoutes from "@/router/routes/app/profile"
import userRoutes from "@/router/routes/app/users"
import supportRoutes from "@/router/routes/app/support"
import productsRoutes from "@/router/routes/app/products"

let children = [
  {
    path: "",
    name: "app",
    component: () => import("@/views/app/App.vue"),
    meta: {
      requiresAuth: true
    }
  }
]

children = children.concat(profileRoutes, userRoutes, supportRoutes, productsRoutes)

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
