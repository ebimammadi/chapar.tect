export default [
  {
    path: "supplier",
    component: () => import("@/views/suppliers/SuppliersParent.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
    children: [
      {
        path: "",
        name: "suppliers list",
        component: () => import("@/views/suppliers/SuppliersList.vue"),
        meta: {
        }
      },
      {
        path: ":slug",
        name: "supplier slug",
        component: () => import("@/views/suppliers/SuppliersPage.vue"),
        meta: {
        }
      }
    ]
  }
]
