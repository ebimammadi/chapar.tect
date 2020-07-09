export default [
  {
    path: "/profile",
    component: () => import("@/views/users/ProfileParent.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "profile",
        component: () => import("@/views/users/Profile.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "address",
        name: "address",
        component: () => import("@/views/users/Address.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "change-email",
        name: "change Email",
        component: () => import("@/views/users/ChangeEmail.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "change-password",
        name: "change Password",
        component: () => import("@/views/users/ChangePassword.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];
