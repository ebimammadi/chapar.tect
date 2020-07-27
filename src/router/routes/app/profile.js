export default [
  {
    path: "profile",
    component: () => import("@/views/app/profile/ProfileParent.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "profile",
        component: () => import("@/views/app/profile/Profile.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "address",
        name: "address",
        component: () => import("@/views/app/profile/Address.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "change-email",
        name: "change email",
        component: () => import("@/views/app/profile/ChangeEmail.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "change-password",
        name: "change password",
        component: () => import("@/views/app/profile/ChangePassword.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]
