export default [
  {
    path: "/users",
    component: () => import("@/views/app/users/UsersParent.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "list",
        component: () => import("@/views/app/users/UsersList.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "logs",
        name: "logs",
        component: () => import("@/views/app/users/Logs.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];
