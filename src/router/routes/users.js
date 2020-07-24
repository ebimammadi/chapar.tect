export default [
  {
    path: "users",
    component: () => import("@/views/app/users/UsersParent.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
    children: [
      {
        path: "",
        name: "list",
        component: () => import("@/views/app/users/UsersList.vue"),
        meta: {
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: "logs",
        name: "logs",
        component: () => import("@/views/app/users/UsersLogs.vue"),
        meta: {
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: "profile/:user",
        name: "user profile",
        component: () => import("@/views/app/users/UsersProfile.vue"),
        meta: {
          requiresAuth: true,
          requiresAdmin: true
        }
      }
    ]
  }
]
