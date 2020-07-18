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
        name: "change Email",
        component: () => import("@/views/app/profile/ChangeEmail.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "change-password",
        name: "change Password",
        component: () => import("@/views/app/profile/ChangePassword.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];
