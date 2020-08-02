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
        path: "change-mobile",
        name: "change mobile",
        component: () => import("@/views/app/profile/ChangeMobile.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "verify-mobile",
        name: "verify mobile",
        component: () => import("@/views/app/profile/VerifyMobile.vue"),
        meta: {
          requiresAuth: true,
        },
        props: true
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
