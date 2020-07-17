// /app
//import productRoutes from "@/router/routes/products";
//const childRoutes = [].concat(profileRoutes, userRoutes, productRoutes)
const childApp = [
  {
    path: "",
    name: "app",
    component: () => import("@/views/app/ParentApp.vue"),
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
  },
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
// const children = childApp.concat(profileRoutes, userRoutes);

const appRoutes = [
  {
    path: "/app",
    // name: "app",
    component: () => import("@/views/app/App.vue"),
    meta: {
      requiresAuth: true
    },
    children: childApp
  }
];
export default appRoutes;
