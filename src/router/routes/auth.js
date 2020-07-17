export default [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      isPublic: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register.vue"),
    meta: {
      isPublic: true
    }
  },
  {
    path: "/forget-password",
    name: "forget-password",
    component: () => import("@/views/auth/ForgetPassword.vue"),
    meta: {
      isPublic: true
    }
  },
  {
    path: "/recover-password/:code",
    name: "recover-password",
    component: () => import("@/views/auth/RecoverPassword.vue"),
    meta: {
      isPublic: true
    }
  },
  {
    path: "/verify-email/:code",
    name: "verify-email",
    component: () => import("@/views/auth/VerifyEmail.vue"),
    meta: {
      isPublic: true
    }
  },
  {
    path: "/terms",
    name: "terms",
    component: () => import("@/views/Terms.vue"),
    meta: {
      isPublic: true
    }
  }
];
