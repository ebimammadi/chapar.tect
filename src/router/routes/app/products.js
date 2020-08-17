export default [
  {
    path: "products",
    component: () => import("@/views/app/products/ProductsParent.vue"),
    meta: {
      requiresAuth: true,
      requiresSupplier: true
    },
    children: [
      {
        path: "",
        name: "product list",
        component: () => import("@/views/app/products/ProductsList.vue"),
      },
      {
        path: "id/:_id",
        name: "edit product",
        component: () => import("@/views/app/products/ProductsNewPage.vue"),
        props: true
      },
      {
        path: "new",
        name: "new product",
        component: () => import("@/views/app/products/ProductsNewPage.vue"),
      }
    ]
  }
]
